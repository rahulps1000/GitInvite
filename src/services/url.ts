"use client";

export function getUrl() {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  return origin;
}
