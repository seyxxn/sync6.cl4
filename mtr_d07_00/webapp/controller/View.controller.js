sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (Controller, JSONModel, MessageToast) => {
    "use strict";

    return Controller.extend("sync.d07.mtrd0700.controller.View", {
        onInit() {
            const oViewModel = new JSONModel({
                name : "",
                number : ""
            });
            this.getView().setModel(oViewModel, "view");
        },

        onPress(){
            // const oViewModel = this.getView().getModel("view");
            // const sName = oViewModel.getProperty("/name");
            // const sNumber = oViewModel.getProperty("/number");

            const sName = this.byId("name").getValue();
            const sNumber = this.byId("number").getValue();

            const oData = {
                name : sName,
                number : sNumber
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
    });
});