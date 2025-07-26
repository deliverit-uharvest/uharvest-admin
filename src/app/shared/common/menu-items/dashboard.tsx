const overview = {
  id: 'group-dashboard',
  title: '', // This is the group heading (optional)
  type: 'group',
  children: [
    {
      id: 'dashboard-collapse',
      title: 'Dashboard', // The visible text
      type: 'collapse',   // ⬅Make it collapsible
      children: [
        {
          id: 'overview',
          title: 'Overview',
          type: 'item',
          url: 'overview'
          
        },
        
      ]
    }
  ]
};

export default overview;
