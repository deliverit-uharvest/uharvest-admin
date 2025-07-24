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
          breadcrumbs:false,
        },
        {
          id: 'subcategory',
          title: 'Sub Category',
          type: 'item',
          url: 'subcategory/Subcatergory'
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
          url: '/catalog/manage-product',
          breadcrumbs:false,
        },
        {
          id: 'manage-stock',
          title: 'Manage Stock',
          type: 'item',
          url: '/dashboard/manage-stock'
        },
     
        
      ]
    }
  ]
};

export default catalog;
export {}; 

