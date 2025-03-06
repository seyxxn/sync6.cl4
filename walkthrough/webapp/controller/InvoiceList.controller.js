sap.ui.define(
  [ 
    "sap/ui/core/mvc/Controller", 
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
	  "sap/ui/model/FilterOperator"
  ],
  (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
      onInit() {
        const oViewModel = new JSONModel({
          currency: "EUR",
        });
        this.getView().setModel(oViewModel, "view"); // 모델에 이름을 부여
      },

      // SearchField의 이벤트 핸들러
      onFilterInvoices(oEvent) {
        // build filter array (필터의 기준을 배열로 작성)
        const aFilter = [];
        // 필터 배열 (데이터를 찾는 기준을 저장하는 배열)

        const sQuery = oEvent.getParameter("query");
        // query: 사용자가 입력한 검색어를 가져옴

        // 사용자가 입력한 검색어가 있으면 필터 배열에 추가
        if (sQuery) {
          // ProductName 필드에 대해 Contains 연산자를 사용하여 필터링
          // (sQuery가 포함된 ProductName 필터링)
          aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));

        }
        // filter binding
        const oList = this.byId("invoiceList");
        // XML에 있는 List 컨트롤을 가져옴
        // 즉,현재 화면(뷰)에서 id가 invoiceList인 List 컨트롤을 가져옴

        // 바인딩 된 데이터를 가져옴
        const oBinding = oList.getBinding("items");

        // 필터 적용 (검색 결과 필터링 적용)
        oBinding.filter(aFilter);
      }
    });
  }
);
