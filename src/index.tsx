// const resultNumber = document.getElementsByClassName('js-resultNumber') as HTMLCollectionOf<HTMLElement>;
// const betNumber = document.getElementsByClassName('js-betNumber') as HTMLCollectionOf<HTMLElement>;
// const betButton = document.querySelector('.js-betBtn') as HTMLButtonElement;
// const speedButton = document.querySelector('.js-speed') as HTMLButtonElement;
// const resetButton = document.querySelector('.js-reset') as HTMLButtonElement;
// const rank = document.getElementsByClassName('js-rank') as HTMLCollectionOf<HTMLElement>;
// const money = document.querySelector('.js-money') as HTMLSpanElement;
// const inputBet = document.querySelector('.js-bet') as HTMLFormElement;
// const errorText = document.querySelector('.js-error') as HTMLSpanElement;
// const form = document.querySelector('.js-form') as HTMLFormElement;


// let getResult:number[] = [];
// let getBet:number[] = [];
// let getBonus:number[] = [];
// let fifth:number = 0;
// let fourth:number = 0;
// let third:number = 0;
// let second:number = 0;
// let first:number = 0;

// let lost:number = 0;
// let getMoney:number = 0;
// let betMoney:number = 0;
// let timeOutSpeed:number = 100;

// const reward = {
//     first:1952160000,
//     second:54226666,
//     third:1390427,
//     fourth:50000,
//     fifth:5000,
//     lost:-1000
// }


// function getRandom() {
//     const number = (Math.floor(Math.random() * 45))+1;
//     return number;
//   }

//   function paintBet(){
//     getBet = [];
//     let bet:string[] = [];

//     while(getBet.length < 6){
//     const randomNumber = getRandom()
//     if(!getBet.includes(randomNumber)){
//     getBet.push(randomNumber);
//     }
//     }
//     let sortedBet:number[] = getBet.sort(function(a, b)  {
//     return a - b;
//     })

//     for(let i  = 0; i < sortedBet.length; i++){
//         bet[i] = sortedBet[i].toString()
//     }
    
    
//     betNumber[0].innerHTML = bet[0]
//     betNumber[1].innerText = bet[1]
//     betNumber[2].innerText = bet[2]
//     betNumber[3].innerText = bet[3]
//     betNumber[4].innerText = bet[4]
//     betNumber[5].innerText = bet[5]

// }

// function paintResult(){
//     getResult = [];
//     let result:string[] = []
//     while(getResult.length < 6){
//     const randomNumber = getRandom()
//     if(!getResult.includes(randomNumber)){
//     getResult.push(randomNumber);
//     }
//     }
//     const sortedResult:number[] = getResult.sort(function(a, b)  {
//     return a - b;
//     })
//     for(let i = 0; i < sortedResult.length; i++){
//         result[i] = sortedResult[i].toString()
//     }
    
//     resultNumber[0].innerText = result[0]
//     resultNumber[1].innerText = result[1]
//     resultNumber[2].innerText = result[2]
//     resultNumber[3].innerText = result[3]
//     resultNumber[4].innerText = result[4]
//     resultNumber[5].innerText = result[5]

// }

// function paintBonus(){
//     getBonus = [];
//     let randomNumber = getRandom()
//     if(!getResult.includes(randomNumber)){
//         getBonus.push(randomNumber);
//     }else {
//         getBonus.push(randomNumber - 1);
//     }

//     resultNumber[6].innerText = getBonus[0].toString()
// }

// function numberWithCommas(x:number) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// function piantRank() {
//     const getRank = getResult.filter(f => getBet.includes(f))
//     const getMoneyCommas = numberWithCommas(getMoney);
//     if (getRank.length == 3) {
//         fifth += 1
//         getMoney += reward.fifth
//         rank[4].innerText = `5등 : ${fifth}`
//     }
//     else if (getRank.length == 4) {
//         fourth += 1
//         getMoney += reward.fourth
//         rank[3].innerText = `4등 : ${fourth}`
//     }
//     else if (getRank.length == 5) {
//         third += 1
//         getMoney += reward.third
//         rank[2].innerText = `3등 : ${third}`
//     }else if ((getRank.length == 5) && (getBet.includes(getBonus[0]))) {
//         second += 1
//         getMoney += reward.second
//         rank[1].innerText = `2등 : ${second}`
//     }else if (getRank.length == 6) {
//         first += 1
//         getMoney += reward.first
//         rank[0].innerText = `1등 : ${first}`
//     }else {
//         lost += 1
//         rank[5].innerText = `꽝 : ${lost}`
//     }
//     getMoney += reward.lost
//     money.innerText = `수익: ${getMoneyCommas}￦`
// } 

// function getTimeout(){
//     getRandom();
//     betMoney += 1
//     paintBet();
//     piantRank();
//     if(betMoney < inputBet.value){
//         setTimeout(getTimeout,timeOutSpeed);
//     }else{
//             betMoney = 0;
//     inputBet.value = '';
//     }
// }


// function handleBetButtonClick(){
//     if(inputBet.value == ''){
//         errorText.innerText = '금액을 입력하세요!'
//         inputBet.value = '';
//     }else if(inputBet.value < 1){
//         errorText.innerText = '정확한 금액을 입력하세요!'
//         inputBet.value = '';
//     }else {
//         paintResult();
//         paintBonus();
//         getTimeout();
//         errorText.innerText = '';
// }
// }

// function handleSubmit(event:Event){
//     event.preventDefault();
//     handleBetButtonClick();
// }
// function handleResetButtonClick(){
//     window.location.reload()
// }
// function handleSpeedButtonClick(){
//     if(timeOutSpeed == 100){
//         timeOutSpeed = 50;
//         speedButton.innerText = 'x4'
//     }else if(timeOutSpeed == 50){
//         timeOutSpeed = 25;
//         speedButton.innerText = 'x8'
//     }else if(timeOutSpeed == 25){
//         timeOutSpeed = 12.5;
//         speedButton.innerText = 'x16'
//     }else if(timeOutSpeed == 12.5){
//         timeOutSpeed = 6.25;
//         speedButton.innerText = 'x32'
//     }else if(timeOutSpeed == 6.25){
//         timeOutSpeed = 3.125;
//         speedButton.innerText = 'x1'
//     }else if(timeOutSpeed == 3.125){
//         timeOutSpeed = 100;
//         speedButton.innerText = 'x2'
//     }
// }

// betButton.addEventListener('click',handleBetButtonClick);
// speedButton.addEventListener('click',handleSpeedButtonClick);
// resetButton.addEventListener('click',handleResetButtonClick);
// form.addEventListener('submit',handleSubmit);
import react from 'react'
import ReactDom from 'react-dom'

import App from './App'

ReactDom.render(<App />,document.getElementById('root'))