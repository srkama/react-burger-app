import React from 'react';
import classes from './toolbar.css';

import Logo from '../../../logo/Logo';
import NavigationItems from '../navigation-items/NavigationItems';
import DrawToogle from '../draw-toggle/DrawToggle';

const toolbar = (props) => {
    return (
        <div className={classes.toolbar}>
            <DrawToogle clicked={props.drawToggleClicked} />
            <div className={classes.logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
    )
}


export default toolbar;