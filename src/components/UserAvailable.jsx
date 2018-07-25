import React, { Component } from 'react';
import { drizzleConnect } from "drizzle-react";
import PropTypes from 'prop-types';

import ProductAvailable from './ProductAvailable';

class UserAvailable extends Component {
	constructor(props, context) {
		super(props);
		this.contracts = context.drizzle.contracts;
		this.available = this.contracts['RationCard'].methods.getRepositoryAvailableForCitizen.cacheCall(this.props.accounts[0]);
	}

	register = () => {
		this.contracts['RationCard'].methods.registerYourself.cacheSend();
	}

	render() {
		let body;
		if (typeof this.props.contracts['RationCard'].getRepositoryAvailableForCitizen[this.available] !== 'undefined') {
			body =
				<div className="row mt-2 registered-user">
					<ProductAvailable product="0" value={this.props.contracts['RationCard'].getRepositoryAvailableForCitizen[this.available].value[0]} />
					<ProductAvailable product="1" value={this.props.contracts['RationCard'].getRepositoryAvailableForCitizen[this.available].value[1]} />
					<ProductAvailable product="2" value={this.props.contracts['RationCard'].getRepositoryAvailableForCitizen[this.available].value[2]} />
				</div>
			;
		}

		return (
			<div>{body}</div>
		);
	}
}

UserAvailable.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state => {
    return {
		contracts: state.contracts,
		accounts: state.accounts
    };
};

const AppContainer = drizzleConnect(UserAvailable, mapStateToProps);
export default AppContainer;
