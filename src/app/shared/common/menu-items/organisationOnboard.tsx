import Breadcrumbs from '../@extended/Breadcrumbs';
const organisationOnboard = {
  id: 'organisationOnboard',
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
          id: 'organisation',
          title: 'Organisation',
          type: 'item',
          url: '/organisation',
          Breadcrumbs:false,
        },
        {
          id: 'customers',
          title: 'Outlet',
          type: 'item',
          url: '/organisation/outlet',
          breadcrumbs:false,
        },
        {
          id: 'customer-mgnt',
          title: 'User',
          type: 'item',
          url: '/dashboard/analytics'
        },
        //  {
        //   id: 'customer-type',
        //   title: 'Customer Type',
        //   type: 'item',
        //   url: '/dashboard/analytics'
        // },
        
      ]
    }
  ]
};

export default organisationOnboard;
export {}; 

