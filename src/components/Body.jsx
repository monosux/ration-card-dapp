import React from 'react';

import User from './User';
import RegisterUser from './RegisterUser';
import SystemStatus from './SystemStatus';
import Citizens from './Citizens';

function Body() {
	return (
		<div>
			<div className="row mt-4">
				<div className="col">
					<div className="bordered-block">
						<p>A ration stamp or ration card is a stamp or card issued by a government to allow the holder to obtain food or other commodities that are in short supply during wartime or in other emergency situations when rationing is in force. Ration stamps were widely used during World War II by both sides after hostilities caused interruption to the normal supply of goods. They were also used after the end of the war while the economies of the belligerents gradually returned to normal. Ration stamps were also used to help maintain the amount of food one could hold at a time. This was so that one person would not have more food than the other. <a href="https://en.wikipedia.org/wiki/Ration_stamp" title="Wikipedia: Ration stamp" target="_blank" rel="noopener noreferrer">Wikipedia</a></p>
					</div>
					<User />
					<RegisterUser />
				</div>
				<div className="col">
					<SystemStatus />
					<div className="bordered-block mt-4">
						<h2>System Rules</h2>
						<p>The system provides a possibility to fairly share produced goods between citizens.</p>
						<p>You can see the amount of produced goods in the section System Status.</p>
						<p>There you can create some goods. Possibility to buy these goods will be fairly shared between all citizens in the system.</p>
						<p>You can register yourself as a citizen of our system and you will get a possibility to have a share of produced goods.</p>
						<p>You can register someone as a citizen and a new citizen will get a possibility to have a share of produced goods.</p>
						<p>You can see a list of citizens and goods available to them.</p>
					</div>
				</div>
			</div>
			<Citizens />
		</div>
	);
}

export default Body;
