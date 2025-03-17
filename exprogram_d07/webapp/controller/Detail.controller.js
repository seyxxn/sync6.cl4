sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
  ],
  (BaseController, History, ODataModel, JSONModel) => {
    "use strict";

    return BaseController.extend("cl4.exprogramd07.controller.Detail", {
      onInit() {
        this.oRouter = this.getOwnerComponent().getRouter(); // 컨트롤러에 유효한 객체
        this.oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._onPatternMatched, this);
      },

      // pattern이 일치할 때 마다 실행되는 이벤트
      _onPatternMatched(oEvent) {
        // URL 에서 전달된 파라미터 가져오기.
        var sId = oEvent.getParameter("arguments").id; //키 지정
        // console.log(sId);

        // OData에서 데이터를 가져오기 위해 모델 생성
        var oModel = new ODataModel("/sap/opu/odata/sap/ZEXAM_MEMBER_D07_SRV/");

        // 키값(id)을 이용하여 OData에서 데이터를 가져옴
        oModel.read("/MemberSet('" + sId + "')", {
          success: (oData) => {
            // console.log(oData);
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "detailModel"); // 모델 설정
          },
          error: () => {
            console.log("error");
          },
        });
      },

      // 메인으로 돌아가는 로직 구성
      onGoBack() {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          // 이전 페이지가 있는 경우
          window.history.go(-1); // 이전 페이지로 돌아가기
        } else {
          // 이전 페이지가 없는 경우
          this.oRouter.navTo("RouteMain", {}, true); // 메인페이지로 돌아가기
        }
      },
    });
  }
);
