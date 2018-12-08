import Main from "@/components/main";

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default {
  path: "/renyuanguanli",
  name: "_renyuanguanli",
  component: Main,
  meta: {
    icon: "md-bug",
    title: "人员管理"
  },
  children: [{
      path: "huanweirenyuan",
      name: "huanweirenyuan",
      meta: {
        // access: ['admin'],
        icon: "md-cube",
        title: "环卫人员"
      },
      component: () => import("@/view/huanwei/renyuanguanli/huanweirenyuan")
    },
    {
      path: "renyuankaoqin",
      name: "renyuankaoqin",
      meta: {
        // access: ['super_admin'],
        icon: "ios-list-box",
        title: "人员考勤"
      },
      component: () => import("@/view/huanwei/renyuanguanli/renyuankaoqin")
    },
    {
      path: "kaoqintongji",
      name: "kaoqintongji",
      meta: {
        // access: ['super_admin'],
        icon: "ios-list-box",
        title: "考勤统计"
      },
      component: () => import("@/view/single-page/home")
    },
    {
      path: "paibanguanli",
      name: "paibanguanli",
      meta: {
        // access: ['super_admin'],
        icon: "ios-list-box",
        title: "排班管理"
      },
      component: () => import("@/view/huanwei/renyuanguanli/paibanguanli")
    },
    {
      path: "chidaojilu",
      name: "chidaojilu",
      meta: {
        // access: ['super_admin'],
        icon: "ios-list-box",
        title: "迟到记录"
      },
      component: () => import("@/view/huanwei/renyuanguanli/chidaojilu")
    },
    {
      path: "zaotuijilu",
      name: "zaotuijilu",
      meta: {
        // access: ['super_admin'],
        icon: "ios-list-box",
        title: "早退记录"
      },
      component: () => import("@/view/huanwei/renyuanguanli/zaotuijilu")
    },
    {
      path: "queqinjilu",
      name: "queqinjilu",
      meta: {
        // access: ['super_admin'],
        icon: "ios-list-box",
        title: "缺勤记录"
      },
      component: () => import("@/view/huanwei/renyuanguanli/queqinjilu")
    },
    {
      path: "tuogangjilu",
      name: "tuogangjilu",
      meta: {
        // access: ['super_admin'],
        icon: "ios-list-box",
        title: "脱岗记录"
      },
      component: () => import("@/view/huanwei/renyuanguanli/tuogangjilu")
    }
  ]
};