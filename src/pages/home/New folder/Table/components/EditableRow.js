import React from "react";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
  inputField: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
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

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {

  const classes = useStyles();
  return (
    <StyledTableRow className={classes.bodyRow}>
      <StyledTableCell className={classes.bodyCell}>
      <TextField
          required
          id="filled-required"
          defaultValue="Enter product name"
          variant="filled"
          name="specificationName"
          value={editFormData.specificationName}
          onChange={handleEditFormChange}
        />
      </StyledTableCell>
      <StyledTableCell className={classes.bodyCell}>
      <TextField
          required
          id="filled-required"
          defaultValue="Enter description"
          variant="filled"
          name="specificationDescription"
          value={editFormData.specificationDescription}
          onChange={handleEditFormChange}
        />
      </StyledTableCell>
      <StyledTableCell className={classes.bodyCell}>
      <TextField
          id="filled-required"
          defaultValue="Enter a note or remark"
          variant="filled"
          name="remark"
          value={editFormData.remark}
          onChange={handleEditFormChange}
        />
      </StyledTableCell>
      <StyledTableCell className={classes.bodyCell}>
        <Paper className={classes.buttonsPaper} elevation={0}>
        <Button 
            className={classes.actionButton}
            variant="contained"
            disableElevation 
            type="submit">Save
          </Button>
          <Button 
            className={classes.actionButton}
            variant="contained"
            disableElevation  
            type="button" onClick={handleCancelClick}>
            Cancel
          </Button>
        </Paper>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default EditableRow;
