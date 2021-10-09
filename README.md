# timesheets
Apps related to Odoo its timesheets features
- [hr_timesheet_geolocation](#hr_timesheet_geolocation): automatically tracks and stores the geolocation from the person booking it's timesheets

## hr_timesheet_geolocation
This module will automatically get and store the geolocation from which the user books his/her timesheets.
![image](https://user-images.githubusercontent.com/6352350/136662674-f4f89906-adb5-4518-a16f-47335c57620a.png)

By clicking on the marker icon it will automatically open Google Maps on the location that was stored.<br/>
This works when a user books his/her timesheets from:
- Timesheets > Timesheet > My timesheets
- Timesheets > Timesheet > All timesheets


**Notice:** the mobile app and Awesome Timesheets have to support to hook into so this only works from the web browser itself.<br/>
**Notice 2:** Google their API's only allow getting/storing locations when you are on HTTPS. This does not work on localhost or non-SSL websites!
