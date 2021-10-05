import randomNumberArray from './random'
// import { createStore,StoreCreator } from '../../node_modules/redux/index'


const button = document.querySelector(".ticket") as HTMLButtonElement

interface INumbers {
    numbers:number[]
    bonus?: number 
}
interface INumberLog {
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

const splitRanks = (goalNumbers:INumbers,myNumbers:INumbers) => {
    if(goalNumbers.bonus === undefined){
        return null;
    }
    const compare = compareArray(goalNumbers,myNumbers)
    switch(compare.length){
        case 6:
            return 1
        case 5:
            return myNumbers.numbers.includes(goalNumbers.bonus) ? 2 : 3
        case 4:
            return 4
        case 3:
            return 5
        default:
            return 6
    }
}

const compareArray = (goalNumbers:INumbers,myNumbers:INumbers) => {
    return goalNumbers.numbers.filter((x) => myNumbers.numbers.includes(x))
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
    const layout = document.createElement('div')
    layout.classList.add('number-board')
    for(let i = 0; i < array.length; i ++){
        createNumberDiv(i,array,layout)
    }
    return layout
}

const sortArray = (array:INumbers) => {
    let sort = array.numbers.sort((a:number,b:number) => a-b )
    if(array.bonus){
        sort.push(array.bonus)
    }
    return sort
}

const paintBoard = () => {

}


button.addEventListener('click',() => {
    addScore()
    if(numberLog.goal === undefined){
        return null;
    }
    console.log(createBoard(sortArray(numberLog.user[0])))
})