import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Productlistitems from './products/Productlistitems'
import Categories from './categories/Categories'
import { useParams } from 'react-router-dom'

export default function Home() {
  const [products, setProducts] = useState([])
  const{category_id}=useParams()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if(category_id){
          const response = await axios.get(`http://localhost:3001/products/category/${category_id}`)
        setProducts(response.data)
        }else{
          const response = await axios.get('http://localhost:3001/products')
        setProducts(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [category_id])

  return (
    <div className='container'>
      <Categories/>
      <div className='row my-5'>
        {products?.map(product => (
          <Productlistitems key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
