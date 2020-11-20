import { Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { ProductGrid, ProductGridItem } from '../Generic/'
function Home(props) {
    /* GO OVER HOOKS USAGE WARNINGS IN REDUX DOCS, 
    OTHERWISE USE MAPSTATETOPROPS AND MAPDISPATCHTOPROPS WITH CONNECTOR */
    return (
        <div>
            <Typography variant="h1">Hello World</Typography>
        </div>
    )
}
export default Home