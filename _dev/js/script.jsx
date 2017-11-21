$(document).ready(function() {

	let htmlBody = $('html, body');
	let hash = window.location.hash;
	if(hash != '') {
		htmlBody.animate({
			scrollTop: $(hash).offset().top-80
		}, 500);
	} else {
		htmlBody.animate({
			scrollTop: $('header').offset().top
		}, 500);
	}

	$("#DateCountdown").TimeCircles({
		"animation": "ticks",
		"bg_width": 1,
		"fg_width": 0.04,
		"circle_bg_color": "rgba(0,0,0,0.1)",
		"time": {
			"Days": {
				"text": "Dni",
				"color": "rgba(255,255,255,0.7)",
				"show": true
			},
			"Hours": {
				"text": "Godziny",
				"color": "rgba(255,255,255,0.7)",
				"show": true
			},
			"Minutes": {
				"text": "Minuty",
				"color": "rgba(255,255,255,0.7)",
				"show": true
			},
			"Seconds": {
				"text": "Sekundy",
				"color": "rgba(255,255,255,0.7)",
				"show": true
			}
		}
	});

	//wyskakujaca belka pod tlem ---------------------------
	$('.jq-historia').waypoint(function(direction){
		if(direction=="down") {
			$('nav.navbar').addClass('tlo');
		} else {
			$('nav.navbar').removeClass('tlo');
		}
	}, {offset: 85});

	// guzik do gory ----------------------------------------
	$('.jq-gallery').waypoint(function(direction){
		if(direction=="down") {
			$('.do-gory').removeClass('ukryj');
		} else {
			$('.do-gory').addClass('ukryj');
		}
	}, {offset: 0});


	// menu plus history state ------------------------------
	let menu = $('#navbar ul.nav li a');
	let strzalka = $('.arrow a');
	let doGory = $('.do-gory');

	menu.add(strzalka).add(doGory).on('click', function(e){
		e.preventDefault();

		var element = $(this).attr('href');

		//hash w adresie url
		if(history.pushState) {
			history.pushState(null, null, element);
		} else {
			window.location.hash = element;
		}
		// hash w url end

		htmlBody.animate({
			scrollTop: $(element).offset().top-80
		}, 500);
		
	});
	// strzalka wstecz w przegladarce
	window.onpopstate = function(evt) {
		let hash = window.location.hash;
		if(hash != '') {
			htmlBody.animate({
				scrollTop: $(hash).offset().top-80
			}, 500);
		} else {
			htmlBody.animate({
				scrollTop: $('header').offset().top
			}, 500);
		}
	};
	// menu plus history state end ---------------------------

});
