export default {
  member_items: [
    {
      title: true,
      name: 'Dashboard',
    },
    {
      name: 'My Dashboard',
      url: '/cxo/dashboard',
      icon: 'icon-book-open',
    },
    {
      name: 'Example Dashboard',
      url: '/cxo/sampledashboard',
      icon: 'icon-speedometer',
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Report',
    },
    {
      name: 'Create Report',
      url: '/report/new',
      icon: 'icon-note',
    },
    {
      name: 'My Reports',
      url: '/report/my',
      icon: 'icon-folder-alt',
      children: [
        {
          name: 'Change in customer behavior based on marketing strategy',
          url: '/report/my/1',
          icon: 'icon-doc'
        },
        {
          name: 'Promotion performance analysis and forecasting',
          url: '/report/my/2',
          icon: 'icon-doc'
        },
        {
          name: 'Analyze effectiveness by ad channel',
          url: '/report/my/3',
          icon: 'icon-doc'
        }
      ]
    },
    {
      name: 'Services',
      url: '/service',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'PushPull',
          url: '/service/1',
          icon: 'icon-energy'
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
      name: 'Example Dashboard',
      url: '/cxo/sampledashboard',
      icon: 'icon-speedometer',
    }
  ]
};