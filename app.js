// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createUserAccount } = require('./onboarding');
const { generateContent } = require('./social');
const { transferTokens, getAccountBalance } = require('./defi');
const { generateInsights } = require('./insights');

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.post('/onboard', (req, res) => {
    console.log('Onboarding user...');
    const newUser = createUserAccount();
    console.log('New user:', newUser);
    res.json({ address: newUser.address });
});

app.post('/generate-content', async (req, res) => {
    const { message } = req.body;
    console.log('Generating content for message:', message);
    const content = await generateContent(message);
    console.log('Generated content:', content);
    res.json({ status: 'Content generated', content });
});

app.post('/transfer-tokens', async (req, res) => {
    const { recipientAddress, amount } = req.body;
    console.log('Transferring tokens:', { recipientAddress, amount });
    try {
        const result = await transferTokens(recipientAddress, amount);
        console.log('Transfer result:', result);
        res.json({ status: 'Tokens transferred', result });
    } catch (error) {
        console.error('Error transferring tokens:', error);
        res.status(500).json({ status: 'Error transferring tokens', error: error.message });
    }
});

app.get('/balance/:address', async (req, res) => {
    const { address } = req.params;
    console.log('Getting balance for address:', address);
    const balance = await getAccountBalance(address);
    console.log('Balance:', balance);
    res.json({ balance });
});

// New endpoint for AI-driven insights
app.get('/insights', async (req, res) => {
    try {
        const insights = await generateInsights();
        res.json({ insights });
    } catch (error) {
        console.error('Error generating insights:', error);
        res.status(500).json({ status: 'Error generating insights', error: error.message });
    }
});

// Endpoints for achievements and portfolio
app.get('/achievements', (req, res) => {
    const achievements = ["First Login", "First Transfer", "Content Creator"];
    res.json(achievements);
});

app.get('/portfolio', (req, res) => {
    const portfolio = [
        { asset: "APT", amount: 100 },
        { asset: "USDT", amount: 50 }
    ];
    res.json(portfolio);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
