import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  // => Using IIFE
  // On Page load fetch all the Products 
  useEffect(() => {
    // =>Using AbortController To avoid race Condition
    const controller = new AbortController();
    // IIF
    ; (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get('/api/products?search=' + search, {
          signal: controller.signal
        })
        console.log(response.data);
        setProducts(response.data)
      } catch (error) {
        // 🟩 ONLY set error to true if it wasn't an intentional abort
        if (!axios.isCancel(error)) {
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    })()
    return () => controller.abort();
  }, [search])

  // if (error) {
  //   return <h1>Something went Wrong</h1>
  // }

  // if (loading) {
  //   return <h1>Loading...</h1>
  // }

  return (
    <>
      <h1>API in React</h1>
      <input type="text" style={{ width: '200px', marginInline: 'auto' }} placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />

      <br />
      {error && <h2>Something went Wrong</h2>}
      {loading && <h2>Loading...</h2>}

      {!error && !loading && products.length > 0 && <h2>Number of Products are: {products.length}</h2>}
    </>
  )
}

export default App
