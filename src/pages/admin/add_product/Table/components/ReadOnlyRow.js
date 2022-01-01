import React from "react";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      width: 'inherit'
  },
  body: {
      fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
      backgroundColor: theme.palette.action.hover,
  },
}))(TableRow);


const useStyles = makeStyles((theme) => ({
  bodyRow: {
    border: '1px solid #ffffff',
    textAlign: 'left',
    padding: '0 8px'
  },
  bodyCell: {
    border: 'none',
    fontSize: 12,
    padding: '5px 10px',
  },
  buttonsPaper: {
    '& > *': {
      margin: theme.spacing(1),
    },
    background: 'none',
    display: 'inline-flex'
  },
  actionButton: {
    boxShadow: 'none'
  }
}));

const ReadOnlyRow = ({ detailSpec, handleEditClick, handleDeleteClick }) => {

  const classes = useStyles();

  return (
    <StyledTableRow className={classes.bodyRow}>
      <StyledTableCell className={classes.bodyCell}>{detailSpec.specificationName}</StyledTableCell>
      <StyledTableCell className={classes.bodyCell}>{detailSpec.specificationDescription}</StyledTableCell>
      <StyledTableCell className={classes.bodyCell}>{detailSpec.remark}</StyledTableCell>
      <StyledTableCell className={classes.bodyCell}>
        <Paper className={classes.buttonsPaper} elevation={0}>
          <Button 
            className={classes.actionButton}
            variant="contained"
            color="primary"
            disableElevation
            type="button"
            onClick={(event) => handleEditClick(event, detailSpec)}
          >
            Edit
          </Button>
          <Button 
            className={classes.actionButton}
            variant="contained" 
            color="secondary" 
            disableElevation
            type="button" 
            onClick={() => handleDeleteClick(detailSpec.id)}>
            Delete
          </Button>
        </Paper>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ReadOnlyRow;
