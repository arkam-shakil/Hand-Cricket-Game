var battingOrBalling = "balling";
var totalRunScoredByUser = 0;
var totalRunScoredByComputer = 0;
var firstHalfOrSecondHalf = 0;


function UserPreferenceOfBallOrBatFirst(pref)
{
	battingOrBalling = pref;
	document.getElementById("toss-page").setAttribute("style", "display: none;");
	document.getElementById("main-page").removeAttribute("style");
	document.getElementById("score").focus();
			document.getElementById("live-announcement").setAttribute("role", "alert");
			document.getElementById("live-announcement").innerHTML = "You are " + battingOrBalling + " now!";
}



function submitValue(event)
{
	decidingForBattingOrBalling(event);
	if (firstHalfOrSecondHalf == 1)
	{
		document.getElementById("next").removeAttribute("disabled");
		if (battingOrBalling == "balling")
		{
			document.getElementById("target-value").innerHTML = "TargetValue: " + (totalRunScoredByUser1 + 1);
		}
		else {
			document.getElementById("target-value").innerHTML = "TargetValue: " + (totalRunScoredByComputer + 1);
		}
	}
	else if (firstHalfOrSecondHalf == 2)
	{
		if (totalRunScoredByUser === totalRunScoredByComputer)
		{
			document.getElementById("match-result").innerHTML = "Match is tie.";
			document.querySelector("#score").setAttribute("disabled", "true");
			document.getElementById("match-result").focus();
			document.getElementById("new-game").removeAttribute("style");
		}
		else if (totalRunScoredByUser > totalRunScoredByComputer)
		{
			document.getElementById("match-result").innerHTML = "You won the match.";
			document.querySelector("#score").setAttribute("disabled", "true");
			document.getElementById("match-result").focus();
			document.getElementById("new-game").removeAttribute("style");
		}
		else if (totalRunScoredByUser < totalRunScoredByComputer)
		{
			document.getElementById("match-result").innerHTML = "You loosed the match.";
			document.querySelector("#score").setAttribute("disabled", "true");
			document.getElementById("match-result").focus();
			document.getElementById("new-game").removeAttribute("style");
		}
	}
}


function decidingForBattingOrBalling(event)
{
	if (battingOrBalling == "balling")
	{
		let returnnedBallingValue = userBalling(event);
		if (returnnedBallingValue === false)
		{
			firstHalfOrSecondHalf += 1;
		}
		else {
			totalRunScoredByComputer = returnnedBallingValue;
		}
	}
	else {
		let returnnedBattingValue = userBatting(event);
		if (returnnedBattingValue === false)
		{
			firstHalfOrSecondHalf += 1;
		}
		else {
			totalRunScoredByUser = returnnedBattingValue;
		}
	}
}


function userBalling(event)
{
	let keyPressedByUser = event.key;
	let numberRegExpression = /^[a-z]$/i;
	let score = 0;

	if (numberRegExpression .test(keyPressedByUser))
	{
		event.preventDefault();
		return true;
	} 
	else if (keyPressedByUser === "Enter")
	{
		let currentScoreString = document.getElementById("score").value;
		let currentScore = parseInt(currentScoreString, "10");
		if ((currentScore >= 0) && (currentScore <= 6))
		{
			document.getElementById("ballingRun").innerHTML = currentScore;
			let  randomNumber = computerGeneratedNumber();
			document.getElementById("battingRun").innerHTML = randomNumber;
			document.getElementById("battingRun").setAttribute("aria-live", "polite");
			document.getElementById("ballingRun").removeAttribute("aria-live");
			if (randomNumber == currentScore)
			{
				document.getElementById("status").innerHTML = "YOUR OPPONENT IS OUT";
				document.getElementById("score").setAttribute("disabled", "true");
				document.getElementById("status").focus();
				firstHalfOrSecondHalf += 1;
			}
			else {
				let scr = document.getElementById("current-score").innerHTML;
				score = parseInt(scr, "10");
				score = score + randomNumber;
			document.getElementById("current-score").innerHTML = score;
			document.getElementById("score").value = '';
			if ((firstHalfOrSecondHalf ==1) && (score > totalRunScoredByUser))
			{
				firstHalfOrSecondHalf += 1;
			}
			}
		}
		else {
			document.getElementById("errorMessage").innerHTML = "Please enter a valid number between 0-6";
			document.getElementById("score").value = '';
			window.setTimeout(function() {
				document.getElementById("errorMessage").innerHTML = " "; }, 1000);
				return true;
		}
	}
	let scr = document.getElementById("current-score").innerHTML;
	score = parseInt(scr, "10");
	return score;
}




function userBatting(event)
{
	let keyPressedByUser = event.key;
	let numberRegExpression = /^[a-z]$/i;
	let score = 0;

	if (numberRegExpression .test(keyPressedByUser))
	{
		event.preventDefault();
		return true;
	} 
	else if (keyPressedByUser === "Enter")
	{
		let currentScoreString = document.getElementById("score").value;
		let currentScore = parseInt(currentScoreString, "10");
		if ((currentScore >= 0) && (currentScore <= 6))
		{
			document.getElementById("battingRun").innerHTML = currentScore;
			let  randomNumber = computerGeneratedNumber();
			document.getElementById("ballingRun").innerHTML = randomNumber;
			document.getElementById("ballingRun").setAttribute("aria-live", "polite");
			document.getElementById("battingRun").removeAttribute("aria-live");
			if (randomNumber == currentScore)
			{
				document.getElementById("status").innerHTML = "YOU ARE OUT";
				document.getElementById("score").setAttribute("disabled", "true");
				document.getElementById("status").focus();
				firstHalfOrSecondHalf += 1;
			}
			else {
				let scr = document.getElementById("current-score").innerHTML;
				score = parseInt(scr, "10");
				score = score + currentScore;
			document.getElementById("current-score").innerHTML = score;
			document.getElementById("score").value = '';
			if ((firstHalfOrSecondHalf ==1) && (score > totalRunScoredByComputer))
			{
				firstHalfOrSecondHalf += 1;
			}
			}
		}
		else {
			document.getElementById("errorMessage").innerHTML = "Please enter a valid number between 0-6";
			document.getElementById("score").value = '';
			window.setTimeout(function() {
				document.getElementById("errorMessage").innerHTML = " "; }, 1000);
				return true;
		}
	}
	let scr = document.getElementById("current-score").innerHTML;
	score = parseInt(scr, "10");
	return score;
}


//Function to generate a random number from 0-6
//Function returns a random number from 0-6
function computerGeneratedNumber()
{
	let number = Math.floor(Math.random() * 7);
	return number;
}


function changingValuesOnClickingNext()
{
	if (battingOrBalling == "batting")
	{
			battingOrBalling = "balling";
	}
	else {
			battingOrBalling = "batting";
	}

	document.querySelector("#status").innerHTML = "";
	document.querySelector("#ballingRun").innerHTML = "0";
	document.querySelector("#battingRun").innerHTML = "0";
	document.querySelector("#current-score").innerHTML = "0";
	document.getElementById("score").removeAttribute("disabled");
	document.getElementById("score").value = "";
	document.getElementById("score").focus();
	document.querySelector("#next").setAttribute("style", "display: none;");
			document.getElementById("live-announcement").removeAttribute("role");
			document.getElementById("live-announcement").setAttribute("role", "alert");
			document.getElementById("live-announcement").innerHTML = "You are " + battingOrBalling + " now!";
}
