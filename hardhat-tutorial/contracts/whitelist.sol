//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Whitelist {
    uint8 public maxWhitelistedAddresses;

    mapping(address => bool) public whitelistedAddresses;

    uint8 public numAddressesWhitelisted;

    constructor(uint8 _maxWhitelistedAddresses) {
        maxWhitelistedAddresses = _maxWhitelistedAddresses;
    }

    function addAddressToWhitelist() public {
        require(!whitelistedAddresses[msg.sender], "Sorry this address already exist on the whitelist!");

        require(numAddressesWhitelisted < maxWhitelistedAddresses, "Sorry whitelist space already full!");


        whitelistedAddresses[msg.sender] = true;

        numAddressesWhitelisted += 1;
    }
}