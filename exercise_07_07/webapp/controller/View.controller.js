sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel", // ODataModel 모듈 추가
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller, ODataModel, MessageToast, MessageBox) => {
    "use strict";

    return Controller.extend("exercise0707.controller.View", {
        onInit() {
            // OData 모델 생성 및 설정
            var oModel = new ODataModel("/sap/opu/odata/sap/ZCARR_D07_SRV/");
            // View에 모델 설정
            this.getView().setModel(oModel, "myModel");
        },
                // // 버튼 클릭 시 호출될 함수 정의
                // onCreate() {
                //     // OData 모델 가져오기
                //     var oModel = this.getView().getModel("myModel");
                //     // 새로운 레코드 생성
                //     var oEntry = {
                //         Carrid: this.getView().byId("carrid").getValue(),
                //         Carrname: this.getView().byId("carrname").getValue(),
                //         Currcode: this.getView().byId("currcode").getValue(),
                //         Url: this.getView().byId("url").getValue()
                //     };
        
                //     if (oEntry.Carrid === "" || oEntry.Carrname === "" || oEntry.Currcode === "" || oEntry.Url === "") {
                //         MessageToast.show("항공사 데이터를 모두 입력해주세요.", {width : "auto"});
                //         return;
                //     }
        
                //     // 새로운 레코드 추가
                //     oModel.create("/ZCARR_D07Set", oEntry, {
                //         success: () => {
                //             MessageToast.show("항공사 데이터가 성공적으로 생성되었습니다." , {width : "auto"});
                //             this.getView().getModel("myModel").refresh(); // 입력된 데이터가 다시 조회되도록 refresh 함수 호출
                //         },
                //         error: () => {
                //             MessageToast.show("데이터생성 오류" , {width : "auto"});
                //         }
                //     }); 
                // },
        onCreate() {
            var oModel = this.getView().getModel("myModel");
            var sCarrid = this.getView().byId("carrid").getValue(); // 키 값
            var that = this;
            // 콜백 내부에서 컨트롤러의 this가 변경될 수 있기 때문에 that 변수 현재 컨트롤러 객체를 저장(exercise0707.controller.View)

            var oEntry = {
                Carrid: sCarrid,
                Carrname: this.getView().byId("carrname").getValue(),
                Currcode: this.getView().byId("currcode").getValue(),
                Url: this.getView().byId("url").getValue()
            };
        
            // 1️⃣ 필수 입력값 검증
            if (!oEntry.Carrid || !oEntry.Carrname || !oEntry.Currcode || !oEntry.Url) {
                MessageToast.show("항공사 데이터를 모두 입력해주세요.", { width: "auto" });
                return;
            }
        
            // 2️⃣ OData에서 기존 키(Carrid) 존재 여부 확인
            oModel.read("/ZCARR_D07Set('" + sCarrid + "')", {
                success: function() {
                    // 이미 존재하는 경우
                    MessageToast.show("이미 존재하는 항공사 코드입니다.", { width: "auto" });
                },
                error: function() {
                    // 3️⃣ 존재하지 않으면 데이터 생성 수행
                    oModel.create("/ZCARR_D07Set", oEntry, {
                        success: function() {
                            MessageToast.show("항공사 데이터가 성공적으로 생성되었습니다.", { width: "auto" });
                            oModel.refresh(true);

                            // 여기서 만약 that이 아닌 this를 사용한다면 oModel을 가르키게됨
                            // 새로운 값 입력 후, 인풋 필드를 비워줌
                            that.getView().byId("carrid").setValue("");
                            that.getView().byId("carrname").setValue("");
                            that.getView().byId("currcode").setValue("");
                            that.getView().byId("url").setValue("");
                        },
                        error: function() {
                            MessageToast.show("데이터 생성 오류", { width: "auto" });
                        }
                    });
                }
            });
        },
        // 버튼 클릭시 삭제 함수 정의
        onDelete(){
            // OData 모델 가져오기
            var oModel = this.getView().getModel("myModel");

            // 데이터 모델이 적용된 테이블 객체 가져오기
            var oTable = this.getView().byId("mTable");

            // 선택된 아이템 가져오기
            var sSelect = oTable.getSelectedItem();
            
            // 선택된 아이템이 없는 경우
            if (sSelect === null) {
                MessageToast.show("삭제할 항목을 선택해주세요.", {width : "auto"});
                return;
            }

            // 선택된 항목의 경로 찾기
            var sPath = sSelect.getBindingContext("myModel").getPath();

            // var oData = sSelect.getBindingContext("myModel").getObject(); // 선택된 항목의 데이터 가져오기
            // console.log(oData);

            // 삭제
            oModel.remove(sPath,{
                success: () => {
                    MessageToast.show("데이터가 성공적으로 삭제되었습니다.", {width : "auto"});
                    oTable.removeSelections(); // 선택된 항목 삭제
                    oModel.refresh(true);  // 삭제된 데이터가 반영될 수 있도록 refresh 함수 호출
                },
                error: () => {
                    MessageToast.show("데이터 삭제에 실패했습니다.", {width : "auto"});
                }
            }); 
            
        },
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
                "Carrid : " + oData.Carrid +
                "\nCarrname : " + oData.Carrname +
                "\nCurrcode : " + oData.Currcode +
                "\nUrl : " + oData.Url +
                "\n\n항공사를 정말 삭제하시겠습니까?",
                {
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.YSE,
                    onClose: (sAction) => { 
                        if (sAction === MessageBox.Action.YES) {
                            // 사용자가 YES를 누른 경우만 삭제
                            oModel.remove(sPath, {
                                success: () => {
                                    MessageToast.show("데이터가 성공적으로 삭제되었습니다.", { width: "auto" });
                                    oTable.removeSelections(); // 선택된 항목 삭제
                                    oModel.refresh(true); // 삭제된 데이터 반영
                                },
                                error: () => {
                                    MessageToast.show("데이터 삭제에 실패했습니다.", { width: "auto" });
                                }
                            });
                        }else if (sAction === MessageBox.Action.NO) {
                            MessageToast.show("삭제가 취소되었습니다.", { width: "auto" });
                            oTable.removeSelections(); // 선택된 항목 삭제
                        }
                    }
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
            // this.getView().setModel(oUpdateModel, "updateModel"); // 모델을 뷰에 설정
            
            this.oDialog ??= await this.loadFragment({
                name: "exercise0707.view.UpdateDialog",
            });

            // 수정 - 다이얼로그에 모델을 설정함
            this.oDialog.setModel(oUpdateModel, "updateModel");
            this.oDialog.open();
        },

        onCloseDialog() {
            this.byId("updateDialog").close();
        },        
        
        onUpdate(){
            // OData 모델 가져오기
            var oModel = this.getView().getModel("myModel");

             // 데이터 모델이 적용된 테이블 객체 가져오기
            var oTable = this.getView().byId("mTable");

             // 선택된 아이템 가져오기
            var sSelect = oTable.getSelectedItem();

            // 선택된 항목의 아이템 객체 가져오기
            // var oData = sSelect.getBindingContext("myModel").getObject();

            // 선택된 항목의 경로 찾기
            var sPath = sSelect.getBindingContext("myModel").getPath();

            // oData.Carrname = this.getView().byId("carrname_dialog").getValue();
            // oData.Url = this.getView().byId("url_dialog").getValue();

            var oUpdateModel = this.oDialog.getModel("updateModel");
            var oUpdatedData = oUpdateModel.getData();
            

            oModel.update(sPath, oUpdatedData, {
                success: () => {
                    MessageToast.show("데이터가 성공적으로 수정되었습니다.", { width: "auto" });
                    oModel.refresh(true); // 삭제된 데이터 반영
                },
                error: () => {
                    MessageToast.show("데이터 수정에 실패했습니다.", { width: "auto" });
                }
            });
            this.byId("updateDialog").close(); // 다이얼로그 닫기
        }
    });
});