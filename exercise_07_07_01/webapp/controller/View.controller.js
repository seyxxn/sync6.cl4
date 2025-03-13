sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel", // ODataModel 모듈 추가
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
], (Controller, ODataModel, Filter, FilterOperator, MessageToast) => {
    "use strict";

    return Controller.extend("sync.d07.exercise070701.controller.View", {
        onInit() {
            // OData 모델 생성 및 설정
            var oModel = new ODataModel("/sap/opu/odata/sap/ZCARR_D07_SRV/");
            // View에 모델 설정
            this.getView().setModel(oModel, "myModel");
        },

        onSearchCarrier(oEvent) {
            var oModel = this.getView().getModel("myModel"); // 모델 가져오기
            var oTable = this.getView().byId("uiTable");     // 테이블 id로 테이블 가져오기
            const sQuery = oEvent.getParameter("query");     // 사용자가 입력한 값 가져오기

            if (!sQuery) {
                // 기존 필터 해제 (전체 목록 다시 표시)
                const oBinding = oTable.getBinding("rows");
                if (oBinding) {
                    oBinding.filter([]); // 모든 필터 제거
                }
        
                return;
            }

            // OData read()를 사용하여 특정 Carrier ID를 조회한다
            oModel.read("/ZCARR_D07Set('" + sQuery + "')", {
                success: function (oData) {
                    // read 하여 성공한 경우 -> 즉, oData가 비어있지 않은 상태에서만 필터를 적용함
                        if (oData){
                            const aFilter = [
                                new Filter("Carrid", FilterOperator.EQ, sQuery)
                            ];
                            const oBinding = oTable.getBinding("rows");
        
                            if (oBinding) {
                                oBinding.filter(aFilter);
                            }
                        }
                },
                error: function () {
                    MessageToast.show("검색한 항공사 데이터가 존재하지 않습니다.", { width: "auto" });

                    // 필터 초기화 하기
                    const oBinding = oTable.getBinding("rows");

                    if (oBinding){
                        oBinding.filter([]); // 모든 필터를 제거
                    }
                }
            }); 
        }

    });
});