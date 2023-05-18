/** @odoo-module */

import { patch } from '@web/core/utils/patch';
const TimerGridRenderer = require("timesheet_grid.TimerGridRenderer");
const { onMounted } = owl;
import { session } from "@web/session";


patch(TimerGridRenderer.prototype, 'hr_timesheet_TimerGridRenderer', {
    setup() {
        this._super.apply(this, arguments);
        var self = this;
        onMounted(() => {
            var self = this;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    if(self.props) {
                        if(! self.props.context) {
                            self.props.context = {};
                        }
                        self.props.context['default_analytic_latitude'] = position.coords.latitude;
                        self.props.context['default_analytic_longitude'] = position.coords.longitude;
                    }
                    self.default_analytic_latitude =
                        position.coords.latitude;
                    self.default_analytic_longitude =
                        position.coords.longitude;
                });
            }
        });
//        if (navigator.geolocation) {
//            navigator.geolocation.getCurrentPosition(function (position) {
//                if(self.props) {
//                    if(! self.props.context) {
//                        self.props.context = {};
//                    }
//                    self.props.context['default_analytic_latitude'] = position.coords.latitude;
//                    self.props.context['default_analytic_longitude'] = position.coords.longitude;
//                }
//                self.default_analytic_latitude =
//                    position.coords.latitude;
//                self.default_analytic_longitude =
//                    position.coords.longitude;
//            });
//        }
    },
    async _setProjectTask(projectId, taskId) {
        if (!this.stateTimer.projectId) {
            return;
        }
        if (this.timesheetId) {
            const timesheetId = await this.rpc({
                model: 'account.analytic.line',
                method: 'action_change_project_task',
                args: [[this.timesheetId], this.stateTimer.projectId, this.stateTimer.taskId],
            });
            if (this.timesheetId !== timesheetId) {
                this.timesheetId = timesheetId;
                await this._get_running_timer();
            }
        } else {
            const seconds = Math.floor(Date.now() / 1000) - this.stateTimer.startSeconds;
            this.timesheetId = await this.rpc({
                model: 'account.analytic.line',
                method: 'create',
                args: [{
                    'name': this.stateTimer.description,
                    'project_id': this.stateTimer.projectId,
                    'analytic_latitude': this.default_analytic_latitude,
                    'analytic_longitude': this.default_analytic_longitude,
                    'task_id': this.stateTimer.taskId,
                }],
            });
            // Add already runned time and start timer if doesn't running yet in DB
            this.trigger('add_time_timer', {
                timesheetId: this.timesheetId,
                time: seconds
            });
        }
        this._match_line();
    }
});