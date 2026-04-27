import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  route("abouto", "routes/About.tsx"),
  route("logino", "routes/Login.tsx"),
  route("registero", "routes/Register.tsx"),
  route("/", "layouts/AuthLayout.tsx", [
    route("dashboardo", "routes/Dashboard.tsx"),
    route("profileo", "routes/Profile.tsx"),
  ]),
] satisfies RouteConfig;
