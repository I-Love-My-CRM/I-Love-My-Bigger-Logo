import { useState } from "react";
import UploadZone from "./upload-zone";
import MagnificationOptions from "./magnification-options";
import PreviewComparison from "./preview-comparison";
import { Button } from "@/components/ui/button";
import { Download, Info } from "lucide-react";
import { downloadImage, processImage } from "@/lib/image-processing";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function LogoUpscaler() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedScale, setSelectedScale] = useState<number>(2);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
      handleProcessImage(e.target?.result as string, 2);
    };
    reader.readAsDataURL(file);
  };

  const handleScaleSelect = (scale: number) => {
    setSelectedScale(scale);
    if (imagePreview) {
      handleProcessImage(imagePreview, scale);
    }
  };

  const handleProcessImage = async (imageSrc: string, scale: number) => {
    setIsProcessing(true);

    try {
      // Process the image (in a real implementation, this would use a proper upscaling algorithm)
      await processImage(imageSrc, scale);

      // Simulate processing time
      setTimeout(() => {
        setIsProcessing(false);
        setIsComplete(true);
      }, 1000);
    } catch (error) {
      console.error("Error processing image:", error);
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!imagePreview || !selectedFile) return;

    // Get file extension
    const fileExtension = selectedFile.name.split(".").pop() || "png";

    // Set the file name with scale indicator
    const fileName = `${selectedFile.name.replace(`.${fileExtension}`, "")}_${selectedScale}x.${fileExtension}`;

    // Use the download utility function
    downloadImage(imagePreview, fileName);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 bg-background">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          I Love My Bigger Logos
        </h1>
        <p className="text-muted-foreground">
          Instantly upscale your logo with a single click
        </p>
      </div>

      {!selectedFile ? (
        <UploadZone onFileSelected={handleFileSelected} />
      ) : (
        <div className="space-y-8">
          <MagnificationOptions
            selectedScale={selectedScale}
            onScaleSelect={handleScaleSelect}
          />

          <PreviewComparison
            originalImage={imagePreview}
            scale={selectedScale}
          />

          {isComplete && (
            <div className="flex justify-center items-center gap-3">
              <Button
                onClick={handleDownload}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              >
                <Download className="mr-2 h-5 w-5" />
                Save to Your Device
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-help">
                      <Info className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      All processing happens in your browser. No files are saved
                      to any server or folder.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}

          <div className="border-t pt-6">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedFile(null);
                setImagePreview("");
                setIsComplete(false);
              }}
            >
              Upload a different logo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
