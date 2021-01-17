import { ThemeProvider, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { headingFont } from '../../baseTheme'
import { fetchNewProducts } from '../../redux'
import { ProductGrid } from '../Generic'
function New() {
    const dispatch = useDispatch()
    useEffect(() => {dispatch(fetchNewProducts())} ,[])
    const data = useSelector(state => state.new.products)
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

export default New
