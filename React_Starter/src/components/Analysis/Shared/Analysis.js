import React, {Component} from 'react';
import BACKEND_URL from "../../../utils/config";
import axios from 'axios';
import {translate} from "react-i18next";
import SampleAnalysis from "../SampleAnalysis/SampleAnalysis";
import MyAnalysis from "../MyAnalysis/MyAnalysis";
import {isEmpty} from "lodash";
import {BeatLoader} from "react-spinners";


class Analysis extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      render_error: "",
    };
    this.analysisRender = this.analysisRender.bind(this)
  }

  componentDidMount() {
    this.getDetailReport(this.props.match.params.job_id);
  }


  getDetailReport(job_id) {
    const token = sessionStorage.getItem("access_token");
    const locale = this.props.i18n.language;
    return axios.get(BACKEND_URL + "/detail_report", {
      headers: {
        "Authorization": token
      },
      params: {
        job_id: job_id ? job_id : this.props.match.params.job_id,
        locale: locale
      }
    }).then((res) => {
      this.setState({data: res.data});
    }).catch((res) => {
      console.log('error', res);
    });
  }

  analysisRender(data, s_id, match, history) {
    let eval_data = eval('(' + data[0]['big_json'] + ')');
    let service_id = s_id;
    let append = [];
    const scheme = eval_data.body.map((item, i) => {
      if (item.layout_column_append) {
        append.push(item.layout_column_append)
      } else {
        append = [];
        append.push(item.layout_column_append);
      }
      return append;
    });
    if (match.params.job_id === "1" || match.params.job_id === "2" ||
      match.params.job_id === "3" || match.params.job_id === "4" ||
      match.params.job_id === "5") {
      return (
        <SampleAnalysis
          data={eval_data}
          scheme={scheme}
          job_id={match.params.job_id}
          history={history}
          service_id={service_id}
        />
      )
    } else {
      return (
        <MyAnalysis
          data={eval_data}
          scheme={scheme}
          job_id={match.params.job_id}
          history={history}
          service_id={service_id}
        />
      )
    }
  }


  render() {
    const {history, match} = this.props;

    return (
      <div className="animated fadeIn">
        {
          isEmpty(this.state.data) ? (
              <div className="sweet-loading spinner-wrap">
                <BeatLoader
                  color={'#4A90E2'}
                  loading={true}
                  size={20}
                />
              </div>
            ) :
            this.analysisRender(this.state.data.data, this.state.data.service_id, match, history)
        }
      </div>
    )
  }
}


export default translate('translations')(Analysis);
