import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function PayBill({ pay, setPay, data }) {
  const [paying, setPaying] = useState([])
  const [idPay, setIdPay] = useState([])
    const calculateTotal = () =>
      paying.reduce((acc, item) => acc + item.price * item.quantity, 0);


  const settingPayment = (e, item) => {
    e.preventDefault();
  const alreadyAdded = paying.find(p => p.description === item.description);
  if (!alreadyAdded) {
    setPaying([...paying, item]);
  } else {
    setPaying(prevArray => prevArray.slice(0, -1));
    }
    
  const alreadyAddedid = idPay.find(p => p === item.id);
  if (!alreadyAddedid) {
    setIdPay([...idPay, item.id])
  } else {
    setIdPay(prevArray => prevArray.slice(0, -1));
  }
  };
  
  const payingBills = async () => {
  const userConfirmed = window.confirm(`Do you want to pay ₹${calculateTotal()}`);
  
  if (userConfirmed) {
    try {
      const res = await fetch("https://my-backend-ckuu.onrender.com/payBill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body : JSON.stringify({ id: idPay })
      });

      if (res.ok) {
        toast.success("✅ Bill paid successfully!");
        setTimeout(() => window.location.reload(), 2000); // reload after toast
      } else {
        toast.error("❌ Payment failed!");
      }
    } 
    catch (error) {
      toast.error("⚠️ Server error. Please try again.");
    }
  } else {
    toast.info("💡 Payment cancelling...");
  }
};


  return (
    <div className="flex flex-col items-center px-4 my-10">
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-xl">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">TOTAL BILL</h1>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700">S No.</th>
                <th className="px-4 py-2 text-left text-gray-700">Food</th>
                <th className="px-4 py-2 text-center text-gray-700">Quantity</th>
                <th className="px-4 py-2 text-right text-gray-700">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  onClick={(e) => settingPayment(e, item)}
                  className={`border-t border-gray-300 cursor-pointer ${
                    paying.find(p => p.description === item.description) ? 'bg-green-200' : 'hover:bg-green-100'
                  }`}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2 text-center">{item.quantity}</td>
                  <td className="px-4 py-2 text-right">{item.price * item.quantity}</td>
                </tr>
              ))}
              {/* 🔻 Total Row */}
              <tr className="font-bold bg-gray-100 border-t border-gray-400">
                <td colSpan="3" className="px-4 py-3 text-right">Total:</td>
                <td className="px-4 py-3 text-right">₹{calculateTotal()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={() => payingBills()}
        className="px-10 py-2 mt-10 text-xl font-semibold text-black transition-all duration-700 bg-white border-2 border-white rounded-md hover:rounded-3xl hover:bg-transparent hover:text-white"
      >
        PAY BILL
      </button>
      <ToastContainer position='top-left' autoClose={2000} />
      <button
        onClick={() => setPay(!pay)}
        className="px-10 py-2 mt-10 text-xl font-semibold text-black transition-all duration-700 bg-white border-2 border-white rounded-md hover:rounded-3xl hover:bg-transparent hover:text-white"
      >
        GO TO ORDER SECTION
      </button>
    </div>
  );
}
