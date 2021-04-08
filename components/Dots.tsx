import { useColorModeValue } from "@chakra-ui/react";
import React from "react";

export default function Dots() {
  return (
    <>
      <svg width="344" height="284" fill="none" viewBox="0 0 344 284">
        <defs>
          <pattern
            id="svg-square-pattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              fill={useColorModeValue(
                "rgba(0, 0, 0, 0.1)",
                "rgba(255, 255, 255, 0.1)"
              )}
            ></rect>
          </pattern>
        </defs>{" "}
        <rect width="344" height="284" fill="url(#svg-square-pattern)"></rect>
      </svg>
    </>
  );
}
