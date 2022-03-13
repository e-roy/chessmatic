//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;


contract GamePlay {

    string private board;

    constructor(string memory _board) {
        board = _board;
    }


    function getBoard() public view returns (string memory) {
        return board;
    }

    function setBoard(string memory _board) public {
        board = _board;
     }

}