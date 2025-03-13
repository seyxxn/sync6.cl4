/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"syncd07/exercise_07_07_01/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
