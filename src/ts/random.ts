const getRandomNumberArray = (index:number) => {
    let numberArray:number[] = []
    for(let i = 0; i < index; i++ ){
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