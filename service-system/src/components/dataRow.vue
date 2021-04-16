<template>
  <div class="dataRow">
    <Row>
        <Col v-for="(item, index) in list" :key="index" span="6">
          <span  class="row"
            >{{ item.key }} : {{ getTime(item.value) }}</span
          >
        </Col>
    </Row>
  </div>
</template>

<script>
import date from "../common/date";
export default {
  name: "dataRow",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getTime(str) {
      return date.get_time(str);
    },
  },
};
</script>

<style>
.dataRow {
  width: 100%;
  height: 100%;
}
.dataRow .row {
  width: 100%;
  font-size: 16px;
  text-align: center;
}
</style>