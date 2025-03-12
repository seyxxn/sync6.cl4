sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("sync.d07.exercise0708.controller.View", {
        onInit() {
            // 데이터 정의
            var oData = {
                salesData: [
                    { month: "2023-01", sales: 12000 },
                    { month: "2023-02", sales: 14000 },
                    { month: "2023-03", sales: 15000 },
                    { month: "2023-04", sales: 13000 },
                    { month: "2023-05", sales: 16000 },
                    { month: "2023-06", sales: 17000 }
                ],
                scoreData: [
                        { category: "A등급", value: 50 },
                        { category: "B등급", value: 65 },
                        { category: "C등급", value: 75 },
                        { category: "D등급", value: 40 }
                ]
            }

            // JSON 모델 생성
            var oModel = new JSONModel(oData);
            // View에 모델 설정
            this.getView().setModel(oModel, "chart");

        }
    });
});