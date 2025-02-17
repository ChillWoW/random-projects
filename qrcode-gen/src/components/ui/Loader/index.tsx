"use client";

import React from "react";

interface LoaderProps {
  size?: number;
  color?: string;
  speed?: number;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 45,
  color = "currentColor",
  speed = 1.75,
  className,
}) => {
  const cubeSize = size * 0.2;
  const containerHeight = size * 0.6;

  return (
    <div
      className={`
        inline-flex items-center justify-center shrink-0
        ${className}
      `}
      style={{ height: containerHeight, width: size }}
    >
      <div
        className="flex items-end justify-between w-full"
        style={{ height: containerHeight, paddingBottom: "20%" }}
      >
        {[0, 0.36, 0.2].map((delay, index) => (
          <div
            key={index}
            className="shrink-0"
            style={{
              width: cubeSize,
              height: cubeSize,
              animation: `bounce ${speed}s ease-in-out infinite`,
              animationDelay: delay ? `-${delay * speed}s` : undefined,
            }}
          >
            <div
              className="w-full h-full rounded-[25%] origin-bottom"
              style={{
                backgroundColor: color,
                animation: `morph ${speed}s ease-in-out infinite`,
                animationDelay: delay ? `-${delay * speed}s` : undefined,
              }}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes bounce {
          0% {
            transform: translateY(0px);
          }
          28% {
            transform: translateY(0px);
            animation-timing-function: ease-out;
          }
          50% {
            transform: translateY(-200%);
            animation-timing-function: ease-in;
          }
          74% {
            transform: translateY(0px);
            animation-timing-function: ease-in;
          }
        }

        @keyframes morph {
          0% {
            transform: scaleY(1);
          }
          10% {
            transform: scaleY(1);
          }
          20%,
          25% {
            transform: scaleY(0.6) scaleX(1.3);
          }
          30% {
            transform: scaleY(1.15) scaleX(0.9);
          }
          40% {
            transform: scaleY(1);
          }
          72%,
          87%,
          100% {
            transform: scaleY(1);
          }
          77% {
            transform: scaleY(0.8) scaleX(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
