{
    "name": "HR Timesheet Geolocation",
    "author": "Mainframe Monkey BV",
    "website": "https://www.mainframemonkey.com",
    "category": "Timesheet",
    "version": "16.0.1.0.0",
    "depends": ["analytic", "hr_timesheet", "timesheet_grid", 'sale_timesheet'],
    "data": [
        "data/location_data.xml",
        "views/project_task_view.xml",
        "views/account_analytic_line_view.xml",
    ],
    'assets': {
        'web.assets_backend': [
            'hr_timesheet_geolocation/static/src/js/timesheet_one2many_geolocation.js',
            'hr_timesheet_geolocation/static/src/js/timesheet_grid_geolocation.js',
            'hr_timesheet_geolocation/static/src/js/list_controller_geolocation.js'
        ],
     },
    "installable": True,
    "application": False,
    "license": "LGPL-3",
}
