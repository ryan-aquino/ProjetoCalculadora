const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    //add digit to calculador screen
    addDigit(digit) {
        // check if current operation alredy has dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }
        
        this.currentOperation = digit;
        this.updateScreen();
    }

    // Process all calculator operations
    processOperation(operation) {
        // Check if current is empty
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            // Change operation
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }
        
        // Get current and previous value
        let operationValue
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "DEL":
                this.processDelOperator();
            break;
            case "CE":
                this.processClearCurrentOperator();
            break;
            case "C":
                this.processClearOperator();
            break;
            case "=":
                this.processEqualOperator();
            break;
            default:
                return;
        }
    }


    // change values of the calculator screen
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous =null
        ) {
        console.log(operationValue, operation, current, previous);

        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // Check if value is zero, if it is just add current value
            if(previous === 0) {
                operationValue = current
            }

            //Add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    // Change amth operation
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]

        if(!mathOperations.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = 
            this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // Delete the last digit
    processDelOperator() {
        this.currentOperationText.innerText = 
            this.currentOperationText.innerText.slice(0, -1);
    }
    //Clear current operation
    processClearCurrentOperator() {
        this.currentOperationText.innerText = "";
    }
    //clear all operations
    processClearOperator() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText ="";
    }

    //process an operations
    processEqualOperator() {
        const operation = this.previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});