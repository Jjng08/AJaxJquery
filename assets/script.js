
$(document).ready(function() {
    $('button').click(function() {
        $('#datos').load('https://api.xor.cl/sismo/recent', function(responseTxt, statusTxt, xhr) {
            if (statusTxt == "success")
                alert("External content loaded successfully!");
            if (statusTxt == "error")
                alert("Error: " + xhr.status + ": " + xhr.statusText);
        });
    });
});

$(document).ready(function() {
    $('button').click(function() {
        $.ajax({
            url: 'https://api.xor.cl/sismo/recent',
            method: 'GET',
            success: function(response) {
                if (response.status_code === 0) {
                    // Clear the existing content
                    for (var i = 1; i <= 5; i++) {
                        $('#' + i).empty();
                    }
                    
                    // Iterate over the events and create list items
                    response.events.forEach(function(event, index) {
                        if (index < 5) { // Ensure we only process the first 5 events
                            var listItem = 'Fecha local: ' + event.local_date + '<br>' +
                                'Magnitud: ' + event.magnitude.value + ' ' + event.magnitude.measure_unit + '<br>' +
                                'Referencia geográfica: ' + event.geo_reference + '<br>' +
                                '<a href="' + event.url + '">Más información</a>';
                            $('#' + (index + 1)).html(listItem);
                        }
                    });
                } else {
                    alert("Error al obtener los datos: " + response.status_description);
                }
            },
            error: function(xhr) {
                alert("Error: " + xhr.status + ": " + xhr.statusText);
            }
        });
    });
});