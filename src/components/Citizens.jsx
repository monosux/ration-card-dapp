import React, { Component } from 'react';
import { drizzleConnect } from "drizzle-react";
import PropTypes from 'prop-types';

import Citizen from './Citizen';

class Citizens extends Component {
    constructor(props, context) {
        super(props);
		this.contracts = context.drizzle.contracts;
		this.count = this.contracts['RationCard'].methods.citizensCount.cacheCall();

		this.state = {
			page: 1,
			perPage: 3
		};
	}

	more = () => {
		let page = this.state.page + 1;
		this.setState({
			page: page
		});
	}

	render() {
		let body, button;

		if (typeof this.props.contracts['RationCard'].citizensCount[this.count] !== 'undefined') {
			let count = Number(this.props.contracts['RationCard'].citizensCount[this.count].value);

			if (count === 0) {
				body = <p className="mt-2 text-center">Not yet citizens in our wonderful system. <span role="img" aria-label="alien">👾</span></p>;
			} else {
				let users = [];
				let max = this.state.page * this.state.perPage;

				if (count > max) {
					button =
						<button
							type="button"
							className="btn btn-secondary btn-sm load-more"
							onClick={this.more}
						>Load more</button>
					;
				}

				count = count > max ? max : count;

				for (let i = 0; i < count; i++) {
					users.push(i);
				}

				let user_list = users.map((element) => {
					return <Citizen key={element} id={element}  />;
				});

				body =
					<div className="row user-list">
						{user_list}
					</div>
				;
			}
		}

		return (
			<div className="mt-5">
				<h2>Citizens</h2>
				{body}
				<div className="row user-list">
				</div>
				<p className="text-center">
					{button}
				</p>
			</div>
		);
	}
}

Citizens.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state => {
    return {
		contracts: state.contracts
    };
};

const AppContainer = drizzleConnect(Citizens, mapStateToProps);
export default AppContainer;
