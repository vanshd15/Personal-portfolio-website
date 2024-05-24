const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PortfolioRequest = require('./schema.js')
const ejsMate = require('ejs-mate')
const app = express();
const path = require('path')

app.engine('ejs', ejsMate);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"/public")))
// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/portfolio', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
main()
    .then(() => {
        console.log('Connection successful.')
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/portfolio');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Define a schema for the portfolio requests


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Function to send email (placeholder implementation)
// function sendEmail(name, email, message) {
//     // Implementation to send email goes here
//     console.log(`Email sent to ${email} with message: ${message}`);
// }

// Handle form submission
app.get('/',async (req,res)=>{
    res.render('index')
})
app.post('/submit-portfolio-request', async (req, res) => {
    // Extract form data from request
    const { name, email, message, portfolioType, timeline, budget } = req.body;

    const newPortfolioRequest = new PortfolioRequest({
        name: name,
        email: email,
        message: message,
        portfolioType: portfolioType,
        timeline: timeline,
        budget: budget
    });
    // Save form data to a database
    // await saveFormData({ name, email, message, portfolioType, timeline, budget });
    await newPortfolioRequest.save()
    console.log('saved')
    // Send response
    res.status(200).send('Form submitted successfully!');
});

// Function to save form data to a database
async function saveFormData(formData) {
    // Create a new PortfolioRequest document
    const newPortfolioRequest = new PortfolioRequest({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        portfolioType: formData.portfolioType,
        timeline: formData.timeline,
        budget: formData.budget
    });

    // Save the portfolio request to the database
    await newPortfolioRequest.save((err, savedPortfolioRequest) => {
        if (err) {
            console.error('Error saving portfolio request:', err);
        } else {
            console.log('Portfolio request saved successfully:', savedPortfolioRequest);
            // Example: Send an email notification
            // sendEmail(formData.name, formData.email, formData.message);
        }
    });
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
