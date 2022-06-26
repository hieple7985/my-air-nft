# My Air NFT

## Live Demo : https://myairnft.com

## Demo Video : Currently uploading, coming very soon!

# About

My Air NFT allows you to freely mint a Dynamic NFT that will change automatically based on the pollution level of your city. It uses the API from [aqicn.org](https://aqicn.org/city/paris) to get levels of PM2.5, PM10, O3 and NO2 in your city and change the visualization of your NFT accordingly. We hired artist [Robson Teixeira](https://www.behance.net/robsonteixeira) to create the 3 illustrations below representing different levels of polution.

![](https://myairnft.com/screenshots/home.png)

Here is the gallery of the Air NFTs that you own. Their illustration is based on the pollution level of the asssociated city. You can click on them to see more imformation from aqicn.org. Click Mint New NFT if do not have any Air NFT yet.

![](https://myairnft.com/screenshots/my-nft2.png)

Enter the name of your city and mint a new NFT that will be sent to your wallet for free. The NFT will contain the name of your city in its metadata and update its illustration automatically based on pollution levels in that city.

![](https://myairnft.com/screenshots/mint.png)

# How to run

## Live demo

You can access a demo on https://myairnft.com
Make sure you have installed the **Temple** wallet and have selected **Ithacanet**

## Smart contracts

If you want to redeploy the smart contracts, go to `src/contracts`, rename `.env.example` to `.env` and fill in your private and public addresses. Then run:

```
yarn install
make compile
make test
make deploy
```

Note: We have used [Pierre-Emmanuel Wulfman’s FA2 implementation](<https://github.com/pewulfman/Tezos-TZIP-implementation/tree/main/TZIP-12%20(FA2)>) and customized it to generate airdrops. Howver this implementation lack any mean of deployment so we have coded our own deployment script in `Makefile`.

## Frontend

If you want to run the frontend locally, got to `src/frontend` and run:

```
yarn install
yarn start
```

# Questions?

If you need anything, please let me know at waylad42@gmail.com
