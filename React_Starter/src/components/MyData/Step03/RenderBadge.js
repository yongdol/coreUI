import React, {Component} from 'react';
import {Badge} from "reactstrap";
import {translate} from "react-i18next";

class RenderBadge extends Component {
    render() {
        const { t , status} = this.props;
        switch (status) {
            case "waiting" :
                return (
                    <Badge color="warning" className="float-right badge-text">
                        {t('status.waiting')}
                    </Badge>
                );
            case "working" :
                return (
                    <Badge color="primary" className="float-right badge-text">
                        {t('status.working')}
                    </Badge>
                );
            case "error" :
                return (
                    <Badge color="danger" className="float-right badge-text">
                        {t('status.error')}
                    </Badge>
                );
            case "complete" :
                return (
                    <Badge color="success" className="float-right badge-text">
                        {t('status.complete')}
                    </Badge>
                );
        }
    }
}


export default translate('translations')(RenderBadge);
