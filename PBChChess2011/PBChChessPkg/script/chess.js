 

//draw nothing 50 is achievable
//draw all 30 lag
//NO Board 17
//No chess rotation 20
//no chess 23 (board and rest )

var GlobalConstants = function ()
{

   
};
 

GlobalConstants.enableLog = false;
GlobalConstants._debug =  false; 
GlobalConstants._fps = 40;
GlobalConstants._powerSaving = false;
GlobalConstants._dragAndDrop = false;
GlobalConstants._runDemo = false;

GlobalConstants.MaxRefreshFrames = 2;
GlobalConstants._refreshFrames = GlobalConstants.MaxRefreshFrames;
GlobalConstants.imagePath = "images\\"; 

GlobalConstants._charOrSymbol = false;
GlobalConstants._introImageTime = 1600;


GlobalConstants._playbookScreenWidth = 600 ; // screen.availWidth; // 1024
GlobalConstants._playbookScreenHeight = 1024; // screen.availHeight;// 600
 

GlobalConstants._playbookScreenHeightFixed = 1024;// 600;




GlobalConstants._canvasWidth = 600 ; // GlobalConstants._playbookScreenWidth-200
										// ;
GlobalConstants._canvasHeight = GlobalConstants._playbookScreenHeight  ; // do
																			// not
																			// larger
																			// than
																			// the
																			// chessboard
																			// Height
 
GlobalConstants._boardGridRegionOffsetX = 36;
GlobalConstants._boardGridRegionOffsetY = 207;

GlobalConstants._chessImageWidth =  66;
 

GlobalConstants._riverGridId= 5 ; // A(1) - E(5)
GlobalConstants._boardGridCountX = 9;
GlobalConstants._boardGridCountY = 10;

GlobalConstants._boardCellWidth = 66;


GlobalConstants._boardGridRegionWidthX = GlobalConstants._boardCellWidth * ( GlobalConstants._boardGridCountX-1);
GlobalConstants._boardGridRegionWidthY = GlobalConstants._boardCellWidth * (GlobalConstants._boardGridCountY-1) ;  


 
GlobalConstants._CanvasOffsetX = 0;
GlobalConstants._CanvasOffsetY = 0;
 
// KIA bar
GlobalConstants._chessBoardSideBarImageXStart = 34;
GlobalConstants._chessBoardSideBarImageXWidth = GlobalConstants._chessImageWidth ;
GlobalConstants._chessBoardSideBarRedImageY = 78  ;
GlobalConstants._chessBoardSideBarBlackImageY = 940  ;
GlobalConstants._chessBoardSideBarWidth = 460 ;  
GlobalConstants._spaceGoodForNChess = parseInt 
          (    
               (  GlobalConstants._chessBoardSideBarWidth  ) /GlobalConstants._chessImageWidth 
		  );


// parseInt(GlobalConstants._boardGridRegionWidthX /
// (GlobalConstants._boardGridCountX-1) );
GlobalConstants._riverWidth = 72;
GlobalConstants._riverExtraWidth = GlobalConstants._riverWidth - GlobalConstants._boardCellWidth ;

 
GlobalConstants._canvas = null;
GlobalConstants._context = null;
GlobalConstants._clickValidRange = 0.38;

// if Y >= this, it's crossed river, distance from home bottom line
GlobalConstants._crossedRiverDistanceFromHomeY = 5;
 

// side id
GlobalConstants._sideIdRed = 0;
GlobalConstants._sideIdBlack = 1;


GlobalConstants.rotateDegree  = -90;


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

GlobalConstants.isNeedRefresh  = function()
{
	if( GlobalConstants._refreshFrames >0 )
	{	
	   GlobalConstants._refreshFrames -- ;
	   return true;
	}
	
	return false;
	
};

GlobalConstants.setNeedRefresh  = function()
{
	GlobalConstants._refreshFrames = GlobalConstants.MaxRefreshFrames ;
	
};

var globalConsts = new GlobalConstants();
var _chessBoard ;







var Point = function( x, y )
{
   this.x =x;
   this.y =y;
};




var MessageLabel = function( label)
{
	this._infoLabel = document.getElementById(label);
	this.showMessage=function(msg)
	{
		this._infoLabel.textContent= getTime()+" "+msg;
		
	};

	
	
	
};






var Logger = function( textArea ) 
{
   this.logText = new Array();
   this.textArea ;  
   
    
   
   this.addLog = function ( logtext)
   {
      if(this.textArea == undefined )
     {
        return;
     }
     
     // this.logText.push( logtext );
      // this.textArea.value= logtext + "\n" + this.textArea.value;
      this.textArea.value += logtext + "\n" ;
      this.textArea.scrollTop = this.textArea.scrollHeight ;
   }
   
   this.getLog = function ()
   {
      // return this.logText.join();
   };

   /*
     * this.drawLog = function() { var i = 0; for(i=0;i<this.logText.length;i++ ) {
     * GlobalConstants._context.fillText("log:"+ this.logText[i], 650, 200+i*30 ); } }
     */
   
};

var logger = new Logger();




var RenderEngine = function()
{
	this._intervalId;
	
	this._renderObjArray = new Array();
	 
	
	
	this.drawAll = function()
	{   
		var max = this._renderObjArray.length;
		for(i=0; i<max; i++)
		{
			var obj = this._renderObjArray[i];
			
			if(obj==null || obj==undefined)
			{
				// a null element in the array
				return true;
			}
			var result = obj.drawImage();

			if( result==undefined)
			{
				result = true;
			}
			
			if(!result)
			{ 
                GlobalConstants.setNeedRefresh();
	    	    logger.addLog("refresh not success, must draw next frame");
			}
	    	  
		}
		return;
	};
	
	this.addRenderObj = function(obj)
	{
		this._renderObjArray.push(obj);
	};
	
	this.addRenderObjArray=function( array )
	{
		var i=0;
		for(i=0;i<array.length;i++)
		{
			var obj = array[i];
			if( obj!=null && obj!=undefined)
			{
				this._renderObjArray.push( obj );
			}
		}
	};
	
	this.clear =function()
	{
	    for(i=0;i<this._renderObjArray.length;i++)
        {
	        this._renderObjArray.pop();
        }
	    
	};
	

    this.initRenderObjForDemo = function()
    {
        //!!!!this.addRenderObj(_chessBoard);   
        //this.addRenderObj(_buttonRotate);
        this.addRenderObj(_buttonRestart);    
    };
    
	this.initRenderObjForChessGame = function()
    {
        this.clear();
        
        this.addRenderObj(_chessBoard);   
        this.addRenderObj(_buttonRotate);
        this.addRenderObj(_buttonRestart);        
	    this.addRenderObjArray(Chess.getChessArray(Chess._sideIdRed));  
        this.addRenderObjArray(Chess.getChessArray(Chess._sideIdBlack));
        this.addRenderObj(_turnIcon);
        this.addRenderObj(MouseAction);
    }
	
	
	RenderEngine._totalFrame =0;
	RenderEngine.updateFPSInterval = 1000; // ms

	RenderEngine.updateFPS = function()
	{
		RenderEngine._totalFrame = RenderEngine._totalFrame + refreshFrame.frameCount;
		
		_fpsInfoLabel.textContent= RenderEngine._totalFrame + " frames@fps:"+
		           refreshFrame.frameCount*(1000/RenderEngine.updateFPSInterval);
	  
		
		_fpsInfoLabel.textContent=RenderEngine._totalFrame + " frames@fps:"+ refreshFrame.frameCount; 
		// * (1000/RenderEngine.updateFPSInterval);
		 
		refreshFrame.frameCount = 0;

	};
	
	

};





// ================================================================================
// define a chess class
// ================================================================================



var Chess = function( side, index ) 
{
   
	if (side != Chess._sideIdRed && side != Chess._sideIdBlack ) 
	{
		alert("wrong chess side" + side);
	}

	this.homeY ; 
	this.chessStatus = Chess._chessStatusActive;
	this.boardPositionX ;
	this.boardPositionY ;
	this.imageX ;
	this.imageY  ;

	this._chessId = Chess.getChessId( index );

	this._side = side;
	this.rotate = 0;
	this.scale = 1;
	Chess._chessArrayBlack;
	Chess._chessArrayRed;
	Chess._chessArrayKIARed ;
	Chess._chessArrayKIABlack ;
	
	
// method
	
	this.setChessStatus = function(stat)
	{
		if(stat<Chess._chessStatusActive || stat>Chess._chessStatusMoving)
		{
			alert("Wrong status:"+ stat);
			return;
		}
		if(stat == Chess._chessStatusMoving || stat== Chess._chessStatusReadyToMove)
		{
			this.setScale(1.28);
	    }else
	    {
	    	this.setScale(1);
	    }
		this.chessStatus = stat;
	};
	
    this.setRotate = function( degree)
    {
    	this.rotate = degree;
    };
    this.setScale = function( scal)
    {
    	this.scale = scal;
    };
    
	this.loadImage = function ()   
	{
		this.image = new Image();
		this.image.src = Chess.getChessImagePath( this._chessId, this._side);

	};

	this.getImage= function  () 
	{
		if( this.image != undefined )
			return this.image;

		this.loadImage();
		return this.image;
	}
	this.image = this.getImage();  
  
	this.gridXToImageX = function (  gridX )
	{
		// x = ( this.boardPositionX -1) ;
		return GlobalConstants._boardGridRegionOffsetX + (gridX-1) *GlobalConstants._boardCellWidth ;

	};



// method
	this.getImageX = function _getImageX()
	{
		return this.imageX;

	};

	this.gridYToImageY = function (  gridY )
	{
		var riverSize= GlobalConstants._riverExtraWidth; 
		if( gridY <= GlobalConstants._riverGridId )
		{
			// no river extra width needed.
			// River is a little larger than a normal cell width
			riverSize = 0
		} 
		return GlobalConstants._boardGridRegionOffsetY + (gridY-1) *GlobalConstants._boardCellWidth + riverSize;

	};




   this.getImageY  = function  ()
   {
      return this.imageY ; 
   
   };
   
   
   this.getImageXY = function ()
   {
	   return new Point( this.imageX, this.imageY );
   };


   this.setImageXY = function ( x, y )
   {
     this.imageX = x;
     this.imageY = y;
   };


   this.drawImage = function()
   {
	   return this.drawChessRotate();
	   // return this.drawChess();
	   
   };
   
   
   
   this.drawChessRotate  = function ()
   {
	   
       var x = this.getImageX();
	   var y = this.getImageY();
	   if( this.image.width == 0 || this.image.height ==0  )
	   {
		   logger.addLog("Image Load NOT finished");
		   return false;
	   }
	   //if( this.rotate!=0 && this.scale!=1)	  
	    
	       GlobalConstants._context.save();
	       GlobalConstants._context.translate( x  , y  );


	       GlobalConstants._context.rotate( this.rotate * Math.PI/180);


	       if(this.scale!=1)
	       {
	           GlobalConstants._context.scale(this.scale, this.scale);
	       }

	       GlobalConstants._context.drawImage( this.image, 0-this.image.width/2, 
	               0-this.image.width/2  ) ;

	       GlobalConstants._context.restore();
	   /*}else
	   {
	       GlobalConstants._context.drawImage( this.image, 0-this.image.width/2, 
	               0-this.image.width/2  ) ;
	   }*/
	   
	   return true;
   };
   
   

   
   

   this.drawChess  = function ()
   {

	   var x = this.getImageX();
	   var y = this.getImageY();
	   if( this.image.width == 0 || this.image.height ==0  )
	   {
		   logger.addLog("Image Load NOT finished");
		   return false;
	   }
	   
	   	   
	   GlobalConstants._context.drawImage( this.image, x- GlobalConstants._chessImageWidth/2, 
			   y-GlobalConstants._chessImageWidth/2  ) ;

	   

	   // logger.addLog("drawChessDone: "+ this.image + " " + this.image.width+
		// " " + this.image.height);
	   return true;
   };



   this.setPosition = function (x , y )
   {
	   this.boardPositionX = x;
	   this.boardPositionY = y;
	   this.updateImageXYByGridXY();

   };


   this.updateImageXYByGridXY = function ( )
   {
	   // using
	   this.imageX = this.gridXToImageX ( this.boardPositionX );
	   this.imageY = this.gridYToImageY ( this.boardPositionY );
   };

};



