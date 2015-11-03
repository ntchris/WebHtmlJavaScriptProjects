  
 

var GlobalConstants = function ()
{

   
};
  

GlobalConstants._playbookScreenWidth = 600 ; // screen.availWidth; // 1024
GlobalConstants._playbookScreenHeight = 1024; // screen.availHeight;// 600
 

 
var PingPongBallRules = function()
{

};
PingPongBallRules.MaxGameScore = 11;

PingPongBallRules.chekcGameOver  = function(score, oppoScore)
{
    //reach match score and not duce
    if(  (score >= PingPongBallRules.MaxGameScore) 
              && 
         ((score-oppoScore)>=2)
      )
    {
       return true;
    }
    return false;
}

 
PingPongBallRules.checkIsDuce  = function(score1, score2) 
{
    if( Math.abs((score1 - score2) )>=2 )
    {
        return false;
    }
    
    var ducePoint = PingPongBallRules.MaxGameScore - 1 ;
    if( score1 >= ducePoint &&  score2 >= ducePoint )
    {
       return true;
    }
    
    return false;

}



function formatNumber(num)
{
	if (0<= num && num <=9)
	{
		return "0"+num;
	}
	return num;
}

function getTime()
{
	var time=new Date(); 
	// return formatNumber(12);
	return formatNumber(time.getHours())+":"+formatNumber(time.getMinutes())+":"+formatNumber(time.getSeconds());
}


 

var GameScoreInfo = function ()
{
   

}


GameScoreInfo.currentScoreP1 = 0;
GameScoreInfo.currentScoreP2 = 0;
GameScoreInfo.roundScoreP1 = 0;
GameScoreInfo.roundScoreP2 = 0;
GameScoreInfo.p1IsLeft = true;
GameScoreInfo.isPlayer1Serving = true;
GameScoreInfo.isPlayer1StartingServing = true;
GameScoreInfo.isStarted = false;


 


function showPlayerScores()
{
    
    showScoreP1();
    showScoreP2();      
    showServing();  
}


//P1 info always put in P1 box
function showScoreP1( )
{
   
   var roundLabelID =  "player1RoundScoreLabel";
   
   document.getElementById( roundLabelID ).textContent = GameScoreInfo.roundScoreP1;
 
   var currentScoreLabelID = "player1CurrentScoreLabel";
   document.getElementById( currentScoreLabelID ).textContent = GameScoreInfo.currentScoreP1;


}


function showScoreP2( )
{
   var roundLabelID =  "player2RoundScoreLabel";
   
   document.getElementById( roundLabelID ).textContent = GameScoreInfo.roundScoreP2;
 
   var currentScoreLabelID = "player2CurrentScoreLabel";
   document.getElementById( currentScoreLabelID ).textContent = GameScoreInfo.currentScoreP2;
}
 


 

function showServing()
{
   //var styleNotServing = "visibility:hidden";//"height: 55px; float : bottom; ";
   //var styleServing =  "visibility:visible";//styleNotServing //+ "background-color: YellowGreen ; font-size:35px";

   //var p1serving = document.getElementById("player1ServingBox" ).style;
   //var p2serving = document.getElementById("player2ServingBox" );
   
   var p1 = document.getElementById("player1ServingBox" );
   var p2 = document.getElementById("player2ServingBox" );
   
   if( GameScoreInfo.isPlayer1Serving )
   {
       //left side is serving
       //p1serving.style= styleServing;
       p1.style.visibility="visible";
       //p2serving.style= styleNotServing;
       p2.style.visibility="hidden";
   //    p1serving.textContent = "*";
   //    p2serving.textContent = "";
   }else
   {
       p1.style.visibility="hidden";
       p2.style.visibility="visible";

       //right side is serving
    //   p1serving.style= styleNotServing;
       //p2serving.style= styleServing;
       
    //   p1serving.textContent = "";
    //   p2serving.textContent = "*";
       
   }
}

function checkAndSwitchServingSide()
{
   //normal
   if(  PingPongBallRules.checkIsDuce(GameScoreInfo.currentScoreP1, GameScoreInfo.currentScoreP2)   
     )
   {
      
      GameScoreInfo.isPlayer1Serving = !GameScoreInfo.isPlayer1Serving;
    
   }else  //// is duce
   {
      if( (GameScoreInfo.currentScoreP1 + GameScoreInfo.currentScoreP2)  /2 ==  parseInt((GameScoreInfo.currentScoreP1 + GameScoreInfo.currentScoreP2)  /2 )
        )
      {   
         GameScoreInfo.isPlayer1Serving = !GameScoreInfo.isPlayer1Serving ;         
      } 
   }
   
   showServing();
}
   
 


