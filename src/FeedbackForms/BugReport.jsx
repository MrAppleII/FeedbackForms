import React, { Component } from "react"
import styled, { keyframes } from "styled-components"
import PropTypes from "prop-types"

/*
    File: BugReport.jsx
    Description: This form is used to collect bugs and feedback from users.
    Props: handleCancelButton(function)
*/
class BugReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      purposeOptionValue: "",
      feedbackPurposeValue: "",
      formCompleted:false,

      feedbackTextAreaValue: "",
      currentlySelectedButtonID: "",
    }
  }
  /* 
    Handles the actual reporting for the form submission.
  */
  handleReportSubmit = () => {
    // We just need to save four variables here to submit.
    let whyUserUsesTC = this.state.purposeOptionValue
    let userFeedbackTopic = this.state.feedbackPurposeValue
    let userFeedbackMessage = this.state.feedbackTextAreaValue
    let currentReportTypeButtonChosen = this.state.currentlySelectedButtonID
    console.log(
      "Data Collected",
      whyUserUsesTC,
      userFeedbackTopic,
      userFeedbackMessage,
      currentReportTypeButtonChosen
    )
    this.setState({
        formCompleted:true,
    })
  }
  /*
        Generates options for us. Given an array, it will just return some 
        jsx <options> objects for us. 
  */
  optionsGenerator = optionsArray => {
    const listGenerated = optionsArray.map(optionName => {
      return (
        <option key={optionName} value={optionName}>
          {optionName}
        </option>
      )
    })
    return listGenerated
  }
  /*
    Handles the option selected by using the target ID. We then save it to the state.
  */
  handleSelectOption = e => {
    let targetId = e.target.id
    if (targetId === "select-purpose") {
      this.setState({
        purposeOptionValue: e.target.value,
      })
    }
    if (targetId === "select-feedback-type") {
      this.setState({
        feedbackPurposeValue: e.target.value,
      })
    }
  }
  /*
    Handles what happens when the user clicks on a button about what
    type of feedback they are giving. 
  */
  onSelectFeedbackButton = e => {
    let targetID = e.target.id
    console.log("Target ID", targetID)
    this.setState({
      currentlySelectedButtonID: targetID,
    })
  }
  /*
    Handle Text Area from the user. Save text area to state.
  */
  handleTextArea = e => {
    this.setState({
      feedbackTextAreaValue: e.target.value,
    })
  }
 

  render() {
    try {
      let usingTCOptions = this.optionsGenerator([
        "Watching Videos",
        "Content Creation",
      ])
      let feedBackItems = ["Report a bug", "Change a product"]
      return this.state.formCompleted!==true ? (
        <FormContainer>
          <ColFlexLayout>
            <FormTitle>We Value Your Feedback</FormTitle>
            <FormHeader>What Would You Like to Do?</FormHeader>
            <ButtonsContainer>
              <TCButton
                className={
                  this.state.currentlySelectedButtonID ===
                  "give-product-feedback-button"
                    ? "selected"
                    : ""
                }
                onClick={this.onSelectFeedbackButton}
                id="give-product-feedback-button"
                type="button"
              >
                Give Product Feedback
              </TCButton>
              <TCButton
                className={
                  this.state.currentlySelectedButtonID === "report-a-bug-button"
                    ? "selected"
                    : ""
                }
                onClick={this.onSelectFeedbackButton}
                id="report-a-bug-button"
                type="button"
              >
                Report A Bug
              </TCButton>
            </ButtonsContainer>
            <ColFlexLayout
              id="user-usage"
              className={
                this.state.currentlySelectedButtonID === "" ? "hidden" : "show"
              }
            >
              <FormHeader>I'm using trueclap for:</FormHeader>
              <TCSelect
                id="select-purpose"
                value={this.state.purposeOptionValue}
                onChange={this.handleSelectOption}
              >
                <option value="" disabled={true}>
                  Please Select an Option
                </option>
                {usingTCOptions}
              </TCSelect>
            </ColFlexLayout>
            <ColFlexLayout
              id="feedback-type"
              className={
                this.state.purposeOptionValue === "" ? "hidden" : "show"
              }
            >
              <FormHeader>What is your feedback about?</FormHeader>
              <select
                id="select-feedback-type"
                value={this.state.feedbackPurposeValue}
                onChange={this.handleSelectOption}
              >
                <option value="" disabled={true}>
                  Please Select an Option
                </option>
                {this.optionsGenerator(feedBackItems)}
              </select>
            </ColFlexLayout>
            <ColFlexLayout
              id="user-feedback-final"
              className={
                this.state.feedbackPurposeValue === "" ? "hidden" : "show"
              }
            >
              <FormHeader>Tell us a little more...</FormHeader>
              <UserFeedbackTextArea
                placeholder="Share your experience with us. What went well? What could have gone better?"
                id="feedback-text-area"
                value={this.state.feedbackTextAreaValue}
                onChange={this.handleTextArea}
                rows="5"
              />
              <ButtonsContainer style={{ marginTop: "1em" }}>
                <TCButton onClick={this.handleCancelButton} type="button">Cancel</TCButton>
                <TCButton
                  disabled={
                    this.state.feedbackTextAreaValue === "" ? true : false
                  }
                  type="button"
                  onClick={this.handleReportSubmit}
                  className="submit"
                >
                  Submit
                </TCButton>
              </ButtonsContainer>
            </ColFlexLayout>
          </ColFlexLayout>
        </FormContainer>) : (
            <ColFlexLayout>
            <FormTitle>Thank You!</FormTitle>
            <FormHeader style={{alignSelf:"center",}}>Your feedback has been submitted! We value your feedback! </FormHeader>
            <TCButton onClick={this.handleCancelButton}  style={{alignSelf:"center",}} className="submit">Go Back</TCButton>
            </ColFlexLayout>
        )
      
    } catch (e) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        console.log(e)
      }
      return null
    }
  }
}
BugReport.propTypes = {
    handleCancelButton: PropTypes.func,
  }
  BugReport.defaultProps = {
   
    handleCancelButton: function() {},
  }
