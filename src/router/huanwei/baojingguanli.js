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
  path: '/baojingguanli',
  name: '_baojingguanli',
  component: Main,
  meta: {
    icon: 'md-bug',
    title: '报警管理',
  },
  children: [{
    path: 'chaosubaojing',
    name: 'chaosubaojing',
    meta: {
      // access: ['admin'],
      icon: 'md-cube',
      title: '超速报警'
    },
    component: () => import('@/view/single-page/home')
  }, {
    path: 'tingliuchaoshibaojing',
    name: 'tingliuchaoshibaojing',
    meta: {
      // access: ['super_admin'],
      icon: 'ios-list-box',
      title: '停留超时报警'
    },
    component: () => import('@/view/single-page/home')
  }, {
    path: 'yuejiebaojing',
    name: 'yuejiebaojing',
    meta: {
      // access: ['super_admin'],
      icon: 'ios-list-box',
      title: '越界报警'
    },
    component: () => import('@/view/single-page/home')
  }, {
    path: 'yichangyouhaobaojing',
    name: 'yichangyouhaobaojing',
    meta: {
      // access: ['super_admin'],
      icon: 'ios-list-box',
      title: '异常油耗报警'
    },
    component: () => import('@/view/single-page/home')
  }, {
    path: 'lajimanyibaojing',
    name: 'lajimanyibaojing',
    meta: {
      // access: ['super_admin'],
      icon: 'ios-list-box',
      title: '垃圾满溢报警'
    },
    component: () => import('@/view/single-page/home')
  }, {
    path: 'lvyebaojing',
    name: 'lvyebaojing',
    meta: {
      // access: ['super_admin'],
      icon: 'ios-list-box',
      title: '滤液报警'
    },
    component: () => import('@/view/single-page/home')
  }, {
    path: 'sosbaojing',
    name: 'sosbaojing',
    meta: {
      // access: ['super_admin'],
      icon: 'ios-list-box',
      title: 'SOS报警'
    },
    component: () => import('@/view/single-page/home')
  }]
}