//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract Dump is ERC721Enumerable, Ownable {
// contract MintPlay is ERC721 {

    // uint256 nextId = 0;
    // string initialBoard = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    // string initialBoard;

    // enum GameState { Created, Started, Finished }

    // constructor(string memory _initialBoard) {
    //     initialBoard = _initialBoard;
    // }

    // Game[] public games;

    // struct Game {
    //     uint256 _id;
    //     string _player1;
    //     string _player1color;
    //     string _player2;
    //     string _player2color;
    //     string _board;
    //     uint _gameState;
    // }

    // mapping(uint => Game) private allGames;

    // function getAllGames() public view returns (uint256[]) {
    //     uint256[] memory result;
    //     for (uint256 i = 0; i < _gameDetails.length; i++) {
    //         result.push(_gameDetails[i].id);
    //     }
    //     return result;
    // }

    // function getGameDetails(uint _tokenId) public view returns(Game memory) {
    //     return allGames[_tokenId];
    // }

    // function incrementCount() private {
    //     nextId++;
    // }


    // function createGame () public {
    //     // require(balanceOf(msg.sender) <= 4, "Already create max characters.");
    //     allGames[nextId] = Game(nextId, msg.sender, "white", "", "black", initialBoard, 0);
    //     incrementCount();
    // }

    // function finishGame (uint id) public {
    //     Game storage game = allGames[id];
    //     if (game._gameState == 1) {
    //         game._gameState = 2;
    //     } else {
    //         revert();
    //     }
    // }


    // // Mapping from token ID to owner address
    // mapping(uint256 => address) private _owners;

    // // Mapping owner address to token count
    // mapping(address => uint256) private _balances;

    // /**
    //  * @dev See {IERC721-balanceOf}.
    //  */
    // function balanceOf(address owner) public view virtual override returns (uint256) {
    //     require(owner != address(0), "ERC721: balance query for the zero address");
    //     return _balances[owner];
    // }

    // /**
    //  * @dev See {IERC721-ownerOf}.
    //  */
    // function ownerOf(uint256 tokenId) public view virtual override returns (address) {
    //     address owner = _owners[tokenId];
    //     require(owner != address(0), "ERC721: owner query for nonexistent token");
    //     return owner;
    // }

// }
