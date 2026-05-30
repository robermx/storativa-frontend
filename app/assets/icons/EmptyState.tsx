import { FC } from 'react';

import { SvgProps } from '../interfaces/svg.interface';

const EmptyState: FC<SvgProps> = ({
  width = '100%',
  height = undefined,
  className = '',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 426 290"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      aria-hidden="true"
      role="img"
    >
      <defs>
        <clipPath id="cp-426-290">
          <rect x="0" y="0" width="426" height="290" />
        </clipPath>
        <clipPath id="cp-circle">
          <circle cx="213" cy="145" r="84" />
        </clipPath>
      </defs>
      <g clipPath="url(#cp-426-290)">
        <g id="comp_3">
          <g transform="matrix(1,0,0,1,8,115)">
            <ellipse
              ry="8"
              rx="8"
              cy="0"
              cx="0"
              fill="currentColor"
              fillOpacity="0.25"
            />
          </g>
          <g transform="matrix(1,0,0,1,376,179)">
            <ellipse
              ry="8"
              rx="8"
              cy="0"
              cx="0"
              fill="currentColor"
              fillOpacity="0.25"
            />
          </g>
          <g transform="matrix(1,0,0,1,306,9)">
            <ellipse
              ry="8"
              rx="8"
              cy="0"
              cx="0"
              strokeLinejoin="miter"
              strokeLinecap="butt"
              strokeWidth="2"
              strokeOpacity="0.3"
              stroke="currentColor"
              fill="none"
            />
          </g>
        </g>
        <g id="comp_2">
          <g>
            <g clipPath="url(#cp-circle)">
              <animateTransform
                repeatCount="indefinite"
                type="translate"
                attributeName="transform"
                dur="3.2s"
                begin="0s"
                values="0 0; 0 -5; 0 0"
                keyTimes="0; 0.5; 1"
                calcMode="spline"
                keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                fill="freeze"
              />
              <g transform="translate(211 145) scale(1.9) translate(-211 -145)">
                <path
                  d="M211 121C202.2 121 195 128.2 195 137H205C205 133.7 207.7 131 211 131C214.3 131 217 133.7 217 137C217 140 215.2 141.6 211.8 144.2C207.5 147.6 202 151.7 202 162H212C212 155.8 214.4 154 218.4 151C222.9 147.6 228 143.7 228 136.8C228 128.1 220.9 121 211 121Z"
                  fill="currentColor"
                  fillOpacity="0.30"
                  transform="translate(3 -2)"
                />
                <path
                  d="M205.5 168C205.5 164.9 208 162.4 211.1 162.4C214.2 162.4 216.7 164.9 216.7 168C216.7 171.1 214.2 173.6 211.1 173.6C208 173.6 205.5 171.1 205.5 168Z"
                  fill="currentColor"
                  fillOpacity="0.30"
                  transform="translate(-1 2)"
                />
              </g>
            </g>
            <circle
              cx="213"
              cy="145"
              r="92"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.10"
              strokeWidth="3"
            />
            <circle
              cx="213"
              cy="145"
              r="100"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.20"
              strokeWidth="6"
            />
            <circle
              cx="213"
              cy="145"
              r="112"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.30"
              strokeWidth="10"
            />
          </g>
          <g transform="translate(70,33)">
            <g>
              <animateTransform
                repeatCount="indefinite"
                type="rotate"
                attributeName="transform"
                dur="4.683s"
                begin="0s"
                calcMode="spline"
                values="0; 360"
                keyTimes="0; 1"
                keySplines="0 0 1 1"
                fill="freeze"
              />
              <g transform="scale(1,1) translate(0,0)">
                <ellipse
                  ry="12"
                  rx="12"
                  cy="0"
                  cx="0"
                  strokeLinejoin="miter"
                  strokeLinecap="butt"
                  strokeWidth="2"
                  strokeOpacity="0.35"
                  stroke="currentColor"
                  fill="none"
                />
              </g>
            </g>
          </g>
          <g transform="translate(31,196)">
            <g>
              <animateTransform
                repeatCount="indefinite"
                type="rotate"
                attributeName="transform"
                dur="4.6s"
                begin="0.083s"
                calcMode="spline"
                values="0; 360"
                keyTimes="0; 1"
                keySplines="0 0 1 1"
                fill="freeze"
              />
              <g transform="scale(1,1) translate(0,0)">
                <rect
                  height="18"
                  width="2"
                  y="0"
                  x="0"
                  fill="currentColor"
                  fillOpacity="0.18"
                />
                <rect
                  height="2"
                  width="16"
                  y="0"
                  x="0"
                  fill="currentColor"
                  fillOpacity="0.18"
                />
              </g>
            </g>
          </g>
          <g transform="translate(418,107)">
            <g>
              <animateTransform
                repeatCount="indefinite"
                type="rotate"
                attributeName="transform"
                dur="5.883s"
                begin="0.083s"
                calcMode="spline"
                values="0; 360"
                keyTimes="0; 1"
                keySplines="0 0 1 1"
                fill="freeze"
              />
              <g transform="scale(1,1) translate(0,0)">
                <rect
                  height="18"
                  width="2"
                  y="0"
                  x="0"
                  fill="currentColor"
                  fillOpacity="0.18"
                />
                <rect
                  height="2"
                  width="16"
                  y="0"
                  x="0"
                  fill="currentColor"
                  fillOpacity="0.18"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default EmptyState;
