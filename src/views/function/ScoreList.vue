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
      <span style="flex-grow: 1; text-align: center">成绩排行</span>
    </el-header>
    <div style="display: flex; justify-content: center">
      <table style="padding-top: 20px">
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="date" label="排名" width="280" />
          <el-table-column prop="name" label="名字" width="280" />
          <!-- <el-table-column prop="address" label="总分" width="280" /> -->
          <el-table-column prop="address" label="总分" width="180">
            <!-- 这里是按钮所在的列标题插槽 -->
            <template v-slot:header>
              <div>
                总分
                <el-button @click="sortByAddress" size="mini">排序</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </table>
    </div>
  </div>
  <div>
    <h3>优秀名单 差生名单 学生成绩跟踪 学生个人报告导出</h3>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const sortByAddress = () => {
  // 实现你的排序逻辑
};
interface User {
  date: string;
  name: string;
  address: string;
}
const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: User;
  rowIndex: number;
}) => {
  if (rowIndex === 1) {
    return "warning-row";
  } else if (rowIndex === 5) {
    return "success-row";
  }
  return "";
};

const tableData: User[] = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
