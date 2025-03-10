const axios = require('axios');
const { tools } = require('./config');

const openaiApiKey = process.env.OPENAI_API_KEY;

const generateContent = async (message) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: message }
                ],
                max_tokens: 500,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openaiApiKey}`
                }
            }
        );
        const content = response.data.choices[0].message.content.trim();
        console.log(content);
        return content;
    } catch (error) {
        console.error('Error generating content:', error.response ? error.response.data : error.message);
        return 'Error generating content';
    }
};

module.exports = { generateContent };