// one side
Chess._chessCountOneSide = 16;

// Chess Id
Chess._chessIdJiang = 0;
Chess._chessIdShi = 1;
Chess._chessIdXiang = 2;
Chess._chessIdChe = 3;
Chess._chessIdMa = 4;
Chess._chessIdPao = 5;
Chess._chessIdBing = 6;

// ======== Chess Index Integer
Chess._chessIndexJiang = 0;
Chess._chessIndexShi1 = 1;
Chess._chessIndexShi2 = 2;
Chess._chessIndexXiang1 = 3;
Chess._chessIndexXiang2 = 4;
Chess._chessIndexChe1 = 5;
Chess._chessIndexChe2 = 6;
Chess._chessIndexMa1 = 7;
Chess._chessIndexMa2 = 8;
Chess._chessIndexPao1 = 9;
Chess._chessIndexPao2 = 10;
Chess._chessIndexBing1 = 11;
Chess._chessBingCount = 5;
Chess._chessMaxIndex = Chess._chessIndexBing1 + Chess._chessBingCount - 1;
Chess._twoSideChessMax = (Chess._chessMaxIndex + 1 ) *2 ;
Chess._chessIndexInvalid = 17;

// Chess status active ? KIA ? Moving by mouse ?
Chess._chessStatusActive = 0;
Chess._chessStatusKIA = 1;
Chess._chessStatusReadyToMove = 2; // for touch to move mode: touch once,
                                    // readytomove, touch dest posi, moving
Chess._chessStatusMoving = 3;


// side id
Chess._sideIdRed = GlobalConstants._sideIdRed;
Chess._sideIdBlack = GlobalConstants._sideIdBlack;


   
Chess.getSideName = function(side)
{
	var sideName;
		if(side == GlobalConstants._sideIdBlack)
		{
			sideName="Black";
		}
		else
	    {
			sideName="Red";
	    }
	return sideName;	
};
	
Chess.getChess = function   ( side, chessIndex )
{
    var chessArray = Chess.getChessArray(side);
    if ( chessIndex >=0 && chessIndex<= Chess._chessMaxIndex )
    {
       return chessArray[chessIndex];
    }
    else 
    {
       alert ( "wrong chess index: " + chessIndex );
    }
    
}
 
 Chess.getChessName = function (  chessid )
 {
      var chessString;
      switch (chessid) 
      {
         case Chess._chessIdJiang:
           chessString = "jiangshuai";
           break;
         case Chess._chessIdShi:
           chessString = "shi";
           break;
         case Chess._chessIdXiang:
           chessString = "xiang";
           break;
         case Chess._chessIdChe:
           chessString = "che";
           break;
         case Chess._chessIdMa:
           chessString = "ma";
           break;
         case Chess._chessIdPao:
           chessString = "pao";
           break;
         case Chess._chessIdBing:
           chessString = "bing";
           break;
         default:
           alert("getChessName() wrong id: " + chessid);
      }
      return chessString;
 };
 
 Chess.getChessImagePath = function  (chessid, side)
 {

      
     var sideString;
     if (side == Chess._sideIdRed )
     {
         sideString = "r";
     }
     else if (side == Chess._sideIdBlack ) 
     {   
         sideString = "b";    
     }
     else 
     {
         //alert("Wrong side !! " + side );
         return;
     }
   
     var chessString =  Chess.getChessName( chessid);
        
     var icon=""; 
     if ( GlobalConstants._icon )
     {
         icon = "i";
     }
     return GlobalConstants.imagePath  + sideString + chessString + icon+".png";
    
  };
  
  
  
 Chess.getChessArrayKIA = function( chessside )
 {
      
     
	 
	 if( chessside == Chess._sideIdRed )
     {
    	 return Chess.getChessArrayKIARed();
     }
     else if ( chessside == Chess._sideIdBlack )
     {
    	 return Chess.getChessArrayKIABlack();
     }
     else
     {   
    	 alert ("wrong side ID");
         return null;	  
     }
     
 };
  
 
 
 Chess.getChessArrayKIARed = function ()
 {
	if( Chess._chessArrayKIARed  == undefined )
	{
		 Chess._chessArrayKIARed = new Array( 0 );
	};
	return Chess._chessArrayKIARed;
 };
 

 Chess.getChessArrayKIABlack = function ()
 {
	if( Chess._chessArrayKIABlack  == undefined )
	{
		 Chess._chessArrayKIABlack = new Array( 0 );
	};
	return Chess._chessArrayKIABlack;
 };
 
 
 
 Chess.getChessArray = function( side )
 {
              
      if( Chess._chessArrayRed == undefined) 
      {
         Chess._chessArrayRed = new Array( Chess._chessCountOneSide);
      }
      
      if( Chess._chessArrayBlack == undefined )
      {
         Chess._chessArrayBlack = new Array( Chess._chessCountOneSide);
      }

      var chessArray;
      if( side == Chess._sideIdRed )
      {
        chessArray = Chess._chessArrayRed;
      }
      else if(side ==Chess._sideIdBlack)
      {
          chessArray = Chess._chessArrayBlack;
      }
      else
      {
          //alert( "wrong side " + side );
      }
      return chessArray;
 };
          
Chess.getChessId = function _getChessID( index )
{
   var chessid = Chess._chessIndexInvalid ;
   switch( index )
   {
     case  Chess._chessIndexJiang: chessid = Chess._chessIdJiang; break;
     case  Chess._chessIndexShi1 : chessid = Chess._chessIdShi; break;
     case  Chess._chessIndexShi2 : chessid = Chess._chessIdShi; break;
     case  Chess._chessIndexXiang1 : chessid = Chess._chessIdXiang; break;
     case  Chess._chessIndexXiang2 : chessid = Chess._chessIdXiang; break;
     case  Chess._chessIndexChe1 : chessid = Chess._chessIdChe; break;
     case  Chess._chessIndexChe2 : chessid = Chess._chessIdChe; break;
     case  Chess._chessIndexMa1  : chessid = Chess._chessIdMa; break;
     case  Chess._chessIndexMa2  : chessid = Chess._chessIdMa; break;
     case  Chess._chessIndexPao1 : chessid = Chess._chessIdPao; break;
     case  Chess._chessIndexPao2 : chessid = Chess._chessIdPao; break;
     case  Chess._chessIndexBing1: chessid = Chess._chessIdBing; break;
     default : Chess._chessIndexInvalid
   }
   if( index>=Chess._chessIndexBing1 && index<=Chess._chessMaxIndex)
   {
     chessid = Chess._chessIdBing;
   }
   
   if( chessid == Chess._chessIndexInvalid )
   {
      alert( "invalid chess index: " + index );
   }
   
   return chessid;
 
};

 

Chess.createAllChess  = function () 
{
   Chess.createRedChess();
   Chess.setAllChessRotate(Chess._sideIdRed, _chessBoard.redRotationDegree);
   
   Chess.createBlackChess();
   Chess.setAllChessRotate(Chess._sideIdBlack, _chessBoard.blackRotationDegree);
};


Chess.createRedChess = function() 
{
   Chess.createChess( Chess._sideIdRed);

};

Chess.createBlackChess = function () 
{
	Chess.createChess( Chess._sideIdBlack );
};



Chess.createChess = function (side) 
{

    var chessArray;
    chessArray = Chess.getChessArray(side);
    
    
    // create all chess of one side
    var i ;
    for( i=0;i<= Chess._chessMaxIndex;i++)
    {
       chessArray[ i ] = new Chess( side , i );
      
    }
  

};


Chess.setAllChessRotate = function(side, degree)
{
	var chessArray;
	chessArray = Chess.getChessArray(side);
	// create all chess of one side
	if(chessArray == undefined)
	{
	    return;
	}
	var i ;
	for( i=0; i<=Chess._chessMaxIndex; i++)
	{
		chessArray[ i ].setRotate(degree); 
	}
	  
};

// ===============================================================================
// end of class Chess
// ===============================================================================









 




var MouseAction = function ()
{
	
   
};

  

MouseAction.mousex ;
MouseAction.mousey ;
MouseAction.mousedownx;
MouseAction.mousedowny;
MouseAction.mouseupx;
MouseAction.mouseupy;
MouseAction.mouseDownGridX;
MouseAction.mouseDownGridY;
MouseAction.mouseUpGridX;
MouseAction.mouseUpGridY;
MouseAction.selectedChess;
// MouseAction.mouseGridYTest;




MouseAction.moveFrom = new Point(0,0);
MouseAction.moveTo = new Point(0 , 0);

