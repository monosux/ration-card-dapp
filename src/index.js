import React from 'react';
import ReactDOM from 'react-dom';
import { DrizzleProvider } from "drizzle-react";
import App from './components/App';
import RationCard from '../build/contracts/RationCard.json';

const options = {
	contracts: [RationCard],
	events: {
		RationCard: ['CitizenRegistered']
	}
};

ReactDOM.render(
    <DrizzleProvider options={options}>
		<App />
	</DrizzleProvider>,
    document.getElementById("root")
);
