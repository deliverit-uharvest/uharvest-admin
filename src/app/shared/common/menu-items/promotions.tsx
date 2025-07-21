const promotions = {
  id: 'group-promotions',
  title: '', // This is the group heading (optional)
  type: 'group',
  children: [
    {
      id: 'promotions-collapse',
      title: 'Promotions', // The visible text
      type: 'collapse',   // ⬅️ Make it collapsible
      children: [
        {
          id: 'banner',
          title: 'Banner',
          type: 'item',
          url: '/dashboard/overview'
        },
        {
          id: 'sub-banner',
          title: 'Sub Banner',
          type: 'item',
          url: '/dashboard/sales'
        },
        {
          id: 'coupons',
          title: 'Coupons',
          type: 'item',
          url: '/dashboard/analytics'
        },
        {
          id: 'cart-discound',
          title: 'Cart Discount',
          type: 'item',
          url: '/dashboard/performance'
        },
        {
          id: 'manage-cms',
          title: 'Manage CMS',
          type: 'item',
          url: '/dashboard/activity'
        },
        {
          id: 'notifications',
          title: 'Notifications',
          type: 'item',
          url: '/dashboard/activity'
        },
        {
          id: 'testimonial',
          title: 'Testimonial',
          type: 'item',
          url: '/dashboard/activity'
        },
        {
          id: 'cashback',
          title: 'Cashback',
          type: 'item',
          url: '/dashboard/activity'
        }
      ]
    }
  ]
};

export default promotions;
export {}; 

