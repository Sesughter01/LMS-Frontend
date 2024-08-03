import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { SxProps, Theme } from '@mui/system';

// Define the props interface
interface LoadingScreenProps {
  sx?: SxProps<Theme>;
  other?: React.HTMLAttributes<HTMLDivElement>;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ sx, ...other }) => {
  return (
    <Box
      sx={{
        px: 5,
        width: 1,
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
      {...other}
    >
      <LinearProgress color="inherit" sx={{ width: 1, maxWidth: 360 }} />
    </Box>
  );
};

export default LoadingScreen;
