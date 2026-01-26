import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("showroom", "routes/showroom.tsx"),
  route("catalogo", "routes/catalogo.tsx"),
] satisfies RouteConfig;
