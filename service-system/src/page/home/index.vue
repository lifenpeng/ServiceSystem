<template>
  <div class="home">
    <Row :gutter="16">
      <Col span="3"
        ><Button :long="true" size="large" type="success" @click="Modal = true"
          >登记</Button
        ></Col
      >
      <Col span="9"></Col>
      <Col span="5"><Input size="large" placeholder="编号" /></Col>
      <Col span="5"><Input size="large" placeholder="手机号" /></Col>
      <Col span="2"
        ><Button style="width: 100%" size="large" type="primary"
          >搜索</Button
        ></Col
      >
    </Row>
    <Table
      :border="true"
      style="margin-top: 10px; height: 85%"
      :columns="columns1"
      :data="data1"
      :stripe="true"
    ></Table>
    <Page style="margin:10px auto;" :total="100" />
    <Modal
      v-model="Modal"
      title="订单添加"
      class-name="modal"
      :transfer="true"
      @on-cancel="Modal = false"
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
        <FormItem label="手机号" prop="name">
          <Input
            size="large"
            v-model="formValidate.name"
            placeholder="手机号"
          ></Input>
        </FormItem>
        <FormItem label="送取方式" prop="mail">
          <Select
            size="large"
            v-model="formValidate.city"
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
        <FormItem label="类型" prop="mail">
          <Select size="large" v-model="formValidate.city" placeholder="类型">
            <Option
              v-for="(item, index) in typeList"
              :key="index"
              :value="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="数量" prop="city">
          <InputNumber size="large" controls-outside></InputNumber>
        </FormItem>
        <FormItem label="价格" prop="name">
          <Input
            size="large"
            v-model="formValidate.name"
            placeholder="价格"
          ></Input>
        </FormItem>
        <FormItem label="状态" prop="mail">
          <Select size="large" v-model="formValidate.city" placeholder="类型">
            <Option
              v-for="(item, index) in statusList"
              :key="index"
              :value="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="备注" prop="name">
          <Input
            size="large"
            v-model="formValidate.name"
            placeholder="备注"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
let _this = null;
export default {
  name: "",
  created() {
    _this = this;
  },
  data: () => ({
    Modal: false,
    formValidate: {},
    ruleValidate: [],
    PickUpList: [
      {
        value: "1",
        label: "到店服务",
      },
      {
        value: "2",
        label: "上门取送",
      },
    ],
    typeList: [
      {
        value: "1",
        label: "洗鞋",
      },
      {
        value: "2",
        label: "修鞋",
      },
    ],
    statusList: [
      {
        value: "1",
        label: "待清洗",
      },
      {
        value: "2",
        label: "待修复",
      },
      {
        value: "3",
        label: "已清洗",
      },
      {
        value: "4",
        label: "已完工",
      },
    ],
    columns1: [
      {
        title: "编号",
        key: "code",
        align: "center",
      },
      {
        title: "手机号",
        key: "phone",
        align: "center",
      },
      {
        title: "送取方式",
        key: "pickup",
        align: "center",
      },
      {
        title: "类型",
        key: "type",
        align: "center",
      },
      {
        title: "数量",
        key: "number",
        align: "center",
      },
      {
        title: "价格",
        key: "price",
        align: "center",
      },
      {
        title: "状态",
        key: "status",
        align: "center",
      },
      {
        title: "备注",
        key: "bz",
        align: "center",
      },
      {
        title: "操作",
        align: "center",
        width: 100,
        render: (h) => {
          return h("Icon", {
            props: {
              type: "ios-create-outline",
            },
            style: {
              fontSize: "32px",
            },
            on: {
              click: () => {
                _this.Modal = true;
              },
            },
          });
        },
      },
    ],
    data1: [
      {
        code: "John Brown",
        phone: 17611312970,
        pickup: "到店服务",
        type: "洗鞋",
        number: 13,
        price: 30,
        status: "已清洗",
      },
      {
        code: "John Brown",
        phone: 17611312970,
        pickup: "到店服务",
        type: "洗鞋",
        number: 13,
        price: 30,
        status: "已清洗",
      },
    ],
  }),
  methods: {},
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
.home .ivu-page-item, .home .ivu-page-prev, .home .ivu-page-next {
    min-width: 50px;
    height: 50px;
    line-height: 50px;
    font-size: 24px;
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