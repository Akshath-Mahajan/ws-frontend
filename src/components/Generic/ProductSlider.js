import { makeStyles, useTheme, Paper, Typography } from '@material-ui/core';
import React from 'react'
import Slider from "react-slick"
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles(theme=>({
        center: {display: 'flex', 
        justifyContent:'center', 
        height: 250, 
        alignItems: 'center',
    },
        root: {border: '1px solid #333'},
        arrow: {position: 'absolute', top: '500px', left: -25}
    })
)
function ProductSlider({data, className}) {
    const theme = useTheme();
    const classes = useStyles();
    const settings = {
        arrows: false,
        dots: true,
        autoplay: true,
        infinte: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: theme.breakpoints.values.md,
                settings: {slidesToShow: 3, slidesToScroll: 3}
            },
            {
                breakpoint: theme.breakpoints.values.sm,
                settings: {slidesToShow: 2, slidesToScroll: 2}
            },
            {
                breakpoint: theme.breakpoints.values.xs,
                settings: {slidesToShow: 1, slidesToScroll: 1}
            },
        ]
    }
    return (
        <div className={`${className} ${classes.root}`}>
        {/* <NavigateBeforeIcon className={classes.arrow} /> */}
        <div>
        <Slider {...settings}>
            {
            data.map(item =>( 
                <div className={classes.center}>
                    <Typography variant="h5" align="center">{item}</Typography>
                </div>
                )
            )
            }
        </Slider>
        </div>
        {/* <NavigateNextIcon className={classes.arrow}/> */}
        </div>
      );
}

export default ProductSlider
