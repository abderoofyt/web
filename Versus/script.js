var players;
var tournamentData = []; // Store results of each round
var currentRound = 0;

function startTournament() {
     // Disable the start button
    
    players = document.getElementById('players').value.split('\n').filter(player => player.trim() !== '');

    if (players.length === 0 || (players.length & (players.length - 1)) !== 0) {
        alert('Please enter a valid number of players (a power of 2 greater than 0).');
        return;
    }

    shuffleArray(players);

    tournamentData.push({
        roundNumber: 1,
        matches: createMatches(players),
        winners: []
    });

    displayTournamentHistory();
}

function displayTournamentHistory() {
    var tournamentHistoryHTML = '';
    for (var i = tournamentData.length - 1; i >= 0; i--) {
        tournamentHistoryHTML += generateRoundHTML(tournamentData[i]);
    }
    document.getElementById('tournamentBracket').innerHTML = tournamentHistoryHTML;
}

function generateRoundHTML(roundData) {
    var roundHTML;
    var playersLeft = roundData.matches.length * 2;

    if (playersLeft === 2) {
        roundHTML = `<h2>Finals</h2>`;
    } else if (playersLeft === 4) {
        roundHTML = `<h2>Semi-Finals</h2>`;
    } else if (playersLeft === 8) {
        roundHTML = `<h2>Quarterfinals</h2>`;
    } else {
        roundHTML = `<h2>Round ${roundData.roundNumber}</h2>`;
    }

    roundData.matches.forEach((match, index) => {
        roundHTML += `<div class="match" id="match${index + 1}">
            <input type="text" placeholder="Score for ${match[0]}">
            <p>${match[0]}</p>
            <input type="text" placeholder="Score for ${match[1]}">
            <p>${match[1]}</p>
            <button class="common-btn" onclick="updateBracket(${index + 1}, ${roundData.roundNumber})">Update</button>
        </div>`;
    });
    return roundHTML;
}

function updateBracket(matchIndex) {
    var roundData = tournamentData[currentRound];
    var scoreInputs = document.querySelectorAll(`#match${matchIndex} input`);
    var score1 = parseInt(scoreInputs[0].value);
    var score2 = parseInt(scoreInputs[1].value);

    if (isNaN(score1) || isNaN(score2)) {
        alert('Please enter valid scores for both players.');
        return;
    }

    var matchWinner;

    if (score1 > score2) {
        matchWinner = roundData.matches[matchIndex - 1][0];
    } else {
        matchWinner = roundData.matches[matchIndex - 1][1];
    }

    roundData.winners.push(matchWinner);

    var nextMatchIndex = Math.ceil((matchIndex));
    document.getElementById(`match${nextMatchIndex}`).innerHTML += `<p>${matchWinner} advances to next round.</p>`;
    disableMatchInputs(matchIndex, score1, score2);

    if (roundData.winners.length === roundData.matches.length) {
        if (currentRound < tournamentData.length - 1) {
            currentRound++;
            displayCurrentRound();
        } else {
            if (roundData.winners.length === 1) {
                // Declare the winner as the champion
                var champion = roundData.winners[0];
                document.getElementById('tournamentBracket').insertAdjacentHTML('afterbegin', `</br><h2>Champion: ${champion}</h2></br>`);
            } else {
                startNextRound();
            }
        }
    }
}


function startNextRound() {
    currentRound++;
    tournamentData.push({
        roundNumber: currentRound + 1,
        matches: createMatches(tournamentData[currentRound - 1].winners),
        winners: []
    });
    displayTournamentHistory();
}

function createMatches(players) {
    var matches = [];
    for (var i = 0; i < players.length; i += 2) {
        matches.push([players[i], players[i + 1]]);
    }
    return matches;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function disableMatchInputs(matchIndex, score1, score2) {
    var inputs = document.querySelectorAll(`#match${matchIndex} input`);
    var button = document.querySelector(`#match${matchIndex} button`);

    inputs.forEach((input, index) => {
        input.disabled = true;
        input.setAttribute('data-value', input.value);
        if (index === 0) {
            input.value = score1;
        } else if (index === 1) {
            input.value = score2;
        }
    });

    button.disabled = true;
}