const ScaledInEnter = keyframes`
from{
  
    opacity:0.5;
}
to{
   
    opacity:1;
}
`
const FormTitle = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 600;
  font-size: 28px;
  align-self: center;
  margin-bottom: 15px;
`
const FormHeader = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 600;
  margin: 10px 0;
  color: #484848;
`
const TCSelect = styled.select`
  /* Set Fonts */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
 
`
const UserFeedbackTextArea = styled.textarea`
  display: block !important;
  width: 100% !important;
  resize: none;
  outline: none;
  padding: 10px;
  border-width: 2px !important;
  border-style: solid !important;
  border-color: rgb(235, 235, 235) !important;
  border-radius: 1px !important;
  &:focus {
    border-color: rgb(255, 210, 3) !important;
  }
`

const TCButton = styled.button`
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: black;
  background-color: white;
  max-height: 50px !important;
  width: 200px;
  font-size: 16px !important;
  font-weight: 500 !important;
  padding: 2px 6px;
  border-color: rgba(178, 178, 178, 0.6);
  border-width: 2px;
  border-style: solid;
  border-radius: 2px;
  outline: none;
  &.submit {
    color: black;
    background-color: rgb(255, 210, 3);
    border-color: rgb(255, 210, 3);
  }
  &.selected {
    color: black;
    background-color: white;
    border-color: rgb(255, 210, 3);
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
const FormContainer = styled.form`
  max-width: 768px;
  transition: height 0.8s ease-in-out;
  margin: 0 auto;
`
const ColFlexLayout = styled.div`
  display: flex;
  flex-direction: column;
  &.centered {
    justify-content: center;
    align-content: center;
    align-items: center;
  }
  &.flexStart {
    justify-content: flex-start;
    align-content: center;
    align-items: center;
  }
  &.hidden {
    pointer-events: none;
    opacity: 0.5;
  }
  &.show {
    animation: ${ScaledInEnter} 0.15s ease-out;
  }
`
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: space-between;
`
export default BugReport
