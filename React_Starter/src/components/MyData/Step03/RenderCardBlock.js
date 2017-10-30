import React, {Component} from 'react';
import {Card, CardBlock, CardHeader} from "reactstrap";
import {translate} from "react-i18next";
import BACKEND_URL from "../../../utils/config";
import axios from 'axios';
import RenderBadge from "./RenderBadge";


class RenderCardBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress_id: '',
      job_id: this.props.job_id,
      status: this.props.status,
      start_time: this.props.start
    };
  }

  componentDidMount() {
    this.myWaitingTime().then((res) => this.setState({progress_id: res.data.progress}));
    this.interval = setInterval(() => {
      this.myWaitingTime().then((res) => {
        const divide = res.data.progress.split("/");
        if (divide[0] === divide[1]) {
          clearInterval(this.interval);
          this.setState({status: 'complete'})
        }
        this.setState({progress_id: res.data.progress})
      })
    }, 30000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }


  myWaitingTime() {
    const token = sessionStorage.getItem("access_token");
    const job_id = this.state.job_id;
    // return axios.get(BACKEND_URL + "/estimated_time", {
    return axios.get(BACKEND_URL + "/my_job_progress", {
      headers: {
        Authorization: token
      },
      params: {
        job_id: this.state.job_id
      }
    })
  }


  render() {
    const {t, job_id, status, start, service_name} = this.props;
    return (
      <Card>
        <CardHeader>
          {service_name}
          <RenderBadge stat={status}/>
        </CardHeader>
        <CardBlock>
          <p>{job_id}</p>
          <p>{t('try_start_at')} : {start}</p>
          <p>{t('analysis_step')} : {this.state.progress_id}</p>
        </CardBlock>
      </Card>
    )
  }
}


export default translate('translations')(RenderCardBlock);
