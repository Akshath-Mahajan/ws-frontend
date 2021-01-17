import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
// import blue from '@material-ui/core/colors/blue'
// import grey from '@material-ui/core/colors/grey'

let theme = createMuiTheme({
    palette: {
        beige: "#EFE4CB"
    },
    typography: {
        fontFamily: "Open Sans"
    }
});

theme = responsiveFontSizes(theme);

let headingFont = createMuiTheme({
    typography: {
        fontFamily: "Arapey"
    }
});
headingFont = responsiveFontSizes(headingFont);
export { headingFont, theme }