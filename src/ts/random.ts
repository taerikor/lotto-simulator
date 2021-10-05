const getRandomNumberArray = () => {
    let numberArray:number[] = []
    for(let i = 0; i < 6; i++ ){
       const randomNumber = Math.floor(Math.random()* 45 + 1)
        if(numberArray.indexOf(randomNumber) === -1){
            numberArray.push(randomNumber)
        }else{
            i--
        }
   }
   return numberArray
}

export default getRandomNumberArray