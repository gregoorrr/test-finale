import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect,useReducer } from 'react'
import axios from 'axios'



const reducer = (state,action) =>{
  switch(action.type){
    case 'FETCH_REQUEST':
      return{...state,loading:true}
    case 'FETCH_SUCCESS':
      return{...state,product: action.payload, loading:false}
    case 'FETCH_FAIL':
      return{...state,error: action.payload,loading:true}
    default:
      return state
  }
}
function ProductPage() {
  const [{loading,error,product}, dispatch] = useReducer((reducer),{
    product: [],
    loading: true,
    error: ''
  })

  //const [products,setProducts] = useState([])
  const params = useParams()
  const {slug} = params

  useEffect(() =>{
    const fetchData = async () =>{
      dispatch({type : 'FETCH_REQUEST'})
      try{
        const result = await axios.get(`/api/products/slug/${slug}`)
        dispatch({type: 'FETCH_SUCCESS', payload: result.data})
      }catch(err){
        dispatch({type: 'FETCH_FAIL',payload: err.message})
      }
      
      //setProducts(result.data)
    }
    fetchData()
  }, [slug])

  

  return (
    <main className='flex justify-evenly mt-5' >
      <div className='flex justify-center'>
        <img src={product.img}alt="" className='w-80'/>
      </div>
      <div className='border border-emerald-800 bg-slate-200 flex flex-col p-7'>
        <div className='flex flex-col justify-center items-center gap-10 '>
          <h1 className='text-2xl font-semibold'>{product.name}</h1>
            <strong><p className='text-3xl'>Regular Size - Nike Trousers</p></strong>
            <div className='flex gap-3'>
              <div>${product.price} </div>
              <p>-</p>
              <div className='text-gray-700'>IVA Inclusa</div>
            </div>
            
            <button className='bg-yellow-500 hover:bg-yellow-300 rounded-md p-3'>Add to Cart</button>
        </div>
        
      </div>

    </main>
    
  )
}

export default ProductPage