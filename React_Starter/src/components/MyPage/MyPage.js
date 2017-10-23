import React, {Component} from 'react';
import './style.css';
import {translate} from "react-i18next";
import {Table} from "reactstrap";
import axios from "axios"
import BACKEND_URL from "../../utils/config";

class MyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }

    componentDidMount() {
        this.myPage()
    }

    myPage() {
        const token = sessionStorage.getItem("access_token");
        const locale = this.props.i18n.language;
        return axios.get(BACKEND_URL + "/job_status_list",{
            headers: {
                "Authorization": token
            },
            params: {
                "locale": locale
            }
        }).then((res) => {
            this.setState({data: res.data.data});
            // console.log('data', res.data.data);
        }).catch((res) => {
            console.log('error', res );
            // let result = res.response.data.e_msg.message;
            // this.setState({render_error: result});
        });
    }

    render() {
        const {t, i18n} = this.props;
        if (this.state.data) {
            return (
                <div className="animated fadeIn">
                    <Table>
                        <thead>
                        <tr>
                            <th>{t('report.job_id')}</th>
                            <th>{t('report.report_name')}</th>
                            <th>{t('report.service_name')}</th>
                            <th>{t('report.status')}</th>
                            <th>{t('report.start_time')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.data.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.job_id}</td>
                                        <td>{item.report_name}</td>
                                        <td>{item.service_name}</td>
                                        <td>{item.status}</td>
                                        <td>{item.try_started_at}</td>
                                    </tr>
                                )
                            })
                        }

                        </tbody>
                    </Table>
                </div>
            )
        } else {
            return (
                <div></div>
            );
        }
    }
}


export default translate('translations')(MyPage);
