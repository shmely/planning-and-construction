import { FormControlLabel, Checkbox } from '@mui/material';
const CheckBox = (
    
    {
        label,
        checked,
        onChange
    }
) => {

    return (
        <FormControlLabel
            id={label}
            name={label}            
            label={label}
            control={<Checkbox checked={checked} onChange={onChange} />}
        />
    )

}
export default CheckBox