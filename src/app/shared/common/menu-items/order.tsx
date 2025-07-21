// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import dashboard_order_icon from "../../../../assets/images/users/productIcon.png";
import Breadcrumbs from '../@extended/Breadcrumbs';

// icons
const icons =  () => (
  <img
    src={dashboard_order_icon}
    alt="Products"
    style={{ width: 15, height: 15 }}
  />
);

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const order = {
  id: 'Order',
  title: '',
  type: 'group',
  children: [
    {
      id: 'order',
      title: 'Order',
      type: 'item',
      url: '/order',
      icon: icons,
      breadcrumbs:false,
    },
   
  ]
};

export default order;
