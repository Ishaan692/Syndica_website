"use client";

import React from "react";

interface ScreenSkeletonProps {
  variant?: "hero" | "rfq" | "qcr" | "policy" | "commission";
}

export default function ScreenSkeleton({ variant = "hero" }: ScreenSkeletonProps) {
  if (variant === "rfq") {
    return (
      <div className="w-full h-full p-5 flex flex-col gap-4 text-[#ECE8DF] select-none text-xs font-mono">
        {/* Deal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(236,232,223,0.1)]">
          <div className="flex items-center gap-2">
            <span className="text-[#FF4F2B]">RFQ-2026-IND-0842</span>
            <span className="text-[rgba(236,232,223,0.4)]">·</span>
            <span className="text-[rgba(236,232,223,0.7)] font-body">Apex Logistics Pvt Ltd</span>
          </div>
          <span className="px-2 py-0.5 border border-[#FF4F2B]/40 text-[#FF4F2B] text-[10px] uppercase tracking-wider">
            APPETITE MATCHED
          </span>
        </div>

        {/* 2-column layout */}
        <div className="grid grid-cols-12 gap-4 flex-1">
          {/* Left: Risk Profile */}
          <div className="col-span-7 flex flex-col gap-2.5">
            <div className="p-2.5 bg-[rgba(236,232,223,0.03)] border border-[rgba(236,232,223,0.08)]">
              <span className="text-[10px] uppercase text-[rgba(236,232,223,0.4)] block mb-1">
                Risk Classification
              </span>
              <span className="font-body text-[13px] text-[#ECE8DF] block">
                Industrial All Risks & Transit Cover
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-[rgba(236,232,223,0.03)] border border-[rgba(236,232,223,0.08)]">
                <span className="text-[10px] uppercase text-[rgba(236,232,223,0.4)] block mb-1">
                  Sum Insured
                </span>
                <span className="text-[14px] text-[#ECE8DF] font-semibold">
                  ₹45,00,00,000
                </span>
              </div>
              <div className="p-2.5 bg-[rgba(236,232,223,0.03)] border border-[rgba(236,232,223,0.08)]">
                <span className="text-[10px] uppercase text-[rgba(236,232,223,0.4)] block mb-1">
                  Target Inception
                </span>
                <span className="text-[13px] text-[rgba(236,232,223,0.8)]">
                  01 Nov 2026
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-[rgba(236,232,223,0.03)] border border-[rgba(236,232,223,0.08)]">
              <span className="text-[10px] uppercase text-[rgba(236,232,223,0.4)] block mb-1">
                Locations Covered (3 Units)
              </span>
              <span className="text-[11px] text-[rgba(236,232,223,0.6)] block truncate">
                Bhiwandi Hub (₹28 Cr) · Manesar WH (₹12 Cr) · Chennai (₹5 Cr)
              </span>
            </div>
          </div>

          {/* Right: Underwriter Appetite Suggestions */}
          <div className="col-span-5 p-3 bg-[rgba(236,232,223,0.02)] border border-[rgba(236,232,223,0.08)] flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-wider text-[rgba(236,232,223,0.44)] pb-1 border-b border-[rgba(236,232,223,0.06)]">
              Suggested Carriers
            </span>

            <div className="flex items-center justify-between py-1 border-b border-[rgba(236,232,223,0.04)]">
              <div>
                <span className="text-[12px] text-[#ECE8DF] block">ICICI Lombard</span>
                <span className="text-[10px] text-[rgba(236,232,223,0.4)]">High appetite · Warehousing</span>
              </div>
              <span className="text-[#38E08C] text-[11px]">96%</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-[rgba(236,232,223,0.04)]">
              <div>
                <span className="text-[12px] text-[#ECE8DF] block">HDFC ERGO</span>
                <span className="text-[10px] text-[rgba(236,232,223,0.4)]">Target capacity · Active</span>
              </div>
              <span className="text-[#38E08C] text-[11px]">91%</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-[rgba(236,232,223,0.04)]">
              <div>
                <span className="text-[12px] text-[#ECE8DF] block">Tata AIG</span>
                <span className="text-[10px] text-[rgba(236,232,223,0.4)]">Competitive transit terms</span>
              </div>
              <span className="text-[#38E08C] text-[11px]">88%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "qcr") {
    return (
      <div className="w-full h-full p-5 flex flex-col gap-3.5 text-[#ECE8DF] select-none text-xs font-mono">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(236,232,223,0.1)]">
          <div className="flex items-center gap-2">
            <span className="text-[#FF4F2B]">QCR-2026-0842</span>
            <span className="text-[rgba(236,232,223,0.4)]">·</span>
            <span className="text-[rgba(236,232,223,0.7)] font-body">Quote Comparison Report</span>
          </div>
          <span className="px-2 py-0.5 border border-[#38E08C]/40 text-[#38E08C] text-[10px] uppercase">
            3 QUOTES EVALUATED
          </span>
        </div>

        {/* 4-column Table */}
        <div className="flex-1 flex flex-col border border-[rgba(236,232,223,0.08)] bg-[rgba(236,232,223,0.02)]">
          {/* Table Header */}
          <div className="grid grid-cols-12 p-2.5 border-b border-[rgba(236,232,223,0.08)] bg-[rgba(236,232,223,0.04)] text-[11px] text-[rgba(236,232,223,0.5)]">
            <span className="col-span-3">SPECIFICATION</span>
            <span className="col-span-3 text-[#FF4F2B] font-semibold">TATA AIG (RECOMMENDED)</span>
            <span className="col-span-3">ICICI LOMBARD</span>
            <span className="col-span-3">HDFC ERGO</span>
          </div>

          {/* Rows */}
          <div className="grid grid-cols-12 p-2.5 border-b border-[rgba(236,232,223,0.04)] items-center">
            <span className="col-span-3 text-[rgba(236,232,223,0.5)]">Net Premium</span>
            <span className="col-span-3 text-[#ECE8DF] font-semibold text-[13px]">₹11,95,000</span>
            <span className="col-span-3 text-[rgba(236,232,223,0.7)]">₹12,40,000</span>
            <span className="col-span-3 text-[rgba(236,232,223,0.7)]">₹13,10,000</span>
          </div>

          <div className="grid grid-cols-12 p-2.5 border-b border-[rgba(236,232,223,0.04)] items-center">
            <span className="col-span-3 text-[rgba(236,232,223,0.5)]">Excess / Deductible</span>
            <span className="col-span-3 text-[#ECE8DF]">₹1,00,000</span>
            <span className="col-span-3 text-[rgba(236,232,223,0.7)]">₹1,50,000</span>
            <span className="col-span-3 text-[rgba(236,232,223,0.7)]">₹1,00,000</span>
          </div>

          <div className="grid grid-cols-12 p-2.5 border-b border-[rgba(236,232,223,0.04)] items-center">
            <span className="col-span-3 text-[rgba(236,232,223,0.5)]">Terrorism Cover</span>
            <span className="col-span-3 text-[#38E08C]">Included in Base</span>
            <span className="col-span-3 text-[rgba(236,232,223,0.7)]">Included in Base</span>
            <span className="col-span-3 text-[rgba(236,232,223,0.5)]">₹15 Cr Sub-limit</span>
          </div>

          <div className="grid grid-cols-12 p-2.5 items-center">
            <span className="col-span-3 text-[rgba(236,232,223,0.5)]">Key Clause</span>
            <span className="col-span-3 text-[#ECE8DF]">STFI + 72-Hour Clause</span>
            <span className="col-span-3 text-[rgba(236,232,223,0.7)]">Standard STFI</span>
            <span className="col-span-3 text-[rgba(236,232,223,0.7)]">Standard STFI</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "policy") {
    return (
      <div className="w-full h-full p-5 flex flex-col gap-3.5 text-[#ECE8DF] select-none text-xs font-mono">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(236,232,223,0.1)]">
          <div className="flex items-center gap-2">
            <span className="text-[#38E08C]">POL-2026-IND-9014</span>
            <span className="text-[rgba(236,232,223,0.4)]">·</span>
            <span className="text-[rgba(236,232,223,0.7)] font-body">Bound Policy Record</span>
          </div>
          <span className="px-2 py-0.5 bg-[#38E08C]/10 border border-[#38E08C]/40 text-[#38E08C] text-[10px] uppercase">
            LIVE POLICY
          </span>
        </div>

        {/* Bound Details */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-2.5 bg-[rgba(236,232,223,0.03)] border border-[rgba(236,232,223,0.08)]">
            <span className="text-[10px] uppercase text-[rgba(236,232,223,0.4)] block mb-1">Carrier</span>
            <span className="text-[12px] text-[#ECE8DF] font-semibold">Tata AIG General</span>
          </div>
          <div className="p-2.5 bg-[rgba(236,232,223,0.03)] border border-[rgba(236,232,223,0.08)]">
            <span className="text-[10px] uppercase text-[rgba(236,232,223,0.4)] block mb-1">Gross Premium</span>
            <span className="text-[12px] text-[#ECE8DF] font-semibold">₹14,10,100</span>
          </div>
          <div className="p-2.5 bg-[rgba(236,232,223,0.03)] border border-[rgba(236,232,223,0.08)]">
            <span className="text-[10px] uppercase text-[rgba(236,232,223,0.4)] block mb-1">Renewal Due</span>
            <span className="text-[12px] text-[#FF4F2B]">31 Oct 2027</span>
          </div>
        </div>

        {/* Generated Documents Grid */}
        <div className="p-3 bg-[rgba(236,232,223,0.02)] border border-[rgba(236,232,223,0.08)] flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-wider text-[rgba(236,232,223,0.44)]">
            7 Generated Back-Office Documents Attached
          </span>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-1.5 border border-[rgba(236,232,223,0.06)] flex items-center justify-between">
              <span>PLACEMENT_SLIP.PDF</span>
              <span className="text-[#38E08C]">ISSUED</span>
            </div>
            <div className="p-1.5 border border-[rgba(236,232,223,0.06)] flex items-center justify-between">
              <span>RISK_COVER_LETTER.PDF</span>
              <span className="text-[#38E08C]">ISSUED</span>
            </div>
            <div className="p-1.5 border border-[rgba(236,232,223,0.06)] flex items-center justify-between">
              <span>PLACEMENT_LETTER.PDF</span>
              <span className="text-[#38E08C]">ISSUED</span>
            </div>
            <div className="p-1.5 border border-[rgba(236,232,223,0.06)] flex items-center justify-between">
              <span>POLICY_COVER_PAGE.PDF</span>
              <span className="text-[#38E08C]">ISSUED</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "commission") {
    return (
      <div className="w-full h-full p-5 flex flex-col gap-3.5 text-[#ECE8DF] select-none text-xs font-mono">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(236,232,223,0.1)]">
          <div className="flex items-center gap-2">
            <span className="text-[#FF4F2B]">COMMISSION LEDGER</span>
            <span className="text-[rgba(236,232,223,0.4)]">·</span>
            <span className="text-[rgba(236,232,223,0.7)] font-body">POL-2026-IND-9014</span>
          </div>
          <span className="px-2 py-0.5 border border-[#ECE8DF]/40 text-[#ECE8DF] text-[10px] uppercase">
            GST INVOICED
          </span>
        </div>

        {/* Breakdown Card */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 bg-[rgba(236,232,223,0.03)] border border-[rgba(236,232,223,0.08)]">
            <span className="text-[10px] uppercase text-[rgba(236,232,223,0.4)] block mb-1">
              Brokerage (15.0%)
            </span>
            <span className="text-[14px] text-[#ECE8DF] font-semibold">
              ₹1,79,250
            </span>
          </div>
          <div className="p-3 bg-[rgba(236,232,223,0.03)] border border-[rgba(236,232,223,0.08)]">
            <span className="text-[10px] uppercase text-[rgba(236,232,223,0.4)] block mb-1">
              TDS Withheld (10%)
            </span>
            <span className="text-[14px] text-[rgba(236,232,223,0.6)]">
              -₹17,925
            </span>
          </div>
          <div className="p-3 bg-[rgba(236,232,223,0.03)] border border-[rgba(236,232,223,0.08)]">
            <span className="text-[10px] uppercase text-[rgba(236,232,223,0.4)] block mb-1">
              Net Receivable
            </span>
            <span className="text-[14px] text-[#38E08C] font-semibold">
              ₹1,61,325
            </span>
          </div>
        </div>

        {/* Ledger Transaction Record */}
        <div className="p-3 bg-[rgba(236,232,223,0.02)] border border-[rgba(236,232,223,0.08)] flex flex-col gap-2 flex-1">
          <span className="text-[10px] uppercase tracking-wider text-[rgba(236,232,223,0.44)]">
            Payout Settlement Trace
          </span>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between py-1 border-b border-[rgba(236,232,223,0.04)]">
              <span className="text-[rgba(236,232,223,0.6)]">Debtor (Carrier)</span>
              <span>Tata AIG General Insurance Co. Ltd</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[rgba(236,232,223,0.04)]">
              <span className="text-[rgba(236,232,223,0.6)]">Tax Invoice Number</span>
              <span>SYN-INV-2026-0419</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[rgba(236,232,223,0.6)]">Reconciliation Status</span>
              <span className="text-[#38E08C]">MATCHED TO REVENUE LEDGER</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default / Hero Overview: Kanban Deal Pipeline
  return (
    <div className="w-full h-full p-4 flex flex-col gap-3 text-[#ECE8DF] select-none text-xs font-mono">
      <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(236,232,223,0.1)]">
        <span className="text-[#ECE8DF] font-body text-xs font-semibold">
          Commercial Deal Pipeline
        </span>
        <span className="text-[10px] text-[rgba(236,232,223,0.44)]">
          26 ACTIVE DEALS
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 flex-1">
        {/* Col 1 */}
        <div className="p-2 bg-[rgba(236,232,223,0.02)] border border-[rgba(236,232,223,0.06)] flex flex-col gap-2">
          <span className="text-[10px] text-[rgba(236,232,223,0.4)] uppercase">RFQ (4)</span>
          <div className="p-2 bg-[rgba(236,232,223,0.04)] border border-[rgba(236,232,223,0.08)] flex flex-col">
            <span className="font-body text-[11px] text-[#ECE8DF]">Apex Logistics</span>
            <span className="text-[10px] text-[#FF4F2B]">₹45 Cr SI</span>
          </div>
          <div className="p-2 bg-[rgba(236,232,223,0.04)] border border-[rgba(236,232,223,0.08)] flex flex-col">
            <span className="font-body text-[11px] text-[#ECE8DF]">Titan Glassworks</span>
            <span className="text-[10px] text-[rgba(236,232,223,0.6)]">₹32L Prem</span>
          </div>
        </div>

        {/* Col 2 */}
        <div className="p-2 bg-[rgba(236,232,223,0.02)] border border-[rgba(236,232,223,0.06)] flex flex-col gap-2">
          <span className="text-[10px] text-[rgba(236,232,223,0.4)] uppercase">Quotes In (7)</span>
          <div className="p-2 bg-[rgba(236,232,223,0.04)] border border-[rgba(236,232,223,0.08)] flex flex-col">
            <span className="font-body text-[11px] text-[#ECE8DF]">Zenith Pharma</span>
            <span className="text-[10px] text-[#38E08C]">3 Quotes Recv</span>
          </div>
          <div className="p-2 bg-[rgba(236,232,223,0.04)] border border-[rgba(236,232,223,0.08)] flex flex-col">
            <span className="font-body text-[11px] text-[#ECE8DF]">Om Freightlines</span>
            <span className="text-[10px] text-[rgba(236,232,223,0.6)]">2 Quotes Recv</span>
          </div>
        </div>

        {/* Col 3 */}
        <div className="p-2 bg-[rgba(236,232,223,0.02)] border border-[rgba(236,232,223,0.06)] flex flex-col gap-2">
          <span className="text-[10px] text-[rgba(236,232,223,0.4)] uppercase">QCR Sent (3)</span>
          <div className="p-2 bg-[rgba(236,232,223,0.04)] border border-[rgba(236,232,223,0.08)] flex flex-col">
            <span className="font-body text-[11px] text-[#ECE8DF]">Kalyani Steels</span>
            <span className="text-[10px] text-[rgba(236,232,223,0.6)]">Awaiting Selection</span>
          </div>
        </div>

        {/* Col 4 */}
        <div className="p-2 bg-[rgba(236,232,223,0.02)] border border-[rgba(236,232,223,0.06)] flex flex-col gap-2">
          <span className="text-[10px] text-[#38E08C] uppercase">Bound (12)</span>
          <div className="p-2 bg-[rgba(236,232,223,0.04)] border border-[#38E08C]/30 flex flex-col">
            <span className="font-body text-[11px] text-[#ECE8DF]">Maruti Spareparts</span>
            <span className="text-[10px] text-[#38E08C]">₹14.1L Paid</span>
          </div>
        </div>
      </div>
    </div>
  );
}
