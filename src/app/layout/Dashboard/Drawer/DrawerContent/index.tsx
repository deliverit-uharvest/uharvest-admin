// project imports
import NavCard from "./NavCard";
import Navigation from "./Navigation";
import SimpleBar from "../../../../shared/common/third-party/SimpleBar";
import { useGetMenuMaster } from "../../../../api/menu";

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;

  return (
    <SimpleBar
      sx={{
        backgroundColor: "#051f20", //  sidebar background color #051f20
        height: "100vh", // ensures it fills full height
        "& .simplebar-content": {
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Navigation />
      {drawerOpen && <NavCard />}
      {/* <h1>hello</h1> */}
    </SimpleBar>
  );
}
