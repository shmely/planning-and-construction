//import classes from './textbox.module.css'
import { TextField } from "@mui/material";
const TextBox = ({
    type,
    label,
    shrink = true,
    value,
    multiline,
    onChange,
    placeholder = '',
    helperText,
    rows,
    inputRef
}) => {
    return (
        <div>
            <TextField
                fullWidth
                id={label}
                label={label}
                type={type}
                color="secondary"
                name={label}
                inputRef={inputRef}
                InputLabelProps={{ shrink: shrink }}
                helperText={helperText}
                value={value}
                multiline={multiline}
                rows={rows}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>

    )
}

export default TextBox