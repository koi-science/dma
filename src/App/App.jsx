import React from 'react';
import { Router, Route, Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { MapPage } from '../MapPage';

//style
import { navStyle } from './style'


import {
    Navbar,
    Nav,
    NavItem,
    MenuItem,
    NavDropdown
} from 'react-bootstrap'


class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }

                <Router history={history}>
                    <div>
                        <Navbar inverse collapseOnSelect>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <a href="#brand">React-Bootstrap</a>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav>
                                    <NavItem eventKey={1} href="#">
                                        Link
                                    </NavItem>
                                    <NavItem eventKey={2} href="#">
                                        Link
                                    </NavItem>
                                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                        <MenuItem eventKey={3.1}>Action</MenuItem>
                                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                        <MenuItem divider />
                                        <MenuItem eventKey={3.3}>Separated link</MenuItem>
                                    </NavDropdown>
                                </Nav>
                                <Nav pullRight>
                                    <NavLink style={navStyle}
                                        to="/login">
                                        Login
                                    </NavLink>
                                    <NavLink to="/register" style={navStyle}>
                                        Register
                                    </NavLink>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>;

                        {/*<PrivateRoute exact path="/" component={HomePage} />*/}
                        <PrivateRoute path="/map" component={MapPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Redirect from="/" to="/map"/>

                    </div>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 