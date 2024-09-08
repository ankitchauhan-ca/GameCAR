"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import Vehicle from "@components/Vehicle";
import FallingShapes from "@components/FallingShapes";
import { useState } from "react";
import Score from "@components/Score";
import Leaderboard from "@components/Leaderboard";

const HomePage = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [webGLError, setWebGLError] = useState(false);

  return (
    <div className="w-screen h-screen bg-gray-800">
      {!webGLError ? (
        !gameOver ? (
          <Canvas
            camera={{ position: [0, 5, 10], fov: 60 }}
            onCreated={({ gl }) => {
              if (!gl) {
                setWebGLError(true); // Handle WebGL initialization error
              }
            }}
            onContextLost={(e) => {
              setWebGLError(true); // Handle context loss
            }}
          >
            <Sky />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Physics>
              <Vehicle setGameOver={setGameOver} />
              <FallingShapes setGameOver={setGameOver} />
              {/* Ground */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="green" />
              </mesh>
            </Physics>
            <OrbitControls />
          </Canvas>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white">
            <h1 className="text-4xl mb-4">Game Over</h1>
            <p className="text-2xl">Your Score: {score}</p>
            <Score score={score} />
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-4xl mb-4">WebGL Error</h1>
          <p className="text-2xl">
            It seems like WebGL is not supported on your device.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
