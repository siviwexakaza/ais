import {
  Building2,
  Car,
  ChartPie,
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
  Wallet,
  Wrench,
} from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS = [
  {
    name: "Analytics",
    url: "",
    icon: ChartPie,
    isActive: false,
    items: [
      {
        name: "Dashboard",
        url: "/admin/dashboard",
      },
      {
        name: "Reports",
        url: "/admin/reports",
      },
    ],
  },
  {
    name: "Finance",
    url: "",
    icon: Wallet,
    isActive: false,
    items: [
      {
        name: "Quotes",
        url: "/admin/quotations/create",
      },
      {
        name: "Invoices",
        url: "/admin/invoices",
        icon: File,
      },
      {
        name: "Awaiting Payment",
        url: "/admin/pending-payments",
        icon: File,
      },
      {
        name: "Statements",
        url: "/admin/statements",
        icon: File,
      },
    ],
  },

  {
    name: "Clients",
    url: "",
    icon: Users,
    isActive: false,
    items: [
      {
        name: "Customers",
        url: "/admin/customers",
        icon: ShoppingCart,
      },
      {
        name: "Awaiting Quotations",
        url: "/admin/customers",
        icon: ShoppingCart,
      },
    ],
  },

  {
    name: "Workshop",
    url: "",
    icon: Wrench,
    isActive: false,
    items: [
      {
        name: "Awaiting Auth",
        url: "/admin/customers",
        icon: ShoppingCart,
      },
      {
        name: "In Progress",
        url: "/admin/customers",
        icon: ShoppingCart,
      },
      {
        name: "Complete",
        url: "/admin/customers",
        icon: ShoppingCart,
      },
      {
        name: "Projects",
        url: "/admin/customers",
        icon: ShoppingCart,
      },
      {
        name: "Facilities",
        url: "/admin/customers",
        icon: ShoppingCart,
      },
      {
        name: "Workshop Reports",
        url: "/admin/customers",
        icon: ShoppingCart,
      },
    ],
  },
  {
    name: "Inventory",
    url: "",
    icon: ShoppingCart,
    isActive: false,
    items: [
      {
        name: "Parts",
        url: "/admin/inventory",
        icon: ShoppingBasket,
      },
      {
        name: "Paint",
        url: "/admin/inventory",
        icon: ShoppingBasket,
      },
    ],
  },

  {
    name: "System Roles",
    url: "",
    icon: Building2,
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
      {
        name: "Employees",
        url: "/admin/employees",
        icon: Users,
      },
      {
        name: "Branches",
        url: "/admin/branches",
        icon: MapPin,
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
    ],
  },
];
