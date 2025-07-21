const system = {
  id: 'system',
  title: '',
  type: 'group',
  children: [
    {
      id: 'submenu-reports',
      title: 'Reports',
      type: 'collapse',
      children: [
        {
          id: 'sales',
          title: 'Sales',
          type: 'item',
          url: '/system/sales'
        },
        {
          id: 'inventory',
          title: 'Inventory',
          type: 'item',
          url: '/system/inventory'
        }
      ]
    },
    // {
    //   id: 'settings',
    //   title: 'Settings',
    //   type: 'item',
    //   url: '/system/settings'
    // }
  ]
};

export default system;
