import React, { useEffect } from 'react';

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
  guests: FormattedGuestType[];
  tableId: string;
  setGuestsIds: (ids) => any;
  edit: FormattedGuestType;
}

const MultipleSelect = (props: MultipleSelectProps) => {
  //TODO: disable guest who sits in another table
  // TODO BUG: Je peux ajouter un guest, je ne peux pas le supprimer
  // TODO BUG: La modification du titre ne marche que si je le modifie
  const { guests, tableId, setGuestsIds, edit } = props;

  const tableGuests = guests.filter((guest) => guest.tableID === edit.id);
  const initialListWithNames = tableGuests.map((guest) => guest.name);

  const theme = useTheme();

  const [guestValues, setGuestValues] = React.useState<string[]>(initialListWithNames);

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
    const getIds = (guestValues: string[]) => guests.filter((guest: FormattedGuestType) => guestValues.includes(guest.name)).map((guest: FormattedGuestType) => guest.id);
      const guestsIds = getIds(guestValues);
      setGuestsIds(guestsIds);
    }, [guestValues])

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={guestValues}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {guests.map((guest) => (
            <MenuItem
              key={guest.id}
              value={guest.name}
              style={getStyles(guest.name, guestValues, theme)}
            >
              {guest.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default MultipleSelect;