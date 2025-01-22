import express, { Router } from "express";
import userRoutes from "./userRoutes";

// Define the structure for a route configuration
interface RouteConfig {
    path: string;
    routes: Router;
}

const allRoutes: Router = express.Router();

const defaultRoutes: RouteConfig[] = [
    {
        path: "/",
        routes: userRoutes
    },
];

defaultRoutes.forEach((route) => {
    allRoutes.use(route.path, route.routes);
});

export default allRoutes;