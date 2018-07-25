var RationCard = artifacts.require("./RationCard.sol");

contract('RationCard', function(accounts) {
	const add = [10, 11, 12];

	it('should register user', async () => {
		const card = await RationCard.deployed();

		await card.registerCitizen(accounts[0]);

		let citizen = await card.getCitizen(accounts[0]);
		citizen = citizen.map((value) => {
			return value.toNumber();
		});

		assert.deepEqual(citizen, [0, 0, 0], 'user has wrong used amount');
	});

	it('should not register user', async () => {
		const card = await RationCard.deployed();

		let err = null;

		try {
			await card.registerCitizen(accounts[0]);
		} catch (error) {
			err = error;
		}

		assert.ok(err instanceof Error, 'user registered');
	});

	it('should register user by himself', async () => {
		const card = await RationCard.deployed();

		await card.registerYourself({from: accounts[1]});

		let citizen = await card.getCitizen(accounts[1]);
		citizen = citizen.map((value) => {
			return value.toNumber();
		});

		assert.deepEqual(citizen, [0, 0, 0], 'user has wrong used amount');
	});

	it('should not register by himself', async () => {
		const card = await RationCard.deployed();

		let err = null;

		try {
			await card.registerYourself({from: accounts[1]});
		} catch (error) {
			err = error;
		}

		assert.ok(err instanceof Error, 'user registered by himself');
	});

	it('should add item', async () => {
		const card = await RationCard.deployed();

		await card.createItem(0, add[0]);
		await card.createItem(1, add[1]);
		await card.createItem(2, add[2]);

		let repository = await card.getRepositoryAvailable();

		repository = repository.map((value) => {
			return value.toNumber();
		});

		assert.deepEqual(repository, add, 'repository has wrong value');
	});

	it('should show items available for user', async () => {
		const card = await RationCard.deployed();

		let available = await card.getRepositoryAvailableForCitizen(accounts[0]);

		available = available.map((value) => {
			return value.toNumber();
		});

		let should = add.map((value) => {
			return Math.floor(value / 2);
		});

		assert.deepEqual(available, should, 'repository has wrong value');
	});

	it('should not show items available for user', async () => {
		const card = await RationCard.deployed();

		let err = null;

		try {
			await card.getRepositoryAvailableForCitizen(accounts[2]);
		} catch (error) {
			err = error;
		}

		assert.ok(err instanceof Error, 'shows items');
	});

	it('should buy item', async () => {
		const card = await RationCard.deployed();

		let available = await card.getRepositoryAvailableForCitizen(accounts[0]);
		available = available.map((value) => {
			return value.toNumber();
		});

		await card.buyItem(0, available[0], {from: accounts[0]});
		await card.buyItem(1, available[1], {from: accounts[0]});
		await card.buyItem(2, available[2], {from: accounts[0]});

		let new_available = await card.getRepositoryAvailableForCitizen(accounts[0]);
		new_available = new_available.map((value) => {
			return value.toNumber();
		});

		assert.deepEqual(new_available, [0, 0, 0], 'repository has wrong value');

	});

	it('should show items available for user equil 0', async () => {
		const card = await RationCard.deployed();

		await card.registerCitizen(accounts[2]);

		let available = await card.getRepositoryAvailableForCitizen(accounts[0]);
		available = available.map((value) => {
			return value.toNumber();
		});

		assert.deepEqual(available, [0, 0, 0], 'repository has wrong value');
	});
});
