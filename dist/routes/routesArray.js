"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesArray = void 0;
const auth_routes_1 = require("../app/modules/auth/auth.routes");
const buddy_routes_1 = require("../app/modules/buddy/buddy.routes");
const destination_routes_1 = require("../app/modules/destination/destination.routes");
const meta_routes_1 = require("../app/modules/meta/meta.routes");
const profile_routes_1 = require("../app/modules/profile/profile.routes");
const review_routes_1 = require("../app/modules/review/review.routes");
const trip_routes_1 = require("../app/modules/trip/trip.routes");
const user_routes_1 = require("../app/modules/user/user.routes");
exports.routesArray = [
    { path: "/user", route: user_routes_1.userRoutes },
    { path: "/trip", route: trip_routes_1.tourRoutes },
    { path: "/buddy-request", route: buddy_routes_1.buddyRequestRoutes },
    { path: "/auth", route: auth_routes_1.authRoutes },
    { path: "/destination", route: destination_routes_1.destinationRoutes },
    { path: "/review", route: review_routes_1.reveiwRoutes },
    { path: "/meta-data", route: meta_routes_1.metaRoutes },
    { path: "/profile", route: profile_routes_1.profileRoutes },
];
