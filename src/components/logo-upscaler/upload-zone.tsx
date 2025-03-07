import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
}

export default function UploadZone({
  onFileSelected = () => {},
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (isValidFile(file)) {
        onFileSelected(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (isValidFile(file)) {
        onFileSelected(file);
      }
    }
  };

  const isValidFile = (file: File): boolean => {
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
    ];
    return validTypes.includes(file.type);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 transition-colors backdrop-blur-sm ${isDragging ? "border-primary bg-primary/10" : "border-white/50 bg-white/30"}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className="w-12 h-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">Drag & drop your logo here</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Supports JPG, PNG, SVG and GIF
      </p>
      <Button
        onClick={handleButtonClick}
        className="bg-primary hover:bg-primary/90"
      >
        Select File
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/jpeg,image/png,image/svg+xml,image/gif"
        className="hidden"
      />
    </div>
  );
}