MouseAction.setLineTo = function ( x , y )
{
	 
	MouseAction.moveTo.x = x ;
	MouseAction.moveTo.y = y ;
};


MouseAction.drawChessMoveLine = function ( x, y )
{
	if(   MouseAction.selectedChess  == undefined )
	{
	   // not moving a chess, no line is needed
		return;
	}
	 
	
	 
	GlobalConstants._context.beginPath();
	GlobalConstants._context.strokeStyle = "#A092F1";	 
	GlobalConstants._context.moveTo( MouseAction.moveFrom.x,  MouseAction.moveFrom.y  );
	GlobalConstants._context.lineTo( MouseAction.moveTo.x,  MouseAction.moveTo.y  );
	GlobalConstants._context.stroke();
	GlobalConstants._context.closePath();
		
};


// when move chess, draw a line from its orig position




MouseAction.isBlackberry = true;


MouseAction.getMouseGridXY = function ( imageX, imageY)
{
    var point = new Point( 0,0);

    var tempGridX = ChessBoard.getBoardGridX(imageX );
     
    var tempGridY = ChessBoard.getBoardGridY( imageY );
    if( tempGridX ==0 || tempGridY == 0)
    {
       
       return point;
    }
    var testGridY, testGridX;
    testGridX = Math.round( tempGridX );
    testGridY = Math.round( tempGridY );
    var deltaX , deltaY;
    
    deltaX = testGridX-tempGridX ;
    deltaY = testGridY-tempGridY ;
    var range = Math.sqrt( deltaX*deltaX + deltaY*deltaY  );
    
   
    if( range < GlobalConstants._clickValidRange )
    {
       point.x = testGridX ;
       point.y = testGridY ;
    }else
    {
       
    }
    return point;
}

  
      
      
      
MouseAction.pickUp = function( gridpoint)
{
 
	if(gridpoint.x==0||gridpoint.y==0)
	{
	   // invalid choose
		_userInfoLabel.showMessage("Touch a chess to move it");			

	   return false;
	}
	MouseAction.selectedChess=_chessBoard.getChessInGridXY( gridpoint.x, gridpoint.y);
	if( MouseAction.selectedChess == undefined )
	{
		return false;
	}	
	_userInfoLabel.showMessage("Moving chess, touch a target position");			
	logger.addLog("MouseAction.pickUp ( gridPoint )");
	
	GlobalConstants.setNeedRefresh();
	
	if(GlobalConstants._dragAndDrop)
    {  	
		// ======================== Drag and Drop ========================
		// MouseAction.selectedChess = _chessBoard.getChessInGridXY(
        // gridpoint.x, gridpoint.y);

		// if( MouseAction.selectedChess != undefined )
		{  
			// draw line
			MouseAction.moveFrom = MouseAction.selectedChess.getImageXY();
			var tempchess = MouseAction.selectedChess;
			// MouseAction.selectedChess.chessStatus = Chess._chessStatusMoving;
			tempchess.setChessStatus(Chess._chessStatusMoving);
			MouseAction.selectedChess.setImageXY( MouseAction.mousedownx , MouseAction.mousedowny );
			MouseAction.setLineTo( MouseAction.mousedownx , MouseAction.mousedowny ); 	 
		}
		// else
		{
			// pick up from empty grid
		}
		return true;
		
		
    }else // ======================== touch move -- no drag and drop
            // ========================
    {    	 
 		
    	var tempchess = MouseAction.selectedChess;
			tempchess.setChessStatus(Chess._chessStatusReadyToMove); 
			  
 			MouseAction.moveFrom = MouseAction.selectedChess.getImageXY();
  
 		return true;
 		
    	
    }
};      

MouseAction.moveDone = function( )
{
    // finished or cancel the movement, re-calculate the imagexy by the orig
    // boardxy
    MouseAction.selectedChess.updateImageXYByGridXY();
    // remove the chess from mouse pointer 

    MouseAction.selectedChess.setChessStatus(Chess._chessStatusActive);

    MouseAction.selectedChess = undefined;
    GlobalConstants.setNeedRefresh();  
    logger.addLog( "move Done");
   
};


MouseAction.putDown= function( gridpoint )
{
   // put down
   // gridPoint = MouseAction.getMouseGridXY ( MouseAction.mouseupx ,
   // MouseAction.mouseupy);
    
    // MouseAction.mouseUpGridX = gridPoint.x;
    // MouseAction.mouseUpGridY = gridPoint.y;
    var tempchess = MouseAction.selectedChess  ;
    if( tempchess  == undefined )
    {
        // have nothing to putdown
        return ;
    }
    
    // must refresh.
    GlobalConstants.setNeedRefresh();  
    
    // change chess status to normal from moving
    // tempchess.chessStatus = Chess._chessStatusActive;
    tempchess.setChessStatus(Chess._chessStatusActive);
    
    if( gridpoint.y == 0 || gridpoint.x == 0 )
    {  
        MouseAction.moveDone();
        _userInfoLabel.showMessage("invalid position: can only move to intersections");
        // cancel the move
        return;
    }
    
    // same position means cancel
    if( tempchess.boardPositionX == gridpoint.x && tempchess.boardPositionY == gridpoint.y )
    {
        MouseAction.moveDone();
        _userInfoLabel.showMessage("move to same position, cancel movement");
         // cancel the move
        return;
    }
    
    _chessBoard.checkRuleAndMoveChessTo( tempchess  , gridpoint);
    
    // either way, cancel the current selection chess
    MouseAction.moveDone();
    
    _chessBoard.checkWin();
    
    // after put down chess, need refresh frame
   
  
};


MouseAction.pickUpOrPutDown = function( imgpoint )
{
	var gridPoint   = MouseAction.getMouseGridXY ( imgpoint.x , imgpoint.y   );
 	MouseAction.mouseDownGridX = gridPoint.x;
	MouseAction.mouseDownGridY = gridPoint.y;
 	
	if(GlobalConstants._dragAndDrop)
	{	   
 	    // drag and drop move =====================================
		if( MouseAction.selectedChess == undefined )
		{
 			logger.addLog("MouseAction.pickUp ( gridPoint )");
			// if there is no current selected chess (on mouse pointer), then
            // pick
			// up the chess on gridpoint
			// pickup chess
			return MouseAction.pickUp ( gridPoint ); 
 
		}
		else
		{   
			logger.addLog("MouseAction.putDown ( gridPoint )");
			// if there is already a chess attached to the mouse, put it down to
			// gridpoint
			// put down chess
			MouseAction.putDown( gridPoint);
		}
		return false;
	
	}else // touch move ========================================
	{

	}
 
};      
     
MouseAction.removeCanvasOffset = function( x, y )      
{
    x = x - GlobalConstants._CanvasOffsetX;
    y = y - GlobalConstants._CanvasOffsetY;
    return new Point(x,y);
};

  

// mouse down or touch start
MouseAction.handleMouseDown = function ( x, y)
{
	logger.addLog( "handleMouseDown");
	var imgPoint  = MouseAction.removeCanvasOffset( x  , y );

		
	if( GlobalConstants._dragAndDrop)
	{	
        // ================ Drag And Drop Move =================
		
		// update mouse pointer data
		MouseAction.mousedownx = imgPoint.x;
		MouseAction.mousedowny = imgPoint.y;

		// mouse down could be pick up or put down.
		// put down ? mousedown on a chess, move mouse out of browser, mousedown
		// again to put down
		return MouseAction.pickUpOrPutDown( imgPoint );

	}else  // ================ Touch move =================
	{  	
		
		var gridPoint = MouseAction.getMouseGridXY ( imgPoint.x , imgPoint.y   );
		if( MouseAction.selectedChess == undefined )
		{
 		    // ============== touch to move starting ================
			// MouseAction._touchMoveStatus = MouseAction.statusStarted;
			
						
			
		 // MouseAction.mouseDownGridX = gridPoint.x;
		 // MouseAction.mouseDownGridY = gridPoint.y;
			
			// if there is no current selected chess (on mouse pointer), then
            // pick
			// up the chess on gridpoint
			// pickup chess
			return MouseAction.pickUp( gridPoint );
			
 		}else  // touch again to place it to a new position
 		{
 			// this must be 2nd mousedown : put it down (not the 1st select
            // chess mouse down
 			// MouseAction._touchMoveStatus = MouseAction.statusPutdown ;
 			
 			var tempChess = MouseAction.selectedChess;
 			
 			tempChess.setChessStatus(Chess._chessStatusMoving); 
 			tempChess.imageX=x;
 			tempChess.imageY=y;
 			MouseAction.setLineTo(x, y);
 			_userInfoLabel.showMessage("Release to confirm, or touch-move away to cancel");			
 			
 			GlobalConstants.setNeedRefresh();
 			 
 		}

	};

};

// mouse up or touch end
MouseAction.handleMouseUp = function(x, y)
{
	var gridPoint = MouseAction.getMouseGridXY (x, y);
	
	
	// drag and drop move
	if( GlobalConstants._dragAndDrop)
	{	
		// var imgpoint = MouseAction.removeCanvasOffset(x, y);
		 

		// mouse up is always putdown.
		MouseAction.putDown(gridPoint);
		
	}else  // touch move
	{
		
		// 1st mousedown/up ( start move), do nothing when mouse up
		
		var tempchess = MouseAction.selectedChess;
		
		if(tempchess == undefined)
		{
			return;
		}else if(tempchess.chessStatus==Chess._chessStatusReadyToMove)
		{
			// do side checking when mouse up(1st time mouse up)
			var tempchess = MouseAction.selectedChess;
 			if( tempchess._side != _chessBoard.sideTurn )
 			{
 				tempchess.setChessStatus(Chess._chessStatusActive);
 				MouseAction.selectedChess = undefined;
 				var info = "Rule Checking: "+Chess.getSideName(_chessBoard.sideTurn)+"'s turn.";
 				_userInfoLabel.showMessage(info); 
 				logger.addLog(info); 				
 				GlobalConstants.setNeedRefresh();
 			}
 			
			// do nothing
			return;
			
		}// else if(MouseAction._touchMoveStatus==MouseAction.statusPutdown )
            // //
		else if(MouseAction.selectedChess.chessStatus==Chess._chessStatusMoving)
		{
			// 2nd mouse up ( put down the chess)
			// finger release grid: pridPoint
			// moving chess new gridpoint
			var newGridPoint = MouseAction.getMouseGridXY(MouseAction.selectedChess.getImageX(),
					                          MouseAction.selectedChess.getImageY());
			
			if(gridPoint.x!=newGridPoint.x ||  gridPoint.y!=newGridPoint.y )
			{
				// putdown grid piont is not the release grid point.
				// user putdown chess and move away to release finger.
				// MouseAction._touchMoveStatus = MouseAction.statusEnd;
				MouseAction.moveDone();
				 
				// GlobalConstants.setNeedRefresh();
				return;
			}else
			{
				// if putdown to the same gridPoint,
				// the move is simply cancelled:handled by putDown().
				MouseAction.putDown(gridPoint);
			}
		}
	} 
	
};

