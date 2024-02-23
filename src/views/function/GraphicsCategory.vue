<template>
  <div class="common-layout">
    <el-container>
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
          <el-switch
            v-model="value1"
            style="margin-bottom: 20px; margin-left: 600px"
          />
        </el-tooltip>
        <div ref="chart" style="width: 600px; height: 400px"></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      value1: true,
      gridData: [
        {
          date: "2016-05-02",
          name: "总分",
        },
        {
          date: "2016-05-04",
          name: "语文",
        },
        {
          date: "2016-05-01",
          name: "数学",
        },
        {
          date: "2016-05-03",
          name: "英语",
        },
      ],
      // ECharts 实例
      chartInstance: null,
    };
  },
  mounted() {
    // 在组件挂载后初始化 ECharts 实例
    this.chartInstance = echarts.init(this.$refs.chart);
    // 使用示例数据绘制图表，你可以根据自己的需求进行修改
    this.chartInstance.setOption({
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
    });
  },
  beforeUnmount() {
    // 在组件销毁前销毁 ECharts 实例，防止内存泄漏
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  },
};
</script>

<style>
/* 在这里添加你的样式 */
</style>
