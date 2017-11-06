import React, {Component} from 'react';
import BACKEND_URL from "../../../utils/config";
import axios from 'axios';
import {translate} from "react-i18next";
import MyAnalysis from "../MyAnalysis/MyAnalysis";
import {isEmpty} from "lodash";
import {BeatLoader} from "react-spinners";
import {Row} from "reactstrap";


class Analysis extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      render_error: "",
    };
  }

  componentDidMount() {
    this.getDetailReport(this.props.match.params.job_id);
  }


  getDetailReport(job_id) {
    const token = sessionStorage.getItem("access_token");
    const locale = this.props.i18n.language;
    return axios.get(BACKEND_URL + "/detail_report", {
      headers: {
        Authorization: token
      },
      params: {
        job_id: job_id,
        locale: locale.length > 3 ? locale.slice(0,2) : locale
      }
    }).then((res) => {
      this.setState({data: res.data});
    }).catch((error) => {
      console.log('error', error);
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

  render() {
    const {history, match} = this.props;
    const style = {
      center: {
        margin: 'auto',
        paddingTop: '200px'
      }
    };
    return (
      <div className="animated fadeIn">
        {
          isEmpty(this.state.data) ? (
            <Row>
              <div className="sweet-loading" style={style.center}>
                <BeatLoader
                  color={'#4A90E2'}
                  loading={true}
                  size={20}
                />
              </div>
            </Row>
            ) :
            this.analysisRender(this.state.data.data, this.state.data.service_id, match, history)
        }
      </div>
    )
  }
}


export default translate('translations')(Analysis);
