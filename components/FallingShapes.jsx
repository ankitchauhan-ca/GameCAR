import { RigidBody } from "@react-three/rapier";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const shapes = ["cube", "sphere", "pyramid"];

const FallingShapes = () => {
  const [fallingShapes, setFallingShapes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      const size = Math.random() * 1 + 0.5;
      const mass = Math.random() * 5 + 1;
      const xPos = (Math.random() - 0.5) * 20;
      setFallingShapes((prev) => [
        ...prev,
        {
          id: uuidv4(),
          type: shapeType,
          size,
          mass,
          position: [xPos, 10, 0],
        },
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <>
        {fallingShapes.map((shape) => (
          <RigidBody
            key={shape.id}
            colliders="hull"
            position={shape.position}
            mass={shape.mass}
            onCollisionEnter={(event) => {
              // Handle collision with vehicle
              // You can add logic to detect if the vehicle was hit
              setGameOver(true);
            }}
            onSleep={() => {
              // Remove the shape when it's no longer active
              setFallingShapes((prev) => prev.filter((s) => s.id !== shape.id));
            }}
          >
            {shape.type === "cube" && (
              <mesh>
                <boxGeometry args={[shape.size, shape.size, shape.size]} />
                <meshStandardMaterial color="red" />
              </mesh>
            )}
            {shape.type === "sphere" && (
              <mesh>
                <sphereGeometry args={[shape.size / 2, 32, 32]} />
                <meshStandardMaterial color="yellow" />
              </mesh>
            )}
            {shape.type === "pyramid" && (
              <mesh>
                <coneGeometry args={[shape.size / 2, shape.size, 4]} />
                <meshStandardMaterial color="purple" />
              </mesh>
            )}
          </RigidBody>
        ))}
      </>
    </div>
  );
};

export default FallingShapes;
