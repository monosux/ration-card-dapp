var HDWalletProvider = require("truffle-hdwallet-provider");
var config = require("./config.json");

console.log("https://ropsten.infura.io/" + config.infura);

module.exports = {
	networks: {
		development: {
			host: "localhost",
			port: 8545,
			network_id: "*"
		},
		ropsten: {
			provider: function () {
				return new HDWalletProvider(config.wallet, "https://ropsten.infura.io/" + config.infura)
			},
			network_id: 3,
			gas: 6200000,
			solc: {
				optimizer: {
					enabled: true,
					runs: 200
				}
			}
		}
	}
};
