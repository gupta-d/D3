// get data from data.js
var tableData = data;



//define function to display table
	function showTable(myTable) {

		 selection = d3.select("#ufo-table").select("tbody").selectAll("tr").data(myTable);

		 selection.enter() // creates placeholder for new data
		  .append("tr") // appends a tr to placeholder
		  .merge(selection)
		  .html(function(d) {
		   return `<td>${d.datetime}</td> <td>${d.city}</td> <td>${d.state}</td> <td>${d.country}</td> 
		   		   <td>${d.shape}</td> <td>${d.durationMinutes}</td> <td>${d.comments}</td>`
			});

		 selection.exit().remove();	



	};


// Display complete table at start page
	showTable(tableData);

// code to get user input and display the filtered data
	var submit = d3.select("#filter-btn");

	submit.on("click", function() 

	{
		// console.log("clicked");

		// Prevent the page from refreshing
			d3.event.preventDefault();

		// Select the input element and get the raw HTML node
			var inputDateElement = d3.select("#datetime");
			var inputStateElement = d3.select("#state");

		// Get the value property of the input element
			var inputDateValue = inputDateElement.property("value");
			var inputStateValue = inputStateElement.property("value");

		// check if user entered any data, save as Boolean
			var isDate = Boolean(inputDateValue)
			var isState = Boolean(inputStateValue)
			console.log (isDate, isState)

		// Parse date entry from string format to js date format 
		// This will throw an error for invalid date format that can be used fro any specific task
			var mydate = new Date(inputDateValue);

		// If date entry is invalid format, show message
			// if (isDate && mydate == "Invalid Date") {d3.select("#myheader").text(mydate) };

			// console.log(mydate);
		

	

// filter the results as per data entered by user and save in variable 'results'
// convert date to a date object, and state name to lowercase for filtering criterea

		let result = [];
			if (!isDate && !isState) {
		  		result = tableData;
				} 
			else if (!isState) {
		  			result = tableData.filter(item => Date.parse(item.datetime) === Date.parse(inputDateValue));
					console.log(result);
				} 
			else if (!isDate) {
		  			result = tableData.filter(item => item.state === inputStateValue.toLowerCase() );
					console.log(result);
				}
			else {
			  		result = tableData.filter(item => Date.parse(item.datetime) === Date.parse(inputDateValue)).filter(item => item.state === inputStateValue.toLowerCase() );
					console.log(result);
			  	};

// // refresh screen with filtered data
			showTable(result)


	});







	
