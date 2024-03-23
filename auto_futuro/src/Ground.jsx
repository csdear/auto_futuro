import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BufferAttribute } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import grid from "../src/textures/grid.png";
import groundAO from "../src/textures/ground-ao.png";
import alpha from "../src/textures/alpha-map.png";

export function Ground() {
    const gridMap = useLoader(
        TextureLoader,
        process.env.PUBLIC_URL + grid
    );

    const aoMap = useLoader(
        TextureLoader,
        process.env.PUBLIC_URL + groundAO
    );

    const alphaMap = useLoader(
        TextureLoader,
        process.env.PUBLIC_URL + alpha
    );

    useEffect(() => {
        gridMap.anisotropy = 16;
    }, [gridMap]);

    const meshRef = useRef(null);
    useEffect(() => {
        var uvs = meshRef.current.geometry.attributes.uv.array;
        meshRef.current.geometry.setAttribute("uv2", new BufferAttribute(uvs, 2));
    }, [meshRef.current]);

    return (
        <>
        <mesh
            ref={meshRef}
            position={[-2.285, -0.015, -1.325]}
            rotation-x={-Math.PI * 0.5}
            rotation-z={-0.079}
        >
        <circleGeometry args={[6.12, 50]} />

        <MeshReflectorMaterial />

        </mesh>

        </>
    );
}