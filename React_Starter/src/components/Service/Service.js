import React, {Component} from 'react';
import {Button, Card, CardBlock, CardHeader, Col, Row} from "reactstrap";
import ToMyDataButton from "../Analysis/Shared/ToMyDataButton";
import {translate} from "react-i18next";
import BACKEND_URL from "../../utils/config";
import axios from 'axios';

class Service extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
  }

  componentWillMount() {
    this.getAlgorithmInfo()
  }

  getAlgorithmInfo() {
    const locale = this.props.i18n.language;
    return axios.get(BACKEND_URL + "/service_info", {
      params: {
        service_id: this.props.match.params.service_id,
        // locale: locale
      }
    }).then((res) => {
      this.setState({data: res.data.data});
    }).catch((res) => {
      console.log('error', res);
      // let result = res.response.data.e_msg.message;
      // this.setState({render_error: result});
    });
  }

  goDetail(service_id, h) {
    h.push("/cxo/analysis/" + service_id)
  }

  goHome(h) {
    h.push("/cxo/sampledashboard")
  }


  render() {
    const {t, history, match, i18n} = this.props;
    const style = {
      float_button_div: {
        position: "fixed",
        backgroundColor:"None",
        bottom: "16%",
        right: "13%"
      },
      img_full: {
        width: "100%",
      },
      fill_color: {
        backgroundColor:"white"
      }
    };
    if (this.state.data) {
      return (
        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              {this.state.data[0].service_name}
            </CardHeader>
            <CardBlock>
              <h3>서비스 소개</h3>
              <p>{this.state.data[0].service_desc}</p>
              <h3>서비스 이미지 상세</h3>
              <div>
                <img src={this.state.data[0].image} alt="" style={style.img_full}/>
              </div>
            </CardBlock>
            <div style={style.float_button_div}>
              <Button outline className="border-round margin-right" size="sm"
                      onClick={() => this.goDetail(match.params.service_id, history)} color="primary">
                {t('btn.sample_data')}
              </Button>
              <ToMyDataButton history={history} service_id={match.params.service_id}/>
              <Button outline className="border-round margin-left" size="sm"
                      onClick={() => this.goHome(history)} color="primary">
                {t('btn.home')}
              </Button>
            </div>
          </Card>
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}


export default translate('translations')(Service);
