import { reactive, ref ,Ref  } from "vue"
import { renderApplyInvoice, delHistoryInvoiceRecord } from "../api/request.js"
import {  getInvoiceKinds, getInvoiceContent } from '../enum/invoice-type-enum'
export interface HistoryType {
    [key: string]: number | string;
}

interface pageViewType {
    formConfig: FromType
    invoiceHistory: Ref<HistoryType[]>
    formEmail: FromType
    tradeOrders: Ref<tradeOrdersType[]>
    invoiceableAmountList: Ref<number[]>
}
// 失败原因
export interface failOpenInvoiceInfosType {
    failReason:string
    tradeNo:string
}
export interface FromParamType {
    // 标题
    label: string 
    // 类型
    type: 'title' | 'section' | 'input' | 'date' | 'textarea' | 'filed'| 'radio'
    // 表单key
    key: string
    // input键盘类型
    keyboardType?: 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url' 
    //  input右侧单位
    unit?: string
    // 文件上传类型
    filedType?: 'image' | 'video' | 'all'
    // 上传图片数量
    limit?: number
    // 图片大小限制
    maxSize?: number
    // 默认值
    value: any
    // 是否禁用
    disabled: boolean
    // 提示语 
    placeholder?: string
    // 是否必填
    required? : boolean
    // 排序
    sort?: number
    // 规则
    rules: object
    // 选项
    options?: {label:string,value:string}[]
    // 子项表单 配置时需要注意目前只支持单选
    childrens?: Record<string,FromType>
}

export type FromType = FromParamType[]
export type tradeOrdersType = {
    tradeNo:string,
    invoiceAmt:string
}
interface IPresenter {
    // 构建页面
    usePageView:()=> pageViewType;
    /**
     * 编辑发票
     * @param data 修改的键值 {value:string,key:string} 
     * @param fatherKey 二级表单需要传对应一级键
     * @param type 兼容email表单
     * @returns 
     */
    editInvoiceFormList:(data:{value:string,key:string},fatherKey:string,type:string)=>void ;
    // 删除抬头历史记录
    deleteHistory:(id:number)=>void
    // 插入抬头历史记录
    insertHistory:(item:HistoryType)=>void
    // 存储页面参数
    storagePageParam:(options:any)=>void
    // 页面初始化
    initView:()=>Promise<boolean>
    // 获取历史抬头id
    queryInvoiceHistoryId:(param:any)=>string|number
}
export function buildPagePresenter(): IPresenter {
    return new ContractPresenter();
}

