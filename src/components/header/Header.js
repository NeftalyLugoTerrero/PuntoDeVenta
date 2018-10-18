import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            navRoutes: null
        };
    }

    componentWillReceiveProps(props) {
        let navRoutes = this.props.navRoutes;
        this.setState({ navRoutes });
    }

    render() {
        var navRoutes = this.state.navRoutes || null;
        var navItems = "";
        
        if(navRoutes !== null) {
            navItems = navRoutes.map(item => 
                <li className="nav-item" key={item.to}>
                    <a className="nav-link" href={item.to} data-toggle={item.dataToggle} data-target={item.dataTarget} >{item.name}</a>
                </li>
            );
        }

        return (
            <div className="Header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light m-fixed-top">
                    <div className="container-fluid" style={{paddingLeft:"100px", paddingRight:"100px"}}>
                        <button type="button" id="sidebarCollapse" className="btn btn-info">
                            <i className="fas fa-align-left" />
                            <span> Menú</span>
                        </button>
                        <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fas fa-align-justify" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="nav navbar-nav ml-auto">
                                {navItems}
                                {/* <li className="nav-item active">
                                    <a className="nav-link" href="#">Home</a>
                                </li> */}
                                {/* <li className="nav-item">
                                    <a className="nav-link" href="#">Page</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Page</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Page</a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;
