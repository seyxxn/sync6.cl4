sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("sync.d07.project1.controller.View", {
      onInit() {},

      onPress() {
        const oBundle = this.getView().getModel("i18n").getResourcebundle();

        // 기본 JSON 모델에서 /recipient/name 의 값을 가져온다
        const sRecipient = this.getView()
          .getModel()
          .getProperty("/recipient/name");

        // i18n 모델에서 선택된 리소스번들의 값(텍스트)과 기본 모델에서의 name 값 조합
        const sMsg = oBundle.getText("helloMsg", [sRecipient]);

        MessageToast.show(sMsg);
      },
    });
  }
);
