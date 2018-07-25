pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract RationCard {
	using SafeMath for uint;

	event CitizenRegistered(address _user);

	uint[3] private repositoryAvailable = [0, 0, 0];
	uint[3] private repositoryUsed = [0, 0, 0];

	uint public citizensCount = 0;

	mapping (address => bool) private citizens;
	mapping (uint => address) public citizensId;
	mapping (address => uint[3]) private citizenUsed;

    modifier notCitizen(address _address) {
        require(citizens[_address] == false);
        _;
    }

    modifier onlyCitizen(address _address) {
        require(citizens[_address] == true);
        _;
    }

    modifier goodType(uint _type) {
        assert(_type < 3 && _type >= 0);
        _;
    }

    modifier goodQuantity(uint _quantity) {
        assert(_quantity < 10000 && _quantity > 0);
        _;
    }

	function registerCitizen(address _citizen) public notCitizen(_citizen) {
		createCitizen(_citizen);
	}

	function registerYourself() public notCitizen(msg.sender) {
		createCitizen(msg.sender);
	}

	function createCitizen(address _citizen) private {
		citizens[_citizen] = true;
		citizenUsed[_citizen] = [0, 0, 0];
		citizensId[citizensCount] = _citizen;
		citizensCount = citizensCount.add(1);
		emit CitizenRegistered(_citizen);
	}

	function getCitizen(address _citizen) public view onlyCitizen(_citizen) returns(uint[3]) {
		return citizenUsed[_citizen];
	}

	function isCitizen(address _citizen) public view returns(bool) {
		return citizens[_citizen];
	}

	function createItem(uint _type, uint _quantity) public goodType(_type) goodQuantity(_quantity) {
		repositoryAvailable[_type] = repositoryAvailable[_type].add(_quantity);
	}

	function getRepositoryAvailable() public view returns (uint[3]) {
		return repositoryAvailable;
	}

	function getRepositoryAvailableForCitizen(address _citizen) public view onlyCitizen(_citizen) returns(uint[3]) {
		uint[3] memory available;

		for (uint i = 0; i < available.length; i++) {
			if (repositoryAvailable[i].add(repositoryUsed[i]).div(citizensCount) > citizenUsed[_citizen][i]) {
				available[i] = repositoryAvailable[i].add(repositoryUsed[i]).div(citizensCount).sub(citizenUsed[_citizen][i]);
			} else {
				available[i] = 0;
			}
		}

		return available;
	}

	function getRepositoryAvailableForId(uint _id) public view onlyCitizen(citizensId[_id]) returns(uint[3]) {
		return getRepositoryAvailableForCitizen(citizensId[_id]);
	}

	function buyItem(uint _type, uint _quantity) public onlyCitizen(msg.sender) goodType(_type) {
		require(getRepositoryAvailableForCitizen(msg.sender)[_type] >= _quantity);
		repositoryAvailable[_type] = repositoryAvailable[_type].sub(_quantity);
		repositoryUsed[_type] = repositoryUsed[_type].add(_quantity);
		citizenUsed[msg.sender][_type] = citizenUsed[msg.sender][_type].add(_quantity);
	}

}
