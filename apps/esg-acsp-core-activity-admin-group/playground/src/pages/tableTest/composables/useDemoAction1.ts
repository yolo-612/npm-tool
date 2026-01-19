import { ref, reactive } from 'vue';
export default function () {
  const data = ref([
    {
      name: 'Tom',
      phone: 'No. 189, Grove St, Los Angeles',
    },
    {
      name: 'Tom',
      phone: 'No. 189, Grove St, Los Angeles',
    },
    {
      name: 'Tom',
      phone: 'No. 189, Grove St, Los Angeles',
    },
    {
      name: 'Tom',
      phone: 'No. 189, Grove St, Los Angeles',
    },
  ]);

  const formData = reactive({
    name: 123,
    phone: '1',
  });
  return {
    data,
    formData,
  };
}

export const data1 = ref([
    {
      date: '2016-05-03',
      name: 'Tom',
      phone: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      phone: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      phone: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      phone: 'No. 189, Grove St, Los Angeles',
    },
  ]);