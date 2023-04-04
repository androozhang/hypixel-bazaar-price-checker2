import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ItemDetail() {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchItemData = async () => {
      const response = await fetch(`https://api.hypixel.net/skyblock/bazaar`);
      const data = await response.json();
      const item = data.products[id];
      setItemData(item);
    };
    fetchItemData();
  }, [id]);

  return (
    <div className='item'>
      {itemData ? (
        <>
          <h2>{id}</h2>
          <p>Buy Price: {itemData.quick_status.buyPrice.toFixed(2)}</p>
          <p>Sell Price: {itemData.quick_status.sellPrice.toFixed(2)}</p>
          <p>Volume: {itemData.quick_status.buyVolume}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ItemDetail;
