// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = '';
   word = input.question("Let's play some scrabble! Enter a word: ");
   return word;

};



let simpleScorer = function(word) {
   word = word.toUpperCase()
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {

			letterPoints += 1
		 
	  }
	
	return letterPoints;
 }

let vowelBonusScorer = function(word) {
	word = word.toUpperCase( );
   wordSplitUp = word.split('');
	let letterPoints = 0;
 
	for (let i = 0; i < wordSplitUp.length; i++) {

   if ( wordSplitUp[i] === "A" || wordSplitUp[i] === "E" || wordSplitUp[i] === "I" || wordSplitUp[i] === "O" || wordSplitUp[i] === "U" || wordSplitUp[i] === "Y"){
         letterPoints += 3
      } else {
         letterPoints += 1
      }
      
   }
	return letterPoints;
 }



function scrabbleScorer(word) { 
   
   word = word.toUpperCase();
   letterPoints = 0;

   for (let i = 0; i < word.length; i++) {

      // if (newPointStructure[pointValue].includes(word[i])) {
      letterPoints += newPointStructure[word[i]];
    }

return letterPoints;
};



const scoringAlgorithms = [

   {
   description:"Each letter is worth 1 point.",
   name: "Simple Score",
   scorerFunction: simpleScorer
},

   {
   description: "Vowels are 3 pts, consonants are 1 pt.",
   name: "Bonus Vowels",
   scorerFunction: vowelBonusScorer
},

{
   description: "The traditional scoring algorithm.",
   name: "Scrabble",
   scorerFunction: scrabbleScorer
}

];

// Finish writing scorerPrompt() so that the user can select which scoring algorithm to use when the program scores their word. 
// Use the selected algorithm to determine the score for the word:

//     If the user enters 0, have the program output a score using the simple scorer.
//     If the user enters 1, use the vowel bonus scoring function.
//     If the user enters 2, use the Scrabble scoring option.

// scorerPrompt() should return the object the user has selected.

function scorerPrompt() {

   console.log('Which scoring algorithm would you like to use?');

   // console.log (`0 - Simple: One point per character
   // 1 - Vowel Bonus: Vowels are worth 3 points
   // 2 - Scrabble: Uses scrabble point system `);
   for (let i = 0 ; i< scoringAlgorithms.length; i++){
      let option = scoringAlgorithms[i];
      console.log(i + "-" + option["name"]+ ": "+ option["description"]);
   }

   let choice = Number(input.question("Enter 0, 1 or 2: "));

   // console.log(`Score for '${word}': ${scoringAlgorithms[prompt].scorerFunction(word)}`);
   return scoringAlgorithms[choice];
}




function transform(pointStr) {

   let newPointStruct = {};
      for (let key in pointStr) {
         let letterItem = pointStr[key];
         for (let i = 0; i < letterItem.length; i++){
            //  let letterItem = words[key][i];
            //  letterItem = letterItem.toLowerCase();
            newPointStruct[letterItem[i].toUpperCase()] = Number(key);
    }
  }
  return newPointStruct;

};


let newPointStructure = transform(oldPointStructure);

function runProgram() {
let word = initialPrompt();
let scorer = scorerPrompt().scorerFunction;
let score = scorer(word);
console.log(`Score for ${word}: ${score}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
