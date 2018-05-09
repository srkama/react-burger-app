import React from 'react';

import Logo from '../../../logo/Logo';
import NavigationItems from '../navigation-items/NavigationItems';
import classes from './sidebar.css';

const sidebar = (props) => {
    let backdropClasses = [classes.background,]
    let sidebarClasses = [classes.sidebar, classes.close]
    if(props.show) {
        backdropClasses = [classes.background,classes.show]
        sidebarClasses = [classes.sidebar, classes.open]
    }
    return (
        <div className={backdropClasses.join(' ')} onClick={props.closed}>
            <div className={sidebarClasses.join(' ')}>
                <div className={classes.logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </div>
    )
}


export default sidebar;