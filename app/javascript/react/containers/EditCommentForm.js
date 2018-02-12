import React from 'react';
import TextArea from '../components/TextArea';

class EditCommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: this.props.selectedComment
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let formPayload = {}
    this.props.editComment(formPayload);
  }

  render() {
    return(
      <div>
        <form className="form" onSubmit={this.handleFormSubmit}
          <TextArea
            label="Comment"
            name="comment"
            value={this.state.comment}
            handlerFunction={this.handleCommentChange}
          />
        </form>
      </div>
    )
  }
}
