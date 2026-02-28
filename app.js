const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let previousReading = null;
let previousDate = null;

app.post("/calculate-bill", (req, res) => {
    const { currentReading, connectionType } = req.body;

    if (!currentReading || !connectionType) {
        return res.status(400).json({ error: "Current reading and connection type are required." });
    }

    const currDate = new Date();

    if (previousReading === null) {
        previousReading = currentReading;
        previousDate = currDate;
        return res.json({
            message: "First reading recorded. Enter next reading to calculate bill.",
            previousReading,
            previousDate: previousDate.toISOString()
        });
    }

    if (currentReading < previousReading) {
        return res.status(400).json({ error: "Current reading cannot be less than previous reading." });
    }

    const units = currentReading - previousReading;
    const days = Math.ceil((currDate - previousDate) / (1000 * 60 * 60 * 24));

    let fixedCharge = connectionType.toLowerCase() === "domestic" ? 50 : 100;
    let energyCharge = 0;
    let breakdown = "";

    if (connectionType.toLowerCase() === "domestic") {
        if (units <= 100) {
            energyCharge = units * 3;
            breakdown = `${units} × ₹3`;
        } else if (units <= 200) {
            energyCharge = 100*3 + (units-100)*5;
            breakdown = `100 × ₹3 + ${units-100} × ₹5`;
        } else {
            energyCharge = 100*3 + 100*5 + (units-200)*7;
            breakdown = `100 × ₹3 + 100 × ₹5 + ${units-200} × ₹7`;
        }
    } else {
        if (units <= 100) {
            energyCharge = units * 5;
            breakdown = `${units} × ₹5`;
        } else if (units <= 200) {
            energyCharge = 100*5 + (units-100)*8;
            breakdown = `100 × ₹5 + ${units-100} × ₹8`;
        } else {
            energyCharge = 100*5 + 100*8 + (units-200)*10;
            breakdown = `100 × ₹5 + 100 × ₹8 + ${units-200} × ₹10`;
        }
    }

    const total = energyCharge + fixedCharge;

    previousReading = currentReading;
    previousDate = currDate;

    res.json({
        connectionType: connectionType.toUpperCase(),
        units,
        breakdown,
        energyCharge,
        fixedCharge,
        total: total.toFixed(2),
        days
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));