var Timer = function( id )
{
	
	this._id = id;
	this._intervalId;
	var _countSec = 0;
	var _idTag ;
	
	              
	this.start = function()
	{
		if( _idTag == undefined)  
		{
			_idTag = document.getElementById( this._id );
		} 
        this.reset();
		this._intervalId = window.setInterval( this.timerPlus, Timer.interval);	
	    this.updateTimer(); 
	};
	
	this.stop = function()
	{
		this._intervalId = clearInterval( this._intervalId );
	};
	
	this.reset = function ()
	{
		this.stop();
        _countSec = 0;
      
     
	 
	};
	
	this.updateTimer = function()
	{	 
		_idTag.textContent = formatTimeToMinSecMSec( _countSec,Timer.interval  ); 
	};
	
	
	this.timerPlus = function ()
	{
		_countSec ++;
		 
		_idTag.textContent = formatTimeToMinSecMSec( _countSec , Timer.interval  ); 
	};
	
 
};

Timer.interval = 500;



formatIntAddZero = function ( value )
{
   if( value<10 )
   {
	   return "0"+value;
   }else
   {
	   return value;	
   }
};
 

formatTimeToMinSecMSec = function ( count , slice )
{
    var secCount = count /(1000/slice); 
    var min = formatIntAddZero ( parseInt(secCount /60 ) );
    var sec = formatIntAddZero ( parseInt(secCount %60)) ;
    
    var seperator = (parseInt(secCount*10%10) == 0) ? ":": " "  ; 
    return min + seperator +  sec;
           
    	
};



var _gameTimer = new Timer("GameTimer" );
 
 

function gameStartInitData()
{
    //document.getElementById( "mainContentBox" ).disabled=false;
    
    //GameScoreInfo.isLeftStartingServing = !GameScoreInfo.isLeftStartingServing;
    //GameScoreInfo.isLeftServing = GameScoreInfo.isLeftServing;
    //GameScoreInfo.p1IsLeft= !GameScoreInfo.p1IsLeft;
    
    GameScoreInfo.isStarted = true;
    GameScoreInfo.currentScoreP1 = 0;
    GameScoreInfo.currentScoreP2 = 0;
    showPlayerScores();
    
}

 
function gameStart()
{
   gameStartInitData();
   _gameTimer.start();
/*
   if( GameScoreInfo.isStarted == false)
   {
       GameScoreInfo.isStarted = true;
       button = document.getElementById("startButton");
       button.textContent="Reset";
       _gameTimer.start();

  
   }else
   {  
      //already started, now do the reset, but confirm first
      var r = confirm("Start a new game, Are you sure ?");
      if (r != true) 
      {
          //cancel pressed
          return;

      } 
     _gameTimer.start();
 

   }
*/
}


function startButtonOnClick(obj)
{
   obj.disabled = true
   gameStart();

}

  


function player1PointPlus()
{
    GameScoreInfo.currentScoreP1++;
 
}


function player2PointPlus()
{
    GameScoreInfo.currentScoreP2++;
    
}



function gameOverPrepareNextGame()
{
    _gameTimer.stop();
    playerSwitchSides();
    
    
    gameStart();

}

function p1PlusAndUpdate(obj)
{
    player1PointPlus();   
    showScoreP1();
    
}



function p2PlusAndUpdate(obj)
{
    player2PointPlus();
    showScoreP2();
    
    
}



function scoreClick(obj)
{ 
    if(!GameScoreInfo.isStarted) 
    {
       alert("Game not started, press start");
       return;
    }
    
    if(obj.id=="player1CurrentScoreLabel")
    {
        p1PlusAndUpdate(obj);
        if(PingPongBallRules.chekcGameOver(GameScoreInfo.currentScoreP1, GameScoreInfo.currentScoreP2))
        {
           GameScoreInfo.roundScoreP1++;
           showScoreP1();
           alert("P1 wins");
           gameOverPrepareNextGame();
           return;
        }
     
    } else if(obj.id=="player2CurrentScoreLabel" )
    { 
        //player2 score clicked
        p2PlusAndUpdate(obj);
        if(PingPongBallRules.chekcGameOver(GameScoreInfo.currentScoreP2, GameScoreInfo.currentScoreP1))
        {
           GameScoreInfo.roundScoreP2++;
           showScoreP2();
           alert("P2 wins");
           gameOverPrepareNextGame();
           return;
        }
      
    }
  
    checkAndSwitchServingSide();
    
    
}
 
 

 function resetButtonOnClick()
 {
    GameScoreInfo.currentScoreP1 = 0;
    GameScoreInfo.currentScoreP2 = 0;
    showPlayerScores();
 }
 
 
 function switchServingButtonOnClick()
 {
     GameScoreInfo.isPlayer1Serving = !GameScoreInfo.isPlayer1Serving;
     showServing();
 
 }
 
 
 
 function playerSwitchSides()
 {
    
    //document.getElementById("mainContentBox").innerHTML = "a";

      //obj = document.getElementById( "AppContainer" );
    //child = obj.lastChild;
    //obj.removeChild( obj.lastChild );
    
    GameScoreInfo.p1IsLeft = ! GameScoreInfo.p1IsLeft;
    
    //setupPlayerInfoBox();
    
    //obj.appendChild(child);
    
    // document.getElementById("mainContentBox").innerHTML = ""+text+"";
  
    writeMainContentBox();
  
    
    showPlayerScores();
    
 
 }
 
 function writeMainContentBox()
 {
 
    

    mainContentBoxObj.innerHTML = getPlayerHTMLText(1)
    +  getPlayerHTMLText(2) + getVSHTMLText();
 }
 
 
 function switchsideButtonOnClick()
 {
 
    playerSwitchSides();
    
 }

 
