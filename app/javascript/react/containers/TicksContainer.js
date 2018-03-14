import React from 'react';
import { Link } from 'react-router';
import TickClimbTile from '../components/TickClimbTile';
import EditCommentForm from './EditCommentForm';

class TicksContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      climbs: [],
      selectedComment: '',
      showEditForm: false
    };

    this.editComment = this.editComment.bind(this)
    this.renderEditCommentForm = this.renderEditCommentForm.bind(this)
  };

  componentDidMount() {
    fetch('api/v1/climbs/ticks', { credentials: 'same-origin' })
      .then(response => {
        if (response.ok) {
         return response;
       } else {
         let errorMessage = `${response.status} (${response.statusText})`,
             error = new Error(errorMessage);
         throw(error);
       }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ climbs: body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteToDo(climbId, climbName) {
    let confirmDelete = confirm(`Remove ${climbName}?`);

    if (confirmDelete) {
      fetch(`/api/v1/to_dos/${climbId}`, {
        credentials: 'same-origin',
        method: 'DELETE'
      })
        .then(response => {
         if (response.ok) {
           return response;
         } else {
           let errorMessage = `${response.status} (${response.statusText})`,
               error = new Error(errorMessage);
           throw(error);
         }
       })
        .then(response => response.json())
        .then(body => {
          this.setState({
            climbs: body,
          });
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  editComment(formPayload) {
    let id = formPayload.id
    fetch(`/api/v1/comments/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      method: 'PATCH',
      body: JSON.stringify(formPayload)
    })
      .then(response => {
       if (response.ok) {
         return response;
       } else {
         let errorMessage = `${response.status} (${response.statusText})`,
             error = new Error(errorMessage);
         throw(error);
       }
     })
      .then(response => response.json())
      .then(body => {
        this.setState({
          climbs: body,
          showEditForm: false
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  renderEditCommentForm(event, comment) {
    event.preventDefault();
    if (this.state.showEditForm === true) {
      this.setState({
        showEditForm: false,
        selectedComment: ''
      })
    } else {
      this.setState({
        showEditForm: true,
        selectedComment: comment
      })
    }
  }

  render() {
    let climbs = this.state.climbs.map(route => {
      let clickEdit = () => {
        this.renderEditCommentForm(event, route.comment)
      }

      let clickDelete = () => {
        this.deleteToDo(route.climb.id, route.climb.name)
      }

      return(
        <TickClimbTile
          key={route.climb.id}
          name={route.climb.name}
          location={route.climb.location}
          grade={route.climb.grade}
          discipline={route.climb.discipline}
          pitches={route.climb.pitches}
          comment={route.comment.body}
          date={route.completed_date}
          clickEdit={clickEdit}
          clickDelete={clickDelete}
        />
      );
    });

    let editForm;
    if (this.state.showEditForm === true) {
      editForm =
      <EditCommentForm
        editComment={this.editComment}
        selectedComment={this.state.selectedComment}
        toggleForm={this.renderEditCommentForm}
      />
    } else {
      editForm = ''
    };

    return(
      <div>
        <div className="row list-container">
          <div className="large-6 column header">
            <h2>Climbs Ticked</h2>
          </div>
          <table className="climb-table tick-table">
            <thead>
              <tr>
                <th>Date Ticked</th>
                <th>Route Name</th>
                <th>Location</th>
                <th>Grade</th>
                <th>Type</th>
                <th>Pitches</th>
                <th>Comments</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {climbs}
            </tbody>
          </table>
        </div>
        {editForm}
      </div>
    )
  }
}

export default TicksContainer;
