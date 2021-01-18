import { ThemeProvider, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { headingFont } from '../../baseTheme'
import { fetchTrendingProducts } from '../../redux'
import { ProductGrid } from '../Generic'
import LoadingBackdrop from '../Generic/LoadingBackdrop'
function Trending() {
    const dispatch = useDispatch()
    useEffect(() => {dispatch(fetchTrendingProducts())} ,[])
    const data = useSelector(state => state.trending.products)
    const loading = useSelector(state=>state.trending.loading)
    if(loading)
        return <LoadingBackdrop open />
    return (
        <div>
            {
                Object.keys(data).length?<ProductGrid data={data} />:
                <ThemeProvider theme={headingFont}>
                    <Typography variant="h1" align="center">No products found</Typography>
                </ThemeProvider>
            }
            
        </div>
    )
}

export default Trending
