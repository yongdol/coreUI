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
          name: 'Change in customer behavior based on marketing strategy',
          url: '/report/my/1',
          icon: 'icon-puzzle'
        },
        {
          name: 'Promotion performance analysis and forecasting',
          url: '/report/my/2',
          icon: 'icon-puzzle'
        },
        {
          name: 'Analyze effectiveness by ad channel',
          url: '/report/my/3',
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