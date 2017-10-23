export default {
    member_items: [
        {
            name: 'SampleBoard',
            url: '/cxo/sampledashboard',
            icon: 'icon-speedometer',
        },
        {
            name: 'MyData',
            url: '/cxo/dashboard',
            icon: 'icon-chart',
        },
        {
            name: 'Algorithm Info',
            url: '/cxo/algorithm',
            icon: 'icon-puzzle',
            children: [
                {
                    name: 'Push/Pull',
                    url: '/cxo/algorithm/1',
                    icon: 'icon-puzzle'
                },
                {
                    name: 'algorithm2',
                    url: '/cxo/algorithm/2',
                    icon: 'icon-puzzle'
                }
            ]
        }
    ],
    guest_items: [
        {
            name: 'SampleBoard',
            url: '/cxo/sampledashboard',
            icon: 'icon-speedometer',
        }
    ]
};
