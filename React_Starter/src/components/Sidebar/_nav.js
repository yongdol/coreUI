export default {
  member_items: [
    {
      title: true,
      name: 'Dashboard',
    },
    {
      name: 'Sample DashBoard',
      url: '/cxo/sampledashboard',
      icon: 'icon-speedometer',
    },
    {
      name: 'My DashBoard',
      url: '/cxo/dashboard',
      icon: 'icon-chart',
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Report',
    },
    {
      name: 'New Report',
      url: '/report/new',
      icon: 'icon-speedometer',
    },
    {
      name: 'My Report',
      url: '/report/my',
      icon: 'icon-speedometer',
      children: [
        {
          name: 'Cate1',
          url: '/report/my/cate1',
          icon: 'icon-puzzle'
        },
        {
          name: 'Cate2',
          url: '/report/my/cate2',
          icon: 'icon-puzzle'
        },
        {
          name: 'Cate3',
          url: '/report/my/cate3',
          icon: 'icon-puzzle'
        },
        {
          name: 'Cate4',
          url: '/report/my/cate4',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Service',
      url: '/service',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'PushPull',
          url: '/service/1',
          icon: 'icon-puzzle'
        }
      ]
    }
  ],
  guest_items: [
    {
      title: true,
      name: 'Dashboard',
    },
    {
      name: 'SampleBoard',
      url: '/cxo/sampledashboard',
      icon: 'icon-speedometer',
    }
  ]
};
