DartsPlayer = function() {

	this.points = 501;
	
	this.name = "";
	
	this.dartsThrown = 0;
	
	this.pointsMade = 0;
	
	this.fallBack = 501;
	
	this.highestScore = 0;
	
	this.setHighestScore = function( pts ) {
		this.highestScore = pts;
	};
	
	this.getHighestScore = function() {
		return this.highestScore;
	};
	
	this.setFallBack = function( pts ) {
		this.fallBack = pts;
	};
	
	this.getFallBack = function() {
		return this.fallBack;
	};
	
	this.setPoints = function( pts ) {
		this.points = pts;
	};
	
	this.getPoints = function() {
		return this.points;
	};
	
	this.calc = function( points ) {
		this.dartsThrown++;
		if( this.points - points < 0 ) {
			// No score!
			this.points = this.getFallBack();
			return false;
		} else {
			this.points -= points;
			this.pointsMade += ( points * 1);
			return true;
		}
	};
	
	this.setName = function( playerName ) {
		this.name = playerName;
	};
	
	this.getName = function() {
		return this.name;
	};
	
	this.getSingleDartAverage = function() {
		var avg = ( this.pointsMade / this.dartsThrown );
		return avg.toFixed( 2 );
	};
	
	this.getThreeDartAverage = function() {
		var avg = ( this.pointsMade / this.dartsThrown ) * 3;
		return avg.toFixed( 2 );
	}

};

DartsGame = function() {
	
	this.players = [];
	
	this.throwCount = 0;
	
	this.currentPlayer = 0;
	
	this.running = false;
	
	this.addPlayer = function( player ) {
		this.players.push( player );
		var skeleton = '<div id="player-' + player.getName() + '" class="col-5 col-sm-5 col-lg-3 player"><h1>' + player.getName() + '</h1><h3 id="points-' + player.getName() + '">501</h3><h5>3D AVG:<span id="tda-' + player.getName() + '">0</span></h5><h5>Highest Score:<span id="highscore-' + player.getName() + '">0</span></h5></div>';
		$( '.players' ).append( skeleton );		
	};
	
	this.getPlayers = function() {
		return this.players;
	};
	
	this.start = function() {
		if( 0 == this.getPlayers() ) {
			alert( 'Please add players first' );
			return false;
		} else if( this.running ) {
			alert( 'The game is already started' );
			return false;
		} else {
			this.currentPlayer = $( '#startplayer' ).val();
			$( '.welcome' ).hide();
			this.setPlayer();
			$( '.jumbotron' ).removeClass( 'hide' );
			this.running = true;
			return true;
		}
	};
	
	this.getPlayer = function() {
		return this.players[this.currentPlayer];
	};
	
	this.calc = function( points ) {
		if( this.getPlayer().calc( points ) ) {
			this.throwCount++;
			$( '.throws' ).append( '<span class="label label-success">' + points + '</span>' );
			this.setPoints();
			if( 3 == this.throwCount || this.getPlayer().getPoints() == 0 )
				this.nextPlayer();		
		} else {
			this.setPoints();
			this.nextPlayer();
		}
	};
	
	this.nextPlayer = function() {
		// Update three dart average
		$( '#tda-' + this.getPlayer().getName()  ).html( this.getPlayer().getThreeDartAverage() );
		var thrownPoints = this.getPlayer().getFallBack() - this.getPlayer().getPoints();
		if( thrownPoints > this.getPlayer().getHighestScore() ) {
			this.getPlayer().setHighestScore( thrownPoints );
		}
		$( '#highscore-' + this.getPlayer().getName() ).html( this.getPlayer().getHighestScore() );
		$( '.throws' ).html( '' );
		console.log( this.getPlayer() );
        if( 0 == this.getPlayer().getPoints() )
            $( '#player-' + this.getPlayer().getName() ).addClass( 'finished' );
		if( typeof this.players[parseInt(this.currentPlayer + 1)] == "object" ) {
			this.currentPlayer++;
		} else {
			this.currentPlayer = 0;
		}
		while( typeof this.players[this.currentPlayer] == "object" ) {
			if( this.getPlayer().getPoints() == 0 )
				this.currentPlayer++;
			else
				break;
		}		
		this.throwCount = 0;
		this.getPlayer().setFallBack( this.getPlayer().getPoints() );
		this.setPlayer();
	};
	
	this.setPlayer = function() {
        $( '#checkout' ).text( '' );
		$( '#currentplayer' ).html( 'Currently playing: ' + this.getPlayer().getName() );
		$( '.player' ).removeClass( 'active' );
		$( '#player-' + this.getPlayer().getName() ).addClass( 'active' );
		this.setPoints();
	};
	
	this.setPoints = function() {
		$( '#currentpoints' ).html( this.getPlayer().getPoints() );
		$( '#points-' + this.getPlayer().getName() ).html( this.getPlayer().getPoints() );
        if( this.getPlayer().getPoints() <= 170 && this.getPlayer().getPoints() > 0 ) {
			console.log( checkouts[this.getPlayer().getPoints()] );
			if( typeof checkouts[this.getPlayer().getPoints()] == "object" ) {
				console.log( "WAS SOLL DAS!" );
				var neededDarts = 0;
				var first = checkouts[this.getPlayer().getPoints()]['first'];
				var second = checkouts[this.getPlayer().getPoints()]['second'];
				var third = checkouts[this.getPlayer().getPoints()]['third'];
				var checkoutString = first;
				neededDarts++;
				if( second != '' ) {
					checkoutString += ' - ' + second;
					neededDarts++;
				}
				if( third != '' ) {
					checkoutString += ' - ' + third; neededDarts++;
				}
				if( ( 3 - this.throwCount ) >= neededDarts )
					$( '#checkout').text( checkoutString );
				else
					$( '#checkout' ).text( 'No Checkout!' );
			}
        }
	};
	
	this.restart = function() {
		game = this;
		$.each( this.getPlayers(), function( k, player ) {
			player.setPoints( 501 );
			game.currentPlayer = $( '#startplayer' ).val();
			game.setPlayer();
			$( '#points-' + player.getName() ).html( 501 );
			$( '#player-' + player.getName() ).removeClass( 'finished' );
		});
	}

};

game = new DartsGame();

$( '.addpoints' ).click( function() {
	game.calc( $(this).attr( 'data-value' ) );
});

$( '.addplayer' ).click( function() {
	var newPlayer = new DartsPlayer();
	newPlayer.setName( $( '#new-player' ).val() );
	$( '#new-player' ).val( '' );
	$( '#startplayer' ).append( '<option value="' + game.getPlayers().length + '">' + newPlayer.getName() + '</option>' );
	game.addPlayer( newPlayer );
});

$( '.gameon' ).click( function() {
	if( game.start() ) {
		$(this).hide();
		$( '.restart' ).removeClass( 'hide' );
	}
});

$( '.restart' ).click( function() {
	game.restart();
});





	