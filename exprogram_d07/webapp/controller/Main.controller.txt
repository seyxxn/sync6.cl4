sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageToast",
    "sap/ui/core/format/DateFormat",
  ],
  (Controller, ODataModel, MessageToast, DateFormat) => {
    "use strict";

    return Controller.extend("cl4.exprogramd07.controller.Main", {
      onInit() {
        // oData model 생성 및 설정
        var oModel = new ODataModel("/sap/opu/odata/sap/ZEXAM_MEMBER_D07_SRV/");
        // View에 모델 설정
        this.getView().setModel(oModel, "member"); // 모델 이름 명시

        // 한 단계 위에 있는 컴포넌트에 접근해서, 라우터를 가져온다
        this.oRouter = this.getOwnerComponent().getRouter(); // 컨트롤러에 유효한 객체
        // 해당 컴포넌트에서 라우터를 가져오게 된다
        this.oRouter
          .getRoute("RouteMain")
          .attachPatternMatched(this._onPatternMatched, this);
      },

      // pattern이 일치할 때 마다 실행되는 이벤트
      _onPatternMatched(oEvent) {
        // 초기화, 셋팅, 매개변수 찾기
        // 특정한 파라미터 가져올 때
        var oArgu = oEvent.getParamter("argument");
      },

      // 회원등록 버튼 클릭 시 다이얼로그 창 띄우기
      async onCreatePress() {
        this.oDialog ??= await this.loadFragment({
          name: "cl4.exprogramd07.view.CreateMember",
        });

        this.oDialog.open();
      },

      // 다이얼로그 창 닫기
      onCloseDialog() {
        this.oDialog.close();
      },

      // 다이얼로그 창에서 저장 버튼 눌렀을 때
      onCreate() {
        var oModel = this.getView().getModel("member");

        // 다이얼로그 창에서 입력한 값 가져오기
        var sName = this.getView().byId("name_dialog").getValue();
        var sBdate = this.getView().byId("bdate_dialog").getValue();
        var sGender = this.getView().byId("gender_dialog").getValue();
        var sCity = this.getView().byId("city_dialog").getValue();
        var sCountry = this.getView().byId("country_dialog").getValue();
        var sTel = this.getView().byId("tel_dialog").getValue();
        var sEmail = this.getView().byId("email_dialog").getValue();

        // sBdate는 Edm.DateTime 형식으로 변환
        sBdate = DateFormat.getDateInstance({
          pattern: "yyyy-MM-ddT00:00:00",
        }).format(new Date(sBdate));

        // console.log(sBdate); // 2001-01-15T00:00:00

        // 입력값을 객체로 만들기
        var oEntry = {
          Name: sName,
          Bdate: sBdate,
          Gender: sGender,
          City: sCity,
          Country: sCountry,
          Telephone: sTel,
          Email: sEmail,
        };
        // console.log(oEntry);

        // 필수 입력값 검증
        if (
          !oEntry.Name ||
          !oEntry.Bdate ||
          !oEntry.Gender ||
          !oEntry.City ||
          !oEntry.Country ||
          !oEntry.Telephone ||
          !oEntry.Email
        ) {
          MessageToast.show("필수 값을 모두 입력해주세요.", {
            width: "auto",
          });
          return;
        }

        // 데이터 생성
        oModel.create("/MemberSet", oEntry, {
          success: () => {
            MessageToast.show("회원 정보가 저장되었습니다.", {
              width: "auto",
            });
            oModel.refresh();
            this.oDialog.close(); // 다이얼로그 창 닫기
          },
          error: () => {
            MessageToast.show("회원 정보 저장 실패", {
              width: "auto",
            });
          },
        });
      },

      // 메인에서 버튼 누르면 움직이는 함수
      onGoDetail() {
        var oTable = this.getView().byId("mTable"); // 뷰에 존재하는 테이블 가져오기
        var sSelect = oTable.getSelectedItem(); // 테이블 내에서 선택한 아이템 가져오기

        // 선택한 아이템을 member 모델에 바인딩하고, 객체 가져오기
        var oData = sSelect.getBindingContext("member").getObject();
        var sId = oData.Id;

        // 라우터를 이용하여 상세 페이지로 이동
        this.oRouter.navTo("RouteDetail", { id: sId }, true); // uri에 아이디 값 넘기기
      },
    });
  }
);
