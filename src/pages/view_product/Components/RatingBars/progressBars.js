import React from 'react';
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ReactStars from "react-rating-stars-component";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    width: '100%',
    height: 18,
    borderRadius: 8,
    padding: 1,
    border: '1px solid #e6edff',
    [theme.breakpoints.down(700)]: {
      height: 15,
    },
    [theme.breakpoints.up(767.5)]: {
      height: 15,
    },
  },
  colorPrimary: {
    backgroundColor: '#f1f1f1',
  },
  bar: {
    borderRadius: 8,
    backgroundColor: '#ffd700',
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) =>({
  root: {
    flexGrow: 1,
  },
  reviewRating: {
    justifyContent: 'center', 
    alignItems: 'center', 
    boxShadow: 'none', 
    padding: '2.5rem',
    ["@media (max-width: 282px)"]: {
      padding: 5,
    },
    ["@media (min-width: 282px) and (max-width: 400px)"]: {
      padding: 15,
    },
    ["@media (min-width: 400px) and (max-width: 576px)"]: {
      padding: 20,
    },
    ["@media (min-width: 576px) and (max-width: 700px)"]: {
      padding: 35,
    },
    ["@media (min-width: 700px) and (max-width: 768px)"]: {
      padding: '30px 60px',
    },
    ["@media (min-width: 768px)"]: {
      padding: '20px 10px',
      minWidth: 350
    }},
  smpadding: {
    justifyContent: 'center', 
    alignItems: 'center', 
    background: '#f1f1f1', 
    borderRadius: 10, 
    padding: '20px 40px',
    ["@media (max-width: 282px)"]: {
      padding: 5,
    },
    ["@media (min-width: 282px) and (max-width: 400px)"]: {
      padding: 10,
    },
    ["@media (min-width: 400px) and (max-width: 576px)"]: {
      padding: 15,
    },
    ["@media (min-width: 576px) and (max-width: 768px)"]: {
      padding: 25,
    },
    ["@media (min-width: 768px)"]: {
      padding: '15px 5px'
    }
  },
  reviewRatingHeader: {
    textAlign: 'center',
    background: 'none',
    fontSize: 20,
    fontFamily: '"Trirong", serif',
    fontWeight: 'bold',
  },
  reviewRatingWraper: {
    display: 'block',
    padding: '20px 10px',
    ["@media (max-width: 282px)"]: {
      padding: '20px 0',
    },
    ["@media (min-width: 282px) and (max-width: 400px)"]: {
      padding: '20px 10px',
    },
    ["@media (min-width: 400px) and (max-width: 700px)"]: {
      padding: 20,
    },
    ["@media (min-width: 700px) and (max-width: 768px)"]: {
      padding: '30px 10px',
    }},
  reviewRatingStars: {
    width: 'inherit',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: '-webkit-center',
    padding: 20,
    marginBottom: 20,
    background: '#fff',
    borderRadius: 10,
    [theme.breakpoints.down(282)]: {
      padding: '15',
    },
  },
  progressBarsWraper: {
    width: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    background: '#fff',
    borderRadius: 10,
    ["@media (max-width: 282px)"]: {
      padding: '2rem 0',
    },
    ["@media (min-width: 282px) and (max-width: 576px)"]: {
      padding: '20px 5px',
    },
    ["@media (min-width: 576px) and (max-width: 700px)"]: {
      padding: '20px 10px',
    },
    ["@media (min-width: 700px) and (max-width: 768px)"]: {
      padding: '30px 60px',
    }
  },
  progressBar: {
    background: 'none',
    boxShadow: 'none',
    padding: 3,
    display: 'flex',
  },
  barName: {
    width: '100%',
    maxWidth: 60,
    fontSize: 16,
    fontWeight: 600,
    color: '#2a5bda',
    fontFamily: '"Trirong", serif',
    textAlign: 'center',
    lineHeight: 0.75
  }
}));

export default function CustomizedProgressBars() {
  const classes = useStyles();

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };


  return (
    <div className={classes.root}>
      <Paper className={classes.reviewRating}>
            <Grid container spacing={0} className={classes.smpadding}>
                <Grid item xs={12} style={{padding: 10, borderRadius: 10, background: '#f5f8ff'}}>
                    <Typography className={classes.reviewRatingHeader}>Customer Reviews</Typography>
                </Grid>
                <Grid item spacing={0} container className={classes.reviewRatingWraper}>
                    <Grid item className={classes.reviewRatingStars}>
                        <Typography className={classes.reviewRatingNumber}><span style={{fontWeight: 'bold', fontSize: 25, fontFamily: '"Trirong", serif', color: '#FF6F00', textAlign: 'center'}}>4.1</span>/5.0</Typography>
                        <Paper style={{maxWidth: 160, boxShadow: 'none', background: 'none'}}>
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                activeColor="#ffd700"
                            />
                        </Paper>
                    </Grid>
                    <Grid item className={classes.progressBarsWraper}>
                        <Paper className={classes.progressBar}>
                            <Typography className={classes.barName}>5 Star</Typography>
                            <BorderLinearProgress variant="determinate" value={95} />
                        </Paper>
                        <Paper className={classes.progressBar}>
                            <Typography className={classes.barName}>4 Star</Typography>
                            <BorderLinearProgress variant="determinate" value={55} />
                        </Paper>
                        <Paper className={classes.progressBar}>
                            <Typography className={classes.barName}>3 Star</Typography>
                            <BorderLinearProgress variant="determinate" value={45} />
                        </Paper>
                        <Paper className={classes.progressBar}>
                            <Typography className={classes.barName}>2 Star</Typography>
                            <BorderLinearProgress variant="determinate" value={53} />
                        </Paper>
                        <Paper className={classes.progressBar}>
                            <Typography className={classes.barName}>1 Star</Typography>
                            <BorderLinearProgress variant="determinate" value={15} />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    </div>
  );
}