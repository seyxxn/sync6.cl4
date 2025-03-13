sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (Controller, JSONModel, MessageToast, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("sync.d07.mtrd0700.controller.View", {
      onInit() {
        const oViewModel = new JSONModel({
          name: "",
          number: "",
        });
        this.getView().setModel(oViewModel, "view");
      },

      onPress() {
        // const oViewModel = this.getView().getModel("view");
        // const sName = oViewModel.getProperty("/name");
        // const sNumber = oViewModel.getProperty("/number");

        const sName = this.byId("name").getValue();
        const sNumber = this.byId("number").getValue();

        const oData = {
          name: sName,
          number: sNumber,
        };

        if (oData.name === "" && oData.number === "") {
          MessageToast.show("값을 입력해주세요");
          return;
        }

        MessageToast.show(oData.name + " " + oData.number);
      },

      async onOpenDialog() {
        this.oDialog ??= await this.loadFragment({
          name: "sync.d07.mtrd0700.view.Dialog",
        });

        this.oDialog.open();
      },

      onCloseDialog() {
        // note: We don't need to chain to the pDialog promise, since this event handler
        // is only called from within the loaded dialog itself.
        this.byId("dialog").close();
      },

      onFilterFruits(oEvent) {
        // const aFilter = [];
        // const sQuery = oEvent.getParameter("query");
        // if (sQuery) {
        //   aFilter.push(
        //     new Filter("ProductName", FilterOperator.Contains, sQuery)
        //   );
        // }
        // const oList = this.byId("list");
        // const oBinding = oList.getBinding("items");
        // oBinding.filter(aFilter);

        const sQuery = oEvent.getParameter("query");
        const bPressed = this.getView().byId("toggle").getPressed();
        this.onFilter(sQuery, bPressed);
      },
      onFilterToggle(oEvent) {
        // const oButton = oEvent.getSource();
        // const bPressed = oButton.getPressed();
        // const oList = this.byId("list");
        // const oBinding = oList.getBinding("items");
        // if (!bPressed) {
        //   // 전체 다 보기
        //   if (oBinding) {
        //     oBinding.filter([]); // 모든 필터 제거
        //   }
        // } else {
        //   // 재고 있는 것만 보기
        //   const aFilter = [];
        //   aFilter.push(
        //     new Filter({
        //       path: "Quantity",
        //       operator: FilterOperator.GT,
        //       value1: 1.0,
        //     })
        //   );
        //   oBinding.filter(aFilter);
        // }
        // // 버튼 텍스트 변경
        // oButton.setText(
        //   bPressed ? "전체 다 보고싶으면 눌러" : "재고 있는거만 보고싶으면 눌러"
        // );

        // 버튼 객체 가져오기
        const oButton = oEvent.getSource();
        const bPressed = oButton.getPressed();

        // 버튼 텍스트 변경
        oButton.setText(
          bPressed ? "전체 다 보고싶으면 눌러" : "재고 있는거만 보고싶으면 눌러"
        );

        const sQuery = this.getView().byId("search").getValue();

        this.onFilter(sQuery, bPressed);
      },

      onFilter(sQuery, bPressed) {
        const oList = this.byId("list");
        const oBinding = oList.getBinding("items");

        const aFilter = []; // 필터 배열

        if (sQuery) {
          aFilter.push(
            new Filter("ProductName", FilterOperator.Contains, sQuery)
          );
        }

        if (bPressed) {
          aFilter.push(new Filter("Quantity", FilterOperator.GT, 0));
        }

        oBinding.filter(aFilter);
      },
    });
  }
);
