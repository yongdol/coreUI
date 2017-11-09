import React, {Component} from 'react';
import './style.css';
import {translate} from "react-i18next";
import {Row, Table} from "reactstrap";
import axios from "axios"
import BACKEND_URL from "../../utils/config";
import {isEmpty} from "lodash";
import {BeatLoader} from "react-spinners";
import SummaryRender from "../Dashboard/SummaryRender/SummaryRender";


class MyReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this.reportListByCategory();
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (this.props.match.params.category_id !== prevProps.match.params.category_id) {
      this.reportListByCategory();
    }
  }


  reportListByCategory() {
    const token = sessionStorage.getItem('access_token');
    const locale = this.props.i18n.language;
    const category_id = this.props.match.params.category_id;
    return axios.get(BACKEND_URL + "/report/my", {
      headers: {
        Authorization: token
      },
      params: {
        locale: locale.length > 3 ? locale.slice(0,2) : locale,
        category_id: category_id
      }
    }).then((res) => {
      if (res.data.e_msg.status === 200) {
        this.setState({data: res.data.data});
      } else {
        this.setState({render_error: res.data.e_msg.message});
      }
    }).catch((error) => {
      console.log('res', error);
    });
  }
  render() {
    const style = {
      center: {
        margin: 'auto',
        paddingTop: '200px'
      }
    };
    return (
      <div className="animated fadeIn">
        <Row>
          {
            isEmpty(this.state.data) ? (
                <div className="sweet-loading" style={style.center}>
                  <BeatLoader
                    color={'#4A90E2'}
                    loading={true}
                    size={20}
                  />
                </div>
              ) :
              this.state.data.map((item, i) => {
                const job_id = item.id;
                const service_id = item.service_id;
                const service_name = item.service_name;
                const service_brief = item.service_brief;
                const report_name = item.report_name;
                const json_data = JSON.parse(item.sum_json);
                const sum_info_html = json_data.summary_info_html;
                const sum_graph = json_data.summary_graph;
                return <SummaryRender
                  key={i}
                  job_id={job_id}
                  service_id={service_id}
                  service_name={service_name}
                  service_brief={service_brief}
                  report_name={report_name}
                  info_html={sum_info_html}
                  graph={sum_graph}
                  history={this.props.history}
                />
              })
          }
        </Row>
      </div>
    )
  }
}


export default translate('translations')(MyReport);
