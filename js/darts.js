/**
 * Class represents one darts player
 *
 * @constructor
 */
DartsPlayer = function() {

    /**
     * Current points of the player. Is being decreased during game
     *
     * @type {Number}
     */
	this.points = 501;

    /**
     * Name of the player
     *
     * @type {String}
     */
	this.name = "";

    /**
     * Amount of thrown darts per game
     *
     * @type {Number}
     */
	this.dartsThrown = 0;

    /**
     * Amount of points made per game
     *
     * @type {Number}
     */
	this.pointsMade = 0;

    /**
     * If user would fall into negative values, use fallback to fall back
     *
     * @type {Number}
     */
	this.fallBack = 501;

    /**
     * The highest score thrown by the user (with three darts)
     *
     * @type {Number}
     */
	this.highestScore = 0;

    /**
     * checkout attempts
     *
     * @type {Number}
     */
    this.checkoutAttempts = 0;

    /**
     * checkout attempts
     *
     * @type {Number}
     */
    this.checkoutSuccessful = 0;

    /**
     * increase the amount of attempted checkouts
     */
    this.increaseCheckoutAttempts = function() {
        this.checkoutAttempts++;
    };

    /**
     * increase the amount of successful checkout attempts
     *
     */
    this.increaseSuccessfulCheckouts = function() {
        this.checkoutSuccessful++;
    };

    /**
     * calculate the checkout percentage based on attempts
     */
    this.getCheckoutPercentage = function() {
        if(this.checkoutSuccessful > 0) {
            var pct = (100 / this.checkoutAttempts) * this.checkoutSuccessful;
            return pct.toFixed( 2 );
        }
        return 0;
    };

    /**
     * Sets the highest score of the user
     *
     * @param pts
     */
	this.setHighestScore = function( pts ) {
		this.highestScore = pts;
	};

    /**
     * Get the current highest score
     *
     * @return {Number}
     */
	this.getHighestScore = function() {
		return this.highestScore;
	};

    /**
     * Set the fall back points to fall back (if necessary)
     *
     * @param pts
     */
	this.setFallBack = function( pts ) {
		this.fallBack = pts;
	};

    /**
     * Get the current fall back points
     *
     * @return {Number}
     */
	this.getFallBack = function() {
		return this.fallBack;
	};

    /**
     * Set the remaining points for the player
     *
     * @param pts
     */
    this.setPoints = function( pts ) {
        this.points = pts;
    };

    /**
     * Get the current points
     *
     * @return {Number}
     */
	this.getPoints = function() {
		return this.points;
	};

    /**
     * Set the name of the player
     *
     * @param playerName
     */
    this.setName = function( playerName ) {
        this.name = playerName;
    };

    /**
     * Get the name of the player
     *
     * @return {String}
     */
    this.getName = function() {
        return this.name;
    };

    /**
     * Calculation method. Called after every throw
     *
     * @param points
     * @return {Boolean}
     */
	this.calc = function( points ) {
		this.dartsThrown++;
        // Let's check if the current score would cause a negative value or 1 (cannot checkout 1 with doubles)
		if( ( this.points - points < 0 ) || ( this.points - points == 1 ) ) {
			// Too much points scored! Fallback
			this.points = this.getFallBack();
			return false;
		} else {
            // Score is okay, decrease current points and increase pointsMade
			this.points -= points;
			this.pointsMade += ( points * 1);
			return true;
		}
	};

    /**
     * Calculate single darts average based on the pointsMade and dartsThrown
     *
     * @return {String}
     */
	this.getSingleDartAverage = function() {
		var avg = ( this.pointsMade / this.dartsThrown );
		return avg.toFixed( 2 );
	};

    /**
     * Calculate three darts average based on the pointsMade and dartsThrown
     * @return {String}
     */
	this.getThreeDartAverage = function() {
		var avg = this.getSingleDartAverage() * 3;
		return avg.toFixed( 2 );
	}

};

/**
 * Class represents a darts game
 *
 * @todo - refactor, add child classes for different game types
 * @constructor
 */
