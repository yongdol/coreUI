import React, {Component} from 'react';
import {Button, Table} from "reactstrap";
import axios from 'axios';
import BACKEND_URL from "../../../utils/config";
import FileDownload from 'react-file-download'
import {translate} from "react-i18next";

class RenderNeedFile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      render_error_file1: "",
      render_error_file2: "",
      file_download_status1: "",
      file_download_status2: "",
    };
  }


  sampleFileDownload(e, i18n, t) {
    const token = sessionStorage.getItem("access_token");
    const file_num = e.target.value;
    const locale = i18n.language;
    return axios.get(BACKEND_URL + "/sample_file_download", {
      responseType: 'blob',
      headers: {
        "Authorization": token
      },
      params: {
        "file_num": file_num,
        "locale": locale
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


  fileTypeCheck(e, t) {
    if (e.target.id === "file_1") {
      const fileType = (e.target.value).split('.')[1];
      if (fileType !== 'xls') {
        const result = t('error.unsupport_file');
        this.setState({render_error_file1: result});
        e.target.value = '';
      } else {
        this.setState({render_error_file1: ''});
      }
    } else {
      const fileType = (e.target.value).split('.')[1];
      if (fileType !== 'xls') {
        const result = t('error.unsupport_file');
        this.setState({render_error_file2: result});
        e.target.value = '';
      } else {
        this.setState({render_error_file1: ''});
      }
    }
  }


  render() {
    const {t, locale, error_file1, error_file2, status_file1, status_file2} = this.props;
    return (
      <Table responsive>
        <tbody>
        <tr>
          <td>{t('title.sales_data')}</td>
          <td>
            <form ref="uploadForm" className="account-file-upload">
              <input type="file" id="file_1" name="file" multiple="multiple" className="file-picker"
                     onChange={(e) => this.fileTypeCheck(e, t)}/>
            </form>
            <p className="error-color">
              {error_file1}
            </p>
          </td>
          <td>
            <Button className="step1-title-color" onClick={(e) => this.sampleFileDownload(e, locale, t)} value="1">
              {t('btn.sample_download')}
            </Button>
            <p className="complete-color">
              {status_file1}
            </p>
          </td>
        </tr>
        <tr>
          <td>{t('title.promo_data')}</td>
          <td>
            <form ref="uploadForm" className="account-file-upload">
              <input type="file" id="file_2" name="file" multiple="multiple" className="file-picker"
                     onChange={(e) => this.fileTypeCheck(e, t)}/>
            </form>
            <p className="error-color">
              {error_file2}
            </p>
          </td>
          <td>
            <Button className="step1-title-color" onClick={(e) => this.sampleFileDownload(e, locale, t)} value="2">
              {t('btn.sample_download')}
            </Button>
            <p className="complete-color">
              {status_file2}
            </p>
          </td>
        </tr>
        </tbody>
      </Table>
    );
  }
}


export default translate('translations')(RenderNeedFile);
