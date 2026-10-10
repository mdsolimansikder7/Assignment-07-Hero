"use client";

import { useEffect, useState } from "react";
import { getBanglaDate } from "@/lib/utils";

export default function BanglaDate({ className = "" }: { className?: string }) {
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(getBanglaDate());
  }, []);

  return <span className={className}>{today}</span>;
}