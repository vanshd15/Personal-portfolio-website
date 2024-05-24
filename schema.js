const mongoose = require('mongoose')

const portfolioRequestSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    portfolioType: String,
    timeline: String,
    budget: Number
});

const PortfolioRequest = mongoose.model('PortfolioRequest', portfolioRequestSchema);

module.exports = PortfolioRequest