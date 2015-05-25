// Turn list into array
challenges = $('#data li').map(function(i, el) {
	return $(el).text();
}).get();

var total = challenges.length;

// Once loaded
if (window.location.hash) {
	var url = location.hash;
	if (url.substring(1) - 1 < total) {
		$('#count').html(url.substring(1) + '/' + total);
		$(url).addClass('show');
		$('h1').addClass('hidden');
		var ha = $(url).outerHeight();
		$('.container').css('height', ha + 32);
	}
} else {
	var ha = $('#data').outerHeight();
	$('.container').css('height', ha);
}

// Randomw without repeat
var hChallenge = noR(challenges);
function noR(array) {
	var copy = array.slice(0);
	return function() {
		if (copy.length < 1) { copy = array.slice(0); }
		var index = Math.floor(Math.random() * copy.length);
		var item = copy[index];
		copy.splice(index, 1);
		return item;
	};
}

// To display a message after X tips
var calls = 0;

// To replace URL instead of updating it
var baseURL = '//' + location.host + location.pathname;

// Animate height
function hAnimate () {
	var ha = $('.show').outerHeight();
	$('.container').css('height', ha + 32);
}

// When button is clicked, do this
function refresh() {
	// Keep track of how many tips
	calls++;

	// If the greeting is present, hide it
	if ($('h1').length) {
		$('h1').addClass('hidden');
	};

	// Hide previous tip
	$('.show').removeClass('show');

	// Get new challenge
	var random = hChallenge();

	// Find challenge-number in array
	var display = challenges.indexOf(random);

	// Show <li> element with the challenge
	$('#data li').eq(display).addClass('show');

	// Get height of new element and apply that height to the container to animate it
	hAnimate();

	// Define a new direct link and replace it without affecting the BACK button
	var link = baseURL + '#' + $('.show').attr('id');
	location.replace(link);

	// Update the challenge-counter
	$('#count').html((challenges.indexOf(random) + 1) + '/' + total);
}

// On click or tap
$('#refresh').on('click', function() {
	refresh();
});

// Remove endless loop and add the active class to keydown
var keyAllowed = {};
$(document).keydown(function(e) {
  if (keyAllowed [e.which] === false) return;
  keyAllowed [e.which] = false;
  if(e.keyCode == 32){ // Spacebar
		$('#refresh').addClass('press');
	}
});
$(document).keyup(function(e) { 
  keyAllowed [e.which] = true;
});
$(document).focus(function(e) { 
  keyAllowed = {};
});

// Spacebar pressed
$('body').keyup(function(e){
	if(e.keyCode == 32){ // Still spacebar
		$('#refresh').removeClass('press');
		refresh();
	}
});