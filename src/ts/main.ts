import randomNumberArray from './random'

// console.log(randomNumberArray().sort((a:number,b:number) => a-b ))

interface INumbers {
    numbers:number[]
    bonus?: number 
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

const compareArray = (goalNumbers:INumbers,myNumbers:INumbers) => {
    const compare = goalNumbers.numbers.filter((x) => myNumbers.numbers.includes(x))
    if(goalNumbers.bonus === undefined){
        return null;
    }
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

const run = () => {
    const goal = seperateBonus(7)
    for(let i = 0; i < 5; i ++){
        console.log(compareArray(goal,seperateBonus(6)))
    }
}
run()
