# My Air NFT

## Live Demo: https://myairnft.com

## Demo Video: https://youtu.be/7MgaTiYNr_s

# About My Air NFT

## What is it?

_My Air NFT_ allows you to freely mint a Dynamic NFT that will change automatically based on the pollution level of your city. It uses the API from [aqicn.org](https://aqicn.org/city/paris) to get levels of PM2.5, PM10, O3, and NO2 in your city and change the visualization of your NFT accordingly.

## 3 custom illustrations

We hired artist [Robson Teixeira](https://www.behance.net/robsonteixeira) to create the 3 illustrations representing 3 different levels of pollution.

Here is the first draft from the artist:
![](https://myairnft.com/screenshots/nfts-draft.png)

Here is the final version:
![](https://myairnft.com/screenshots/nfts-final.png)

Your NFT will be displayed as the first 'clean' illustration if air pollution in your city has an index between 0 and 50, as the 'slightly polluted' illustration between 51 and 100, and as the 'heavily polluted' illustration above 100.

## User journey

Go to https://myairnft.com to try the demo. Make sure you have installed the **Temple Wallet** and connected it to **Ithacanet**. The Homepage presents the concept of the site:
![](https://myairnft.com/screenshots/home.png)

Next, click connect and allow the Dapp to connect to your wallet. There you arrive at your NFT gallery. If you haven't minted an Air NFT yet, the gallery will be empty. Click `Mint Air NFT`:

![](https://myairnft.com/screenshots/mint.png)

Enter the name of a city, e.g. `paris`, `new york`, `beijing`, `reykjavik`, etc... then click `Mint Air NFT`. Temple will open to mint the NFT on the smart contract. The name of the city is saved in the FA2 Metadata `artifactUri` and `displayUri` which dynamically display a different illustration based on the pollution level in that city. Once the NFT is minted, go back to the gallery by clicking the main logo. The Gallery is simply an NFT Metadata explorer for your NFT. Don't hesitate to mint a few other NFTs for other cities, they will all appear in your gallery.

![](https://myairnft.com/screenshots/my-nft2.png)

Note that you can click any NFT and this will open the corrsponding aqicn.org page we are fetching our data from:

![](https://myairnft.com/screenshots/aqicn.png)

## What's next?

The platform itself is finished and is intended to be used by other artists as a template for their own Dynamic NFTs. It is quite easy to change the illustrations in the source code and the URL that provides the NFT state. Instead of using pollution levels from aqicn.org, we would imagine:

- A plane ticket NFT that updates it illustration based on flight data from https://aviationstack.com (flight cancelled, on time, etc...)
- A package tracking NFT that updates it illustration based on data from https://www.trackingmore.com (package lost, delivered, etc...)
- A climate change NFT that represents the level of ice and how it melts along time (e.g. The NFT would slowly deteriorate)

The applications are limitless and we hope this source code will make easy for artists to express themselves.

# How to run

You can access a demo on https://myairnft.com
However, if you'd rather deploy and run the platform locally, here are the instructions:

## Smart contracts

If you want to redeploy the smart contracts, go to `src/contracts`, rename `.env.example` to `.env` and fill in your private and public addresses. Then run:

```
yarn install
make compile
make test
make deploy
```

Note: We have used [Pierre-Emmanuel Wulfman’s FA2 implementation](<https://github.com/pewulfman/Tezos-TZIP-implementation/tree/main/TZIP-12%20(FA2)>) and customized it to allow public mints. However, this implementation lacks any mean of deployment so we have coded our own deployment script in `Makefile`.

## Frontend

If you want to run the frontend locally, go to `src/frontend`, rename `.env.example` to `.env` and fill in your own data. Then run:

```
yarn install
yarn start
```

# Questions?

If you need anything, please let me know at waylad42@gmail.com
