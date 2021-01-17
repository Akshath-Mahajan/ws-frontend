import { ListItem, ListItemIcon, ListItemText, Slider, Paper, TextField, InputAdornment, makeStyles, Radio, 
    RadioGroup, FormControlLabel, Typography, Collapse, List, ThemeProvider } from '@material-ui/core'
import React, { useEffect } from 'react'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StarIcon from '@material-ui/icons/Star';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LayersClearIcon from '@material-ui/icons/LayersClear';
import {useDispatch, useSelector} from 'react-redux'
import { changePriceRange, sortBy, changeRating, toggleROpen, togglePOpen, toggleSOpen, clearFilters } from '../../redux/';
import { headingFont } from '../../baseTheme';
const useStyles = makeStyles((theme)=>({
    nested: {paddingLeft: theme.spacing(6)},
    fullWidth: {width:'100%'}
}))
function Filter() {
    const dispatch = useDispatch()
    useEffect(()=>{dispatch(clearFilters())},[])
    const rOpen = useSelector(state => state.filter.rOpen) //rating
    const pOpen = useSelector(state => state.filter.pOpen) //price
    const sOpen = useSelector(state => state.filter.sOpen) //sort
    const rating = useSelector(state=>state.filter.rating)
    const order = useSelector(state=>state.filter.sortBy)
    const classes = useStyles()
    const setRating=(newRating) => { dispatch(changeRating(newRating)) }
    const setOrder = (order) => {dispatch(sortBy(order))}
    const range = useSelector(state => state.filter.priceRange)
    const changeRange = (event, newValue) => { 
        if(newValue[1] >= newValue[0])
            dispatch(changePriceRange(newValue))
        else
            dispatch(changePriceRange([newValue[0], newValue[0]]))
    }
    const handleExpandClick = (param) => {
        if(param==='r'){dispatch(toggleROpen())}
        if(param==='p'){dispatch(togglePOpen())}
        if(param==='s'){dispatch(toggleSOpen())}
    }
    return (
        <Paper className={classes.fullWidth}>
            {/* Order By */}
            <ThemeProvider theme={headingFont}>   
                <ListItem button onClick={()=>handleExpandClick('s')}>
                    <ListItemIcon>{<ImportExportIcon />}</ListItemIcon>
                    <ListItemText primaryTypographyProps={{variant:'button'}} primary={'Sort By'} />
                    {sOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
            </ThemeProvider>
            <Collapse in={sOpen} timeout="auto" unmountOnExit>
                <RadioGroup className={classes.nested}>
                    <FormControlLabel value="name-1" control={<Radio size="small" checked={"name-1"===order}/>} onClick={()=>setOrder("name-1")} label={<Typography variant="body1">Name A-Z </Typography>} />
                    <FormControlLabel value="name-2" control={<Radio size="small" checked={"name-2"===order}/>} onClick={()=>setOrder("name-2")} label={<Typography variant="body1">Name Z-A </Typography>} />
                    <FormControlLabel value="rating-1" control={<Radio size="small" checked={"rating-1"===order}/>} onClick={()=>setOrder("rating-1")} label={<Typography variant="body1">Rating Lowest to Highest</Typography>} />    
                    <FormControlLabel value="rating-2" control={<Radio size="small" checked={"rating-2"===order}/>} onClick={()=>setOrder("rating-2")}label={<Typography variant="body1"> Rating Highest to Lowest</Typography>} />
                    <FormControlLabel value="price-1" control={<Radio size="small" checked={"price-1"===order}/>} onClick={()=>setOrder("price-1")}label={<Typography variant="body1"> Price Lowest to Highest</Typography>} />
                    <FormControlLabel value="price-2" control={<Radio size="small" checked={"price-2"===order}/>} onClick={()=>setOrder("price-2")}label={<Typography variant="body1"> Price Highest to Lowest</Typography>} />
                </RadioGroup>
            </Collapse>
            {/* Price Filter */}
            <ThemeProvider theme={headingFont}>   
                <ListItem button onClick={()=>handleExpandClick('p')}>
                    <ListItemIcon>{<AttachMoneyIcon />}</ListItemIcon>
                    <ListItemText primaryTypographyProps={{variant:'button'}} primary={'Price'} />
                    {pOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
            </ThemeProvider>
            <Collapse in={pOpen} timeout="auto" unmountOnExit>
                <ListItem>
                    <Slider
                        value={range}
                        min={0}
                        step={250}
                        max={10000}
                        onChange={changeRange}
                        valueLabelDisplay="auto"
                    />
                </ListItem>
                <ListItem>
                    <TextField type="number" placeholder="Min" variant="outlined" 
                        value={range[0]} onChange={(event)=>{ dispatch(changePriceRange( [event.target.value, range[1]])) }}
                        InputProps={{
                        startAdornment: (<InputAdornment position="start">₹</InputAdornment>),
                    }}/>
                    <TextField type="number" placeholder="Max" variant="outlined" 
                        value={range[1]} onChange={(event)=>{ dispatch(changePriceRange( [range[0], event.target.value])) }}
                        InputProps={{
                        startAdornment: (<InputAdornment position="start">₹</InputAdornment>),
                    }}/>
                </ListItem>
            </Collapse>
            {/* Rating Filter */}
            <ThemeProvider theme={headingFont}>   
                <ListItem button onClick={()=>{handleExpandClick('r')}}>
                    <ListItemIcon> <StarIcon/> </ListItemIcon>
                    <ListItemText primaryTypographyProps={{variant:'button'}} primary={'Rating'} />
                    {rOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
            </ThemeProvider>
            <Collapse in={rOpen} timeout="auto" unmountOnExit>
                <RadioGroup className={classes.nested}>
                    <FormControlLabel value="4" control={<Radio size="small" checked={4===rating}/>} onClick={()=>setRating(4)} label={<Typography variant="body1">4 and above </Typography>} />
                    <FormControlLabel value="3" control={<Radio size="small" checked={3===rating}/>} onClick={()=>setRating(3)} label={<Typography variant="body1">3 and above </Typography>} />
                    <FormControlLabel value="2" control={<Radio size="small" checked={2===rating}/>} onClick={()=>setRating(2)} label={<Typography variant="body1">2 and above </Typography>} />    
                    <FormControlLabel value="1" control={<Radio size="small" checked={1===rating}/>} onClick={()=>setRating(1)}label={<Typography variant="body1">1 and above </Typography>} />
                    <FormControlLabel value="0" control={<Radio size="small" checked={0===rating}/>} onClick={()=>setRating(0)}label={<Typography variant="body1">0 and above </Typography>} />
                </RadioGroup>
            </Collapse>
            {/* Clear Filters */}
            <ThemeProvider theme={headingFont}>   
                <ListItem button onClick={()=>{dispatch(clearFilters())}}>
                    <ListItemIcon> <LayersClearIcon/> </ListItemIcon>
                    <ListItemText primaryTypographyProps={{variant:'button'}} primary={'Clear Filters'} />
                </ListItem>
            </ThemeProvider>
        </Paper>
    )
}

export default Filter
