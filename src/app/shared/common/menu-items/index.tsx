// project import
import dashboard from './dashboard';
// import pages from './page';
import utilities from './utilities';
import support from './support';
import system from './system'; // ✅ import
import promotions from './promotions';
import catalog from './catalog';
import manageorder from './manageorder';
import location from './locations';
import userMgnt from './userMgnt';
import miscellaneos from './miscellaneous';
import configuration from './configuration';
import organisationOnboard from './organisationOnboard';
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [system,dashboard,catalog,manageorder,organisationOnboard,location,userMgnt,miscellaneos,configuration ] //support
};

export default menuItems;
