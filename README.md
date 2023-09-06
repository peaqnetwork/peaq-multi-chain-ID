# peaq-multi-chain-ID
The fundamental idea revolves around a unified address empowering seamless cross-platform navigation. The concept is realized through Peaq's multi-chain machine ID innovation. Here, a singular Substrate address within the Peaq network serves as a nexus, establishing correlations with addresses across diverse networks like **Cosmos (via Bech32)**, **Solana (Base58-encoded string of a 256-bit ed25519 public key)**, and **Binance (through BIP32**).

In essence, users wield a single **SS58 Substrate-based** address on Peaq, ingeniously linked to corresponding addresses across these platforms. This unification showcases Peaq's commitment to cultivating a cohesive ecosystem and mirrors the broader trend of harmonizing distinct blockchain networks.

Through this ingenious approach, users effortlessly traverse varied platforms, fostering an interconnected and efficient decentralized landscape. This breakthrough catapults us toward a future where users navigate various blockchain networks with unprecedented ease, reinforcing the vision of a seamlessly integrated and user-centric blockchain universe.

# Multi-Chain Machine ID Project Guide

Welcome to the guide for setting up and running the **Multi-Chain Machine ID** project using Node.js. This project involves interacting with different blockchain networks (Binance, Solana, and Cosmos) and demonstrating the concept of mapping Substrate-based addresses to addresses on different platforms.

## Prerequisites

Before you start, make sure you have the following prerequisites:

- Node.js version 16 or later installed on your machine. You can download it from the [official Node.js website](https://nodejs.org/).

## Step 1: Clone the Repository

1. Open your terminal or command prompt.
2. Run the following command to clone the project repository:

   ```shell
   git clone https://github.com/peaqnetwork/peaq-multi-chain-ID.git

 ## Step 2: Install Dependencies
While inside the project directory, run the following command to install the required Node.js modules:
npm install

## Step 3: Run the Script
After the dependencies are installed, execute the main script using the following command:

    node main.js


The script will run and interact with different blockchain networks as described in the code.

Monitor the terminal for any logs or output generated by the script.

Once the script execution is complete, you should see the message "Network call complete!".

<img width="448" alt="image" src="https://github.com/peaqnetwork/peaq-multi-chain-ID/assets/101552881/dcdd2337-8be4-4ec8-b2a9-b29aaef40aaa">
