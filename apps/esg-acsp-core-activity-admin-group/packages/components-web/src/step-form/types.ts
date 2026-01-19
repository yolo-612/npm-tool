import type { ElStep } from 'element-plus';
// import type { Mutable } from 'element-plus/es/utils';
import type { Reactive, MaybeRef } from 'vue';
import type { ISubForm } from '@/src/form';

/**  步骤条配置项 */
type ElStepProps = InstanceType<typeof ElStep>['$props'];

export interface IStepFormConfigItem extends ElStepProps {
  /** 数据源 */
  dataSource: MaybeRef<any> | Reactive<any>;
  /** 表单配置项 */
  subFormList: ISubForm[];
}
