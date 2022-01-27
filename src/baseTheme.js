import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue'
import grey from '@material-ui/core/colors/grey'

let theme = createMuiTheme({
    palette: {
    },
    typography: {
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