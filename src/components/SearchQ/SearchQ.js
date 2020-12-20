import Axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { ProductGrid } from '../Generic'
import { DOMAIN } from '../../settings'

function SearchQ() {
    const {query} = useParams()
    console.log(query)
    const [data, setData] = React.useState(null)
    React.useEffect(()=>{
        Axios.get(DOMAIN+`/api/products?query=${query}`)
        .then(res => setData(res.data))
    }, [query])
    if(data)
        return (<ProductGrid data={data} />)
    return null
}

export default SearchQ
