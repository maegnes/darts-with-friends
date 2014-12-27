<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../docs-assets/ico/favicon.png">

    <title>Darts with Friends - created by maegnes</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/offcanvas.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../docs-assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>	

 <div class="navbar navbar-fixed-top navbar-default" style="padding: 5px;" role="navigation">
      <div class="container">
        <div class="navbar-header">
			<form class="form-inline" role="search">
        <div class="form-group">
          <label>1. Select type</label>
          <select id="gametype" class="form-control">
            <option>501</option>
            <option>401</option>
            <option>301</option>
          </select>
        </div>  
        <label>2. Add players</label>
				<div class="form-group">
					<input type="text" id="new-player" class="form-control" placeholder="Name of the player">
				</div>
				<button type="button" class="btn btn-default addplayer">Add Player</button>			
				<div class="form-group">
          <label>3. Select starting player</label>
					<select id="startplayer" class="form-control">
					</select>
				</div>
				&nbsp;&nbsp;&nbsp;
				<button type="button" class="btn btn-lg btn-success gameon">GAME ON!</button>
				<button type="button" class="btn btn-lg btn-success restart hide">RESTART</button>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<span class="throws">
				</span>
			</form>
        </div>
      </div><!-- /.container -->
    </div><!-- /.navbar -->

    <div class="container">
	
      <div class="row row-offcanvas row-offcanvas-right">

        <div class="col-xs-12 col-sm-9">
          <p class="pull-right visible-xs">
            <button type="button" class="btn btn-primary btn-xs" data-toggle="offcanvas">Toggle nav</button>
          </p>
          <div class="jumbotron hide">
			<h1 id="currentpoints">{PLAYER_POINTS} Points</h1>
			<h2 id="currentplayer">Currently playing: {PLAYER_NAME}</h2>
			<h3 id="checkout"></h3>
          </div>
		  <div class="welcome">
        <img src="darts.png"/>
			<h1>Darts with friends.</h1>
      <h2>1. Select game type (301, 401, 501)</h2>
      <h2>2. Add players</h2>
      <h2>3. Select starting player</h2>
			<h2>4. Press Button "GAME ON". Game on!</h2>
		  </div>
          <div class="row players"></div>
        </div>

        <div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
          <div class="list-group">
			<a class="list-group-item">
				<button type="button" class="btn btn-success addpoints" data-value="25">25</button>
				<button type="button" class="btn btn-danger addpoints" data-value="50">50</button>
				<button type="button" class="btn btn-warning addpoints" data-value="0">0</button>
        <button type="button" class="btn btn-info addpoints" data-value="std">1-5-20</button>
			</a>
			<?php for( $i = 20; $i >= 1; $i-- ) {
				echo '<a class="list-group-item">
					<button type="button" class="btn btn-primary addpoints" data-value="' . $i . '">' . $i . '</button>
					<button type="button" class="btn btn-default addpoints" data-value="' . ( 2 * $i ) . '">D (' . ( 2 * $i ) . ')</button>
					<button type="button" class="btn btn-default addpoints" data-value="' . ( 3 * $i ) . '">T (' . ( 3 * $i ). ')</button>				
				</a>';
			}
			?>
          </div>
        </div><!--/span-->
      </div><!--/row-->

      <hr>

      <footer>
        <p>&copy; just maeg 2013 - feel free to contribute and clone darts-with-friends on <a target="_blank" href="https://github.com/maegnes/darts-with-friends">github</a></p>
      </footer>

    </div><!--/.container-->

    <script src="js/jquery-1.10.2.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
	<script src="js/checkouts.js"></script>
	<script src="js/darts.js"></script>
  </body>
</html>
