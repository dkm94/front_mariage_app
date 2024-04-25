import React from 'react';

import { Chip, styled } from '@material-ui/core';

const StyledChip = styled(Chip)({
    height: 'auto',
    '& .MuiChip-label': {
      display: 'block',
      fontFamily: "initial",
      fontSize: '1rem',
      padding: "5px"
    },
  });

interface CustomChipProps {
    label: string;
    style: Record<string, string>;
}

const CustomChip = (props: CustomChipProps) => {
    const { label, style } = props;

  return (
    <StyledChip label={label} style={style} />
  )
}

export default CustomChip