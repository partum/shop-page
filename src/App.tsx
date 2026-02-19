import './App.css'
import { useState, useEffect, useMemo } from 'react';
import Card from './components/card'
import sortAZ from './assets/alphabetical-sorting-icon-lg.png'
import sortZA from './assets/alphabetical-sorting-icon-size_24.png'
import plusIcon from './assets/free-plus-icon-321-thumb.png'
import Modal from './components/modal';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Product | null>(null);

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

  //start of search
  const filteredItems = useMemo(() => {
    return data ? data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase())
    ) : [];
  }, [query, data]);

  function sortAtoZ() {
    const sortedData = filteredItems ? filteredItems.sort(
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
    const sortedData = filteredItems ? filteredItems.sort(
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

  function openModal() {
    setModalOpen(true);
  }

  // Callback function to receive data from the child
  const handleProductData = (data: Product): void => {
    setNewProduct(data);
  };
  //re-render product list when new product is added
  // useEffect(() => {
  //   if (newProduct && data) {
  //     setData([...data, newProduct]);
  //   }
  // }, [newProduct]);

  useEffect(() => {
    if (!newProduct) return;
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    };

    fetch('https://fakestoreapi.com/products', requestOptions)
      .then(response => response.json())
      .then(result => {
        setData(prevData => prevData ? [...prevData, newProduct] : [newProduct]);
        setNewProduct(null);
      })
      .catch(error => setError(error.message));
  }, [newProduct]);

  return (
    <div>
      <h1>Welcome to Test Store!</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className='addItem' onClick={openModal} style={{ float: "right" }}><img src={plusIcon} alt='add item' /></button>
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
      {modalOpen && <Modal closeModal={(value: boolean) => setModalOpen(value)} onDataReceived={(data: object) => handleProductData(data as Product)} />}
    </div>
  )
}

export default App
