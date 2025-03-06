sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("sync.d07.exercise0705.controller.View", {
      onInit() {},
      onPress: function () {
        // 값을 가져오는 2가지 방법

        var sMsg = this.getView().byId("input").getValue(); // id로 가져오기
        // var sMsg = this.getView().getModel().getProperty("/input");  // Model의 값으로 가져오기

        if (!sMsg) sMsg = "메세지를 입력바랍니다."; // 만약 메세지를 입력하지 않은 경우

        MessageToast.show(sMsg);
      },

      onReset() {
        let oModel = this.getView().getModel(); // 모델 가져오기
        if (oModel) {
          // oModel.setProperty("/input", null);
          oModel.setProperty("/input").onReset; // 기존에 존재하는 초기화 메서드 사용 가능
        }
      },
    });
  }
);
