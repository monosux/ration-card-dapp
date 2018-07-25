import React, { Component } from 'react';
import { drizzleConnect } from "drizzle-react";
import PropTypes from 'prop-types';

import SystemAvailable from './SystemAvailable';

class SystemStatus extends Component {
	constructor(props, context) {
		super(props);
		this.contracts = context.drizzle.contracts;
		this.available = this.contracts['RationCard'].methods.getRepositoryAvailable.cacheCall();
	}

	render() {
		let body;
		if (typeof this.props.contracts['RationCard'].getRepositoryAvailable[this.available] !== 'undefined') {
			body =
				<div className="row text-center">
					<SystemAvailable product="0" value={this.props.contracts['RationCard'].getRepositoryAvailable[this.available].value[0]} />
					<SystemAvailable product="1" value={this.props.contracts['RationCard'].getRepositoryAvailable[this.available].value[1]} />
					<SystemAvailable product="2" value={this.props.contracts['RationCard'].getRepositoryAvailable[this.available].value[2]} />
				</div>
			;
		}

		let update = this.props.contracts['RationCard'].synced ? '' : '⌛';

		return (
			<div>
				<h2>System Status {update}</h2>
				<p>Total number of available products.</p>
				{body}
				<div className="message-add-item mt-2 mb-2"></div>
			</div>
		);
	}
}

SystemStatus.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state => {
    return {
		contracts: state.contracts
    };
};

const AppContainer = drizzleConnect(SystemStatus, mapStateToProps);
export default AppContainer;
