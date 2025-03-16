sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  (BaseController, JSONModel) => {
    "use strict";

    return BaseController.extend("sync.d07.practice0702.controller.Detail", {
      onInit() {
        this.oRouter = this.getOwnerComponent().getRouter(); // 컨트롤러에 유효한 객체
        // 해당 컴포넌트에서 라우터를 가져오게 된다 !
        this.oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._onPatternMatched, this);
      },

      _onPatternMatched(oEvent) {
        // [ 배열로 넘겨주는 방법 ]
        //1. URL 에서 전달된 파라미터 가져오기.
        var oArgu = oEvent.getParameters().arguments; // 배열
        // console.log("oArgu : ", oArgu);

        //2. 새로운 JSON 모델 생성하여 ID 값을 저장
        var oModel = new JSONModel(oArgu);
        // console.log("oModel : " + oModel);

        //3. 뷰에 "detailModel"로 모델 설정
        this.getView().setModel(oModel, "detailModel");

        // UTF-8 인코딩 적용해야 함 ..
        var sEncodedName = encodeURIComponent(oArgu.name);
        var sPath = "/ZTEACHER_D07Set('" + sEncodedName + "')"; // OData 경로 설정
        // console.log(sPath);

        // 저장시에 사용할 경로를 저장
        this.sUpdatePath = sPath;
      },

      onGoBack(oUpdatedData) {
        this.oRouter.navTo(
          "RouteView",
          {
            "?query": {
              name: oUpdatedData.name,
              class: oUpdatedData.class,
              gender: oUpdatedData.gender,
            },
          },
          true
        ); // 이름은 manifest에서 지정한 라우터 이름 가져오기
      },

      onUpdate() {
        var oComponent = this.getOwnerComponent();
        var oModel = oComponent.getModel("myModel");

        // 수정된 모델 가져오기
        var oDetailModel = this.getView().getModel("detailModel");
        // 수정된 데이터 가져오기
        var oUpdatedData = oDetailModel.getData();

        console.log(this.sUpdatePath);
        console.log(oUpdatedData);

        this.onGoBack(oUpdatedData);

        // oModel.update(this.sUpdatePath, oUpdatedData, {
        //   success: () => {
        //     MessageToast.show("데이터가 성공적으로 수정되었습니다.", {
        //       width: "auto",
        //     });
        //     oModel.refresh(true); // 삭제된 데이터 반영
        //     this.onGoBack();
        //   },
        //   error: () => {
        //     MessageToast.show("데이터 수정에 실패했습니다.", { width: "auto" });
        //   },
        // });
      },
    });
  }
);
