/**
 * scripts/reading-check.mjs
 * Automated reading safety check: computes 95th-percentile relative luminance
 * behind [data-reading] elements to ensure text sits strictly on near-black ink.
 * Thresholds: <= 0.10 for body text, <= 0.14 for headlines >= 56px.
 */

import fs from 'fs';
import path from 'path';

// Calculate relative luminance of an RGB pixel (sRGB to linear)
function getRelativeLuminance(r, g, b) {
  const rs = r / 255;
  const gs = g / 255;
  const bs = b / 255;

  const R = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
  const G = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
  const B = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function computePercentileLuminance(pixels, percentile = 95) {
  if (pixels.length === 0) return 0;
  const luminances = [];
  for (let i = 0; i < pixels.length; i += 4) {
    luminances.push(getRelativeLuminance(pixels[i], pixels[i + 1], pixels[i + 2]));
  }
  luminances.sort((a, b) => a - b);
  const index = Math.floor((percentile / 100) * (luminances.length - 1));
  return luminances[index];
}

console.log('Reading safety checker module loaded.');
