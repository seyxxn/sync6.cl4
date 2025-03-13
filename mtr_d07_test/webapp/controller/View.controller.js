sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
  ],
  (
    Controller,
    ODataModel,
    MessageToast,
    MessageBox,
    Filter,
    FilterOperator,
    JSONModel
  ) => {
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

        var bukrs = this.getView().byId("bukrs").getValue(); // 키 값가져오기
        var that = this; // 콜백 내부에서 컨트롤러의 this가 변경될 수 있기 때문에 that 변수 현재 컨트롤러 객체를 저장 (sync.d07.mtrd07test.controller.View)

        // 새로운 레코드 생성
        var oEntry = {
          Bukrs: this.getView().byId("bukrs").getValue(),
          Butxt: this.getView().byId("butxt").getValue(),
          Ort01: this.getView().byId("ort01").getValue(),
          Land1: this.getView().byId("land1").getValue(),
          Waers: this.getView().byId("waers").getValue(),
        };

        // 필수 입력 값 검증하기
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

        // 기존 키 존재 여부 확인
        oModel.read("/ZT001_D07Set('" + bukrs + "')", {
          success: function (oData) {
            // console.log(oData.Bukrs);
            MessageBox.error(oData.Bukrs + ": 이미 존재하는 키 값입니다.");

            // 인풋 필드를 비워줌
            that.getView().byId("bukrs").setValue("");
          },
          error: function () {
            // 새로운 레코드 추가
            oModel.create("/ZT001_D07Set", oEntry, {
              success: () => {
                MessageToast.show("데이터가 성공적으로 생성되었습니다.");
                oModel.refresh(true);
                // 입력된 데이터가 다시 조회되도록 refresh 함수 호출

                // 새로운 값 입력 후, 인풋 필드를 비워줌
                that.getView().byId("bukrs").setValue("");
                that.getView().byId("butxt").setValue("");
                that.getView().byId("ort01").setValue("");
                that.getView().byId("land1").setValue("");
                that.getView().byId("waers").setValue("");
              },
              error: () => {
                MessageToast.show("데이터생성 오류");
              },
            });
          },
        });
      },
      // 버튼 클릭 시 삭제 함수 정의
      onDelete() {
        // OData 모델 가져오기
        var oModel = this.getView().getModel("myModel");

        // 데이터 모델이 적용된 테이블 객체 가져오기
        var oTable = this.getView().byId("mTable");

        // 선택된 아이템 가져오기
        var sSelect = oTable.getSelectedItem();

        // 선택된 아이템이 없는 경우
        if (sSelect === null) {
          MessageToast.show("삭제할 항목을 선택해주세요.", { width: "auto" });
          return;
        }

        // 선택된 항목의 경로 찾기
        var sPath = sSelect.getBindingContext("myModel").getPath();

        oModel.remove(sPath, {
          success: () => {
            MessageToast.show("데이터가 성공적으로 삭제되었습니다.", {
              width: "auto",
            });
            oTable.removeSelections(); // 선택된 항목 삭제
            oModel.refresh(true); // 삭제된 데이터가 반영될 수 있도록 refresh 함수 호출
          },
          error: () => {
            MessageToast.show("데이터 삭제에 실패했습니다.", { width: "auto" });
          },
        });
      },
      // 삭제 창 눌렀을 때 호출될 함수 정의
      onConfirmationDeletePress() {
        // OData 모델 가져오기
        var oModel = this.getView().getModel("myModel");

        // 데이터 모델이 적용된 테이블 객체 가져오기
        var oTable = this.getView().byId("mTable");

        // 선택된 아이템 가져오기
        var sSelect = oTable.getSelectedItem();

        // 선택된 아이템이 없는 경우
        if (sSelect === null) {
          MessageToast.show("삭제할 항목을 선택해주세요.", { width: "auto" });
          return;
        }

        // 선택된 항목의 경로 찾기
        var sPath = sSelect.getBindingContext("myModel").getPath();
        // 선택된 항목의 아이템 객체 가져오기
        var oData = sSelect.getBindingContext("myModel").getObject();

        // MessageBox에서 YES를 눌렀을 때만 삭제 수행
        MessageBox.confirm(
          "Company Code : " +
            oData.Bukrs +
            "\nCompany Name : " +
            oData.Butxt +
            "\nCity : " +
            oData.Ort01 +
            "\nCountry/Reg. : " +
            oData.Land1 +
            "\nCurrency : " +
            oData.Waers +
            "\n\n정말 삭제하시겠습니까?",
          {
            actions: [MessageBox.Action.YES, MessageBox.Action.NO],
            emphasizedAction: MessageBox.Action.YSE,
            onClose: (sAction) => {
              if (sAction === MessageBox.Action.YES) {
                // 사용자가 YES를 누른 경우만 삭제
                oModel.remove(sPath, {
                  success: () => {
                    MessageToast.show("데이터가 성공적으로 삭제되었습니다.", {
                      width: "auto",
                    });
                    oTable.removeSelections(); // 선택된 항목 삭제
                    oModel.refresh(true); // 삭제된 데이터 반영
                  },
                  error: () => {
                    MessageToast.show("데이터 삭제에 실패했습니다.", {
                      width: "auto",
                    });
                  },
                });
              } else if (sAction === MessageBox.Action.NO) {
                MessageToast.show("삭제가 취소되었습니다.", { width: "auto" });
                oTable.removeSelections(); // 선택된 항목 삭제
              }
            },
          }
        );
      },
      async onDialogUpdatePress() {
        // 데이터 모델이 적용된 테이블 객체 가져오기
        var oTable = this.getView().byId("mTable");

        // 선택된 아이템 가져오기
        var sSelect = oTable.getSelectedItem();

        // 선택된 아이템이 없는 경우
        if (sSelect === null) {
          MessageToast.show("변경할 항목을 선택해주세요.", { width: "auto" });
          return;
        }

        // 선택된 항목의 아이템 객체 가져오기
        var oData = sSelect.getBindingContext("myModel").getObject();

        // 선택된 항목의 데이터를 이용하여 JSON 모델 생성
        var oUpdateModel = new sap.ui.model.json.JSONModel(oData); // oData를 이용하여 JSON 모델 생성

        this.oDialog ??= await this.loadFragment({
          name: "sync.d07.mtrd07test.view.UpdateDialog", // 경로 주의 **
        });

        // 다이얼로그에 모델을 설정함
        this.oDialog.setModel(oUpdateModel, "updateModel");
        this.oDialog.open();
      },

      onCloseDialog() {
        this.byId("updateDialog").close();
      },

      onUpdate() {
        // OData 모델 가져오기
        var oModel = this.getView().getModel("myModel");

        // 데이터 모델이 적용된 테이블 객체 가져오기
        var oTable = this.getView().byId("mTable");

        // 선택된 아이템 가져오기
        var sSelect = oTable.getSelectedItem();

        // 선택된 항목의 경로 찾기
        var sPath = sSelect.getBindingContext("myModel").getPath();

        // 기존 데이터 가져오기
        var oData = sSelect.getBindingContext("myModel").getObject();

        var oUpdateModel = this.oDialog.getModel("updateModel");
        var oUpdatedData = oUpdateModel.getData();

        console.log(oUpdatedData);

        // 만약 빈 값으로 둔다면 메세지 출력
        if (
          oUpdatedData.Bukrs === "" ||
          oUpdatedData.Butxt === "" ||
          oUpdatedData.Ort01 === "" ||
          oUpdatedData.Land1 === "" ||
          oUpdatedData.Waers === ""
        ) {
          MessageToast.show("데이터를 모두 입력해주세요.", { width: "auto" });
          return;
        }

        // 기존의 값과 모두 동일하다면 메세지 출력
        if (
          oUpdatedData.Bukrs === oData.Bukrs &&
          oUpdatedData.Butxt === oData.Butxt &&
          oUpdatedData.Ort01 === oData.Ort01 &&
          oUpdatedData.Land1 === oData.Land1 &&
          oUpdatedData.Waers === oData.Waers
        ) {
          MessageToast.show("변경된 데이터가 없습니다.", { width: "auto" });
          return;
        }

        oModel.update(sPath, oUpdatedData, {
          success: () => {
            MessageToast.show("데이터가 성공적으로 수정되었습니다.", {
              width: "auto",
            });
            oModel.refresh(true); // 삭제된 데이터 반영
          },
          error: () => {
            MessageToast.show("데이터 수정에 실패했습니다.", { width: "auto" });
          },
        });
        this.byId("updateDialog").close(); // 다이얼로그 닫기
      },
      onSearch(oEvent) {
        const sQuery = oEvent.getParameter("query");
        console.log("검색어 입력:", sQuery);

        const oModel = this.getView().getModel("myModel"); // OData 모델 가져오기

        if (!oModel) {
          console.error("OData 모델을 찾을 수 없습니다.");
          return;
        }

        // ✅ 검색어가 없을 경우 초기 데이터 복원
        if (!sQuery) {
          console.log("검색어가 없으므로 데이터를 초기화합니다.");

          // OData에서 원래 데이터를 다시 가져오기
          oModel.read("/ZT001_D07Set", {
            success: function (oData) {
              console.log("초기 OData 데이터 로드 완료:", oData.results);

              // ✅ 초기 데이터를 JSON 모델로 변환하여 사용
              const oJsonModel = new sap.ui.model.json.JSONModel({
                TableData: oData.results,
              });

              // ✅ 테이블에 원래 JSONModel을 다시 적용
              this.getView().setModel(oJsonModel, "jsonModel");

              // ✅ 테이블 바인딩 갱신 (초기 데이터로 복원)
              const oTable = this.byId("mTable");
              oTable.setModel(oJsonModel, "myModel");
              oTable.bindAggregation(
                "items",
                "myModel>/TableData",
                oTable.getBindingInfo("items").template
              );

              console.log("테이블이 초기 데이터로 복원되었습니다.");
            }.bind(this),
            error: function (oError) {
              console.error("초기 데이터 로딩 실패:", oError);
              MessageToast.show("초기 데이터를 불러오는 데 실패했습니다.");
            },
          });

          return;
        }

        // ✅ 검색어가 있으면 필터링 실행
        oModel.read("/ZT001_D07Set", {
          success: function (oData) {
            console.log("OData에서 가져온 데이터:", oData.results);

            // ✅ OData 데이터를 JSON 모델로 변환
            const oJsonModel = new sap.ui.model.json.JSONModel({
              TableData: oData.results,
            });

            // ✅ JSON 모델을 View에 적용
            this.getView().setModel(oJsonModel, "jsonModel");

            // ✅ 필터링 실행
            this.applyFilter(sQuery, oJsonModel);
          }.bind(this),
          error: function (oError) {
            console.error("OData 요청 실패:", oError);
            MessageToast.show("OData 데이터를 불러오는 데 실패했습니다.");
          },
        });
      },

      applyFilter(sQuery, oJsonModel) {
        if (!sQuery) {
          console.warn("검색어가 비어 있으므로 필터링을 수행하지 않습니다.");
          return;
        }

        const aData = oJsonModel.getProperty("/TableData"); // JSON 모델에서 데이터 가져오기
        if (!aData) {
          console.warn("JSONModel에 데이터가 없습니다.");
          return;
        }

        // ✅ 필터링 실행 (대소문자 구분 없이 검색 가능하도록)
        const sQueryLower = sQuery.toLowerCase();
        const aFilteredData = aData.filter(
          (item) => item.Butxt && item.Butxt.toLowerCase().includes(sQueryLower)
        );

        console.log("필터링된 데이터:", aFilteredData);

        if (aFilteredData.length === 0) {
          MessageToast.show("검색 결과가 없습니다.");
        }

        // ✅ 필터링된 데이터를 JSONModel로 변환하여 사용 (ODataModel 대신 JSONModel 사용)
        const oFilteredJsonModel = new sap.ui.model.json.JSONModel({
          TableData: aFilteredData,
        });

        // ✅ 테이블에 JSONModel을 적용
        const oTable = this.byId("mTable");
        oTable.setModel(oFilteredJsonModel, "myModel");

        // ✅ 테이블 바인딩 갱신 (JSONModel을 사용하여 바인딩)
        oTable.bindAggregation(
          "items",
          "myModel>/TableData",
          oTable.getBindingInfo("items").template
        );

        console.log("JSONModel을 사용하여 필터링된 데이터 적용 완료.");
      },
    });
  }
);
