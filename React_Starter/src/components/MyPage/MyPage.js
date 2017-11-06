import React, {Component} from 'react';
import {
  Badge, Card, CardBlock, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row,
  Table
} from "reactstrap";
import axios from 'axios';
import BACKEND_URL from "../../utils/config";
import {isEmpty} from "lodash";
import {BeatLoader} from "react-spinners";
import {translate} from "react-i18next";
import RenderStatus from "./RenderStatus";


class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this.waitingList()
  }

  waitingList() {
    const token = sessionStorage.getItem("access_token");
    const locale = this.props.i18n.language;
    return axios.get(BACKEND_URL + "/job_status_list", {
      headers: {
        Authorization: token
      },
      params: {
        locale: locale.length > 3 ? locale.slice(0,2) : locale,
        filter: "all"
      }
    }).then((res) => {
      this.setState({data: res.data.data});
    }).catch((error) => {
      console.log('error', error);
    })
  }

  //service_name, report_name, all_file_name, job_id,

  render() {
    const style = {
      center_text: {
        textAlign: 'center'
      },
      center_spinner: {
        margin: 'auto',
        paddingTop: '200px'
      }
    };
    return (
      <div className="animated fadeIn">
        {
          isEmpty(this.state.data) ? (
            <Row>
              <div className="sweet-loading" style={style.center_spinner}>
                <BeatLoader
                  color={'#4A90E2'}
                  loading={true}
                  size={20}
                />
              </div>
            </Row>
          ) :
            <Col xs="12">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> All tasks
                </CardHeader>
                <CardBlock className="card-body">
                  <Table responsive bordered>
                    <thead>
                    <tr>
                      <th style={style.center_text}>id</th>
                      <th style={style.center_text}>service_name</th>
                      <th style={style.center_text}>report_name</th>
                      <th style={style.center_text}>start time</th>
                      <th style={style.center_text}>end time</th>
                      <th style={style.center_text}>status</th>
                    </tr>
                    </thead>
                    <tbody style={style.center_text}>
                    {
                      this.state.data.map((item, i) => {
                        const id = item.job_id;
                        const service_name = item.service_name;
                        const status = item.status;
                        const start_time = item.try_started_at;
                        const end_time = item.try_ended_at;
                        const report_name = item.report_name;
                        return (
                          <tr key={i}>
                            <td>{id}</td>
                            <td>{service_name}</td>
                            <td>{report_name}</td>
                            <td>{start_time}</td>
                            <td>{end_time}</td>
                            <RenderStatus status={status} job_id={id} history={this.props.history}/>
                          </tr>
                        )
                      })
                    }
                    </tbody>
                  </Table>
                </CardBlock>
              </Card>
            </Col>
        }
      </div>
    );
  }
}


export default translate('translations')(MyPage);
