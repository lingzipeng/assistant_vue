<template>
  <div>
    <el-header
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        line-height: 60px;
        font-size: 20px;
        background-color: rgb(172, 215, 229);
      "
    >
      <span style="flex-grow: 1; text-align: center">班级最新一期成绩</span>
      <el-popover placement="right" :width="250" trigger="click">
        <template #reference>
          <el-button>往期成绩</el-button>
        </template>
        <el-table :data="gridData">
          <el-table-column width="150" property="date" label="日期" />
          <el-table-column width="100" property="name" label="科目" />
        </el-table>
      </el-popover>
    </el-header>
    <el-main
      style="
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
      "
    >
      <el-tooltip placement="top">
        <template #content> 切换为总分合格率</template>
        <el-switch v-model="value1" style="margin-bottom: 20px" />
      </el-tooltip>
    </el-main>
  </div>
  <div class="chart-container">
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import * as echarts from "echarts";

const value1 = ref(true);
const gridData = reactive([
  {
    date: "2016-05-02",
    date: "2016-05-01",
    name: "数学",
  },
  {
    date: "2016-05-03",
    name: "英语",
  },
]);

const chart = ref(null);

onMounted(() => {
  const myChart = echarts.init(chart.value);
  const options = {
    title: {
      text: "总分分布",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Direct",
        type: "bar",
        barWidth: "60%",
        data: [10, 52, 200, 334, 390, 330, 220],
      },
    ],
  };
  myChart.setOption(options);
});
</script>

<style>
.chart-container {
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
}

.chart {
  width: 600px;
  height: 400px;
}
</style>
