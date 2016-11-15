$(document).ready(function () {

    setInterval(function(){
        $('#time_now').text(new Date());
    }, 500);


    $('#datetimepicker').datetimepicker({
        inline: true,
        sideBySide: true,
        format: "DD/MM/YYYY HH:mm",
        minDate: new Date()
    });
var intervalId = null;

    $(document).on('click', '#set_wakeup_dt', function () {
        var wakeup_dt = $('#datetimepicker').data("DateTimePicker").date();
        wakeup_dt.seconds(0);

        clearInterval(intervalId);

        if(wakeup_dt > moment())
        {
            var timeout = wakeup_dt - moment(),
                duration = moment.duration(timeout, 'milliseconds'),
                interval = 1000;

            intervalId = setInterval(function(){
                duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');

                if(duration > moment.duration(0))
                {
                    msg =  "Time to wakeup: " + duration.hours() + ":" + duration.minutes() + ":" + duration.seconds();
                }
                else
                {
                    msg =  "WAKEUP!";
                }

                $('#time_to_wakeup').text(msg);
            }, interval);
        }
        else {alert("Wakeup datetime should be in the future");}
    });

});
