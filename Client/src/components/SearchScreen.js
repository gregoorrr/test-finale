import React, { useEffect, useReducer } from 'react'
import { useNavigate,Link,useLocation } from 'react-router-dom'
import axios from 'axios'

const reducer = (state,action) =>{
    switch(action.type){
        case 'FETCH_REQUEST':
            return{...state,loading:true}
        case 'FETCH_SUCCESS':
            return{...state,
            products:action.payload.products,
            page: action.payload.page,
            pages: action.payload.pages,
            countProducts: action.payload.countProducts,
            loading:false
        }
        case 'FETCH_FAIL':
            return{...state,loading:false, error:action.payload}
        default:
            return state
    }
}
function SearchScreen() {

    const navigate = useNavigate()
    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const category = sp.get('category') || 'all'

    const [{loading, error, products, pages, countProducts}, dispatch] = useReducer(reducer, {
        loading:true,
        error:''
    })

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const {data} = await axios.get(
                    `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}`
                )
            }catch(err){
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(error)
                })
            }
        }
    }, [])
  return (
    <div>SearchScreen</div>
  )
}

export default SearchScreen