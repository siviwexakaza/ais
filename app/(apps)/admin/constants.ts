import {
  Car,
  Cog,
  CogIcon,
  File,
  FileClock,
  Home,
  List,
  MapPin,
  Network,
  SearchCheck,
  Settings,
  ShoppingBasket,
  ShoppingCart,
  Store,
  User2Icon,
  Users,
  UserSearch,
} from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS = [
  {
    name: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    name: "Quotations",
    url: "",
    icon: FileClock,
    isActive: false,
    items: [
      {
        name: "Create",
        url: "/admin/quotations/create",
      },
      {
        name: "Estimators",
        url: "/admin/quotations/estimators",
      },
      {
        name: "List",
        url: "/admin/quotations/list",
      },
    ],
  },
  {
    name: "Invoices",
    url: "/admin/invoices",
    icon: File,
  },
  {
    name: "Employees",
    url: "/admin/employees",
    icon: Users,
  },
  {
    name: "Customers",
    url: "/admin/customers",
    icon: ShoppingCart,
  },
  {
    name: "Branches",
    url: "/admin/branches",
    icon: MapPin,
  },
  {
    name: "Inventory",
    url: "/admin/inventory",
    icon: ShoppingBasket,
  },
  {
    name: "Roles & Permissions",
    url: "",
    icon: Network,
    isActive: false,
    items: [
      {
        name: "Roles",
        url: "/admin/roles",
      },
      {
        name: "Permissions",
        url: "/admin/permissions",
      },
    ],
  },
  {
    name: "Suppliers",
    url: "/admin/suppliers",
    icon: UserSearch,
  },
  {
    name: "Insurance Providers",
    url: "/admin/insurance-providers",
    icon: Store,
  },
  {
    name: "Assessors",
    url: "/admin/assessors",
    icon: SearchCheck,
  },
  {
    name: "Vehicles",
    url: "/admin/vehicles",
    icon: Car,
  },
];
