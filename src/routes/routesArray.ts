import { authRoutes } from "../app/modules/auth/auth.routes";
import { buddyRoutes } from "../app/modules/buddy/buddy.routes";
import { tourRoutes } from "../app/modules/trip/trip.routes";
import { userRoutes } from "../app/modules/user/user.routes";

export const routesArray = [
    {path: "/user", route: userRoutes},
    {path: "/trip", route: tourRoutes},
    {path: "/buddy", route: buddyRoutes},
    {path: "/auth", route: authRoutes},
    
]