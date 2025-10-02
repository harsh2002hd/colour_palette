const express = require('express');
const multer = require('multer');
const path = require('path');
const { extractColors } = require('./utils/colorExtractor');
const { generateArtwork } = require('./services/pollinationService');
const { searchArtwork } = require('./services/artworkSearchService');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Upload image and extract colors
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extract colors from the uploaded image
    const colors = await extractColors(req.file.path);
    
    // Store image info and colors in session or database
    const imageData = {
      imagePath: req.file.path,
      colors: colors,
      timestamp: new Date()
    };

    res.json({
      message: 'Image uploaded successfully',
      data: imageData
    });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Error processing image: ' + error.message });
  }
});

// Curate existing artwork based on colors
app.post('/curate', async (req, res) => {
  try {
    const { colors, preferences } = req.body;
    
    if (!colors || !Array.isArray(colors)) {
      return res.status(400).json({ error: 'Colors array is required' });
    }

    // Search for existing artwork that matches the color palette
    const curatedArtworks = await searchArtwork(colors, preferences);
    
    res.json({
      message: 'Artwork curated successfully',
      artworks: curatedArtworks
    });
  } catch (error) {
    console.error('Error curating artwork:', error);
    res.status(500).json({ error: 'Error curating artwork: ' + error.message });
  }
});

// Create new artwork using Pollination AI
app.post('/create', async (req, res) => {
  try {
    const { colors, preferences, style } = req.body;
    
    if (!colors || !Array.isArray(colors)) {
      return res.status(400).json({ error: 'Colors array is required' });
    }

    // Generate new artwork using Pollination AI
    const createdArtworks = await generateArtwork(colors, preferences, style);
    
    res.json({
      message: 'Artwork created successfully',
      artworks: createdArtworks
    });
  } catch (error) {
    console.error('Error creating artwork:', error);
    res.status(500).json({ error: 'Error creating artwork: ' + error.message });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
  }
  res.status(500).json({ error: error.message });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Open your browser to http://localhost:${port} to use the application`);
});