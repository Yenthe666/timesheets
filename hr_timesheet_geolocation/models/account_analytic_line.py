from odoo import fields, models


class AccountAnalyticLine(models.Model):
    _inherit = "account.analytic.line"

    analytic_latitude = fields.Float(
        string="Analytic Latitude",
        digits="Location",
        copy=False
    )
    
    analytic_longitude = fields.Float(
        string="Analytic Longitude",
        digits="Location",
        copy=False
    )

    def open_google_maps(self):
        return {
            'type': 'ir.actions.act_url',
            'name': 'contract',
            'url': "https://www.google.com/maps/search/?api=1&query=%s,%s" % (
             self.analytic_latitude, self.analytic_longitude),
            'target': 'new',
        }