function getPlayerInfoBoxStyle(id)
{
   var defaultPlayerInfoStyle = "height: 480px; width: 420px; border: 1px solid blue; text-align: center; margin: 0 auto; float:"
   if(id=="player1")
   {
       if(GameScoreInfo.p1IsLeft )
       {
          return defaultPlayerInfoStyle + "left";
       }else
       {
          return defaultPlayerInfoStyle + "right";
       }
   
   }else if(id=="player2")
   {
     //p2
     if(GameScoreInfo.p1IsLeft )
     {
         return defaultPlayerInfoStyle + "right";
     }else
     {
         return defaultPlayerInfoStyle + "left";
     }
   }
   /*
    var defaultPlayerInfoStyle = "height: 480px; width: 420px; border: 1px solid blue; text-align: center; margin: 0 auto; float:"
    if(GameScoreInfo.p1IsLeft )
    {  
       objPlayer1InfoBox.style= defaultPlayerInfoStyle + " left;";
       objPlayer2InfoBox.style= defaultPlayerInfoStyle + " right;";
    }else 
    {
       objPlayer1InfoBox.style= defaultPlayerInfoStyle + " right;";
       objPlayer2InfoBox.style= defaultPlayerInfoStyle + " left;";
    }
  */   
    
} 
 
 
function initPage() 
{


   //objPlayer1InfoBox = document.getElementById( "player1Box" );
   //objPlayer2InfoBox = document.getElementById( "player2Box" );


    //setupPlayerInfoBox();
     mainContentBoxObj = document.getElementById("mainContentBox");
    
    writeMainContentBox();
    showPlayerScores();

}


function getPlayerHTMLText(idnum)
{
   var id ="player"+idnum;
   
   var text = "<div id=\"" + id+"Box\" style=\" "+ getPlayerInfoBoxStyle(id)+ "\">"+  //"float: left; height: 480px; width: 420px;text-align: center;\" > "+

           " <div id=\""+ id+"Box\" style=\"height: 60px; float:top; padding: 10; font-size:45px; background-color: LightSkyBlue\" > "+

            "  <input type=\"text\" name=\""+id+"Name\"  style=\"margin: 3; font-size:25px; text-align: center; margin: 0 auto;\" value=\""+id+"\"></input>  "+
           "</div> "+
           
           " <div id=\""+id+"RoundScoreBox\" style =\" background-color: LightSkyBlue\"> "  +
           
           "    <label id=\""+id+"RoundScoreLabel\" style=\"padding: 3; font-size:50px\">not init1</label> " +
           "</div>"+
          
            " <div id=\""+id+"CurrentScoreBox\"   style =\"border: 6px solid LightSkyBlue; padding:5;\" > "+
                  " <label  id=\""+id+"CurrentScoreLabel\" style=\" font-size:243px\" onClick=\"scoreClick(this)\" >not init2</label> "+
            "</div>  " +
             
          " <div id=\""+id+"ServingBox\" style=\"height: 60px; float : bottom; background-color: YellowGreen ; font-size:35px\" >   *  </div> " +          


   "       </div>  <!-- end of  playerLeftbox --> ";
       
          
    return text ;
}




function getVSHTMLText()
{

     return  "<div id=\"VS\" style=\"height: 480px; width: 100px ; text-align: center; margin: 0 auto;\"> " +
              "<label style=\"position:relative; left: 2px; top:200px ;font-size:60px \"> V.S. </label> </div>";
        
}

//var objPlayer1InfoBox; //= document.getElementById( "player1box" );
//var objPlayer2InfoBox; //= document.getElementById( "player2box" );


var mainContentBoxObj; 