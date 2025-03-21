# Blockchain Voting Smart Contract

A decentralized voting system implemented as a Solidity smart contract using Hardhat and TypeScript.

## Features

- Create multiple proposals during deployment
- Vote on proposals
- Prevention of double voting
- View proposal details and vote counts

## Prerequisites

- Node.js (v14 or later)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/DustinDoan315/Voting
cd voting-contract
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

## Usage

### Compile Contracts

```bash
npx hardhat compile
```

### Run Tests

```bash
npx hardhat test
```

### Deploy to Local Network

```bash
npx hardhat node
npx hardhat run scripts/deploy.ts --network localhost
```

## Contract Structure

The smart contract includes:

- Proposal creation
- Voting mechanism
- Vote counting
- Double voting prevention

## License

ISC
