import { CustomSlider } from "@/components/ui/custom-slider";
import { useState, useEffect, useRef } from "react";

interface MagnificationOptionsProps {
  selectedScale: number;
  onScaleSelect: (scale: number) => void;
}

export default function MagnificationOptions({
  selectedScale = 2,
  onScaleSelect = () => {},
}: MagnificationOptionsProps) {
  const minScale = 2;
  const maxScale = 14;
  const [sliderValue, setSliderValue] = useState(selectedScale);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update internal state when prop changes
  useEffect(() => {
    setSliderValue(selectedScale);
  }, [selectedScale]);

  const handleSliderChange = (value: number[]) => {
    const newValue = value[0];
    setSliderValue(newValue);

    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set a new timer to trigger the actual change after 500ms of inactivity
    debounceTimerRef.current = setTimeout(() => {
      onScaleSelect(newValue);
    }, 500);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Generate tick marks for each increment
  const tickMarks = [];
  for (let i = minScale; i <= maxScale; i++) {
    tickMarks.push(i);
  }

  return (
    <div className="flex flex-col space-y-4 w-full backdrop-blur-sm bg-white/40 p-4 rounded-lg border border-white/50 shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Select Magnification</h3>
        <span className="text-lg font-semibold text-primary">
          {sliderValue}x
        </span>
      </div>

      <div className="px-1 py-4">
        <CustomSlider
          defaultValue={[selectedScale]}
          value={[sliderValue]}
          min={minScale}
          max={maxScale}
          step={1}
          onValueChange={handleSliderChange}
        />

        {/* Tick marks */}
        <div className="relative mt-1 h-6">
          {tickMarks.map((tick) => (
            <div
              key={tick}
              className="absolute top-0 w-0.5 h-2 bg-muted-foreground/50"
              style={{
                left: `${((tick - minScale) / (maxScale - minScale)) * 100}%`,
                transform: "translateX(-50%)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{minScale}x</span>
        <span>{maxScale}x</span>
      </div>
    </div>
  );
}
