$(document).ready(function() {
	let seconds = new Date().getTime() / 1000;
	let endTime = '1567771200';
	
	$('.countdown').final_countdown({
		'start': 1362139200,
		'end': endTime,
		'now': seconds        
	});
});
//ssasdsdsdsaaaaaaaaaaaaaa