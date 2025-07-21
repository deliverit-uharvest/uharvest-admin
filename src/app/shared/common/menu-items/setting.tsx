// assets

import dashboard_setting_icon from "../../../../assets/images/users/settingIcon.png";
import Breadcrumbs from "../@extended/Breadcrumbs";


// icons
const icons = ()=>(

   <img
    src={dashboard_setting_icon}
    alt="Products"
    style={{ width: 15, height: 15 }}
  />

)

// ==============================|| MENU ITEMS - SETTING ||============================== //

const setting = {
  id: 'setting',
  title: '',
  type: 'group',
  children: [
    {
      id: 'setting',
      title: 'Setting',
      type: 'item',
      url: '/setting',
      icon: icons,
      breadcrumbs:false,
    }
  ]
};

export default setting;

// Force TypeScript to treat as module
export {};
