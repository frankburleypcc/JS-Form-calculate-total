//Lynda.com challenge - working with forms- Joel Chellman/instructor

(function() {
"use strict";
//creates a var for the state
var state = document.getElementById('s-state');

document.addEventListener('DOMContentLoaded', function() {
    
	document.getElementById('cart-hplus').addEventListener('submit', estimateTotal);
	
	var btnEstimate = document.getElementById('btn-estimate');
	//disables estimate button until a state has been chosen
	btnEstimate.disabled = true;
	//enables the Estimate button if the select dropdown is no longer empty
	state.addEventListener('change', function() {
	
		if (state.value === '') {
			btnEstimate.disabled = true;
		} else {
			btnEstimate.disabled = false;
		}
	
	});
});

function estimateTotal(event) {
    //prevents default opening of another page
	event.preventDefault();
	
	if (state.value === '') {
		alert('Please choose your shipping state.');
		
		state.focus();
	}
	
	var itemBball = parseInt(document.getElementById('txt-q-bball').value, 10) || 0,
		itemJersey = parseInt(document.getElementById('txt-q-jersey').value, 10) || 0,
		itemPower = parseInt(document.getElementById('txt-q-power').value, 10) || 0,
        itemWater = parseInt(document.getElementById('txt-q-water').value, 10) || 0,
		shippingState = state.value,
		shippingMethod = document.querySelector('[name=r_method]:checked').value || "";
		
	var totalQty = itemBball + itemJersey + itemPower + itemWater,
		shippingCostPer,
		shippingCost,
		taxFactor = 1,
		estimate,
		totalItemPrice = (90 * itemBball) + (25 * itemJersey) + (30 * itemPower) + (4 * itemWater);
	//calculates tax for CA and WA
	if (shippingState === 'CA') {
		taxFactor = 1.075;
	} else if (shippingState === 'WA') {
		taxFactor = 1.065;
    }
	
	switch(shippingMethod) {
		case 'usps' :
			shippingCostPer = 2;
			break;
		case 'ups' :
			shippingCostPer = 3;
			break;
		default :
			shippingCostPer = 0;
			break;
	}
	
	shippingCost = shippingCostPer * totalQty;
		
	estimate = '$' + ((totalItemPrice * taxFactor) + shippingCost).toFixed(2);
	
	document.getElementById('txt-estimate').value = estimate;
	
	var results = document.getElementById('results');
	
	results.innerHTML = 'Total items: ' + totalQty + '<br>';
	results.innerHTML += 'Total shipping: $' + shippingCost.toFixed(2) + '<br>';
	results.innerHTML += 'Tax: ' + ((taxFactor - 1) * 100).toFixed(2) + '% (' + shippingState + ')';
}

})();