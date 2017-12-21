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
		"circle_bg_color": "rgb(0,0,0,0.1)",
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

		let element = $(this).attr('href');

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

	var modal1 = $('#myModal'),
		formularz = $('#formularz');

	formularz.validate({ // start validacji
		ignore: ":hidden",
		rules: {
			imie: {
				required: true,
				minlength: 3
			},
			nazwisko: {
				required: true,
				minlength: 3
			},
			email: {
				required: true,
				email: true
			}
		},
		submitHandler: function (form) {

		   var form_data = new FormData(form); //constructs key/value pairs representing fields and values

		   $.ajax({ //ajax form submit
			   url : 's.php',
			   type: 'post',
			   data : form_data,
			   dataType : "json",
			   contentType: false,
			   cache: false,
			   processData:false,


			   beforeSend:function(res){ // Are not working with dataType:'jsonp'
				 modal1.modal('show').find('#loading-image').show(); 
			   },
			   success:function(res){
				   if(res.type == "error"){
				   modal1.modal('show').find('#loading-image').hide(); 
				   modal1.modal('show').find('.form-komunikat').append(res.text); 
				   modal1.on('hidden.bs.modal', function () {
					   //formularz[0].reset();
					   modal1.find('.form-komunikat').text('');
					   grecaptcha.reset();  
				   });                   
				   }
				  
				   if(res.type == "done"){
					   modal1.modal('show').find('#loading-image').hide(); 
					   modal1.modal('show').find('.form-komunikat').append(res.text);
					   modal1.on('hidden.bs.modal', function () {
						   formularz[0].reset();
						   modal1.find('.form-komunikat').text('');  
						   grecaptcha.reset();
					   });

				   }
			   }

			   



		   });
		}
	});//koniec validacji

});
