/**
 * This is a browser-only implementation that processes images entirely client-side.
 *
 * IMPORTANT: No files are saved to any server or folder.
 * All processing happens in memory within the browser.
 *
 * The download function simply allows users to save the result to their own device
 * if they choose to do so.
 */

export async function processImage(
  imageData: string,
  scale: number,
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      // Create a canvas with the new dimensions
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        resolve(imageData); // Fallback to original if canvas context not available
        return;
      }

      // Set canvas dimensions to the upscaled size
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      // Use built-in browser scaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Draw the image at the larger size
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convert canvas to data URL
      const upscaledImageData = canvas.toDataURL(
        getImageTypeFromDataURL(imageData),
      );
      resolve(upscaledImageData);
    };

    img.src = imageData;
  });
}

// Helper function to extract image type from data URL
function getImageTypeFromDataURL(dataURL: string): string {
  const match = dataURL.match(/^data:([\w/]+);base64,/);
  return match ? match[1] : "image/png";
}

export function downloadImage(imageData: string, fileName: string): void {
  // Create a link element
  const link = document.createElement("a");
  link.href = imageData;
  link.download = fileName;

  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
