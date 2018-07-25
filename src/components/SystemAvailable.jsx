import React from 'react';

import AddProduct from './AddProduct';

function SystemAvailable(props) {
	return (
		<div className="col create-item">
			<h4>Product #{props.product}</h4>
			<div className={"product product_" + props.product}></div>
			<p className="repository-data">{props.value}</p>
			<hr />
			<AddProduct product={props.product} />
		</div>
	);
}

export default SystemAvailable;
