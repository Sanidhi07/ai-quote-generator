export const copyToClipboard = async (text: string): Promise<boolean> => {
  if(!text || typeof window === "undefined") {
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy text to clipboard:", err);
    return false;
  }
}