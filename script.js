let enteredNumber = '';
const inputField = document.getElementById("input");
const outputField = document.getElementById("output");

function appendToDisplay(value) {
    if (enteredNumber === "0") {
        inputField.value = value;
    } else {
        inputField.value += value;
    }
    enteredNumber = inputField.value;
}

function performCalculation() {
    let input = inputField.value;
    let arrayOfInput = input.split(/([\+\-\*\/])/);
    let input1 = evaluateArray(arrayOfInput);
    input = input1.join('');
    input = replaceTrig(input);

    // Replace variable names with their values
    for (let variable in variables) {
        const regExp = new RegExp('\\b' + variable + '\\b', 'g');
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
    for (let num in variables) {
        if (num === element) {
            let val = variables[num];
            return val;
        }
    }
}
function replaceTrig(input) {
    if (input.includes('sin')) {
        input = input.replace('sin', 'Math.sin');
    }
    if (input.includes('cos')) {
        input = input.replace('cos', 'Math.cos');
    }
    if (input.includes('tan')) {
        input = input.replace('tan', 'Math.tan');
    }
    if (input.includes('sqrt')) {
        input = input.replace('sqrt', 'Math.sqrt');
    }
    return input;
}


let variables = {}; // Object to store variable names and values
function handleVariables() {
    const variableName = document.getElementById("variable").value;
    const variableValue = document.getElementById("number").value;

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

    if (variableValue.length === 0) {
        document.getElementById("showAlert2").style.display = "block";
        return;
    }

    variables[variableName] = parseFloat(variableValue);
    document.getElementById("storedVariables").value = Object.keys(variables).join(", ");
    document.getElementById("variable").value = "";
    document.getElementById("number").value = "";
}


document.getElementById("variable").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        handleVariables();
    }
});

document.getElementById("number").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        handleVariables();
    }
});


function clearAll() {
    inputField.value = '';
    outputField.value = '';
    enteredNumber = '';
}


function delCurrentEntity() {
    const inputValue = inputField.value;
    inputField.value = inputValue.slice(0, -1);
}




