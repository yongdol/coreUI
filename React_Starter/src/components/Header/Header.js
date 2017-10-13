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
import {translate} from "react-i18next";

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
        const url = window.location.href;
        const changeLanguage = (lng) => {
            i18n.changeLanguage(lng);
            if (url.includes("step") === false) {
                window.location.reload()
            }
        };

        const MemberHeader =  (
            <header className="app-header navbar">
                <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
                <NavbarBrand href="/#/cxo"></NavbarBrand>
                <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>&#9776;</NavbarToggler>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle className="nav-link dropdown-toggle">
                                <span className="d-md-down-none">{email}</span>
                            </DropdownToggle>
                            <DropdownMenu right className={this.state.dropdownOpen ? 'show' : ''}>
                                <DropdownItem header tag="div" className="text-center"><strong>{t('member.setting')}</strong></DropdownItem>
                                <DropdownItem><i className="fa fa-user"></i>{t('member.profile')}</DropdownItem>
                                <DropdownItem><i className="fa fa-wrench"></i>{t('member.setting')}</DropdownItem>
                                <DropdownItem onClick={() => {
                                    sessionStorage.clear();
                                    location.href='/';
                                    return;
                                }}><i className="fa fa-lock"></i>{t('member.logout')}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavItem>
                    <NavItem className="d-md-down-none">
                        <img src="/img/flags/country_korea.png" onClick={() => changeLanguage('kr')} />
                        <img src="/img/flags/country_usa.png" onClick={() => changeLanguage('en')} />
                    </NavItem>
                </Nav>
            </header>
        );

        const GuestHeader = (
                <header className="app-header navbar">
                    <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
                    <NavbarBrand href="/#/cxo"></NavbarBrand>
                    <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>&#9776;</NavbarToggler>
                    <Nav className="ml-auto" navbar>
                        <NavItem className="px-3">
                            <NavLink href="#/cxo/login"><i className="fa fa-fw fa-sign-in"/>{t('member.login')}</NavLink>
                        </NavItem>
                        <NavItem className="px-3">
                            <NavLink href="#/cxo/register"><i className="fa fa-fw fa-user"/>{t('member.signup')}</NavLink>
                        </NavItem>
                        <NavItem className="d-md-down-none">
                            <img src="/img/flags/country_korea.png" onClick={() => changeLanguage('kr')} />
                            <img src="/img/flags/country_usa.png" onClick={() => changeLanguage('en')} />
                        </NavItem>
                    </Nav>
                </header>
        );

        return (isLoggedIn ? MemberHeader : GuestHeader);
    }
}

export default translate('translations')(Header);
