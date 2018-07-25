import React, { Component } from 'react';
import { drizzleConnect } from "drizzle-react";

import NetworkError from './NetworkError';
import Loading from './Loading';
import Body from './Body';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';

class App extends Component {
	render() {
		let body = <Loading />;

		if (
			this.props.web3.status === 'failed' ||
			(this.props.web3.status === 'initialized' && Object.keys(this.props.accounts).length === 0) ||
			(process.env.NODE_ENV === 'production' && this.props.web3.networkId !== 3)
		) {
			body = <NetworkError />;
		} else if (this.props.drizzleStatus.initialized) {
			body = <Body />;
		}

		let update = this.props.contracts['RationCard'].synced ? '' : '⌛';

		return (
			<div className="container-fluid">
				<h1>ETHRationCardSystem {update}</h1>
				<div className="app">
					{body}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
    return {
		drizzleStatus: state.drizzleStatus,
		web3: state.web3,
		contracts: state.contracts,
		accounts: state.accounts
    };
};

const AppContainer = drizzleConnect(App, mapStateToProps);
export default AppContainer;
