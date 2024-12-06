import { authRoutes } from "../app/modules/auth/auth.routes";
import { buddyRequestRoutes } from "../app/modules/buddy/buddy.routes";
import { destinationRoutes } from "../app/modules/destination/destination.routes";
import { metaRoutes } from "../app/modules/meta/meta.routes";
import { reveiwRoutes } from "../app/modules/review/review.routes";
import { tourRoutes } from "../app/modules/trip/trip.routes";
import { userRoutes } from "../app/modules/user/user.routes";

export const routesArray = [
	{ path: "/user", route: userRoutes },
	{ path: "/trip", route: tourRoutes },
	{ path: "/buddy-request", route: buddyRequestRoutes },
	{ path: "/auth", route: authRoutes },
	{ path: "/destination", route: destinationRoutes },
	{ path: "/review", route: reveiwRoutes },
	{ path: "/meta", route: metaRoutes },
];
