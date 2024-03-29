import React, { useEffect, useState } from 'react';

import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import { FormattedGuestType, GuestType } from '../../../types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, guestValues: readonly string[], theme: Theme) {
  return {
    fontWeight:
      guestValues.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightBold,
  };
}

interface MultipleSelectProps {
  guests: GuestType[];
  setGuestsIds: (ids) => any;
  edit: FormattedGuestType;
}

const MultipleSelect = (props: MultipleSelectProps) => {
  const { guests, setGuestsIds, edit } = props;
  const theme = useTheme();

  const tableGuests = guests.filter((guest) => guest?.tableID === edit.id && guest?.name !== undefined);
  const initialListWithNames: string[] = tableGuests
  .map((guest) => guest!.name)  // Utilisation de l'opérateur "!" pour indiquer que guest.name ne peut pas être undefined ici
  .slice()
  .sort();

  const [guestValues, setGuestValues] = useState<string[]>(initialListWithNames);

  const handleChange = (event: SelectChangeEvent<typeof guestValues>) => {
    const {
      target: { value },
    } = event;
    setGuestValues(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  
  useEffect(() => {
    const filteredValues = guestValues.filter((guest) => guestValues.includes(guest));
    const findFilteredValuesIds = filteredValues.map((value) => {
      const matchingGuests = guests?.find((guest) => guest?.name === value)
      return matchingGuests?._id;
    });
    setGuestsIds(findFilteredValuesIds);
    }, [guestValues, guests, setGuestsIds])

    useEffect(() => {
      
    }, []);

  return (
    <div>
      <FormControl sx={{ width: 1 }}>
        <InputLabel id="demo-multiple-chip-label">Liste</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={guestValues}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, padding: 0 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          SelectDisplayProps={{ style: { padding: "9px" } }}
        >
          {guests.map((guest) => (
            <MenuItem
              key={guest?._id}
              value={guest?.name}
              style={guest && getStyles(guest.name, guestValues, theme)}
              disabled={guest?.tableID !== null && guest?.tableID !== edit.id}
            >
              {guest?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default MultipleSelect;