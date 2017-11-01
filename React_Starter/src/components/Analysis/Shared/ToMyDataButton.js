import React, {Component} from 'react';
import {translate} from "react-i18next";
import {Button} from "reactstrap";

class ToMyDataButton extends Component {

  goStep01(h, service_id) {
    h.push("/report/new/step01/" + service_id)
  }

  goLogin(h) {
    h.push("/cxo/login")
  }

  render() {
    const token = sessionStorage.getItem('access_token');
    const {t, history, service_id} = this.props;
    // console.log('history', history);
    if (token) {
      return (
        <Button outline className="border-round" size="sm"
                onClick={() => this.goStep01(history, service_id)} color="primary">{t('btn.mydata')} </Button>
      )
    } else {
      return (
        <Button outline className="border-round" size="sm"
                onClick={() => this.goLogin(history)} color="primary">{t('btn.mydata')}</Button>
      )
    }
  }
}


export default translate('translations')(ToMyDataButton);