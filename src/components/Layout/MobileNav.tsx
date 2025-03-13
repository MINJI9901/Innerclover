import { useState } from "react";
import { usePathname } from "next/navigation";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";

const menuSteps = [
  { label: "Words of Today", subMenu: [], path: "/today" },
  { label: "Inspiration", subMenu: [], path: "/inspiration" },
  { label: "My Logs", subMenu: ["My Words", "Liked Words"], path: "/logs" },
  { label: "My Account", subMenu: [], path: "/account" },
];

export default function MobileNav() {
  const pathname = usePathname();

  const pathToValue: Record<string, number> = {
    "/today": 0,
    "/inspiration": 1,
    "/logs": 2,
    "/account": 3,
  };

  return (
    <Box
      display={{ xs: "block", sm: "none" }}
      position={"fixed"}
      bottom={0}
      width={"100%"}
      boxShadow={"0 0 1px gray"}
    >
      <BottomNavigation showLabels value={pathToValue[pathname] || 0}>
        {menuSteps.map((menu, index) => (
          <BottomNavigationAction
            key={menu.label}
            label={menu.label}
            href={menu.path}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}

{
  /* <BottomNavigation
  showLabels
  value={value}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
>
  {pages.map((page, idx) => (
    <BottomNavigationAction
      key={page.label}
      label={page.label}
      icon={page.icon}
      href={page.link}
    />
  ))}
</BottomNavigation>; */
}
