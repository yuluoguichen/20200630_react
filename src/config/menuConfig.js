import {
  HomeOutlined,
  PieChartFilled,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: HomeOutlined, // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '商品',
    key: '/products',
    icon: MailOutlined, // 图标名称
    children: [ // 子菜单列表
      {
        title: '品类管理',
        key: '/category',
        icon: ContainerOutlined, // 图标名称
      },
      {
        title: '商品管理',
        key: '/product',
        icon: DesktopOutlined, // 图标名称
      },
    ]
  },

  {
    title: '用户管理',
    key: '/user',
    icon: PieChartOutlined, // 图标名称
  },
  {
    title: '角色管理',
    key: '/role',
    icon: MenuUnfoldOutlined, // 图标名称
  },

  {
    title: '图形图表',
    key: '/charts',
    icon: AppstoreOutlined, // 图标名称
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: AppstoreOutlined, // 图标名称
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: MenuFoldOutlined, // 图标名称
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: AppstoreOutlined, // 图标名称
      },
    ]
  },

  {
    title: '订单管理',
    key: '/order',
    icon: PieChartFilled, // 图标名称
  },
]

export default menuList