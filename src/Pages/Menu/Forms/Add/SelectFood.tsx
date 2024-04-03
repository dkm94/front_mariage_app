import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const foodType = [
    { value: "starter", name: "Entrée" },
    { value: "maincourse", name: "Plat principal" },
    { value: "dessert", name: "Dessert" },
    { value: "apetizer", name: "Apéritif" },
    { value: "beverage", name: "Boisson" }
]

interface SelectFoodProps {
    selectedFood: string;
    setSelectedCategory: (value: string) => void;
}

export const SelectFood = (props: SelectFoodProps) => {
    const { selectedFood, setSelectedCategory } = props;

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" fullWidth>
      <InputLabel id="demo-select-small-label">Type</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectedFood}
        label="Age"
        onChange={handleChange}
        fullWidth
      >
        {foodType.map((food) => (
            <MenuItem key={food.value} value={food.value}>{food.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
