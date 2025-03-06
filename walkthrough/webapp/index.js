sap.ui.define(["sap/ui/core/ComponentContainer"], (ComponentContainer) => {
  "use strict";

  new ComponentContainer({
    name: "ui5.walkthrough",
    settings: {
      id: "walkthrough",
    },
    async: true,
  }).placeAt("content");
});

// sap.ui.define(
//   ["sap/ui/core/mvc/XMLView"],

//   function (XMLView) {
//     "use strict";

//     XMLView.create({
//       viewName: "ui5.walkthrough.view.App",
//     }).then(function (oView) {
//       oView.placeAt("content");
//     });
//   }
// );

// data-sap-ui-on-init="module:ui5/walkthrough/index" : 모듈 정의를 index.js에서 하겠다.
// 비동기 구동을 통해서 필요한 UI5 컨트롤이나 라이브러리를 로드하여, 깨지지 않고 구동될 수 있도록 함

// sap.ui.define(["sap/m/Text"], function (Text) {
//   "use strict"; // 엄격 관리

//   // alert("UI5 is ready"); // bootstrapping 확인 위함

//   // 생성자 메소드로부터 객체 생성
//   new Text({
//     text: "Hello World",
//   }).placeAt("content");
//   /* placeAt : sap-ui-core에 상속받은 컨트롤들이 사용가능한 메소드
//      기능 : HTML 파일의 해당 요소에 삽입하라. 위치 시켜라는 의미
//             DOM에 직접 랜더링하지 않고 컨트롤에게 삽입시켜 랜더링 */
// });

// 초기화
// sap.ui.define() -> 모듈 로딩 함수
// sap.ui.define(["sap/m/Text"], (Text) => {
//   // 화살표 함수 표현
//   "use strict"; // 엄격하게 문법을 관리함을 의미

//   new Text({
//     text: "Hello World",
//   }).placeAt("content");
// });

// sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
//   MessageBox.show("This message should appear in the message box.", {
//     icon: MessageBox.Icon.INFORMATION,
//     title: "My message box title",
//     actions: [MessageBox.Action.YES, MessageBox.Action.NO],
//     emphasizedAction: MessageBox.Action.YES,
//     onClose: function (oAction) {},
//   });
// });
