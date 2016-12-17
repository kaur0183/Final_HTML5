angular.module('starter', ['ionic', 'starter.controllers', 'xml'])

.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
	$httpProvider.interceptors.push('xmlHttpInterceptor');
	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// setup an abstract state for the tabs directive
		.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'templates/tabs.html'
	})

	.state('tab.dash', {
		url: '/dash',
		views: {
			'tab-dash': {
				templateUrl: 'templates/tab-dash.html',
				controller: 'DashCtrl'
			}
		}
	})

	.state('tab.chats', {
		url: '/Events',
		views: {
			'tab-chats': {
				templateUrl: 'templates/tab-events.html',
				controller: 'ChatsCtrl'
			}
		}
	})

	.state('tab.account', {
		url: '/search',
		views: {
			'tab-search': {
				templateUrl: 'templates/tab-search.html',
				controller: 'AccountCtrl'
			}
		}
	})

	.state('tab.account-detail', {
		url: '/account/:bookID',
		views: {
			'tab-search': {
				templateUrl: 'templates/book-detail.html',
				controller: 'ChatDetailCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/dash');

});