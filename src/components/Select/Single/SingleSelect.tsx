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
    completedTasks?: number;
    incompleteTasks?: number;
}

export const SingleSelect = (props: SelectProps) => {
    const { 
        selected, 
        setSelected,
        placeholder,
        array,
        label,
        size,
        completedTasks,
        incompleteTasks
    } = props;

    const totalTasks: number = completedTasks! + incompleteTasks!;

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
        size={size ? size : "small"}
        >
        {array.map((el) => (
            <MenuItem 
            key={el.value} 
            value={el.value}>{el.name} {`(${el.value === "done" ? completedTasks : el.value === "incomplete" ? incompleteTasks : totalTasks})`}
            </MenuItem>
        ))}
        </Select>
    </FormControl>
);
}
