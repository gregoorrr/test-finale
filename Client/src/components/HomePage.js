import React, { useEffect, useReducer, useState } from 'react'
import logger from 'use-reducer-logger'
import { Link } from 'react-router-dom'
import axios from 'axios'


const reducer = (state,action) =>{
  switch(action.type){
    case 'FETCH_REQUEST':
      return{...state,loading:true}
    case 'FETCH_SUCCESS':
      return{...state,products: action.payload, loading:false}
    case 'FETCH_FAIL':
      return{...state,error: action.payload,loading:true}
    default:
      return state
  }
}
function HomePage() {
  const [{loading,error,products}, dispatch] = useReducer(logger(reducer),{
    products: [],
    loading: true,
    error: ''
  })
  //const [products,setProducts] = useState([])

  useEffect(() =>{
    const fetchData = async () =>{
      dispatch({type : 'FETCH_REQUEST'})
      try{
        const result = await axios.get('/api/products')
        dispatch({type: 'FETCH_SUCCESS', payload: result.data})
      }catch(err){
        dispatch({type: 'FETCH_FAIL',payload: err.message})
      }
      
      //setProducts(result.data)
    }
    fetchData()
  }, [])

 /* function generateRandomNumbers(min, max, count) {
    const minNumber = 1; 
    const maxNumber = 10; 
    const numberOfNumbers = 15; 
    
    const randomNumbers = generateRandomNumbers(minNumber, maxNumber, numberOfNumbers);
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
  }
*/

  return (
    <>
        <div className='border-b border-gray-800 mb-6'><h1 className=' p-4 text-center text-3xl font-bold'>Featured Products</h1></div>
          
            
          
                <div className='flex justify-center items-center gap-44 flex-wrap'>
                  {

                    loading? (
                      <div>Loading...</div>
                    ) :
                    error? (
                      <div>{error}</div>
                    ) : 
                    products.map(product =>(
                      <div key={product.slug} className='rounded-md h-1/3 w-1/3 flex flex-col justify-center items-center gap-2 p-6 border border-gray-500 text-lg font-semibold'>
                          <Link to={`/product/${product.slug}`}>
                             <img src={product.img} alt={product.name} className=''/>
                          </Link>
                          <Link to={`/product/${product.slug}`}>
                            <p className='text-blue-500 underline'>{product.name}</p>
                          </Link>
      
                          <Link to={`/product/${product.slug}`}>
                            <p>${product.price}</p>
                          </Link>
                          
                          <button className=' bg-yellow-400 hover:bg-yellow-200 p-2 rounded-lg border border-yellow-600'>Add to cart</button>
                      </div>
                    )
                    )
                  }
        </div>
    </>
  )
}

export default HomePage