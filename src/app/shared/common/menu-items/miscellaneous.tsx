const miscellaneos = {
  id: 'miscellaneos',
  title: '', // This is the group heading (optional)
  type: 'group',
  children: [
    {
      id: 'miscellaneos-collapse',
      title: 'Miscellaneos', // The visible text
      type: 'collapse',   // ⬅️ Make it collapsible
      children: [
        {
          id: 'delivery-boy',
          title: 'Manage Delivery Boy',
          type: 'item',
          url: '/dashboard/overview'
        },
        {
          id: 'manage-vehicles',
          title: 'Manage Vehicles',
          type: 'item',
          url: '/dashboard/sales'
        },
        {
          id: 'support-Ticket',
          title: 'Support Ticket',
          type: 'item',
          url: '/dashboard/analytics'
        },
        {
          id: 'change-password',
          title: 'Change Password',
          type: 'item',
          url: '/dashboard/performance'
        },
        {
          id: 'logs',
          title: 'Logs',
          type: 'item',
          url: '/dashboard/activity'
        },
        {
          id: 'my-notification',
          title: 'My Notification',
          type: 'item',
          url: '/dashboard/activity'
        },
        
      ]
    }
  ]
};

export default miscellaneos;
export {}; 

