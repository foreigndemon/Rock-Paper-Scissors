const gameRules = document.querySelector('.game-rules');
const closeBtn = document.querySelector('.close-btn');
const modelRules = document.querySelector('.model');

const choiceButtons = document.querySelectorAll('.choice-btn');
const gameWindow = document.querySelector('.game-window-one');
const resultsSection = document.querySelector('.game-result-one');
const resultsDivs = document.querySelectorAll('.result-result');

const resultWinner = document.querySelector('.results-winner');
const resultText = document.querySelector('.results-text'); 
const playAgainBtn = document.querySelector('.play-again');

const scoreCount = document.querySelector('.score-display-score');
let score = 0;

const CHOICES = [
    {
        name:'paper',
        beats:'rock'
    },
    {
        name:'scissors',
        beats:'paper'
    },
    {
        name:'rock',
        beats:'scissors'
    }
]

choiceButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find(choice => choice.name === choiceName);
        choose(choice)
    })
})

function choose(choice){
    const cpuchoice = cpuChoose();
    displayResults([choice,cpuchoice]);
    displayWinner([choice,cpuchoice]);
}

function cpuChoose(){
    const randomNumber = Math.floor(Math.random()*CHOICES.length);
    return CHOICES[randomNumber];
}

function displayResults(results){
    resultsDivs.forEach((resultsDiv,index) =>{
        setTimeout(()=>{
            resultsDiv.innerHTML = `
            <div class="choice ${results[index].name}">
                <img src="./assests/icon-${results[index].name}.svg" alt="${results[index].name}">
            </div>
            `;
        },index*700);
    })

    gameWindow.classList.toggle('hidden');
    resultsSection.classList.toggle('hidden');
}

function displayWinner(results){
    setTimeout(()=>{
        const userWins = isWinner(results);
        const cpuWins = isWinner(results.reverse());

        if(userWins){
            resultText.innerText = 'you win';
            resultsDivs[0].classList.toggle('winner');
            keepScore(1);
        }else if(cpuWins){
            resultText.innerHTML = 'you lose';
            resultsDivs[1].classList.toggle('winner');
            keepScore(-1);
        }else{
            resultText.innerHTML = 'draw';
            keepScore(0);
        }
        resultWinner.classList.toggle('hidden');
        resultsSection.classList.toggle('show-winner');
    },1500);
}

function isWinner(results){
    return results[0].beats === results[1].name;
}

function keepScore(point){
    score += point;
    scoreCount.innerText = score;
}

// show or hide the model game rules window
gameRules.addEventListener('click',()=>{
    modelRules.classList.toggle('show-model');
})

closeBtn.addEventListener('click',()=>{
    modelRules.classList.toggle('show-model');
})

// play again button
playAgainBtn.addEventListener('click',()=>{
    gameWindow.classList.toggle('hidden');
    resultsSection.classList.toggle('hidden');

    resultsDivs.forEach(resultsDiv => {
        resultsDiv.innerHTML = '';
        resultsDiv.classList.remove('winner');
    })
    resultText.innerText = '';
    resultWinner.classList.toggle('hidden');
    resultsSection.classList.toggle('show-winner');
})