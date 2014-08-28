var controllers = ['ribs.controller.main',
				   'ribs.controller.navigation',
                   'ribs.controller.customer',
                   'ribs.controller.customer-detail',
                   'ribs.controller.part'];

var services = ['ribs.service.customer',
                'ribs.service.part'];

angular.module('ribs', ['ngRoute', 'ribs.routes'].concat(controllers, services));
