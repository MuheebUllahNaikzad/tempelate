const conversionData = {
    mass: {
        base: 'kg',
        units: { kg: 1, g: 1000, mg: 1000000, lb: 2.20462, oz: 35.274, ton: 0.001 }
    },
    length: {
        base: 'm',
        units: { m: 1, km: 0.001, cm: 100, mm: 1000, inch: 39.3701, ft: 3.28084, mile: 0.000621371 }
    },
    volume: {
        base: 'l',
        units: { l: 1, ml: 1000, gal: 0.264172, cup: 4.22675, pt: 2.11338 }
    },
    area: {
        base: 'sqm',
        units: { sqm: 1, sqkm: 0.000001, acre: 0.000247105, hectare: 0.0001 }
    },
    temperature: {
        isSpecial: true, // Requires formula instead of simple ratio
        units: ['Celsius', 'Fahrenheit', 'Kelvin']
    }
};

let currentInput = "0";
const category = document.getElementById('category-selector');
const fromUnit = document.getElementById('unit-from');
const toUnit = document.getElementById('unit-to');
const display = document.getElementById('input-val');
const output = document.getElementById('output-val');

function populateUnits() {
    const units = conversionData[category.value].units;
    const names = conversionData[category.value].isSpecial ? conversionData[category.value].units : Object.keys(units);
    
    const options = names.map(u => `<option value="${u}">${u.toUpperCase()}</option>`).join('');
    fromUnit.innerHTML = options;
    toUnit.innerHTML = options;
    calculate();
}

function calculate() {
    let val = parseFloat(currentInput);
    const cat = category.value;
    const from = fromUnit.value;
    const to = toUnit.value;

    if (conversionData[cat].isSpecial) {
        // Temp Logic
        let result;
        if (from === to) result = val;
        else if (from === 'Celsius' && to === 'Fahrenheit') result = (val * 9/5) + 32;
        else if (from === 'Fahrenheit' && to === 'Celsius') result = (val - 32) * 5/9;
        // ... add more temp formulas as needed
        output.innerText = isNaN(result) ? "0" : result.toFixed(2);
    } else {
        const baseVal = val / conversionData[cat].units[from];
        const finalVal = baseVal * conversionData[cat].units[to];
        output.innerText = isNaN(finalVal) ? "0" : finalVal.toLocaleString(undefined, {maximumFractionDigits: 5});
    }
}

document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        const val = key.dataset.val;
        if (val === 'clear') currentInput = "0";
        else if (currentInput === "0" && val !== ".") currentInput = val;
        else currentInput += val;
        
        display.innerText = currentInput;
        calculate();
    });
});

category.addEventListener('change', populateUnits);
fromUnit.addEventListener('change', calculate);
toUnit.addEventListener('change', calculate);

populateUnits();
