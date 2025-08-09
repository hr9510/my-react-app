import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Menu() {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [backendPrices, setBackendPrices] = useState([]);   // your backend response array
  const [backendDishes, setBackendDishes] = useState({image:"", description:"", price:""});   // your backend response array
  const [randomPrices, setRandomPrices] = useState([]);     // fallback when backend empty
  const [isLoading, setIsLoading] = useState(true);
  const [Length, setLength] = useState("")
  const [dishesLength, setDishesLength] = useState(30)
  const [cooked, setCooked] = useState([])

  const setPrice = async (nums) => {
        try {
          await fetch("http://localhost:5000/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nums),
          });
        } catch (err) {
          console.error("POST randomPrices failed:", err);
        }
  }
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=dish&per_page=${dishesLength}`,
          { headers: { Authorization: `Client-ID DjlmiFl9gNjyHU5_aHK_wu88B4mpphoRtUUr2CvVDww` } }
        );
        const json = await res.json();
        setDishes(json.results || []);
      } catch (err) {
        console.error("Image fetch failed:", err);
        setDishes([]);
      }
    };

    const fetchPrices = async () => {
      try {
        const res = await fetch("http://localhost:5000/get-food");
        const prices = await res.json();
        if (Array.isArray(prices) && prices.length > 0) {
          setBackendPrices(prices);
          return prices;
        }
      } catch (err) {
        console.error("GET /get-food failed:", err);
      }
      return null;
    };

    (async () => {
      setIsLoading(true);
      const imagesPromise = fetchImages();
      const pricesPromise = fetchPrices();

      const [_, existingPrices] = await Promise.all([
        imagesPromise,
        pricesPromise,
      ]);
      if (!existingPrices || existingPrices.length <= dishesLength) {
  const nums = new Array(dishes.length || dishesLength)
    .fill(0)
    .map(() => Math.floor(Math.random() * 400 + 100));
  setRandomPrices(nums);
  setPrice(nums);
}
      setIsLoading(false);
    })();
  }, [dishesLength]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-gray-800 to-black">
        <p className="text-xl text-white">Loading menu...</p>
      </div>
    );
  }

  const PreparingFood = (idx) => {
  const image = dishes[idx].urls.small;
  const description = dishes[idx].alt_description;
  const priceObject = backendPrices[idx];
  const dishPrice = priceObject?.dish_price ?? randomPrices[idx] ?? "--";

  const foodData = { image, description, price: dishPrice };
    setBackendDishes(foodData);

  const setPreparingFood = async () => {
    try {
      await fetch("http://localhost:5000/setPreparedFood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(foodData), // ✅ correct data
      });
      toast.success("Started Cooking!!")
      const newArray = [...cooked];
      newArray[idx] = true;
      setCooked(newArray);
    } catch (err) {
      console.error("POST setPreparedFood failed:", err);
    }
  };

  setPreparingFood();
};

  const handleSubmit = (e) => {
  e.preventDefault(); // ✅ STOP form reload
  setDishesLength(parseInt(Length)); // ✅ convert string to number
  setLength(""); // optional: clear input after search
  toast.info(`Fetching dishes...`);
};


  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-800 to-black min-w-fit">
      <nav className="grid justify-center items-baseline mb-8 text-center sm:flex sm:justify-between space-y-[2vh]">
        <form onSubmit={handleSubmit} className="relative">
          <input value={Length} onChange={(e)=>setLength(e.target.value)} type="text" placeholder="Total 30 foods available" className="bg-transparent border-white outline-none border-[2px] h-[4vh] p-[1vh] text-white" />
          <button type="submit" className="text-black bg-white h-[4vh] border-white border-[5px] absolute">Search</button>
        </form>
        <h1 className="text-4xl font-bold text-white ">OUR MENU</h1>
        <button
          onClick={() => navigate("/restaunt")}
          className="px-6 py-2 text-xl font-bold transition bg-white border-[2px] border-white rounded-xl hover:bg-transparent hover:text-white"
        >
          Restaurant
        </button>
      </nav>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dishes.map((item, idx) => {
          const priceObject = backendPrices[idx];
          const dishPrice = priceObject?.dish_price ?? randomPrices[idx] ?? "--";
          return (
            <div
              key={item.id || idx}
              className="bg-white p-4 rounded-xl shadow-xl hover:shadow-2xl transition-all overflow-hidden h-[49vh] hover:h-[58vh]"
            >
              <img
                src={item.urls.small}
                alt={item.alt_description || `Dish #${idx + 1}`}
                className="h-[40vh] w-full object-cover rounded-md"
              />
              <h2 className="mt-2 text-2xl font-semibold text-gray-800 truncate">
                {idx+1}. {item.alt_description || "Delicious Dish"}
              </h2>
              <div className="flex items-baseline mt-3 justify-evenly">
                <h2 className="text-2xl font-semibold text-green-800">
                  ₹ {dishPrice}
                </h2>
                <button onClick={()=>PreparingFood(idx)} className="px-8 py-2 font-semibold text-white bg-blue-700 rounded-xl hover:bg-blue-600">
                  {cooked[idx] ? "Cook again":"Cook it"}
                </button>
                <ToastContainer position="top-left" autoClose={2000} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
