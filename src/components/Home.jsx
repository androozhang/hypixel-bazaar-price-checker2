import { useState, useEffect } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import { Link } from 'react-router-dom';

function Home() {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");
    const [scatterData, setScatterData] = useState([]);
  
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch("https://api.hypixel.net/skyblock/bazaar");
        const data = await response.json();
        const products = Object.values(data.products);
        const scatterData = products
    .filter((item) => item.quick_status.buyPrice >= 0 && item.quick_status.buyPrice <= 10000)
    .map((item) => ({
      x: item.quick_status.buyPrice,
      y: item.quick_status.buyVolume,
      name: item.product_id,
    }));
  
        setItems(products);
        setScatterData(scatterData);
      };
      
      fetchData();
    }, []);
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleFilter = (event) => {
      setSelectedFilter(event.target.value);
    };
  
    const filteredItems = items.filter((item) =>
      item.product_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const filteredItemsWithFilter = selectedFilter
      ? filteredItems.filter((item) => {
          const price = item.quick_status.buyPrice;
          switch (selectedFilter) {
            case "0-100":
              return price >= 0 && price <= 100;
            case "100-1000":
              return price > 100 && price <= 1000;
            case "1000-10000":
              return price > 1000 && price <= 10000;
            case "10000+":
              return price > 10000;
            default:
              return true;
          }
        })
      : filteredItems;
  
    const itemCount = filteredItemsWithFilter.length;
    const buyPriceSum = filteredItemsWithFilter.reduce(
      (total, item) => total + item.quick_status.buyPrice,
      0
    );
    const buyPriceAverage =
      filteredItemsWithFilter.length > 0
        ? buyPriceSum / filteredItemsWithFilter.length
        : 0;
    const buyPriceRange = `${(Math.min(
      ...filteredItemsWithFilter.map((item) => item.quick_status.buyPrice)
    )).toFixed(2)} - ${(Math.max(
      ...filteredItemsWithFilter.map((item) => item.quick_status.buyPrice)
    )).toFixed(2)}`;
  
    return (
  
      <div>
       
        
        <input
          type="text"
          placeholder="Search items"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={selectedFilter} onChange={handleFilter}>
          <option value="">Filter by price range</option>
          <option value="0-100">0-100 coins</option>
          <option value="100-1000">100-1000 coins</option>
          <option value="1000-10000">1000-10000 coins</option>
          <option value="10000+">10000+ coins</option>
        </select>
       
        <p id="stats">Total Items: {itemCount}</p>
        <p id="stats">Average Buy Price: {buyPriceAverage.toFixed(2)} coins</p>
        <p id="stats">Buy Price Range: {buyPriceRange} coins</p>
        

        <div className='container'>

        
        <div className="list">
  <table className="box">
    <thead>
      <tr>
        <th>Item</th>
        <th>Buy Price</th>
        <th>Link</th>
      </tr>
    </thead>
    <tbody>
      {filteredItemsWithFilter.map((item) => (
        <tr key={item.product_id}>
          <td>
            {item.product_id
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </td>
          <td>{item.quick_status.buyPrice.toFixed(2)} coins</td>
          <td>
            <Link to={`/items/${item.product_id}`} className="link">
              {" "}
              🔗
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        <div>
        <ScatterChart width={600} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="Buy Price (coins)" domain={[0, 10000]} />
        <YAxis type="number" dataKey="y" name="Item Amount" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Items" data={scatterData} fill="#8884d8" />
        </ScatterChart>
        </div>
        </div>
      </div>
  
    );
  }
  
  export default Home;