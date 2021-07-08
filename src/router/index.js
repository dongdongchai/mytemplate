import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
    ***  no effect! noCache: true                if set true, the page will no be cached(default is false)
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" }
      }
    ]
  },

  // {
  //   path: "/device",
  //   component: Layout,
  //   name: "Device",
  //   meta: { title: "设备信息", icon: "tree" },
  //   children: [
  //     // {
  //     //   path: "device_map",
  //     //   name: "Devicemap",
  //     //   component: () => import("@/views/device/device_map/index"),
  //     //   meta: { title: "设备概览0", icon: "map" }
  //     // },
  //     {
  //       path: "device_table",
  //       name: "DeviceTable",
  //       component: () => import("@/views/device/device_table/index"),
  //       meta: { title: "设备列表", icon: "table" }
  //     },
  //     {
  //       path: "deviceOverview",
  //       name: "deviceOverview",
  //       component: () => import("@/views/device/deviceOverview/index"),
  //       meta: { title: "设备概览", icon: "map" }
  //     }
  //   ]
  // },
  // {
  //   path: "/map",
  //   component: Layout,
  //   name: "Map",
  //   meta: { title: "地图", icon: "map" },
  //   children: [
  //     {
  //       path: "import_map",
  //       name: "ImportMap",
  //       component: () => import("@/views/map/import_device"),
  //       meta: { title: "添加设备", icon: "form" }
  //     },
  //     {
  //       path: "show_device",
  //       name: "ShowDevice",
  //       component: () => import("@/components/MapDisplay/index"),
  //       meta: { title: "显示设备", icon: "map" }
  //     }
  //    ]
  //  },
  // {
  //   path: "/stats",
  //   component: Layout,
  //   name: "Stats",
  //   meta: { title: "数据查询", icon: "data" },
  //   children: [
  //     {
  //       path: "pm-distribution",
  //       component: () => import("@/views/stats/Camera/index"),
  //       name: "pm-distribution",
  //       meta: { title: "地图", icon: "camera" }
  //     },
      // {
      //   path: "historyImg",
      //   component: () => import("@/views/stats/Camera/historyImg"),
      //   name: "historyImg",
      //   meta: { title: "历史图像", icon: "album" }
      // },
      // {
      //   path: "Carousel",
      //   component: () => import("@/views/stats/Carousel/index"),
      //   name: "Carousel",
      //   meta: { title: "沉降监测", icon: "settlement" }
      // },
      // {
      //   path: "Inclination",
      //   component: () => import("@/views/stats/Inclination/index"),
      //   name: "Inclination",
      //   meta: { title: "倾斜监测", icon: "angle" }
      // }
  //  ]
  //},

  {
    path: "/alarm",
    component: Layout,
    children: [
      {
        path: "index",
        name: "alarm",
        component: () => import("@/views/stats/Carousel/index"),
        meta: { title: "raman", icon: "alarm" }
      }
    ]
  },
  {
    path: "/stats",
    component: Layout,
    children: [
      {
        path: "map",
        name: "baidumap",
       // name:"map",
        component: () => import("@/views/stats/Camera/index"),
        meta: { title: "地图", icon: "map" }
      }
    ]
  },

  // {
  //   path: "/apitest",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "index",
  //       name: "apitest",
  //       component: () => import("@/views/APITest/index"),
  //       meta: {
  //         title: "APITest",
  //         icon: "test",
  //         noCache: true
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: "external-link",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "http://wuli.tyut.edu.cn/xxcgqyznkzjybzdsys/sy.htm",
  //       meta: { title: "External Link", icon: "link" }
  //     }
  //   ],
  //   hidden: true
  // },
  // {
  //   path: "django-admin",
  //   component: Layout,
  //   children: [
  //     {
  //       path: process.env.VUE_APP_BASE_API.slice(0, 26) + "admin",
  //       meta: {
  //         title: "用户管理",
  //         icon: "link",
  //         roles: ["admin", "zanwei"]
  //       }
  //     }
  //   ]
  // },
  // // 404 page must be placed at the end !!!
  // { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    // base: '/'
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
