import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PayBill from './PayBill'

export default function Order() {
    let [data, setData] = useState([])
    let [pay, setPay] = useState(true)
    let navigate = useNavigate()

    useEffect(() => {
        const getOrderedFood = async () => {
            try {
                const gettingFood = await fetch("https://my-backend-ckuu.onrender.com/getOrderedDish")
                const res = await gettingFood.json()
                setData(res)
            } catch (error) {
                console.log('error occurred : ', error)
            }
        }
        getOrderedFood()
    }, [])

    return (
        <div className='min-h-screen p-6 text-center bg-gradient-to-br from-gray-800 to-black'>
            {data.length > 0
                ?
        <div>
                {pay 
                ?
                <div>
                    <nav className='relative flex items-center justify-center'>
                        <h1 className="mb-8 text-4xl font-bold text-center text-white">YOUR ORDER</h1>
                        <button onClick={() => navigate("/restaunt")} className="absolute mb-8 text-xl font-bold text-center bg-white hover:text-white right-6 px-[2vw] py-[1vh] rounded-xl hover:bg-transparent hover:outline outline transition-all duration-300 outline-[2px]">
                            Restaunt
                        </button>
                    </nav>

                    <div className="grid grid-cols-1 gap-10 w-[90%] mx-auto md:grid-cols-3 :grid-cols-3">
                        {data.map((item, index) => (
                            <div key={index} className="p-[2vh] transition-transform duration-300 bg-white shadow-xl cursor-pointer rounded-xl hover:scale-105">
                                <img src={item.image} alt="Dish" className="object-cover w-full h-[40vh] rounded-lg" />
                                <h2 className="mt-4 text-2xl font-semibold text-gray-800">{item.description}</h2>
                                <p className="mt-2 text-gray-600">Price: ₹{item.price}</p>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setPay(!pay)} className=' bg-white my-[5vh] text-black font-semibold px-[10vw] py-[1vh] text-xl rounded-md hover:rounded-3xl transition-all duration-1000 border-2 border-white hover:bg-transparent hover:text-white'>Pay Bill</button>
                </div>
                :
                <PayBill pay={pay} setPay={setPay} data={data} />}
                </div>
                :
                <div>
                    <p className='text-[5vw] sm:text-4xl mt-[30vh] font-bold text-white drop-shadow-2xl animate-float-slow hover:text-red-400'>NO ORDERED YET, GO TO RESTAUNT</p>
                    <button onClick={() => navigate("/restaunt")} className="text-xl font-bold text-center bg-white hover:text-white  px-[2vw] py-[1vh] rounded-xl hover:bg-transparent hover:outline outline transition-all duration-300 outline-[2px] mt-[5vh]">
                            Restaunt
                        </button>
                </div>
                }
        </div>
    );
}
