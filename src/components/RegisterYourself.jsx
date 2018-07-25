import React, { Component } from 'react';
import { drizzleConnect } from "drizzle-react";
import PropTypes from 'prop-types';

class RegisterYourself extends Component {
	constructor(props, context) {
		super(props);
		this.contracts = context.drizzle.contracts;
	}

	register = () => {
		this.contracts['RationCard'].methods.registerYourself.cacheSend();
	}

	render() {
		return (
			<div>
				<button type="submit" className="btn btn-secondary btn-sm" onClick={this.register}>Register Yourself the system</button>
			</div>
		);
	}
}

RegisterYourself.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state => {
    return {
		contracts: state.contracts
    };
};

const AppContainer = drizzleConnect(RegisterYourself, mapStateToProps);
export default AppContainer;
