import type { ElForm, FormValidateCallback } from 'element-plus';
import type { Ref } from 'vue';
import { reactive, onMounted } from 'vue';

interface IFormMethod {
  validate: (callback?: FormValidateCallback | undefined) => Promise<boolean> | undefined;
  resetFields: () => void;
  clearValidate: (props?: string | string[]) => void;
  validateField: (props: string | string[], cb: FormValidateCallback) => void;
  scrollToField: (prop: string) => void;
}

interface IForwardReturns {
  validateCallback: Ref<Function | undefined>;
  formMethods: IFormMethod;
  formRef: Ref<InstanceType<typeof ElForm> | null>;
}

/**
 * 转发ElForm的方法
 */
export const useForwardFormMethods = (formRef: Ref<InstanceType<typeof ElForm> | null>): IForwardReturns => {
  const formMethods = reactive<IFormMethod>({
    validate: (callback?: FormValidateCallback | undefined) => undefined,
    validateField: (props: string | string[], cb: FormValidateCallback) => {},
    resetFields: (props?: string | string[]) => {},
    clearValidate: (props?: string | string[]) => {},
    scrollToField: (prop: string) => {},
  });

  /** 存储校验回调 */
  const validateCallback = ref<Function>();

  onMounted(() => {
    formMethods.validate = (callback?: FormValidateCallback | undefined) => {
      return formRef.value!.validate((isValid, invalidFields?) => {
        validateCallback.value?.();
        callback?.(isValid, invalidFields);
        if (!isValid && invalidFields) {
          const firstKey = Object.keys(invalidFields)[0];
          if (firstKey) {
            formRef.value!.scrollToField(firstKey);
          }
        }
      });
    };
    formMethods.validateField = formRef.value!.validateField;
    formMethods.resetFields = formRef.value!.resetFields;
    formMethods.clearValidate = formRef.value!.clearValidate;
    formMethods.scrollToField = formRef.value!.scrollToField;
  });

  return { validateCallback, formMethods, formRef };
};
