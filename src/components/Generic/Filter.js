import { ListItem, ListItemIcon, ListItemText, Slider, Paper, TextField, InputAdornment, makeStyles, Radio, 
    RadioGroup, FormControlLabel, Typography, Collapse, List } from '@material-ui/core'
import React from 'react'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StarIcon from '@material-ui/icons/Star';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import Rating from '@material-ui/lab/Rating';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles((theme)=>({
    nested: {paddingLeft: theme.spacing(6)},
    fullWidth: {width:'100%'}
}))
function Filter() {
    const [range, setRange] = React.useState([0, 10000])
    const changeRange = (event, newValue) => { 
        if(newValue[1] >= newValue[0])
        setRange(newValue)
        else
        setRange([newValue[0], newValue[0]])
    }
    const [rOpen, setROpen] = React.useState(false) //r = rating
    const [pOpen, setPOpen] = React.useState(true) //p = price
    const [sOpen, setSOpen] = React.useState(false) //s = sort
    const handleExpandClick = (param) => {
        if(param==='r'){setROpen(!rOpen)}
        if(param==='p'){setPOpen(!pOpen)}
        if(param==='s'){setSOpen(!sOpen)}
    }
    const [rating, setRating] = React.useState(0)
    const [order, setOrder] = React.useState(0)
    const classes = useStyles()
    return (
        <Paper className={classes.fullWidth}>
            {/* Order By */}
            <ListItem button onClick={()=>handleExpandClick('s')}>
                <ListItemIcon>{<ImportExportIcon />}</ListItemIcon>
                <ListItemText primaryTypographyProps={{variant:'button'}} primary={'Sort By'} />
                {sOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={sOpen} timeout="auto" unmountOnExit>
                <RadioGroup className={classes.nested}>
                    <FormControlLabel value="1" control={<Radio size="small" checked={1===order}/>} onClick={()=>setOrder(1)} label={<Typography variant="body1">Name A-Z </Typography>} />
                    <FormControlLabel value="2" control={<Radio size="small" checked={2===order}/>} onClick={()=>setOrder(2)} label={<Typography variant="body1">Name Z-A </Typography>} />
                    <FormControlLabel value="3" control={<Radio size="small" checked={3===order}/>} onClick={()=>setOrder(3)} label={<Typography variant="body1">Rating Highest to Lowest</Typography>} />    
                    <FormControlLabel value="4" control={<Radio size="small" checked={4===order}/>} onClick={()=>setOrder(4)}label={<Typography variant="body1"> Rating Lowest to Highest</Typography>} />
                    <FormControlLabel value="5" control={<Radio size="small" checked={5===order}/>} onClick={()=>setOrder(5)}label={<Typography variant="body1"> Price Highest to Lowest</Typography>} />
                    <FormControlLabel value="6" control={<Radio size="small" checked={6===order}/>} onClick={()=>setOrder(6)}label={<Typography variant="body1"> Price Lowest to Highest</Typography>} />
                </RadioGroup>
            </Collapse>
            {/* Price Filter */}
            <ListItem button onClick={()=>handleExpandClick('p')}>
                <ListItemIcon>{<AttachMoneyIcon />}</ListItemIcon>
                <ListItemText primaryTypographyProps={{variant:'button'}} primary={'Price'} />
                {pOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
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
                        value={range[0]} onChange={(event)=>{ setRange( [event.target.value, range[1]]) }}
                        InputProps={{
                        startAdornment: (<InputAdornment position="start">₹</InputAdornment>),
                    }}/>
                    <TextField type="number" placeholder="Max" variant="outlined" 
                        value={range[1]} onChange={(event)=>{ setRange( [range[0], event.target.value]) }}
                        InputProps={{
                        startAdornment: (<InputAdornment position="start">₹</InputAdornment>),
                    }}/>
                </ListItem>
            </Collapse>
            {/* Rating Filter */}
            <ListItem button onClick={()=>{handleExpandClick('r')}}>
                <ListItemIcon> <StarIcon/> </ListItemIcon>
                <ListItemText primaryTypographyProps={{variant:'button'}} primary={'Rating'} />
                {rOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={rOpen} timeout="auto" unmountOnExit>
                <RadioGroup className={classes.nested}>
                    <FormControlLabel value="4" control={<Radio size="small" checked={4===rating}/>} onClick={()=>setRating(4)} label={<Typography variant="body1">4 and above </Typography>} />
                    <FormControlLabel value="3" control={<Radio size="small" checked={3===rating}/>} onClick={()=>setRating(3)} label={<Typography variant="body1">3 and above </Typography>} />
                    <FormControlLabel value="2" control={<Radio size="small" checked={2===rating}/>} onClick={()=>setRating(2)} label={<Typography variant="body1">2 and above </Typography>} />    
                    <FormControlLabel value="1" control={<Radio size="small" checked={1===rating}/>} onClick={()=>setRating(1)}label={<Typography variant="body1">1 and above </Typography>} />
                </RadioGroup>
            </Collapse>
        </Paper>
    )
}

export default Filter
