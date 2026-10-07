const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment Variables থেকে API Key এবং Target URL পড়া হচ্ছে
const API_KEY = process.env.MIAHSMS_API_KEY;
const TARGET_URL = process.env.MIAHSMS_API_URL || "https://miahsms.com/bot/api/getnum";

// Root Route
app.get('/', (req, res) => {
    res.send({ status: true, message: "MiahSMS Proxy Server is running!" });
});

// Main API Route
app.post('/api/getnum', async (req, res) => {
    try {
        const { range } = req.body;

        if (!range) {
            return res.status(400).json({ status: false, message: "Range is required" });
        }

        if (!API_KEY) {
            return res.status(500).json({ status: false, message: "API Key is not configured on server secrets!" });
        }

        const apiResponse = await fetch(TARGET_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            },
            body: JSON.stringify({
                range: range,
                is_national: false
            })
        });

        const data = await apiResponse.json();
        return res.status(apiResponse.status).json(data);

    } catch (error) {
        console.error("Proxy Error:", error);
        return res.status(500).json({ status: false, message: "Failed to connect to MiahSMS API", error: error.message });
    }
});

// Start Server (Render Port)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
