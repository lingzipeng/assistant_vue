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
      <span style="flex-grow: 1; text-align: center">学生成绩评价</span>
    </el-header>
    <div style="display: flex; justify-content: center; padding-top: 20px">
      <el-table :data="tableData" style="width: 70%">
        <el-table-column label="学号" width="280">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="280">
          <template #default="scope">
            <el-popover
              effect="light"
              trigger="hover"
              placement="top"
              width="auto"
            >
              <template #default>
                <div>name: {{ scope.row.name }}</div>
                <div>address: {{ scope.row.address }}</div>
              </template>
              <template #reference>
                <el-tag>{{ scope.row.name }}</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="教学策略生成">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >生成</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <div><h1>学生评价的自动生成和教学策略生成，调查问卷的整理</h1></div>
</template>

<script lang="ts" setup>
import { Timer } from "@element-plus/icons-vue";

interface User {
  date: string;
  name: string;
  address: string;
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
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
];
</script>

<style>
/* 样式可以根据实际需求进行调整 */
</style>
