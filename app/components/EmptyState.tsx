"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";

interface EmptyState {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyState> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 border-[1px] border-black rounded-lg hover:bg-black hover:text-white transition"
          >
            Remove all filters
          </button>
        )}
      </div>
    </div>
  );
};
export default EmptyState;