// Mouse move or touch move
MouseAction.handleMouseMove = function ( x, y)
{
    
	if(GlobalConstants._dragAndDrop)
	{
		var imgpoint = MouseAction.removeCanvasOffset( x , y  );

		if( MouseAction.selectedChess !=undefined )
		{
			MouseAction.selectedChess.setImageXY( imgpoint.x , imgpoint.y );
			MouseAction.setLineTo( imgpoint.x , imgpoint.y );
			GlobalConstants.setNeedRefresh();

		}
	}else
	{
		
	}

};

// draw the on moving chess
MouseAction.drawOnMoveChess = function ()
{
	var chess = MouseAction.selectedChess;
	if( chess != undefined )
	{
		// GlobalConstants._context.scale(1.2, 1.2);
		return chess.drawImage();// 
	}
	// var x = this.lastMove.imageX, y= this.lastMove.imageY ;
	 
	 
};


// same for touch start, mouse down
MouseAction.handleMouseDownOrTouchStart  = function (x,y )
{
	if( MouseAction.handleMouseDown (x,y ) )
	{
		logger.addLog("handleMouseDown done, return");
		return ;

	}else if( _turnIcon.onClick( x, y ) )
	{
		logger.addLog("_turnIcon.onClick done, return");
		return ;

	}
	else if ( _buttonRestart.onClick( x, y ) )
	{
		logger.addLog("_buttonRestart.onClick done, return");
		return;

	}
	else 
	{
		logger.addLog("_buttonRotate.onClick done, return");
		_buttonRotate.onClick( x, y );
	};

     

};

MouseAction.drawImage = function()
{ 
	if(GlobalConstants._dragAndDrop)
	{	
		MouseAction.drawChessMoveLine();
		// draw the on move chess to cover the other chess(KIA)
		return MouseAction.drawOnMoveChess();
		
	}else // touch move ================================================
	{
	    // touch move only draw line when chess is moved and being putdown
		// if(MouseAction._touchMoveStatus == MouseAction.statusPutdown)
		
		if(MouseAction.selectedChess==undefined)
		{
		    // no chess is selected, no line is needed
			return;
		}
		if(MouseAction.selectedChess.chessStatus == Chess._chessStatusMoving)
		{
			MouseAction.drawChessMoveLine(); 	
		} 
		 
		// draw it to cover other chess
		return MouseAction.drawOnMoveChess();
	}
    
};

 


var _turnIcon;



