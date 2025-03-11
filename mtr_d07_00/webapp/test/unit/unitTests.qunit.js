/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"syncd07/mtr_d07_00/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});