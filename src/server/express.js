const express = require('express');
const axios = require('axios');
const cors = require('cors');
const res = require("express/lib/response");
const env = require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


app.post('/getNearbyPlaces', async (req, res) => {
    const { lat, lng, type, radius } = req.body;
    const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&type=${type}&radius=${radius}&key=${process.env.GOOGLE_API_KEY}`;

    try {
        const response = await axios.get(URL);
        res.send(response.data);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));