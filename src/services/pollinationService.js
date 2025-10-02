const axios = require('axios');

/**
 * Generate artwork using Pollination AI based on color palette and preferences
 * @param {Array} colors - Array of hex color codes
 * @param {Object} preferences - User preferences for artwork generation
 * @param {string} style - Artistic style preference
 * @returns {Promise<Array>} - Array of generated artwork URLs
 */
async function generateArtwork(colors, preferences = {}, style = 'modern') {
  try {
    // Create a prompt based on colors and preferences
    const colorDescription = colors.join(', ');
    const prompt = `Create an artwork in ${style} style using the following color palette: ${colorDescription}. ${preferences.description || ''}`;
    
    // For demo purposes, we'll show how to use the Pollination AI API
    // In a real implementation, you would call the actual API
    
    // Example Pollination AI API call:
    // const response = await axios.get(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`, {
    //   responseType: 'stream'
    // });
    
    // Return sample artwork URLs
    return [
      {
        id: 'generated-1',
        url: `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`,
        prompt: prompt,
        colors: colors
      },
      {
        id: 'generated-2',
        url: `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + ' abstract')}`,
        prompt: prompt + ' abstract',
        colors: colors
      }
    ];
  } catch (error) {
    console.error('Error generating artwork:', error);
    throw error;
  }
}

/**
 * Format colors for the prompt
 * @param {Array} colors - Array of hex color codes
 * @returns {string} - Formatted color description
 */
function formatColorsForPrompt(colors) {
  if (!colors || colors.length === 0) return '';
  
  if (colors.length === 1) {
    return `using the color ${colors[0]}`;
  }
  
  const firstColors = colors.slice(0, -1).join(', ');
  const lastColor = colors[colors.length - 1];
  return `using the colors ${firstColors}, and ${lastColor}`;
}

module.exports = { generateArtwork };