import './App.css';
import { useState, useEffect } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ItemDetail from "./components/itemDetail";
import NotFound from "./components/NotFound";
import Home from "./components/Home";

function App() {
 

  return (

    <div>
      <h1>Hypixel Skyblock Bazaar</h1>
      <nav>
        <ul>
          <li>
            <Link to="/" className="button">Home</Link>
          </li>
        </ul>
      </nav>
     
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>

  );
}

export default App;
