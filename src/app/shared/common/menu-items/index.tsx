// project import
import dashboard from './dashboard';
// import pages from './page';
import utilities from './utilities';
import support from './support';
import system from './system'; // ✅ import
import promotions from './promotions';
import catalog from './catalog';
import manageorder from './manageorder';
import customer from './customer';
import location from './locations';
import userMgnt from './userMgnt';
import miscellaneos from './miscellaneous';
import configuration from './configuration';
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [system,dashboard,promotions,catalog,manageorder,customer,location,userMgnt,miscellaneos,configuration ] //support
};

export default menuItems;
