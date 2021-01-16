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

export default theme;