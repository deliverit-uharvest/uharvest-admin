const manageorder = {
  id: 'group-manageorder',
  title: '', // This is the group heading (optional)
  type: 'group',
  children: [
    {
      id: 'order-management-collapse',
      title: 'Order Management', // The visible text
      type: 'collapse',   // ⬅️ Make it collapsible
      children: [
        {
          id: 'order-mgnt',
          title: 'Manage Orders',
          type: 'item',
          url: 'group-manageorder/'
        },
        {
          id: 'sales-return',
          title: 'Sales Return',
          type: 'item',
          url: '/dashboard/sales'
        },
        {
          id: 'pod-mgnt',
          title: 'POD Management',
          type: 'item',
          url: '/dashboard/analytics'
        },
        
      ]
    }
  ]
};

export default manageorder;
export {}; 

