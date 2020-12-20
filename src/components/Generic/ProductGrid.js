import { Grid } from '@material-ui/core'
import React from 'react'
import { ProductGridItem } from './ProductGridItem'
import Filter from './Filter'
import {useSelector} from 'react-redux'
function sort_by_key(array, key){
    if(key===""){return array}
    key = key.split('-')
    if(key[0] === 'rating'){key[0] = 'avg_rating'}
    if(key[0] == 'name'){
        array.sort(function(a, b){
            var x = a[key[0]].toString(); 
            var y = b[key[0]].toString();
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    else {
        array.sort(function(a, b){
            var x = a[key[0]].toString().replace(/\,/g,''); 
            var y = b[key[0]].toString().replace(/\,/g,'');
            x = parseInt(x)
            y = parseInt(y)
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    if(key[1] === '2'){ array.reverse() }
    return array
}
function ProductGrid({ data }) {
    const sortBy = useSelector(state => state.filter.sortBy)
    const priceRange = useSelector(state => state.filter.priceRange)
    const rating = useSelector(state => state.filter.rating)

    return (
        <Grid container spacing={1}>
            <Grid container item xs={12} md={3}>
                <Filter />
            </Grid>
            <Grid container item spacing={1} xs={12} md={9}>
                {
                    sort_by_key([...data], sortBy).map(
                        (item, index) => {
                        if(item.avg_rating >= rating && priceRange[1] >= item.price && item.price >= priceRange[0])
                            return <ProductGridItem key={index} data={item} />
                    })
                }
            </Grid>
        </Grid>
    )
}

export { ProductGrid }
