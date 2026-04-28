import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  route("about", "routes/About.tsx"),
  route("login", "routes/Login.tsx"),
  route("register", "routes/Register.tsx"),
  route("/", "layouts/AuthLayout.tsx", [
    route("Dashboard", "routes/Dashboard.tsx"),
    route("Profile", "routes/Profile.tsx"),
  ]),
] satisfies RouteConfig;
