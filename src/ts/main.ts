import randomNumberArray from './random'
import splitRanks from './split'
// import { createStore,StoreCreator } from '../../node_modules/redux/index'


const button = document.querySelector(".ticket") as HTMLButtonElement
const revenue = document.querySelector(".revenue__number") as HTMLSpanElement
const numbersLayout = document.querySelector(".numbers") as HTMLDivElement
const numbersResult = document.querySelector(".numbers__result") as HTMLDivElement

export interface INumbers {
    numbers:number[]
    bonus?: number 
}
export interface INumberLog {
    goal?: INumbers;
    user: INumbers[];
    
}

// const FIRST_RANK = "FIRST_RANK"
// const SECOND_RANK = "SECOND_RANK"
// const THIRD_RANK = "THIRD_RANK"
// const FOURTH_RANK = "FOURTH_RANK"
// const FIFTH_RANK = "FIFTH_RANK"

const rewardObj = {
    reward:{
        first:1952160000,
        second:54226000,
        third:1390000,
        fourth:50000,
        fifth:5000,
        lost:-1000
    },
    score:{
        first:0,
        second:0,
        third:0,
        fourth:0,
        fifth:0,
        lost:0
    }
}

const numberLog:INumberLog = {
    user:[]
} 

// const initialState = {
//     score:{
//         first:0,
//         second:0,
//         third:0,
//         fourth:0,
//         fifth:0,
//         lost:0
//     },
//     log:{
//         user:[],
//         goal:[]
//     }

// }

// const reducer = (state = initialState, action:any) => {
//     switch (action.type) {

//       default:
//         return state;
//     }
//   };
  
//   const store:StoreCreator = createStore(reducer);

const seperateBonus = (index:number) => {
    let random = randomNumberArray(index)
    if(index === 7) {
        return {
            numbers: random,
            bonus: random.pop()
        }
    }else{
        return {
            numbers: random
        }
    }
}

const addScore = () => {
    const goal = seperateBonus(7)
    numberLog.goal = goal
    let newUserNumbers = []
    for(let i = 0; i < 5; i ++){
        const numbers = seperateBonus(6)
        newUserNumbers.push(numbers)
        switch(splitRanks(goal,numbers)){
            case 1:
            rewardObj.score.first++
            break;
            case 2:
            rewardObj.score.second++
            break;
            case 3:
            rewardObj.score.third++
            break;
            case 4:
            rewardObj.score.fourth++
            break;
            case 5:
            rewardObj.score.fifth++
            break;
            default:
            rewardObj.score.lost++
            break;
        }
    }
    numberLog.user = newUserNumbers
}

const createNumberDiv = (index:number, array:number[],elem:HTMLDivElement) => {
    const numberDiv = document.createElement('div')
    numberDiv.classList.add('number-board__number')
    numberDiv.innerText = JSON.stringify(array[index])
    if(index === 6){
        numberDiv.classList.add('number-board__number--bonus')
    }
    elem.appendChild(numberDiv)
}

const createBoard = (array:number[]) => {
    const board = document.createElement('div')
    if(array.length === 7){
        board.classList.add('number-board--goal')
    }else {
        board.classList.add('number-board--user')
    }
    for(let i = 0; i < array.length; i ++){
        createNumberDiv(i,array,board)
    }
    return board
}

const sortArray = (array:INumbers) => {
    let sort = array.numbers.sort((a:number,b:number) => a-b )
    if(array.bonus){
        sort.push(array.bonus)
    }
    return sort
}

const paintResult = (i: number,elem:HTMLDivElement) => {
    if(numberLog.goal === undefined){
        return null;
    }
    let userNumbers = numberLog.user[i]
    elem.appendChild(createBoard(sortArray(userNumbers)))
    const rank = splitRanks(numberLog.goal,userNumbers)
    switch(rank){
        case 1:
            numbersResult.innerText = '1등'
            break;
        case 2:
            numbersResult.innerText = '2등'
            break;
        case 3:
            numbersResult.innerText = '3등'
            break;
        case 4:
            numbersResult.innerText = '4등'
            break;
        case 5:
            numbersResult.innerText = '5등'
            break;
        default:
            numbersResult.innerText = '꽝'
            break;
    }
}

const paintBoard = () => {
    if(numberLog.goal === undefined){
        return null;
    }
    numbersResult.innerText = ''
    const newNumbersDiv = document.createElement('div')
    newNumbersDiv.classList.add("numbers--current")
    numbersLayout.replaceChildren(newNumbersDiv)
    newNumbersDiv.appendChild(createBoard(sortArray(numberLog.goal)))
    for(let i = 0 ; i < 5 ; i ++){
        setTimeout(() => paintResult(i,newNumbersDiv), (i+1) * 1000)
    }
}


button.addEventListener('click',() => {
    addScore()
    paintBoard()
})