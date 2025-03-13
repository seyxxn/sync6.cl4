sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"],
  (Controller, History) => {
    "use strict";

    return Controller.extend("sync.d07.exercise0710.controller.Detail", {
      onInit() {
        this.oRouter = this.getOwnerComponent().getRouter(); // 컨트롤러에 유효한 객체
      },

      // 메인으로 돌아가는 로직 구성
      onGoBack() {
        // this.oRouter.navTo("RouteMain", {}, true); // 이름은 manifest에서 지정한 라우터 이름 가져오기

        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          // 이전 페이지가 있는 경우
          window.history.go(-1); // 이전 페이지로 돌아가기
        } else {
          // 이전 페이지가 없는 경우
          this.oRouter.navTo(
            "RouteMain",
            {
              "?query": {
                key1: "okok",
                key2: 123,
                // pattern의 쿼리와 동일하게 해서 값을 입력
              },
            },
            true
          ); // 메인페이지로 돌아가기
        }
      },
    });
  }
);
