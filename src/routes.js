import {
  Dashboard,
  Login,
  Product,
  Customer,
  Users,
  Invoices,
  InvoiceCreate,
  InvoiceEdit,
  Profile
} from "./views/Index.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/invoices",
    name: "Invoices",
    icon: "fas fa-print text-primary",
    // component: ,
    layout: "/admin",
    // isHideSidebar:true,
    collapse: [
      {
        name: "Create Invoice",
        key: "create invoice",
        icon: "ni ni-tv-2 text-primary",
        path: "/create-invoice",
        component: InvoiceCreate,
        layout: "/admin",
      },
      {
        name: "Edit Invoice",
        key: "edit invoice",
        icon: "ni ni-tv-2 text-primary",
        path: "/edit-invoice/:id",
        component: InvoiceEdit,
        layout: "/admin",
        isHideSidebar: true
      },
      {
        name: "Manage Invoices",
        key: "manage invoices",
        icon: "ni ni-tv-2 text-primary",
        path: "/invoices",
        component: Invoices,
        layout: "/admin",
      }
    ],
  },
  {
    path: "/products",
    name: "Products",
    icon: "fab fa-product-hunt text-blue",
    component: Product,
    layout: "/admin",
  },
  {
    path: "/customers",
    name: "Customers ",
    icon: "fas fa-users text-primary",
    component: Customer,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "System Users",
    icon: "fas fa-user text-primary",
    component: Users,
    layout: "/admin",
    canAccess: ['admin']
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/profile",
    name: "Profile ",
    icon: "fas fa-users text-primary",
    component: Profile,
    layout: "/admin",
    isHideSidebar:true
  },
];
export default routes;
