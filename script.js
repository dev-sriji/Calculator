document.addEventListener("DOMContentLoaded", function () {
  const inputBox = document.getElementById("input");
  let expression = "";
  let result = "";

  function actionRecv(id, action) {
    if (
      (expression.endsWith("/") ||
        expression.endsWith("%") ||
        expression.endsWith("*") ||
        expression.endsWith("-") ||
        expression.endsWith("+")) &&
      action === "op"
    ) {
      if (id === "+" || id === "-" || id === ".") {
        expression += id;
      } else {
        console.log(expression)
        expression = expression.slice(0, -1) + id ;
      }
    } else if (action === "op" && result !== "" && expression === "") {
      expression = result + id;
    } else if (expression === "" && action === "op") {
      if (!(id === "+" || id === "-" || id === ".")) {
        expression = "Type Any Number Before The Operator";
      } else {
        expression += id;
      }
      setTimeout(() => {
        expression = "";
        updateDisp(expression);
      }, 1000);
    } else {
      expression += id;
    }
  }
  function clearQ() {
    if (expression) {
      expression = "Clearing";
      setTimeout(() => {
        expression = "Clearing.";
        updateDisp(expression);
        setTimeout(() => {
          expression = "Clearing..";
          updateDisp(expression);
          setTimeout(() => {
            expression = "Clearing...";
            updateDisp(expression);
            setTimeout(() => {
              expression = "";
              updateDisp(expression);
            }, 250);
          }, 200);
        }, 150);
      }, 100);
    } else {
      result = "";
      updateDisp("", result);
    }
  }
  function backspace() {
    expression = expression.slice(0, -1);
    updateDisp(expression);
  }
  function equalTo() {
    const ans = eval(expression);
    result =
      isNaN(ans) || !isFinite(ans)
        ? "Syntax Error"
        : ans < 1
        ? parseFloat(ans.toFixed(10))
        : parseFloat(ans.toFixed(4));
    expression = "";
    updateDisp(expression, result);
  }

  function buttonClick(event) {
    const action = event.target.dataset.use;
    const id = event.target.dataset.id;

    switch (action) {
      case "number":
      case "op":
      case "dot":
        actionRecv(id, action);
        break;
      case "clear":
        clearQ();
        break;
      case "backspace":
        backspace();
        break;
      case "equalto":
        equalTo();
        break;
    }
    updateDisp(expression, result);
  }

  inputBox.addEventListener("click", buttonClick);
});

function updateDisp(expression, result) {
  if (expression !== null) {
    document.getElementById("expression").textContent = expression
      .replace(/\*/g, "x")
      .replace(/\//g, "÷");
  }
  if (result !== null) {
    document.getElementById("result").textContent = result;
  }
}
