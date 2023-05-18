/** @odoo-module */

import { patch } from '@web/core/utils/patch';
import { session } from "@web/session";
import { TimesheetsOne2ManyField } from "@sale_timesheet/components/so_line_field/so_line_field";

patch(TimesheetsOne2ManyField.prototype, 'hr_timesheet_TimesheetsOne2ManyField', {
    setup() {
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
    get rendererProps() {
        var self = this;
        const archInfo = this.activeField.views[this.viewMode];
        const editable = archInfo.editable || this.props.editable;
        var props = this._super.apply(this, arguments);
        props.onAdd = (params) => {
            params.editable =
                !this.props.readonly && ("editable" in params ? params.editable : editable);
            if(! params.context) {
                params.context = {};
            }
            params.context['default_analytic_latitude'] = session.user_context.default_analytic_latitude;
            params.context['default_analytic_longitude'] = session.user_context.default_analytic_longitude;
            this.onAdd(params);
        };
        return props;
    }
});