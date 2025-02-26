<!--
 * @Author: wha wha01707839@intime.com.cn
 * @Date: 2025-02-26 15:02:16
 * @LastEditors: wha wha01707839@intime.com.cn
 * @LastEditTime: 2025-02-26 15:06:01
 * @FilePath: /General/src/components/invoice_form_item.vue
 * @Description: 
 * 
-->
<script setup lang="ts">
 defineProps({
    formItem:{
        type:Object,
        required:true
    }
})
const emit = defineEmits(['formItemChange'])
// 单选触发
const radioChange = (e:any,key:string) =>{
    emit('formItemChange',{key:key,value:e.detail.value})
}
// 文本框回车、失焦触发
const inputChange = (e:any,key:string) =>{
    emit('formItemChange',{key:key,value:e.detail.value})
}
// 删除文本框内容
const deleteFromVal = (key:string) =>{
    emit('formItemChange',{key:key,value:''})  
}
</script>

<template>
    <!-- 文本输入框 -->
    <view class="input-box" v-if="formItem.type === 'input'">
        <input
            class="input_items"
            :value="formItem.value"
            :placeholder="formItem.placeholder"
            :type="formItem.keyboardType"
            :disabled="formItem.disabled"
            @blur="inputChange($event,formItem.key)"
            />
            <view class="delete_btn" v-if="formItem.value" @click="deleteFromVal(formItem.key)">
                <view class="iconfont ka-icon-ic_base_close_md_simple"></view>
            </view>
    </view>
    <!-- 单选 -->
    <view v-if="formItem.type==='radio'" class="radio">
        <uni-data-checkbox 
        :value="formItem.value" 
        :localdata="formItem.options" 
        :map="{text:'label',value:'value'}"
        :wrap="false" 
        selectedColor="#f20" 
        selectedTextColor="#101828" 
        @change="radioChange($event,formItem.key)"></uni-data-checkbox>
    </view>
</template>

<style lang="scss" scoped>
.input-box{
    display: flex;
    justify-content: space-between;
    margin-right: 20rpx;
    align-items: center;
    height: 100%;
    .delete_btn{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        background-color: #DCDFE6;
        .iconfont {
            font-size: 30rpx;
            color: #fff;
        }
    }
}
.radio {
    height: 100%;
    display: flex;
    align-items: center;
}
.input_items{
    flex: 1;
    margin-right: 20rpx;
}
</style>
