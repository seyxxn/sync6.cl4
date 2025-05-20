sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
  ],
  (Controller, ODataModel, MessageToast, MessageBox) => {
    "use strict";

    return Controller.extend("sync.dc.pp.project32.controller.Main", {
      onInit() {
        var oModel = new ODataModel("/sap/opu/odata/sap/ZDCC_MATFLOW_CDS/");
        oModel.setSizeLimit(20000);
        this.getView().setModel(oModel);
      },
    });
  }
);
