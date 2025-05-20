sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/routing/History",
  ],
  (Controller, Filter, FilterOperator, History) => {
    "use strict";

    return Controller.extend("sync.dc.pp.project33.controller.Detail", {
      onInit() {
        this.oViewModel = new sap.ui.model.json.JSONModel({ customerName: "" });
        this.getView().setModel(this.oViewModel, "view");

        this.oRouter = this.getOwnerComponent().getRouter();
        this.oRouter
          .getRoute("RouteDetail")
          .attachPatternMatched(this._onPatternMatched, this);

        var oPf2Model = new sap.ui.model.json.JSONModel({
          nodes: [
            {
              id: "1",
              lane: "0",
              title: "고객주문",
              state: "Positive",
              stateText: "접수완료",
              children: ["2"],
              texts: ["SO_DOCU_ID 기준"],
              focused: true,
            },
            {
              id: "2",
              lane: "1",
              title: "생산운영계획",
              state: "Planned",
              stateText: "미수립",
              children: ["3"],
              texts: ["OP 데이터 없음"],
            },
            {
              id: "3",
              lane: "2",
              title: "계획주문",
              state: "Planned",
              stateText: "미생성",
              children: ["4"],
              texts: ["OP_STATUS = 0"],
            },
            {
              id: "4",
              lane: "3",
              title: "생산오더",
              state: "Planned",
              stateText: "미생성",
              children: ["5"],
              texts: ["PO_STATUS 없음"],
            },
            {
              id: "5",
              lane: "4",
              title: "출고 상태",
              state: "Planned",
              stateText: "출고 전",
              texts: ["납품문서 없음"],
            },
          ],
          lanes: [
            {
              id: "0",
              icon: "sap-icon://sales-order",
              label: "고객주문",
              position: 0,
              state: { text: "Positive" },
            },
            {
              id: "1",
              icon: "sap-icon://factory",
              label: "생산계획",
              position: 1,
              state: { text: "Planned" },
            },
            {
              id: "2",
              icon: "sap-icon://create-form",
              label: "계획주문",
              position: 2,
              state: { text: "Planned" },
            },
            {
              id: "3",
              icon: "sap-icon://shipping-status",
              label: "생산오더",
              position: 3,
              state: { text: "Planned" },
            },
            {
              id: "4",
              icon: "sap-icon://outbox",
              label: "출고상태",
              position: 4,
              state: { text: "Planned" },
            },
          ],
        });
        this.getView().setModel(oPf2Model, "pf2");
      },

      _onPatternMatched: function (oEvent) {
        var sCustId = oEvent.getParameter("arguments").customerId;
        this._filterByCustId(sCustId);
      },

      _filterByCustId: function (sCustId) {
        var oODataModel = this.getView().getModel(); // ODataModel
        var that = this;

        // ODataModel에서 데이터 읽기 (필터 적용)
        oODataModel.read("/ZDCC_MATFLOW", {
          filters: [new Filter("cust_id", FilterOperator.EQ, sCustId)],
          success: function (oData) {
            // 중복 없는 so_docu_id만 추출
            var aResults = oData.results;

            // 고객명 추출 (첫 번째 결과의 cust_name 사용)
            var sCustName = aResults.length > 0 ? aResults[0].cust_name : "";
            that
              .getView()
              .getModel("view")
              .setProperty("/customerName", sCustName);

            var aUnique = [];
            var oSeen = {};

            // 오늘 날짜 구하기 (yyyy-mm-dd)
            var oToday = new Date();
            oToday.setHours(0, 0, 0, 0);

            aResults.forEach(function (item) {
              // req_deli_date가 오늘 이후인지 체크
              var oReqDate = new Date(item.req_deli_date);
              oReqDate.setHours(0, 0, 0, 0);

              if (!oSeen[item.so_docu_id]) {
                oSeen[item.so_docu_id] = true;
                aUnique.push(item);
              }
            });

            // req_deli_date가 가까운 순으로 오름차순 정렬
            aUnique.sort(function (a, b) {
              var dateA = new Date(a.req_deli_date);
              var dateB = new Date(b.req_deli_date);
              return dateA - dateB;
            });

            // 리스트 개수 출력
            sap.m.MessageToast.show("조회된 주문 건수: " + aUnique.length);

            // 중복 제거된 데이터로 JSONModel 생성
            var oJsonModel = new sap.ui.model.json.JSONModel({
              items: aUnique,
            });
            that.getView().setModel(oJsonModel, "uniqueOrders");
          },
        });
      },

      onOrderSelect: function (oEvent) {
        var oSelected = oEvent
          .getParameter("listItem")
          .getBindingContext("uniqueOrders")
          .getObject();
        var sSoDocuId = oSelected.so_docu_id;
        var that = this;

        var oODataModel = this.getView().getModel();

        oODataModel.read("/ZDCC_MATFLOW", {
          filters: [new Filter("so_docu_id", FilterOperator.EQ, sSoDocuId)],
          success: function (oData) {
            var aResults = oData.results;
            var oStatusMap = {
              sop: false,
              op_status: "0",
              po_status: "0",
              delivery_status: "0",
            };

            aResults.forEach(function (item) {
              if (item.op_id) oStatusMap.sop = true;
              if (item.op_status === "1") oStatusMap.op_status = "1";
              if (item.po_status > oStatusMap.po_status)
                oStatusMap.po_status = item.po_status;
              if (item.status === "2") oStatusMap.delivery_status = "2";
            });

            // pf2 모델을 복사해서 상태 업데이트
            var oPf2Model = that.getView().getModel("pf2");
            var aNodes = oPf2Model.getProperty("/nodes");

            aNodes.forEach(function (node) {
              switch (node.id) {
                case "2": // 생산운영계획
                  node.state = oStatusMap.sop ? "Positive" : "Planned";
                  node.stateText = oStatusMap.sop ? "계획수립됨" : "미수립";
                  break;
                case "3": // 계획주문
                  node.state =
                    oStatusMap.op_status === "1" ? "Positive" : "Planned";
                  node.stateText =
                    oStatusMap.op_status === "1" ? "생성됨" : "미생성";
                  break;
                case "4": // 생산오더
                  if (oStatusMap.po_status === "3") {
                    node.state = "Positive";
                    node.stateText = "생산완료";
                  } else if (oStatusMap.po_status === "2") {
                    node.state = "Critical";
                    node.stateText = "출고 완료";
                  } else if (oStatusMap.po_status === "1") {
                    node.state = "Negative";
                    node.stateText = "출고 전";
                  } else {
                    node.state = "Planned";
                    node.stateText = "미생성";
                  }
                  break;
                case "5": // 납품 상태
                  node.state =
                    oStatusMap.delivery_status === "2" ? "Positive" : "Planned";
                  node.stateText =
                    oStatusMap.delivery_status === "2"
                      ? "출고 완료"
                      : "출고 전";
                  break;
              }
            });

            oPf2Model.setProperty("/nodes", aNodes); // 추가
            oPf2Model.refresh(true);

            // 테이블 데이터도 같이 갱신
            var oTableModel = new sap.ui.model.json.JSONModel({
              items: aResults,
            });
            that.getView().setModel(oTableModel, "selectedOrder");
          },
        });
      },
      onGoBack() {
        console.log("onGoBack");

        var oHistory = History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1); // 브라우저 히스토리 뒤로가기
        } else {
          this.oRouter.navTo("RouteMain", {}, true); // 없으면 메인으로
        }
      },
    });
  }
);
