/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function BASIXLogo({ className = 'h-10' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Red, Blue, Green, Yellow modern geometric emblem resembling the logo in the top-left */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        {/* Left blue curved stroke */}
        <path
          d="M25 15 C40 15, 50 35, 35 60 C25 80, 10 90, 15 65 C20 40, 15 15, 25 15 Z"
          fill="#1E3A8A"
        />
        {/* Top green curved splash */}
        <path
          d="M25 15 C45 25, 75 20, 85 45 C70 55, 50 40, 35 60 C50 35, 40 15, 25 15 Z"
          fill="#16A34A"
        />
        {/* Bottom yellow/orange splash */}
        <path
          d="M35 60 C50 40, 70 55, 85 45 C75 70, 45 85, 35 60 Z"
          fill="#F59E0B"
        />
        {/* Red accent ribbon */}
        <path
          d="M15 65 C10 90, 25 80, 35 60 C35 60, 25 80, 15 65 Z"
          fill="#DC2626"
        />
      </svg>
      <div className="flex flex-col">
        <span className="font-sans text-xl font-black tracking-widest text-[#1E3A8A] leading-none">
          BASIX
        </span>
        <span className="font-sans text-[8px] font-semibold text-gray-500 tracking-widest leading-none text-right">
          group
        </span>
      </div>
    </div>
  );
}
