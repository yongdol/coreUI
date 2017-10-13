import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import {translate} from "react-i18next";

class ToMyDataButton extends Component {
    render() {
        const token = sessionStorage.getItem('access_token');
        const { t } = this.props;
        const toMyData = (
            <Button outline color="info" size="lg" block>
                <Link to="/cxo/step01">{t('btn.mydata')}</Link>
            </Button>
        );

        const toSignin = (
            <Button outline color="info" size="lg" block>
                <Link to="/cxo/login">{t('btn.mydata')}</Link>
            </Button>
        );

        return (token ? toMyData : toSignin)
    }
}



export default translate('translations')(ToMyDataButton);