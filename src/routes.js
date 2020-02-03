/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import Categories from "views/Categories.jsx";
import Dishes from "views/Dishes.jsx";
import Reviews from "views/Reviews.jsx";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "nc-icon nc-layout-11",
    component: Categories,
    layout: "/admin"
  },
  {
    path: "/dishes",
    name: "Dishes",
    icon: "nc-icon nc-paper",
    component: Dishes,
    layout: "/admin"
  },
  {
    path: "/reviews",
    name: "Reviews",
    icon: "nc-icon nc-chat-33",
    component: Reviews,
    layout: "/admin"
  },
];
export default routes;
