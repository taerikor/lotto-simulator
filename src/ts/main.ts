import randomNumberArray from './random'
import splitRanks from './split'


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

const sortArray = (array:INumbers) => {
    let newArray = [...array.numbers]
    newArray.sort((a:number,b:number) => a-b )
    if(array.bonus){
        newArray.push(array.bonus)
    }
    return newArray
}

const paintRank = () => {
    const first = document.querySelector(".content__number--first") as HTMLSpanElement
    first.innerHTML =rewardObj.score.first.toString()
    const second = document.querySelector(".content__number--second") as HTMLSpanElement
    second.innerHTML =rewardObj.score.second.toString()
    const third = document.querySelector(".content__number--third") as HTMLSpanElement
    third.innerHTML =rewardObj.score.third.toString()
    const fourth = document.querySelector(".content__number--fourth") as HTMLSpanElement
    fourth.innerHTML =rewardObj.score.fourth.toString()
    const fifth = document.querySelector(".content__number--fifth") as HTMLSpanElement
    fifth.innerHTML =rewardObj.score.fifth.toString()
    const lost = document.querySelector(".content__number--lost") as HTMLSpanElement
    lost.innerHTML =rewardObj.score.lost.toString()
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
    paintRank()
}

const paintBoard = () => {
    if(numberLog.goal === undefined){
        return null;
    }
    numbersResult.innerText = ''
    const newNumbersDiv = document.createElement('div')
    newNumbersDiv.classList.add("numbers--current")
    numbersLayout.replaceChildren(newNumbersDiv)
    console.log(numberLog.goal.numbers)
    newNumbersDiv.appendChild(createBoard(sortArray(numberLog.goal)))
    for(let i = 0 ; i < 5 ; i ++){
        setTimeout(() => paintResult(i,newNumbersDiv), (i+1) * 1000)
    }
    paintRank()
}

button.addEventListener('click',() => {

    addScore()
    paintBoard()
})