// ===============================================================================
// class definition ChessBoard
// ===============================================================================
function ChessBoard()
{
    
    this.boardimage = new Image();
    this.boardimage.src = "images/chessboard.png";
    
    this.chessPositionArray;
    this.redRotationDegree = 0;
    this.blackRotationDegree = 180;
    // red start first ? black start 2nd ?
	this.startSide = GlobalConstants._sideIdRed;
	this.sideTurn = undefined;
    this.lastMove;
    if( _turnIcon == undefined ) 
    {
        _turnIcon = new TurnIcon( 478, 22 );
    }
    // _turnIcon.updateImagePath();
    
    
    this.initChessBoard = function()
    {
    	this.isGameOver = false;
    	 
    	// 2 player, turn by turn, side switch.
    	this.sideTurn = this.startSide; 
    	
    	// after one game is over, change the 1st hand to move.

    	
    	this.boardPositionIndexMax = GlobalConstants._boardGridCountX  * GlobalConstants._boardGridCountY ;
        this.chessPositionArray = new Array( this.boardPositionIndexMax  );
         
        _turnIcon.updateImagePath();
        
         
    };
    
    this.changeSide = function ( )
    {
    	if( this.sideTurn == undefined ) 
    	{  
    		this.sideTurn = GlobalConstants._sideIdRed; 
    	}
    	else if ( this.sideTurn == GlobalConstants._sideIdRed ) 
    	{
    		this.sideTurn = GlobalConstants._sideIdBlack;
    	}else
    	{
    		this.sideTurn = GlobalConstants._sideIdRed;
    	};
    };
    
    this.getChessPositionArray = function()
    {
       return this.chessPositionArray;
        
    };
 
    // drawBoard
    this.drawImage = function ()
    {  
    	
    	if(this.boardimage.width == 0)
    	return false;
    	GlobalConstants._context.drawImage(this.boardimage, 0, 0); 		
    	this.drawLastMoveMark();
    	 
    	return true;
    };
     
    
    this.getChessInGridXY = function  ( x, y )
    {
    	if ( ChessBoard.isValidPoint(x,y) )
    	{        
    		var yy = y-1;
    		var xx = x-1;
    		var array;
    		array = this.getChessPositionArray();
    		if(array==null||array==undefined) 
    		{
    			return;
    		}
    		return array[ xx + yy* GlobalConstants._boardGridCountX   ];
    	}
    	else
    	{
    		alert("wrong board position, x: "+x +" y: "+y);
    	} 
    };
  
     this.putChessInGridXY = function  ( chess, x, y )
     {
     
          var array = this.getChessPositionArray();
          array [ (x-1)+ (y-1)* GlobalConstants._boardGridCountX]= chess;
     };
     
  // move chess from chess' current position to point
  this.moveChessTo = function ( chess , point)
  {
       if( chess==undefined)
       {
           return;  
       } 
       if( !ChessBoard.isValidPoint( point) )
       {
           return;
       }
       
       // Remove chess from orig position
       this.putChessInGridXY( undefined , chess.boardPositionX, chess.boardPositionY );
       
       // move chess to new position
       this.putChess( chess, point );
       //
  };
  
  
  this.putChess= function ( chess , point)
  {
       if( chess==undefined)
       {
           return;  
       } 
       if( !ChessBoard.isValidPoint( point) )
       {
           return;
       }
         
       chess.setPosition (point.x, point.y) ;
       
       var kiaChess = this.getChessInGridXY(point.x, point.y) ;
              
       if( kiaChess != undefined )
       {
            this.handleKIAChess ( kiaChess );
            _userInfoLabel.showMessage("Attacked and captured!!!");
       }
       this.putChessInGridXY( chess ,  point.x, point.y);
           
       
  };
  
  
  // because we now have more and more chess kia, so there is not enough space
  // to put them like OOOOOOOO.
  // must overlap. recac all X; keep Y
  this.updateExistingChessImageX = function ( kiaArray  )
  {
	  var kiaChessCount =  kiaArray.length;
	  var width =  ( GlobalConstants._chessBoardSideBarWidth ) / (kiaChessCount+1) ;
	  var i;
	  var tempchess;
	  for(i=0; i<kiaChessCount; i++ )
	  {
		  tempchess = kiaArray[i];
		  tempchess.imageX = GlobalConstants._chessBoardSideBarImageXStart + i* width;
	  };
	  
	  
  };
  
  
  this.refreshAllKIAChessImageXY = function ( side )
  {
	  var kiaArray = Chess.getChessArrayKIA( side );
	  var currentKIAChessN = kiaArray.length;  
	  
	  if( currentKIAChessN  <=0 )
	  {
		  // no chess is KIA , nothing to refresh
		  return ;
	  }
	  
      var lastchess = kiaArray[ currentKIAChessN-1 ] ;
      var x,y;
      if( side == Chess._sideIdRed )
	  {
		  
    	  y  = GlobalConstants._chessBoardSideBarRedImageY;
		 
	  }
	  else
	  {
		  y = GlobalConstants._chessBoardSideBarBlackImageY;
	  };
	  
       
	  if ( currentKIAChessN  <=  GlobalConstants._spaceGoodForNChess )
	  {
		  x =  GlobalConstants._chessBoardSideBarImageXStart + 
	       GlobalConstants._chessBoardSideBarImageXWidth * (currentKIAChessN-1);
		   
		  lastchess.setImageXY( x , y );
		  return;
	  }
	  else
	  {
		  // right now we have only y. x need to be done
		  lastchess.setImageXY( 0 , y );
		   
		  this.updateExistingChessImageX( kiaArray  );
	  }
		 
	  
  };
  
  /*
     * this.getKIAChessImageXY = function ( KIAchess ) { var x, y; var kiaArray =
     * Chess.getChessArrayKIA( KIAchess );
     * 
     * 
     * if( kiaArray.length < 1 ) { //since there is no KIAChess, this is invalid
     * call //must at least has one KIA Chess, this chess return null; }
     * 
     * //if space is enough, place like this OOOOOOOOOOO //if space is not
     * enough, place chess overlap // spaceGoodFor chess
     * //GlobalConstants._spaceGoodForNChess if( kiaArray.length <=
     * GlobalConstants._spaceGoodForNChess ) { //enough space to place chess
     * like this OOOOOOOOO x = GlobalConstants._chessBoardSideBarImageXStart +
     * GlobalConstants._chessBoardSideBarImageXWidth * (kiaArray.length-1); }
     * else { //not enough space overlap }
     * 
     * 
     * if( ) if( KIAchess._side == Chess._sideIdRed ) {
     * 
     * y = GlobalConstants._chessBoardSideBarRedImageY; } else { y =
     * GlobalConstants._chessBoardSideBarBlackImageY; };
     * 
     * 
     * //GlobalConstants._chessBoardSideBarImageXWidth = 50 ;
     * //GlobalConstants._chessBoardSideBarRedImageYStart = 50 ;
     * //GlobalConstants._chessBoardSideBarBlackImageYStart = 850 ;
     * 
     * 
     * 
     * var point = new Point(x,y); return point; };
     * 
     */
  
  
  this.handleKIAChess = function ( KIAchess )
  {
        
       // KIAchess.chessStatus = Chess._chessStatusKIA;
	  KIAchess.setChessStatus(Chess._chessStatusKIA);  
       kiaArray = Chess.getChessArrayKIA( KIAchess._side ); 
       kiaArray.push( KIAchess );
       
       this.refreshAllKIAChessImageXY( KIAchess._side );
       
       
       // 
       /*
         * var kiaChessImageXY = this.getKIAChessImageXY( KIAchess );
         * 
         * 
         * var imgx, imgy;
         * 
         * imgx = kiaChessImageXY.x; imgy = kiaChessImageXY.y;
         * 
         * 
         * imgx = GlobalConstants._chessBoardSideBarImageX +
         * (GlobalConstants._chessImageWidth+3) * ((KIAlistLen -1) %
         * (GlobalConstants._chessBoardSideBarRowChess ) );
         * 
         * imgy = GlobalConstants._chessBoardSideBarImageY +
         * (GlobalConstants._chessImageWidth - 5 ) * (parseInt( (KIAlistLen-1) /
         * (GlobalConstants._chessBoardSideBarRowChess))) ;
         */
    
       // logger.addLog( "handle attacked chess: " + Chess.getChessName(
		// KIAchess._chessId )+ " :"+imgx +" " + imgy ) ;
       
       // KIAchess.setImageXY( imgx , imgy );
     
  };
  
  
  this.putChessInitPosition = function ( side, chessIndex ,  x, y )
  {             
      var numby = ChessBoard.getGridYNumber( y); 
      var tmp_chess = Chess.getChess ( side, chessIndex ) ;
      // tmp_chess.chessStatus = Chess._chessStatusActive;
      tmp_chess.setChessStatus(Chess._chessStatusActive);
      
      var point = new Point(x,numby);
      
      
      tmp_chess.homeX = 5;
      
      // each chess' homeY must be 1 or 10;
      if( side == Chess._sideIdBlack )
      { 
          tmp_chess.homeY = 1;
          
      }else
      {
           tmp_chess.homeY = GlobalConstants._boardGridCountY  ;
      }
      
      this.putChess( tmp_chess, point);       
      // alert ( "wrong index , side or position");
  };
  
 
  // true : allow ( empty slot or enemy)
  // false : not allow ( attacking own side)
  this.isAttackOwnSideRuleChecking = function ( chess, pointTo )
  {
      var destChess = this.getChessInGridXY( pointTo.x, pointTo.y);
      if( destChess == undefined )
      { 
         logger.addLog( "empty dest slot");
         // empty slot
         return true;
      }
      
      if ( destChess._side != chess._side )  
      {
         logger.addLog( "enemy slot");
         // enemy, allowed
         return true;
      }
      
      logger.addLog( "attack same side not allowed");
      // not allowed
      return false;
    
  };
  
  
  
  this.ruleChecking = function( chess, pointTo )
  {
      if( GlobalConstants._debug  ) return true;
      
	  if( chess._side != this.sideTurn )
      {
    	  // not your turn
		  var info = "Rule Checking: not your turn";
		  _userInfoLabel.showMessage(info); 
		  logger.addLog(info);       
    	  return;
      }
      else
      {
    	  logger.addLog( "Rule Checking passed: your turn");
      }
	  var pointFrom = new Point(chess.boardPositionX , chess.boardPositionY );
     
     if( this.isAttackOwnSideRuleChecking( chess, pointTo) == false )
     {
    	 _userInfoLabel.showMessage("Attacking own side is NOT allowed.");
    	 // _userInfoLabel.textContent=getTime()+" Info: Attacking own side
            // is NOT allowed.";
    	 // attack own side is NOT allowed.
        return false;
     }
     var result=false;
     switch ( chess._chessId )
     {
         case Chess._chessIdJiang: result=this.ruleCheckingJiang(chess, pointFrom, pointTo ); break;
         case Chess._chessIdShi:   result=this.ruleCheckingShi(chess, pointFrom, pointTo   ); break;
         case Chess._chessIdXiang: result=this.ruleCheckingXiang(chess, pointFrom, pointTo ); break;
         case Chess._chessIdChe:  result=this.ruleCheckingChe(pointFrom, pointTo ); break;
            
         case Chess._chessIdMa:  result=this.ruleCheckingHorse(pointFrom, pointTo ); break; 
         case Chess._chessIdPao: result=this.ruleCheckingCannon(pointFrom, pointTo ); break; 
         case Chess._chessIdBing: result=this.ruleCheckingBing(chess, pointFrom, pointTo); break;
              
         default:
        	 result=false;
           alert("ruleChecking() wrong id: " + chess._chessId);
     }  
     if( !result )
     {
    	 var info = "ruleChecking: Movement NOT allowed"
    	 // _userInfoLabel.showMessage(info);
         logger.addLog(info);
     }
     return result;
    
  };
  
  
  this.ruleCheckingCannon = function (pointFrom, pointTo )
  {
       if( pointFrom.x != pointTo.x && pointFrom.y!=pointTo.y  )
      {
         logger.addLog( "straight line needed. Not allowed");       
         return false;
      }
      var targetchess =  _chessBoard.getChessInGridXY( pointTo.x, pointTo.y)  ;
      
      var blockingChessNumber = this.roadBlockedChecking( pointFrom, pointTo );
      
      // atack or move ?
      if( targetchess != undefined)
      {
          // is attack : can be blocked by one chess
          if( blockingChessNumber != 1 )
          {
               var info = ( "Cannon Attack:Must have only 1 blocking chess");
				_userInfoLabel.showMessage(info); 
				logger.addLog(info);
               return false;
          }
      }
      else
      {
          // is moving
          if( blockingChessNumber != 0 )
          {
               var info = "Cannon move: road is blocked by other chess";
               _userInfoLabel.showMessage(info);
               logger.addLog(info);
               return false;
          }
      }
      return true;
    
  };
  
  this.ruleCheckingHorse = function (pointFrom, pointTo )
  {
      var distanceX, distanceY;
      distanceX = Math.abs( pointFrom.x - pointTo.x );
      distanceY = Math.abs( pointFrom.y - pointTo.y );
      
      if( distanceX==0 || distanceY == 0 )
      {
          logger.addLog( "house movement only: straight line not allowed");
          return false;
      }
      
      if (( distanceX + distanceY ) !=3 )
      {
          logger.addLog( "house movement only");
          return false;
      }
      
      // Horse road blocked ??
      var detectpoint ;
      
      if( distanceX== 1 )
      {
          // checking Y
          detectpoint = new Point( pointFrom.x, pointFrom.y + ( (pointTo.y-pointFrom.y)/2 ) );
           
      }else
      {
          // checking X
          detectpoint = new Point( pointFrom.x + ( (pointTo.x-pointFrom.x)/2 ) ,  pointFrom.y);
          
      }
      var blockingChess =  _chessBoard.getChessInGridXY( detectpoint.x, detectpoint.y);
      if( blockingChess != undefined )
      {
           logger.addLog( "house movement is blocked:" + detectpoint.x + ","+ detectpoint.y );
           return false;
      }
      return true;
  	
  };
  
  
  this.ruleCheckingLeavePalace = function( chess, pointFrom, pointTo )
  {
       if ( Math.abs( pointTo.x - chess.homeX ) > 1 )
       { 
           logger.addLog( "can not leave palace");
           return false;       	
       }
       if ( Math.abs( pointTo.y - chess.homeY ) > 2 )
       { 
           logger.addLog( "can not leave palace");
           return false;
       }
       return true;
  };
  
  
  this.ruleCheckingShi = function( chess, pointFrom, pointTo )
  {
      
       if( !this.ruleCheckingLeavePalace( chess, pointFrom, pointTo ) )
       { 
           return false;
       }
        
      if (  (Math.abs( pointFrom.x - pointTo.x )!=1)   ||    
            (Math.abs( pointFrom.y - pointTo.y )!=1) 
         )   
       { 
           logger.addLog( "move diagonally only: 1");
           return false;       	
       }
       
       return true;
  	
  }
  
  
  this.ruleCheckingXiang = function( chess, pointFrom, pointTo )
  {
       
        
      if (  (Math.abs( pointFrom.x - pointTo.x )!=2)   ||    
            (Math.abs( pointFrom.y - pointTo.y )!=2) 
         )   
       { 
           logger.addLog( "move diagonally only: 2 ");
           return false;       	
       }
       
       if (  Math.abs(pointTo.y- chess.homeY) > GlobalConstants._crossedRiverDistanceFromHomeY )
       {
            logger.addLog( "cross river not allowed");
            return false;
       }
       
       var detectpoint = new Point( pointFrom.x + ( (pointTo.x-pointFrom.x)/2 ) ,  pointFrom.y + (pointTo.y-pointFrom.y)/2);
       var blockingChess =  _chessBoard.getChessInGridXY( detectpoint.x, detectpoint.y);
       if( blockingChess != undefined )
       {
            logger.addLog( "elephant movement is blocked:" + detectpoint.x + ","+ detectpoint.y );
            return false;
       }
       
       return true;
  	
  };
  
  this.ruleCheckingJiang = function( chess, pointFrom, pointTo )
  {
       if( !ChessBoard.isAdjacentSlot( pointFrom, pointTo) )
       {
           logger.addLog( "adjacent slot only");
         return false;
       }
       
       return this.ruleCheckingLeavePalace( chess, pointFrom, pointTo );
/*
 * if ( Math.abs( pointTo.x - chess.homeX ) > 1 ) { logger.addLog( "can not
 * leave palace"); return false; } if ( Math.abs( pointTo.y - chess.homeY ) > 2 ) {
 * logger.addLog( "can not leave palace"); return false; }
 * 
 * 
 * return true;
 */
    
    
  };
  
  
  this.ruleCheckingBing = function(chess, pointFrom, pointTo)
  {
       if( !ChessBoard.isAdjacentSlot( pointFrom, pointTo) )
       {
           logger.addLog( "adjacent slot only");
         return false;
       }
       
       
       // forward only
       var oldDistanceFromHome =  Math.abs(pointFrom.y - chess.homeY );
       var newDistanceFromHome =  Math.abs(pointTo.y - chess.homeY );
       if( newDistanceFromHome < oldDistanceFromHome )
       {
           logger.addLog( "backward not allowed");
           return false;
       }
       
       if(( Math.abs(pointFrom.y - chess.homeY) ) >= GlobalConstants._crossedRiverDistanceFromHomeY )
       {
            // crossed river
            logger.addLog( " crossed river ");
            
       }
       else
       {
            // not crossed river
            logger.addLog( " not crossed river:Y movement only ");
            // can not make x movement
            if( pointFrom.x != pointTo.x )
            {
                logger.addLog( "X movement not allowed");
                return false;
            }
            else
            {
                // fine.
            }
            
       }
       
       return true;
  	
  };
  
  this.ruleCheckingChe = function( pointFrom, pointTo )
  {
      
      if( pointFrom.x != pointTo.x && pointFrom.y!=pointTo.y  )
      {
         logger.addLog( "straight line needed. Not allowed");       
         return false;
      }
      
      if( this.roadBlockedChecking( pointFrom, pointTo ) > 0 )
      {
          logger.addLog( "road is blocked"); 
         return false;
      }
      return true;
    
  };
  
  
  
  this.roadBlockedChecking = function( pointFrom, pointTo)
  {
      var blockingChessNum;
      if( pointFrom.x != pointTo.x && pointFrom.y != pointTo.y )
      {
           logger.addLog("not in one line");
           return undefined;
      }
      
      blockingChessNum = 0;
      if( ChessBoard.isAdjacentSlot( pointFrom, pointTo) )
      {
          // adjacent slot, not blocked
          return blockingChessNum;
      }
      
      if( pointFrom.x == pointTo.x)
      {
        	var i;
           var fromY, toY;
           if( pointFrom.y < pointTo.y)
           {
              fromY = pointFrom.y ;
              toY = pointTo.y ;              
           }
           else
           {
               fromY = pointTo.y ;           	
              toY = pointFrom.y ;
           }
           
           for(i=fromY+1;i<toY;i++)
           {
                chess = _chessBoard.getChessInGridXY( pointFrom.x, i );
                if( chess!=undefined)
                {
                    blockingChessNum++;
                    logger.addLog( "road is blocked by Y " + blockingChessNum);
                }
                
           }
      }
      
      if( pointFrom.y == pointTo.y)
      {
        	var i;
           var fromX, toX;
           if( pointFrom.x < pointTo.x)
           {
              fromX = pointFrom.x ;
              toX = pointTo.x;              
           }
           else
           {
               fromX = pointTo.x ;
              toX = pointFrom.x ;
           }
           
           for(i=fromX+1;i<toX;i++)
           {
                chess = _chessBoard.getChessInGridXY( i, pointFrom.y);
                if( chess!=undefined)
                {
                    logger.addLog( "road is blocked by X " + blockingChessNum);
                    blockingChessNum++;
                }
                
           }
      }
      
      return blockingChessNum;
  };
  
  this.checkRuleAndMoveChessTo = function (  chess , pointTo )
  {
      if ( this.isGameOver )
      {
    	  // already game over. do not allow any new movement
    	  return;
      }
	  if( this.ruleChecking( chess, pointTo ) )
      {
         this.moveChessTo( chess  , pointTo);
         this.lastMove = chess;
         this.switchSide();
         _turnIcon.updateImagePath();
      }
      
  };
  
  this.checkWin = function ()
  {
	  var king = Chess.getChess ( Chess._sideIdRed ,  Chess._chessIndexJiang );
	  var winside ;
	  if( king.chessStatus == Chess._chessStatusKIA )
	  {
		  winside = "Black";
		  
	  }else
	  {
	  
	     king = Chess.getChess ( Chess._sideIdBlack ,  Chess._chessIndexJiang );
	  
     	 if( king.chessStatus == Chess._chessStatusKIA ) 
         {
		     winside = "Red";
         }
	  }
	  if( winside != undefined )
	  {
		  this.isGameOver = true;
		  alert( winside + " Wins! Congratulations!!   \n\n GAME OVER");
		  
	  }
	    
  };
  
  
  this.switchSide = function ( )
  {
  	if( this.sideTurn == Chess._sideIdRed )
  	{
  		this.sideTurn = Chess._sideIdBlack;
  		_redTimer.stop();
  		_blackTimer.start();
  		
  	}else
  	{
  		this.sideTurn = Chess._sideIdRed;
  		_blackTimer.stop();
  		_redTimer.start();
  	}
  	
  	
  };
  
  
  this.restart = function ()
  {
/*
      _renderEngine.addRenderObjArray(Chess.getChessArray(Chess._sideIdRed));  
      _renderEngine.addRenderObjArray(Chess.getChessArray(Chess._sideIdBlack));
      _renderEngine.addRenderObj(_turnIcon);
      _renderEngine.addRenderObj(MouseAction);
  */    
        _renderEngine.initRenderObjForChessGame();
        
      
        GlobalConstants._runDemo = false;
        
        //for chess game, turn on power saving mode
        GlobalConstants._powerSaving = true;
	    this.lastMove = undefined;
	    
	    _blackTimer.stop();
	    _redTimer.stop();
	    _redTimer.reset();
	    _blackTimer.reset();
	    if( this.sideTurn == undefined )
	    {
	    	 this.startSide = this.startSide = GlobalConstants._sideIdRed;
		    _redTimer.start();
	    }
	    else if( this.startSide ==  GlobalConstants._sideIdRed )
	    {
	    	this.startSide = GlobalConstants._sideIdBlack;
	    	_blackTimer.start();
	    }
	    else
	    {
	    	this.startSide = GlobalConstants._sideIdRed;
	    	_redTimer.start();
	    }; 
        this.initChessBoard(); 
	    initChessPositionOnBoardBlack();
	    initChessPositionOnBoardRed(); 
	 
	    GlobalConstants.setNeedRefresh ();
	    _userInfoLabel.showMessage("Game Restarted!");
	  
	    
  };
  
  this.drawLastMoveMark = function()
  {
	  if( this.lastMove == undefined ) return;
	  
	  
	  var x = this.lastMove.imageX, y= this.lastMove.imageY  ;
	  
	  
	  
	  GlobalConstants._context.beginPath();
	  GlobalConstants._context.arc(x, y, GlobalConstants._chessImageWidth/2, 0, Math.PI * 2, false);
	  
	  GlobalConstants._context.stroke();
	  GlobalConstants._context.closePath();
	  
	  
  };
  
}

 // input A B ...J, return 1, 2, ...9
  ChessBoard.getGridYNumber = function _getGridYNumber ( y )
  {
     if( y >='A' && y<='J')
     {
        return y.charCodeAt() - ('A'.charCodeAt() )+1  ;
     }
     else
     {
        alert ( "_getGridYNumber() wrong y : "+ y );
     }
  };
  
  

