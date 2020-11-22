import { Grid } from '@material-ui/core'
import React from 'react'
import { ProductGridItem } from './ProductGridItem'

function ProductGrid({ data }) {
    return (
        <Grid container spacing={2}>
            {Object.keys(data).map(key => <ProductGridItem key={key} data={data[key]} />)}
        </Grid>
    )
}

export { ProductGrid }
