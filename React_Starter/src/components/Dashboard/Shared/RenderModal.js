import React, {Component} from 'react';
import {Button, CardHeader, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {translate} from "react-i18next";


class RenderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.toggle = this.toggle.bind(this);
  }


  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }


  goDetail(service_id, h) {
    h.push("/service/" + service_id)
  }

  render() {
    const {service_id, service_name, service_brief, t, report_name, history} = this.props;
    return (
      <CardHeader>
        <i className="fa fa-bar-chart"></i>
        {report_name}
        <i className="fa fa-question-circle margin-left pointer" onClick={this.toggle}></i>
        <Modal isOpen={this.state.modal} toggle={this.toggle}
               className="modal-sm">
          <ModalHeader toggle={this.toggle}>{service_name}</ModalHeader>
          <ModalBody>
            {service_brief}
          </ModalBody>
          <ModalFooter>
            <Button color="primary"
                    onClick={() => this.goDetail(service_id, history)}>{t('btn.detail')}</Button>
          </ModalFooter>
        </Modal>
      </CardHeader>
    )
  }
}


export default translate('translations')(RenderModal);

