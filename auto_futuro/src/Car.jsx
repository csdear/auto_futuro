import { useBox } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import carGLB from "../src/models/car.glb";

export function Car() {

    let mesh = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + carGLB
    ).scene;

    const position = [-1.5, 0.5, 3];
    const width = 0.15;
    const height = 0.07;
    const front = 0.15;
    const wheelRadius = 0.05;

    const chassisBodyArgs = [width, height, front * 2];
    const [chassisBody, chassisApi] = useBox(
    () => ({
        allowSleep: false,
        args: chassisBodyArgs,
        mass: 150,
        position,
    }),
    useRef(null),
    );

    // const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);
    // const [vehicle, vehicleApi] = useRaycastVehicle(
    //     () => ({
    //         chassisBody,
    //         wheelInfos,
    //         wheels,
    //     }),
    //     useRef(null),
    //     );


    useEffect(() => {
        mesh.scale.set(0.0012, 0.0012, 0.0012 );
        mesh.children[0].position.set(-365, -18, -67);
    }, [mesh]);

    return (
        // <primitive object={mesh} rotation-y={Math.PI} />
        <mesh ref={chassisBody}>
            <meshBasicMaterial transparent={true} opacity={0.3} />
            <boxGeometry args={chassisBodyArgs} />
        </mesh>
    );
}