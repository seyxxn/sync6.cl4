sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageToast",
  ],
  (Controller, ODataModel, MessageToast) => {
    "use strict";

    return Controller.extend("sync.d07.mtrd07test.controller.View", {
      onInit() {
        // OData 모델 생성 및 설정
        var oModel = new ODataModel("/sap/opu/odata/sap/ZT001_D07_SRV/");
        // View에 모델 설정
        this.getView().setModel(oModel, "myModel");
      },
      // 버튼 클릭 시 호출될 함수 정의
      onCreate() {
        // OData 모델 가져오기
        var oModel = this.getView().getModel("myModel");

        // 새로운 레코드 생성
        var oEntry = {
          Bukrs: this.getView().byId("bukrs").getValue(),
          Butxt: this.getView().byId("butxt").getValue(),
          Ort01: this.getView().byId("ort01").getValue(),
          Land1: this.getView().byId("land1").getValue(),
          Waers: this.getView().byId("waers").getValue(),
        };

        if (
          oEntry.Bukrs === "" ||
          oEntry.Butxt === "" ||
          oEntry.Ort01 === "" ||
          oEntry.Land1 === "" ||
          oEntry.Waers === ""
        ) {
          MessageToast.show("데이터를 모두 입력해주세요.");
          return;
        }

        // 새로운 레코드 추가
        oModel.create("/ZT001_D07Set", oEntry, {
          success: () => {
            MessageToast.show("데이터가 성공적으로 생성되었습니다.");
            oModel.refresh(true); // 입력된 데이터가 다시 조회되도록 refresh 함수 호출
            // *refresh 안됨 ..
          },
          error: () => {
            MessageToast.show("데이터생성 오류");
          },
        });
      },
      // 버튼 클릭 시 삭제 함수 정의
      onDelete() {
        // OData 모델 가져오기
        var oModel = this.getView().getModel("myModel");

        // 데이터 모델이 적용된 테이블 객체 가져오기
        var oTable = this.getView().byId("mTable");

        // 선택된 아이템 가져오기 (여러개)
        var aSelectedItems = oTable.getSelectedItems();

        if (aSelectedItems.length === 0) {
          MessageToast.show("삭제할 항목을 선택해주세요", { width: "auto" });
          return;
        }

        aSelectedItems.forEach((oItem, index) => {
          var sPath = oItem.getBindingContext().getPath();
          console.log("삭제할 데이터 경로:", sPath);

          oModel.remove(sPath, {
            success: () => {
              console.log("삭제 성공:", sPath);

              // 마지막 삭제 요청이 완료된 경우 테이블 갱신
              if (index === aSelectedItems.length - 1) {
                MessageToast.show("선택한 항목이 성공적으로 삭제되었습니다.");
                oTable.removeSelections(true); // 선택 해제
                oModel.refresh(true); // 모델 새로고침
              }
            },
            error: () => {
              MessageToast.show("삭제에 실패했습니다.");
            },
          });
        });
      },
    });
  }
);
