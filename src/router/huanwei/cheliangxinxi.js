import Main from '@/components/main'

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
  path: '/cheliangxinxi',
  name: '_cheliangxinxi',
  component: Main,
  meta: {
    icon: 'md-bug',
    title: '车辆信息',
  },
  children: [{
    path: 'ziyuanguanli',
    name: 'ziyuanguanli',
    meta: {
      // access: ['admin'],
      icon: 'md-cube',
      title: '资源管理'
    },
    component: () => import('@/view/single-page/home')
  }, {
    path: 'cheliangleixing',
    name: 'cheliangleixing',
    meta: {
      // access: ['super_admin'],
      icon: 'ios-list-box',
      title: '车辆类型'
    },
    component: () => import('@/view/single-page/home')
  }, {
    path: 'cheliangxinxi',
    name: 'cheliangxinxi',
    meta: {
      // access: ['super_admin'],
      icon: 'ios-list-box',
      title: '车辆信息'
    },
    component: () => import('@/view/single-page/home')
  }, {
    path: 'youxiangleixing',
    name: 'youxiangleixing',
    meta: {
      // access: ['super_admin'],
      icon: 'ios-list-box',
      title: '油箱类型'
    },
    component: () => import('@/view/single-page/home')
  }, {
    path: 'youxiangguanli',
    name: 'youxiangguanli',
    meta: {
      // access: ['super_admin'],
      icon: 'ios-list-box',
      title: '油箱管理'
    },
    component: () => import('@/view/single-page/home')
  }, {
    path: 'caijiqifenlei',
    name: 'caijiqifenlei',
    meta: {
      // access: ['super_admin'],
      icon: 'ios-list-box',
      title: '采集器分类'
    },
    component: () => import('@/view/single-page/home')
  }]
}