import React, {Component} from "react";
import axios from 'axios';
import FileDownload from 'react-file-download'
import BACKEND_URL from "../../../utils/config";
import {translate} from "react-i18next";
import './style.css';
import {Button, Card, CardBlock, CardHeader, Col, FormText, Input, Row, Table} from "reactstrap";
import RenderNeedFile from "./RenderNeedFile";


class Step01 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      render_error_file1: "",
      render_error_file2: "",
      file_download_status1: "",
      file_download_status2: "",
      file_upload_status: "",
      render_error_service_choice: ""
    };
  }

  sampleFileDownload(e, i18n, t) {
    const token = sessionStorage.getItem("access_token");
    const file_num = e.target.value;
    const locale = i18n.language;
    return axios.get(BACKEND_URL + "/sample_file_download", {
      responseType: 'blob',
      headers: {
        Authorization: token
      },
      params: {
        file_num: file_num,
        locale: locale
      }
    }).then((response) => {
      if (file_num === "1") {
        FileDownload(response.data, 'sales_sample.xls');
        this.setState({file_download_status1: t('status.complete')});
      } else if (file_num === "2") {
        FileDownload(response.data, 'promotion_sample.xls');
        this.setState({file_download_status2: t('status.complete')});
      } else {
        console.log('data else', response);
      }
    }).catch((error) => {
      console.log('error', error);
    });
  }

  uploadFile(i18n, t) {
    const token = sessionStorage.getItem("access_token");
    const report_name = document.getElementById('text-input').value;
    const service_id = this.props.match.params.service_id;

    const formData = new FormData();

    const file_1 = document.getElementById("file_1").files;
    for (var i = 0; i < file_1.length; i++) {
      formData.append("file_1", file_1[i]);
    }

    const file_2 = document.getElementById("file_2").files;
    for (var i = 0; i < file_2.length; i++) {
      formData.append("file_2", file_2[i]);
    }

    const file_1_num = file_1.length;
    const file_2_num = file_2.length;
    if (file_1_num < 1 || file_2_num < 1) {
      const result = t('error.file_select');
      this.setState({file_upload_status: result});
      return
    } else {
      formData.append("locale", i18n.language);
      formData.append("report_name", report_name);
      formData.append("service_id", service_id);
      return axios.post(BACKEND_URL + "/file_upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": token
        },
      }).then((res) => {
        // document.getElementById("file_1").value = '';
        // document.getElementById("file_2").value = '';
        this.props.history.push({
          pathname: "/report/new/step02",
          state: {
            res: res.data.e_msg.message,
            file1: formData.getAll('file_1'),
            file2: formData.getAll('file_2')
          }
        })
      }).catch((error) => {
        console.log('error', error);
      })
    }
  }

  fileTypeCheck(e, t) {
    const service_id = e.target.value;
    if (service_id === "0") {
      const result = t('error.service_choice');
      this.setState({render_error_service_choice: result})
    }
  }

  render() {
    const {t, i18n, history} = this.props;
    if (sessionStorage.getItem("access_token")) {
      return (
        <div className="contents animated fadeIn">
          <div className="wrap">
            <div className="front-img-step-1-1">
              <img className="frontImg-l" src="img/fileupload/front-img-step-1-1.png"/>
              <img className="frontImg-s" src="img/fileupload/front-img-step-1-1-s.png"/>
            </div>
            <Card>
              <CardHeader className="step1-title-color">
                Step 01. {t('title.input_data')}
              </CardHeader>
              <CardBlock className="card-body">
                <Table responsive>
                  <tbody>
                  <tr>
                    <td>{t('report.report_name')}</td>
                    <td>
                      <Input type="text" id="text-input" name="text-input" placeholder=""/>
                    </td>
                  </tr>
                  <tr>
                    <td>{t('title.sales_data')}</td>
                    <td>
                      <form ref="uploadForm" className="account-file-upload">
                        <input type="file" id="file_1" name="file" multiple="multiple" className="file-picker" onChange={(e) => this.fileTypeCheck(e, t)}/>
                      </form>
                      <p className="error-color">
                        {this.state.render_error_file1}
                      </p>
                    </td>
                    <td>
                      <Button className="step1-title-color" onClick={(e) => this.sampleFileDownload(e, i18n, t)} value="1">
                        {t('btn.sample_download')}
                      </Button>
                      <p className="complete-color">
                        {this.state.file_download_status1}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>{t('title.promo_data')}</td>
                    <td>
                      <form ref="uploadForm" className="account-file-upload">
                        <input type="file" id="file_2" name="file" multiple="multiple" className="file-picker" onChange={(e) => this.fileTypeCheck(e, t)}/>
                      </form>
                      <p className="error-color">
                        {this.state.render_error_file2}
                      </p>
                    </td>
                    <td>
                      <Button className="step1-title-color" onClick={(e) => this.sampleFileDownload(e, i18n, t)} value="2">
                        {t('btn.sample_download')}
                      </Button>
                      <p className="complete-color">
                        {this.state.file_download_status2}
                      </p>
                    </td>
                  </tr>
                  </tbody>
                </Table>
                <Row>
                  <Col xs="6">
                    <Button className="border-round step1-title-color float-right" size="lg"
                            onClick={history.goBack}>
                      {t('btn.back')}
                    </Button>
                  </Col>
                  <Col xs="6">
                    <Button className="border-round step1-title-color" size="lg"
                            onClick={(e) => this.uploadFile(e, i18n, t)}>
                      {t('btn.save')}
                    </Button>
                    <p className="error-color">
                      {this.state.file_upload_status}
                    </p>
                  </Col>
                </Row>
              </CardBlock>
            </Card>
          </div>
        </div>
      );
    } else {
      this.props.history.push("/cxo/login")
    }

  }
}


export default translate('translations')(Step01);
