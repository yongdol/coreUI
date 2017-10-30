import React, {Component} from 'react';
import {Row} from "reactstrap";
import {isEmpty} from "lodash";
import {BeatLoader} from "react-spinners";
import axios from "axios";
import BACKEND_URL from "../../utils/config";
import RenderCateCard from "./RenderCateCard";
import {translate} from "react-i18next";



class NewReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      render_error: ''
    }
  }

  componentDidMount() {
    this.getCategoryServiceList();
    // console.log('locale2', this.props);
  }


  getCategoryServiceList() {
    const token = sessionStorage.getItem('access_token');
    const locale = this.props.i18n.language;

    return axios.get(BACKEND_URL + "/report/new", {
      headers: {
        Authorization: token
      },
      params: {
        locale: locale
      }
    }).then((res) => {
      if (res.data.e_msg.status === 200) {
        this.setState({data: res.data.data})
      } else {
        const result = res.data.e_msg.message;
        this.setState({render_error: result});
      }
    }).catch((res) => {
      console.log('res', res);
    });
  }


  render() {
    const style = {
      center: {
        margin: 'auto',
        paddingTop: '200px'
      }
    };
    // console.log('this.props', this.props );
    return (
      <div>
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
            <RenderCateCard data={this.state.data} history={this.props.history}/>
        }
      </div>
    );
  }
}


export default translate('translations')(NewReport);
