"use client";

import React, { useEffect } from "react";
import Button from "@/components/Button";
import { tweenArtStage } from "@/lib/effects";

export default function NotFound() {
  useEffect(() => {
    tweenArtStage("404");
  }, []);

  return (
    <div className="w-full min-h-[85vh] flex flex-col justify-center px-6 container-grid pt-32 pb-20 bg-transparent text-[#ECE8DF]">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-[11px] text-[#FF4F2B]">ERROR</span>
          <span className="folio-label">RECORD NOT FOUND</span>
        </div>

        <h1
          data-skew
          className="display-xl text-[#ECE8DF] mb-8 leading-none"
          style={{ fontVariationSettings: '"wdth" 68' }}
          data-reading
        >
          404
        </h1>

        <p className="body-l text-[rgba(236,232,223,0.78)] mb-10 max-w-xl" data-reading>
          This record does not exist. It may have been merged, moved or never created.
        </p>

        <div>
          <Button href="/" variant="primary">
            Back to the start
          </Button>
        </div>
      </div>
    </div>
  );
}
