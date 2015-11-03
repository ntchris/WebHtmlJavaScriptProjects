


//1 position up/down/line
//2 ani demo

//================================================================================
function demo()
{
    //netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
    
    MovingObj.initMovingObj();
    _renderEngine.initRenderObjForDemo();
    _renderEngine.addRenderObjArray(_movingObjArray);
	_userInfoLabel.showMessage("Demoe started!");
}




/*
 * 
 ***/


var _movingObjArray  = new Array();;


function putChessRandomPlace( side )
{
	
	var chessArray;
	chessArray = Chess.getChessArray(side);
	// create all chess of one side
	var i ; 
	 
	
	for( i=0; i<Chess._chessMaxIndex; i++)
	{
		var randomX = Math.floor(80+Math.random()*400);
		var randomY = Math.floor(100+Math.random()*700);
		
		var tempchess = chessArray[i];
		var tempObj = new MovingObj(tempchess);
		_movingObjArray.push(tempObj);
		tempObj.setPosition(randomX, randomY);
	}	
}





var MovingObj = function(chesss)
{ 
	
	this.v = new MovingObj.getRandomInitialSpeed();
	this._chess = chesss;
	//this._chess.setImageXY(this.v.x, this.v.y);
    this.setPosition = function(x,y)
    {
    	this._chess.setImageXY(x,y);
    };
    
     
    
	this.updatePositionX=function()
	{
		//detect bounce for X Right(border max)
	    var isb = MovingObj.isBounceMax(this._chess.imageX, this.v.x, MovingObj.borderXMax);
		if(isb)
		{
		    MovingObj.updatePositionForBounce(this._chess.imageX, 
		                                      this.v.x, 
		                                      MovingObj.borderXMax );
		    this.v.x= (-1)*this.v.x;
		    
		    return;
		}
		
		//check left border    X Left (border min)
		isb = MovingObj.isBounceMin(this._chess.imageX, this.v.x, MovingObj.borderXMin);
		 
	    if(isb)
	    {
	        MovingObj.updatePositionForBounce(this._chess.imageX, 
	                                          this.v.x, 
	                                          MovingObj.borderXMin );
	        this.v.x= (-1)*this.v.x;
	        return;
	     }
	    this._chess.imageX += this.v.x;
	    
	    
	    
		
	};
	
	this.updatePositionY = function()
    {
        //detect bounce for X Right(border max)
        var isb = MovingObj.isBounceMax(this._chess.imageY, this.v.y, MovingObj.borderYMax);
        if(isb)
        {
            MovingObj.updatePositionForBounce(this._chess.imageY, 
                                              this.v.y, 
                                              MovingObj.borderYMax );
            this.v.y= (-1)*this.v.y;
            
            return;
        }
        
        //check left border    X Left (border min)
        isb = MovingObj.isBounceMin(this._chess.imageY, this.v.y, MovingObj.borderYMin);
         
        if(isb)
        {
            MovingObj.updatePositionForBounce(this._chess.imageY, 
                                              this.v.y, 
                                              MovingObj.borderYMin );
            this.v.y= (-1)*this.v.y;
            return;
         }
        this._chess.imageY += this.v.y;
         
        
    }; 
    
    this._imagedataBackground=null;
    this.prevX;
    this.preY;
    
    this.captureBackGroundImage = function()
    {
        //if(!MouseAction.isBlackberry )
        {
            //netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
        }
        
        
        this._imagedataBackground = GlobalConstants._context.getImageData
         ( this._chess.imageX- GlobalConstants._chessImageWidth/2, 
           this._chess.imageY- GlobalConstants._chessImageWidth/2, 
           GlobalConstants._chessImageWidth, 
           GlobalConstants._chessImageWidth);
    };
    
    this.drawImage = function ()
    {
        //capture this background
        if(this._imagedataBackground!=null)
         {
            GlobalConstants._context.putImageData( this._imagedataBackground,
                                                   this.prevX -GlobalConstants._chessImageWidth/2, 
                                                   this.prevY -GlobalConstants._chessImageWidth/2);
         
         }
         
        this.captureBackGroundImage();
        
        this._chess.drawChess();
    };
};

MovingObj._maxSpeed =20;
MovingObj._maxObjSize = 10;
MovingObj.borderXMin = GlobalConstants._chessImageWidth/2;
MovingObj.borderXMax = GlobalConstants._playbookScreenWidth-GlobalConstants._chessImageWidth/2;

MovingObj.borderYMin = GlobalConstants._chessImageWidth/2;
MovingObj.borderYMax = GlobalConstants._playbookScreenHeight-GlobalConstants._chessImageWidth/2;


MovingObj.updatePositionForBounce=function(currentposi, spd, border)
{
    //only suitable for bunce situation
    var newPosi = currentposi+spd;
    var outOfBorder = newPosi - border;
    newPosi -= outOfBorder;
    return newPosi;
      
};


MovingObj.isBounceMax=function(currentposi, spd, border)
{   
    return (currentposi+spd) > border;
};

MovingObj.isBounceMin=function(currentposi, spd, border)
{
    return (currentposi+spd) < border;
};




MovingObj.getRandomInitialSpeed = function()
{
	var v=new Point(Math.floor(0 + Math.random()*MovingObj._maxSpeed ), 
	           Math.floor(0 + Math.random()*MovingObj._maxSpeed ) );
    return v;

};

MovingObj.updateAllPosition=function()
{
	var i=0;
	for(i=0;i< MovingObj._maxObjSize ;i++)
	{
		var mo=_movingObjArray[i];
		//mo.captureBackGroundImage();
		mo.prevX= mo._chess.imageX;
        mo.prevY= mo._chess.imageY;
        
		mo.updatePositionX();		
		mo.updatePositionY();
	}
};



MovingObj.initMovingObj= function (  )
{
    var chessArray;
    var randomside; 
    
    if( GlobalConstants._powerSaving)
    {
       //alert("demo require turn off powerSaving mode: turning off");
        //the powersaving mode will be turn on again when play real chess
    }
    
    for( i=0; i< MovingObj._maxObjSize ; i++)
    {
        randomside = Math.round(Math.random()*1);
        chessArray = Chess.getChessArray(randomside );
        var randomX = Math.floor(80+Math.random()*400);
        var randomY = Math.floor(100+Math.random()*700);
        
        var tempchess = chessArray[i];
        var tempObj = new MovingObj(tempchess);
        _movingObjArray.push(tempObj);
        tempObj.setPosition(randomX, randomY);
    }   
};



function testImageData()
{
    
 }