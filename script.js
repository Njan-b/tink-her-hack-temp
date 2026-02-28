// Get last bill from history to auto-fill previous reading
function getLastReading() {
    let history = JSON.parse(localStorage.getItem("billHistory")) || [];
    if (history.length > 0) {
        let lastBill = history[history.length - 1];
        document.getElementById("previous").value = lastBill.currentReading || lastBill.units + lastBill.previousReading || 0;
        return new Date(lastBill.date);
    }
    return null;
}

function getConnectionType() {
    return document.querySelector('input[name="connection"]:checked').value;
}

function validateInputs(previous, current) {
    if (isNaN(previous) || isNaN(current)) {
        return "Please enter valid readings.";
    }
    if (previous < 0 || current < 0) {
        return "Readings cannot be negative.";
    }
    if (current < previous) {
        return "Current reading cannot be less than previous reading.";
    }
    return null;
}

function calculateDomestic(units) {
    let amount = 0;
    let breakdown = "";
    let fixedCharge = 50;

    if (units <= 100) {
        amount = units * 3;
        breakdown = `${units} × ₹3`;
    } else if (units <= 200) {
        amount = (100 * 3) + (units - 100) * 5;
        breakdown = `100 × ₹3 + ${units - 100} × ₹5`;
    } else {
        amount = (100 * 3) + (100 * 5) + (units - 200) * 7;
        breakdown = `100 × ₹3 + 100 × ₹5 + ${units - 200} × ₹7`;
    }

    return { amount, breakdown, fixedCharge };
}

function calculateCommercial(units) {
    let amount = 0;
    let breakdown = "";
    let fixedCharge = 100;

    if (units <= 100) {
        amount = units * 5;
        breakdown = `${units} × ₹5`;
    } else if (units <= 200) {
        amount = (100 * 5) + (units - 100) * 8;
        breakdown = `100 × ₹5 + ${units - 100} × ₹8`;
    } else {
        amount = (100 * 5) + (100 * 8) + (units - 200) * 10;
        breakdown = `100 × ₹5 + 100 × ₹8 + ${units - 200} × ₹10`;
    }

    return { amount, breakdown, fixedCharge };
}

function calculateMeterBill() {
    let previous = parseFloat(document.getElementById("previous").value);
    let current = parseFloat(document.getElementById("current").value);

    let error = validateInputs(previous, current);
    if (error) {
        document.getElementById("result").innerText = error;
        return;
    }

    let units = current - previous;
    let connectionType = getConnectionType();

    let billDetails = (connectionType === "domestic")
        ? calculateDomestic(units)
        : calculateCommercial(units);

    let total = (billDetails.amount + billDetails.fixedCharge).toFixed(2);

    // Calculate number of days since last bill
    let history = JSON.parse(localStorage.getItem("billHistory")) || [];
    let lastBillDate = history.length > 0 ? new Date(history[history.length - 1].date) : null;
    let today = new Date();
    let days = lastBillDate ? Math.ceil((today - lastBillDate) / (1000 * 60 * 60 * 24)) : 'N/A';

    saveToHistory(connectionType, units, billDetails.amount, billDetails.fixedCharge, total, current);

    displayResult(connectionType, units, billDetails.breakdown, billDetails.amount, billDetails.fixedCharge, total, days);
}

function saveToHistory(type, units, amount, fixed, total, currentReading) {
    let billData = {
        connection: type,
        units: units,
        energyCharge: amount,
        fixedCharge: fixed,
        total: total,
        currentReading: currentReading,
        date: new Date().toLocaleString()
    };

    let history = JSON.parse(localStorage.getItem("billHistory")) || [];
    history.push(billData);
    localStorage.setItem("billHistory", JSON.stringify(history));
}

function displayResult(type, units, breakdown, amount, fixed, total, days) {
    document.getElementById("result").innerText =
        `Connection Type: ${type.toUpperCase()}
Units Consumed: ${units}
Breakdown: ${breakdown}
Energy Charge: ₹${amount}
Fixed Charge: ₹${fixed}
Billing Period: ${days} day(s)
-------------------------
Total Bill: ₹${total}`;
}

function showHistory() {
    let history = JSON.parse(localStorage.getItem("billHistory")) || [];

    if (history.length === 0) {
        document.getElementById("result").innerText = "No previous bills found.";
        return;
    }

    let output = "----- Bill History -----\n\n";

    history.forEach((bill, index) => {
        output +=
            `Bill ${index + 1}
Date: ${bill.date}
Type: ${bill.connection.toUpperCase()}
Units: ${bill.units}
Current Reading: ${bill.currentReading}
Total: ₹${bill.total}
---------------------------

`;
    });

    document.getElementById("result").innerText = output;
}

function clearHistory() {
    localStorage.removeItem("billHistory");
    document.getElementById("result").innerText = "Bill history cleared.";
}

// Auto-fill previous reading on page load
window.onload = function() {
    getLastReading();
};

// script.js

function openScan() {
    window.location.href = "scan.html";
}

function openManual() {
    window.location.href = "manual.html";
    // If you also want to load app.js, include it in manual.html
}

function openAppliance() {
    window.location.href = "appliance.html";
}