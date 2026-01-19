import { TableColumnType } from '@fpkg/components-web';
import type { EquitiesInfo } from '@/apis/methods/common/types';

export default function useConfig() {
  const equityColumn = {
    /** 权益名称 */
    name: {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '权益名称',
        prop: 'name',
      },
    },
    /** 权益编码 */
    pkgDataId: {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '权益编码',
        prop: 'pkgDataId',
      },
    },
    /** 折扣 */
    equities: {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '折扣/金额',
        prop: 'equities',
      },
      render: (text: EquitiesInfo[]) => {
        const equity = text?.length ? text[0] : { deductionType: '', deductionValue: '' };
        const { deductionValue, deductionType } = equity;
        return deductionType === '10' ? `${parseFloat((Number(deductionValue) * 10).toFixed(1))}折` : `${deductionValue}元`;
      },
    },
    /** 张数 */
    equityPkgCount: {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '张数',
        prop: 'equities',
      },
      render: (text: EquitiesInfo[]) => {
        const equity = text?.length ? text[0] : { equityValue: '0' };
        return equity.equityValue;
      },
    },
    /** 折扣上限 */
    //   maxDeductionValue: {
    //     label: '折扣上限',
    //     prop: 'maxDeductionValue',
    //     customRender: (text, record) => {
    //       if (!record?.equities) return '';
    //       const { maxDeductionValue } = record.equities[0];
    //       return maxDeductionValue || '无抵扣上限';
    //     },
    //   },
    /** 城市流向 */
    //   cityFlowDirectionListFullMinus: {
    //     label: '城市流向',
    //     prop: 'cityFlowDirectionListFullMinus',
    //     customRender: (text, record) => {
    //       if (!record?.equities) return '无';
    //       const { cityFlowDirectionListFullMinus } = record.equities[0];
    //       const cityFlow = cityFlowDirectionListFullMinus.map((item, index) => {
    //         const { sourceDistCode = [], targetDistCode = [] } = item;
    //         // 始发地
    //         const source = sourceDistCode.map((code) => {
    //           return appArea.getNameByCode(code);
    //         }).join(',');
    //         // 目的地
    //         const target = targetDistCode.map((code) => {
    //           return appArea.getNameByCode(code);
    //         }).join(',');
    //         return `【流向${index + 1}】${source} -> ${target}`;
    //       }).join('; ');
    //       return cityFlow || '无';
    //     },
    //   },
    /** 开始时间 */
    startTm: {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '开始时间',
        prop: 'startTm',
      },
    },
    /** 结束时间 */
    endTm: {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '结束时间',
        prop: 'endTm',
      },
    },
  };

  return { equityColumn };
}
