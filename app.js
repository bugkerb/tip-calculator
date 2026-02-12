// Tip Calculator
(function() {
    'use strict';

    // DOM Elements
    const billAmountInput = document.getElementById('bill-amount');
    const peopleCountInput = document.getElementById('people-count');
    const customTipInput = document.getElementById('custom-tip');
    const tipButtons = document.querySelectorAll('.tip-btn');
    const tipAmountDisplay = document.getElementById('tip-amount');
    const totalAmountDisplay = document.getElementById('total-amount');
    const tipPerPersonDisplay = document.getElementById('tip-per-person');
    const totalPerPersonDisplay = document.getElementById('total-per-person');
    const resetBtn = document.getElementById('reset-btn');

    let selectedTipPercent = 10;

    // Format currency
    function formatCurrency(amount) {
        return '$' + amount.toFixed(2);
    }

    // Calculate tip and total
    function calculate() {
        const billAmount = parseFloat(billAmountInput.value) || 0;
        const peopleCount = parseInt(peopleCountInput.value) || 1;
        
        // Use custom tip if entered, otherwise use selected button
        const customTip = parseFloat(customTipInput.value);
        let tipPercent = selectedTipPercent;
        
        if (!isNaN(customTip) && customTip > 0) {
            tipPercent = customTip;
            // Deselect all buttons
            tipButtons.forEach(btn => btn.classList.remove('active'));
        }

        const tipAmount = billAmount * (tipPercent / 100);
        const totalAmount = billAmount + tipAmount;
        const tipPerPerson = tipAmount / peopleCount;
        const totalPerPerson = totalAmount / peopleCount;

        // Update displays
        tipAmountDisplay.textContent = formatCurrency(tipAmount);
        totalAmountDisplay.textContent = formatCurrency(totalAmount);
        tipPerPersonDisplay.textContent = formatCurrency(tipPerPerson) + ' / person';
        totalPerPersonDisplay.textContent = formatCurrency(totalPerPerson) + ' / person';
    }

    // Reset calculator
    function reset() {
        billAmountInput.value = '';
        peopleCountInput.value = '1';
        customTipInput.value = '';
        
        // Reset to default 10%
        tipButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.percent === '10') {
                btn.classList.add('active');
            }
        });
        selectedTipPercent = 10;
        
        // Reset displays
        tipAmountDisplay.textContent = '$0.00';
        totalAmountDisplay.textContent = '$0.00';
        tipPerPersonDisplay.textContent = '$0.00 / person';
        totalPerPersonDisplay.textContent = '$0.00 / person';
        
        billAmountInput.focus();
    }

    // Event listeners for tip buttons
    tipButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Clear custom tip when button is clicked
            customTipInput.value = '';
            
            // Update active state
            tipButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update selected percentage
            selectedTipPercent = parseFloat(btn.dataset.percent);
            
            // Recalculate
            calculate();
        });
    });

    // Event listeners for inputs
    billAmountInput.addEventListener('input', calculate);
    peopleCountInput.addEventListener('input', calculate);
    customTipInput.addEventListener('input', calculate);

    // Reset button
    resetBtn.addEventListener('click', reset);

    // Focus first input
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => billAmountInput.focus());
    } else {
        billAmountInput.focus();
    }
})();
