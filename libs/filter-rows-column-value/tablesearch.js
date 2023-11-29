function searchTable(input, tableId, searchColumn = -1, searchColumn2 = -1, searchColumn3 = -1) 
{
    var filter = input.toUpperCase();
	var table = document.getElementById(tableId);
	var rowText, rowText2, rowText3;	//temporary var
	
	for (var i = 0, row; row = table.rows[i]; i++) {
		//iterate through rows
		if (searchColumn == -1)	//by default, search all columns
		{
			if (i != 0)	{	//don't perform search on the first row header
				rowText = row.innerHTML;	//get text for the whole row
				if (rowText.toUpperCase().indexOf(filter) > -1) {	//if upper case matches any part of filter
					row.style.display = "";
				}
				else {
					row.style.display = "none";
				}
			}
		}
		else
		{
			if (i != 0)	{	//don't perform search on the first row header

				if (searchColumn3 != -1) {	//3 category search
					rowText = row.cells[searchColumn].innerHTML;	//get text for the 1st column
					rowText2 = row.cells[searchColumn2].innerHTML;	//get text for the 2nd column
					rowText3 = row.cells[searchColumn3].innerHTML;	//get text for the 3rd column
					if (rowText.toUpperCase().indexOf(filter) > -1 || rowText2.toUpperCase().indexOf(filter) > -1 || rowText3.toUpperCase().indexOf(filter) > -1) {	//if upper case matches any part of filter
						row.style.display = "";
					}
					else {
						row.style.display = "none";
					}	
					
				}			
				else if (searchColumn2 != -1) {	//2 category search
					rowText = row.cells[searchColumn].innerHTML;	//get text for the 1st column
					rowText2 = row.cells[searchColumn2].innerHTML;	//get text for the 2nd column
					if (rowText.toUpperCase().indexOf(filter) > -1 || rowText2.toUpperCase().indexOf(filter) > -1) {	//if upper case matches any part of filter
						row.style.display = "";
					}
					else {
						row.style.display = "none";
					}	
					
				}
				else {	//single category search
					rowText = row.cells[searchColumn].innerHTML;	//get text for the whole row
					if (rowText.toUpperCase().indexOf(filter) > -1) {	//if upper case matches any part of filter
						row.style.display = "";
					}
					else {
						row.style.display = "none";
					}
					
				}
			}
		}

		/*
		for (var j = 0, col; col = row.cells[j]; j++) {
		//iterate through columns (optional)
		}  
		*/
	}
	
}