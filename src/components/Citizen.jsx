import React, { Component } from 'react';
import { drizzleConnect } from "drizzle-react";
import PropTypes from 'prop-types';

class Citizen extends Component {
    constructor(props, context) {
        super(props);
		this.contracts = context.drizzle.contracts;
		this.user = this.contracts['RationCard'].methods.getRepositoryAvailableForId.cacheCall(this.props.id);
		this.address = this.contracts['RationCard'].methods.citizensId.cacheCall(this.props.id);
    }

	render() {
		let body = <p className="text-center mt-2"><span role="img">👁</span>Looking for user info...</p>;

		if (
			typeof this.props.contracts['RationCard'].citizensId[this.address] !== 'undefined' &&
			typeof this.props.contracts['RationCard'].getRepositoryAvailableForId[this.user] !== 'undefined'
		) {
			body =
				<div>
					<div className="text-center">
						<p>
							<img
								className="rounded-circle border border-white mx-auto d-block"
								alt={"Citizen Photo: " + this.props.contracts['RationCard'].citizensId[this.address].value}
								src={"https://robohash.org/" + this.props.contracts['RationCard'].citizensId[this.address].value + "?size=60x60"}
							/>
						</p>
						<p className="text-center small">{this.props.contracts['RationCard'].citizensId[this.address].value}</p>
					</div>
					<div className="row">
						<div className="col text-center">
							<div className="small-product small-product_0"></div>
							<span>{this.props.contracts['RationCard'].getRepositoryAvailableForId[this.user].value[0]}</span>
						</div>
						<div className="col text-center">
							<div className="small-product small-product_1"></div>
							<span>{this.props.contracts['RationCard'].getRepositoryAvailableForId[this.user].value[1]}</span>
						</div>
						<div className="col text-center">
							<div className="small-product small-product_2"></div>
							<span>{this.props.contracts['RationCard'].getRepositoryAvailableForId[this.user].value[2]}</span>
						</div>
					</div>
				</div>
			;
		}

		return (
			<div className="col-4">
				<div className="dark-block user-small mt-3 mb-3 ml-1 mr-1">
					{body}
				</div>
			</div>
		);
	}
}

Citizen.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state => {
    return {
		contracts: state.contracts
    };
};

const AppContainer = drizzleConnect(Citizen, mapStateToProps);
export default AppContainer;
