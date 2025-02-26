<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { FromType } from './type/from_type'
import FormItem from './form_item.vue'
const props = defineProps({
    invoiceFormList:{
        type:Array as PropType<FromType>,
        default:()=>{
            return {}
        }
    }
})
const invoiceForm =  ref(null) as any
const formData = ref({}) as any
const rules = ref({}) as any
/**
 * editInvoiceFormList
 */
const emit = defineEmits(['editInvoiceFormList'])
// 表单数据修改
const formChange = (data:{val:string,key:string},fatherKey:string='')=>{
    emit('editInvoiceFormList',data, fatherKey)
}
// 获取表单数据
const getFormData = async ()=>{
  return  invoiceForm.value.validate()
}
const updateFormData = (val:FromType)=>{
    val.forEach((item:any,index:number)=>{
        formData.value[item.key] = item.value || ''
        if(item.childrens && item.value && item.childrens[item.value]?.length){
            item.childrens[item.value] && updateFormData(item.childrens[item.value])
        }
        const rulesItem = item.rules
        if(rulesItem?.length){
            rules.value[item.key] = {'rules' : [...rulesItem]}
        }
    })
}
watch(()=>props.invoiceFormList,(val)=>{
    if(!val.length) return
    formData.value = {}
    updateFormData(val)
    console.log(rules.value)
},{immediate:true,deep:true})
defineExpose({
    getFormData
})
</script>

<template>
    <view class="form_box">
        <uni-forms ref="invoiceForm" :model="formData" :rules="rules"  err-show-type="toast" :border="false">
            <view v-for="(formItem,index) in invoiceFormList" :key="index" >
                <!-- 一级表单 -->
                <uni-forms-item  :name="formItem.key" >
                    <template #label>
                        <view class="form_label">
                            {{ formItem.label }}
                            <text class="required" v-if="formItem.required">*</text>
                        </view>
                    </template>
                    <FormItem :form-item="formItem" @formItemChange="formChange"></FormItem>
                </uni-forms-item>
                <!-- 二级表单 表单切换逻辑 -->
                <view v-if="formItem.childrens && formItem.value && formItem.childrens[formItem.value].length" >
                    <uni-forms-item 
                        v-for="(childrenItem,index) in formItem.childrens[formItem.value]" 
                        :key="index" 
                        :name="childrenItem.key" 
                    >
                    <template #label>
                        <view class="form_label">
                            {{ childrenItem.label }}
                            <text class="required" v-if="childrenItem.required">*</text>
                        </view>
                    </template>
                     <FormItem :form-item="childrenItem" @formItemChange="formChange($event,formItem.key)" />
                    </uni-forms-item>
                </view>
            </view>
        </uni-forms>
    </view>
</template>

<style scoped lang="scss">
.form_box{
    background-color: #fff;
    margin: 20rpx;
    padding:0 26rpx;
    border-radius: 24rpx;
    overflow: hidden;
}


.radio{
    display: flex;
    align-items: center;
    height: 100%;
}
.form_label{
    display: flex;
    align-items: center;
    width: 190rpx;
    font-weight: 500;
    color: #101828;
    
    .required{
        color: #ff0000;
        margin-left: 10rpx;
        font-weight: 400;
    }
}
</style>