ChessBoard.getBoardGridX = function ( imagex )
{
   var choosablefield = 0.80; // 80% of the chess is choosable.
   var chooseAdjustment =  GlobalConstants._chessImageWidth*choosablefield/2;
   
   if(  imagex <= GlobalConstants._boardGridRegionOffsetX - chooseAdjustment  )
   {
      return 0;
   }
   
    
   if ( imagex >= ( GlobalConstants._boardGridRegionOffsetX + GlobalConstants._boardGridRegionWidthX +chooseAdjustment ) )
   {
     return 0;
   }
   
   var gridX = 1+(imagex-GlobalConstants._boardGridRegionOffsetX )/GlobalConstants._boardCellWidth ;
   
   return gridX; 
   
};


ChessBoard.getBoardGridY = function ( imagey )
{
   var choosablefield = 0.80; // 80% of the chess is choosable.
   var chooseAdjustment =  GlobalConstants._chessImageWidth*choosablefield/2;
   
   if(  imagey <= GlobalConstants._boardGridRegionOffsetY - chooseAdjustment  )
   {
      return 0;
   }
   
    
   if ( imagey >= ( GlobalConstants._boardGridRegionOffsetY + GlobalConstants._boardGridRegionWidthY +chooseAdjustment ) )
   {
     return 0;
   }
   
   // GlobalConstants._riverExtraWidth = 8;
   // GlobalConstants._riverGridId= 5 ; // A(1) - E(5)
   var crossedRiverY =  GlobalConstants._boardGridRegionOffsetY+ (GlobalConstants._riverGridId-1) * GlobalConstants._boardCellWidth + GlobalConstants._boardCellWidth/2;
   
   // alert ( "crossedRiverY is "+crossedRiverY );
   var river = 0;
   if( imagey >  crossedRiverY  )
   {
      river = GlobalConstants._riverExtraWidth;
      // alert(river );
   }
   
    var gridY = 0;
    // alert( river );
    if( river == 0 ) 
    { 
       // alert( gridY );
       gridY = 1+ (  imagey - GlobalConstants._boardGridRegionOffsetY )/GlobalConstants._boardCellWidth ;
       // alert( gridY );
    }
    else
    {
       gridY =  1+GlobalConstants._riverGridId+
         (  imagey - GlobalConstants._boardGridRegionOffsetY - river - GlobalConstants._riverGridId * GlobalConstants._boardCellWidth  ) /GlobalConstants._boardCellWidth ;
    }
    // debugAlert (gridY);
    
    return gridY;
    
};




ChessBoard.isValidPoint= function( point)
{
   if( point.x< 1) return false;
   if( point.x > GlobalConstants._boardGridCountX ) return false;
   if( point.y < 1 )  return false;
   if( point.y >  GlobalConstants._boardGridCountY ) return false;
   return true;
   
}


ChessBoard.isAdjacentSlot = function(pointFrom, pointTo)
  {
      var distance = Math.abs( pointFrom.x - pointTo.x) + Math.abs(pointFrom.y-pointTo.y);
      if( distance <=1)
      {
            logger.addLog("is adjacent slot");
           return true;	
      }
      else
      {	
         return false
      } 
  };
  
 

// ===============================================================================
// End of Class definition ChessBoard
// ===============================================================================





