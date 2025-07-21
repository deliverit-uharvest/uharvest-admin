const customer = {
  id: 'group-customer',
  title: '', // This is the group heading (optional)
  type: 'group',
  children: [
    {
      id: 'customer-collapse',
      title: 'Customer', // The visible text
      type: 'collapse',   // ⬅️ Make it collapsible
      children: [
        {
          id: 'customer-catalog',
          title: 'Customer Catalog',
          type: 'item',
          url: '/dashboard/overview'
        },
        {
          id: 'customer-onboard',
          title: 'Customer Onboard',
          type: 'item',
          url: '/dashboard/sales'
        },
        {
          id: 'customer-mgnt',
          title: 'Customer Management',
          type: 'item',
          url: '/dashboard/analytics'
        },
         {
          id: 'customer-type',
          title: 'Customer Type',
          type: 'item',
          url: '/dashboard/analytics'
        },
        
      ]
    }
  ]
};

export default customer;
export {}; 

