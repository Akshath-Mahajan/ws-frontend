import Axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { ProductGrid } from '../Generic'
import { DOMAIN } from '../../settings'
import { headingFont } from '../../baseTheme'
import { ThemeProvider, Typography } from '@material-ui/core'
import LoadingBackdrop from '../Generic/LoadingBackdrop'

function SearchQ() {
    const {query} = useParams()
    const [data, setData] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    React.useEffect(()=>{
        setLoading(true)
        Axios.get(DOMAIN+`/api/products?query=${query}`)
        .then(res => {
            setData(res.data)
            setLoading(false)
        })
    }, [query])
    if(loading)
        return <LoadingBackdrop open />
        
    if(data && data.length)
        return (<ProductGrid data={data} />)
    return <ThemeProvider theme={headingFont}>
        <Typography variant="h2" align="center">
            No items found matching this query
        </Typography>
    </ThemeProvider>
}

export default SearchQ
