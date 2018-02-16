import React from 'react';
import { Link } from 'react-router';

import ClimbTile from '../components/ClimbTile';
import AddClimbForm from './AddClimbForm';
import EditCommentForm from './EditCommentForm';
import CompletedClimbForm from './CompletedClimbForm';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';

class ToDosContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      climbs: [],
      selectedComment: '',
      showNewForm: false,
      showEditForm: false,
      showCompletedForm: false
    };

    this.addNewClimb = this.addNewClimb.bind(this)
    this.completeToDo = this.completeToDo.bind(this)
    this.deleteToDo = this.deleteToDo.bind(this)
    this.editComment = this.editComment.bind(this)
    this.renderCompletedForm = this.renderCompletedForm.bind(this)
    this.renderEditCommentForm = this.renderEditCommentForm.bind(this)
    this.toggleNewForm = this.toggleNewForm.bind(this)
  };

  componentDidMount() {
    fetch('api/v1/climbs/todos', { credentials: 'same-origin' })
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

  addNewClimb(formPayload) {
    fetch('/api/v1/climbs', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: { 'Content-Type': 'application/json' }
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
          showNewForm: false
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  completeToDo(formPayload) {
    fetch(`/api/v1/comments/completed`, {
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
          showCompletedForm: false
        });
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

  renderCompletedForm(event, comment) {
    event.preventDefault();
    if (this.state.showCompletedForm === true) {
      this.setState({
        showCompletedForm: false,
        selectedComment: ''
      })
    } else {
      this.setState({
        showCompletedForm: true,
        selectedComment: comment
      })
    }
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

  toggleNewForm(event) {
      event.preventDefault()
      if (this.state.showNewForm === true) {
        this.setState({ showNewForm: false })
      }
      else {
        this.setState({ showNewForm: true })
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

      let clickCheck = () => {
        this.renderCompletedForm(event, route.comment)
      }

      return(
        <ClimbTile
          key={route.climb.id}
          name={route.climb.name}
          location={route.climb.location}
          grade={route.climb.grade}
          discipline={route.climb.discipline}
          pitches={route.climb.pitches}
          comment={route.comment.body}
          clickEdit={clickEdit}
          clickDelete={clickDelete}
          clickCheck={clickCheck}
        />
      );
    });

    let newForm;
      if (this.state.showNewForm === true) {
        newForm =
        <AddClimbForm
          toggleNewForm={this.toggleNewForm}
          addNewClimb={this.addNewClimb}
        />
      } else {
        newForm = ''
      };

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

      let completedForm;
      if (this.state.showCompletedForm === true) {
        completedForm =
        <CompletedClimbForm
          climbId={this.state.selectedclimbId}
          completeToDo={this.completeToDo}
          selectedComment={this.state.selectedComment}
          toggleForm={this.renderCompletedForm}
        />
      } else {
        completedForm = ''
      };

    return(
      <div>
        <div className="row list-container">
          <div className="large-6 column">
            <h2>Climbs To Do</h2>
          </div>
          <div className="large-6 column new-button">
            <button onClick={this.toggleNewForm}><FontAwesomeIcon icon={faPlus} /> Add a To Do</button>
            <Link className="button" to="/search">Get a Route</Link>
          </div>
          <table className="climb-table">
            <thead>
              <tr>
                <th></th>
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
        {newForm}
        {editForm}
        {completedForm}
      </div>
    )
  }
}

export default ToDosContainer;
