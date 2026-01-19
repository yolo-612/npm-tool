/**
 * @description 模板的方法
 */
import type { Ref } from 'vue';
import { ElMessage } from 'element-plus';
import { postTemplateDetail, postTemplateSaveOrUpdate } from '@/apis/methods/activity/business';
import { ITemplateType } from '@/apis/methods/activity/business/types';
import { htmlToImage } from '@/utils/htmlToImage';
import { E_TABLIST } from './types';

export default function (
  coverRenderer: Ref<any>,
  emits: any,
) {
  /** 当前激活的tab */
  const activeTabs = ref<E_TABLIST>(E_TABLIST.HOME);
  // 节点显示
  const visible = ref(<boolean>false);
  const isDisabled = ref<boolean>(true);
  const templateCode = ref<string>('');
  watch(visible, (val) => {
    // 默认选中第一个tab
    activeTabs.value = E_TABLIST.HOME;
  });

  /** form 表单 */
  const form = reactive<{
    templateName: string;
    templateType: ITemplateType;
    pageTitle: string;
    pageBgColor: string;
    pageBgUrl: string;
    pageBtnUrl: string;
    pageRuleText: string;
    pageAgreementText: string;
    titleImage: string;
    businessType: string;
  }>({
    templateName: '',
    templateType: ITemplateType.SYSTEM,
    pageTitle: '',
    pageBgColor: '',
    pageBgUrl: '',
    pageBtnUrl: '',
    pageRuleText: '',
    pageAgreementText: '',
    titleImage: '',
    businessType: '',
  });

  /** 获取详情 */
  const getTemplateDetail = async () => {
    try {
      const { obj } = await postTemplateDetail({
        templateCode: templateCode.value,
      });
      form.templateName = obj.templateName;
      form.templateType = obj.templateType!;
      form.businessType = obj.businessType;
      const info = JSON.parse(obj.templateJson || '{}');
      Object.assign(form, info);
    } catch (err: any) {
      ElMessage.error(err.message);
    }
  };

  /** 校验富文本是否为空 */
  const checkRichText = (text: string) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const textContent = doc.body.textContent || '';
      return textContent.trim() !== '';
    } catch (error) {
      return false;
    }
  };

  /** 提交 */
  const commitTemplateInfo = async () => {
    try {
      if (!form.templateName) {
        ElMessage.error('请输入模板名称');
        return;
      }
      if (!form.pageTitle) {
        ElMessage.error('请输入页面标题');
        return;
      }
      /** 背景色校验 */
      if (form?.pageBgColor) {
        const colorRegex = /^#([0-9a-fA-F]{6})$/;
        const result = colorRegex.test(form.pageBgColor);
        if (!result) {
          ElMessage.error('请输入正确的颜色值！');
          return;
        }
      }
      if (!form.pageBgUrl) {
        ElMessage.error('请上传页面背景图');
        return;
      }
      if (!form.pageBtnUrl) {
        ElMessage.error('请上传按钮图片');
        return;
      }
      if (!form.pageRuleText || !checkRichText(form.pageRuleText)) {
        ElMessage.error('请上传活动规则');
        return;
      }
      if (!form.pageAgreementText || !checkRichText(form.pageAgreementText)) {
        ElMessage.error('请上传个人信息保护协议');
        return;
      }
      emits('handlePageStatus', true);
      const coverUrl = (await htmlToImage(coverRenderer.value)) as string;
      const {
        templateName,
        businessType,
        titleImage,
        templateType,
        ...rest
      } = form;
      const vParams = {
        templateName,
        businessType,
        titleImage: coverUrl,
        templateJson: JSON.stringify(rest),
      };
      const { obj } = await postTemplateSaveOrUpdate(
        templateType === ITemplateType.SYSTEM ? vParams : { ...vParams, templateCode: templateCode.value },
      );
      if (obj.templateCode) {
        visible.value = false;
        ElMessage.success('保存成功');
        emits('handleSaveTemplateInfo', obj.templateCode);
      } else {
        ElMessage.error('保存失败');
      }
    } catch (err: any) {
      ElMessage.error(err.message);
    } finally {
      emits('handlePageStatus', false);
    }
  };

  /** 显示组件 - 外部调用 */
  const showTemplateInfo = async (code: string, disabled: boolean) => {
    if (code) {
      visible.value = true;
      templateCode.value = code;
      isDisabled.value = disabled;
      await getTemplateDetail();
    }
  };

  return {
    form,
    activeTabs,
    visible,
    isDisabled,
    commitTemplateInfo,
    showTemplateInfo,
  };
}
