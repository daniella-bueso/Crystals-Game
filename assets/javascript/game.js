$(document).ready(function() {

// Create global variables
	crystals = ['assets/images/red.png','assets/images/blue.png','assets/images/yellow.png','assets/images/green.png'];

	var totalScore = 0;
	var wins = 0;
	var losses = 0;
	$("#wins").text("Wins: " + wins);
	$("#losses").text("Losses: " + losses);

// =========================================================================================================================
	numCrystals();
	startGame();

// FUNCTIONS

	//Function to startgame
	function startGame () {
		//clears the score for number to match
		totalScore = 0;
		$(".totalscore").text("Your total score is: " + totalScore);

		// function to generate random number to guess for player to match
		function randomIntFromInterval(min,max) { 
			return Math.floor(Math.random()*(max-min+1)+min);
		} 

		var numberToGuess = randomIntFromInterval(19,120);
		//prints value of totalscore to html
		$(".value").text(numberToGuess);

		// when any crystal is clicked, update total score and display value as well. 
		$('.crystalImg').on('click', function(){
		    totalScore = totalScore + parseInt($(this).data('num'));

			$(".totalscore").text("Your total score is: " + totalScore);
			$("#status").empty();
			// If total score equals number to guess, then increase wins and re-start game
			if (totalScore == numberToGuess){
				$("#status").text("YOU WON!!!");
				wins++;
				$("#wins").text("Wins: " + wins);
				console.log(wins);
				$(".crystals").empty();
				numCrystals();
				startGame();	
			}

			//else if total score is greater than number to guess, increase losses and also re-start game
			else if (totalScore > numberToGuess){
				$("#status").text("YOU LOST!");
				losses++;
				$("#losses").text("Losses: " + losses);
				console.log(losses);
				$(".crystals").empty();
				numCrystals();
				startGame();
			}
		})
	}

	// function to generate random numbers for each crystal
	function numCrystals () {
		var numbers = [];
		//while the amount of numbers generated if less than 4, continue to get more random numbers
			while(numbers.length < 4) {
				var ranNum = Math.ceil(Math.random()*12);
				console.log(ranNum);

				//if ranNum repeats, generate another number, so each crystal have different ran numbers
				var numFound = false;
				for (var i = 0; i < numbers.length; i++){
					if (numbers[i] == ranNum){
						numFound = true; break
					}
				}
				if(!numFound)numbers[numbers.length]=ranNum;
			}
			console.log(numbers);

			// Loop to match random numbers generated with a crystal image
			for (var i = 0; i < numbers.length; i++) {
				var imgCrys = $('<img>');
				imgCrys.attr({
					'data-num': numbers[i],
					'src': crystals[i],
					'alt': 'crystals',
				});
				imgCrys.addClass('crystalImg');
				$(".crystals").append(imgCrys);		
			}
	}

})