import type { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_utils';

export default [
  {
    url: '/activity-web-backend/im-activity/web/coupon/getDetail1',
    timeout: 200,
    method: 'post',
    response: () => resultSuccess({
      name: '小任务0001',
      code: 'CouponIssue2025032500001',
      customerLayer: '0',
      customerGroupType: '1',
      equityName: 'my测试编辑后台2',
      equityCode: 'SFCPG20250311054E84C6E46CE8633',
      equityType: '1',
      discountType: '10',
      discountValue: '0.7',
      equityCount: '2',
      status: '3',
      equityStartTime: '2025-03-01 00:00:00',
      equityEndTime: '2025-03-31 23:59:59',
      equityStartType: '1',
      equityEndType: '1',
      couponValidDuration: 0,
      rightsStartTime: '2025-03-11 00:00:00',
      rightsEndTime: '2025-03-31 23:59:59',
      couponTypeCount: 1,
      source: '0',
      equityPkgCount: 1,
      rewardProjectCode: '21321',
      rewardStatisticalType: 'TICKET',
      taskAction: 'TICKET_USED_EQUITY',
      startTime: '2025-03-25 00:00:00',
      endTime: '2025-03-30 00:00:00',
      rewardFlag: '1',
      rewardList: [
        {
          groupCodeList: [
            {
              customerGroupName: '0001',
              customerGroupCode: 'GuestGroup5a00f05900da',
            },
            {
              customerGroupName: '0004',
              customerGroupCode: 'GuestGroup17289d83f35b',
            },
          ],
          pointTicket: 12,
          pointTotal: 21,
        },
        {
          groupCodeList: [
            {
              customerGroupName: '0003',
              customerGroupCode: 'GuestGroupdb2654625dc6',
            },
            {
              customerGroupName: '0004',
              customerGroupCode: 'GuestGroup17289d83f35b',
            },
            {
              customerGroupName: '0005',
              customerGroupCode: 'GuestGroupcffe0c64f801',
            },
          ],
          pointTicket: 555,
          pointTotal: 1111,
        },
      ],
      materialJson: '{"titleTag":"https://acsp-static.sit.sf-express.com/sfoss/sfosspubilc001/c58c229ad7a94063a48520b3ee160cb4.jpeg","cardBackground":"https://acsp-static.sit.sf-express.com/sfoss/sfosspubilc001/c58c229ad7a94063a48520b3ee160cb4.jpeg"}',
    }),
  },
] as MockMethod[];
