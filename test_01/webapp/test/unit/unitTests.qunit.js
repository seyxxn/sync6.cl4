/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"syncd07/test_01/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});