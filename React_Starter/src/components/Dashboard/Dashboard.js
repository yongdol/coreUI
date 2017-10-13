import React, {Component} from 'react';
import {Row} from "reactstrap";
import axios from "axios";
import BACKEND_URL from "../../utils/config";
import SummarySampleRender from "./SummarySampleRender/SummarySampleRender";
import SummaryRender from "./SummaryRender/SummaryRender";
import {translate} from "react-i18next";


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            render_error: ""
        };
        this.pmList = this.pmList.bind(this);
    }

    componentDidMount() {
        this.pmList();
        // console.log('token', token );
    }

    pmList() {
        const token = sessionStorage.getItem('access_token');
        const locale = this.props.i18n.language;
        return axios.get(BACKEND_URL + "/overview_report", {
            headers: {
                "Authorization": token
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
        const bar = {
            labels: ['알짜배기효과', '대기수요손실', '후유증손실'],
            datasets: [
                {
                    label: '프로모션',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [65, 59, -80]
                }
            ]
        };

        const pie = {
            labels: [
                'Red',
                'Green',
                'Yellow'
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        };

        if (this.state.data) {
            return (
                <div className="animated fadeIn">
                    <Row>
                        {
                            this.state.data.map((item, i) => {
                                const json_data = JSON.parse(item.sum_json);
                                const sum_desc = json_data.summary_desc;
                                const job_id = JSON.parse(item.id);
                                if (job_id === 1 || job_id === 2 || job_id ===3 || job_id === 4 || job_id === 5) {
                                    return <SummarySampleRender graph_type="bar" graph_data={bar} desc={sum_desc} job_id={job_id} key={i}/>
                                } else {
                                    return <SummaryRender graph_type="pie" graph_data={pie} desc={sum_desc} job_id={job_id} key={i}/>
                                }
                            })
                        }
                    </Row>
                </div>
            )
        } else {
            return (
                <div>
                    {this.state.render_error}
                </div>
            )
        }
    }

}

export default translate('translations')(Dashboard);
