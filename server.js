const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/onboard', (req, res) => {
  // Example address generation logic
  const newAddress = '0x' + Math.random().toString(36).substring(2, 15);
  res.json({ address: newAddress });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
