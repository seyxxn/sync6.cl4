sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
], (Controller, ODataModel, JSONModel) => {
    "use strict";

    return Controller.extend("sync.d07.exercise0709.controller.View", {
        onInit() {
            // OData 모델 생성 및 설정
            var oModel = new ODataModel("/v2/northwind/northwind.svc/");
            var that = this;

            oModel.read("/Products", {
                success: function (oData) {
                    
                    // 재고수량을 기준으로 내림차순 정렬
                    oData.results.sort((a, b) => b.UnitsInStock - a.UnitsInStock);

                    // 상위 5개 데이터만 추출
                    oData.results.splice(5);

                    // oData 응답을 JSONModel에 저장
                    var oChartModel = new JSONModel({data: oData.results});

                    // jSON 모델을 차트와 연결
                    that.getView().setModel(oChartModel, "chart");
                },
                error: function () {
                    console.log("error");
                }
            })
        }
    });
});