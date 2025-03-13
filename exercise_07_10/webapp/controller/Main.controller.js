sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";

  return Controller.extend("sync.d07.exercise0710.controller.Main", {
    onInit() {
      // 한 단계 위에 있는 컴포넌트에 접근해서, 라우터를 가져온다
      // var oRouter = this.getOwnerComponent().getRouter();  // -> 이렇게하면 해당 함수에만 유효하기 때문에 아래 코드로 하기

      this.oRouter = this.getOwnerComponent().getRouter(); // 컨트롤러에 유효한 객체
      // 해당 컴포넌트에서 라우터를 가져오게 된다 !
    },

    // 메인에서 버튼 누르면 움직이는 함수
    onGoDetail() {
      // input 필드에 들어오는 값을 찾아서 매개변수로 전달하기 (key1에 전달)
      let sValue = this.getView().byId("idInput").getValue();

      this.oRouter.navTo(
        "RouteDetail",
        {
          key1: sValue,
          key2: 123,
        },
        true
      );
      // 이름은 manifest에서 지정한 라우터 이름 가져오기
      // 매개변수 같이 넘겨주려면 2번째 인자에 명시
    },
  });
});
