import './App.css'
import React, { useState, useEffect, useMemo } from 'react';
import Card from './components/card'
import sortAZ from './assets/alphabetical-sorting-icon-lg.png'
import sortZA from './assets/alphabetical-sorting-icon-size_24.png'

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
  category: string;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Product[] | null>(null);
  const [atoZ, setAtoZ] = useState(true);
  const [query, setQuery] = useState("");

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

  //console.log('data', data);

  function sortAtoZ() {
    const sortedData = data ? data.sort(
      (a, b) => {
        const titleA = a.title.toUpperCase(); // ignore upper and lowercase
        const titleB = b.title.toUpperCase(); // ignore upper and lowercase
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }

        // names must be equal
        return 0;
      }
    ) : [];
  }

  function sortZtoA() {
    const sortedData = data ? data.sort(
      (a, b) => {
        const titleA = a.title.toUpperCase(); // ignore upper and lowercase
        const titleB = b.title.toUpperCase(); // ignore upper and lowercase
        if (titleA > titleB) {
          return -1;
        }
        if (titleA < titleB) {
          return 1;
        }

        // names must be equal
        return 0;
      }
    ) : [];
  }

  if (atoZ) {
    sortAtoZ();
  } else {
    sortZtoA();
  }

  function toggleSort() {
    setAtoZ(!atoZ);
  };

  // useEffect(() => {
  //   if (atoZ) {
  //     sortAtoZ();
  //   } else {
  //     sortZtoA();
  //   }
  // }
  //   , [atoZ]);

  //start of search
  const filteredItems = useMemo(() => {
    return data ? data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase())
    ) : [];
  }, [query]);

  return (
    <div>
      <h1>Welcome to Test Store!</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        id="search"
        type="search"
        placeholder="search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* <button type="submit">Search</button> */}
      <button className='sortButton' onClick={toggleSort}><img src={atoZ ? sortAZ : sortZA} alt="sort alphabetically" /></button>
      <div className='main'>
        {data && !loading && !error && (
          filteredItems.map(product => (
            <Card key={product.id} image={product.image} title={product.title} category={product.category} price={product.price} desc={product.description} />
          ))

        )}
      </div>
    </div>
  )
}

export default App
