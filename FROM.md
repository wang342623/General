# 动态表单

**组件参数**


| **属性名**       | **入参**                                                                                                                        | **说明**                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **label**        | **string**                                                                                                                      | **输入框左边的文字提示** |
| **type**         | **title:标题**input:输入框**date:日期选择**textarea:**多行的文本输入控件**filed:文件上传                                        | **表单类型**             |
| **key**          | **string**                                                                                                                      | **表单对应key**          |
| **keyboardType** | **text: 标准文本键盘**decimal:小树键盘**numeric:数字键盘**tel:电话键盘**search:搜索优化键盘**email:邮件地址键盘**url:网址键盘** | **input键盘类型**        |
| **unit**         | **string**                                                                                                                      | **单位（input可用）**    |
| **filedType**    | **image/video/all**                                                                                                             | **文件上传类型**         |
| **limit**        | **number**                                                                                                                      | **可上传图片数量**       |
| **maxSize**      | **number**                                                                                                                      | **图片大小限制**         |
| **value**        | **string                                                                                                                        | array                    |
| **disabled**     | **boolean**                                                                                                                     | **是否禁用**             |
| **placeholder**  | **string**                                                                                                                      | **空提示**               |
| **required**     | **boolean**                                                                                                                     | **是否必填**             |
| **sort**         | **number**                                                                                                                      | **排序**                 |
| **rules**        | **[{**required: true,**errorMessage: '请选择日期',**}]                                                                          | **校验规则（待完善）**   |

**单选多选待定**

```javascript
const fromList1 = [
  {
    label: '专柜信息',
    type: 'title',
    sort:'1',
  },
  {
    label:'专柜名称',
    type:'input', // 输入框类型
    keyboardType: 'text', // 键盘类型
    key:'counterName', // 字段key
    value:'武林银泰店', // 默认值
    disabled: true, // 是否禁用
    sort:'2',
    rules: []
  },
  {
    label:'销售日期',
    type:'date', // 输入框类型
    key:'dateTime', // 字段key
    value:'2024-04-01', // 默认值
    disabled: false, // 是否禁用
    placeholder: '请选择日期',
    sort:'3',
    required:true,
    rules: [{
      required: true,
      errorMessage: '请选择日期',
    }]
  },

]
const fromList2 = [
    {
        label: '线下销售数据',
        type: 'title',
        sort:'1',
    },
    {
        label: '黄金',
        type: 'title',
        sort:'1',
    },
    {
        label:'姓名',
        type:'input', // 输入框类型
        keyboardType: 'text', // 键盘类型
        key:'name', // 字段key
        value:'', // 默认值
        disabled: false, // 是否禁用
        placeholder: '请输入姓名',
        sort:'4',
        required:true,
        rules: [{
            required: true,
            errorMessage: '请输入姓名',
        }]
    },
    {
        label:'年龄',
        type:'input', // 输入框类型
        keyboardType: 'text', // 键盘类型
        key:'age', // 字段key
        value:'', // 默认值
        disabled: false, // 是否禁用
        placeholder: '请输入姓名',
        sort:'4',
        required:true,
        rules: [{
            required: true,
            errorMessage: '请输入年龄',
        }]
    },
    {
        label: '黄金（123123213）',
        type: 'title',
        sort:'5',
    },
    {
        label:'净销售额',
        type:'input', // 输入框类型
        keyboardType: 'decimal', // 键盘类型
        key:'netSalesRevenue', // 字段key
        value:'', // 默认值
        disabled: false, // 是否禁用
        placeholder: '请输入净销售额',
        sort:'6',
        required:true,
        unit:'元',
        rules: [{
            required: true,
            errorMessage: '请输入净销售额',
        }] 
    },{
        label:'销售笔数',
        type:'input', // 输入框类型
        keyboardType: 'numeric', // 键盘类型
        key:'numberOfSalesTransactions', // 字段key
        value:'', // 默认值
        disabled: false, // 是否禁用
        placeholder: '请输入销售笔数',
        unit:'笔',
        sort:'7',
        required:true,
        rules: [] 
    },{
        label:'日结单上传',
        type:'filed', // 输入框类型
        filedType: 'image', // 上传文件类型 
        key:'dailyStatement', // 字段key
        limit:9, // 可上传图片数量
        maxSize: 993000,
        value:'', // 默认值
        disabled: false, // 是否禁用
        placeholder: '日结单请保证日期与销售额清晰可见',
        sort:'8',
        required:true,
        rules: [] 
    },{
        label:'备注',
        type:'textarea', // 输入框类型
        key:'remarks', // 字段key
        value:'', // 默认值
        disabled: false, // 是否禁用
        placeholder: '如涉及销售差异请填写备注说明，若无无需填写',
        sort:'9',
        rules: [] 
    }
]
```

![](https://intranetproxy.alipay.com/skylark/lark/0/2024/png/99056608/1712051139029-6d7c739b-d01d-4bd2-9fe9-c8436dfde488.png)
