import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  route("About", "routes/About.tsx"),
  route("Login", "routes/Login.tsx"),
  route("Register", "routes/Register.tsx")
] satisfies RouteConfig;