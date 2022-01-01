import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

import Grid from '@material-ui/core/Grid';
import {  withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 10
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%'
  },
  tableHead: {
    padding: 10
  },
  headRow: {
    fontSize: 16,
    textAlign: 'left'
  },
  hHead: {
    width: '100%'
  },
  actionButton: {
    boxShadow: 'none'
  }
}));

const CustomizableTable = () => {
  const [detailSpecs, setDetailSpecs] = useState(data);
  const [addFormData, setAddFormData] = useState({
    specificationName: "",
    specificationDescription: "",
    remark: ""
  });

  const [editFormData, setEditFormData] = useState({
    specificationName: "",
    specificationDescription: "",
    remark: ""
  });

  const [editDetailSpecId, setEditDetailSpecId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newDetailSpec = {
      id: nanoid(),
      specificationName: addFormData.specificationName,
      specificationDescription: addFormData.specificationDescription,
      remark: addFormData.remark
    };

    const newDetailSpecs = [...detailSpecs, newDetailSpec];
    setDetailSpecs(newDetailSpecs);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedDetailSpec = {
      id: editDetailSpecId,
      specificationName: editFormData.specificationName,
      specificationDescription: editFormData.specificationDescription,
      remark: editFormData.remark
    };

    const newDetailSpecs = [...detailSpecs];

    const index = detailSpecs.findIndex((detailSpec) => detailSpec.id === editDetailSpecId);

    newDetailSpecs[index] = editedDetailSpec;

    setDetailSpecs(newDetailSpecs);
    setEditDetailSpecId(null);
  };

  const handleEditClick = (event, detailSpec) => {
    event.preventDefault();
    setEditDetailSpecId(detailSpec.id);

    const formValues = {
      specificationName: detailSpec.specificationName,
      specificationDescription: detailSpec.specificationDescription,
      remark: detailSpec.remark
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditDetailSpecId(null);
  };

  const handleDeleteClick = (detailSpecId) => {
    const newDetailSpecs = [...detailSpecs];

    const index = detailSpecs.findIndex((detailSpec) => detailSpec.id === detailSpecId);

    newDetailSpecs.splice(index, 1);

    setDetailSpecs(newDetailSpecs);
  };

  const classes = useStyles();

  return (
    <Grid className={classes.tableContainer}> 
      <form onSubmit={handleEditFormSubmit}>
        <Table className={classes.table} component={Paper} aria-label="customized table">
          <TableHead className={classes.tableHead}>
            <TableRow className={classes.hHead}>
              <StyledTableCell className={classes.headRow}>Properties</StyledTableCell>
              <StyledTableCell className={classes.headRow}>Description</StyledTableCell>
              <StyledTableCell className={classes.headRow}>Note/Remark</StyledTableCell>
              <StyledTableCell className={classes.headRow}>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detailSpecs.map((detailSpec) => (
              <Fragment>
                {editDetailSpecId === detailSpec.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    detailSpec={detailSpec}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </form>

      <Typography>Add a Specification</Typography>
      <form >
      <TextField
          required
          id="filled-required"
          defaultValue="Enter a product name..."
          variant="filled"
          type="text"
          name="specificationName"
          onChange={handleAddFormChange}
        />
        <TextField
          required
          id="filled-required"
          defaultValue="Enter description..."
          variant="filled"
          name="specificationDescription"
          onChange={handleAddFormChange}
        />
        <TextField
          id="filled-required"
          defaultValue="Enter a note or remark..."
          variant="filled"
          name="remark"
          onChange={handleAddFormChange}
        />
        <Button 
            className={classes.actionButton}
            variant="contained"
            disableElevation 
            onSubmit={handleAddFormSubmit} 
            type="submit">Add More
            
          </Button>
      </form>
    </Grid>
  );
};

export default CustomizableTable;
