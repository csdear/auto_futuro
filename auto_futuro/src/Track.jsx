import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export function Track() {
    // useLoader: custom hook automatically suspends component until all the assets have been downloaded. 
    // p1 appears to be a three.js GLTF or .glb 3d file loader.  p2 path to the asset.
    const result = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "/models/track.glb");
    
        // another useLoader custom hook. p1 textureloader. p2 a .png 
    const colorMap = useLoader(TextureLoader, process.env.PUBLIC_URL + "/textures/track.png");
    
    // anisotropy property set to 16. anisotrophy helps the filtering of the texture when we are
    // looking at it from grazing angles. This model was made in blender, the texture was made in
    // such a way that would benefit fro mthe anisotrophy property at 16. ~ a way of improving the
    // quality of the texture when we are looking at it at grazing angles. 
    useEffect(() => {
        colorMap.anisotropy = 16;
    }, [colorMap]);

    /*Every Mesh in 3.js needs a geometry and a material.
    // here we take the geometry that is inside the mesh that 
    // was downloaded with the useLoader hook
    // normally in react three fiber you create a mesh, and you 
    // give it geometry as a child and a material
          <mesh>
            <boxGeometry /> // A GEOMETRY
            <meshStandardMaterial /> // A MATERIAL 
          </mesh>
    See docs.pmnd.rs/react-three-fiber/getting-started/your-first-scene
    Our geometry though was made someone else. in this case with the model
    above that was downloaded with useLoader so we have to use a different
    construct, to inject the geometry inside our mesh component. See the <primitive />
    construct. 
    So, the geometry it seems is either a standard geometry, like <boxGeometry /> above
    OR, done like this via a loader, and taking the geometry from that loader. 
    primitive consruct takes an already existing geometry object -- the one we made
    from the loader/track.glb/let geometry.. -- AND assing it as a property of the 
    mesh.  
                */
    let geometry = result.scene.children[0].geometry;

    return (
        <mesh>
            <primitive object={geometry} attach={"geometry"} />
            <meshBasicMaterial
                toneMapped={false}
                map={colorMap}
                />
        </mesh>
    )
};