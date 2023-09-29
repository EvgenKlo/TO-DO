import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Project } from '../../types/types';

const ProjectCard: React.FC<{ item: Project }> = ({ item }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <RouterLink to={`${item.id}`}>
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
            >
              {item.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </RouterLink>
    </Card>
  );
};

export default ProjectCard;
