import { makeStyles, useTheme, Paper, Typography } from '@material-ui/core';
import React from 'react'
import Slider from "react-slick"
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { useKeenSlider } from "keen-slider/react"
import {ProductGridItem} from './ProductGridItem'
import {useSelector} from 'react-redux'
import "keen-slider/keen-slider.min.css"

const useStyles = makeStyles(theme=>({
    center: {
        display: 'flex', 
        justifyContent:'center', 
        height: 250, 
        alignItems: 'center',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '100vh',
    },
    p: {paddingTop: theme.spacing(2), paddingBottom:theme.spacing(2)}
})
)
function ProductSlider({data, className}) {
    const theme = useTheme();
    const classes = useStyles();
    const [sliderRef] = useKeenSlider({
        slidesPerView: 1,
        mode: "snap",
        breakpoints: {
          "(min-width: 768px)": {
            slidesPerView: 2,
            mode: "free-snap",
          },
          "(min-width: 1200px)": {
            slidesPerView: 4,
            mode: "free-snap",
          },
        },
      })
    return (
        <div ref={sliderRef} className={`keen-slider ${classes.p}`}>
        {
          data.map((item, idx) =>( 
              <div key={idx} className={`keen-slider__slide number-slide ${classes.item}`}>
                  <ProductGridItem data={item} full/>
              </div>
              )
          )
        }
        </div>
      );
}

export default ProductSlider
