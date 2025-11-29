const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const bannerRoutes = require('./routes/bannerRoutes');
const propertyRoute = require('./routes/propertyRoutes');
const topProjectRoutes = require('./routes/topProjectRoutes');
const clientRoutes = require("./routes/clientRoutes");
const galleryRoutes = require('./routes/galleryRoutes');
const projectRoute = require("./routes/projectRoutes");
const userRoute = require("./routes/userMessageRoutes");
const BannerAboutR = require('./routes/BannerAboutR');
const communityAboutRoutes = require('./routes/communityAboutRoutes');
const interiorbanner = require("./routes/InteriorBannerRoute");
const solutionRoutes = require('./routes/solutionRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const interiorPortfolioRoutes = require('./routes/interiorPortfolioRoutes');
const adminRoutes = require('./routes/adminRoutes');
const pageNameRoutes = require('./routes/pageNameRoutes');
const mediaSectionRoutes = require('./routes/mediaSectionRoutes');
const productionRoutes = require('./routes/productionRoutes');
const movieRoutes = require('./routes/movieRoutes');
const releasedMovieRoutese = require('./routes/releasedMovieRoutese');
const videoGridHomeRoutes = require('./routes/videoGridHomeRoutes');
const contactInfoRoutes = require('./routes/contactInfoRoutes');
const mapEmbedRoutes = require('./routes/mapEmbedRoutes');
const upcomingMovieRoutes = require('./routes/upcomingMovieRoutes');
const passMovieRoutes = require('./routes/passMovieRoutes');
const musicNameRoutes = require('./routes/musicNameRoutes');
const musicSectionRoutes = require('./routes/musicSectionRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json()); 

// CORS Configuration - Allow all origins
app.use(cors());

// Handle preflight requests
app.options('*', cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // To serve images
app.use('/uploads/office-images', express.static(path.join(__dirname, 'uploads/office-images')));

// Import routes
const adminloginRoutes = require('./routes/adminloginRoutes');
const statRoutes = require('./routes/statRoutes');
const investmentRoutes = require('./routes/investmentRoutes');
const contactBlockRoutes = require('./routes/contactBlockRoutes');
const contactRoutes = require('./routes/contactRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const teamRoutes = require('./routes/teamRoutes');
const officeRoutes = require('./routes/officeRoutes');

// Use routes
app.use('/api/admins', adminloginRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/contact-blocks', contactBlockRoutes); 
app.use('/api', contactRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/team-members', teamRoutes);
app.use('/api/offices', officeRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/property',propertyRoute)
app.use('/api/topprojects', topProjectRoutes);
app.use("/api/clients", clientRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/project',projectRoute);
app.use('/api/user',userRoute);
app.use('/api/bannerAbout',BannerAboutR);
app.use('/api/communityAbout', communityAboutRoutes);
app.use("/api/user", userRoute)
app.use("/api/Interiorbanner", interiorbanner)
app.use('/api/solution', solutionRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/interiorportfolio', interiorPortfolioRoutes);

app.use('/api/admin', adminRoutes);
app.use('/api/pagenames', pageNameRoutes);
app.use('/api/media-sections', mediaSectionRoutes);
app.use('/api/music-names', musicNameRoutes);
app.use('/api/music-sections', musicSectionRoutes);
app.use('/api/productions', productionRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/released-movies', releasedMovieRoutese);
app.use('/api/upcoming-movies', upcomingMovieRoutes);
app.use('/api/pass-movies', passMovieRoutes);
app.use('/api/video-grid-home', videoGridHomeRoutes);
app.use('/api/contact-info', contactInfoRoutes);
app.use('/api/map-embed', mapEmbedRoutes); 
 
// app.get('/', (req, res) => {
//   res.send('🚀 Exquisite Backend is Running');
// });
 
app.use(express.static(path.join(__dirname, 'build'))); // Change 'build' to your frontend folder if needed

// Redirect all requests to the index.html file

app.get("*", (req, res) => {
  return  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server (use default port 5000 when PORT is not set)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});     
module.exports = app; 
