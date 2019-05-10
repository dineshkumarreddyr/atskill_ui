import React from "react";
import {
  Card,
  Button,
  Collapse,
  FormGroup,
  Label,
  Form,
  Input,
  Badge,
  CustomInput
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../components/CustomSelectInput";

import Sortable from "react-sortablejs";
import { mapOrder } from "../util/Utils";

export default class QuestionBuilder extends React.Component {
  constructor(...params) {
    super(...params);
    this.toggleClick = this.toggleClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.viewClick = this.viewClick.bind(this);
    this.typeChange = this.typeChange.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.removeAnswer = this.removeAnswer.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
    this.renderViewModeAnswers = this.renderViewModeAnswers.bind(this);

    this.state = {
      collapse: this.props.expanded || false,
      mode: "edit-quesiton",
      id: this.props.id,
      title: this.props.question || "",
      question: this.props.question || "",
      selectedCategory: this.props.categories
        ? this.props.categories.find(category => {
            return category.value === this.props.category_id;
          })
        : null,
      answers: this.props.answers || []
    };
  }
  deleteClick() {
    this.props.deleteClick(this.state.id);
  }
  toggleClick() {
    this.setState({ collapse: !this.state.collapse });
  }
  editClick() {
    this.setState({ mode: "edit-quesiton" });
    this.setState({ collapse: true });
  }
  viewClick() {
    this.setState({ mode: "view-quesiton" });
    this.setState({ collapse: true });
  }
  typeChange(selectedCategory) {
    if (this.state.selectedCategory) {
      if (
        (this.state.selectedCategory === 2 ||
          this.state.selectedCategory === 3) &&
        selectedCategory === 1
      ) {
        this.setState({ answers: [] });
      }
    }

    this.setState({ selectedCategory });
  }
  removeAnswer(answerId) {
    this.setState({
      answers: this.state.answers.filter(item => item.id !== answerId)
    });
  }
  addAnswer() {
    var nextId = 0;
    if (this.state.answers.length > 0) {
      // var orderedAnswers = this.state.answers.slice().sort((a, b) => {
      //   return a.answer < b.answer;
      // });
      nextId = this.state.answers.length + 1;
    }
    this.setState({
      answers: [
        ...this.state.answers,
        {
          id: nextId,
          answer: "",
          createdAt: new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
          createdBy: "Dinesh Rachumalla"
        }
      ]
    });
  }

  updateAnswer(answerId, event) {
    var answerIndex = this.state.answers.findIndex(
      item => item.id === answerId
    );
    var answers = this.state.answers;
    answers[answerIndex]["answer"] = event.target.value;
    // answers[answerIndex]["modifiedAt"] = new Date()
    //   .toISOString()
    //   .slice(0, 19)
    //   .replace("T", " ");
    answers[answerIndex]["modifiedBy"] = "Dinesh Rachumalla";
    this.setState({
      answers
    });
  }

  updateQuestionnaire = () => {
    const { id, question, selectedCategory, answers } = this.state;
    let updatedValues = {
      id: id,
      question: question
    };

    if (selectedCategory && selectedCategory.value) {
      updatedValues.category_id = selectedCategory.value;
    }

    if (answers && answers.length > 0) {
      updatedValues.answers = JSON.stringify(
        answers.filter(answer => answer.answer !== "")
      );
    }

    this.props.updateClick(updatedValues);
  };

  renderViewModeAnswers() {
    if (
      this.state.selectedCategory === undefined ||
      !this.state.selectedCategory.value
    ) {
      return;
    }
    switch (this.state.selectedCategory.value) {
      case 3:
        return <Input type="text" />;
      case 2:
        return (
          <FormGroup>
            {" "}
            {this.state.answers.map(answer => {
              return (
                <CustomInput
                  key={answer.id}
                  type="checkbox"
                  id={`checkbox${this.state.id}_${answer.id}`}
                  name={`checkbox${this.state.id}`}
                  label={answer.answer}
                />
              );
            })}{" "}
          </FormGroup>
        );
      case 1:
        return (
          <FormGroup>
            {this.state.answers.map(answer => {
              return (
                <CustomInput
                  key={answer.id}
                  type="radio"
                  name={`radio${this.state.id}`}
                  id={`radio${this.state.id}_${answer.id}`}
                  label={answer.answer}
                />
              );
            })}
          </FormGroup>
        );
      default:
        return (
          <Input type="text" placeholder="" value={""} onChange={event => {}} />
        );
    }
  }

  render() {
    return (
      <Card className={`question d-flex mb-4 ${this.state.mode}`}>
        <div className="d-flex flex-grow-1 min-width-zero">
          <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
              <span className="heading-number d-inline-block">
                {this.props.order + 1}
              </span>
              {this.state.title}
            </div>
          </div>
          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <Button
              outline
              color={"theme-3"}
              className="icon-button ml-1 edit-button"
              onClick={this.editClick}
            >
              <i className="simple-icon-pencil" />
            </Button>

            <Button
              outline
              color={"theme-3"}
              className="icon-button ml-1 view-button no-border"
              onClick={this.viewClick}
            >
              <i className="simple-icon-eye" />
            </Button>

            <Button
              outline
              color={"theme-3"}
              className={`icon-button ml-1 rotate-icon-click ${
                this.state.collapse ? "rotate" : ""
              }`}
              onClick={this.toggleClick}
            >
              <i className="simple-icon-arrow-down" />
            </Button>

            <Button
              outline
              color={"theme-3"}
              className="icon-button ml-1"
              onClick={this.deleteClick}
            >
              <i className="simple-icon-ban" />
            </Button>
          </div>
        </div>

        <Collapse isOpen={this.state.collapse}>
          <div className="card-body pt-0">
            <div className="edit-mode">
              <Form>
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    type="text"
                    value={this.state.title}
                    onChange={event => {
                      this.setState({ title: event.target.value });
                    }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Question</Label>
                  <Input
                    type="text"
                    value={this.state.question}
                    onChange={event => {
                      this.setState({ question: event.target.value });
                    }}
                  />
                </FormGroup>
                <div className="separator mb-4 mt-4" />

                <FormGroup>
                  <Label>Answer Type</Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={this.state.selectedCategory}
                    onChange={this.typeChange}
                    options={this.props.categories}
                  />
                </FormGroup>
                {this.state.answers.length > 0 && <Label>Answers</Label>}

                <Sortable
                  className="answers"
                  options={{
                    handle: ".handle"
                  }}
                  onChange={(order, sortable, evt) => {
                    var answers = mapOrder(this.state.answers, order, "id");
                    this.setState({ answers });
                  }}
                >
                  {this.state.answers.map(item => {
                    return (
                      <FormGroup
                        data-id={item.id}
                        key={item.id}
                        className="mb-1"
                      >
                        <Input
                          type="text"
                          value={item.answer}
                          autoFocus
                          onChange={event => {
                            this.updateAnswer(item.id, event);
                          }}
                        />
                        <div className="input-icons">
                          <Badge className="handle" color="empty" pill>
                            <i className="simple-icon-cursor-move" />
                          </Badge>
                          <Badge
                            color="empty"
                            pill
                            onClick={() => this.removeAnswer(item.id)}
                          >
                            <i className="simple-icon-close" />
                          </Badge>
                        </div>
                      </FormGroup>
                    );
                  })}
                </Sortable>

                <div className="text-center">
                  {this.state.selectedCategory &&
                    this.state.selectedCategory.value &&
                    this.state.selectedCategory.value !== 3 && (
                      <Button
                        outline
                        color="primary"
                        className="mt-3"
                        onClick={() => this.addAnswer()}
                      >
                        <i className="simple-icon-plus btn-group-icon" /> Add
                        Answer
                      </Button>
                    )}
                  <Button
                    outline
                    color="primary"
                    className="mt-3 ml-2"
                    onClick={this.updateQuestionnaire.bind(this)}
                  >
                    <i className="simple-icon-pencil btn-group-icon" /> Update
                    Questions and Answers
                  </Button>
                </div>
              </Form>
            </div>
            <div className="view-mode">
              <FormGroup>
                <Label>{this.state.question}</Label>
                {this.renderViewModeAnswers()}
              </FormGroup>
            </div>
          </div>
        </Collapse>
      </Card>
    );
  }
}
