import React, { useState } from 'react'

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Link } from 'react-router-dom'
import HomePage from './components/HomePage.js'
import ProductPage from './components/ProductPage.js'
import Search from './components/Search.js'

function App() {

  return (
  <Router>
     <section className='bg-slate-100 h-fit'>
        
        <div className='   bg-gray-800 p-4 text-white text-center font-bold text-3xl'>
          <a href="/">Home</a>
        </div>
        <div className='flex justify-center mt-3'><Search /></div>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path='/product/:slug' element={<ProductPage />}/>
          </Routes>
          
        </main>
     </section>
  </Router>
  )
}

export default App