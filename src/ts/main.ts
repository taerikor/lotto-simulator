import randomNumberArray from './random'
import splitRanks from './split'


const button = document.querySelector(".ticket") as HTMLButtonElement
const revenue = document.querySelector(".revenue__number") as HTMLSpanElement
const numbersLayout = document.querySelector(".numbers") as HTMLDivElement
const numbersResult = document.querySelector(".numbers__result") as HTMLDivElement
const rankBoard = document.querySelector(".rank-board") as HTMLDivElement
const revenueLayout = document.querySelector(".revenue") as HTMLDivElement

const HIDDEN_CN = 'hidden'

export interface INumbers {
    numbers:number[]
    bonus?: number 
}
export interface INumberLog {
    goal?: INumbers;
    user: INumbers[];
}

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
    if(array.length === 6) {
        const compareNumber = numberLog.goal?.numbers.includes(array[index])
        if(compareNumber){
            numberDiv.classList.add('number-board__number--hit')
        }
    }
    elem.appendChild(numberDiv)
}

const createBoard = (array:number[]) => {
    const board = document.createElement('div')
    board.classList.add('number-board')
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

const paintRevenue = () => {
    const calculateReward = ():string => {
        let first = rewardObj.score.first * rewardObj.reward.first
        let second = rewardObj.score.second * rewardObj.reward.second
        let third = rewardObj.score.third * rewardObj.reward.third
        let fourth = rewardObj.score.fourth * rewardObj.reward.fourth
        let fifth = rewardObj.score.fifth * rewardObj.reward.fifth
        let lost = rewardObj.score.lost * rewardObj.reward.lost

        return `${first + second + third + fourth + fifth + lost}`
    }
    revenue.innerText = `${calculateReward()} 원`
}
const sortArray = (array:INumbers) => {
    let newArray = [...array.numbers]
    newArray.sort((a:number,b:number) => a-b )
    if(array.bonus){
        newArray.push(array.bonus)
    }
    return newArray
}

const paintRank = () => {
    const rankText = document.querySelector(".rank__content") as HTMLSpanElement
    rankText.innerText = `
    1등 : ${rewardObj.score.first}
    2등 : ${rewardObj.score.second}
    3등 : ${rewardObj.score.third}
    4등 : ${rewardObj.score.fourth}
    5등 : ${rewardObj.score.fifth}
    꽝 : ${rewardObj.score.lost}
    `
}

const paintResult = (i: number,elem:HTMLDivElement) => {
    if(numberLog.goal === undefined){
        return null;
    }
    let userNumbers = numberLog.user[i]
    const board = createBoard(sortArray(userNumbers))
    elem.appendChild(board)
    const rank = splitRanks(numberLog.goal,numberLog.user[i])
    switch(rank){
        case 1:
            numbersResult.innerText = '1등'
            board.classList.add('number-board--first')
            break;
        case 2:
            numbersResult.innerText = '2등'
            board.classList.add('number-board--second')
            break;
        case 3:
            numbersResult.innerText = '3등'
            board.classList.add('number-board--third')
            break;
        case 4:
            numbersResult.innerText = '4등'
            board.classList.add('number-board--fourth')
            break;
        case 5:
            numbersResult.innerText = '5등'
            board.classList.add('number-board--fifth')
            break;
        default:
            numbersResult.innerText = '꽝'
            break;
    }
    if(i === 4){
        toggleBoard()
        button.classList.toggle(HIDDEN_CN)
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

const toggleBoard = () => {
    revenueLayout.classList.toggle(HIDDEN_CN)
    rankBoard.classList.toggle(HIDDEN_CN)
}

button.addEventListener('click',() => {
    if(revenueLayout.className !== 'revenue hidden'){
        toggleBoard()
    }
    button.classList.toggle(HIDDEN_CN)
    addScore()
    paintBoard()
    paintRank()
    paintRevenue()
})