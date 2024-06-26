document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener("input", updateSavings);
    });
    loadInputs();
    updateSavings(); // Initial call to update savings on load
});

function formatNumberInput(input) {
    let value = input.value.replace(/,/g, '');
    if (value) {
        input.value = parseFloat(value).toLocaleString('en-US');
    }
}

function updateSavings() {
    const income = parseFloat(document.getElementById('income').value.replace(/,/g, '')) || 0;

    // Debt Payments
    const studentLoan = parseFloat(document.getElementById('student-loan').value.replace(/,/g, '')) || 0;
    const creditCard = parseFloat(document.getElementById('credit-card').value.replace(/,/g, '')) || 0;
    const otherDebt = parseFloat(document.getElementById('other-debt').value.replace(/,/g, '')) || 0;

    // Essential Expenses
    const rent = parseFloat(document.getElementById('rent').value.replace(/,/g, '')) || 0;
    const insurance = parseFloat(document.getElementById('insurance').value.replace(/,/g, '')) || 0;
    const utilities = parseFloat(document.getElementById('utilities').value.replace(/,/g, '')) || 0;
    const propertyTax = parseFloat(document.getElementById('property-tax').value.replace(/,/g, '')) || 0;
    const homeMaintenance = parseFloat(document.getElementById('home-maintenance').value.replace(/,/g, '')) || 0;
    const transportation = parseFloat(document.getElementById('transportation').value.replace(/,/g, '')) || 0;
    const carLoan = parseFloat(document.getElementById('car-loan').value.replace(/,/g, '')) || 0;
    const carInsurance = parseFloat(document.getElementById('car-insurance').value.replace(/,/g, '')) || 0;
    const gas = parseFloat(document.getElementById('gas').value.replace(/,/g, '')) || 0;
    const carMaintenance = parseFloat(document.getElementById('car-maintenance').value.replace(/,/g, '')) || 0;
    const healthInsurance = parseFloat(document.getElementById('health-insurance').value.replace(/,/g, '')) || 0;
    const childcare = parseFloat(document.getElementById('childcare').value.replace(/,/g, '')) || 0;
    const groceries = parseFloat(document.getElementById('groceries').value.replace(/,/g, '')) || 0;

    // Discretionary Expenses
    const charity = parseFloat(document.getElementById('charity').value.replace(/,/g, '')) || 0;
    const internet = parseFloat(document.getElementById('internet').value.replace(/,/g, '')) || 0;
    const cable = parseFloat(document.getElementById('cable').value.replace(/,/g, '')) || 0;
    const phone = parseFloat(document.getElementById('phone').value.replace(/,/g, '')) || 0;
    const clothing = parseFloat(document.getElementById('clothing').value.replace(/,/g, '')) || 0;
    const travel = parseFloat(document.getElementById('travel').value.replace(/,/g, '')) || 0;
    const entertainment = parseFloat(document.getElementById('entertainment').value.replace(/,/g, '')) || 0;
    const otherDiscretionary = parseFloat(document.getElementById('other-discretionary').value.replace(/,/g, '')) || 0;

    // Calculate Savings
    const totalExpenses = studentLoan + creditCard + otherDebt + rent + insurance + utilities + propertyTax + homeMaintenance + transportation + carLoan + carInsurance + gas + carMaintenance + healthInsurance + childcare + groceries + charity + internet + cable + phone + clothing + travel + entertainment + otherDiscretionary;
    const savings = income - totalExpenses;

    // Display Savings
    document.getElementById('savings').textContent = `Total Monthly Savings: $${savings.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    // Calculate Wildcard Event Effect
    const wildcardAmount = parseFloat(document.getElementById('wildcard-amount').value.replace(/,/g, '')) || 0;
    const wildcardEffect = document.getElementById('wildcard-effect').value;
    const wildcardImpact = wildcardEffect === 'positive' ? wildcardAmount : -wildcardAmount;

    // Calculate and Display Total Accumulated Savings for 5 Years
    const accumulatedSavings = savings * 12 * 5 + wildcardImpact;
    document.getElementById('accumulated-savings').textContent = `Total Accumulated Savings (5 years): $${accumulatedSavings.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    // Save Inputs to Local Storage
    saveInputs();

    // Update Displayed Savings and Final Accumulated Savings
    updateDisplaySavings();
}

function saveInputs() {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        localStorage.setItem(input.id, input.value.replace(/,/g, ''));
    });
}

