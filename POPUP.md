弹窗组件

## 引入方式

**import ConfirmPopup from '@/components/confirmPopup.vue'**

**组件使用示例**

```vue
<template>
  <button @click="()=>{ afterConfirmPopup.open()}">打开弹窗</button>

    <!-- 成功/失败弹窗 -->
  <ConfirmPopup 
        ref="afterConfirmPopup"
        :configData="confirmData"
        @confirm="hanleConfirm"
        >
  </ConfirmPopup>
  <!-- 插槽使用 -->
  <ConfirmPopup ref="slotConfirmPopup">
    <template v-slot='title'>
      <view>头部插槽</view>
    </template>
	 <template v-slot='content'>
      <view>内容插槽</view>
    </template>
 		<template v-slot='footer'>
      <button>确认<button>
    </template>
  </ConfirmPopup>
</template>
<script setup>
import { ref,reactive } from 'vue'
import ConfirmPopup from '@/components/confirmPopup/confirmPopup.vue'
const afterConfirmPopup = ref(null)
const slotConfirmPopup = ref(null)
const confirmData= reactive({
  titleName:'弹窗标题',
  content:'默认弹窗内容',
  showCloseBtn:false,
  showConfirmBtn:true,
  confirmBtnText:'确认',
})

const hanleConfirm = ()=>{
  console.log(‘确认点击’)
}
</script>
```

## 参数


| **参数**            | **类型**                  | **说明**             |
| ------------------- | ------------------------- | -------------------- |
| **configData**      | **object.configDataType** | **弹窗基础内容配置** |
| **confirmBtnStyle** | **object.cssStyle**       | **确认按钮颜色配置** |
| **maskClick**       | **boolean**               | **蒙板是否可以点击** |

## configDataType


| **titleName**      | **标题**               | **""**    |
| ------------------ | ---------------------- | --------- |
| **showCloseIcon**  | **右上角关闭按钮**     | **false** |
| **content**        | **内容**               | **""**    |
| **showCloseBtn**   | **footer取消按钮显示** | **true**  |
| **showConfirmBtn** | **footer确认按钮显示** | **true**  |
| **closeBtnText**   | **footer取消按钮文字** | **取消**  |
| **confirmBtnText** | **footer确认按钮文字** | **确认**  |

## slot


| **title**   | **头部标题**     |  |
| ----------- | ---------------- | - |
| **content** | **内容区域**     |  |
| **footer**  | **底部按钮区域** |  |
