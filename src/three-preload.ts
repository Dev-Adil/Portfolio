import { useGLTF } from "@react-three/drei";

export function preloadEarth() {
  try {
    // Preload Earth GLTF in the background
    useGLTF.preload("./earth/scene.gltf");
  } catch {}
}


