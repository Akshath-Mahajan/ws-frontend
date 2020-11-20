import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTrendingProducts } from '../../redux'
import { ProductGrid } from '../Generic'
function Trending() {
    const dispatch = useDispatch()
    useEffect(() => {dispatch(fetchTrendingProducts())} ,[])
    const data = useSelector(state => state.trending.products)
    return (
        <div>
            <ProductGrid data={data} />
        </div>
    )
}

export default Trending
