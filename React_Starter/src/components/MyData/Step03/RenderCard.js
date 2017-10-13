import React, {Component} from 'react';
import {Badge, Card, CardBlock, CardHeader, Col} from "reactstrap";
import {translate} from "react-i18next";
import './style.css'
import RenderBadge from "./RenderBadge";
import RenderCardBlock from "./RenderCardBlock";


class RenderCard extends Component {

    RenderCardBlock(item) {
        if (item.status === "error" || item.status === "complete") {
            return (
                <CardBlock>
                    {item.job_id}
                    {item.try_started_at}
                </CardBlock>
            )
        } else {
            return (
                <CardBlock>
                    {item.job_id}
                    {item.try_started_at}
                    {this.AnalysisStep}
                </CardBlock>
            )
        }

    }


    render() {
        const { item } = this.props;
        return (
            <Col xs="12" sm="6">
                <Card>
                    <CardHeader>
                        {item.service_name}
                        <RenderBadge status={item.status} />
                    </CardHeader>
                    <RenderCardBlock job_id={item.job_id} status={item.status} start={item.try_started_at}/>
                </Card>
            </Col>
        );
    }
}


export default translate('translations')(RenderCard);
