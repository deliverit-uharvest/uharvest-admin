import Breadcrumbs from '../@extended/Breadcrumbs';
const customerOnboard = {
  id: 'customerOnboard',
  title: '', // This is the group heading (optional)
  type: 'group',
  Breadcrumbs:false,
  children: [
    {
      id: 'customer-collapse',
      title: 'Organisation', // The visible text
      type: 'collapse',   //Make it collapsible
      Breadcrumbs:false,
      children: [
        {
          id: 'customer',
          title: 'Outlet',
          type: 'item',
          url: '/dashboard/overview',
          Breadcrumbs:false,
        },
        {
          id: 'customers',
          title: 'Customer Onboard',
          type: 'item',
          url: 'customerOnboard/customers',
          breadcrumbs:false,
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

export default customerOnboard;
export {}; 

