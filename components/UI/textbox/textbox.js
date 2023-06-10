import { TextField } from "@mui/material";
const TextBox = ({
    id,
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
        <>
            <TextField
                fullWidth
                id={id}
                label={label}
                type={type}
                color="secondary"
                name={id}
                inputRef={inputRef}
                InputLabelProps={{ shrink: shrink }}
                helperText={helperText}
                value={value}
                multiline={multiline}
                rows={rows}
                placeholder={placeholder}
                onChange={onChange}
            />
        </>

    )
}

export default TextBox