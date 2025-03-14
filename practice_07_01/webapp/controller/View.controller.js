sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (Controller, JSONModel, MessageBox, Filter, FilterOperator) => {
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
        // // 모델 가져오기 (모든 데이터가 가져와짐)
        // var oModel = this.getView().getModel("teacher");

        // // gender 개수 카운트 함수
        // var aChartData = this.getGenderCount(oModel);

        // 1. 테이블에 있는 데이터로 가져오기 (그래야 필터링된 데이터로 차트가 가져와짐)
        var oTable = this.getView().byId("uiTable"); // 테이블 가져오기
        var aFilteredContexts = oTable.getBinding("rows").getContexts();
        // 현재 테이블에 바인딩된 데이터 가져오기 (현재 UI에 보이는 데이터만 가져올 수 있음)

        // 2. 가져온 데이터를 객체 형태로 변환
        var aFilteredData = aFilteredContexts.map(
          (oContext) => oContext.getObject() // getObject를 이용하여 각 바인딩된 데이터 항목을 객체 형태로 변환하기
        );
        // 이전에는 전체 데이터를 모델에서 직접 가져왔기 때문에 이 과정이 필요하지 않았음
        // UI5에서는 바인딩된 데이터가 컨텍스트 객체로 관리됨 !!
        // -> 따라서, 테이블에서 가져오는 테이터를 우리가 원하는 JSON 형태로 변환해야 차트에서 사용이 가능함 !

        // *참고) 컨텍스트 객체는 데이터를 직접 담고있는 것이 아니라, 데이터의 참조를 가지고 있음
        // 따라서, 컨텍스트 객체를 이용하여 데이터를 가져올 때는 getObject를 이용하여
        // 컨텍스트 객체가 참조하는 실제 데이터를 가져와야 함
        // -> 즉, getObject()를 호출하여 컨텍스트 안에 있는 실제 JSON 데이터를 반환함

        // 3. 필터링된 데이터를 새로운 JSON 모델로 변환
        var oFilteredModel = new JSONModel({ data: aFilteredData });
        // 차트는 JSON 모델을 사용하여 데이터를 바인딩 하기 때문에
        // 테이블에서 가져온 필터링된 데이터를 차트에서 사용하려면 JSON 모델로 변환해야 함

        // 4. 차트에서 사용할 데이터 생성하기
        var aChartData = this.getGenderCount(oFilteredModel);
        // getGenderCount 함수를 이용하여 성별 데이터를 카운트하여
        // 차트를 만들 때 필요한 데이터 형태로 변환하기 !

        // 5. 차트에 사용할 모델을 설정
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

        // console.log(oCount.남성, oCount.여성);

        // 차트 데이터 형식으로 변환
        return [
          { Category: "남성", Count: oCount.남성 },
          { Category: "여성", Count: oCount.여성 },
        ];
      },
      onSearch() {
        const sClass = this.getView().byId("classFilter").getValue(); // 검색할 반
        const sGender = this.getView().byId("genderFilter").getSelectedKey(); // 검색할 성별

        const oTable = this.getView().byId("uiTable");
        const oBinding = oTable.getBinding("rows");
        // ui.table은 rows로 바인딩 (+ m.table은 items로 바인딩)

        const aFilters = [];

        console.log(sClass, sGender);

        if (sClass) {
          aFilters.push(new Filter("class", FilterOperator.Contains, sClass));
          // "class"는 oData의 속성명
        }

        // console.log(aFilters);

        if (sGender === "male") {
          // 남성
          aFilters.push(new Filter("gender", FilterOperator.EQ, "남성"));
        } else if (sGender === "female") {
          // 여성
          aFilters.push(new Filter("gender", FilterOperator.EQ, "여성"));
        } else {
          // 전체 -> 아무것도 안함
        }

        oBinding.filter(aFilters);

        // console.log(sClass, sGender);
      },
    });
  }
);
