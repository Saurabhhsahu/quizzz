const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((err) => {
    if (err) console.log(err);
    console.log('Connected to the database.');
});

app.get('/flashcards', async (req, res) => {
    const sql = "SELECT * FROM cards";
    db.query(sql, (err, data) => {
        if (err) return res.json({ err: "Internal server error" });
        return res.json(data);
    });
    console.log("Data fetched successfully");
});

app.post('/flashcards', (req, res) => {
    const { id, question, answer } = req.body;

    const sql = "INSERT INTO cards (id, question, answer) VALUES (?, ?, ?)";
    db.query(sql, [id, question, answer], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
    console.log("Data posted successfully");
});

app.put('/admin/:id', async (req, res) => {
    try {
        const findId = parseInt(req.params.id, 10);
        const sql = "SELECT * FROM cards";
        db.query(sql, (err, data) => {
            if (err) return res.json({ err: "Internal server error" });
            const idx = data.findIndex((curr) => curr.id === findId);
            console.log(idx);

            if (idx === -1) {
                return res.status(404).json({ err: "Data not found" });
            }

            const { id, question, answer } = req.body;
            const updatedData = { ...data[idx], id, question, answer };
            data[idx] = updatedData;

            const sqlUpdate = `
                UPDATE cards
                SET question = ?, answer = ?
                WHERE id = ?;
            `;
            const updateValues = [question, answer, findId];

            db.query(sqlUpdate, updateValues, (updateErr) => {
                if (updateErr) {
                    return res.status(500).json({ err: "Internal server error" });
                }

                console.log("Data updated successfully!");
                return res.send("Data updated successfully");
            });
        });
    } catch (err) {
        console.log({ err: "Internal server error" });
        return res.status(500).json({ err: "Internal server error" });
    }
});

app.delete('/admin/:id', async (req, res) => {
    try {
        const findId = parseInt(req.params.id, 10);

        if (isNaN(findId)) {
            return res.status(400).json({ err: "Invalid ID" });
        }

        const sqlSelect = "SELECT * FROM cards WHERE id = ?";
        db.query(sqlSelect, [findId], (err, data) => {
            if (err) return res.status(500).json({ err: "Internal server error" });

            if (data.length === 0) {
                return res.status(404).json({ err: "Data not found" });
            }

            const sqlDelete = "DELETE FROM cards WHERE id = ?";
            db.query(sqlDelete, [findId], (deleteErr) => {
                if (deleteErr) {
                    return res.status(500).json({ err: "Internal server error" });
                }

                return res.send("Data deleted successfully");
            });
        });
    } catch (err) {
        return res.status(500).json({ err: "Internal server error" });
    }
});

app.listen(8080, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
});
