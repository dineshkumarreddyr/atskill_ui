import React, { Fragment, Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SkillEngine from "../../engine/Skill";
import QuestionnaireEngine from "../../engine/Questionnaire";
import MetadataEngine from "../../engine/Metadata";

import { Colxx, Separator } from "../components/CustomBootstrap";
import {
  Row,
  Button,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  ButtonDropdown
} from "reactstrap";
import IntlMessages from "utils/IntlMessages";
import QuestionBuilder from "./question-builder";

class Questionnaire extends Component {
  static proptypes = {
    skillList: PropTypes.array.isRequired,
    questionnaireList: PropTypes.array,
    categories: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      dropdownSplitOpen: false,
      selectedSkill: 0,
      selectedSkillName: "SKILL"
    };
  }

  componentDidMount() {
    this.props.fetchSkills({ id: 1 });
    this.props.fetchCategories();
  }

  toggleSplit = () => {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  };

  deleteQuestion = id => {
    this.props.deleteQuestionnaire(id);
  };

  addQuestion = () => {
    this.props.createQuestionnaire({
      question: "",
      skill_id: parseInt(this.state.selectedSkill)
    });
  };

  handleSkillChange = event => {
    const { text, id } = event.target;
    this.setState(
      {
        selectedSkill: id,
        selectedSkillName: text
      },
      () => {
        this.props.fetchQuestionnaire(id);
      }
    );

    this.toggleSplit();
  };

  handleQuestionnaireUpdate = payload => {
    this.props.updateQuestionnaire(payload);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.skillList !== prevState.skillList) {
      return { skillList: nextProps.skillList };
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState &&
      prevState.skillList &&
      prevProps.skillList !== this.props.skillList
    ) {
      this.setState(
        {
          selectedSkill: this.props.skillList[0].id,
          selectedSkillName: this.props.skillList[0].name
        },
        () => {
          this.props.fetchQuestionnaire(this.state.selectedSkill);
        }
      );
    }
  }

  render() {
    const { skillList, questionnaireList } = this.props;
    const { selectedSkillName, selectedSkill } = this.state;
    const parent = this;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>
              <span className="align-middle d-inline-block pt-1">
                <IntlMessages id="menu.questionnaire" />
              </span>
            </h1>
            <div className="float-sm-right mb-2">
              <ButtonDropdown
                className="top-right-button top-right-button-single"
                isOpen={this.state.dropdownSplitOpen}
                toggle={this.toggleSplit.bind(this)}
              >
                <Button
                  outline
                  className="flex-grow-1"
                  size="lg"
                  color="primary"
                >
                  {selectedSkillName}
                </Button>
                <DropdownToggle
                  size="lg"
                  className="pr-4 pl-4"
                  caret
                  outline
                  color="primary"
                />
                <DropdownMenu right>
                  {skillList &&
                    Object.keys(skillList).length > 0 &&
                    skillList.map(skill => (
                      <DropdownItem key={skill.id} header>
                        <a
                          href="javascript:void(0)"
                          id={skill.id}
                          onClick={parent.handleSkillChange.bind(parent)}
                        >
                          {skill.name}
                        </a>
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </ButtonDropdown>
            </div>
          </Colxx>
        </Row>

        <Separator className="mb-5" />

        {selectedSkill === 0 && (
          <Row>
            <Colxx xxs="12" className="text-center text-muted font-italic">
              <h5>
                <span className="align-middle d-inline-block pt-1">
                  <IntlMessages id="message.selected-skill" />
                </span>
              </h5>
            </Colxx>
          </Row>
        )}
        <Row>
          <Colxx xxs="12" lg="12">
            <ul className="list-unstyled mb-4">
              {questionnaireList &&
                Object.keys(questionnaireList.list).length > 0 &&
                questionnaireList.list.map((question, index) => {
                  return (
                    <li data-id={question.id} key={question.id}>
                      <QuestionBuilder
                        order={index}
                        {...question}
                        categories={this.props.categories}
                        expanded={!question.question && true}
                        deleteClick={this.deleteQuestion.bind(
                          this,
                          question.id
                        )}
                        updateClick={this.handleQuestionnaireUpdate}
                      />
                    </li>
                  );
                })}
            </ul>

            <div className="text-center">
              {selectedSkill !== 0 && (
                <Button
                  outline
                  color="primary"
                  className="mt-3"
                  onClick={this.addQuestion.bind(this)}
                >
                  <i className="simple-icon-plus btn-group-icon" /> Add Question
                </Button>
              )}
            </div>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  skillList: SkillEngine.selectors.list(state),
  questionnaireList: QuestionnaireEngine.selectors.list(state),
  categories: MetadataEngine.selectors.categories(state)
});

const mapDispatchToProps = {
  fetchSkills: SkillEngine.actions.fetchSkills,
  fetchQuestionnaire: QuestionnaireEngine.actions.fetchQuestionnaire,
  fetchCategories: MetadataEngine.actions.fetchCategories,
  createQuestionnaire: QuestionnaireEngine.actions.createQuestionnaire,
  deleteQuestionnaire: QuestionnaireEngine.actions.deleteQuestionnaire,
  updateQuestionnaire: QuestionnaireEngine.actions.updateQuestionnaire
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Questionnaire));
