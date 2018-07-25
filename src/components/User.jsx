import React, { Component } from 'react';
import { drizzleConnect } from "drizzle-react";
import PropTypes from 'prop-types';

import RegisterYourself from './RegisterYourself';
import UserAvailable from './UserAvailable';

class User extends Component {
    constructor(props, context) {
        super(props);
		this.contracts = context.drizzle.contracts;
		this.isUser = this.contracts['RationCard'].methods.isCitizen.cacheCall(this.props.accounts[0]);
    }

	render() {
		let body = <div className="unregistered-user pt-4"><p>We are looking for information about you...</p></div>;

		if (typeof this.props.contracts['RationCard'].isCitizen[this.isUser] !== 'undefined') {
			if (this.props.contracts['RationCard'].isCitizen[this.isUser].value === false) {
				body =
					<div className="unregistered-user pt-4 text-center">
						<p>You are not a registered citizen! Please register yourself in the system!</p>
						<RegisterYourself />
					</div>
				;
			} else {
				body = <UserAvailable />;
			}
		}

		let update = this.props.contracts['RationCard'].synced ? '' : '⌛';

		return (
			<div className="user dark-block mt-3">
				<h2>Your Info {update}</h2>
				<div className="text-left">
					<img className="rounded-circle border border-white" src={"https://robohash.org/" + this.props.accounts[0] + "?size=75x75"} alt="Citizen" />
					<span className="font-weight-bold pl-4">{this.props.accounts[0]}</span>
				</div>
				{body}
			</div>
		);
	}
}

User.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state => {
    return {
		contracts: state.contracts,
		accounts: state.accounts
    };
};

const AppContainer = drizzleConnect(User, mapStateToProps);
export default AppContainer;
