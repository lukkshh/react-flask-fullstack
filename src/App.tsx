import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [data, setData] = useState([]);
  const [stock, setStock] = useState(false);
  const [fruits, setFruits] = useState(false);
  const [vegetable, setVeg] = useState(false);
  const [loading, setLoading] = useState(false);

  const FetchData = async (api: string) => {
    setLoading(true);
    const resp = await fetch(api);
    const data = await resp.json();

    setData(data);
    setLoading(false);
    return;
  };

  const handleFilter = () => {
    if (vegetable && fruits) {
      const api = stock
        ? "http://127.0.0.1:5000/api/vegs_fruits_instock"
        : "http://127.0.0.1:5000/api/vegs_fruits";
      FetchData(api);
      return;
    }

    if (vegetable) {
      const api = stock
        ? "http://127.0.0.1:5000/api/vegs_in_stock"
        : "http://127.0.0.1:5000/api/vegs";
      FetchData(api);
      return;
    }

    if (fruits) {
      const api = stock
        ? "http://127.0.0.1:5000/api/fruits_in_stock"
        : "http://127.0.0.1:5000/api/fruits";
      FetchData(api);
      return;
    }

    const api = stock
      ? "http://127.0.0.1:5000/api/instock"
      : "http://127.0.0.1:5000/api/";
    FetchData(api);
    return;
  };

  useEffect(() => {
    FetchData("http://127.0.0.1:5000/api/");
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex content-center items-center w-full h-[10vh] bg-slate-500">
          <div className="bg-slate-200 w-28 flex items-center justify-evenly rounded m-2 p-2">
            <label>In Stock</label>
            <input
              type="checkbox"
              onChange={(event) => setStock(event.target.checked)}
            />
          </div>
          <div className="bg-slate-200 w-28 flex items-center justify-evenly rounded m-2 p-2">
            <label>Vegetable</label>
            <input
              type="checkbox"
              onChange={(event) => setVeg(event.target.checked)}
            />
          </div>
          <div className="bg-slate-200 w-28 flex items-center justify-evenly rounded m-2 p-2">
            <label>Fruits</label>
            <input
              type="checkbox"
              onChange={(event) => setFruits(event.target.checked)}
            />
          </div>
          <button
            className="w-24 h-10 bg-slate-200 rounded"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
        <div className="flex flex-wrap content-start w-full h-[90vh] bg-slate-600">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <span className="loader"></span>
            </div>
          ) : (
            data.map((item: any) => (
              <div
                key={item.name}
                className="capitalize rounded w-[200px] h-[100px] m-2 p-2 bg-slate-200"
              >
                <li key={item.name}>Name : {item.name}</li>
                <li key={item.type}>Type: {item.type}</li>
                <li key={item.quantity}>Quantity: {item.quantity}</li>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
