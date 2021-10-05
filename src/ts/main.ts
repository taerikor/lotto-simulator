import randomNumberArray from './random'
// const selectIndex = (totalIndex:number, selectingNumber:number) => {
//     let randomIndexArray = []
//     for (let i=0; i<selectingNumber; i++) {   //check if there is any duplicate index
//       let randomNum = Math.floor(Math.random() * totalIndex)
//       if (randomIndexArray.indexOf(randomNum) === -1) {
//         randomIndexArray.push(randomNum)
//       } else { //if the randomNum is already in the array retry
//         i--
//       }
//     }
//     return randomIndexArray
//   }
//   console.log(selectIndex(45,6))
console.log(randomNumberArray())