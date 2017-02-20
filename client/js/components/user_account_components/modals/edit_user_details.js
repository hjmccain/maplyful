import React from 'react';
import * as post_actions from '../../../actions/post_request.js'; 
import * as put_actions from '../../../actions/put_request.js'; 
import * as actionCreators from '../../../actions/sync.js';
import {connect} from 'react-redux';
import { Modal } from 'react-bootstrap';

class EditUserDetails extends React.Component {

	constructor (props) {
		super(props); 
	}

	sendUpdatedInfo (event) {
		event.preventDefault(); 
		console.log('sending'); 
	}

	close () {
		this.props.dispatch(actionCreators.editUserDetailsModal())
	}

	saveAndSendDetails () {

		let updatedUserDetails = {
			first_name: this.first_name.innerText,
			last_name: this.last_name.innerText,
			username: this.username.innerText,
			email: this.email.innerText,
			bio: this.bio.innerText
		}; 

		let token = this.props.currentUser.token; 
		let id = this.props.currentUser.id; 

		this.props.dispatch(put_actions.updateUserDetails(token, updatedUserDetails, id));
		this.props.dispatch(actionCreators.editUserDetailsModal());
	}

	render () {

		const { editUserDetailsModalOpen, currentUser } = this.props; 
	
		return (
			<Modal show={editUserDetailsModalOpen} onHide={this.close.bind(this)}>
    	<Modal.Header closeButton>
      	<Modal.Title>Edit Account</Modal.Title>
    	</Modal.Header>
   		<Modal.Body>
				<div className="account-details-container">
					<div className="user-label first-name-label">First name:</div>
					<div className="user-edit edit-first-name" contentEditable={true} suppressContentEditableWarning={true} ref={element => this.first_name = element}>{currentUser.first_name}</div>
				</div>
				<div className="account-details-container">
					<div className="user-label last-name-label">Last name:</div>
					<div className="user-edit edit-last-name" contentEditable={true} suppressContentEditableWarning={true} ref={element => this.last_name = element}>{currentUser.last_name}</div>
				</div>
				<div className="account-details-container">
					<div className="user-label username-label">Username:</div>
					<div className="user-edit edit-username" contentEditable={true} suppressContentEditableWarning={true} ref={element => this.username = element}>{currentUser.username}</div>
				</div>
				<div className="account-details-container">
					<div className="user-label email-label">Email:</div>
					<div className="user-edit edit-email" contentEditable={true} suppressContentEditableWarning={true} ref={element => this.email = element}>{currentUser.email}</div>
				</div>
				<div className="account-details-container">
					<div className="user-label bio-label">Bio:</div>
					<div className="user-edit edit-bio" contentEditable={true} suppressContentEditableWarning={true} ref={element => this.bio = element}>{currentUser.bio}</div>
				</div>
			</Modal.Body>
    	<Modal.Footer>
			<button onClick={this.saveAndSendDetails.bind(this)}>Save</button>
			</Modal.Footer>
  		</Modal>
		)
	}

}

const mapStateToProps = state => ({
	editUserDetailsModalOpen: state.editUserDetailsModalOpen, 
	currentUser: state.currentUser
})

export default connect(mapStateToProps)(EditUserDetails);