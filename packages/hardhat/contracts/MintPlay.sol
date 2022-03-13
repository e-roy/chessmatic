//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MintPlay is ERC721URIStorage{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("ChessMatic", "CHMATIC") {}

    uint256 nextId = 0;
    string initialBoard = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

    struct Game {
        // game id
        uint256 _gameIndex;
        // player 1 address
        address _player1;
        // player 1 color white
        string _player1color;
        // player 2 address
        address _player2;
        // player 2 color black
        string _player2color;
        // board state
        string _board;
        // game status
        uint _gameState;
    }

    Game[] defaultGames;

    mapping(uint => Game) private allGames;


    // function getAllGames() public view returns (Game[] memory) {
    //     return allGames;
    // }

    function getGameDetails(uint _tokenId) public view returns(Game memory) {
        return allGames[_tokenId];
    }


    function createGame (bool color) public {
        address player1;
        address player2;
        if (color == true) {
            player1 = msg.sender;
        } else {
            player2 = msg.sender;
        }
        allGames[_tokenIdCounter.current()] = Game(_tokenIdCounter.current(), player1, "white", player2, "black", initialBoard, 0);
        _tokenIdCounter.increment();
        emit GameCreated(_tokenIdCounter.current(), player1, "white", player2, "black", initialBoard, 0);
    }

    event GameCreated(uint256 _tokenId, address _player1, string _player1color, address _player2, string _player2color, string _board, uint _gameState);

    function joinGame (uint _gameIndex) public {
        address incomingPlayer = msg.sender;
        require((allGames[_gameIndex]._player1 != 0x0000000000000000000000000000000000000000 || allGames[_gameIndex]._player2 != 0x0000000000000000000000000000000000000000), "Sorry, this game is full.");

        if (allGames[_gameIndex]._player1 == 0x0000000000000000000000000000000000000000) {
            allGames[_gameIndex]._player1 = incomingPlayer;
        } else if (allGames[_gameIndex]._player2 == 0x0000000000000000000000000000000000000000) {
            allGames[_gameIndex]._player2 = incomingPlayer;
        } else {
            revert();
        }
    }

    function makeMove(uint _gameIndex, string calldata _board) public {
        address incomingPlayer = msg.sender;
        require((allGames[_gameIndex]._player1 == incomingPlayer || allGames[_gameIndex]._player2 == incomingPlayer), "You are not in this game");

        allGames[_gameIndex]._board = _board;
    }

    // function getOpenGames() public view returns(uint256[] memory) {
    //     uint256[] memory openGames = new uint256[](0);
    //     uint256 i = 0;
    //     for (uint256 _gameIndex = 0; _gameIndex < _tokenIdCounter.current(); _gameIndex++) {
    //         if (allGames[_gameIndex]._player1 == 0x0000000000000000000000000000000000000000 || allGames[_gameIndex]._player2 == 0x0000000000000000000000000000000000000000) {
    //             openGames[i] = _gameIndex;
    //             i++;
    //         }
    //     }
    //     // return openGames;
    //     return allGames[0];
    // }


}
