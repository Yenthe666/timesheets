odoo.define("hr_timesheet_geolocation.TimesheetGeolocationOne2Many", function (
    require
) {
    "use strict";

    var fieldRegistry = require("web.field_registry");
    var session = require("web.session");
    require("sale_timesheet_edit.so_line_many2one");

    var TimesheetGeolocationOne2Many = fieldRegistry.get("so_line_one2many");

    TimesheetGeolocationOne2Many.include({
        /**
         * @override
         */
        init: function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    session.user_context.default_analytic_latitude =
                        position.coords.latitude;
                    session.user_context.default_analytic_longitude =
                        position.coords.longitude;
                });
            }
            this._super.apply(this, arguments);
        },
    });
});
