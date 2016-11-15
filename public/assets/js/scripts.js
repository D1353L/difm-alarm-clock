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
    window.refreshIntervalId = null;

    $(document).on('click', '#set_wakeup_dt', function () {
        var wakeup_dt = $('#datetimepicker').data("DateTimePicker").date();
        wakeup_dt.seconds(0);

        if(window.refreshIntervalId) clearInterval(window.refreshIntervalId);

        if(wakeup_dt > moment())
        {
            var timeout = wakeup_dt - moment(),
                duration = moment.duration(timeout, 'milliseconds'),
                interval = 1000
                success = false;

            window.refreshIntervalId = setInterval(function(){
                duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');

                if(duration > moment.duration(0))
                {
                    msg =  "Time to wakeup: " + duration.hours() + ":" + duration.minutes() + ":" + duration.seconds();
                }
                else
                {
                    msg =  "WAKEUP!";
                    var win = window.open('http://prem2.di.fm/indiedance_hi?cfb618d075b5069c0e122e26', '_blank');
                    if(win) win.focus();
                    success = true;
                }

                $('#time_to_wakeup').text(msg);
                if(success) clearInterval(window.refreshIntervalId);
            }, interval);
        }
        else {alert("Wakeup datetime should be in the future");}
    });

});
