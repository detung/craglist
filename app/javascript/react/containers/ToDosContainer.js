import React from 'react';
import { Link } from 'react-router';

import ClimbTile from '../components/ClimbTile';
import ClimbFormContainer from './ClimbFormContainer';
import EditCommentForm from './EditCommentForm';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';


class ToDosContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      climbs: [],
      selectedComment: '',
      showNewForm: false,
      showEditForm: false
    };

    this.toggleNewForm = this.toggleNewForm.bind(this)
    this.addNewClimb = this.addNewClimb.bind(this)
    this.editComment = this.editComment.bind(this)
    this.renderEditCommentForm = this.renderEditCommentForm.bind(this)
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

  renderEditCommentForm(event, comment) {
    event.preventDefault();
    if (this.state.showEditForm === true) {
      this.setState({
        showEditForm: false,
        selectedComment: ''
      })
    }
    else {
      this.setState({
        showEditForm: true,
        selectedComment: comment
      })
    }
  }

  editComment(formPayload) {
    let id = formPayload.id

    fetch(`/api/v1/to_dos/${id}`, {
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
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  deleteToDo(id) {
    let confirmDelete = confirm('Are you sure?');

    if (confirmDelete) {
      fetch(`/api/v1/to_dos/${id}`, {
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
        this.deleteToDo(route.climb.id)
      }

      return(
        <ClimbTile
          key={route.climb.id}
          name={route.climb.name}
          location={route.climb.location}
          grade={route.climb.grade}
          discipline={route.climb.discipline}
          pitches={route.climb.pitches}
          description={route.climb.description}
          comment={route.comment.body}
          clickEdit={clickEdit}
          clickDelete={clickDelete}
        />
      );
    });

    let newForm;
      if (this.state.showNewForm === true) {
        newForm =
        <ClimbFormContainer
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

    return(
      <div>
        <div className="row list-container">
          <div className="large-6 column">
            <h2>To Do List</h2>
          </div>
          <div className="large-6 column new-button">
            <button onClick={this.toggleNewForm}><FontAwesomeIcon icon={faPlus} /> Add a To Do</button>
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
      </div>
    )
  }
}

export default ToDosContainer;
