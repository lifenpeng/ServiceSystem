<template>
  <div class="home">
    <Row :gutter="16">
      <Col span="12"><Button size="large" type="success" @click="Modal=true">登记</Button></Col>
      <Col span="5"><Input size="large" placeholder="编号" /></Col>
      <Col span="5"><Input size="large" placeholder="手机号" /></Col>
      <Col span="2"
        ><Button style="width: 100%" size="large" type="success"
          >搜索</Button
        ></Col
      >
    </Row>
    <Table
      :border="true"
      style="margin-top: 10px; height: 90%"
      :columns="columns1"
      :data="data1"
    ></Table>
    <Modal
      v-model="Modal"
      title="订单添加"
      class-name="modal"
      :transfer="true"
      @on-cancel="Modal=false"
      :mask-closable="false"
      :closable="false"
    >
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="手机号" prop="name">
            <Input size="large" v-model="formValidate.name" placeholder="手机号"></Input>
        </FormItem>
        <FormItem label="送取方式" prop="mail">
            <Select size="large" v-model="formValidate.city" placeholder="Select your city">
                <Option v-for="(item,index) in PickUpList" :key="index" :value="item.value">{{item.label}}</Option>
            </Select>        
        </FormItem>
        <FormItem label="数量" prop="city">
            <InputNumber size="large" controls-outside></InputNumber>
        </FormItem>
        <FormItem label="价格" prop="name">
            <Input size="large" v-model="formValidate.name" placeholder="价格"></Input>
        </FormItem>
        <FormItem label="备注" prop="name">
            <Input type="textarea" :rows="4" size="large" v-model="formValidate.name" placeholder="备注"></Input>
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
    formValidate:[],
    PickUpList: [
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
        key: "name",
        align: "center",
      },
      {
        title: "手机号",
        key: "age",
        align: "center",
      },
      {
        title: "送取方式",
        key: "address",
        align: "center",
      },
      {
        title: "类型",
        key: "name",
        align: "center",
      },
      {
        title: "数量",
        key: "age",
        align: "center",
      },
      {
        title: "价格",
        key: "address",
        align: "center",
      },
      {
        title: "状态",
        key: "age",
        align: "center",
        render: (h, par) => {
          console.log(par);
          let arr = [];
          _this.PickUpList.forEach((item, index) => {
            arr.push(
              h("Option", {
                props: {
                  value: item.value,
                  key: index,
                  label: item.label,
                },
              })
            );
          });
          return h(
            "Select",
            {
              on: {
                "on-change": (v) => {
                  console.log(v);
                },
              },
            },
            arr
          );
        },
      },
      {
        title: "备注",
        key: "address",
        align: "center",
      },
    ],
    data1: [
      {
        name: "John Brown",
        age: 18,
        address: "New York No. 1 Lake Park",
        date: "2016-10-03",
      },
      {
        name: "Jim Green",
        age: 24,
        address: "London No. 1 Lake Park",
        date: "2016-10-01",
      },
      {
        name: "Joe Black",
        age: 30,
        address: "Sydney No. 1 Lake Park",
        date: "2016-10-02",
      },
      {
        name: "Jon Snow",
        age: 26,
        address: "Ottawa No. 2 Lake Park",
        date: "2016-10-04",
      },
    ],
  }),
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
  width: 90% !important;
}
</style>