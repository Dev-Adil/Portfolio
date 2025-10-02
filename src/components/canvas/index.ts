import { lazy } from "react";

const EarthCanvas = lazy(() => import("./Earth"));
const BallCanvas = lazy(() => import("./Ball"));
const StarsCanvas = lazy(() => import("./Stars"));
const WaveBackground = lazy(() => import("./WaveBackground"));

export { EarthCanvas, BallCanvas, StarsCanvas, WaveBackground };
