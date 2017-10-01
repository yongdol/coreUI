import React, {Component} from 'react';
import BACKEND_URL from "../../../public/utils/config";
import axios from 'axios';
import {translate} from "react-i18next";


class Analysis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            render_error: "",
        };
    }

    componentDidMount() {
        this.getDetailReport(this.props.job_id)
    }


    getDetailReport(job_id) {
        const token = sessionStorage.getItem("access_token");
        const locale = this.props.i18n.language;
        return axios.get(BACKEND_URL + "/detail_report",{
            headers: {
                "Authorization": token
            },
            params: {
                job_id: job_id? job_id : this.props.job_id,
                locale: locale
            }
        }).then((res) => {
            this.setState({data: res.data.data})
        }).catch((res) => {
            let result = res.response.data.e_msg.message;
            this.setState({render_error: result});
            console.log('error', this.state.render_error );
            // this.props.history.push("/dashboard")
        });
    }

    checkScheme(data) {
        let append = [];
        const scheme = data.map((item, i)  => {
            if (item.layout_column_append){
                append.push(item.layout_column_append)
            } else {
                append = [];
                append.push(item.layout_column_append);
            }
            return append;
        });
    }

    render() {
        if (this.state.data) {
            let data = eval('(' + this.state.data[0]['big_json'] + ')');
            // console.log('eval data', data);
            const scheme = this.checkScheme(data.body);
            // console.log('shceme', scheme );
            const sampleAnalysis = (
                <div>
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2">
                            <h1 className="page-header"><i className="fa fa-fw fa-bar-chart"></i>{data.title}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-offset-2 col-lg-2 sample-data-tag">
                            <i className="fa fa-fw fa-tag"/>SampleData
                        </div>
                    </div>
                    <div className="report-contents">
                        <div></div>
                        <h1></h1>
                        <div className="col-lg-offset-1 col-lg-10">
                            {data.body.map((obj, i) => (this.printmap(obj, i, scheme)))};
                        </div>
                        <div className="col-lg-offset-1 col-lg-10">
                            <ToMyDataButton />
                        </div>
                    </div>
                </div>
            );

            const Analysis = (
                <div>
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2">
                            <h1 className="page-header"><i className="fa fa-fw fa-bar-chart"></i>{data.title}</h1>
                        </div>
                    </div>
                    <div className="report-contents">
                        <div></div>
                        <h1></h1>
                        <div className="col-lg-offset-1 col-lg-10">
                            {data.body.map((obj, i) => (this.printmap(obj, i, scheme)))}
                        </div>
                        <div className="col-lg-offset-1 col-lg-10">
                            <ToMyDataButton />
                        </div>
                    </div>
                </div>
            );
            if (this.props.job_id === "1" || this.props.job_id === "2" || this.props.job_id === "3" || this.props.job_id === "4" || this.props.job_id === "5"){
                return sampleAnalysis
            } else {
                return Analysis
            }
        }
        else {
            return (
                <div className="contents">
                    <h2>{this.state.e_msg}</h2>
                </div>
            );
        }
    }
}


export default translate('translations')(Analysis);
