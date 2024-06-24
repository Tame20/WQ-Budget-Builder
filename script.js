document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener("input", updateSavings);
    });
    loadInputs();
    updateSavings(); // Initial call to update savings on load
});

function updateSavings() {
    const income = parseFloat(document.getElementById('income').value) || 0;

    // Debt Payments
    const studentLoan = parseFloat(document.getElementById('student-loan').value) || 0;
    const creditCard = parseFloat(document.getElementById('credit-card').value) || 0;
    const otherDebt = parseFloat(document.getElementById('other-debt').value) || 0;

    // Essential Expenses
    const rent = parseFloat(document.getElementById('rent').value) || 0;
    const insurance = parseFloat(document.getElementById('insurance').value) || 0;
    const utilities = parseFloat(document.getElementById('utilities').value) || 0;
    const propertyTax = parseFloat(document.getElementById('property-tax').value) || 0;
    const homeMaintenance = parseFloat(document.getElementById('home-maintenance').value) || 0;
    const transportation = parseFloat(document.getElementById('transportation').value) || 0;
    const carLoan = parseFloat(document.getElementById('car-loan').value) || 0;
    const carInsurance = parseFloat(document.getElementById('car-insurance').value) || 0;
    const gas = parseFloat(document.getElementById('gas').value) || 0;
    const carMaintenance = parseFloat(document.getElementById('car-maintenance').value) || 0;
    const healthInsurance = parseFloat(document.getElementById('health-insurance').value) || 0;
    const childcare = parseFloat(document.getElementById('childcare').value) || 0;
    const groceries = parseFloat(document.getElementById('groceries').value) || 0;

    // Discretionary Expenses
    const clothing = parseFloat(document.getElementById('clothing').value) || 0;
    const internet = parseFloat(document.getElementById('internet').value) || 0;
    const cable = parseFloat(document.getElementById('cable').value) || 0;
    const phone = parseFloat(document.getElementById('phone').value) || 0;
    const charity = parseFloat(document.getElementById('charity').value) || 0;
    const travel = parseFloat(document.getElementById('travel').value) || 0;
    const otherDiscretionary = parseFloat(document.getElementById('other-discretionary').value) || 0;

    // Investment Amounts
    const tradAmount = parseFloat(document.getElementById('trad-amount').value) || 0;
    const rothAmount = parseFloat(document.getElementById('roth-amount').value) || 0;
    const debtAmount = parseFloat(document.getElementById('debt-amount').value) || 0;
    const bankAmount = parseFloat(document.getElementById('bank-amount').value) || 0;

    // Calculate Savings
    const totalExpenses = studentLoan + creditCard + otherDebt + rent + insurance + utilities + propertyTax + homeMaintenance + transportation + carLoan + carInsurance + gas + carMaintenance + healthInsurance + childcare + groceries + clothing + internet + cable + phone + charity + travel + otherDiscretionary;
    const totalInvestments = tradAmount + rothAmount + debtAmount + bankAmount;
    const savings = income - totalExpenses - totalInvestments;

    // Display Savings
    document.getElementById('savings').textContent = `Total Monthly Savings: $${savings.toFixed(2)}`;

    // Save Inputs to Local Storage
    saveInputs();

    // Check Investment Amounts
    checkInvestmentAmount();
}

function saveInputs() {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        localStorage.setItem(input.id, input.value);
    });
}

function loadInputs() {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(input.id);
        if (savedValue !== null) {
            input.value = savedValue;
        }
    });
}

function checkInvestmentAmount() {
    const tradAmount = parseFloat(document.getElementById('trad-amount').value) || 0;
    const rothAmount = parseFloat(document.getElementById('roth-amount').value) || 0;
    const debtAmount = parseFloat(document.getElementById('debt-amount').value) || 0;
    const bankAmount = parseFloat(document.getElementById('bank-amount').value) || 0;
    const savings = parseFloat(document.getElementById('savings').textContent.replace('Total Monthly Savings: $', '')) || 0;
    const totalInvestment = tradAmount + rothAmount + debtAmount + bankAmount;

    const warningDiv = document.getElementById('investment-warning');
    if (totalInvestment > savings) {
        warningDiv.textContent = "You can not invest more than your total monthly saving amount.";
    } else {
        warningDiv.textContent = "";
    }

    const investmentInputs = document.querySelectorAll('.investment-row input[type="number"]');
    investmentInputs.forEach(input => {
        if (parseFloat(input.value) > savings) {
            warningDiv.textContent = "You can not invest more than your total monthly saving amount.";
        }
    });
}

function calculateFutureValue() {
    const tradRate = parseFloat(document.getElementById('trad-rate').value) || 0;
    const rothRate = parseFloat(document.getElementById('roth-rate').value) || 0;
    const debtRate = parseFloat(document.getElementById('debt-rate').value) || 0;
    const bankRate = parseFloat(document.getElementById('bank-rate').value) || 0;

    const tradAmount = parseFloat(document.getElementById('trad-amount').value) || 0;
    const rothAmount = parseFloat(document.getElementById('roth-amount').value) || 0;
    const debtAmount = parseFloat(document.getElementById('debt-amount').value) || 0;
    const bankAmount = parseFloat(document.getElementById('bank-amount').value) || 0;

    const years = parseInt(document.getElementById('years').value) || 0;

    const savings = parseFloat(document.getElementById('savings').textContent.replace('Total Monthly Savings: $', '')) || 0;
    const totalInvestment = tradAmount + rothAmount + debtAmount + bankAmount;

    if (totalInvestment > savings) {
        document.getElementById('investment-warning').textContent = "You can not invest more than your total monthly saving amount.";
        return;
    }

    const results = {
        tradAmount,
        tradRate,
        tradFutureValue: calculateCompoundInterest(tradAmount, tradRate, years),
        rothAmount,
        rothRate,
        rothFutureValue: calculateCompoundInterest(rothAmount, rothRate, years),
        debtAmount,
        debtRate,
        debtFutureValue: calculateCompoundInterest(debtAmount, debtRate, years),
        bankAmount,
        bankRate,
        bankFutureValue: calculateCompoundInterest(bankAmount, bankRate, years)
    };

    localStorage.setItem('investmentResults', JSON.stringify(results));
    localStorage.setItem('investmentYears', JSON.stringify(years));
    window.location.href = 'results.html';
}

function calculateCompoundInterest(principal, annualRate, years) {
    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    let futureValue = 0;

    for (let i = 0; i < months; i++) {
        futureValue = (futureValue + principal) * (1 + monthlyRate);
    }

    return futureValue;
}