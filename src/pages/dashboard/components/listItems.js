import React from 'react';

import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import ShopIcon from '@material-ui/icons/Shop';
import ProductIcon from '@material-ui/icons/ShoppingBasket'

import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({    
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,    
    nested: {
        paddingLeft: theme.spacing(3),
    },
}));


function AdminAdminSideBarList(props) {

    const [orderOpen, setOrderOpen] = React.useState(true);
    const handleOrderDropdownClick = () => {
        setOrderOpen(!orderOpen);
    };

    const [productOpen, setProductOpen] = React.useState(true);
    const handleProductDropdownClick = () => {
        setProductOpen(!productOpen);
    };

    const [userOpen, setUserOpen] = React.useState(true);
    const handleUserDropdownClick = () => {
        setUserOpen(!userOpen);
    };

    const classes = useStyles();

    const drawer = (
        <div>
            <div className={classes.toolbar} >
            </div>
            <Divider />
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Admin Tools
                    </ListSubheader>
                }
            >
                <ListItem button key={'Dashboard'}>
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText primary={'Dashboard'} />
                </ListItem>
                <ListItem button key={'ShoppingCart'} onClick={handleOrderDropdownClick}>
                    <ListItemIcon><ShoppingCart /></ListItemIcon>
                    <ListItemText primary={'Orders'} />
                    {orderOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={orderOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText secondary="New Orders" />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText secondary="Delivered Orders" />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText secondary="Rejected Orders" />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button key='users' onClick={handleUserDropdownClick}>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                    {userOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={userOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText secondary="Users" />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText secondary="Sellers" />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText secondary="Promoters" />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button key={'Product'} onClick={handleProductDropdownClick}>
                    <ListItemIcon><ProductIcon /></ListItemIcon>
                    <ListItemText primary={'Product'} />
                    {productOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={productOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText secondary="Products" />
                        </ListItem>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText secondary="Add Product" />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button>
                    <ListItemIcon>
                        <ShopIcon />
                    </ListItemIcon>
                    <ListItemText primary="Shops" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Integrations" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListSubheader inset>Saved reports</ListSubheader>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Current month" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Last quarter" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Year-end sale" />
                </ListItem>
            </List>
        </div>
    );

    return drawer;
}

export default AdminAdminSideBarList;