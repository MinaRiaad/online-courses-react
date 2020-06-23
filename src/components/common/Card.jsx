import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { UserContext } from '../../context/userContext';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard({course,onRegister,onCancelRegisteration,onFinish}) {
  const classes = useStyles();

  const {currentUser:user}=useContext(UserContext);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={(course.media[0]&& course.media[0].split('.').pop()!=="mp4") ? `media/${course.media[0]}`:"http://placehold.it/700x400"}
          title={course.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {course.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {course.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {user && !course.finishers.includes(user._id) &&
       <CardActions>
        {user && !course.registeredUsers.includes(user._id) && 
        <Button 
          size="small" 
          variant="contained" 
          color="primary" 
          onClick={()=>onRegister(course._id)}
        >
          Register
        </Button>}

        {user && course.registeredUsers.includes(user._id) && 
        <React.Fragment>
          <Button 
            size="small" 
            variant="contained" 
            color="secondary" 
            onClick={()=>onCancelRegisteration(course._id)}
          >
            Cancel
          </Button>
          <Button 
            size="small" 
            variant="contained" 
            color="secondary"
            onClick={()=>onFinish(course)}
          >
            Finish
          </Button>
          <Link
            to={{pathname:'/course', state:course}}
            className="btn btn-success btn-sm"
          >
          View
          </Link>
        </React.Fragment>
        }
      </CardActions>}
      {user && course.finishers.includes(user._id) && 
      <CardActions>
        <Button 
          size="small" 
          variant="contained" 
          color="secondary"
          disabled
        >
          Finished
        </Button>
        <Link
        to={{pathname:'/course', state:course}}
        className="btn btn-success btn-sm"
        params={course}
        >
          View
        </Link>
      </CardActions>}
    </Card>
  );
}