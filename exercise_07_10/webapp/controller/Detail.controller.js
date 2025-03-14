sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
  ],
  (Controller, History, JSONModel) => {
    "use strict";

    return Controller.extend("sync.d07.exercise0710.controller.Detail", {
      onInit() {
        this.oRouter = this.getOwnerComponent().getRouter(); // 컨트롤러에 유효한 객체
        this.oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._onPatternMatched, this);
      },
      // pattern이 일치할 때 마다 실행되는 이벤트
      _onPatternMatched(oEvent) {
        // 초기화, 셋팅, 매개변수 찾기
        // 특정한 파라미터 가져올 때
        // var oArgu = oEvent.getParamter("argument");

        // [ 배열로 넘겨주는 방법 ]
        //1. URL 에서 전달된 파라미터 가져오기.
        // var sId = oEvent.getParameter("arguments").key1; //키 지정
        var oArgu = oEvent.getParameters().arguments; // 배열
        console.log("oArgu : ", oArgu);

        //2. 새로운 JSON 모델 생성하여 ID 값을 저장
        // var oModel = new JSONModel({ key1: sId });
        var oModel = new JSONModel(oArgu);
        console.log("oModel : " + oModel);

        //3. 뷰에 "detailModel"로 모델 설정
        this.getView().setModel(oModel, "detailModel");
      },

      // 메인으로 돌아가는 로직 구성
      onGoBack() {
        // this.oRouter.navTo("RouteMain", {}, true); // 이름은 manifest에서 지정한 라우터 이름 가져오기

        // const oHistory = History.getInstance();
        // const sPreviousHash = oHistory.getPreviousHash();

        // if (sPreviousHash !== undefined) {
        //   // 이전 페이지가 있는 경우
        //   window.history.go(-1); // 이전 페이지로 돌아가기
        // } else {
        //   // 이전 페이지가 없는 경우
        //   this.oRouter.navTo(
        //     "RouteMain",
        //     {
        //       "?query": {
        //         key1: "okok",
        //         key2: 123,
        //         // pattern의 쿼리와 동일하게 해서 값을 입력
        //       },
        //     },
        //     true
        //   ); // 메인페이지로 돌아가기

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
