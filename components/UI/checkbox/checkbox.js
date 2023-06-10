import { FormControlLabel, Checkbox } from '@mui/material';
const CheckBox = (
    
    {
        id,
        label,
        checked,
        onChange
    }
) => {

    return (
        <FormControlLabel
            id={id}
            name={id}            
            label={label}
            control={<Checkbox checked={checked} onChange={onChange} />}
        />
    )

}
export default CheckBox