const input = document.querySelector('input')
const output = document.querySelector('output')
const span = document.querySelector('span')

const words = [
    "programming",
    "javascript",
    "database"
]

let randomized_word = ''
let masked_word = ''
let num_of_guesses = 0

const new_Game = () => {
    num_of_guesses = 0
    const random = Math.floor(Math.random() * 2) + 1
    randomized_word = words[random]
    masked_word = "*".repeat(randomized_word.length)
    console.log(randomized_word)
    output.innerHTML = masked_word
    num_of_guesses = 0
}

const replaceFoundChars = (guess) => {
    for (let i = 0; i<randomized_word.length;i++){
        const char = randomized_word.substring(i,i+1)
        if (char === guess) {
            let newString = masked_word.split('')
            newString.splice(i,1,guess)
            newString = newString.join('')
            masked_word = newString
        }
    }
    output.innerHTML = masked_word
}

const win = () => {
    alert(`You have guessed right, the word is ${randomized_word}. It took you ${num_of_guesses} guesses.` )
    new_Game()
}

new_Game()

input.addEventListener('keypress', (e) =>{
    if (e.key === 'Enter') {
        e.preventDefault()
        num_of_guesses++
        const guess = input.value
        if (guess.toLowerCase() === randomized_word.toLowerCase()) {
            win()
        } else if (guess.length === 1) {
            replaceFoundChars(guess)
            if (masked_word.toLocaleLowerCase() === randomized_word.toLocaleLowerCase()){
                win()
            }
        } else {
            alert("You guessed wrong!")
        }
        input.value = ''
        document.querySelector('#num_guesses').innerHTML = String(num_of_guesses)
    }
})