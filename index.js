let buttons = document.querySelectorAll('button');

function checkIfExceedsLength(display, limit) {
    if (display.textContent.length > limit) {
        display.classList.add('smaller');
    } else {
        display.classList.remove("smaller");
    }
}

let debounceTimeout;

buttons.forEach(function (button) {
    button.addEventListener("click", function () {

        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(function() {

            let display = document.querySelector('.display');

            checkIfExceedsLength(display, 12)
            parseInput(button.innerText);

        }, 100); // Controls the rate at which the function is called

    });
});

// Function to handle button click
function parseInput(value) {
    let displayResult = document.querySelector('.display');

    console.log(value)

    switch (value) {
        case "C":
            displayResult.textContent = "0";
            break;
        case "CE":
            displayResult.textContent = displayResult.textContent.slice(0, -1);
            if (displayResult.textContent === "") {
                displayResult.textContent = "0";
            }
            break;

        case "=":
            try {
                // Sanitize the input
                let expression = displayResult.textContent.replace(/÷/g, '/').replace(/×/g, '*').replace("%", "*0.01*");
                if (["+", "-", "/", "*"].includes(expression[expression.length - 1])) {
                    expression = expression.slice(0, -1);
                }
                console.log(expression);

                // Evaluate the expression
                displayResult.textContent = eval(expression);
                checkIfExceedsLength(displayResult, 12)
                
            } catch (error) {
                displayResult.textContent = "Error";
            }
            break;

        default:
            // Remove placeholder 0 if it exists
            if (displayResult.textContent === "0") {
                displayResult.textContent = value;
            } else {
                displayResult.textContent += value;
            }
            break;
    }
}