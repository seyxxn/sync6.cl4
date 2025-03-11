sap.ui.define([], function () {
    "use strict";

    return {
        isExpensive(sPrice) {
            return parseFloat(sPrice) > 5000 ? "Flagged" : "Favorite";
        },

        formatStatus(sStatus) {
            const oResourceBundle = this.getOwnerComponent()
            .getModel("i18n")
            .getResourceBundle();


            switch (sStatus) {
                case "1":
                    return oResourceBundle.getText("instock");
                case "2":
                    return oResourceBundle.getText("outstock");
                default:
                    return sStatus;
            }
            

            // const sIn = oResourceBundle.getText("instock");
            // const sOut = oResourceBundle.getText("outstock");

            // return sStatus === 1 ? sIn : sOut;
        }
    };
});