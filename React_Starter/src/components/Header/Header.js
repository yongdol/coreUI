import React, {Component} from 'react';
import {
    Badge,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    NavbarBrand,
    DropdownToggle
} from 'reactstrap';
import { translate } from 'react-i18next';


class Header extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    sidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-hidden');
    }

    sidebarMinimize(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-minimized');
    }

    mobileSidebarToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-mobile-show');
    }

    asideToggle(e) {
        e.preventDefault();
        document.body.classList.toggle('aside-menu-hidden');
    }

    render() {
        const isLoggedIn = (sessionStorage.getItem('access_token') ? true : false);
        const email = sessionStorage.getItem('email');

        const { t, i18n } = this.props;
        const changeLanguage = (lng) => {
            i18n.changeLanguage(lng);
        };


        const MemberHeader =  (
            <header className="app-header navbar">
                <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
                <NavbarBrand href="#"></NavbarBrand>
                <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>&#9776;</NavbarToggler>
                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <NavLink href="#">Dashboard</NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle className="nav-link dropdown-toggle">
                                <span className="d-md-down-none">{email}</span>
                            </DropdownToggle>
                            <DropdownMenu right className={this.state.dropdownOpen ? 'show' : ''}>
                                <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
                                <DropdownItem><i className="fa fa-user"></i>Profile</DropdownItem>
                                <DropdownItem><i className="fa fa-wrench"></i>Settings</DropdownItem>
                                <DropdownItem onClick={() => {
                                    sessionStorage.clear();
                                    location.href='/';
                                    return;
                                }}><i className="fa fa-lock"></i>Logout</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavItem>
                    <NavItem>
                        <img src="/img/flags/country_korea.png" onClick={() => changeLanguage('ko')} />
                        <img src="/img/flags/country_usa.png" onClick={() => changeLanguage('en')} />
                    </NavItem>
                </Nav>
            </header>
        );

        const GuestHeader = (
            <header className="app-header navbar">
                <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
                <NavbarBrand href="#"></NavbarBrand>
                <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>&#9776;</NavbarToggler>
                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <NavLink href="#">Home</NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <NavItem className="px-3">
                        <NavLink href="#/cxo/login"><i className="fa fa-fw fa-sign-in"/>LogIn</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink href="#/cxo/register"><i className="fa fa-fw fa-user"/>SignUp</NavLink>
                    </NavItem>
                    <NavItem className="d-md-down-none">
                        <img src="/img/flags/country_korea.png" onClick={() => changeLanguage('ko')} />
                        <img src="/img/flags/country_usa.png" onClick={() => changeLanguage('en')} />
                    </NavItem>
                </Nav>
            </header>
        );
        return (isLoggedIn ? MemberHeader : GuestHeader);
    }
}

export default translate('translations')(Header);
// export default Header;
