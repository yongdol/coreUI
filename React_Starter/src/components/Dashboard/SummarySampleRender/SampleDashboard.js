import React, {Component} from 'react';
import {Row} from "reactstrap";
import axios from "axios";
import BACKEND_URL from "../../../utils/config";
import SummarySampleRender from "./SummarySampleRender";
import {translate} from "react-i18next";
import {isEmpty} from "lodash";
import {BeatLoader} from "react-spinners";



class SampleDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            render_error: ""
        };
        this.pmList = this.pmList.bind(this);
    }

    componentWillMount() {
        this.pmList();
        // console.log('token', token );
    }

    pmList() {
        const locale = this.props.i18n.language;
        return axios.get(BACKEND_URL + "/overview_sample_report", {
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
            center : {
                margin : 'auto',
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
                        ) : this.state.data.map((item, i) => {
                            const job_id = item.id;
                            const service_id = item.service_id;
                            const service_name = item.service_name;
                            const service_brief = item.service_brief;
                            const report_name = item.report_name;
                            const json_data = JSON.parse(item.sum_json);
                            const sum_info = json_data.summary_info;
                            const sum_graph = json_data.summary_graph;
                            return <SummarySampleRender
                                key={i}
                                job_id={job_id}
                                service_id={service_id}
                                service_name={service_name}
                                service_brief={service_brief}
                                report_name={report_name}
                                info={sum_info}
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

export default translate('translations')(SampleDashboard);