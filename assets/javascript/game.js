$(document).ready(function() {

// Create global variables

	crystals = ['assets/images/red.png','assets/images/blue.png','assets/images/yellow.png','assets/images/green.png'];

	var totalScore = 0;
	var wins = 0;
	var losses = 0;
	$("#win").text("Wins: " + wins);
	$("#loss").text("Losses: " + losses);

// =========================================================================================================================
	newCrystals();
	startGame();

// FUNCTIONS

	// function to generate random numbers for each crystal
	function newCrystals () {
		var numbers = [];
			while(numbers.length < 4) {
				var ranNum = Math.ceil(Math.random()*12);
				console.log(ranNum);

				var found = false;
				for (var i = 0; i < numbers.length; i++){
					if (numbers[i] == ranNum){
						found = true; break
					}
				}
				if(!found)numbers[numbers.length]=ranNum;
			}
			console.log(numbers);

			// Loop so the random numbers generated are match with a crystal image
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


	function startGame () {
		totalScore = 0;
		$(".totalscore").text("Your total score is: " + totalScore);

		// function to generate random number to guess for player to match
		function randomIntFromInterval(min,max) { 
			return Math.floor(Math.random()*(max-min+1)+min);
		} 

		var numberToGuess = randomIntFromInterval(19,120);

		$(".value").text(numberToGuess);

		// when any crystal is clicked, update total score and display value as well. 
		$('.crystalImg').on('click', function(){
		    totalScore = totalScore + parseInt($(this).data('num'));

			$(".totalscore").text("Your total score is: " + totalScore);

			// If total score equals number to guess, then increase wins and re-start game
			if (totalScore == numberToGuess){
				$("#status").text("You won!!!");
				wins++;
				$("#wins").text("Wins: " + wins);
				console.log(wins);
				$(".crystals").empty();
				newCrystals();
				startGame();	
			}

			//else if total score is greater than number to guess, increase losses and also re-start game
			else if (totalScore > numberToGuess){
				$("#status").text("You lost!");
				losses++;
				$("#losses").text("Losses: " + losses);
				console.log(losses);
				$(".crystals").empty();
				newCrystals();
				startGame();
			}
		});
	}

})