const userMgnt = {
  id: 'user-management',
  title: '', // This is the group heading (optional)
  type: 'group',
  children: [
    {
      id: 'userMgnt-collapse',
      title: 'User Management', // The visible text
      type: 'collapse',   // ⬅️ Make it collapsible
      children: [
        {
          id: 'menu',
          title: 'Menu',
          type: 'item',
          url: '/dashboard/overview'
        },
        {
          id: 'user-creation',
          title: 'User Creation',
          type: 'item',
          url: '/dashboard/sales'
        },
        {
          id: 'role',
          title: 'Role',
          type: 'item',
          url: '/dashboard/analytics'
        },
         {
          id: 'role-mapping',
          title: 'Role Menu Mapping',
          type: 'item',
          url: '/dashboard/analytics'
        },

         {
          id: 'action',
          title: 'Action',
          type: 'item',
          url: '/dashboard/analytics'
        },
        
      ]
    }
  ]
};

export default userMgnt;
export {}; 

