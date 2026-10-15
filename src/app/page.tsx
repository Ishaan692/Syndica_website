"use client";

import React from "react";
import HeroChapter from "@/components/home/HeroChapter";
import MessChapter from "@/components/home/MessChapter";
import DealFlow from "@/components/DealFlow";
import LayersChapter from "@/components/home/LayersChapter";
import ProductsChapter from "@/components/home/ProductsChapter";
import PrinciplesChapter from "@/components/home/PrinciplesChapter";
import PeopleChapter from "@/components/home/PeopleChapter";
import CloseChapter from "@/components/home/CloseChapter";

export default function Home() {
  return (
    <div className="w-full bg-transparent text-[#ECE8DF] flex flex-col">
      {/* ─── CHAPTER 01: HERO ─── */}
      <HeroChapter />

      {/* ─── CHAPTER 02: THE MESS ─── */}
      <MessChapter />

      {/* ─── CHAPTER 03: DEAL FLOW (BROKEROS LIVE DEMO) ─── */}
      <DealFlow variant="home" />

      {/* ─── CHAPTER 04: ARCHITECTURE (3D STACKED PLATES) ─── */}
      <LayersChapter />

      {/* ─── CHAPTER 05: PRODUCTS INDEX (SPOTLIGHT) ─── */}
      <ProductsChapter />

      {/* ─── CHAPTER 06: HOW WE BUILD (PINNED 400vw TRACK) ─── */}
      <PrinciplesChapter />

      {/* ─── CHAPTER 07: PEOPLE ─── */}
      <PeopleChapter />

      {/* ─── CHAPTER 08: CLOSE & THE DAWN ─── */}
      <CloseChapter />
    </div>
  );
}
