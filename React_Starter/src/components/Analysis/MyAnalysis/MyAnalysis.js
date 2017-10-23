import React, {Component} from 'react';
import {Card, CardBlock, CardHeader, Row} from "reactstrap";
import Contents from "../Shared/Contents";
import ToMyDataButton from "../Shared/ToMyDataButton";
import {translate} from "react-i18next";

class MyAnalysis extends Component {

    render() {
        const {data, scheme, job_id, t, history} = this.props;

        return (
                <Card className="card-accent-success">
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
                    <ToMyDataButton history={history}/>
                </Card>
        );
    }
}


export default translate('translations')(MyAnalysis);
