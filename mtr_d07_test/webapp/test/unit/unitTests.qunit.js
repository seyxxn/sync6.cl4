/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"syncd07/mtr_d07_test/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
