/** @odoo-module */

 /* eslint no-unused-vars: ["error", { "args": "none" }]*/

import { ListController } from "@web/views/list/list_controller";
import { patch } from '@web/core/utils/patch';

patch(ListController.prototype, 'hr_timesheet_geolocation_ListController', {
    setup() {
        var self = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                if(self.props && self.props.context) {
                    self.props.context.default_analytic_latitude =
                            position.coords.latitude;
                    self.props.context.default_analytic_longitude =
                            position.coords.latitude;
                }
            });
        }
        this._super.apply(this, arguments);
    }
});