DartsGame = function() {

    /**
     * Start points of the game
     *
     * @type {Number}
     */
    this.startPoints = 501;

    /**
     * Stores the players for the current game
     *
     * @type {Array}
     */
	this.players = [];

    /**
     * Throw count of the current player (max 3)
     *
     * @type {Number}
     */
	this.throwCount = 0;

    /**
     * The numeric index of the current player (see this.players array)
     *
     * @type {Number}
     */
	this.currentPlayer = 0;

    /**
     * Is the current game already running?
     *
     * @type {Boolean}
     */
	this.running = false;

    /**
     * Add the given player to the playes array and add the player div to the player container
     * @param player
     */
	this.addPlayer = function( player ) {
		this.players.push( player );
		var skeleton = '<div id="player-' + player.getName() + '" class="col-5 col-sm-5 col-lg-3 player"><h1>' + player.getName() + '</h1><h3 id="points-' + player.getName() + '">' + this.getStartPoints() + '</h3><h5>3D AVG:<span id="tda-' + player.getName() + '">0</span></h5><h5>Highest Score:<span id="highscore-' + player.getName() + '">0</span></h5><h5>Checkout PCT:<span id="checkoutpct-' + player.getName() + '"></span></h5></div>';
		$( '.players' ).append( skeleton );		
	};

    /**
     * Returns all players for the current game
     *
     * @return {Array}
     */
	this.getPlayers = function() {
		return this.players;
	};

    /**
     * Returns the start points of the game
     *
     * @return {Number}
     */
    this.getStartPoints = function() {
        return this.startPoints;
    };

    /**
     * Start the current game!
     *
     * @return {Boolean}
     */
	this.start = function() {
		if( 0 == this.getPlayers() ) {
            // If no players are given, show error alert
			alert( 'Please add players first' );
			return false;
		} else if( this.running ) {
            // If the game is already running, show error alert
			alert( 'The game is already started' );
			return false;
		} else {
            // The startplayer is the selected player in the startplayer dropdown
			this.currentPlayer = $( '#startplayer' ).val();
            // Hide the welcome DIV
			$( '.welcome' ).hide();
			this.setPlayer();
            // Show the jumbotron (DIV shows the current playing player and his rest points and checkout route)
			$( '.jumbotron' ).removeClass( 'hide' );
            // Set game as running
			this.running = true;
			return true;
		}
	};

    /**
     * Get the currently playing player
     *
     * @return {DartsPlayer}
     */
	this.getPlayer = function() {
		return this.players[this.currentPlayer];
	};

    /**
     * Calculate the thrown points
     *
     * @param points
     */
	this.calc = function( points ) {
        // Check if the calculation in the player object was successful
		if( this.getPlayer().calc( points ) ) {
            // If yes, increase throwCount
			this.throwCount++;
            // Show the thrown points in the headbar
			$( '.throws' ).append( '<span class="label label-success">' + points + '</span>' );
			this.setPoints();

            // If the players throwCount is 3 or the player has 0 points left, jump to the next player
			if( 3 == this.throwCount || this.getPlayer().getPoints() == 0 )
				this.nextPlayer();		
		} else {
            // The calculation of the points in the user object was not valid. maybe the user threw too much
			this.setPoints();
			this.nextPlayer();
		}
	};

    /**
     * Method is being called to jump to the next player
     */
	this.nextPlayer = function() {
		// Before we jump to the next player, update three dart average!
		$( '#tda-' + this.getPlayer().getName()  ).html( this.getPlayer().getThreeDartAverage() );
        // Check how many points was scored by the user in the last round
		var thrownPoints = this.getPlayer().getFallBack() - this.getPlayer().getPoints();
        // If the thrown points are higher than the current user highest score, set new highest score!
		if( thrownPoints > this.getPlayer().getHighestScore() ) {
			this.getPlayer().setHighestScore( thrownPoints );
            $( '#highscore-' + this.getPlayer().getName() ).html( this.getPlayer().getHighestScore() );
		}

        // Reset the div where the thrown points are shown in the menu bar
		$( '.throws' ).html( '' );
        // Check if the user has reached exactly 0 - if yes he's finished
        if( 0 == this.getPlayer().getPoints() ) {
            this.getPlayer().increaseSuccessfulCheckouts();
            // Mark the player div as finished
            $( '#player-' + this.getPlayer().getName() ).addClass( 'finished' );
        }

        // update checkout pct
        $( '#checkoutpct-' + this.getPlayer().getName() ).html(" " + this.getPlayer().getCheckoutPercentage() + "%");

        // Check if the next index in the array is a valid DartsPlayer object (check if a next player exists)
		if( typeof this.players[parseInt(this.currentPlayer + 1)] == "object" ) {
            // If yes just increase the currentPlayer index
			this.currentPlayer++;
		} else {
            // If no, jump to the first player (array index 0)
			this.currentPlayer = 0;
		}
        // If more than one player is already finished, jump to the next player which isn't already done with the game
		while( typeof this.players[this.currentPlayer] == "object" ) {
            // Check if the current player is ready. If yes, increase currentPlayer, if no break while
			if( this.getPlayer().getPoints() == 0 )
				this.currentPlayer++;
			else
				break;
		}
        // Set the throwCount for the current player to 0
		this.throwCount = 0;
        // Set the fall back for the current player
		this.getPlayer().setFallBack( this.getPlayer().getPoints() );
        // Prepare div fields etc
		this.setPlayer();
	};

    /**
     * Handles GUI preparations for the current player
     */
	this.setPlayer = function() {
        // Delete the checkout route for the current player
        $( '#checkout' ).text( '' );
        // Add the name of the new player to the "Currently playing" - DIV
		$( '#currentplayer' ).html( 'Currently playing: ' + this.getPlayer().getName() );
        // Set all player divs as inactive
		$( '.player' ).removeClass( 'active' );
        // Mark the div of the current player as active
		$( '#player-' + this.getPlayer().getName() ).addClass( 'active' );
        // Set the current points of the player
		this.setPoints();
	};

    /**
     * Set some point stuff (GUI) of the current user and calculate checkout route
     */
	this.setPoints = function() {

        // Fetch the DIV for the checkoutRoute
        var checkoutRouteDOM = $( '#checkout' );

        // Show the remaining points for the current player at the top of the page
		$( '#currentpoints' ).html( this.getPlayer().getPoints() );

        // Show the remaining points for the current player in the player div
		$( '#points-' + this.getPlayer().getName() ).html( this.getPlayer().getPoints() );

        // If the player is in the checkout are (< 170), calculate checkout route!
        if( this.getPlayer().getPoints() <= 170 && this.getPlayer().getPoints() > 0 ) {
            // The variable "checkouts" is declared in the file "checkouts.js"

            // Check, if the remaining score is able to be checked out
			if( typeof checkouts[this.getPlayer().getPoints()] == "object" ) {
                // Evaluate how many darts are needed to check out the current score
				var neededDarts = 0;
				var first = checkouts[this.getPlayer().getPoints()]['first'];
				var second = checkouts[this.getPlayer().getPoints()]['second'];
				var third = checkouts[this.getPlayer().getPoints()]['third'];

                // Add the first needed score to the checkout string
				var checkoutString = first;
				neededDarts++;

                // If a second score is needed to checkout the score, add it to checkout string
				if( second != '' ) {
					checkoutString += ' - ' + second;
					neededDarts++;
				}
                // If third dart is needed, add it to the checkout string
				if( third != '' ) {
					checkoutString += ' - ' + third; neededDarts++;
				}

                // If one dart is needed we have a checkout! increase checkout attempt
                if(1 == neededDarts && this.throwCount < 3) {
                    this.getPlayer().increaseCheckoutAttempts();
                }

                // Check if the player has enough throws remaining to check out the current score
				if( ( 3 - this.throwCount ) >= neededDarts ) {
                    // The user has more remaining throws than needed for checkout - SHOW CHECKOUT TEXT!
                    checkoutRouteDOM.text( checkoutString );
                } else {
                    // The user is not able to check out the current score with the remaining throws - NO CHECKOUT!
                    checkoutRouteDOM.text( 'No Checkout!' );
                }
			}
        }
	};

    /**
     * Restart the current game
     */
	this.restart = function() {
		game = this;
        // Walk through all players and reset the remaining points
		$.each( this.getPlayers(), function( k, player ) {
            // Set the new points (501 = Start points)
			player.setPoints( game.getStartPoints() );
            // Get the player which is selected as the starting player
			game.currentPlayer = $( '#startplayer' ).val();
			game.setPlayer();
			$( '#points-' + player.getName() ).html( game.getStartPoints() );
			$( '#player-' + player.getName() ).removeClass( 'finished' );
		});
	}

};

