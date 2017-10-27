import React, {Component} from 'react';
import {Card, CardBlock, CardHeader, Row} from "reactstrap";
import ToMyDataButton from "../Shared/ToMyDataButton";
import Contents from "../Shared/Contents";
import {translate} from "react-i18next";


class SampleAnalysis extends Component {

    render() {
        const {data, scheme, job_id, history, service_id} = this.props;
        return (
            <Card className="card-accent-danger">
                <CardHeader>
                    {data.title}
                </CardHeader>
                <CardBlock className="card-body">
                    <Row>
                        {data.body.map((obj, i) =>
                            <Contents
                                obj={obj}
                                scheme={scheme}
                                ind={i}
                                job_id={job_id}
                                key={i}
                            />
                        )}
                    </Row>
                </CardBlock>
                <ToMyDataButton history={history} service_id={service_id}/>
            </Card>
        );
    }
}


export default translate('translations')(SampleAnalysis);
