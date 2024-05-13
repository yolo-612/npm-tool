export const mockUserInfo = {
  "success": true,
  "obj": {
    "empCode": "yolo"
  }
}

export const mockRoleInfo = {
  "success": true,
  "obj": [
    {
      "roleId": "1000031743",
      "roleCode": "manage",
      "roleName": "管理员",
      "isDefaultRole": "0",
      "moduleId": null,
      "moduleCode": null,
      "moduleName": null,
      "moduleIcon": null,
      "moduleType": null,
      "parentId": null,
      "sort": null,
      "subsysCode": "rbac",
      "hidden": null,
      "helpUrl": null,
      "checkStatus": null,
      "childModules": []
    },
    {
      "roleId": "1000031744",
      "roleCode": "customer",
      "roleName": "客服",
      "isDefaultRole": "0",
      "moduleId": null,
      "moduleCode": null,
      "moduleName": null,
      "moduleIcon": null,
      "moduleType": null,
      "parentId": null,
      "sort": null,
      "subsysCode": "rbac",
      "hidden": null,
      "helpUrl": null,
      "checkStatus": null,
      "childModules": []
    },
  ]
}

export const mockPermissionInfo = {
  "success": true,
  "obj": [
    {
      "moduleId": 6341236,
      "parentId": 6341200,
      "moduleName": "运营位管理",
      "moduleCode": "bx_manage_operation_manage",
      "moduleIcon": "",
      "sort": 1,
      "badge": 0,
      "parent": null,
      "hidden": "N",
      "helpUrl": "",
      "checkStatus": null,
      "childModules": [
        {
          "moduleId": 6341241,
          "parentId": 6341236,
          "moduleName": "运营位-审核",
          "moduleCode": "operation_review",
          "moduleIcon": "",
          "sort": 7,
          "badge": 0,
          "parent": null,
          "hidden": "N",
          "helpUrl": "222222",
          "checkStatus": null,
          "childModules": []
        },
        {
          "moduleId": 6341242,
          "parentId": 6341236,
          "moduleName": "运营位-发布",
          "moduleCode": "operation_publish",
          "moduleIcon": "",
          "sort": 8,
          "badge": 0,
          "parent": null,
          "hidden": "N",
          "helpUrl": "",
          "checkStatus": null,
          "childModules": []
        },
        {
          "moduleId": 6351421,
          "parentId": 6341236,
          "moduleName": "运营位-基础信息-查看",
          "moduleCode": "operation_baseinfo_view",
          "moduleIcon": "",
          "sort": 9,
          "badge": 0,
          "parent": null,
          "hidden": "N",
          "helpUrl": "",
          "checkStatus": null,
          "childModules": []
        },
        {
          "moduleId": 6351419,
          "parentId": 6341236,
          "moduleName": "运营位-查看",
          "moduleCode": "operation_view",
          "moduleIcon": "",
          "sort": 10,
          "badge": 0,
          "parent": null,
          "hidden": "N",
          "helpUrl": "",
          "checkStatus": null,
          "childModules": []
        },
        {
          "moduleId": 6351430,
          "parentId": 6341236,
          "moduleName": "运营位-UI展示-查看",
          "moduleCode": "operation_ui_view",
          "moduleIcon": "",
          "sort": 12,
          "badge": 0,
          "parent": null,
          "hidden": "N",
          "helpUrl": "",
          "checkStatus": null,
          "childModules": []
        },
        {
          "moduleId": 6351437,
          "parentId": 6341236,
          "moduleName": "运营位-投放周期-查看",
          "moduleCode": "operation_launch_view",
          "moduleIcon": "",
          "sort": 17,
          "badge": 0,
          "parent": null,
          "hidden": "N",
          "helpUrl": "",
          "checkStatus": null,
          "childModules": []
        },
        {
          "moduleId": 6351439,
          "parentId": 6341236,
          "moduleName": "运营位-投放内容-查看",
          "moduleCode": "operation_content_view",
          "moduleIcon": "",
          "sort": 22,
          "badge": 0,
          "parent": null,
          "hidden": "N",
          "helpUrl": "",
          "checkStatus": null,
          "childModules": []
        }
      ]
    },
    {
      "moduleId": 6361735,
      "parentId": 6341200,
      "moduleName": "应用管理权限",
      "moduleCode": "bx_manage_app_manage",
      "moduleIcon": "",
      "sort": 3,
      "badge": 0,
      "parent": null,
      "hidden": "N",
      "helpUrl": "",
      "checkStatus": null,
      "childModules": [
        {
          "moduleId": 6361747,
          "parentId": 6361735,
          "moduleName": "应用-投放周期-查看",
          "moduleCode": "app_launch_view",
          "moduleIcon": null,
          "sort": 0,
          "badge": 0,
          "parent": null,
          "hidden": "N",
          "helpUrl": null,
          "checkStatus": null,
          "childModules": []
        },
        {
          "moduleId": 6361745,
          "parentId": 6361735,
          "moduleName": "应用-扩展特性-查看",
          "moduleCode": "app_feature_view",
          "moduleIcon": null,
          "sort": 0,
          "badge": 0,
          "parent": null,
          "hidden": "N",
          "helpUrl": null,
          "checkStatus": null,
          "childModules": []
        },
        {
          "moduleId": 6361743,
          "parentId": 6361735,
          "moduleName": "应用-环境配置-查看",
          "moduleCode": "app_env_view",
          "moduleIcon": null,
          "sort": 0,
          "badge": 0,
          "parent": null,
          "hidden": "N",
          "helpUrl": null,
          "checkStatus": null,
          "childModules": []
        },
        {
          "moduleId": 6361741,
          "parentId": 6361735,
          "moduleName": "应用-基础信息-查看",
          "moduleCode": "app_baseinfo_view",
          "moduleIcon": null,
          "sort": 0,
          "badge": 0,
          "parent": null,
          "hidden": "N",
          "helpUrl": null,
          "checkStatus": null,
          "childModules": []
        },
        {
          "moduleId": 6361740,
          "parentId": 6361735,
          "moduleName": "应用-查看详情",
          "moduleCode": "app_view",
          "moduleIcon": null,
          "sort": 0,
          "badge": 0,
          "parent": null,
          "hidden": "N",
          "helpUrl": null,
          "checkStatus": null,
          "childModules": []
        },
        {
          "moduleId": 6361751,
          "parentId": 6361735,
          "moduleName": "应用-发布",
          "moduleCode": "app_publish",
          "moduleIcon": null,
          "sort": 0,
          "badge": 0,
          "parent": null,
          "hidden": "N",
          "helpUrl": null,
          "checkStatus": null,
          "childModules": []
        },
        {
          "moduleId": 6361750,
          "parentId": 6361735,
          "moduleName": "应用-审核",
          "moduleCode": "app_review",
          "moduleIcon": null,
          "sort": 0,
          "badge": 0,
          "parent": null,
          "hidden": "N",
          "helpUrl": null,
          "checkStatus": null,
          "childModules": []
        }
      ]
    }
  ],
}