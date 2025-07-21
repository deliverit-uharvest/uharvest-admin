const location = {
  id: 'location',
  title: '', // This is the group heading (optional)
  type: 'group',
  children: [
    {
      id: 'location',
      title: 'Locations', // The visible text
      type: 'collapse',   // ⬅️ Make it collapsible
      children: [
        {
          id: 'Manage-area',
          title: 'Manage Area',
          type: 'item',
          url: '/dashboard/overview'
        },
        {
          id: 'state',
          title: 'State',
          type: 'item',
          url: '/dashboard/sales'
        },
        {
          id: 'city',
          title: 'City',
          type: 'item',
          url: '/dashboard/analytics'
        },
        
      ]
    }
  ]
};

export default location;
export {}; 

