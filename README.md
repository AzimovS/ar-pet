# 🐕 ARPet

Hackathon project for [Level Up Mini-Hack by Scroll and Alchemy](https://www.levelup.xyz/hackathon/alchemy-mini-hack)


## Description

Introducing your new virtual companion: an AR pet that you can mint and bring to life! Once minted, your AR pet can roam around your space, interact with you, and join in on various activities.

## Smart Contract

The core smart contracts are verified on Scroll Sepolia testnet.

| Contract                                  | Link                                  |
| ---------------------------------------- | -------------------------------------------- |
| `ARPet` | [0x627D4e76B1147Da62AcD5BfD0e43Ae1c56223a01](https://sepolia.scrollscan.com/address/0x627D4e76B1147Da62AcD5BfD0e43Ae1c56223a01#code) |

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with this app, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/AzimovS/ar-pet
cd ar-pet
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

## Future Ideas
- Introduce customizable options for a variety of pets.
- Add unique animations for each pet to enhance user engagement.
- Display the last feeding time and incorporate a feature where pets can potentially die if not fed, introducing a hunger mechanic.
- Implement a leveling system where pets start as babies (e.g., a puppy) and grow over time, reaching new stages of development (e.g., after 5-10 days of regular feeding, the pet matures).
- Add the ability to transfer pet ownership temporarily/permanently, allowing others to take care of pets if the owner is unavailable to feed them.

## License
This project is licensed under the terms specified in the [LICENCE.md](LICENCE.md) file.

## Credits
- Built with [scaffold-eth-2](https://github.com/scaffold-eth/scaffold-eth-2).
- Models credits [website](https://market.pmnd.rs/model/wolf)
- Explanation of WebXR with Three.js and R3F [Mohit Kumar Toshniwal](https://www.youtube.com/playlist?list=PLpM_sf_d5YTPXeVp4cmgN_cNBj9pNTEmZ)
