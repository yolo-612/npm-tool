import { TableColumnType  } from '@fpkg/components-web';

export default function () {
  const tableConfig = {
    searchHeader: {
      showBtnList: true,
      searchBtnTxt: '搜索',
      resetBtnTxt: '重置',
      searchItemList: [
        {
          type: TableColumnType.Input,
          name: 'name',
          label: '客户名称',
          fieldProps: {
            showSearchIcon:false,
            placeholder: '填写名称',
            showWordLimit: true,
            maxlength: 100,
            onBlur:(name:string)=>{
              console.log('change===',name)
            }
          },
          rules:[{required:true, message:'必填项'}]
        },
        {
          type: TableColumnType.Select,
          name: 'phone',
          label: '手机号',
          fieldProps: {
            placeholder: '填写名称',
            options:[
              {
                label: '选项1',
                value: '1'
              },
              {
                label: '选项2',
                value: '2'
              }
            ]
          },
          rules:[{required:true, message:'必填项'}]
        },
      ],
    },
    columns: [
      {
        renderType:TableColumnType.ElColumn,
        columnProps: {
          label: '姓名',
          prop: 'name',
        },
      },
      {
        renderType:TableColumnType.ElColumn,
        columnProps: {
          label: '手机号',
          prop: 'phone',
        },
      },
    ],

  };
  return { tableConfig };
}
