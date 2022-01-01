import React from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
    root: {
        width: '100%',
        marginTop: 0,
        padding: 20,
        ['@media (max-width: 576px)'] : {
            padding: 0
        },
        ['@media (min-width: 768px) and (max-width: 840px)'] : {
            padding: '5px'
        }
    },
    table: {
        minWidth: 'auto',
    },
    buttons: {
        marginTop: theme.spacing(3),
        textAlign: 'end',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    mTable: {
        width: '100%',
    },
    mBodyRow: {
        background: 'none',
    },
    mHeadRow: {
        background: 'none', 
        color: '#000',
        fontSize: 15,
        padding: '10px 10px 10px 2px',
    },
    mBodyCell: {
        border: 'none',
        fontSize: 12,
        padding: 5,
    },
    mRootTable: {
        borderRadius: 10,
        boxShadow: 'none'
    },
    fullSpec: {
        marginBottom: 10,
        background: 'rgb(245, 248, 255)',
        width: 'max-content',
        borderRadius: 4
    },
    fullSpecHeader: {
        fontSize: 18,
        textAlign: '-webkit-center',
        fontWeight: 600,
        padding: 5,
        fontFamily: '"Trirong", serif',
    }
}));


export default function CustomizedTables() {
    const classes = useStyles();

    function createData(property, description, remark) {
        return { property, description, remark, };
    }

    const rows = [
        createData('Product Name', 'Laptop', 'no'),
        createData('Product Brand', 'Toshiba', 'no'),
        createData('Product Model', '850', 'no'),
        createData('Size', '15inch', 'no'),
        createData('Quantity', 45, 'no'),
        createData('Sizes', 'Small Medium Large', 'no'),
        createData('Version', 8.0, 'no'),
        createData('Condition', 'New', 'no'),
        createData('Manufacturer', 'Toshiba sc', 'no'),
        createData('Date', 'June 21 2020', 'no'),
        ];

    return (
        <div className={classes.root}>  
            <Typography className={classes.fullSpecHeader}>Full Specification</Typography>
            <Table className={classes.mRootTable} component={Paper}>
                <Table className={classes.mTable} aria-label="customized table">
                    <TableHead style={{borderTop: '1px solid #f2f2f2'}}>
                        <TableRow style={{width: '100%'}}>
                            <StyledTableCell className={classes.mHeadRow}>Property</StyledTableCell>
                            <StyledTableCell className={classes.mHeadRow} align="right">Description</StyledTableCell>
                            <StyledTableCell className={classes.mHeadRow} align="right">Remark</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow className={classes.mBodyRow} key = {row.property}>
                            <StyledTableCell className={classes.mBodyCell} component="th" scope="row">{row.property}</StyledTableCell>
                            <StyledTableCell className={classes.mBodyCell} align="right">{row.description}</StyledTableCell>
                            <StyledTableCell className={classes.mBodyCell} align="right">{row.remark}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </Table>
        </div >
    );
}