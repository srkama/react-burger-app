import React from 'react';

import NavigationItem from './navigation-item/NavigationItem';

import classes from './navigation-items.css'

const navigationItems = (props) => {
    return (
        <ul className={classes.navigationItems}>
            <NavigationItem  link="/" active>Burger</NavigationItem>
            <NavigationItem  link="/orders-list">Orders</NavigationItem>
        </ul>
    )
}


export default navigationItems;