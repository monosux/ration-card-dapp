import React, { Component } from 'react';
import { drizzleConnect } from "drizzle-react";
import PropTypes from 'prop-types';

class RegisterUser extends Component {
	constructor(props, context) {
		super(props);
		this.contracts = context.drizzle.contracts;

		this.state = {
			sent: null
		};
	}

	register = () => {
		let id = this.contracts['RationCard'].methods.registerCitizen.cacheSend(this.address.value);
		this.address.value = '';
		this.setState({
			sent: id
		});
	}

	render() {
		let message;
		if (this.state.sent != null) {
			let tx = this.props.transactionStack[this.state.sent];
			if (typeof tx !== 'undefined') {
				message =
					<div className="alert alert-dark mt-2">
						<p className="small mb-0">{tx.substring(0, 30)}...: {this.props.transactions[tx].status}</p>
					</div>
				;
			}
		}

		let update = this.props.contracts['RationCard'].synced ? '' : '⌛';

		return (
			<div className="mt-5 register-new">
				<h2>Register a New Citizen {update}</h2>
				<div className="form-group">
					<label htmlFor="register-new">Citizens address:</label>
					<input
						type="text"
						className="form-control form-control-sm"
						id="register-new"
						ref={(input) => this.address = input}
					/>
				</div>
				<div className="message-register mt-2 mb-2"></div>
				<button type="submit" className="btn btn-secondary btn-sm" onClick={this.register}>Register</button>
				{message}
			</div>
		);
	}
}

RegisterUser.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state => {
    return {
		contracts: state.contracts,
		transactionStack: state.transactionStack,
		transactions: state.transactions
    };
};

const AppContainer = drizzleConnect(RegisterUser, mapStateToProps);
export default AppContainer;
