import React, { forwardRef } from 'react';
import { useTheme, SxProps, Theme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { RouterLink } from '@/routes/components';

// Define the props interface
interface LogoProps {
  disabledLink?: boolean;
  sx?: SxProps<Theme>;
  [key: string]: any; // To allow other props like 'className', 'style', etc.
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box
      ref={ref}
      component="img"
      src="/logo/ingryd-graphic-logo.png"
      sx={{
        width: 60,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.displayName = 'Logo';

export default Logo;
