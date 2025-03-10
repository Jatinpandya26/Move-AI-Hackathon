require('dotenv').config();
const { AptosClient, FaucetClient, AptosAccount, HexString } = require('aptos');

const APTOS_TESTNET_URL = 'https://fullnode.devnet.aptoslabs.com/v1';
const FAUCET_URL = 'https://faucet.devnet.aptoslabs.com';

const client = new AptosClient(APTOS_TESTNET_URL);
const faucetClient = new FaucetClient(APTOS_TESTNET_URL, FAUCET_URL);

const privateKey = HexString.ensure(process.env.APTOS_PRIVATE_KEY).toUint8Array();
const account = new AptosAccount(privateKey);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

module.exports = { client, faucetClient, account, OPENAI_API_KEY };
