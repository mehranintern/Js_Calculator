let input = '';
const inputField = document.getElementById("input");
const outputField = document.getElementById("output");

function appendToDisplay(value) {
    if (input === "0") {
        inputField.value = value;
    } else {
        inputField.value += value;
    }
    input = inputField.value;
}

function performCalculation() {
    let input = inputField.value;
    let arrayOfInput = input.split(/([\+\-\*\/])/);
    let input1 = evaluateArray(arrayOfInput);
    input = input1.join('');
    input = replaceTrig(input);

    // Replace variable names with their values
    for (let variable in variables) {
        const regExp = new RegExp('\\b' + variable + '\\b', 'g'); //b is word boundary and g is for global
        input = input.replace(regExp, variables[variable]);
    }

    try {
        // Evaluate expressions with 'e' and 'Pi' constants
        input = input.replace(/e/g, Math.E).replace(/Pi/g, Math.PI);
        const result = eval(input);
        if (isNaN(result)) {
            outputField.value = "Invalid Input";
        } else if (!isFinite(result)) {
            outputField.value = "Cannot be divided by zero";
        } else {
            outputField.value = result.toFixed(4);
        }
    } catch (error) {
        outputField.value = "Error.";
    }
}


function evaluateArray(array) {
    array.forEach((element, index) => {
        let reg = /^[a-zA-Z]$/.test(element);
        if (reg) {
            let valueOfElement = getValue(element);
            array.splice(index, 1, valueOfElement);
        }
    });
    return array;
}

function getValue(element) {
    let foundValue;

    Object.entries(variables).forEach(([key, value]) => {
        if (key === element) {
            foundValue = value;
        }
    });

    return foundValue;
}

function replaceTrig(input) {
    let replacedInput = input;

    switch (true) {
        case input.includes('sin'):
            replacedInput = input.replace(/sin/g, 'Math.sin');
            break;
        case input.includes('cos'):
            replacedInput = input.replace(/cos/g, 'Math.cos');
            break;
        case input.includes('tan'):
            replacedInput = input.replace(/tan/g, 'Math.tan');
            break;
        case input.includes('sqrt'):
            replacedInput = input.replace(/sqrt/g, 'Math.sqrt');
            break;
        default:
            break;
    }
    return replacedInput;
}



let variables = {}; // Object to store variable names and values
function handleVariables() {
    const variableName = document.getElementById("variableName").value;
    const variableValue = document.getElementById("variableNumber").value;

    // Check if variableName is a number or a constant 
    if (!isNaN(variableName) || (variableName === 'e') || (variableName === 'Pi')) {
        document.getElementById("showAlert1").style.display = "block";
        return;
    }

    // Check if variableName already exists in the variables object
    if (variables.hasOwnProperty(variableName)) {
        document.getElementById("showAlert3").style.display = "block";
        return;
    }

    if (!variableValue.length) {
        document.getElementById("showAlert2").style.display = "block";
        return;
    }

    variables[variableName] = parseFloat(variableValue);
    document.getElementById("storedVariables").value = Object.keys(variables).join(", ");
    document.getElementById("variableName").value = "";
    document.getElementById("variableNumber").value = "";
}


document.getElementById("variableName").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        handleVariables();
    }
});

document.getElementById("variableNumber").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        handleVariables();
    }
});


function clearAll() {
    inputField.value = '';
    outputField.value = '';
    input = '';
}


function delCurrentEntity() {
    const inputValue = inputField.value;
    inputField.value = inputValue.slice(0, -1);
}




