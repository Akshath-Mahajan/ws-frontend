import { Grid } from '@material-ui/core'
import React from 'react'
import { ProductGridItem } from './ProductGridItem'

function ProductGrid({ data }) {
    return (
        <Grid container spacing={2}>
            {data.map((item, index) => <ProductGridItem key={index} data={item} />)}
        </Grid>
    )
}

export { ProductGrid }
