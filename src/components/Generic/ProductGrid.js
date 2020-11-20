import { Grid, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import React from 'react'
import { useSelector } from 'react-redux'
import { ProductGridItem } from './ProductGridItem'

function ProductGrid({ data }) {
    return (
        <Grid container spacing={2}>
            {Object.keys(data).map(key => <ProductGridItem key={key} data={data[key]} />)}
        </Grid>
    )
}

export { ProductGrid }
