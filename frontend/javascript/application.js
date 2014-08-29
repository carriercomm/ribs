var controllers = ['ribs.controller.main',
				   'ribs.controller.navigation',
                   'ribs.controller.customer',
                   'ribs.controller.customer-detail',
                   'ribs.controller.part',
                   'ribs.controller.material'];

var services = ['ribs.service.customer',
                'ribs.service.part',
                'ribs.service.material'];

angular.module('ribs', ['ngRoute', 'ribs.routes'].concat(controllers, services));
