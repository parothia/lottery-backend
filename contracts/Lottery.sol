pragma solidity ^0.4.26;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() public {
        manager = msg.sender; //address
    }

    function enter() public payable {
        require(msg.value > 0.0001 ether); //
        players.push(msg.sender);
    }

    function random() private view returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(block.difficulty, now, players))
            ); // sha3/keccak is predefined function, block,now is predefined global variable
    }

    function pickWinner() public onlyManagerCanCall {
        // require(msg.sender == manager);
        uint256 index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address[](0); // create dynamic array of size 0
    }

    modifier onlyManagerCanCall() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
}
