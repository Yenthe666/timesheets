odoo.define("hr_attendance_geolocation.TimerHeaderComponentLocation", function (
    require
) {
    "use strict";

    const TimerHeaderComponent = require("timesheet_grid.TimerHeaderComponent");

    const TimerGridRenderer = require("timesheet_grid.TimerGridRenderer");

    var session = require("web.session");

    class TimerHeaderComponentLocation extends TimerHeaderComponent {
        /**
         * @override
         */
        _onClickStartTimer(ev) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    session.user_context.default_analytic_latitude =
                        position.coords.latitude;
                    session.user_context.default_analytic_longitude =
                        position.coords.longitude;
                });
            }
            ev.stopPropagation();
            this.trigger("timer-started");
        }
    }

    TimerGridRenderer.components.TimerHeaderComponent = TimerHeaderComponentLocation;
});
