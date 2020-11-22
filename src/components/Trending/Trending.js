import { Typography } from '@material-ui/core'
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
            {
                Object.keys(data).length?<ProductGrid data={data} />:<Typography variant="h1" align="center">No products found</Typography>
            }
            
        </div>
    )
}

export default Trending
