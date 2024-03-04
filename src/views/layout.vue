<script setup>
import {
  Promotion,
  UserFilled,
  Avatar,
  User,
  Trophy,
  Edit,
  Crop,
  EditPen,
  SwitchButton,
  Histogram,
  CaretBottom,
  Expand,
  Fold,
  FullScreen,
} from "@element-plus/icons-vue";
import avatar from "@/assets/default.png";
import screenfull from "screenfull";
import { userInfoService } from "@/api/user.js";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import useInfoStore from "@/stores/userInfo.js";
import { useTokenStore } from "@/stores/token.js";
import { ref } from "vue";
const close = ref(true);
const tokenStore = useTokenStore();
const userInfoStore = useInfoStore();
const router = useRouter();
//隐藏边框导航栏
const toSwitch = () => {
  close.value = !close.value;
};
//全屏切换
const iFullScreen = ref(false);
const toggleFullScreen = () => {
  // 判断当前浏览器是否支持全屏
  if (screenfull.isEnabled) {
    //当前页面是否全屏
    if (!screenfull.isFullscreen) {
      screenfull.request();
    } else {
      screenfull.exit();
    }
  } else {
    //提醒 无法全屏浏览
    this.$message({ message: "你的浏览器不支持全屏", type: "warning" });
  }
};
const handleCommand = (command) => {
  //判断指令
  if (command === "logout") {
    ElMessageBox.confirm("你确认要退出吗？", "温馨提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        tokenStore.removeToken();
        userInfoStore.removeInfo();
        router.push("/login");
        ElMessage({
          type: "success",
          message: "退出登录成功",
        });
      })
      .catch(() => {
        //用户点击了取消
        ElMessage({
          type: "info",
          message: "取消退出",
        });
      });
  } else {
    router.push("/user/" + command);
  }
};
//获取用户详细信息
const getUserInfo = async () => {
  let result = await userInfoService();
  userInfoStore.setInfo(result.data);
};
getUserInfo();
</script>

<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside v-show="close" width="200px">
      <div class="el-aside__logo">
        <div class="music-player">
          <audio ref="audioPlayer" controls>
            <source src="@/assets/music/果宝鸡.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        text-color="#fff"
        router
      >
        <el-menu-item index="/function/manage">
          <el-icon>
            <Avatar />
          </el-icon>
          <span>教师管理</span>
        </el-menu-item>
        <el-menu-item index="/function/category">
          <el-icon>
            <Histogram />
          </el-icon>
          <span>图形化展示</span>
        </el-menu-item>
        <el-menu-item index="/function/reviews">
          <el-icon>
            <Edit />
          </el-icon>
          <span>学生评价</span>
        </el-menu-item>
        <el-menu-item index="/function/list">
          <el-icon>
            <Trophy />
          </el-icon>
          <span>榜单</span>
        </el-menu-item>
        <el-menu-item index="/function/other">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>其他</span>
        </el-menu-item>
        <el-sub-menu>
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/info">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon>
              <Crop />
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div @click="toSwitch">
          <el-icon v-if="close"><Fold /></el-icon>
          <el-icon v-else><Expand /></el-icon>
        </div>
        <div class="name">
          账号持有者：<strong>{{ userInfoStore.info.nickname }}</strong>
          <el-icon @click="toggleFullScreen" class="FullScreen"
            ><FullScreen
          /></el-icon>
        </div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar
              :src="
                userInfoStore.info.userPic ? userInfoStore.info.userPic : avatar
              "
            />
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="info" :icon="User"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item command="avatar" :icon="Crop"
                >更换头像</el-dropdown-item
              >
              <el-dropdown-item command="password" :icon="EditPen"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 中间区域 -->
      <el-main>
        <div>
          <router-view></router-view>
        </div>
      </el-main>
      <!-- 底部区域 -->
      <el-footer>教师助手 ©2024 Created by 凌子鹏</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      background: url("@/assets/logo.png") no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
/* 设置容器透明 */
.music-player {
  opacity: 0.01; /* 设置透明度为 0.5，数值范围为 0（完全透明）到 1（不透明） */
  position: relative; /* 将容器设置为相对定位 */
  top: 50px; /* 向下移动 10px */
  left: 80px;
}
.name {
  position: relative;
  right: 500px;
}
.FullScreen {
  left: 1000px;
}
</style>
