const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Bhagavad Gita Quotes (You can add more quotes)
const quotes = [
    { verse: "2.47", quote: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।", meaning: "You have the right to perform your duty, but not to the fruits of your actions." },
    { verse: "4.7", quote: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।", meaning: "Whenever righteousness declines, I manifest myself." },
    { verse: "18.66", quote: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।", meaning: "Abandon all varieties of religion and just surrender unto me." }
];

// API Route to Get a Random Quote
app.get("/quote", (req, res) => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json(randomQuote);
});

// Route for Home Page (Root)
app.get("/", (req, res) => {
    res.send("<h1>Welcome to the Bhagavad Gita Quote API!</h1><p>Visit /quote for a random Bhagavad Gita quote.</p>");
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Bhagavad Gita API is running on http://localhost:${PORT}`);
});
