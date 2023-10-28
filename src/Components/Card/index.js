import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function Card(style,classProp,children) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        margin:"10px",
        '& > :not(style)': {
          m: 1,
          width: 1800,
          height: 600,
          borderRadius: 2,
          boxShadow: 4,
          
        },
      }}
    >
        
      <Paper>
      {children}
      </Paper>
    </Box>
  );
}