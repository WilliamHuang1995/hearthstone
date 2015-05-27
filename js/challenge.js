// Turn list into array
challenges = $('#data li').map(function(i, el) {
	return $(el).text();
}).get();

// Global variables
var total = challenges.length;
var url = location.hash;

// Animate height
function hAnimate () {
	if (window.location.hash) {
		if (url.substring(1) - 1 < total) {
			var ha = $('.show').outerHeight();
		}
	}
	else {
		var ha = $('h1').outerHeight();
	}
	$('.container').css('height', ha + 32);
}

// Once loaded
if (window.location.hash) {
	if (url.substring(1) - 1 < total) {
		$('#count').html(url.substring(1) + '/' + total);
		$(url).addClass('show');
		$('h1').addClass('hidden');
		hAnimate();
	}
} else {
	hAnimate();
}

// Random without repeat
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

// Secondary fire to fix potential incorrect height
$(function () {
	setTimeout(hAnimate, 100);
});

// Generate new challenge
function refresh() {
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

	// Show <li> element with the challenge in question
	$('#data li').eq(display).addClass('show');

	// Get height of new element and apply that height to the container to animate it
	hAnimate();

	// Define a new direct link and replace it without affecting the back-button
	var link = baseURL + '#' + $('.show').attr('id');
	location.replace(link);

	// Update the challenge-counter
	$('#count').html((challenges.indexOf(random) + 1) + '/' + total);

	// Keep track of how many challenges, and display messages
	calls++;
	var original = 'HINT: Press spacebar for a new challenge.';
	var message = $('#message');
	var hey = 'active-page';

	if (calls >= total) {
		message.html('You have seen all the challenges now!').addClass(hey);
	} if (calls >= (total + 4)) {
		message.html(original).removeClass(hey);
	} if (calls >= (total * 1.5)) {
		message.html("If you're looking for a particular challenge, check the list view!").addClass(hey);
	} if (calls >= (total * 1.5) + 4) {
		message.html(original).removeClass(hey);
	} if (calls >= (total * 2)) {
		message.html('You have seen all the challenges twice now!').addClass(hey);
	} if (calls >= (total * 2) + 4) {
		message.html(original).removeClass(hey);
	} if (calls >= (total * 2.5)) {
		message.html('Feel free to suggest more challenges!').addClass(hey);
	}
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

// Resize height  of container on resize (mostly for device rotation)
$(window).on('resize', function(){
	hAnimate();
});




