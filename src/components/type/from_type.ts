/*
 * @Author: wha wha01707839@intime.com.cn
 * @Date: 2025-02-26 15:04:08
 * @LastEditors: wha wha01707839@intime.com.cn
 * @LastEditTime: 2025-02-26 15:04:32
 * @FilePath: /General/src/components/type/from_type.ts
 * @Description: 
 * 
 */
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
