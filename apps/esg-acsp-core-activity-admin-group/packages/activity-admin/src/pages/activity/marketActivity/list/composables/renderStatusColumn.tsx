/**
 * @description 渲染状态列
 */

export const renderStatusColumn = defineComponent({
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    isReject: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['auditMessage'],
  setup(props, { emit }) {
    const handleClick = () => {
      emit('auditMessage'); // 触发事件
    };
    return () => (
      <div class="column-status">
        <span class={props.value + ' circle'}></span>
        <span class="column-status-text">{ props.label }</span>
        {
          props.isReject && (
            <a class="column-status-reason" onClick={handleClick}>查看原因</a>
          )
        }
      </div>
    );
  },
});
