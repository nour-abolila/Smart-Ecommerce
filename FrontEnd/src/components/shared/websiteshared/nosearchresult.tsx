"use client";

import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "No Results Found",
  description = "We can't find any item matching your search. Try another category.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 text-center">
      {/* Icon */}
      <div className="mb-6 flex  items-center justify-center rounded-full ">
        <svg
          width="150"
          height="150"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M68.75 129.688C35.125 129.688 7.8125 102.375 7.8125 68.75C7.8125 35.125 35.125 7.8125 68.75 7.8125C71.3125 7.8125 73.4375 9.9375 73.4375 12.5C73.4375 15.0625 71.3125 17.1875 68.75 17.1875C40.3125 17.1875 17.1875 40.3125 17.1875 68.75C17.1875 97.1875 40.3125 120.312 68.75 120.312C97.1875 120.312 120.312 97.1875 120.312 68.75C120.312 66.1875 122.438 64.0625 125 64.0625C127.562 64.0625 129.688 66.1875 129.688 68.75C129.688 102.375 102.375 129.688 68.75 129.688Z"
            fill="black"
            fill-opacity="0.1"
          />
          <path
            d="M125 35.9375H87.5C84.9375 35.9375 82.8125 33.8125 82.8125 31.25C82.8125 28.6875 84.9375 26.5625 87.5 26.5625H125C127.562 26.5625 129.688 28.6875 129.688 31.25C129.688 33.8125 127.562 35.9375 125 35.9375Z"
            fill="black"
            fill-opacity="0.1"
          />
          <path
            d="M106.25 54.6875H87.5C84.9375 54.6875 82.8125 52.5625 82.8125 50C82.8125 47.4375 84.9375 45.3125 87.5 45.3125H106.25C108.812 45.3125 110.938 47.4375 110.938 50C110.938 52.5625 108.812 54.6875 106.25 54.6875Z"
            fill="black"
            fill-opacity="0.1"
          />
          <path
            d="M126.001 142.437C125.501 142.437 125.001 142.375 124.563 142.312C121.626 141.937 116.313 139.937 113.313 131C111.751 126.313 112.313 121.625 114.876 118.062C117.438 114.5 121.751 112.5 126.688 112.5C133.063 112.5 138.063 114.938 140.313 119.25C142.563 123.563 141.938 129.062 138.376 134.375C133.938 141.063 129.126 142.437 126.001 142.437ZM122.251 128.063C123.313 131.312 124.813 132.937 125.813 133.062C126.813 133.187 128.688 132 130.626 129.188C132.438 126.5 132.563 124.562 132.126 123.687C131.688 122.812 129.938 121.875 126.688 121.875C124.751 121.875 123.313 122.5 122.501 123.562C121.751 124.625 121.626 126.25 122.251 128.063Z"
            fill="black"
            fill-opacity="0.1"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>

      {/* Description */}
      <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
