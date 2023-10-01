import { Box, Typography } from '@mui/material';

const Header = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="h1"
        textAlign="center"
        fontSize={40}
        margin={2}
        fontWeight={700}
      >
        Task Board
      </Typography>
    </Box>
  );
};

export default Header;