function loadInputs() {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(input.id);
        if (savedValue !== null) {
            input.value = parseFloat(savedValue).toLocaleString('en-US');
        }
    });
}

function updateDisplaySavings() {
    const tradInitial = parseFloat(document.getElementById('trad-initial').value.replace(/,/g, '')) || 0;
    const rothInitial = parseFloat(document.getElementById('roth-initial').value.replace(/,/g, '')) || 0;
    const debtInitial = parseFloat(document.getElementById('debt-initial').value.replace(/,/g, '')) || 0;
    const bankInitial = parseFloat(document.getElementById('bank-initial').value.replace(/,/g, '')) || 0;
    const additionalInitial = parseFloat(document.getElementById('additional-initial').value.replace(/,/g, '')) || 0;

    const tradAmount = parseFloat(document.getElementById('trad-amount').value.replace(/,/g, '')) || 0;
    const rothAmount = parseFloat(document.getElementById('roth-amount').value.replace(/,/g, '')) || 0;
    const debtAmount = parseFloat(document.getElementById('debt-amount').value.replace(/,/g, '')) || 0;
    const bankAmount = parseFloat(document.getElementById('bank-amount').value.replace(/,/g, '')) || 0;
    const additionalAmount = parseFloat(document.getElementById('additional-amount').value.replace(/,/g, '')) || 0;
    const savings = parseFloat(document.getElementById('savings').textContent.replace('Total Monthly Savings: $', '').replace(/,/g, '')) || 0;
    const totalInvestment = tradAmount + rothAmount + debtAmount + bankAmount + additionalAmount + tradInitial + rothInitial + debtInitial + bankInitial + additionalInitial;

    const displayedSavings = savings - tradAmount - rothAmount - debtAmount - bankAmount - additionalAmount;
    document.getElementById('displayed-savings').textContent = `Monthly Savings: $${displayedSavings.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    const accumulatedSavings = parseFloat(document.getElementById('accumulated-savings').textContent.replace('Total Accumulated Savings (5 years): $', '').replace(/,/g, '')) || 0;
    const finalAccumulatedSavings = accumulatedSavings - tradInitial - rothInitial - debtInitial - bankInitial - additionalInitial;
    document.getElementById('final-accumulated-savings').textContent = `Final Accumulated Savings: $${finalAccumulatedSavings.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    const warningDiv = document.getElementById('investment-warning');
    if (tradAmount + rothAmount + debtAmount + bankAmount + additionalAmount > savings) {
        warningDiv.textContent = "You cannot invest more than your total monthly savings amount.";
    } else if (tradInitial + rothInitial + debtInitial + bankInitial + additionalInitial > accumulatedSavings) {
        warningDiv.textContent = "You cannot invest more than your total accumulated savings amount.";
    } else {
        warningDiv.textContent = "";
    }
}

function calculateFutureValue() {
    const tradRate = parseFloat(document.getElementById('trad-rate').value.replace(/,/g, '')) || 0;
    const rothRate = parseFloat(document.getElementById('roth-rate').value.replace(/,/g, '')) || 0;
    const debtRate = parseFloat(document.getElementById('debt-rate').value.replace(/,/g, '')) || 0;
    const bankRate = parseFloat(document.getElementById('bank-rate').value.replace(/,/g, '')) || 0;
    const additionalRate = parseFloat(document.getElementById('additional-rate').value.replace(/,/g, '')) || 0;

    const tradInitial = parseFloat(document.getElementById('trad-initial').value.replace(/,/g, '')) || 0;
    const rothInitial = parseFloat(document.getElementById('roth-initial').value.replace(/,/g, '')) || 0;
    const debtInitial = parseFloat(document.getElementById('debt-initial').value.replace(/,/g, '')) || 0;
    const bankInitial = parseFloat(document.getElementById('bank-initial').value.replace(/,/g, '')) || 0;
    const additionalInitial = parseFloat(document.getElementById('additional-initial').value.replace(/,/g, '')) || 0;

    const tradAmount = parseFloat(document.getElementById('trad-amount').value.replace(/,/g, '')) || 0;
    const rothAmount = parseFloat(document.getElementById('roth-amount').value.replace(/,/g, '')) || 0;
    const debtAmount = parseFloat(document.getElementById('debt-amount').value.replace(/,/g, '')) || 0;
    const bankAmount = parseFloat(document.getElementById('bank-amount').value.replace(/,/g, '')) || 0;
    const additionalAmount = parseFloat(document.getElementById('additional-amount').value.replace(/,/g, '')) || 0;

    const charityAmount = parseFloat(document.getElementById('charity').value.replace(/,/g, '')) || 0;
    const entertainmentAmount = parseFloat(document.getElementById('entertainment').value.replace(/,/g, '')) || 0;
    const travelAmount = parseFloat(document.getElementById('travel').value.replace(/,/g, '')) || 0;

    const years = parseInt(document.getElementById('years').value.replace(/,/g, '')) || 0;

    const savings = parseFloat(document.getElementById('savings').textContent.replace('Total Monthly Savings: $', '').replace(/,/g, '')) || 0;
    const wildcardAmount = parseFloat(document.getElementById('wildcard-amount').value.replace(/,/g, '')) || 0;
    const wildcardEffect = document.getElementById('wildcard-effect').value;
    const wildcardImpact = wildcardEffect === 'positive' ? wildcardAmount : -wildcardAmount;
    const totalMonthlyInvestment = tradAmount + rothAmount + debtAmount + bankAmount + additionalAmount;
    const totalInitialInvestment = tradInitial + rothInitial + debtInitial + bankInitial + additionalInitial;

    if (totalMonthlyInvestment > savings) {
        document.getElementById('investment-warning').textContent = "You cannot invest more than your total monthly savings amount.";
        return;
    } else if (totalInitialInvestment > savings * 12 * 5 + wildcardImpact) {
        document.getElementById('investment-warning').textContent = "You cannot invest more than your total accumulated savings amount.";
        return;
    }

    const tradFutureValue = calculateCompoundInterest(tradInitial, tradAmount, tradRate, years);
    const rothFutureValue = calculateCompoundInterest(rothInitial, rothAmount, rothRate, years);
    const debtFutureValue = calculateCompoundInterest(debtInitial, debtAmount, debtRate, years);
    const bankFutureValue = calculateCompoundInterest(bankInitial, bankAmount, bankRate, years);
    const additionalFutureValue = calculateCompoundInterest(additionalInitial, additionalAmount, additionalRate, years);
    const charityFutureValue = calculateCumulativeExpenses(charityAmount, years);
    const entertainmentFutureValue = calculateCumulativeExpenses(entertainmentAmount, years);
    const travelFutureValue = calculateCumulativeExpenses(travelAmount, years);

    const results = {
        tradInitial,
        tradRate,
        tradFutureValue,
        rothInitial,
        rothRate,
        rothFutureValue,
        debtInitial,
        debtRate,
        debtFutureValue,
        bankInitial,
        bankRate,
        bankFutureValue,
        additionalInitial,
        additionalRate,
        additionalFutureValue,
        years,
        tradAmount,
        rothAmount,
        debtAmount,
        bankAmount,
        additionalAmount,
        charityFutureValue,
        entertainmentFutureValue,
        travelFutureValue
    };

    localStorage.setItem('investmentResults', JSON.stringify(results));
    window.location.href = 'results.html';
}

function calculateCompoundInterest(initial, monthly, annualRate, years) {
    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    let futureValue = initial;

    for (let i = 0; i < months; i++) {
        futureValue = (futureValue + monthly) * (1 + monthlyRate);
    }

    return futureValue;
}

function calculateCumulativeExpenses(monthly, years) {
    const months = years * 12;
    return monthly * months;
}
