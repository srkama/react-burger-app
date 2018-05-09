import React, { Component } from 'react';

import Aux from '../../components/hoc/aux';
import Toolbar from '../../components/user-interface/navigation/toolbar/Toolbar';
import Sidebar from '../../components/user-interface/navigation/sidebar/Sidebar';
import classes from "./layout.css";





class Layout extends Component {

    state = {
        sidebarShow: false
    }

    sidebarClosed = () => {
        this.setState({sidebarShow: false})
    }

    toggleSideBar = () => {
        this.setState((prevState)=>({
            sidebarShow: !prevState.sidebarShow
        }))
    }

    render() {
        return(
        <Aux>
            <Toolbar drawToggleClicked={this.toggleSideBar}/>
            <Sidebar show={this.state.sidebarShow} closed={this.sidebarClosed} />
            <main className={classes.content}>
                {this.props.children}
            </main>
        </Aux>  
        )
    }
}


export default Layout;