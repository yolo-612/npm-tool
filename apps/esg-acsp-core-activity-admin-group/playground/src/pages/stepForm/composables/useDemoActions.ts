/* 功能行为？？ 页面内的行为 */
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';

export default function () {
  const formRef = ref();

  const route = useRoute();

  const step1Data = reactive({
    select: '123',
    inputNumber: null,
    label: 'label',
    link: 'www.baidu.com',
    numberRange: [],
    datePicker: '2024-08-11',
    radio: '123',
    table: [
      { name: 'name1', phone: 'phone1' },
      { name: 'name2', phone: 'phone2' },
      { name: 'name3', phone: 'phone3' },
    ],
  });
  const step2Data = reactive({
    select: '123',
    inputNumber: null,
    label: 'label',
    link: 'www.baidu.com',
    numberRange: [],
    datePicker: '2024-08-11',
    radio: '123',
    table: [
      { name: 'name1', phone: 'phone1' },
      { name: 'name2', phone: 'phone2' },
      { name: 'name3', phone: 'phone3' },
    ],
  });

  const onCancel = () => {
    console.log('onCancel====');
  };

  const onSaveDraft = () => {
    console.log('onSaveDraft====', );
  };

  const onSave = () => {
    console.log('onSave====');
  };

  return {
    formRef,
    route,
    step1Data,
    step2Data,
    onCancel,
    onSaveDraft,
    onSave,
  };
}
