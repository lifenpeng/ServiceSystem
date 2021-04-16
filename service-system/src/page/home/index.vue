<template>
  <div class="home">
    <Row :gutter="16">
      <Col span="3"
        ><Button :long="true" size="large" type="success" @click="modalStatus"
          >登记</Button
        ></Col
      >
      <Col span="13"></Col>
      <Col span="3"
        ><Input size="large" v-model="number_keyword" placeholder="编号"
      /></Col>
      <Col span="3"
        ><Input size="large" v-model="phone_keyword" placeholder="手机号"
      /></Col>
      <Col span="2"
        ><Button style="width: 100%" size="large" type="primary" @click="search"
          >搜索</Button
        ></Col
      >
    </Row>
    <Table
      :border="true"
      style="margin-top: 10px; height: 85%"
      :columns="columns1"
      :data="orderData"
      :stripe="true"
      @on-cell-click="onCellClick"
    ></Table>
    <Page
      style="margin: 10px auto"
      :current="current"
      :total="all_recd"
      :page-size="page_size"
      @on-change="pageChange"
    />
    <Modal
      v-model="Modal"
      :title="`订单${
        status == 'add' ? '添加' : status == 'edit' ? '编辑' : status
      }`"
      class-name="modal"
      :transfer="true"
      @on-cancel="modalCancel"
      @on-ok="modalSure"
      :mask-closable="false"
      :closable="false"
      :highlight-row="true"
      :fullscreen="true"
      size="large"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="150"
      >
        <FormItem label="手机号" prop="phone">
          <Input
            size="large"
            v-model="formValidate.phone"
            placeholder="手机号"
          ></Input>
        </FormItem>
        <FormItem label="送取方式" prop="pattern_id">
          <Select
            size="large"
            v-model="formValidate.pattern_id"
            placeholder="送取方式"
          >
            <Option
              v-for="(item, index) in PickUpList"
              :key="index"
              :value="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="类型" prop="type_id">
          <Select
            size="large"
            @on-change="typeChange"
            v-model="formValidate.type_id"
            placeholder="类型"
          >
            <Option
              v-for="(item, index) in typeList"
              :key="index"
              :value="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="数量" prop="amount">
          <InputNumber
            size="large"
            @on-change="amountChange"
            v-model="formValidate.amount"
            controls-outside
          ></InputNumber>
        </FormItem>
        <FormItem label="价格" prop="price">
          <Input
            size="large"
            v-model="formValidate.price"
            placeholder="价格"
          ></Input>
        </FormItem>
        <FormItem v-show="status == 'edit'" label="状态" prop="status_id">
          <Select
            size="large"
            v-model="formValidate.status_id"
            placeholder="类型"
          >
            <Option
              v-for="(item, index) in statusList"
              :key="index"
              :value="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="是否美团" prop="ismeituan">
          <RadioGroup v-model="formValidate.ismeituan">
            <Radio :label="'0'">否</Radio>
            <Radio :label="'1'">是</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="备注" prop="remarks">
          <Input
            size="large"
            v-model="formValidate.remarks"
            placeholder="备注"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
    <dataRow v-if="false"></dataRow>
  </div>
</template>

<script>
let _this = null;
import api from "../../api/home";
import dataRow from "../../components/dataRow";
//var qs = require("qs");
export default {
  name: "",
  components: { dataRow },
  created() {
    _this = this;
    this.getOrderListInfo();
    api.getbaseinfo().then((res) => {
      if (res.data) {
        let arr1 = [],
          arr2 = [];

        this.price = res.data.price;
        res.data.type.forEach((item) => {
          arr1.push({
            label: item.type_name,
            value: item.id,
          });
        });
        this.typeList.splice(0, this.typeList.length, ...arr1);
        res.data.pattern.forEach((item) => {
          arr2.push({
            label: item.pattern_name,
            value: item.id,
          });
        });
        this.PickUpList.splice(0, this.PickUpList.length, ...arr2);
      }
    });

    api.getOrderStatusInfo().then((res) => {
      if (res.data) {
        this.allStatusList.splice(0, this.allStatusList.length, ...res.data);
      }
    });
  },
  data: () => ({
    Modal: false,
    all_recd: 0,
    page_size: 9,
    page: 1,
    status: "add",
    price: 0,
    current: 1,
    number_keyword: "",
    phone_keyword: "",
    pattern_id: null,
    type_id: null,
    ismeituan: null,
    formValidate: {
      number: null,
      pattern_id: "1",
      type_id: "1",
      amount: 1,
      price: 0,
      remarks: "",
      status_id: null,
      ismeituan: "0",
    },
    allStatusList: [],
    ruleValidate: {},
    PickUpList: [],
    typeList: [],
    statusList: [],
    columns1: [
      {
        width: 50,
        align: "center",
        type: "expand",
        render: (h, params) => {
          let arr = [];
          let list = [];
          let obj = params.row.time;
          for (let k in obj) {
            k != "oid" &&
              list.push({
                key: k,
                value: obj[k] ? parseInt(obj[k])*1000 : obj[k],
              });
          }
          _this.allStatusList[parseInt(params.row.type_id) - 1] &&
            _this.allStatusList[parseInt(params.row.type_id) - 1].forEach(
              (item, index) => {
                arr.push({
                  key: item.status_name,
                  value: list[index].value,
                });
              }
            );

          return h(dataRow, {
            props: {
              list: arr,
            },
          });
        },
      },
      {
        title: "编号",
        key: "number",
        align: "center",
        render: (h, par) => {
          return h(
            "div",
            _this.numberFormat(par.row.number.slice(4).toString())
          );
        },
      },
      {
        title: "手机号",
        key: "phone",
        align: "center",
        render: (h, par) => {
          if (!_this.orderData[par.index].phone_status) {
            return h(
              "div",
              {
                style: {
                  cursor: "pointer",
                },
              },
              "*********" + par.row.phone.slice(7)
            );
          } else {
            return h(
              "div",
              {
                style: {
                  cursor: "pointer",
                },
              },
              par.row.phone
            );
          }
        },
      },
      {
        title: "送取方式",
        key: "pattern_name",
        align: "center",
        render: (h, par) => {
          return h(
            "div",
            {
              style: {
                cursor: "pointer",
              },
            },
            par.row.pattern_id + "." + par.row.pattern_name
          );
        },
      },
      {
        title: "类型",
        key: "type_name",
        align: "center",
        render: (h, par) => {
          return h(
            "div",
            {
              style: {
                cursor: "pointer",
              },
            },
            par.row.type_id + "." + par.row.type_name
          );
        },
      },
      {
        title: "数量",
        key: "amount",
        align: "center",
      },
      {
        title: "价格",
        key: "price",
        align: "center",
      },
      {
        title: "是否美团",
        key: "ismeituan",
        align: "center",
        render: (h, par) => {
          return h(
            "div",
            {
              style: {
                cursor: "pointer",
              },
            },
            par.row.ismeituan == "0"
              ? "否"
              : par.row.ismeituan == "1"
              ? "是"
              : "否"
          );
        },
      },
      {
        title: "状态",
        key: "status_name",
        align: "center",
        render: (h, par) => {
          let arr = [];
          _this.allStatusList[parseInt(par.row.type_id) - 1] &&
            _this.allStatusList[parseInt(par.row.type_id) - 1].forEach(
              (item) => {
                arr.push(
                  h("Option", {
                    props: {
                      label: item.status_name,
                      value: item.id,
                    },
                  })
                );
              }
            );

          if (!_this.orderData[par.index].disabled) {
            return h(
              "div",
              {
                style: {
                  width: "60%",
                  margin: "0 auto",
                  background: _this.colorStatus(
                    parseInt(_this.orderData[par.index].status_id)
                  ),
                  cursor: "pointer",
                  padding: "2px 0px",
                  borderRadius: "5px",
                  color:
                    _this.colorStatus(
                      parseInt(_this.orderData[par.index].status_id)
                    ) == "#e6e6e6"
                      ? "#000"
                      : "#fff",
                },
              },
              _this.orderData[par.index].status_name
            );
          } else {
            return h(
              "Select",
              {
                props: {
                  value: _this.orderData[par.index].status_id,
                },
                on: {
                  "on-change": (v) => {
                    console.log(v);
                    api
                      .orderStatusEdit(
                        { id: par.row.id, status_id: v }
                      )
                      .then((res) => {
                        res && _this.getOrderListInfo();
                        _this.$Message.info("状态编辑成功！");
                        _this.orderData[par.index].disabled = false;
                      });
                  },
                },
              },
              arr
            );
          }
        },
      },
      {
        title: "备注",
        key: "remarks",
        align: "center",
      },
      {
        title: "操作",
        align: "center",
        width: 100,
        render: (h, par) => {
          return h("Icon", {
            props: {
              type: "ios-create-outline",
            },
            style: {
              fontSize: "32px",
              cursor: "pointer",
            },
            on: {
              click: () => {
                api
                  .getOrderStatusInfo({ type_id: par.row.type_id })
                  .then((res) => {
                    if (res.data) {
                      let arr = [];
                      res.data.forEach((item) => {
                        arr.push({
                          label: item.status_name,
                          value: item.id,
                        });
                      });
                      _this.statusList.splice(0, _this.statusList, ...arr);
                      par.row.amount = parseInt(par.row.amount);
                      _this.formValidate = par.row;
                      _this.Modal = true;
                      _this.status = "edit";
                    }
                  });
              },
            },
          });
        },
      },
    ],
    orderData: [],
  }),
  methods: {
    dataInit() {
      this.formValidate = {
        number: null,
        pattern_id: "1",
        type_id: "1",
        amount: 1,
        price: 0,
        remarks: "",
        status_id: null,
        ismeituan: "0",
      };
    },
    getOrderListInfo() {
      api
        .getOrderListInfo({
          p: _this.page,
          number_keyword: this.number_keyword,
          phone_keyword: this.phone_keyword,
          pattern_id: this.pattern_id,
          type_id: this.type_id,
          ismeituan: this.ismeituan,
        })
        .then((res) => {
          if (res.data) {
            res.data.order.forEach((item) => {
              item.disabled = false;
              item.phone_status = false;
              item.ismeituan == "0"
                ? (item.ismeituan = "0")
                : (item.ismeituan = "1");
            });
            this.all_recd = parseInt(res.data.count);
            this.page_size = res.data.num;
            this.orderData.splice(0, this.orderData.length, ...res.data.order);
          }
        });
    },
    typeChange(v) {
      if (v) {
        api.getOrderStatusInfo({ type_id: v }).then((res) => {
          if (res.data) {
            let arr = [];
            res.data.forEach((item) => {
              arr.push({
                label: item.status_name,
                value: item.id,
              });
            });
            this.statusList.splice(0, this.statusList.length, ...arr);
            this.formValidate.status_id = this.statusList[0].value;
            this.formValidate.status_name = this.statusList[0].label;
          }
        });
      }
      // this.formValidate.price = 0;
      // this.formValidate.amount = 0;
    },
    amountChange(n) {
      if (this.formValidate.type_id == 1) {
        this.formValidate.price = this.price * n;
      }
    },
    modalStatus() {
      this.Modal = true;
      this.status = "add";
      this.amountChange(1);
    },
    modalSure() {
      if (this.status == "add") {
        console.log(this.formValidate); //this.formValidate
        api
          .addOrder({
              phone: this.formValidate.phone,
              pattern_id: this.formValidate.pattern_id,
              type_id: this.formValidate.type_id,
              amount: this.formValidate.amount,
              price: this.formValidate.price,
              remarks: this.formValidate.remarks,
              ismeituan: this.formValidate.ismeituan,
            }
          )
          .then((res) => {
            if (res.data) this.getOrderListInfo();
            _this.$Message.info("添加成功！");
            this.dataInit();
          });
      } else if (this.status == "edit") {
        api.orderInfoEdit(this.formValidate).then((res) => {
          res && this.getOrderListInfo();
          _this.$Message.info("编辑成功！");
          this.dataInit();
        });
      }
    },
    modalCancel() {
      this.Modal = false;
      this.status = "add";
      this.dataInit();
    },
    onCellClick(row, column) {
      if (column.key == "status_name") {
        this.orderData[row._index].disabled = true;
      } else if (column.key == "phone") {
        this.orderData[row._index].phone_status = !this.orderData[row._index]
          .phone_status;
      } else if (column.key == "pattern_name") {
        this.pattern_id
          ? (this.pattern_id = null)
          : (this.pattern_id = row.pattern_id);
        this.page = 1;
        this.current = 1;
        this.getOrderListInfo();
      } else if (column.key == "type_name") {
        this.type_id ? (this.type_id = null) : (this.type_id = row.type_id);
        this.page = 1;
        this.current = 1;
        this.getOrderListInfo();
      } else if (column.key == "ismeituan") {
        this.ismeituan
          ? (this.ismeituan = null)
          : (this.ismeituan = row.ismeituan);
        this.page = 1;
        this.current = 1;
        this.getOrderListInfo();
      } else {
        this.orderData[row._index].disabled = false;
      }
    },
    colorStatus(v) {
      if (v == 1 || v == 5 || v == 9) {
        return "#5a98de";
      } else if (v == 2 || v == 6 || v == 10) {
        return "#5eb95e";
      } else if (v == 3 || v == 7 || v == 11) {
        return "#dd514c";
      } else if (v == 4 || v == 8 || v == 12) {
        return "#e6e6e6";
      }
    },
    pageChange(page) {
      this.current = page;
      this.page = page;
      this.getOrderListInfo();
    },
    search() {
      this.current = 1;
      this.page = 1;
      this.getOrderListInfo();
    },
    numberFormat(str) {
      return str.slice(0, 2) + "-" + str.slice(2, 4) + "-" + str.slice(4, 6);
    },
  },
};
</script>

<style>
.home {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  background: #f8f8f9;
}
.modal .ivu-modal {
  width: 100% !important;
}
.home .ivu-page {
  display: flex;
  justify-content: center;
}
.home .ivu-page-item,
.home .ivu-page-prev,
.home .ivu-page-next {
  min-width: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
.home .ivu-table-cell {
  padding-left: 0px;
  padding-right: 0px;
}
/* .modal .ivu-input-large {
  height: 80px !important;
  font-size: 30px;
}
.modal .ivu-form .ivu-form-item-label {
  font-size: 30px;
}
.modal .ivu-select-large.ivu-select-single .ivu-select-selection {
  height: 80px;
}
.modal .ivu-select-large.ivu-select-single .ivu-select-selection .ivu-select-placeholder, 
.modal .ivu-select-large.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  height: 80px;
  line-height: 80px;
  font-size: 24px;
}
.modal .ivu-select-large .ivu-select-item {
  font-size: 30px !important;
} 
.modal .ivu-input-number-input {
  font-size: 30px;
}
.modal .ivu-form-item-label {
  line-height: 60px !important;
}
.modal .ivu-input-number-large.ivu-input-number-controls-outside {
  width: 320px;
}
.modal .ivu-input-number-large.ivu-input-number-controls-outside .ivu-input-number-controls-outside-btn {
  width: 80px;
}
.modal .ivu-input-number-large.ivu-input-number-controls-outside,
.modal .ivu-input-number-large.ivu-input-number-controls-outside .ivu-input-number-controls-outside-btn,
.modal .ivu-input-number-large .ivu-input-number-input-wrap,
.modal .ivu-input-number-controls-outside .ivu-input-number-input
 {
  height: 80px;
}
.modal .ivu-input-number-controls-outside .ivu-input-number-input {
  text-align: center;
}
.modal .ivu-input-number-large.ivu-input-number-controls-outside .ivu-input-number-controls-outside-btn i {
    font-size: 50px;
    line-height: 80px;
}
.ivu-table-header .ivu-table-cell {
  font-size: 24px;
}
.modal .ivu-radio-group {
  margin-top: 20px;
}
.modal .ivu-radio-inner {
  width: 32px;
  height: 32px;
}
.modal .ivu-radio-inner:after {
  width: 26px;
  height: 26px;
  border-radius:50%;
}
textarea.ivu-input {
  font-size: 36px !important;
} */
</style>