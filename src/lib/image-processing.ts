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
  // In a real implementation, this would use a proper image processing library
  // For now, we're just returning the original image data
  return imageData;
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
