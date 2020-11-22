import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCollectionProducts } from '../../redux'
import { ProductGrid } from '../Generic'
function Collection() {
    const dispatch = useDispatch()
    useEffect(() => {dispatch(fetchCollectionProducts())} ,[])
    const data = useSelector(state => state.collection.products)
    return (
        <div>
            {
            Object.keys(data).length?
            <ProductGrid data={data} />:
            <Typography variant="h1" align="center">No products found</Typography>
            }

        </div>
    )
}

export default Collection
