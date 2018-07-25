import React from 'react';

import BuyProduct from './BuyProduct';

function ProductAvailable(props) {
	return (
		<div className="col text-center">
			<b>Product #{props.product}</b>
			<div className={"small-product small-product_" + props.product}></div>
			<p>Available for you:</p>
			<b className="count">{props.value}</b>
			<hr />
			<BuyProduct value={props.value} product={props.product} />
		</div>
	);
}

export default ProductAvailable;
