import { Box, Typography } from '@mui/material';

const Header = () => {
  return (
    <Box sx={{ position: 'fixed', width: '100%' }}>
      <Typography
        variant="h1"
        textAlign="center"
        fontSize={30}
        margin={2}
      >
        Task Board
      </Typography>
    </Box>
  );
};

export default Header;
