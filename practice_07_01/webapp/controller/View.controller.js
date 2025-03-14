sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
  ],
  (Controller, JSONModel, MessageBox) => {
    "use strict";

    return Controller.extend("sync.d07.practice0701.controller.View", {
      onInit() {
        var oData = {
          Default: "전체",
          Gender: [
            {
              type: "all",
              text: "전체",
            },
            {
              type: "male",
              text: "남성",
            },
            {
              type: "female",
              text: "여성",
            },
          ],
        };

        var oGenderModel = new JSONModel(oData);
        this.getView().setModel(oGenderModel, "gender");
      },

      onConfirmationButtonPress(oEvent) {
        // // 모델 가져오기
        // var oModel = this.getView().getModel("teacher");
        // var sName = oModel.getProperty(
        //   "Name",
        //   oEvent.getSource().getBindingContext("teacher")
        // );
        // var sClass = oModel.getProperty(
        //   "class",
        //   oEvent.getSource().getBindingContext("teacher")
        // );
        // var sGender = oModel.getProperty(
        //   "gender",
        //   oEvent.getSource().getBindingContext("teacher")
        // );
        // MessageBox.information(
        //   "이름 : " + sName + "\n클래스 : " + sClass + "\n성별 : " + sGender,
        //   {
        //     title: "상세 정보",
        //   }
        // );

        // // 모델 가져오기
        // var oModel = this.getView().getModel("teacher");
        // 바인딩 컨텍스트 가져오기
        var oContext = oEvent.getSource().getBindingContext("teacher");

        if (!oContext) {
          MessageBox.error("데이터를 찾을 수 없습니다.");
          return;
        }

        // 필요한 속성 추출
        var oData = oContext.getObject();
        var sMessage = `이름 : ${oData.Name}\n클래스 : ${oData.class}\n성별 : ${oData.gender}`;

        MessageBox.information(sMessage, { title: "상세 정보" });
      },

      async onDialogChartPress() {
        // 모델 가져오기
        var oModel = this.getView().getModel("teacher");

        // gender 개수 카운트 함수
        var aChartData = this.getGenderCount(oModel);

        // chart Model 생성 및 설정
        var oChartModel = new JSONModel({ data: aChartData });

        // 다이얼로그 없으면 생성
        this.oDialog ??= await this.loadFragment({
          name: "sync.d07.practice0701.view.ChartDialog", // 경로 주의 **
        });

        // 다이얼로그에 모델을 설정함
        this.oDialog.setModel(oChartModel, "chartModel");
        this.oDialog.open();
      },

      onCloseDialog() {
        this.byId("chartDialog").close();
      },

      getGenderCount(oModel) {
        var oData = oModel.getData(); // 전체 데이터 가져오기
        var aTeachers = oData.data || []; // teacher 목록 (배열)

        var oCount = { 남성: 0, 여성: 0 };

        // Gender 개수 카운트
        aTeachers.forEach((oTeacher) => {
          if (oTeacher.gender === "남성") {
            oCount.남성++;
          } else if (oTeacher.gender === "여성") {
            oCount.여성++;
          }
        });

        console.log(oCount.남성, oCount.여성);

        // 차트 데이터 형식으로 변환
        return [
          { Category: "남성", Count: oCount.남성 },
          { Category: "여성", Count: oCount.여성 },
        ];
      },
    });
  }
);
