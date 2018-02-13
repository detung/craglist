import React from 'react';
import TextArea from '../components/TextArea';

class CompletedClimbForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: this.props.selectedComment
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  handleCommentChange(event) {
    let commentObject = this.state.comment;
    commentObject.body = event.target.value;
    this.setState({ comment: commentObject })
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let formPayload = {
      climbId: this.state.comment.climb_id,
      commentId: this.state.comment.id,
      body: this.state.comment.body
    }
    this.props.completeToDo(formPayload);
  }

  render() {
    return(
      <div>
        <form className="completed-form" onSubmit={this.handleFormSubmit}>
          <h3>Add New Tick</h3>
          <TextArea
            label="Update Comment/Send Notes"
            name="comment"
            value={this.state.comment.body}
            handlerFunction={this.handleCommentChange}
          />
          <div className="button-group">
            <input className="button" type="submit" value="Submit" />
            <button className="button" onClick={this.props.toggleForm}>Cancel</button>
          </div>
        </form>
        <div className="form-sheet"></div>
      </div>
    )
  }
}

export default CompletedClimbForm;
