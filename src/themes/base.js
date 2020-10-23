import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue'
import grey from '@material-ui/core/colors/grey'

let theme = createMuiTheme({
    palette: {
        primary: {main: blue[300]},
        background: {default: '#f4f7f6', paper: grey[50]},
        divider: 'rgba(176, 224, 230, 0.12)',
        text: {
            primary: 'rgba(52, 58, 64, 1)',
            secondary: 'rgba(52, 58, 64, 0.6)',
            disabled: 'rgba(52, 58, 64, 0.4)',
            hint: 'rgba(52, 58, 64, 0.4)',
        }
    },
    typography:{
        
    }
});

theme = responsiveFontSizes(theme);

export default theme;