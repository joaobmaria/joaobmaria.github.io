var rows = 9;
var cols = 9;
var lastRow = 0;
var lastCol = 0;
var direction = "up";
var speed = 1, minspeed = 1, maxspeed = 10;
var difficulty = 0, mindif = 0, maxdif = 5;
var runID;
var score = 0;

document.onkeydown = snakeDirection;

// Initial Setup
document.getElementById("rows").innerHTML = rows;
document.getElementById("cols").innerHTML = cols;
document.getElementById("speed").innerHTML = speed;
document.getElementById("difficulty").innerHTML = difficulty;

function snakeDirection(e) {

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
		else if(s.id=="rowsp" && rows<21)
			++rows;
		else if(s.id=="colsm" && cols>=6)
			--cols;
		else if(s.id=="colsp" && cols<21)
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
			score += speed*5 + difficulty*10;
			document.getElementById("log").innerHTML = "SCORE: " + score;
			return;
		}
	
	document.getElementById("cell-" + lastRow + "-" + lastCol).style.backgroundColor = "red";
	document.getElementById("log").innerHTML = "SCORE: " + score;
	document.getElementById("btn").value = "START";
	clearInterval(runID);
	runID=null;
	
}

function startstop()
{

	if(document.getElementById("btn").value == "START")
	{
		direction = "up";
		score = 0;
		
		rows = parseInt(document.getElementById("rows").innerHTML);
		cols = parseInt(document.getElementById("cols").innerHTML);
		lastRow = rows+1;
		lastCol = Math.ceil(cols/2);
		
		drawTable(null);
		clearTable();
		
		document.getElementById("btn").value = "STOP";
		document.getElementById("log").innerHTML = "SCORE: ";
		
		runID = setInterval(play, 1000/speed);
	}
	else
	{
		document.getElementById("btn").value = "START";
		clearInterval(runID);
		runID=null;
	}
	
	
}
