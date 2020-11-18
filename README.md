# BidKaroNa

## Description

A full-fledged BlockChain based software web application providing an auctioning platform that ensures complete transparency and security regarding the highest bid and bidder eligibility. We have a blind-bidding design which offers several benefits over the traditional system. The blockchain-based system can ensure transparent and publicly verifiable auctions in IIIT for example in Bakul VolleyBall League.

## Technologies Used

* Truffle
* Ganache
* ReactJS
* Solidity
* Metamask
* Ethereum tools

## Setting Up the Dapp on Local Machine
* To install Truffle, follow [installation instructions](https://www.trufflesuite.com/docs/truffle/getting-started/installation) given on Truffle's documentation site.
* Download Ganache app from [Truffle Suite](https://www.trufflesuite.com/ganache)
* Download Metamask wallet as a browser extension. [Here](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) is the link to chrome extension.
* You need to import Ganache accounts into Metamask for the transactions. Refer [this](https://medium.com/@kacharlabhargav21/using-ganache-with-remix-and-metamask-446fe5748ccf) blogpost for the same.

## How To Run

```bash
truffle migrate
cd client
npm install
npm start
```

## Components

### Create Asset

In order to create an auction, the seller first must have an asset in the blockchain network. And this component allows sellers to do that easily.

![create asset GIF](./static/CreateAsset.gif)

### Create Auction

As the core functionality of the system this component will allow sellers to create their decentralized auction through a very efficient user interface.

![create auction GIF](./static/CreateAuction.gif)

### View Auctions

This component will allow users (bidders and sellers) to view all the ongoing auctions and allow them to placeBid on any active auction.

![view auctions image](./static/ViewAuctions.png)

### Place Bids

This component will allow users to place or change bid for a specific auction.

![place bid GIF](./static/PlaceBid.gif)

<hr/>

![The team](./static/TeamMembers.png)

## Video and other Documentation
This is available in the ```Project Docs``` folder.
