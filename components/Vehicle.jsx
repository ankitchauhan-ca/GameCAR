import { RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Vehicle = () => {
  const vehicleRef = useRef();
  const { rapier, world } = useRapier();
  const keys = useRef({});
  useEffect(() => {
    const handleKeyDown = (e) => {
      keys.current[e.key.toLowerCase()] = true;
    };
    const handleKeyUp = (e) => {
      keys.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!vehicleRef.current) return;
    const body = vehicleRef.current;
    const velocity = body.linvel();

    if (keys.current["w"]) {
      body.applyImpulse({ x: 0, y: 0, z: -10 }, true);
    }
    if (keys.current["s"]) {
      body.applyImpulse({ x: 0, y: 0, z: 10 }, true);
    }
  });

  return (
    <div>
      <RigidBody
        ref={vehicleRef}
        colliders="cuboid"
        mass={5}
        onCollisionEnter={(event) => {
          // Handle collision logic here
          setGameOver(true);
        }}
      >
        {/* Body */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[2, 1, 4]} />
          <meshStandardMaterial color="blue" />
        </mesh>
        {/* Front Wheel (Sphere) */}
        <RigidBody type="fixed" position={[0, 0, -2.5]}>
          <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="black" />
          </mesh>
        </RigidBody>
        {/* Back Wheels (Cylinders) */}
        <RigidBody type="fixed" position={[-1, 0, 2.5]}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
            <meshStandardMaterial color="black" />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed" position={[1, 0, 2.5]}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
            <meshStandardMaterial color="black" />
          </mesh>
        </RigidBody>
      </RigidBody>
    </div>
  );
};

export default Vehicle;
