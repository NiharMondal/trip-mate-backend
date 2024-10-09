import { authRoutes } from "../app/modules/auth/auth.routes";
import { buddyRequestRoutes } from "../app/modules/buddy/buddy.routes";
import { destinationRoutes } from "../app/modules/destination/destination.routes";
import { tourRoutes } from "../app/modules/trip/trip.routes";
import { userRoutes } from "../app/modules/user/user.routes";

export const routesArray = [
	{ path: "/user", route: userRoutes },
	{ path: "/trip", route: tourRoutes },
	{ path: "/buddy-request", route: buddyRequestRoutes },
	{ path: "/auth", route: authRoutes },
	{ path: "/destination", route: destinationRoutes },
];