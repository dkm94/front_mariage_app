import React, { Dispatch, SetStateAction } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type SelectArray = {
    value: string;
    name: string;
}

interface SelectProps {
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
    placeholder?: string;
    array: SelectArray[];
    label?: string;
    size?: "small" | "medium" | undefined;
}

export const SingleSelect = (props: SelectProps) => {
    const { 
        selected, 
        setSelected,
        placeholder,
        array,
        label,
        size
    } = props;

    const handleChange = (event: SelectChangeEvent) => {
        setSelected(event.target.value);
    };

return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" fullWidth>
        <InputLabel id="demo-select-small-label">{label}</InputLabel>
        <Select
        // labelId="demo-select-small-label"
        // id="demo-select-small"
        value={selected}
        label={placeholder}
        onChange={handleChange}
        fullWidth
        size={props.size ? props.size : "small"}
        >
        {array.map((food) => (
            <MenuItem key={food.value} value={food.value}>{food.name}</MenuItem>
        ))}
        </Select>
    </FormControl>
);
}
