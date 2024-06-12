import React, { useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import MultiSelectAll from './MUISelectAll';

const Selection = () => {
  const initialValue = [{ label: 'Uber/Sales', value: '14' }];

  const departmentNames = [
    { label: 'Amazon/Sales', value: '1' },
    { label: 'Amazon/Customer Support', value: '2' },
    { label: 'Google/Operations', value: '3' },
    { label: 'Google/Engineering', value: '4' },
    { label: 'Google/Services', value: '5' },
    { label: 'Google/Customer Support', value: '6' },
    { label: 'Netflix/Sales', value: '7' },
    { label: 'Netflix/Engineering', value: '8' },
    { label: 'Netflix/Services', value: '9' },
    { label: 'Netflix/Operations', value: '10' },
    { label: 'Microsoft/Sales', value: '11' },
    { label: 'Microsoft/Operations', value: '12' },
    { label: 'Microsoft/Customer Support', value: '13' },
    { label: 'Uber/Sales', value: '14' },
    { label: 'Uber/Services', value: '15' },
    { label: 'Uber/Customer Support', value: '16' },
    { label: 'Uber/Engineering', value: '17' },
    { label: 'Uber/Operations', value: '18' },
    { label: 'Walmart/Sales', value: '19' },
    { label: 'Walmart/Services', value: '20' },
    { label: 'Walmart/Operations', value: '21' },
    { label: 'Walmart/Engineering', value: '22' },
    { label: 'Walmart/Customer Support', value: '23' },
    { label: 'CVS/Sales', value: '24' },
    { label: 'CVS/Customer Support', value: '25' },
    { label: 'CVS/Engineering', value: '26' },
    { label: 'CVS/Operations', value: '27' }
  ];

  const getTextBoxInputValue = (input) => {
    return input.map((itm) => itm.label).join(';');
  };

  const [currentSelection, setCurrentSelection] = useState(getTextBoxInputValue(initialValue));

  const handleSelectionChange = (result) => {
    const valueToSave = result.map((itm) => itm.label).join(';');
    setCurrentSelection(valueToSave);
  };

  return (
    <Grid container flexDirection="column" alignItems="center">
      <Grid item xs={12} sx={{ p: 2 }}>
        <MultiSelectAll
          sx={{ maxheight: '700px' }}
          items={departmentNames}
          selectAllLabel="Select All"
          value={initialValue}
          onChange={handleSelectionChange}
        />
      </Grid>
      <Grid item xs={12} sx={{ p: 2 }}>
        <Typography>Selected items:</Typography>
        <TextField sx={{ width: '450px' }} value={currentSelection} />
      </Grid>
    </Grid>
  );
};

export default Selection;
