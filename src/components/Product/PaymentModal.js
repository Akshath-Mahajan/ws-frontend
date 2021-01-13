import React from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, FormControl, Button, useTheme, useMediaQuery, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Typography} from '@material-ui/core'
function PaymentModal({open, handleClose}) {
    const [value, setValue] = React.useState("4");
    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    return (
        <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
            <DialogTitle> Select Payment Method </DialogTitle>
            <DialogContent>
                <FormControl component="fieldset">
                    <Typography> Please select one of the following payment options to continue placing the order </Typography>
                    <RadioGroup value={value} onChange={handleRadioChange}>
                        <FormControlLabel value="1" control={<Radio />} label="Card Payment" />
                        <FormControlLabel value="2" control={<Radio />} label="Paypal" />
                        <FormControlLabel value="3" control={<Radio />} label="PayTM" />
                        <FormControlLabel value="4" control={<Radio />} label="Cash on delivery" />
                    </RadioGroup>
        </FormControl>
            <DialogActions>
                <Button variant="outlined" fullWidth>
                    Proceed to pay
                </Button>
            </DialogActions> 
            </DialogContent>
        </Dialog>
    )
}

export default PaymentModal