var TurnIcon = function ( x, y   )
{
     
    // this.turn = side ;
    this.image = new Image();     
    this.enabled = true;
    this.x = x;  
    this.y = y;  
    this.charOrSymbol = true;
    
    /*
     * this.setTurn = function ( side ) { this.turn = side;
     * this.updateImagePath(); };
     */
    
    this.setImagePath = function ( imagepath )
    {
    	this.image.src = imagepath;
      // this.width = this.image.width;
      // this.height = this.image.height;
    	
    };
    
    
    
    this.draw = function ()
    {
    	if( this.image.width != 0 )
    	{
    		 GlobalConstants._context.drawImage( this.image, this.x, this.y   ) ;
    		 return true; 
    	}
    	return false;
    
    };
    
    this.drawImage=function()
    {
    	 
    	return this.drawTurnIconRotation();
    	
    };
     
    this.drawTurnIconRotation = function ()
    {
    	 
    	var x = this.x;
    	var y = this.y;
    	if( this.image.width == 0 || this.image.height ==0  )
    	{
    		logger.addLog("Image Load NOT finished");
    		return false;
    	}
    	GlobalConstants._context.save();
    	GlobalConstants._context.translate( x + this.image.width/2 ,
    			                            y + this.image.width/2 );
    	var rotateDegree;
    	if( _chessBoard.sideTurn ==  GlobalConstants._sideIdRed ) 
    	{		    
    		rotateDegree =  _chessBoard.redRotationDegree;    
    	}
    	else
    	{
    		rotateDegree =  _chessBoard.blackRotationDegree;
    	}
    	GlobalConstants._context.rotate( rotateDegree * Math.PI/180);

 
    	GlobalConstants._context.drawImage( this.image, 0-   this.image.width/2, 
    			0 -  this.image.width/2  ) ;

    	GlobalConstants._context.restore();
        return true;

    };
 
	   
    this.switchCharOrSymbol = function ()
    {
    	this.charOrSymbol = ! this.charOrSymbol;
    	this.updateImagePath() ;
    	
    };
    
    this.getImageForCharOrSymbol = function ()
    {
    	var imagename;
    	var side = _chessBoard.sideTurn;
    	if( side == Chess._sideIdRed )
    	{
    		if( this.charOrSymbol )
    		{
    			imagename ="rturn.png"	;
    		}
    		else
    		{
    			imagename = "rturni.png"	;
    		}
    	}else
    	{
    		if( this.charOrSymbol )
    		{
    			imagename = "bturn.png"	;
    		}
    		else
    		{
    			imagename = "bturni.png"	;
    		}
    		
    	}
    	 
    	return GlobalConstants.imagePath + imagename;
    };
    
   
    
    
    
    
    this.onClick = function ( mouseX, mouseY )
    {
    	 
    		 
    	logger.addLog("TurnIcon Onclick checking ");
    	var distanceX =  mouseX - ( this.x+ this.image.width/2) ;
    	var distanceY =  mouseY - ( this.y+ this.image.width/2) ;
    	var distance =  Math.sqrt( distanceX* distanceX + distanceY*distanceY);

    	if( distance < this.image.width/2 )
    	{
    		logger.addLog("click on TurnIcon");
			 _userInfoLabel.showMessage("switch to Chinese Characters/Symbols"); 
    		this.switchCharOrSymbol();
    		changeIcon();


    	}
    	else
    	{

    		return false;
    	}


    	return false;
    	
    };

    
    this.updateImagePath = function( )
    {
    	this.setImagePath( this.getImageForCharOrSymbol() );
    	 
    	
    };
    
    
    
   
};

 



// =====================================================================================================
var ButtonRestart = function ( x, y )
{
	this.x = x;
	this.y = y;
	this.image = new Image();
	this.image.src = GlobalConstants.imagePath + "Restart.png";
	
	this.drawImage = function()
	{
	   return this.draw(); 	
	};
	
	this.draw = function ()
	{
		if( this.image.width != 0 )
    	{
    		 GlobalConstants._context.drawImage( this.image, x, y ) ;
    		 return true; 
    	}
    	return false;
	};
	
	
	this.onClick = function ( mouseX, mouseY )
	{
		logger.addLog("Onclick checking Restart");
		var distanceX =  mouseX - this.x ;
		var distanceY =  mouseY - this.y ;
		if( distanceX < this.image.width  && distanceX >0   &&  
			distanceY>0 && distanceY < this.image.height    )
		{	
		   logger.addLog("Game Restart");
		   if( confirm("Restart Game ?") )
		   {
			   _chessBoard.restart();
		   }
		   // clicked on this button
		   return true;
		}
		else
		{
		   logger.addLog("Not click on Retart");
		   return false;
		}
		
	};
};

var _buttonRestart ;
// =====================================================================================================
	
	




// =====================================================================================================
var ButtonRotate = function ( x, y )
{
	this.x = x;
	this.y = y;
	this.image = new Image();
	this.image.src = GlobalConstants.imagePath + "rotate.png";
	
	this.drawImage = function()
	{
	    return this.draw();
	};
	
	this.draw = function ()
	{
		if( this.image.width != 0 )
		{
			GlobalConstants._context.drawImage( this.image, x, y ) ;
			// logger.addLog("draw rotation icon");
			return true; 
		}
		return false;
	};
	
	
	this.onClick = function ( mouseX, mouseY )
	{
		logger.addLog("Onclick checking Rotate");
		var distanceX =  mouseX - this.x ;
		var distanceY =  mouseY - this.y ;
		if( distanceX < this.image.width  && distanceX >0   &&  
			distanceY>0 && distanceY < this.image.height    )
		{	
		    
		   if( _chessBoard.sideTurn ==  GlobalConstants._sideIdRed )
		   {
			   logger.addLog("RotateRed");
			   
			   _userInfoLabel.showMessage("Red Chess images rotated");
			   _chessBoard.redRotationDegree = _chessBoard.redRotationDegree + 45;
			   Chess.setAllChessRotate(_chessBoard.sideTurn, _chessBoard.redRotationDegree)
		   }
		   else
		   {
			   logger.addLog("RotateBlack");
			   _userInfoLabel.showMessage("Black Chess images rotated");
			   _chessBoard.blackRotationDegree = _chessBoard.blackRotationDegree + 45;
			   Chess.setAllChessRotate(_chessBoard.sideTurn, _chessBoard.blackRotationDegree)
		   }
		    
		    
		   GlobalConstants.setNeedRefresh(); 
		   return true;
		}
		else
		{
		    
		}
		return false
		
	};
};
// =====================================================================================================
var _buttonRotate ; 


 

var _fpsInfoLabel;// = document.getElementById( "fpsInfo" );
var _userInfoLabel;

function refreshFrame()
{
    
    if( GlobalConstants._powerSaving == true )
     {
         if( !GlobalConstants.isNeedRefresh() )
         {          
             return;
         }
     } 
	
	 if(GlobalConstants._runDemo) 
	 {
		 MovingObj.updateAllPosition();
	 }
	 _renderEngine.drawAll();   
	 refreshFrame.frameCount++;
	 
	 /*
         * var currentTime = new Date(); //var timePassed =
         * (currentTime.getTime()- refreshFrame.startTime.getTime())/1000; var
         * timePassed = (currentTime.getTime()-
         * refreshFrame.startTime.getTime());
         * 
         * 
         * var fps = parseInt(refreshFrame.frameCount*1000/timePassed);
         * GlobalConstants._context.font = "16px ariel";
         * GlobalConstants._context.fillText(refreshFrame.frameCount + "
         * frames@fps:"+fps, 50, 888);
         * 
         * _fpsInfoLabel.textContent= refreshFrame.frameCount + "
         * frames@fps:"+fps;
         */
}

function refreshFramebak()
{
	
	
     if( GlobalConstants._powerSaving == true )
     {
         if( !GlobalConstants.isNeedRefresh() )
         {
           
             return;
         }
     } 
       
      var currentTime = new Date();
      var timePassed = (currentTime.getTime()- refreshFrame.startTime.getTime())/1000;
      _chessBoard.drawImage();
      
      _chessBoard.drawLastMoveMark();
      if( ! drawAllChess() )
      {
    	  // previous drawAllChess is not success because image load not
			// finish,
    	  // try it next time : do not skip next refresh
    	  GlobalConstants.setNeedRefresh();
    	  logger.addLog("refresh not success, must draw next frame");
      }
      
     
      
      if( ! _turnIcon.drawImage() )
      {
    	  // previous drawAllChess is not success because image load not
			// finish,
    	  // try it next time : do not skip next refresh
    	  GlobalConstants.setNeedRefresh();
    	  logger.addLog("TurnICON refresh not success, must draw next frame"); 	  
      };
      
      if( ! _buttonRestart.draw() )
      {
    	  GlobalConstants.setNeedRefresh();
    	  logger.addLog("TurnICON refresh not success, must draw next frame");
      }
    		
      _buttonRotate.draw();
      
      
      GlobalConstants._context.font = "15px ariel";
      refreshFrame.frameCount++;
      // var fps = parseInt(frameCount/timePassed);
      // var fps = (refreshFrame.frameCount/timePassed);
      
      {
         GlobalConstants._context.fillText("Frames:"+ refreshFrame.frameCount , 380, 888);
      }
      
      
      
      MouseAction.drawChessMoveLine();
      // draw the on move chess to cover the other chess(KIA)
      MouseAction.drawOnMoveChess();
      
      // logger.addLog( "done Refresh");
       
 
      
}
refreshFrame.startTime = new Date();
refreshFrame.frameCount=0;


 



function startGameEngine()
{ 
	
   
    
    if(!GlobalConstants._runDemo)
	{
		_chessBoard.restart();// remove to do demo
	}
	 
	_renderEngine.intervalId=window.setInterval(refreshFrame, 1000/GlobalConstants._fps);
	_renderEngine._totalFrame = 0;
	
	// in interval function can not use this.xxxxx. must use class.xxx
	
	window.setInterval( RenderEngine.updateFPS, RenderEngine.updateFPSInterval );
	//_userInfoLabel.showMessage("Game Restart!");
}

 


var _introImage;

/*
 * 
 * var _sleepingflag = false; var sleep = function( timems ) {
 * if(!_sleepingflag) { _sleepingflag = true; setTimeout( sleep , timems); }else {
 * _sleepingflag = false; } };
 * 
 */


var _introImage = new Image();
var drawIntroImage = function ()
{
	
 	if( _introImage.width ==0 )
	{ 
		setTimeout(drawIntroImage, 150);
		return;
		
	}else
	{
		GlobalConstants._context.drawImage(_introImage, 0, 0);
		_introImage = null;
	}  
    
};



function introScreen()
{
	
	_introImage.src = "images/loading.png";
	drawIntroImage();
	 
	// allow 2sec to show the intro screen.
	

}

    
function initChessBoardComponents()
{ 
	_renderEngine = new RenderEngine();
	
	_chessBoard  = new ChessBoard();
	_buttonRotate = new ButtonRotate ( 510, 860 );
	_buttonRestart = new ButtonRestart( 465, 945  );
	
	//_renderEngine.initRenderObjForChessGame(); !!!
	  
        
    Chess.createAllChess();
     
 
}


