import { useState, useEffect } from "react";

interface PreviewComparisonProps {
  originalImage: string;
  scale: number;
}

export default function PreviewComparison({
  originalImage = "",
  scale = 2,
}: PreviewComparisonProps) {
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
  const [upscaledSize, setUpscaledSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (originalImage) {
      const img = new Image();
      img.onload = () => {
        setOriginalSize({ width: img.width, height: img.height });
        setUpscaledSize({
          width: Math.round(img.width * scale),
          height: Math.round(img.height * scale),
        });
      };
      img.src = originalImage;
    }
  }, [originalImage, scale]);

  if (!originalImage) return null;

  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="border border-white/50 rounded-md p-2 bg-white/80 backdrop-blur-sm shadow-md mb-2">
            <img
              src={originalImage}
              alt="Original logo"
              className="max-w-full max-h-48 object-contain"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Original: {originalSize.width} × {originalSize.height}px
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div
            className="border border-white/50 rounded-md p-2 bg-white/80 backdrop-blur-sm shadow-md mb-2 overflow-hidden"
            style={{ width: "100%", maxWidth: "300px", height: "200px" }}
          >
            <div
              style={{
                width: `${100 / scale}%`,
                height: `${100 / scale}%`,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              <img
                src={originalImage}
                alt="Upscaled logo"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Upscaled ({scale}x): {upscaledSize.width} × {upscaledSize.height}px
          </p>
        </div>
      </div>
    </div>
  );
}
