import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Restaurant() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  let [ordered, setOrdered] = useState([])
  
  // Fetch dishes on mount
  useEffect(() => {
    fetchPreparedFood();
  }, []);

  const fetchPreparedFood = async () => {
    try {
      const res = await fetch("http://localhost:5000/getPreparedFood");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error("Image fetch failed:", error);
    }
  };

  // Delete a dish
  const deleteFood = async (item) => {
    try {
      await fetch("http://localhost:5000/deletePreparedFood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      
      toast.success("food deleting!!")
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleOrder = async (item) => {
    try {
      await fetch("http://localhost:5000/orderFood", {
        method: ["POST"],
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(item)
      })
      toast.info("food ordering!!")
      const newArray = [...ordered]
      newArray[item.id - 1] = true
      setOrdered(newArray)
      setTimeout(() => window.location.reload(), 2000);
    }
    catch (error) {
      
    }
  }

  // Reboot app and refresh list
  const handleReboot = async () => {
    try {
      await fetch("http://localhost:5000/reebotapp");
      await fetchPreparedFood();
      navigate("/")
    } catch (error) {
      console.error("Reboot failed:", error);
    }
  };

  return (
    <div className="w-full min-h-screen font-sans bg-gradient-to-tr from-pink-400 to-white">
      
      {/* Navbar */}
      <nav className="w-[90%] max-w-7xl mx-auto py-6 md:py-10 bg-purple-700 rounded-b-full text-center shadow-lg">
        <h1 className="text-[6vw] md:text-3xl font-extrabold text-white hover:text-gray-200 transition duration-500">
          Welcome to Our Restaurant
        </h1>
        <ul className="mt-4 flex flex-col md:flex-row justify-center gap-6 md:gap-[5vw] text-white text-[5vw] md:text-lg font-semibold">
          <li onClick={() => navigate("/")} className="transition duration-500 cursor-pointer hover:text-yellow-300">Home</li>
          <li onClick={() => navigate("/menu")} className="transition duration-500 cursor-pointer hover:text-yellow-300">Menu</li>
          <li onClick={() => navigate("/order")} className="transition duration-500 cursor-pointer hover:text-yellow-300">Order</li>
        </ul>
      </nav>

      {/* Dishes Section */}
      <section className="flex flex-col items-center w-full gap-10 px-4 py-10 md:px-10">
        <h2 className="text-[7vw] md:text-3xl font-bold text-purple-800 animate-bounce text-center">
          Prepared Dishes
        </h2>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => (
            <div
              key={item.id || index}
              className="w-full h-[46vh] bg-white text-center rounded-2xl shadow-xl hover:h-[60vh] overflow-hidden transition-all duration-900"
            > 
              <img
                src={item.image}
                alt={item.description || "Dish Image"}
                className="h-[40vh] w-[90%] mt-2 rounded-xl object-cover mx-auto"
              />
              <p className="px-2 mt-2 font-medium text-gray-700 truncate">
                {index + 1}. {item.description || "No Description"}
              </p>
              <div className="flex items-center mt-2 justify-evenly">
                <h2 className="text-2xl font-semibold text-green-800">
                  ₹ {item.price || "N/A"}
                </h2>
                <button onClick={()=>handleOrder(item)} className="font-semibold text-white bg-blue-700 px-[2vw] py-[1vh] rounded-xl hover:bg-blue-600">
                  {ordered[index] ? "ORDER AGAIN" : "ORDER IT"}
                </button>
                <ToastContainer position="top-left" autoClose={2000} />
              </div>
              <button
                onClick={() => deleteFood(item)}
                className="my-[1vh] font-semibold text-white bg-blue-700 py-[1vh] w-[80%] rounded-xl hover:bg-blue-600"
              >
                REMOVE DISH
              </button>
              <ToastContainer position="top-left" autoClose={1000} />
            </div>
          ))}
        </div>

        <button
          onClick={handleReboot}
          className="font-semibold text-black bg-white px-[2vw] py-[1vh] hover:rounded-3xl transition-all duration-1000 rounded-md"
        >
          Reboot App
        </button>
      </section>
    </div>
  );
}
