var rows = 5, lastRow = 0, minRows = 5, maxRows = Math.floor((window.innerHeight-105-72)/72);;
var cols = 5, lastCol = 0, minCols = 5, maxCols = Math.floor(window.innerWidth/72);
var lastRow = 0;
var lastCol = 0;
var direction = "up";
var speed = 1, minspeed = 1, maxspeed = 10;
var difficulty = 0, mindif = 0, maxdif = 5;
var runID;
var score = 0;
var snakeLength = 0, snakeDistance = 0, maxLength = 2, snakeBody = [];
var highScore = 0;

document.onkeydown = snakeDirection;
window.onresize = windowResize;

document.getElementById("rows").innerHTML = rows;
document.getElementById("cols").innerHTML = cols;
document.getElementById("speed").innerHTML = speed;
document.getElementById("difficulty").innerHTML = difficulty;

function snakeDirection(e)
{

	e = e || window.event;

	if (e.keyCode == '38' && direction != "down") {
		direction = "up";
	}
	else if (e.keyCode == '40' && direction != "up") {
		direction = "down";
	}
	else if (e.keyCode == '37' && direction != "right") {
		direction = "left";
	}
	else if (e.keyCode == '39' && direction != "left") {
		direction = "right";
	}

}

function windowResize()
{
	// 72x72 is the square size
	maxRows = Math.floor((window.innerHeight-105-72)/72); //105 is the menu height, and another 72 for the score
	maxCols = Math.floor(window.innerWidth/72);
	
	if(rows>maxRows)
		rows = maxRows;
	if(cols>maxCols)
		cols = maxCols;
	if(rows<minRows)
		rows = minRows;
	if(cols<minCols)
		cols = minCols;
	
	if(runID!=null)
	{
		clearInterval(runID);
		document.getElementById("btn").value = "START";
		runID=null;
		if(score>highScore)
			highScore = score;
		document.getElementById("highscore").innerHTML = "(High Score: " + highScore + ")";
	}
	
	document.getElementById("rows").innerHTML = rows ;
	document.getElementById("cols").innerHTML = cols ;
	drawTable();
}

function drawTable()
{
	if(runID==null){
						
		var board = "";
		
		for (var i = 1; i < rows+1; ++i) {
			board +="<tr>";
			for (var j = 1; j < cols+1; ++j) {
				board += "<td id=\"cell-"+i+"-"+j+"\">";
				board += "<span></span>"; 
				board += "</td>"; 
			}
			board +="</tr>";
		
			document.getElementById("board").innerHTML = board;
		}
	}

}

function tableSize(s)
{
	if(runID==null){
				
		if(s.id=="rowsm" && rows>=6)
			--rows;
		else if(s.id=="rowsp" && rows<maxRows)
			++rows;
		else if(s.id=="colsm" && cols>=6)
			--cols;
		else if(s.id=="colsp" && cols<maxCols)
			++cols;
		else
			return;
		
		document.getElementById("rows").innerHTML = rows ;
		document.getElementById("cols").innerHTML = cols ;
		
		drawTable();
	}
}

function clearTable()
{
	for (var i = 1; i <= rows; ++i) 
		for (var j = 1; j <= cols; ++j){
			if(Math.floor((Math.random() * 100) + 1) > (difficulty*10) )
				document.getElementById("cell-" + i + "-" + j).style.backgroundColor = "black";
			else
				document.getElementById("cell-" + i + "-" + j).style.backgroundColor = "white";
		}
	var startPos = lastRow-1;
	document.getElementById("cell-" + startPos + "-" + lastCol).style.backgroundColor = "black";
}

function changeSpeed(s) {

	if(s.value=="+" && speed<maxspeed)
		++speed;
	else if(s.value=="-" && speed>minspeed)
		--speed;
	else
		return;
	
	document.getElementById("speed").innerHTML = speed;
	
	if(runID!=null){
		clearInterval(runID);
		runID = setInterval(play, 1000/speed);
	}
	
}

function changeDifficulty(s) {

	if(runID==null){
		if(s.value=="+" && difficulty<maxdif)
			++difficulty;
		else if(s.value=="-" && difficulty>mindif)
			--difficulty;
		else
			return;
		
		document.getElementById("difficulty").innerHTML = difficulty;
	}
	
}

function play()
{
	var nextRow=lastRow, nextCol=lastCol;
	
	if(direction == "up")
		nextRow-=1;

	if(direction == "down")
		nextRow+=1;

	if(direction == "left")
		nextCol-=1;

	if(direction == "right")
		nextCol+=1;

	if(nextRow>0 && nextRow<=rows && nextCol>0 && nextCol<=cols)
		if(document.getElementById("cell-" + nextRow + "-" + nextCol).style.backgroundColor == "black")
		{
			lastRow=nextRow;
			lastCol=nextCol;
			document.getElementById("cell-" + lastRow + "-" + lastCol).style.backgroundColor = "green";
			++snakeLength;
			++snakeDistance;
			snakeBody.push([lastRow,lastCol]);
			if(snakeLength>maxLength){
				document.getElementById("cell-" + snakeBody[0][0] + "-" + snakeBody[0][1]).style.backgroundColor = "black"; 
				snakeBody.shift();
				--snakeLength;
				if(snakeDistance%(maxLength*20)==0)
					++maxLength;
			}
			
			score += speed*5 + snakeLength*5 + difficulty*10 ;
			document.getElementById("log").innerHTML = score;
			return;
		}
	
	document.getElementById("cell-" + lastRow + "-" + lastCol).style.backgroundColor = "red";
	document.getElementById("log").innerHTML = score;
	document.getElementById("btn").value = "START";
	clearInterval(runID);
	runID=null;
	if(score>highScore)
		highScore = score;
	document.getElementById("highscore").innerHTML = "(High Score: " + highScore + ")";
}

function startstop()
{

	if(document.getElementById("btn").value == "START")
	{
		direction = "up";
		score = 0;
		snakeLength = 0, snakeDistance = 0, maxLength = 2, snakeBody = [];
		
		rows = parseInt(document.getElementById("rows").innerHTML);
		cols = parseInt(document.getElementById("cols").innerHTML);
		lastRow = rows+1;
		lastCol = Math.ceil(cols/2);
		
		drawTable(null);
		clearTable();
		
		document.getElementById("btn").value = "STOP";
		document.getElementById("log").innerHTML = "";
		
		runID = setInterval(play, 1000/speed);
	}
	else
	{
		document.getElementById("btn").value = "START";
		clearInterval(runID);
		runID=null;
		if(score>highScore)
			highScore = score;
		document.getElementById("highscore").innerHTML = "(High Score: " + highScore + ")";
	}
	
	
}
