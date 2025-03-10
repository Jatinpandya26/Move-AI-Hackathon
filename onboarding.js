// onboarding.js
const { AptosAccount } = require('aptos');

const createUserAccount = () => {
    // Generate a new Aptos account
    const newAccount = new AptosAccount();
    return {
        address: newAccount.address().hex(),
        privateKey: newAccount.toPrivateKeyObject().privateKeyHex
    };
};

module.exports = { createUserAccount };
