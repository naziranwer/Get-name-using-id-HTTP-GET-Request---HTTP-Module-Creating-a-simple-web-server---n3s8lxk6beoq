const fs = require('fs');
const express = require('express');
const app = express();

// Importing productNames from names.json file
const productNames = JSON.parse(
    fs.readFileSync(`${__dirname}/data/names.json`)
);

//Middlewares
app.use(express.json())

// GET endpoint for sending the products to client by id
//Endpoint - /api/v1/names/:id

// POST endpoint for addition
app.post('/add', (req, res) => {
    const { num1, num2 } = req.body;
    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        res.status(400).json({ status: 'error', message: 'Invalid data types' });
        return;
    }
    const result = num1 + num2;
    if (isOverflow(result) || isUnderflow(result)) {
        res.status(400).json({ status: 'error', message: isOverflow(result) ? 'Overflow' : 'Underflow' });
        return;
    }
    res.json({ result });
});

// POST endpoint for subtraction
app.post('/subtract', (req, res) => {
    const { num1, num2 } = req.body;
    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        res.status(400).json({ status: 'error', message: 'Invalid data types' });
        return;
    }
    const result = num1 - num2;
    if (isOverflow(result) || isUnderflow(result)) {
        res.status(400).json({ status: 'error', message: isOverflow(result) ? 'Overflow' : 'Underflow' });
        return;
    }
    res.json({ result });
});

// POST endpoint for multiplication
app.post('/multiply', (req, res) => {
    const { num1, num2 } = req.body;
    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        res.status(400).json({ status: 'error', message: 'Invalid data types' });
        return;
    }
    const result = num1 * num2;
    if (isOverflow(result) || isUnderflow(result)) {
        res.status(400).json({ status: 'error', message: isOverflow(result) ? 'Overflow' : 'Underflow' });
        return;
    }
    res.json({ result });
});

// POST endpoint for division
app.post('/divide', (req, res) => {
    const { num1, num2 } = req.body;
    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        res.status(400).json({ status: 'error', message: 'Invalid data types' });
        return;
    }
    if (num2 === 0) {
        res.status(400).json({ status: 'error', message: 'Cannot divide by zero' });
        return;
    }
    const result = num1 / num2;
    if (isOverflow(result) || isUnderflow(result)) {
        res.status(400).json({ status: 'error', message: isOverflow(result) ? 'Overflow' : 'Underflow' });
        return;
    }
    res.json({ result });
});

// Helper function to check if a number is within the defined range
const isValidNumber = (num) => {
    return typeof num === 'number' && !isNaN(num);
};

// Helper functions to check overflow and underflow
const isOverflow = (result) => {
    return result > 1000000;
};

const isUnderflow = (result) => {
    return result < -1000000;
};


module.exports = app;