class ContractPresenter implements IPresenter {
    // 表单渲染配置
    formConfig:FromType = reactive([
        { //发票类型
            label: '发票类型',
            type: 'radio', // 输入框类型
            key: 'kind', // 字段key
            value: "", // 默认值
            disabled: false, // 是否禁用
            required: false,
            // 单选项 服务端配置显示
            options:[
            ],
            rules: [{
                required: true,
                errorMessage: '请选择发票类型',
            }]
        },
        { //发票内容
            label: '发票内容',
            type: 'radio', // 输入框类型
            key: 'invoiceContent', // 字段key
            value: "", // 默认值
            disabled: false, // 是否禁用
            required: false,
            // 单选项 服务端配置显示
            options:[
            ],
            rules: [{
                required: true,
                errorMessage: '请选择发票内容',
            }]
        },
        { // 发票类别
            label: '发票类别',
            type: 'radio', // 输入框类型
            key: 'invoiceCategoryType', // 字段key
            value: "PERSON", // 默认值
            disabled: false, // 是否禁用
            required: false,
            // 单选项
            options:[
                {
                    label: '个人及其他',
                    value: 'PERSON'
                },
                {
                    label: '企业',
                    value: 'ENTERPRISE'

                },
            ],
            rules: [{
                required: true,
                errorMessage: '请选择发票内容',
            }],
            childrens:{
                'PERSON':[
                    { 
                        label: '发票抬头',
                        type: 'input', // 输入框类型
                        keyboardType: 'text', // 键盘类型
                        key: 'invoiceTitle', // 字段key
                        value: "", // 默认值
                        disabled: false, // 是否禁用
                        placeholder: '请输入抬头',
                        required: true,
                        rules: [{
                            required: true,
                            errorMessage: '请输入抬头',
                        },{
                            maxLength: 50,
				            errorMessage: '抬头最多填写{maxLength}个字 ',
                        }]
                    }
                ],
                'ENTERPRISE':[
                    { 
                        label: '发票抬头',
                        type: 'input', // 输入框类型
                        keyboardType: 'text', // 键盘类型
                        key: 'invoiceTitle', // 字段key
                        value: "", // 默认值
                        disabled: false, // 是否禁用
                        placeholder: '请输入抬头',
                        required: true,
                        rules: [{
                            required: true,
                            errorMessage: '请输入抬头',
                        },{
                            maxLength: 50,
				            errorMessage: '抬头最多填写{maxLength}个字 ',
                        }]
                    },
                    { 
                        label: '单位税号',
                        type: 'input', // 输入框类型
                        keyboardType: 'text', // 键盘类型
                        key: 'taxNo', // 字段key
                        value: "", // 默认值
                        disabled: false, // 是否禁用
                        placeholder: '请输入税号',
                        required: true,
                        rules: [{
                            required: true,
                            errorMessage: '请输入税号',
                        },{
                            maxLength: 50,
				            errorMessage: '税号最多填写{maxLength}个字',
                        }]
                    },
                    { 
                        label: '公司地址',
                        type: 'input', // 输入框类型
                        keyboardType: 'text', // 键盘类型
                        key: 'companyAddress', // 字段key
                        value: "", // 默认值
                        disabled: false, // 是否禁用
                        placeholder: '请输入公司地址(可选)',
                        required: false,
                        rules: [{
                            maxLength: 100,
				            errorMessage: '公司地址最多填写{maxLength}个字',
                        }]
                    },
                    { 
                        label: '电话号码',
                        type: 'input', // 输入框类型
                        keyboardType: 'text', // 键盘类型
                        key: 'phone', // 字段key
                        value: "", // 默认值
                        disabled: false, // 是否禁用
                        placeholder: '请输入电话号码(可选)',
                        required: false,
                        rules: [{
                            maxLength: 20,
				            errorMessage: '电话号码最多填写{maxLength}个字',
                        }]
                    },
                    { 
                        label: '开户银行',
                        type: 'input', // 输入框类型
                        keyboardType: 'text', // 键盘类型
                        key: 'bank', // 字段key
                        value: "", // 默认值
                        disabled: false, // 是否禁用
                        placeholder: '请输入开户银行(可选)',
                        required: false,
                        rules: [{
                            maxLength: 50,
				            errorMessage: '开户银行最多填写{maxLength}个字',
                        }]
                    },
                    { 
                        label: '银行账号',
                        type: 'input', // 输入框类型
                        keyboardType: 'text', // 键盘类型
                        key: 'bankAccount', // 字段key
                        value: "", // 默认值
                        disabled: false, // 是否禁用
                        placeholder: '请输入银行账号(可选)',
                        required: false,
                        rules: [{
                            maxLength: 50,
				            errorMessage: '银行账号最多填写{maxLength}个字',
                        }]
                    }
                ]
            }
        }
    ])
    // 邮箱配置
    formEmail:FromType = reactive([
        { 
            label: '接收发票邮箱',
            type: 'input', // 输入框类型
            keyboardType: 'email', // 键盘类型
            key: 'email', // 字段key
            value: "", // 默认值
            disabled: false, // 是否禁用
            placeholder: '请输入邮箱',
            required: false,
            rules: [{
                format: 'email',
                errorMessage: '请输入正确的邮箱格式'
            }]
        },
    ])
    // 发票抬头历史
    invoiceHistory = ref<HistoryType[]>([])
    // 开票单号
    tradeOrders = ref<tradeOrdersType[]>([])
    // 预开票信息
    invoiceableAmountList = ref<number[]>([])
    usePageView(): pageViewType {
        return {
            formConfig: this.formConfig,
            invoiceHistory: this.invoiceHistory,
            formEmail: this.formEmail,
            tradeOrders: this.tradeOrders,
            invoiceableAmountList: this.invoiceableAmountList
        }
    }
    async initView(){
       const res = await renderApplyInvoice({tradeOrders:this.tradeOrders.value})
        // 发票类型
        if(res.kinds && res.kinds.length){
            this.setOptions(res.kinds, this.formConfig[0].key, getInvoiceKinds)
        }
        // 发票内容
        if(res.content && res.content.length){
            this.setOptions([res.content], this.formConfig[1].key, getInvoiceContent)
        }
        // 历史抬头
        if(res.principalHistories && res.principalHistories.length){
            this.invoiceHistory.value = res.principalHistories
        }
        // 预开票信息
        if(res.invoiceableAmountList){
            this.invoiceableAmountList.value = res.invoiceableAmountList
        }
        return true 
    }
    // 处理单选项数据
    setOptions(optionList:string[], key:string, getTypeFn:Function){
      const fromFindItem = this.formConfig.find(item=>item.key==key)
      if(!fromFindItem) return {}
      fromFindItem.options = optionList.map(item=>{
        return {
            label:getTypeFn(item),
            value:item
        }
      })
      fromFindItem.value = optionList[0]
      return fromFindItem
    }

