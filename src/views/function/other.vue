<template>
  <div>
    <input v-model="inputText" placeholder="输入内容" />
    <p v-if="isTextTooLong">字数过多的字样</p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// 使用ref创建响应式变量来存储输入内容
const inputText = ref("");
// 创建一个用于表示是否输入内容过长的变量
const isTextTooLong = ref(false);

// 使用watch监听inputText变量的变化
watch(inputText, (newValue,oldValue) => {
  // 当输入内容的长度大于10时，将isTextTooLong设置为true，否则设置为false
  isTextTooLong.value = newValue.length > 10;
  console.log(oldValue)
});
</script>
