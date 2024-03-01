<template>
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
    <span style="flex-grow: 1; text-align: center">教师账号管理</span>
  </el-header>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="创建时间" prop="createTime"> </el-table-column>
    <!-- <el-table-column label="名字" prop="username"> </el-table-column> -->
    <el-table-column label="姓名" width="280">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>年龄: {{ scope.row.age }}</div>
            <div>个人信息: {{ scope.row.birthday }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.username }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="职位" prop="position"></el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="教师查找" />
      </template>
      <template #default="scope">
        <el-button
          size="small"
          @click="
            title = '修改教师';
            showDialog(scope.row);
          "
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="deleteTeacher(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-row style="padding-top: 10px">
    <el-button
      type="primary"
      @click="
        title = '添加教师';
        showDialog();
      "
      round
      >添加教师</el-button
    >
  </el-row>

  <!-- 添加弹窗 -->
  <el-dialog v-model="dialogVisible" :title="title" width="30%">
    <el-form
      :model="categoryModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="id" prop="id">
        <el-input
          v-model="teacherModel.id"
          minlength="1"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="teacherModel.username"
          minlength="1"
          maxlength="15"
        ></el-input>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-input
          v-model="teacherModel.birthday"
          minlength="1"
          maxlength="15"
        ></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input
          v-model="teacherModel.age"
          minlength="1"
          maxlength="15"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phoneNumber">
        <el-input
          v-model="teacherModel.phoneNumber"
          minlength="1"
          maxlength="15"
        ></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-input
          v-model="teacherModel.position"
          minlength="1"
          maxlength="15"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="teacherModel.password"
          minlength="1"
          maxlength="15"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="
            title === '添加教师' ? addTeacher() : updateTeacher();
            clearData();
          "
        >
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>

  <div>
    <h1>教师端无法访问该页面</h1>
    <h1>
      鼠标放在老师上可以显示老师的具体信息（教学年龄、奖项经历、相关信息）
    </h1>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import {
  teacherInfoService,
  teacherAddService,
  teacherUpdateService,
  teacherDeleteService,
} from "@/api/teacher.js";
import { ElMessage } from "element-plus";
import { ElMessageBox } from "element-plus";

const teacherList = ref([]);

const TeacherList = async () => {
  const result = await teacherInfoService(); // 调用API函数获取教师信息
  teacherList.value = result.data;
};
TeacherList();

const search = ref("");
const filterTableData = computed(() =>
  teacherList.value.filter(
    (data) =>
      !search.value ||
      data.username.toLowerCase().includes(search.value.toLowerCase())
  )
);

//控制添加弹窗
const dialogVisible = ref(false);

//添加教师数据模型
const teacherModel = ref({
  id: "",
  username: "",
  birthday: "",
  age: "",
  phoneNumber: "",
  position: "",
  password: "",
});
//添加教师表单校验
const rules = {
  id: [{ required: true, message: "请输入id", trigger: "submit" }],
  username: [{ required: true, message: "请输入姓名", trigger: "submit" }],
  birthday: [{ required: true, message: "请输入生日", trigger: "submit" }],
  age: [{ required: true, message: "请输入年龄", trigger: "submit" }],
  phoneNumber: [
    { required: true, message: "请输入手机号码", trigger: "submit" },
  ],
  position: [{ required: true, message: "请输入职位", trigger: "submit" }],
  password: [{ required: true, message: "请输入密码", trigger: "submit" }],
};
const addTeacher = async () => {
  let result = await teacherAddService(teacherModel.value);
  TeacherList();
  dialogVisible.value = false;
  ElMessage.success(result.msg ? result.msg : "添加成功");
};

//展示添加弹窗
const showDialog = (row) => {
  dialogVisible.value = true;
  teacherModel.value.id = row.id;
  teacherModel.value.username = row.username;
  teacherModel.value.birthday = row.birthday;
  teacherModel.value.age = row.age;
  teacherModel.value.phoneNumber = row.phoneNumber;
  teacherModel.value.position = row.position;
  teacherModel.value.password = row.password;
};

//控制标题名称
const title = ref("");

//编辑教师
const updateTeacher = async () => {
  //调用接口
  let result = await teacherUpdateService(teacherModel.value);
  ElMessage.success(result.message ? result.message : "修改成功");
  dialogVisible.value = false;
  //刷新页面
  TeacherList();
};

//清空教师模型的数据
const clearData = () => {
  teacherModel.value.id = "";
  teacherModel.value.username = "";
  teacherModel.value.birthday = "";
  teacherModel.value.age = "";
  teacherModel.value.phoneNumber = "";
  teacherModel.value.position = "";
  teacherModel.value.password = "";
};

//删除分类  给删除按钮绑定事件
const deleteTeacher = (id) => {
  ElMessageBox.confirm("你确认删除该分类信息吗？", "温馨提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      //用户点击了确认
      let result = await teacherDeleteService(id);
      ElMessage.success(result.message ? result.message : "删除成功");
      //刷新页面
      TeacherList();
    })
    .catch(() => {
      //用户点击了取消
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};
</script>

<style></style>
