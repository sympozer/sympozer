'use strict'

angular.module('theme.form-uploads', ['flow'])
	.config(['flowFactoryProvider', function (flowFactoryProvider) {
		flowFactoryProvider.defaults = {
			target: '',
			permanentErrors: [500, 501],
			maxChunkRetries: 1,
			chunkRetryInterval: 5000,
			simultaneousUploads: 1
		};
		flowFactoryProvider.on('catchAll', function (event) {
			console.log('catchAll', arguments);
		});
		// Can be used with different implementations of Flow.js
		// flowFactoryProvider.factory = fustyFlowFactory;
	}])
 //  	.controller('AdvancedFileUploads', ['$scope', function ($scope) {
	// }])