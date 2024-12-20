"use client";

import React from "react";
import { motion } from "framer-motion";

const AnimatedHeroIllustration = () => {
  return (
    <motion.svg
      width="487"
      height="466"
      viewBox="0 0 487 466"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="initial"
      animate="animate"
    >
      <motion.path
        d="M340.677 77.5032L319.397 84.5V53.8622H338.705L340.677 77.5032Z"
        fill="#EFA4A7"
        variants={{
          initial: { y: 0 },
          animate: {
            y: [-5, 5, -5],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M322.035 62.3413C310.325 62.3413 300.831 52.8479 300.831 41.1372C300.831 29.4265 310.325 19.9332 322.035 19.9332C333.746 19.9332 343.239 29.4265 343.239 41.1372C343.239 52.8479 333.746 62.3413 322.035 62.3413Z"
        fill="#EFA4A7"
        variants={{
          initial: { scale: 1 },
          animate: {
            scale: [1, 1.05, 1],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M327.851 39.0394C324.296 38.9264 321.973 35.3463 320.591 32.0677C319.209 28.7891 317.79 25.0332 314.498 23.6765C311.81 22.5711 307.062 30.0453 304.926 28.048C302.716 25.9753 304.876 15.323 307.225 13.4011C309.574 11.4792 312.79 11.1149 315.817 10.9767C323.204 10.6376 330.64 11.228 337.888 12.7479C342.373 13.6775 346.983 15.0844 350.211 18.3253C354.306 22.4329 355.349 28.6384 355.65 34.4293C355.952 40.3584 355.613 46.5639 352.723 51.7518C349.834 56.9398 343.805 60.7711 338.026 59.4396C337.448 56.2992 338.026 53.0708 338.265 49.8801C338.491 46.6895 338.265 43.2476 336.305 40.6976C334.346 38.1476 330.2 37.1552 327.927 39.4037"
        fill="#36344E"
        variants={{
          initial: { pathLength: 0 },
          animate: {
            pathLength: [0, 1, 0],
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M353.942 46.388C356.065 44.8303 358.602 43.5365 361.215 43.8505C364.042 44.1897 366.416 46.5136 367.144 49.2646C367.873 52.0156 367.056 55.0429 365.31 57.2915C363.564 59.54 360.977 61.0223 358.226 61.7634C356.643 62.1905 354.897 62.3664 353.389 61.7257C351.153 60.7711 349.96 57.9196 350.827 55.6459"
        fill="#36344E"
        variants={{
          initial: { rotate: 0 },
          animate: {
            rotate: [0, 5, -5, 0],
            transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M313.719 418.376H333.655V446.652H313.719V418.376Z"
        fill="#EFA4A7"
        variants={{
          initial: { scaleY: 1 },
          animate: {
            scaleY: [1, 0.95, 1.05, 1],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M294.299 463.774C292.201 463.774 290.342 463.724 288.935 463.598C283.634 463.108 278.585 459.201 276.047 456.915C274.904 455.885 274.54 454.252 275.13 452.845C275.557 451.828 276.411 451.074 277.467 450.773L291.46 446.778L314.121 431.49L314.373 431.943C314.473 432.106 316.697 436.113 317.438 438.826C317.727 439.857 317.651 440.711 317.212 441.376C316.91 441.841 316.496 442.105 316.156 442.256C316.571 442.683 317.852 443.55 321.809 444.19C327.588 445.107 328.806 439.115 328.856 438.864L328.894 438.663L329.07 438.55C331.821 436.779 333.517 435.975 334.094 436.151C334.459 436.264 335.074 436.44 336.707 452.757C336.871 453.272 338.026 457.028 337.235 460.608C336.381 464.515 319.322 463.171 315.918 462.857C315.817 462.857 303.042 463.774 294.299 463.774Z"
        fill="#36344E"
        variants={{
          initial: { x: 0 },
          animate: {
            x: [-2, 2, -2],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M390.409 396.15L405.373 420.142L388.457 430.692L373.494 406.699L390.409 396.15Z"
        fill="#EFA4A7"
        variants={{
          initial: { rotate: 0 },
          animate: {
            rotate: [-5, 5, -5],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M367.948 459.892C365.612 459.892 363.464 459.616 361.931 459.34C360.424 459.076 359.243 457.882 359.004 456.363C358.828 455.282 359.155 454.189 359.883 453.373L369.644 442.582L380.773 417.622L381.226 417.874C381.402 417.962 385.409 420.185 387.469 422.094C388.26 422.823 388.65 423.589 388.637 424.381C388.637 424.933 388.424 425.373 388.21 425.687C388.788 425.838 390.333 425.888 394.026 424.33C399.415 422.057 397.279 416.329 397.179 416.09L397.104 415.901L397.192 415.713C398.586 412.749 399.591 411.178 400.181 411.015C400.546 410.915 401.161 410.751 411.185 423.715C411.6 424.054 414.564 426.642 415.795 430.096C417.14 433.865 401.952 441.741 398.9 443.286C398.812 443.361 382.909 454.918 376.389 458.197C373.802 459.503 370.737 459.905 367.948 459.905L367.948 459.892Z"
        fill="#36344E"
        variants={{
          initial: { y: 0 },
          animate: {
            y: [-3, 3, -3],
            transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M348.327 181.878H292.515L287.453 233.795L309.612 425.624H338.102L326.708 314.83L372.923 414.859L398.247 397.134L362.157 303.751C362.157 303.751 375.045 222.402 364.921 202.14C354.796 181.878 348.327 181.878 348.327 181.878Z"
        fill="#36344E"
        variants={{
          initial: { scale: 1 },
          animate: {
            scale: [1, 1.02, 0.98, 1],
            transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M376.088 185.043H287.453L314.046 70.4435H352.66L376.088 185.043Z"
        fill="url(#paint0_linear_214_3565)"
        variants={{
          initial: { y: 0 },
          animate: {
            y: [-2, 2, -2],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M265.445 68.195C264.026 61.2233 266.626 54.8545 271.224 53.9752C275.834 53.0959 280.708 58.0326 282.127 65.0043C282.73 67.7805 282.642 70.657 281.851 73.4081L287.453 103.016L272.97 105.302L268.988 75.8702C267.191 73.6216 265.973 70.9962 265.445 68.195Z"
        fill="#EFA4A7"
        variants={{
          initial: { rotate: 0 },
          animate: {
            rotate: [-2, 2, -2],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M351.719 70.4436H317.664L294.701 116.356L286.046 81.95L267.015 83.9724C267.015 83.9724 271.512 151.202 291.197 148.929C310.881 146.655 356.768 86.0828 351.719 70.4436Z"
        fill="url(#paint1_linear_214_3565)"
        variants={{
          initial: { scale: 1 },
          animate: {
            scale: [1, 1.03, 0.97, 1],
            transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M389.755 245.076C391.175 252.047 388.574 258.416 383.977 259.295C379.367 260.175 374.493 255.238 373.073 248.266C372.47 245.49 372.558 242.613 373.35 239.862L367.747 210.255L382.231 207.968L386.213 237.4C388.009 239.649 389.228 242.274 389.755 245.076Z"
        fill="#EFA4A7"
        variants={{
          initial: { rotate: 0 },
          animate: {
            rotate: [2, -2, 2],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M332.311 70.4435C332.311 70.4435 351.668 69.627 352.673 70.4435C357.949 74.7647 388.939 230.404 388.939 230.404H369.317L332.323 70.4435H332.311Z"
        fill="url(#paint2_linear_214_3565)"
        variants={{
          initial: { y: 0 },
          animate: {
            y: [-3, 3, -3],
            transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M173.373 463.806C173.373 464.635 174.039 465.301 174.868 465.301H485.505C486.334 465.301 487 464.635 487 463.806C487 462.977 486.334 462.311 485.505 462.311H174.868C174.039 462.311 173.373 462.977 173.373 463.806Z"
        fill="#484565"
        variants={{
          initial: { pathLength: 0 },
          animate: {
            pathLength: [0, 1, 0],
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M5.99974 0H254.026C257.34 0 260.026 2.68629 260.026 6V68.1137C260.026 71.4274 257.34 74.1137 254.026 74.1137H5.99976C2.68604 74.1137 -0.000244141 71.4274 -0.000244141 68.1137V6C-0.000244141 2.68629 2.68604 0 5.99974 0Z"
        className="fill-orange-300 dark:fill-gray-400 stroke-transparent"
        fillOpacity="0.25"
        variants={{
          initial: { scale: 1 },
          animate: {
            scale: [1, 1.02, 0.98, 1],
            transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M241.787 15.7021H202.397"
        className={"dark:stroke-gray-300 stroke-gray-700"}
        strokeWidth="2"
        strokeMiterlimit="10"
        variants={{
          initial: { pathLength: 0 },
          animate: {
            pathLength: [0, 1, 0],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M241.787 37.0569H29.4953"
        className={"dark:stroke-gray-300 stroke-gray-700"}
        strokeWidth="2"
        strokeMiterlimit="10"
        variants={{
          initial: { pathLength: 0 },
          animate: {
            pathLength: [0, 1, 0],
            transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M241.787 54.4609H149.295"
        className={"dark:stroke-gray-300 stroke-gray-700"}
        strokeWidth="2"
        strokeMiterlimit="10"
        variants={{
          initial: { pathLength: 0 },
          animate: {
            pathLength: [0, 1, 0],
            transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M241.787 162.673H104.237"
        className={"dark:stroke-gray-300 stroke-gray-700"}
        strokeWidth="2"
        strokeMiterlimit="10"
        variants={{
          initial: { pathLength: 0 },
          animate: {
            pathLength: [0, 1, 0],
            transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M241.787 184.028H125.592"
        className={"dark:stroke-gray-300 stroke-gray-700"}
        strokeWidth="2"
        strokeMiterlimit="10"
        variants={{
          initial: { pathLength: 0 },
          animate: {
            pathLength: [0, 1, 0],
            transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M241.787 201.432H149.295"
        className={"dark:stroke-gray-300 stroke-gray-700"}
        strokeWidth="2"
        strokeMiterlimit="10"
        variants={{
          initial: { pathLength: 0 },
          animate: {
            pathLength: [0, 1, 0],
            transition: { duration: 5.8, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M241.787 90.6992H115.188"
        className={"dark:stroke-gray-300 stroke-gray-700"}
        strokeWidth="2"
        strokeMiterlimit="10"
        variants={{
          initial: { pathLength: 0 },
          animate: {
            pathLength: [0, 1, 0],
            transition: { duration: 5.2, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M241.787 108.818H29.4953"
        className={"dark:stroke-gray-300 stroke-gray-700"}
        strokeWidth="2"
        strokeMiterlimit="10"
        variants={{
          initial: { pathLength: 0 },
          animate: {
            pathLength: [0, 1, 0],
            transition: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M241.787 129.069H149.295"
        className={"dark:stroke-gray-300 stroke-gray-700"}
        strokeWidth="2"
        strokeMiterlimit="10"
        variants={{
          initial: { pathLength: 0 },
          animate: {
            pathLength: [0, 1, 0],
            transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <defs>
        <linearGradient
          id="paint0_linear_214_3565"
          x1="331.77"
          y1="70.4435"
          x2="331.77"
          y2="185.043"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF885B" />
          <stop offset="1" stopColor="#FF643A" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_214_3565"
          x1="309.56"
          y1="70.4435"
          x2="309.56"
          y2="148.985"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF885B" />
          <stop offset="1" stopColor="#FF643A" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_214_3565"
          x1="360.625"
          y1="70.0806"
          x2="360.625"
          y2="230.404"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF885B" />
          <stop offset="1" stopColor="#FF643A" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

export default AnimatedHeroIllustration;
