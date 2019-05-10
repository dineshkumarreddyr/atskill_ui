import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Button
} from "reactstrap";
import IntlMessages from "utils/IntlMessages";

class SkillActionModal extends Component {
  static propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    pushSkills: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      fields: {}
    };

    this.saveSkill = this.saveSkill.bind(this);
  }

  toggleModal = e => {
    e.stopPropagation();
    e.preventDefault();

    const { modalOpen } = this.state;

    if (modalOpen) {
      this.setState({
        fields: {}
      });
    }

    this.setState({
      modalOpen: !modalOpen
    });
  };

  saveSkill = () => {
    this.props.pushSkillAction(this.state.fields);
  };

  handleFieldChange = e => {
    e.stopPropagation();
    e.preventDefault();
    const { name, value } = e.target;
    let fields = this.state.fields;
    fields[name] = value;
    this.setState({ fields });
  };

  componentWillReceiveProps(props) {
    this.setState({
      modalOpen: props.modalOpen
    });
  }

  render() {
    const { modalOpen, fields } = this.state;

    return (
      <div className="btn-group">
        <Button color="primary" size="lg" onClick={this.toggleModal}>
          <IntlMessages id="layouts.add-new" />
        </Button>
        {"  "}
        <Modal
          isOpen={modalOpen}
          toggle={this.toggleModal.bind(this)}
          wrapClassName="modal-right"
          backdrop="static"
        >
          <ModalHeader toggle={this.toggleModal.bind(this)}>
            <IntlMessages id="layouts.add-new-modal-title" />
          </ModalHeader>
          <ModalBody>
            <Label>
              <IntlMessages id="skill.name" />
            </Label>
            <Input
              name="name"
              id="sname"
              value={fields.name || ""}
              onChange={this.handleFieldChange.bind(this)}
            />
            <Label className="mt-4">
              <IntlMessages id="skill.version" />
            </Label>
            <Input
              name="version"
              id="sversion"
              value={fields.version || ""}
              onChange={this.handleFieldChange.bind(this)}
            />
            <Label className="mt-4">
              <IntlMessages id="skill.author" />
            </Label>
            <Input
              name="author"
              id="sauthor"
              value={fields.author || ""}
              onChange={this.handleFieldChange.bind(this)}
            />
            <Label className="mt-4">
              <IntlMessages id="skill.company" />
            </Label>
            <Input
              name="company"
              id="scompany"
              value={fields.company || ""}
              onChange={this.handleFieldChange.bind(this)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              outline
              onClick={this.toggleModal.bind(this)}
            >
              <IntlMessages id="layouts.cancel" />
            </Button>
            <Button color="primary" onClick={this.saveSkill}>
              <IntlMessages id="layouts.submit" />
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SkillActionModal;
