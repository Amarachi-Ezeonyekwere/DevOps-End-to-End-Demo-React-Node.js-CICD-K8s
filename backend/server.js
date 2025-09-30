const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

// Sample weather data
app.get('/api/weather', (req, res) => {
  res.json({
    location: 'Lagos',
    temperature: 29,
    condition: 'Sunny',
    humidity: 70,
    windSpeed: 15
  });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});