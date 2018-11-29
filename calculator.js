//USE SWITCH TO HANDLE VARIOUS CASES OFMPOSSIBLE SITUATIONS- LIKE IF 'C' IS PRESSED OR = E.T.C.
//NULL IS DIFFERENT FROM ZERO. NULL IS SAYING THAT NOTHING HAS BEEN ASSIGNED
let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector('.screen');

document.querySelector('.calc-buttons').addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
})

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value) {
 if (buffer === "0") {
     buffer = value;
 } else {
     buffer += value;
 }
 
}

function handleSymbol(value) {
    switch(value) {
        case "C":
            buffer = "0";
            runningTotal =0;
            previousOperator = null;
            break;
        case "=" :
            if (previousOperator === null) {
                return ;
            }
            //perform a flushoperation, take that buffer, convert to an integer and pass into flushoperation.
            flushOpearation(parseInt(buffer));
            previousOperator = null;
            buffer = " " + runningTotal;
            runningTotal = 0;
            break;
        case "/" :
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substr(0, buffer.length-1);
            }
            break;
        default:
            handleMath(value);
            break;
    }

}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOpearation(intBuffer);
    }

    previousOperator = value;
//buffer is assigned o because we are ready for the new number to come in after the operator has been selected. so this is how handlemath does its work
    buffer = "0";
}

function flushOpearation (intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "✕") {
        runningTotal *= intBuffer;
    } else if (previousOperator === "⎼") {
        runningTotal -= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}
function rerender() {
    screen.innerText = buffer;
}