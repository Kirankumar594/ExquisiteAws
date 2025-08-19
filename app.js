import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bannerRoutes from './routes/bannerRoutes.js';
import propertyRoute from './routes/propertyRoutes.js';
import topProjectRoutes from './routes/topProjectRoutes.js';
import clientRoutes from "./routes/clientRoutes.js";
import galleryRoutes from './routes/galleryRoutes.js';
import projectRoute from "./routes/projectRoutes.js";
import userRoute from "./routes/userMessageRoutes.js";
import BannerAboutR from './routes/BannerAboutR.js';
import communityAboutRoutes from './routes/communityAboutRoutes.js';
import interiorbanner from "./routes/InteriorBannerRoute.js"
import solutionRoutes from './routes/solutionRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import interiorPortfolioRoutes from './routes/interiorPortfolioRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
// import bannerRoutes from './routes/bannerRoutes.js';
import pageNameRoutes from './routes/pageNameRoutes.js'
import videoSectionRoutes from './routes/videoSectionRoutes.js'
import productionRoutes from './routes/productionRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
import releasedMovieRoutese from './routes/releasedMovieRoutese.js'
import videoGridHomeRoutes from './routes/videoGridHomeRoutes.js'
import contactInfoRoutes from './routes/contactInfoRoutes.js';
import mapEmbedRoutes from './routes/mapEmbedRoutes.js';
import upcomingMovieRoutes from './routes/upcomingMovieRoutes.js';
import passMovieRoutes from './routes/passMovieRoutes.js'
import musicNameRoutes from './routes/musicNameRoutes.js'
import musicSectionRoutes from './routes/musicSectionRoutes.js'

// ES module equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // To serve images
app.use('/uploads/office-images', express.static(path.join(__dirname, 'uploads/office-images')));

// Import routes
import adminloginRoutes from './routes/adminloginRoutes.js';
import statRoutes from './routes/statRoutes.js';
import investmentRoutes from './routes/investmentRoutes.js';
import contactBlockRoutes from './routes/contactBlockRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import consultationRoutes from './routes/consultationRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import officeRoutes from './routes/officeRoutes.js';

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
app.use('/api/videosections', videoSectionRoutes);
app.use('/api/productions', productionRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/released-movies', releasedMovieRoutese);
app.use('/api/video-grid-home', videoGridHomeRoutes);
app.use('/api/contact-info', contactInfoRoutes);
app.use('/api/map-embed', mapEmbedRoutes);
app.use('/api/upcoming-movies', upcomingMovieRoutes);
app.use('/api/pass-movies', passMovieRoutes);
app.use('/api/music-names', musicNameRoutes);
app.use('/api/music-sections', musicSectionRoutes);   
 
app.get('/', (req, res) => {
  res.send('🚀 Exquisite Backend is Running');
});


// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export default app;