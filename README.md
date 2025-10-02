# Colour Palette Art Curator

A system that curates and creates artworks based on room images using Pollination AI.

## Features

1. **Upload Room Photos**: Users can upload photos of their rooms or spaces
2. **Color Extraction**: The system extracts the dominant colors from the uploaded image
3. **Curate Existing Artwork**: Find existing artwork that matches the color palette from various sources
4. **Create New Artwork**: Generate new artwork using Pollination AI that fits the color scheme and user preferences

## How It Works

1. User uploads an image of their room
2. System extracts the color palette from the image
3. User can choose to either:
   - **Curate**: Find existing artwork that matches the color palette
   - **Create**: Generate new artwork using Pollination AI

## Pollination AI Integration

This system uses Pollination AI for generating new artwork. The image generation endpoint is:

```
GET https://image.pollinations.ai/prompt/{prompt}
```

Where `{prompt}` is a text description that includes the color palette and user preferences.

For detailed information about how we integrate Pollination AI, see [POLLINATION_AI_INTEGRATION.md](POLLINATION_AI_INTEGRATION.md).

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
4. Open your browser to `http://localhost:3001`

## API Endpoints

- `POST /upload` - Upload an image and extract colors
- `POST /curate` - Find existing artwork matching the color palette
- `POST /create` - Generate new artwork using Pollination AI

## Technologies Used

- Node.js with Express
- Multer for file uploads
- Axios for HTTP requests
- Modern CSS with Flexbox and Grid
- Font Awesome for icons
- HTML/CSS/JavaScript for frontend

## Future Enhancements

- Implement actual color extraction using client-side libraries like Vibrant.js
- Connect to real artwork databases for curation
- Add user preference profiles
- Implement deep user modeling for personalized recommendations
- Add support for different artistic styles
- Implement size and format customization for generated artwork