sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel", // oDataModel 사용을 위해
    "sap/ui/model/json/JSONModel", // JSONModel 사용을 위해
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (Controller, oDataModel, JSONModel, MessageBox, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("sync.d07.practice0702.controller.View", {
      onInit() {
        // oDataModel 생성 및 설정
        var oModel = new oDataModel("/sap/opu/odata/sap/ZTEACHER_D07_SRV/");
        // view에 모델 설정
        this.getView().setModel(oModel, "myModel");

        var oData = {
          Default: "전체",
          Gender: [
            {
              type: "all",
              text: "전체",
            },
            {
              type: "male",
              text: "남성",
            },
            {
              type: "female",
              text: "여성",
            },
          ],
        };

        var oGenderModel = new sap.ui.model.json.JSONModel(oData);
        this.getView().setModel(oGenderModel, "gender");
      },
    });
  }
);
