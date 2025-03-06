sap.ui.define([], () => {
  // UI5 모듈 시스템 사용 (추가적인 의존 모듈 사용하지 않음)
  "use strict";

  return {
    // statusText() 함수 : sStatus 값을 받아서 변환된 텍스트를 반환하는 함수
    statusText(sStatus) {
      // 다국어 지원을 위해 i18n 모델을 가져옴
      const oResourceBundle = this.getOwnerComponent()
        .getModel("i18n")
        .getResourceBundle();

      // switch문을 사용하여 변환을 수행
      switch (sStatus) {
        case "A":
          return oResourceBundle.getText("invoiceStatusA");
        case "B":
          return oResourceBundle.getText("invoiceStatusB");
        case "C":
          return oResourceBundle.getText("invoiceStatusC");
        default:
          return sStatus;
      }
    },
  };
});
