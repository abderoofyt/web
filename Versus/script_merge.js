var players; // Declare players variable outside startTournament function
var round1Matches;
var semiFinalsMatches;
var updatedMatches = 0; // Counter for updated matches in round 1
var updatedSemiFinals = 0; // Counter for updated semi-final matches

function startTournament() {
    players = document.getElementById('players').value.split('\n').filter(player => player.trim() !== '');

    if (players.length !== 8) {
        alert('Please enter exactly 8 players.');
        return;
    }

    shuffleArray(players);

    round1Matches = createMatches(players);
    var round1HTML = '<h2>Round 1</h2>';
    round1Matches.forEach((match, index) => {
        round1HTML += `<div class="match" id="match${index + 1}">
            <input type="text" placeholder="Score for ${match[0]}">
            <p>${match[0]}</p>
            <input type="text" placeholder="Score for ${match[1]}">
            <p>${match[1]}</p>
            <button onclick="updateBracket(${index + 1})">Update</button>
        </div>`;
    });

    document.getElementById('tournamentBracket').innerHTML = round1HTML;
}

function updateBracket(matchIndex) {
    var scoreInputs = document.querySelectorAll(`#match${matchIndex} input`);
    var score1 = parseInt(scoreInputs[0].value);
    var score2 = parseInt(scoreInputs[1].value);

    if (isNaN(score1) || isNaN(score2)) {
        alert('Please enter valid scores for both players.');
        return;
    }

    var matchWinner;

    if (score1 > score2) {
        matchWinner = players[(matchIndex - 1) * 2];
    } else {
        matchWinner = players[(matchIndex - 1) * 2 + 1];
    }

    var nextMatchIndex = Math.ceil((matchIndex));
    document.getElementById(`match${nextMatchIndex}`).innerHTML += `<p>${matchWinner} advances to next round.</p>`;
    disableMatchInputs(matchIndex, score1, score2); // Disable input fields and button after entering scores

    // Increment the counter for updated matches
    updatedMatches++;

    // Check if all round 1 scores are captured
    if (updatedMatches === 4) {
        // Start semi-finals
        var winners = players.filter((_, index) => index % 2 === 0);
        shuffleArray(winners);
        semiFinalsMatches = createMatches(winners);
        var semiFinalsHTML = '<h2>Semi-Finals</h2>';
        semiFinalsMatches.forEach((match, index) => {
            semiFinalsHTML += `<div class="match" id="semifinalMatch${index + 1}">
                <input type="text" placeholder="Score for ${match[0]}">
                <p>${match[0]}</p>
                <input type="text" placeholder="Score for ${match[1]}">
                <p>${match[1]}</p>
                <button onclick="updateSemiFinalBracket(${index + 1})">Update</button>
            </div>`;
        });
        document.getElementById('tournamentBracket').innerHTML += semiFinalsHTML;
    }
}


// Initialize winners array outside the function
var winners = [];

// Function to update semi-final match results
function updateSemiFinalBracket(matchIndex) {
    var scoreInputs = document.querySelectorAll(`#semifinalMatch${matchIndex} input`);
    var score1 = parseInt(scoreInputs[0].value);
    var score2 = parseInt(scoreInputs[1].value);

    if (isNaN(score1) || isNaN(score2)) {
        alert('Please enter valid scores for both players.');
        return;
    }

    var matchWinner;

    if (score1 > score2) {
        matchWinner = semiFinalsMatches[matchIndex - 1][0];
    } else {
        matchWinner = semiFinalsMatches[matchIndex - 1][1];
    }

    winners.push(matchWinner); // Store the winner in the global winners array

    // Display the advancing player
    var nextMatchElement = document.getElementById(`semifinalMatch${matchIndex}`);
    if (nextMatchElement) {
        nextMatchElement.innerHTML += `<p>${matchWinner} advances to finals.</p>`;
        disableSemiFinalMatchInputs(matchIndex); // Disable input fields and button after entering scores
    } else {
        alert('Error: Could not find next semi-final match element.');
    }

    // Increment the counter for updated semi-final matches
    updatedSemiFinals++;

    // Check if all semi-finals scores are captured
    if (updatedSemiFinals === 2) {
        // Start finals
        var finalsHTML = '<h2>Finals</h2>';
        finalsHTML += `<div class="match" id="finalMatch1">
            <input type="text" placeholder="Score for ${winners[0]}">
            <input type="text" placeholder="Score for ${winners[1]}">
            <button onclick="updateFinalBracket()">Update</button>
        </div>`;
        document.getElementById('tournamentBracket').innerHTML += finalsHTML;
    }
}


function updateFinalBracket() {
    var scoreInputs = document.querySelectorAll(`#finalMatch1 input`);
    var score1 = parseInt(scoreInputs[0].value);
    var score2 = parseInt(scoreInputs[1].value);

    if (isNaN(score1) || isNaN(score2)) {
        alert('Please enter valid scores for both players.');
        return;
    }

    var winners = players.filter((_, index) => index % 2 === 0);
    var matchWinner;

    if (score1 > score2) {
        matchWinner = semiFinalsMatches[0][0];
    } else {
        matchWinner = semiFinalsMatches[0][1];
    }

    document.getElementById('tournamentBracket').innerHTML += `<h2>Champion: ${matchWinner}</h2>`;

    // Disable input fields and update button
    scoreInputs[0].disabled = true;
    scoreInputs[1].disabled = true;
    var updateButton = document.querySelector(`#finalMatch1 button`);
    updateButton.disabled = true;
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
        input.setAttribute('data-value', input.value); // Store the value as a data attribute
        if (index === 0) {
            input.value = score1; // Set the value of the first input to score1
        } else if (index === 1) {
            input.value = score2; // Set the value of the second input to score2
        }
    });

    button.disabled = true;
}


function disableSemiFinalMatchInputs(matchIndex, score1, score2) {
    var inputs = document.querySelectorAll(`#semifinalMatch${matchIndex} input`);
    var button = document.querySelector(`#semifinalMatch${matchIndex} button`);

    inputs.forEach((input, index) => {
        input.disabled = true;
        input.setAttribute('data-value', input.value); // Store the value as a data attribute
        if (index === 0) {
            input.value = score1; // Set the value of the first input to score1
        } else if (index === 1) {
            input.value = score2; // Set the value of the second input to score2
        }
    });

    button.disabled = true;
}


// Update the winners array with the advancing player
winners.push(matchWinner);

// Display the advancing player
var nextMatchElement = document.getElementById(`semifinalMatch${matchIndex}`);
if (nextMatchElement) {
    nextMatchElement.innerHTML += `<p>${matchWinner} advances to finals.</p>`;
    disableSemiFinalMatchInputs(matchIndex); // Disable input fields and button after entering scores
    document.querySelector(`#semifinalMatch${matchIndex} button`).disabled = true; // Disable the button
} else {
    alert('Error: Could not find next semi-final match element.');
}