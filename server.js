const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Route to serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to serve admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Path to your "Database" file
const DATA_FILE = './reports.json';

// Route to get all reports (for Admin/Counselor)
app.get('/api/reports', (req, res) => {
    const data = fs.readFileSync(DATA_FILE);
    res.json(JSON.parse(data));
});

// Route to receive a new report from a student
app.post('/api/report', (req, res) => {
    const reports = JSON.parse(fs.readFileSync(DATA_FILE));
    const newReport = req.body;
    reports.push(newReport);
    fs.writeFileSync(DATA_FILE, JSON.stringify(reports, null, 2));
    res.status(201).send({ message: "Report saved to server!" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
