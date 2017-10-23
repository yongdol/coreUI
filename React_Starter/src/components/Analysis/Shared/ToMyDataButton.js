import React, {Component} from 'react';
import {translate} from "react-i18next";
import {Button} from "reactstrap";

class ToMyDataButton extends Component {

    goStep01(h) {
        // console.log('h', h);
        h.push("/cxo/step01")
    }

    goLogin(h) {
        // console.log('h', h);
        h.push("/cxo/login")
    }

    render() {
        const token = sessionStorage.getItem('access_token');
        const { t, history } = this.props;
        // console.log('history', history);
        if (token) {
            return (
                <Button outline className="border-round" size="sm" onClick={() => this.goStep01(history)}>{t('btn.mydata')}</Button>
            )
        } else {
            return (
                <Button outline className="border-round" size="sm" onClick={() => this.goLogin(history)}>{t('btn.mydata')}</Button>
            )
        }
    }
}



export default translate('translations')(ToMyDataButton);