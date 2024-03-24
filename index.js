const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const transaction = [
//   { id: 1, text: "Book", amount: -100 },
//   { id: 2, text: "Dinner", amount: -200 },
//   { id: 3, text: "Salary", amount: 10000 },
//   { id: 4, text: "Stock", amount: 2000 },
// ];

const localStorageTransaction = JSON.parse(
  localStorage.getItem("global_transaction")
);

let global_transaction =
  localStorageTransaction !== null ? localStorageTransaction : [];

//Add Transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateRandomID(),
      text: text.value,
      amount: +amount.value,
    };

    global_transaction.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

// Generate Random ID
function generateRandomID() {
  return Math.floor(Math.random() * 10000000);
}

//Add transaction to DOM List
function addTransactionDOM(global_transaction) {
  const sign = global_transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  //Add class based on value
  item.classList.add(global_transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${global_transaction.text} <span>${sign}${Math.abs(
    global_transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    global_transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

// Updates the Balance, income and expense
function updateValues() {
  const amounts = global_transaction.map((transactions) => transactions.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -(1).toFixed(2);

  balance.innerText = `₹${total}`;
  money_plus.innerHTML = `₹${income}`;
  money_minus.innerHTML = `₹${expense}`;
}

//Remove Trnasaction by ID
function removeTransaction(id) {
  global_transaction = global_transaction.filter(
    (transaction) => transaction.id !== id
  );

  updateLocalStorage();
  init();
}

//Update local Storage Transaction
function updateLocalStorage() {
  localStorage.setItem(
    "global_transaction",
    JSON.stringify(global_transaction)
  );
}
//Init app
function init() {
  list.innerHTML = "";

  global_transaction.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
