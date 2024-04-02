import {
    Environment,
    OrbitControls,
    PerspectiveCamera,
} from "@react-three/drei";

// import envMapHdr from "../src/assets/textures/envmap.hdr"
import envMapHdr from "../src/textures/envmap.hdr"

import { Suspense } from "react";
import { Track } from "./Track";
import { Ground } from "./Ground";
import { Car } from "./Car";

export function Scene() {
    return (
        <Suspense fallback={null}>
            <Environment
                files={process.env.PUBLIC_URL + envMapHdr}
                background={["both"]}
                />

                <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} />
                <OrbitControls target={[-2.64, -0.71, 0.03]} />

                <Track />
                <Ground />
                <Car />
        </Suspense>
    )
}