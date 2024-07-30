const express = require('express');
const axios = require('axios');

const app = express();

const whatsappToken = 'token';

app.post('/send', async (req, res) => {
    const { phoneNumber, pdfUrl } = req.body;

    if (!phoneNumber || !pdfUrl) {
        return res.status(400).json({
            error: 'Phone number and PDF URL not provided.'
        });
    }
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v20.0/<PHONE_NUMBER_ID>/messages`,
            {
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: phoneNumber,
                type: 'document',
                document: {
                    link: pdfUrl
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${whatsappToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending PDF' });
    }
});

app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
});