function initCanvas()
{
   // Create a canvas that covers the entire screen:
	GlobalConstants._canvas = document.createElement('canvas');
	var lcanvas = GlobalConstants._canvas ;
	var lcontext;


	lcanvas.width = GlobalConstants._canvasWidth ;
	lcanvas.height = GlobalConstants._canvasHeight;
	logger.addLog( "GlobalConstants._canvasWidth: "+GlobalConstants._canvasWidth + 
			" \nGlobalConstants._canvasHeight "+ GlobalConstants._canvasHeight  );
	document.getElementById('main_canvas').appendChild(lcanvas);

	GlobalConstants._context = lcanvas.getContext("2d");
	GlobalConstants._context.lineWidth = 9;

}


function initPage() 
{
   
	
	if(  GlobalConstants.enableLog  )
	{
       logger.textArea = document.createElement('textarea');
       var textAreaHeight = GlobalConstants._playbookScreenHeight  - 10;
       
       logger.textArea.style.height= textAreaHeight; 
       logger.textArea.style.width =  290;

       logger.textArea.style.float = "right";
       logger.textArea.value ="System log started";
       document.getElementById('logbox').appendChild(logger.textArea);
       
       logger.addLog( "logger.textArea.style.width "+ logger.textArea.style.width );
       logger.addLog( "logger.textArea.style.height "+ logger.textArea.style.height ); 
         
    } 
	
    if( window.blackberry != null )
    {
       logger.addLog("This is BlackBerry");
       MouseAction.isBlackberry = true;
    }else
    {
    	logger.addLog("This is NOT BlackBerry");
    	MouseAction.isBlackberry = false;// !!!
     
    }
    initCanvas();
    introScreen();
    initChessBoardComponents();
    
    _fpsInfoLabel= document.getElementById( "fpsInfo" );
    _userInfoLabel = new MessageLabel("userHelpInfo");
    
    if(GlobalConstants._runDemo) 
    {
    	demo();
    }
	setTimeout(startGameEngine, GlobalConstants._introImageTime); 
	
}



function testBoardSideBar()
{
    var i=0; // Chess._chessCountOneSide
    for( i=0;i< 16 ;i++)
    {
        var arr = Chess.getChessArray( Chess._sideIdRed  );
       _chessBoard.handleKIAChess(  arr [i] );
       
    }
    for( i=0;i< 16 ;i++)
    {
        var arr = Chess.getChessArray( Chess._sideIdBlack  );
       _chessBoard.handleKIAChess(  arr [i] );
       
    }
   

}  


function getChessByIndex ( index )
{
     var chessArray ;
     if ( index < Chess._chessMaxIndex+1 )
     {
         chessArray = Chess.getChessArray( Chess._sideIdRed ) 
         
         
     }
     else
     {
         chessArray = Chess.getChessArray( Chess._sideIdBlack ) 
         index = index - Chess._chessMaxIndex -1;
     }
     return chessArray[index];
     
     
}

function drawAllChess() 
{
	 
    var i = 0;
    var result = true;
    var chess ;
    for( i=0;i< Chess._twoSideChessMax ;i++ )
    {
        chess = getChessByIndex(i);
        
      // if( ! chess.drawChess() )
        if( ! chess.drawChessRotate())
        {
           result = false;
           break;
        }
    }
    
    return result;
    
}








function initChessPositionOnBoardRed(  )
{
    var side = Chess._sideIdRed ;
    _chessBoard.putChessInitPosition( side, Chess._chessIndexJiang, 5, 'J' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexShi1, 4, 'J' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexShi2, 6, 'J' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexXiang1, 3, 'J' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexXiang2, 7, 'J' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexMa1, 2, 'J' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexMa2, 8, 'J' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexChe1, 1, 'J' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexChe2, 9, 'J' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexPao1, 2, 'H' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexPao2, 8, 'H' );
    var i;
    for (i=0;i< Chess._chessBingCount ; i++)
    {
       _chessBoard.putChessInitPosition( side , Chess._chessIndexBing1+i, 1+i*2, 'G' );
    
    }
  
   
}


function initChessPositionOnBoardBlack(  )
{
    var side  = Chess._sideIdBlack ;
    _chessBoard.putChessInitPosition( side , Chess._chessIndexJiang, 5, 'A' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexShi1, 4, 'A' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexShi2, 6, 'A' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexXiang1, 3, 'A' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexXiang2, 7, 'A' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexMa1, 2, 'A' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexMa2, 8, 'A' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexChe1, 1, 'A' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexChe2, 9, 'A' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexPao1, 2, 'C' );
    _chessBoard.putChessInitPosition( side , Chess._chessIndexPao2, 8, 'C' );
    var i;
    for (i=0;i< Chess._chessBingCount ; i++)
    {
       _chessBoard.putChessInitPosition( side , Chess._chessIndexBing1+i, 1+i*2, 'D' );
    
    }
  
   
}


function testBoard()
{
   var x, y;
   var i =0;
   for ( y = 1;y<= GlobalConstants._boardGridCountY;y++)
   {
       for( x=1;x<=GlobalConstants._boardGridCountX;x++)
       {
           
    	   var  chess ;
    	   chess = Chess._chessArrayRed(i ++ );
           if( chess!=undefined)
           {
              // alert( "draw "+ chess._chessId);
              chess.drawChess();
           }
       }
   }
  
}


document.onscroll = function (event )
{
	logger.addLog( "onscroll!!");
	event.preventDefault();
};


 
// ///////////////// like mouse down.
document.ontouchstart = function(event) 
{ 	
	logger.addLog( "ontouchstart!!");
	event.preventDefault();
	
	var touchEvent = event.changedTouches[0];
	MouseAction.handleMouseDownOrTouchStart ( touchEvent.pageX  , touchEvent.pageY  );
	  
    
    
};	

	


document.ontouchmove = function(event) 
{
	if(GlobalConstants._dragAndDrop)
	{
		var touchEvent = event.changedTouches[0];

		// logger.addLog( "OnTouchMove! " + touchEvent.pageX +" "+
        // touchEvent.pageY
		// );
		event.preventDefault();


		// If it's BlackBerry, use TouchEvent, MUST IGNORE all mouse event,
		// otherwise event will be handled twise.
		// if( MouseAction.isBlackberry ) return;


		MouseAction.handleMouseMove( touchEvent.pageX , touchEvent.pageY );
	}else // touch move.
	{
		return;
	}
    
};



// like mouse up
document.ontouchend = function(event) 
{
	logger.addLog( "OnTouchEnd");
    event.preventDefault();
 
	var touchEvent = event.changedTouches[0];
    
    
	MouseAction.handleMouseUp(  touchEvent.pageX  , touchEvent.pageY );
	 
	
};    


// /////////////////

document.onmousedown = function(event) 
{
	// If it's BlackBerry, use TouchEvent, MUST IGNORE all mouse event,
	// otherwise event will be handled twise.
    if( MouseAction.isBlackberry ) return;
    logger.addLog( "OnMouseDown!!");
    
     
    	/*
         * 
         * MouseAction.handleMouseDown( event.clientX ,event.clientY );
         * _turnIcon.onClick( event.clientX ,event.clientY );
         * _buttonRotate.onClick ( event.clientX ,event.clientY );
         * _buttonRestart.onClick( event.clientX ,event.clientY );
         */

    MouseAction.handleMouseDownOrTouchStart (event.clientX, event.clientY);
    	
    
	
};




document.onmousemove = function(event) 
{
	

	if(GlobalConstants._dragAndDrop)
	{
		// If it's BlackBerry, use TouchEvent, MUST IGNORE all mouse event,
		// otherwise event will be handled twise.
		if( MouseAction.isBlackberry ) return;
		// logger.addLog( "On Mouse Move");
		MouseAction.handleMouseMove (  event.clientX  ,event.clientY );
    }
   
}; 


document.onmouseup = function(event) 
{
	// If it's BlackBerry, use TouchEvent, MUST IGNORE all mouse event,
	// otherwise event will be handled twise.
    if( MouseAction.isBlackberry ) return;
	
	logger.addLog( "OnMouseUp");    
    MouseAction.handleMouseUp(  event.clientX  ,event.clientY  ); 
    
};
  






function debugAlert( str )
{
    if( GlobalConstants._debug)
    {
       alert(str);
    }
}      





function changeIcon( pres)
{
 
   var i = 0;
   
   GlobalConstants._icon = !_turnIcon.charOrSymbol ; 
   var chess ;
   for( i=0;i< Chess._twoSideChessMax ;i++ )
   {
       chess = getChessByIndex(i);
       chess.loadImage();
   }
   
   // draw at once after we finish load the new chess image
   drawAllChess();
   GlobalConstants.setNeedRefresh(); 
};




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
		this._intervalId = window.setInterval( this.timerPlus, Timer.interval);	
	     
	};
	
	this.stop = function()
	{
		this._intervalId = clearInterval( this._intervalId );
	};
	
	this.reset = function ()
	{
		_countSec = 0;
		this.updateTimer();
	};
	
	this.updateTimer = function()
	{
		if( _idTag == undefined)  
		{
			_idTag = document.getElementById( this._id );
		} 
		 
		_idTag.textContent = formatTimeToMinSec( _countSec ); 
	};
	
	
	this.timerPlus = function ()
	{
		_countSec ++;
		// can not use this.updateTimer()
		 
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

formatTimeToMinSec = function ( sec )
{
   return formatIntAddZero ( parseInt(sec/60 ) )+ ":"+ formatIntAddZero ( sec%60 );
	
};

formatTimeToMinSecMSec = function ( count , slice )
{
    var secCount = count /(1000/slice); 
    var min = formatIntAddZero ( parseInt(secCount /60 ) );
    var sec = formatIntAddZero ( parseInt(secCount %60)) ;
    var msec100 = (parseInt(secCount*10%10) == 0) ? "*": ""  ; 
    return min + ":" +  sec  + " "+  msec100 ;
           
    	
};



var _redTimer = new Timer("redTimer" );
var _blackTimer = new Timer("blackTimer");



function testRotate()
{
   image = new Image();
   image.src = GlobalConstants.imagePath + "rjiangshuai.png";
   
   GlobalConstants._context.translate( 400, 400 );
   GlobalConstants._context.rotate(90 * Math.PI/180);
   GlobalConstants._context.rotate(  -90 * Math.PI/180);
   GlobalConstants._context.drawImage( image,  0 , 0 ) ;
   


};




// 1 todo 1 refresh skip ? -- done
// 2 win lose -- done
// 3 another icons -- done
// 4 icons remake ? resize ? -- done

// 1. power conservation : no drawing , no refresh when not necessary -- done
// 2. Chess Icon can switch from Symbols and traditional Chinese characters
// ---done
// done
// 3. step by step ?





