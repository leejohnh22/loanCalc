// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(event) {
	// Hide results
	document.getElementById('results').style.display = 'none';

	//Show Loader
	document.getElementById('loading').style.display = 'block';
	setTimeout(calculateResults, 2000);

	event.preventDefault();
});

// Define calculateResult function
function calculateResults() {
	// UI vars
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');
	const monthlyPayment = document.getElementById('monthly-payment');
	const totalPayment = document.getElementById('total-payment');
	const totalInterest = document.getElementById('total-interest');
	
	// Calculate Results
	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value)/ 100 / 12;
	const totalNumPayments = parseFloat(years.value) * 12;

	// Monthly payments
	const x = Math.pow(1 + calculatedInterest, totalNumPayments);
	const monthly = (principal * x * calculatedInterest) / (x - 1);
	
	// put into UI
	if(isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * totalNumPayments).toFixed(2);
		totalInterest.value = ((monthly * totalNumPayments)-principal).toFixed(2);

		// Show results
		document.getElementById('results').style.display = 'block';

		// Hide loader
		document.getElementById('loading').style.display = 'none';
	} else {
		showError('Please check your numbers');	
	}
}

function showError(error) {
	// Hide results
	document.getElementById('results').style.display = 'none';
	
	// Hide loader
	document.getElementById('loading').style.display = 'none';

	// create a div
	const errorDiv = document.createElement('div');

	// bootstrap give class alert and alert-danger
	errorDiv.className = 'alert alert-danger'

	// get elements around where we want to insert
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	// Create text node and append to div
	errorDiv.appendChild(document.createTextNode(error));

	// Insert error above header
	card.insertBefore(errorDiv, heading);

	// Clear error after 3 seconds
	setTimeout(clearError, 3000); // function, milliseconds
}

// Clear Error
function clearError(){
	document.querySelector('.alert').remove();
}