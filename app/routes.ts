import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"), // La ruta principal "/"
  route("about", "routes/about.tsx"), // La ruta "/about"
] satisfies RouteConfig;