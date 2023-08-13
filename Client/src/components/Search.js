import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Search() {
  const [query,setQuery] = useState('')
  const navigate = useNavigate()
  const submitHandler = (e) =>{
    e.preventDefault();
    navigate(query ?  `/search/query=${query}` : '/search')
  }

  return (
      <form action="" onSubmit={submitHandler}>
        <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder='Search Products...' className='border border-slate-600'/>
        <button type='submit'>Search</button>
      </form>
  )
}   

export default Search