    // 存储页面参数
    storagePageParam(options:any){
        try{
            if(!options.tradeOrders) {
                uni.showToast({
                    title:'参数异常',
                    icon:'error'
                })
                return 
            }
            // 判断是否存在 %
            if(options.tradeOrders.includes('%')){
                options.tradeOrders = decodeURIComponent(options.tradeOrders)
            }
            const tempOrders = JSON.parse(options.tradeOrders)
            tempOrders.forEach((item:any)=>{
                if(item.tn && item.amt){
                    this.tradeOrders.value?.push({
                        "tradeNo": item.tn,
                        "invoiceAmt": Number(item.amt).toFixed(2)
                    })
                }
            })
        }catch(err){
            uni.showToast({
                title:'参数异常',
                icon:'error'
            })
        }
    }
    // 表单数据变动
    editInvoiceFormList = ({value,key}:{value:string|number,key:string}, fatherKey:string='', type:string='form')=>{
        let form = this.formConfig
        if(type!=='form'){
            form = this.formEmail
        }
        form.forEach(item=>{
            if(fatherKey){ // 修改二级表单数据
                if(item.key === fatherKey){
                    item.childrens && item?.childrens[item.value].forEach(childItem=>{
                        if(childItem.key === key){
                            childItem.value = value
                        }
                    })
                }
            }else{
                if(item.key === key){
                    item.value = value
                }
            }
        })
    }
    // 抬头历史删除
    deleteHistory = (id:number)=>{
        uni.showLoading({
            title:'删除中',
            mask:true
        })
        delHistoryInvoiceRecord({principalHistoryId:id}).then((res:any)=>{
            this.invoiceHistory.value = this.invoiceHistory.value.filter(item=>item.id !== id)
            uni.hideLoading()
            uni.showToast({
                title:'删除成功',
                icon:'success'
            })
        }).catch((err:any)=>{
            uni.hideLoading()
            uni.showToast({
                title:'删除失败',
                icon:'error'
            })
        })
    }
    // 插入抬头历史
    insertHistory = (item:HistoryType)=>{
        // 修改发票类别 目前写死企业
        this.editInvoiceFormList({ key: 'invoiceCategoryType', value: "ENTERPRISE" })
        // 获取当前选择的二级菜单
        const insertKey = Object.keys(item)
        insertKey.forEach((key)=>{
            if(key !== 'id' && key !== 'invoiceCategoryType'){
                this.editInvoiceFormList({ key: key, value: item[key] }, 'invoiceCategoryType')
            }
        })
    }
    // 对比两个对象是否一致
     shallowEqual(object1:any, object2:any) {
        const keys1 = Object.keys(object1);
        for (let key of keys1) {
          if (object1[key] !== object2[key] && key !== 'id' && key !== 'tenantCode') {
            return false;
          }
        }
      
        return true;
      }
     // 根据提交表单数据判断是否与历史抬头一致如果一致返回对应抬头id
     queryInvoiceHistoryId = (param:any)=>{
        const findItem = this.invoiceHistory.value.find(item=>{
            return item.invoiceTitle === param.invoiceTitle && item.taxNo === param.taxNo
        })
        console.log(findItem,123123)
        return findItem?.id || ''
     }
}
