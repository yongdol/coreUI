import React, {Component} from 'react';
import {Badge} from "reactstrap";
import {NavLink} from "react-router-dom";
import {translate} from "react-i18next";

class RenderStatus extends Component {

  goDetail(job_id, h) {
    h.push("/cxo/analysis/" + job_id)
  }

  render() {
    const {status, job_id, history, t} = this.props;
    const style = {
      cursor:"pointer"
    };
    if (status === "complete") {
      return (
        <td>
          <Badge style={style} color="success" onClick={() => this.goDetail(job_id, history)}>{t('status.complete')}</Badge>
        </td>
      )
    } else if (status === "error") {
      return (
        <td>
          <Badge color="danger">{t('status.error')}</Badge>
        </td>
      )
    } else if (status === "waiting"){
      return (
        <td>
          <Badge color="secondary">{t('status.waiting')}</Badge>
        </td>
      )
    } else {
      return (
        <td>
          <Badge color="warning">{t('status.working')}</Badge>
        </td>
      )
    }
  }
}


export default translate('translations')(RenderStatus);


