$(function () {

    function initMap() {


        var location = new google.maps.LatLng(54.41920464299034, 18.562259674072266);



        var mapCanvas = document.getElementById('kontakt');
        var mapOptions = {
            center: location,
            zoom: 16,
            panControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            

        }
        var map = new google.maps.Map(mapCanvas, mapOptions);

        var markerImage = 'img/marker.png';

        var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: markerImage
        });

        var contentString = '<div class="info-window">' +
                '<h3>Informacje</h3>' +
                '<div class="info-content">' +
                '<p>Akademia Wychowania Fizycznego i Sportu w Gdańsku<br />Kazimierza Górskiego 1<br />80-336 Gdańsk<br />tel. (58)554-71-21<br />email: biuro@50lat.awfis.net</p>' +  
                '</div>' +
                '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 400
        });

        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });

        infowindow.open(map,marker);
    }

    google.maps.event.addDomListener(window, 'load', initMap);

});