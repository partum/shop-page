import './App.css'
import React, { useState, useEffect } from 'react';
import Card from './components/card'

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    fetch(`https://fakestoreapi.com/products`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Product not found');
        }
        return response.json();
      })
      .then(json => {
        setData(json);
        setError(null);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to fetch product data');
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

console.log('data', data);

  return (
    <div>
      <h1>Welcome to Test Store!</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && !loading && !error && (
        data.map(product => (
          <Card key={product.id} image={product.image} title={product.title} price={product.price} desc={product.description}/>
        ))
        // <Card image={data[0].image} title={data[0].title} price={data[0].price} desc={data[0].description}/>
      )}
    </div>
  )
}

export default App
