"use client";

import { useEffect, useMemo, useState } from "react";
import type { ImageProps } from "../contracts/ImageContract";

function resolvedAlt(alt: string | undefined, decorative: boolean | undefined) {
  if (decorative) {
    return "";
  }
  return alt ?? "";
}

export function Image({
  src,
  alt,
  decorative,
  fallbackSrc,
  width,
  height,
  loading,
  decoding,
  fetchPriority,
  objectFit,
  objectPosition,
  aspectRatio,
  onLoad,
  onError,
  className,
  style,
}: ImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  const finalAlt = useMemo(
    () => resolvedAlt(alt, decorative),
    [alt, decorative]
  );

  return (
    <img
      alt={finalAlt}
      aria-hidden={decorative || undefined}
      className={className}
      decoding={decoding ?? "async"}
      fetchPriority={fetchPriority}
      height={height}
      loading={loading ?? "lazy"}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
        onError?.({ src: currentSrc });
      }}
      onLoad={() => onLoad?.({ src: currentSrc })}
      src={currentSrc}
      style={{
        display: "block",
        maxWidth: "100%",
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        objectFit,
        objectPosition,
        aspectRatio,
        borderRadius: "var(--ui-radius-sm)",
        ...style,
      }}
      width={width}
    />
  );
}
