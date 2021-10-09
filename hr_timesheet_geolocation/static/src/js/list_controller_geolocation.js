odoo.define("hr_timesheet_geolocation.ListControllerLocation", function (require) {
    "use strict";

    /* eslint no-unused-vars: ["error", { "args": "none" }]*/

    var ListController = require("web.ListController");
    var session = require("web.session");

    ListController.include({
        /**
         * @override
         * @param {Widget} parent
         * @param {GraphModel} model
         * @param {GraphRenderer} renderer
         * @param {Object} params
         * @param {String[]} params.measures
         * @param {Boolean} params.isEmbedded
         * @param {String[]} params.groupableFields,
         */
        init: function (parent, model, renderer, params) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    session.user_context.default_analytic_latitude =
                        position.coords.latitude;
                    session.user_context.default_analytic_longitude =
                        position.coords.longitude;
                });
            }
            return this._super.apply(this, arguments);
        },
    });
});
