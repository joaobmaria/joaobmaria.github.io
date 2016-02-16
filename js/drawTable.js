function drawTable()
{

	var Rows = parseInt(document.getElementById("rows").value) ;
	var Cols = parseInt(document.getElementById("cols").value) ;

	var board = "";
	
	for (var i = 1; i < Rows+1; ++i) {
		board +="<tr>";
		for (var j = 1; j < Cols+1; ++j) {
			board += "<td id=\"cell-"+i+"-"+j+"\">";
			board += "<span></span>"; 
			board += "</td>"; 
		}
		board +="</tr>";
	
		document.getElementById("board").innerHTML = board;
	}

}