
const BASE_URL = "https://v6.exchangerate-api.com/v6/8436a2f64d035d682656529d/latest/USD";

//  for(code in countryList) {           INDIA:-INR  (Currency Code)
//     console.log(code,countryList(code));   INDIA:- IN(Country code)
//  }  currcode:-> currency code
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns) {
  for(currCode in countryList) {
    let newOption=document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    if(select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
//  Step:-> 2 | when our document is get loaded first time then it show the converted value into another//
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
let amtVal = amount.value;  // printing the value amount//
if (amtVal === "" || amtVal < 1){
  amtVal = 1;
  amount.value ="1";
}
// console.log(fromCurr.value ,toCurr.value);
const URL= `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();
let exchangeRate = data[toCurr.value.toLowerCase()];
//console.log(exchangeRate);
let finalAmount = amtVal * exchangeRate;
msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`; //1USD = 80INR//
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}; 

btn.addEventListener("click" , async (evt) => {
  evt.preventDefault();   // use to stop all changes what will occur but submitting the document//
   updateExchangeRate();
});

// Step:-> 1 | when our document is get loaded first time then it show the converted value into another//

//document.addEventListener("load", () => { document:-> window because we have to add on the window//
  window.addEventListener("load", () => {
  updateExchangeRate();
 });
 





