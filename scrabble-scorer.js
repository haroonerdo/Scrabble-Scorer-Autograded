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
let newWord="";
function initialPrompt() {
    newWord = input.question("Let's play some scrabble! Enter a word: ");
   // console.log(oldScrabbleScorer(wordTest));
   // console.log(simpleScorer(wordTest));
   // console.log(vowelBonusScorer(wordTest));
};

let simpleScorer = function (word) {
   word = word.toUpperCase();
   let wordPoint=0;
wordPoint+=Number(word.length);
//    for (let i = 0; i < word.length; i++) {
//       wordPoint += 1;
//    }
  return wordPoint;
};

let vowelBonusScorer = function (word) {
   const vowels = ['A', 'E', 'I', 'O', 'U'];
   word = word.toUpperCase();
   let wordPoint=0;

   for (let i = 0; i < word.length; i++) {

      if (vowels.includes(word[i])) {
         wordPoint += 3;
      } else {
         wordPoint += 1;
      }
   }
   return wordPoint;
};

let scrabbleScorer = function (word) {
   word = word.toLowerCase();
	let wordPoint = 0;
 
   
	for (let i = 0; i < word.length; i++) {
      if (word[i] in newPointStructure) {
         wordPoint += newPointStructure[word[i]];
      }
	}
	return wordPoint;
};

const scoringAlgorithms = [{
   Name: 'Simple Score',
   Description: 'Each letter is worth 1 point.',
   scorerFunction: simpleScorer
 },
 {
   Name: 'Bonus Vowels',
   Description: 'Vowels are 3 pts, consonants are 1 pt.',
   scorerFunction: vowelBonusScorer
 },
 {
   Name: 'Scrabble',
   Description: 'The traditional scoring algorithm.',
   scorerFunction: scrabbleScorer
 }
];

const scorerFunctionArr=[simpleScorer, vowelBonusScorer, scrabbleScorer]

function scorerPrompt() {
let wordPoint=0;
let letterPoints="";

// let newWord=input.question("\nLet's play some scrabble!\n\nEnter a word to score: ");
console.log("Which scoring algorithm would you like to use?\n");
console.log("0 - Simple: One point per character");
console.log("1 - Vowel Bonus: Vowels are worth 3 points");
console.log("2 - Scrabble: Uses scrabble point system");

const selectNumber = input.question("Enter 0, 1, or 2: ");


if (selectNumber >= 0 && selectNumber <= 2) {
   //console.log(scoringAlgorithms[selectNumber]);
   wordPoint += (scorerFunctionArr[selectNumber](newWord));
   letterPoints=`Score for \'${newWord}\' : ${wordPoint}`;
   return console.log(letterPoints);
} else {
   console.log("Invalid input. Please enter a number between 0 and 2.");
   return scorerPrompt();
}
}

function transform() {
   const newPointStructure = {};
for (const [points, letters] of Object.entries(oldPointStructure)) {
   for (const letter of letters) {
     newPointStructure[letter.toLowerCase()] = Number(points);
   }
 } 
 //console.log(newPointStructure); 
 return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);


function runProgram() {
   initialPrompt();
   scorerPrompt();
   transform();
}
// console.log("Scrabble scoring values for");
// console.log("Letter a: ",newPointStructure.a);
// console.log("Letter j: ",newPointStructure.j);
// console.log("Letter z: ",newPointStructure["z"]);
//console.log("Scrabble scoring values for\nLetter a: ",newPointStructure.a,
// "\nLetter j: ",newPointStructure.j,
// "\nLetter z: ",newPointStructure["z"]);

// console.log("Letters with score '4':",oldPointStructure['4']);
// console.log("3rd letter within the key '4' array:",oldPointStructure['4'][2]);

// let letters = oldPointStructure['8'];
// console.log("Letters with score '8':",letters);
// console.log("2nd letter within the key '8' array:",letters[1]);


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