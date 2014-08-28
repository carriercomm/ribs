var controllers = ['ribs.controller.main',
                   'ribs.controller.customer'];

var services = ['ribs.service.customer'];

angular.module('ribs', ['ngRoute', 'ribs.routes'].concat(controllers, services));
