import { INumbers } from './main';

const compareArray = (goalNumbers:INumbers,myNumbers:INumbers) => {
    return goalNumbers.numbers.filter((x) => myNumbers.numbers.includes(x))
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

export default splitRanks