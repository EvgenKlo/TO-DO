import { Box, Container, Link, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const boxStyle = {
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
};

const linkStyles = {
  textDecoration: 'none',
  '&:hover': {
    transition: 'color 0.3s ease-in-out',
    color: 'secondary.main',
  },
};

const Footer = () => {
  return (
    <Container>
      <Box sx={boxStyle}>
        <GitHubIcon style={{ margin: '0 8', color: 'black' }} />
        <Link
          href={`https://github.com/EvgenKlo`}
          target="_blank"
          rel="noopener"
          sx={linkStyles}
        >
          <Typography>Project by EvgenKlo</Typography>
        </Link>
      </Box>
    </Container>
  );
};

export default Footer;
