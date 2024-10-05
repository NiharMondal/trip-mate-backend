import { tourRoutes } from "../app/modules/trip/trip.routes";
import { userRoutes } from "../app/modules/user/user.routes";

export const routesArray = [
    {path: "/users", route: userRoutes},
    {path: "/trips", route: tourRoutes},
]