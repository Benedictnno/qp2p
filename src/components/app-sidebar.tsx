import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import LogOut from "@/utils/LogOut"


// This is sample data.
const data = {
  navMain: [
    {
      title: "Control Panel",
      url: "#",
      items: [
        {
          title: "main",
          url: "/",
        },
        {
          title: "Transaction History",
          url: "transactions",
          isActive: true,
        },
        {
          title: "Profile Details",
          url: "profile",
        },
        {
          title: "Fund Account",
          url: "fund-wallet",
        },
        {
          title: "Styling",
          url: "#",
        },

        {
          title: "Testing",
          url: "#",
        },
        {
          title: "Authentication",
          url: "#",
        },
        {
          title: "Deploying",
          url: "#",
        },
        {
          title: "Upgrading",
          url: "#",
        },
        {
          title: "Examples",
          url: "#",
        },
      ],
    },
    {
      title: "Auth",
      url: "#",
      items: [
        {
          title: "Change Password",
          url: "#",
        },
        {
          title: "LogOut",
          url: "login",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const {user, success,error} = useSelector((state: RootState) => state.login);
 const sessionUser = sessionStorage.getItem("user");

   const user = sessionUser ? JSON.parse(sessionUser) : null;
   const firstName = user?.user?.firstName || "Guest";
   const lastName = user?.user?.lastName || "";

   
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Welcome </span>
                  <span className="">{firstName} {lastName}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          {item.title === "LogOut" ? (
                            <a href={item.url} onClick={()=>LogOut()}>
                              {item.title}
                            </a>
                          ) : (
                            <a href={item.url}>{item.title}</a>
                          )}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
