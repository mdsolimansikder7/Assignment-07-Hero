"use client";

import { useSyncExternalStore } from "react";
import { getBanglaDate } from "@/lib/utils";

const noopSubscribe = () => () => {};

export default function BanglaDate({ className = "" }: { className?: string }) {

  const today = useSyncExternalStore(
    noopSubscribe,
    () => getBanglaDate(), 
    () => "" 
  );

  return <span className={className}>{today}</span>;
}