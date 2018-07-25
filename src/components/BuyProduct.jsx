import React, { Component } from 'react';
import { drizzleConnect } from "drizzle-react";
import PropTypes from 'prop-types';

class BuyProduct extends Component {
	constructor(props, context) {
		super(props);
		this.contracts = context.drizzle.contracts;
	}

	create = () => {
		this.contracts['RationCard'].methods.buyItem.cacheSend(this.props.product, this.quantity.value);
		this.quantity.value = '';
	}

	render() {
		return (
			<div>
				<div className="form-group">
					<label htmlFor={"buy" + this.props.product}>Amount to buy:</label>
					<input
						type="number"
						min="0"
						max={this.props.value}
						className="form-control form-control-sm"
						id={"buy" + this.props.product}
						ref={(input) => this.quantity = input}
					/>
				</div>
				<button type="submit" className="btn btn-secondary btn-sm" onClick={this.create}>Buy</button>
			</div>
		);
	}
}

BuyProduct.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state => {
    return {
		contracts: state.contracts
    };
};

const AppContainer = drizzleConnect(BuyProduct, mapStateToProps);
export default AppContainer;
