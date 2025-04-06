const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Nastavení úložiště pro Multer
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Statické soubory (CDN output)
app.use('/cdn', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint pro upload
app.post('/upload', upload.single('file'), (req, res) => {
  const fileUrl = `/cdn/${req.file.filename}`;
  res.json({ url: fileUrl });
});

app.listen(PORT, () => console.log(`Server běží na http://localhost:${PORT}`));
