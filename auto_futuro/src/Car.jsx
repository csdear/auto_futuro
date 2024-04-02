import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import carGLB from "../src/models/car.glb";

export function Car() {

    let mesh = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + carGLB
    ).scene;

    useEffect(() => {
        mesh.scale.set(0.0012, 0.0012, 0.0012 );
        mesh.children[0].position.set(-365, -18, -67);
    }, [mesh]);

    return (
        <primitive object={mesh} rotation-y={Math.PI} />
    );
}