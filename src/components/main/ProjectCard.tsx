import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Project } from '../../types/types';

const ProjectCard: React.FC<{ item: Project }> = ({ item }) => {
  return (
    <RouterLink to={`${item.id}`}>
      <Card sx={{ maxWidth: 345, margin: { xs: '10px auto', sm: 2 } }}>
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ overflow: 'hidden' }}
            >
              {item.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ overflow: 'hidden' }}
            >
              {item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </RouterLink>
  );
};

export default ProjectCard;
