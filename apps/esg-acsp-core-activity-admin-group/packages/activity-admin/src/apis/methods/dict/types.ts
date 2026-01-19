export interface DictValue {
  /** 唯一标识 */
  id: number;
  /** 类型code */
  typeCode: string;
  /** 类型名称 */
  typeName: string;
  /** 字典key值 */
  code: string;
  /** 字典名称 */
  name: string;
  /** 字典value值 */
  value: string;
  /** 描述 */
  desc: string;
  /** 排序 */
  rank: number;
  /** 修改时间 */
  modifyTime: string;
  /** 创建时间 */
  createTime: string;
  /** 创建人 */
  creator: string;
  /** 修改人 */
  modifier: string;
}

export interface IReqBatchDictList {
  /** 类型 Code 列表 */
  typeCodeList: string[];
}

export type IResBatchDictList = Record<string, DictValue[]>;

export interface IReqGetByPage {
  /** 分页页码 */
  pageNum: number;
  /** 分页大小 */
  pageSize: number;
  /** 类型 Code */
  typeCode: string;
}

export interface IResGetByPage {
  /** 分页页码 */
  pageNum: number;
  /** 分页大小 */
  pageSize: number;
  /** 总数 */
  totalSize: number;
  /** 值列表 */
  list: DictValue[];
}

export interface IReqSaveOrUpdate {
  /** 类型编码 */
  typeCode: string;
  /** 类型名称 */
  typeName: string;
  /** 字典编码 */
  code: string;
  /** 字典名称 */
  name: string;
  /** 字典值 */
  value: string;
  /** 描述 */
  desc: string;
  /** 排序 */
  rank: string;
}

export type IResSaveOrUpdate = null;

export interface IReqGetList {
  /** 类型 Code */
  typeCode: string;
}

export type IResGetList = DictValue[];

export interface IReqGetDetailInfo {
  /** 唯一标识 */
  id: string;
}

export type IResGetDetailInfo = DictValue;
