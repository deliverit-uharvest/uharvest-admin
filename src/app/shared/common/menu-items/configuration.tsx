import Breadcrumbs from "../@extended/Breadcrumbs";

const configuration = {
  id: 'config',
  title: '', // This is the group heading (optional)
  type: 'group',
  children: [
    {
      id: 'configuration-collapse',
      title: 'Configuration', // The visible text
      type: 'collapse',   // ⬅️ Make it collapsible
      children: [
        {
          id: 'shipping-charge',
          title: '',
          type: 'item',
          url: '/dashboard/overview',
          Breadcrumbs:false
        },
        {
          id: 'small-cart',
          title: 'Small Cart Charge',
          type: 'item',
          url: '/dashboard/sales'
        },
        {
          id: 'quick-delivery-config',
          title: 'Quick Delivery Configuration',
          type: 'item',
          url: '/dashboard/analytics'
        },
        {
          id: 'gst-warehourse',
          title: 'Gst & Warehouse',
          type: 'item',
          url: '/dashboard/performance'
        },
        {
          id: 'warehouse',
          title: 'Warehouse',
          type: 'item',
          url: '/dashboard/activity'
        },
        {
          id: 'warehouse-manager',
          title: 'Manage Stock',
          type: 'item',
          url: '/dashboard/activity'
        },
        {
          id: 'manager-version',
          title: 'Manager Version',
          type: 'item',
          url: '/dashboard/activity'
        },
        {
          id: 'warehouse-zone',
          title: 'Warehouse Zone',
          type: 'item',
          url: '/dashboard/activity'
        },
        
      ]
    }
  ]
};

export default configuration;
export {}; 

