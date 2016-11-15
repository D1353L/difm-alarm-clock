$(document).ready(function () {

    setInterval(function(){
        $('#time_now').text(new Date());
    }, 500);


    $('#datetimepicker').datetimepicker({
        inline: true,
        sideBySide: true,
        format: "DD:MM:YYYY HH:mm",
        minDate: new Date()
    });
});
