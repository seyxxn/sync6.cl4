sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("sync.d07.mtrd0701.controller.View", {
      onInit() {
        // 데이터 정의
        var oData = {
          ProductSales: [
            { Product: "Laptop", Sales: 500 },
            { Product: "Tablet", Sales: 300 },
            { Product: "Smartphone", Sales: 700 },
            { Product: "Monitor", Sales: 450 },
            { Product: "Headphones", Sales: 350 },
          ],
        };

        // JSON 모델 정의
        var oModel = new JSONModel(oData);
        this.getView().setModel(oModel, "chart");
      },
    });
  }
);
