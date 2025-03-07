import { Slider } from "@/components/ui/slider";
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

  return (
    <div className="flex flex-col space-y-4 w-full backdrop-blur-sm bg-white/40 p-4 rounded-lg border border-white/50 shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Select Magnification</h3>
        <span className="text-lg font-semibold text-primary">
          {sliderValue}x
        </span>
      </div>

      <div className="px-1 py-4">
        <Slider
          defaultValue={[selectedScale]}
          value={[sliderValue]}
          min={minScale}
          max={maxScale}
          step={1}
          onValueChange={handleSliderChange}
        />
      </div>

      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{minScale}x</span>
        <span>{maxScale}x</span>
      </div>
    </div>
  );
}
