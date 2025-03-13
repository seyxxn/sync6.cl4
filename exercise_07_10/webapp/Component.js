sap.ui.define(
  ["sap/ui/core/UIComponent", "sync/d07/exercise0710/model/models"],
  (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("sync.d07.exercise0710.Component", {
      metadata: {
        manifest: "json",
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
      },

      init() {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);

        // set the device model
        this.setModel(models.createDeviceModel(), "device");

        // enable routing
        this.getRouter().initialize(); // 여기에서 라우터가 만들어진다 !! (원래 작성되어있는 코드임)
      },
    });
  }
);
