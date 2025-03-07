import { Button } from "@/components/ui/button";

interface MagnificationOptionsProps {
  selectedScale: number;
  onScaleSelect: (scale: number) => void;
}

export default function MagnificationOptions({
  selectedScale = 2,
  onScaleSelect = () => {},
}: MagnificationOptionsProps) {
  const scaleOptions = [2, 5, 10];

  return (
    <div className="flex flex-col space-y-4 w-full backdrop-blur-sm bg-white/40 p-4 rounded-lg border border-white/50 shadow-md">
      <h3 className="text-lg font-medium">Select Magnification</h3>
      <div className="flex flex-wrap gap-3">
        {scaleOptions.map((scale) => (
          <Button
            key={scale}
            variant={selectedScale === scale ? "default" : "outline"}
            onClick={() => onScaleSelect(scale)}
            className={`flex-1 min-w-20 ${selectedScale === scale ? "bg-primary text-primary-foreground" : ""}`}
          >
            {scale}x
          </Button>
        ))}
      </div>
    </div>
  );
}
