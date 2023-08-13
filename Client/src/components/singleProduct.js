import React from 'react'
import { Link } from 'react-router-dom'

export default function Product(props) {
  const {product} = props

  return(
    <div key={product.slug} className='h-1/3 w-1/3 flex flex-col justify-center items-center gap-2 p-6 border border-gray-800 text-lg font-semibold'>
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
}

