import { Grid, ListItem, ListItemIcon, ListItemText, Paper, Slider, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { ProductGridItem } from './ProductGridItem'
import Filter from './Filter'

function ProductGrid({ data }) {
    const settings = [[]]
    return (
        <Grid container spacing={1}>
        <Grid container item xs={12} sm={3}>
            <Filter />
        </Grid>
        <Grid container item spacing={1} xs={12} sm={9}>
            {data.map((item, index) => <ProductGridItem key={index} data={item} />)}
        </Grid>
        </Grid>
    )
}

export { ProductGrid }