/**
 * 401 Game
 *
 * @constructor
 */
FourHundredOne = function() {
    this.startPoints = 401;
};
FourHundredOne.prototype = new DartsGame();

/**
 * 301 Game
 *
 * @constructor
 */
ThreeHundredOne = function() {
    this.startPoints = 301;
};
ThreeHundredOne.prototype = new DartsGame();

// Set initial game to null
var game = null;

/**
 * A new player was added
 */
$( '.addplayer' ).click( function() {
    var domPlayer = $( '#new-player' );
    // Check if a game was already initialized
    if( game == null ) {
        var gameType = $( '#gametype').val();
        if( 501 == gameType )
            game = new DartsGame();
        else if( 401 == gameType )
            game = new FourHundredOne();
        else if( 301 == gameType )
            game = new ThreeHundredOne();
    }
    // Create object for the new player and set his name
	var newPlayer = new DartsPlayer();
	newPlayer.setName( domPlayer.val() );
    newPlayer.setPoints( game.getStartPoints() );
	domPlayer.val( '' );
    // Append the new player to the start player select field
	$( '#startplayer' ).append( '<option value="' + game.getPlayers().length + '">' + newPlayer.getName() + '</option>' );
    // Finally add the player to the current game
	game.addPlayer( newPlayer );
});

/**
 * Calculate the thrown amount
 */
$( '.addpoints' ).click( function() {
    var val = $(this).attr('data-value');
    if( "std" == val) {
        game.calc(1);
        game.calc(5);
        game.calc(20);
    } else {
        game.calc( $(this).attr( 'data-value' ) );
    }
});

/**
 * Start the game!
 */
$( '.gameon' ).click( function() {
    // Start game
    if( game == null ) {
        alert( 'Please add players first!' );
    } else {
        if( game.start() ) {
            // Hide the "GAMEON" Button
            $(this).hide();
            // Show the "RESTART" Button
            $( '.restart' ).removeClass( 'hide' );
        }
    }
});

/**
 * Restart current game.
 */
$( '.restart' ).click( function() {
	game.restart();
});