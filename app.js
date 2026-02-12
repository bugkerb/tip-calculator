// Tip Calculator
(function() {
    'use strict';

    const billAmountInput = document.getElementById('bill-amount');
    const peopleCountInput = document.getElementById('people-count');
    const customTipInput = document.getElementById('custom-tip');
    const tipButtons = document.querySelectorAll('.tip-btn');
    const tipAmountDisplay = document.getElementById('tip-amount');
    const totalAmountDisplay = document.getElementById('total-amount');
    const tipPerPersonDisplay = document.getElementById('tip-per-person');
    const totalPerPersonDisplay = document.getElementById('total-per-person');
    const clearBtn = document.getElementById('clear-btn');

    let selectedTipPercent = 10;

    function formatCurrency(amount) {
        return '$' + amount.toFixed(2);
    }

    function calculate() {
        const billAmount = parseFloat(billAmountInput.value) || 0;
        const peopleCount = parseInt(peopleCountInput.value) || 1;
        
        const customTip = parseFloat(customTipInput.value);
        let tipPercent = selectedTipPercent;
        
        if (!isNaN(customTip) && customTip > 0) {
            tipPercent = customTip;
            tipButtons.forEach(btn => btn.classList.remove('active'));
        } else {
            tipButtons.forEach(btn => btn.classList.remove('active'));
        }

        const tipAmount = billAmount * (tipPercent / 100);
        const totalAmount = billAmount + tipAmount;
        const tipPerPerson = tipAmount / peopleCount;
        const totalPerPerson = totalAmount / peopleCount;

        tipAmountDisplay.textContent = formatCurrency(tipAmount);
        totalAmountDisplay.textContent = formatCurrency(totalAmount);
        tipPerPersonDisplay.textContent = formatCurrency(tipPerPerson);
        totalPerPersonDisplay.textContent = formatCurrency(totalPerPerson);
    }

    function clearAll() {
        billAmountInput.value = '';
        peopleCountInput.value = '1';
        customTipInput.value = '';
        
        tipButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.percent === '10') {
                btn.classList.add('active');
            }
        });
        selectedTipPercent = 10;
        
        tipAmountDisplay.textContent = '$0.00';
        totalAmountDisplay.textContent = '$0.00';
        tipPerPersonDisplay.textContent = '$0.00 / person';
        totalPerPersonDisplay.textContent = '$0.00 / person';
        
        billAmountInput.focus();
    }

    tipButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            customTipInput.value = '';
            selectedTipPercent = parseFloat(btn.dataset.percent);
            
            tipButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            calculate();
        });
    });

    billAmountInput.addEventListener('input', calculate);
    peopleCountInput.addEventListener('input', calculate);
    customTipInput.addEventListener('input', calculate);
    clearBtn.addEventListener('click', clearAll);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => billAmountInput.focus());
    } else {
        billAmountInput.focus();
    }
})();
