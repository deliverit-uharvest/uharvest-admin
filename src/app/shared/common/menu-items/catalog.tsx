import Breadcrumbs from '../@extended/Breadcrumbs';
const catalog = {
  id: 'catalog',
  title: '', // This is the group heading (optional)
  type: 'group',
  breadcrumbs:false,
  children: [
    {
      id: 'catalog-collapse',
      title: 'Catalog', // The visible text
      type: 'collapse',   // Make it collapsible
      breadcrumbs:false,
      children: [
        {
          id: 'category',
          title: 'Category',
          type: 'item',
          url: '/catalog/category',
          Breadcrumbs:false,
        },
        {
          id: 'subcategory',
          title: 'Sub Category',
          type: 'item',
          url: 'catalog/subcategory'
        },
        // {
        //   id: 'child-category',
        //   title: 'Child Category',
        //   type: 'item',
        //   url: '/dashboard/analytics'
        // },
        // {
        //   id: 'brands',
        //   title: 'Brands',
        //   type: 'item',
        //   url: '/dashboard/performance'
        // },
        {
          id: 'manageproduct',
          title: 'Manage Product',
          type: 'item',
          url: '/catalog/product',
          breadcrumbs:false,
        },
        {
          id: 'productcustomchange',
          title: 'Product by Organisation',
          type: 'item',
          url: '/catalog/product/custom',
          breadcrumbs:false,
        },
        {
          id: 'managestock',
          title: 'Manage Stock',
          type: 'item',
          url: '/catalog/stock-management'
        },
        // {
        //   id: 'req-product',
        //   title: 'Request New Product',
        //   type: 'item',
        //   url: '/dashboard/activity'
        // },
        
      ]
    }
  ]
};

export default catalog;
export {}; 

