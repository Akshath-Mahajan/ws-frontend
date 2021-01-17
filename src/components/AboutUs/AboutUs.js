import { Card, CardMedia, Grid, makeStyles, ThemeProvider, Typography } from '@material-ui/core'
import React from 'react'
import { headingFont } from '../../baseTheme'
const useStyles = makeStyles((theme)=>({
        cardRoot: { position: 'relative', width: '100%' },
        cardContainer: { display: 'grid' },
        cardMedia: { gridArea: '1/1' },
        overlay: {
            position: 'absolute',
            top: '1px',
            left: '1px',
            right: '1px',
            bottom: '1px',
            color: '#F8F8FF',
        },
        bigMarginTop: {
            marginTop: theme.spacing(10)
        },
    })
)
function AboutUs() {
    const classes = useStyles()
    return (
        <Grid container justify="space-around" className={classes.root}>
            <Grid item xs={12}>
                <Card className={`${classes.cardRoot} ${classes.mb} ${classes.cardContainer}`}>
                    <CardMedia className={classes.cardMedia}
                        component="img"
                        alt="collection image"
                        style={{height: '40vh'}}
                        image="https://www.itl.cat/pngfile/big/210-2102958_dark-desk-laptop-macbook-room-table-technology-desk.jpg"
                    />
                    <div className={`${classes.overlay} ${classes.dark}`}>
                    <ThemeProvider theme={headingFont}>
                        <Typography variant="h2" align="center" style={{marginTop:'15vh'}}>About Us</Typography>
                    </ThemeProvider>
                    </div>
                </Card>
            </Grid>
            <Grid item container xs={12} justify="center">
                <Grid item xs={7} className={classes.bigMarginTop}>
                    <ThemeProvider theme={headingFont}>
                        <Typography variant="h3" align="center">Lorem Ipsum Dolor Sit Amet</Typography>
                    </ThemeProvider>
                    <Typography variant="h6" align="center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis augue at elit porttitor, id vehicula neque tincidunt. Mauris suscipit magna in erat luctus semper. Nunc posuere, nisi quis volutpat sodales, risus nisi fermentum urna, id eleifend nulla tortor in justo. Praesent est sem, interdum non cursus sed, consectetur vitae erat. Cras eget libero cursus, tincidunt est non, euismod diam. Sed ornare libero at ultricies laoreet. Phasellus eu erat dui.

                    Nunc quis nisi in justo sagittis volutpat nec in augue. Integer faucibus sem eget cursus cursus. Mauris id iaculis felis. Aliquam eu sollicitudin sapien. Donec lacinia dui ut pulvinar condimentum. Integer neque tortor, blandit eget pellentesque at, commodo id dui. Nulla facilisi. Praesent efficitur quis turpis vitae suscipit. Donec imperdiet, ex sit amet venenatis fermentum, tortor sem pretium nulla, vitae posuere lectus est et felis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam ut hendrerit mi. Quisque suscipit dignissim pharetra.

                    Nam varius mi et porttitor varius. Morbi dapibus dui id velit pulvinar, vel bibendum odio vehicula. Vestibulum gravida dui in imperdiet placerat. Suspendisse eleifend suscipit nunc, ac pellentesque justo feugiat eget. Aliquam feugiat enim eget erat convallis, a mattis purus sollicitudin. Proin ornare sed arcu eget cursus. Integer mattis finibus pellentesque. Suspendisse suscipit lacinia facilisis.
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AboutUs
