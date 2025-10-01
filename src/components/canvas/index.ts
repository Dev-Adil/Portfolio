import { lazy } from "react";

const EarthCanvas = lazy(() => import("./Earth"));
const BallCanvas = lazy(() => import("./Ball"));
const StarsCanvas = lazy(() => import("./Stars"));

export { EarthCanvas, BallCanvas, StarsCanvas };
