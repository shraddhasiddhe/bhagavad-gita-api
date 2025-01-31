const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Bhagavad Gita Quotes (You can add more quotes)
const quotes = [
    { verse: "1.1", quote: "धृतराष्ट्र उवाच | धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः | मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||", meaning: "Dhritarashtra said: O Sanjaya, after assembling in the sacred field of Kurukshetra and desiring to fight, what did my sons and the sons of Pandu do?" },
    { verse: "2.47", quote: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।", meaning: "You have the right to perform your duty, but not to the fruits of your actions." },
    { verse: "2.50", quote: "योग: कर्मसु कौशलम्।", meaning: "Yoga is skill in action." },
    { verse: "2.70", quote: "आपूर्यमाणमचलप्रतिष्ठं समुद्रमाप: प्रविशन्ति यद्वत्।", meaning: "Just as the ocean remains undisturbed though many rivers flow into it, so also the wise remain unshaken among all desires." },
    { verse: "3.19", quote: "तस्मादसक्त: सततं कार्यं कर्म समाचर।", meaning: "Therefore, always perform your duty without attachment, for by doing so, one attains the Supreme." },
    { verse: "3.35", quote: "श्रेयान्स्वधर्मो विगुण: परधर्मात्स्वनुष्ठितात्।", meaning: "It is better to perform one's own duty imperfectly than to perform another’s duty perfectly." },
    { verse: "4.7", quote: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।", meaning: "Whenever righteousness declines and unrighteousness rises, I manifest myself." },
    { verse: "4.8", quote: "परित्राणाय साधूनां विनाशाय च दुष्कृताम्।", meaning: "To protect the righteous and destroy the wicked, I appear from age to age." },
    { verse: "5.18", quote: "विद्याविनयसम्पन्ने ब्राह्मणे गवि हस्तिनि।", meaning: "The wise see a learned and humble Brahmin, a cow, an elephant, a dog, and a dog-eater as equal." },
    { verse: "6.5", quote: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।", meaning: "One must elevate, not degrade oneself, by one's own mind." },
    { verse: "6.6", quote: "बन्धुरात्मात्मनस्तस्य येनात्मैवात्मना जित:।", meaning: "For him who has conquered his mind, the mind is the best of friends." },
    { verse: "6.29", quote: "सर्वभूतस्थमात्मानं सर्वभूतानि चात्मनि।", meaning: "A yogi sees the Self in all beings and all beings in the Self." },
    { verse: "6.47", quote: "योगिनामपि सर्वेषां मद्गतेनान्तरात्मना।", meaning: "Of all yogis, the one who worships Me with faith is the highest." },
    { verse: "7.7", quote: "मत्त: परतरं नान्यत्किंचिदस्ति धनञ्जय।", meaning: "There is nothing higher than Me, O Arjuna." },
    { verse: "7.16", quote: "चतुर्विधा भजन्ते मां जनाः सुकृतिनोऽर्जुन।", meaning: "Four types of people worship Me – the distressed, the seekers of knowledge, the seekers of wealth, and the wise." },
    { verse: "7.19", quote: "बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते।", meaning: "After many births, the wise surrender unto Me, realizing that I am everything." },
    { verse: "8.5", quote: "अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम्।", meaning: "He who remembers Me at the time of death attains My nature." },
    { verse: "9.22", quote: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।", meaning: "To those who worship Me with exclusive devotion, I provide what they lack and preserve what they have." },
    { verse: "9.27", quote: "यत्करोषि यदश्नासि यज्जुहोषि ददासि यत्।", meaning: "Whatever you do, whatever you eat, offer it to Me as an act of worship." },
    { verse: "10.20", quote: "अहमात्मा गुडाकेश सर्वभूताशयस्थितः।", meaning: "I am the Self, O Gudakesha, seated in the hearts of all creatures." },
    { verse: "10.25", quote: "वेदानां सामवेदोऽस्मि देवेषु वासवोऽस्मि।", meaning: "Of the Vedas, I am the Sama Veda; among the gods, I am Indra." },
    { verse: "11.32", quote: "कालोऽस्मि लोकक्षयकृत्प्रवृद्धः।", meaning: "I am time, the great destroyer of the world." },
    { verse: "12.13", quote: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।", meaning: "He who has no hatred for any being, who is friendly and compassionate, is dear to Me." },
    { verse: "12.20", quote: "ये तु धर्म्यामृतमिदं यथोक्तं पर्युपासते।", meaning: "Those who follow this immortal path with faith, they are exceedingly dear to Me." },
    { verse: "13.27", quote: "समं सर्वेषु भूतेषु तिष्ठन्तं परमेश्वरम्।", meaning: "He who sees the Supreme Lord equally present in all beings truly sees." },
    { verse: "14.26", quote: "मां च योऽव्यभिचारेण भक्तियोगेन सेवते।", meaning: "He who serves Me with unalloyed devotion transcends the modes of nature and comes to Me." },
    { verse: "15.15", quote: "सर्वस्य चाहं हृदि सन्निविष्टो।", meaning: "I am seated in the hearts of all beings." },
    { verse: "16.21", quote: "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः।", meaning: "Three gates lead to hell – lust, anger, and greed." },
    { verse: "17.3", quote: "सत्त्वानुरूपा सर्वस्य श्रद्धा भवति भारत।", meaning: "A person's faith corresponds to their nature." },
    { verse: "18.66", quote: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।", meaning: "Abandon all duties and surrender unto Me alone." }
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
