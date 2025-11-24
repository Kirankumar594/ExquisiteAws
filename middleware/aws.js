import dotenv from "dotenv";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// ES module equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Get the base URL based on environment (localhost for local, domain for production)
 * @returns {String} - Base URL for file access
 */
const getBaseUrl = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction && process.env.DOMAIN_NAME) {
    // Use domain name in production
    return process.env.DOMAIN_NAME.startsWith('http') 
      ? process.env.DOMAIN_NAME 
      : `https://${process.env.DOMAIN_NAME}`;
  } else {
    // Use localhost in development
    const port = process.env.PORT || 5000;
    return `http://localhost:${port}`;
  }
};

/**
 * Extract file path from URL
 * @param {String} url - Full file URL
 * @returns {String} - Local file path
 */
const getFilePathFromUrl = (url) => {
  try {
    // Extract the path after the domain/port
    const urlObj = new URL(url);
    const relativePath = urlObj.pathname;
    
    // Remove leading slash and get the file path
    const filePath = path.join(__dirname, '..', relativePath.startsWith('/') ? relativePath.slice(1) : relativePath);
    return filePath;
  } catch (error) {
    throw new Error(`Invalid file URL: ${url}`);
  }
};

/**
 * Upload a file from express-multer middleware to local upload directory
 * @param {Object} file - File object from multer
 * @param {String} bucketname - Folder name within the uploads directory (optional)
 * @returns {Promise<String>} - URL of the uploaded file
 */
export const uploadFile2 = async (file, bucketname) => {
  try {
    // Handle case where bucketname is not provided or is empty
    const folderName = bucketname && bucketname.trim() !== '' ? bucketname.trim() : 'default';
    
    // Create upload directory path
    const uploadDir = path.join(__dirname, '..', 'uploads', folderName);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.originalname}`;
    const filePath = path.join(uploadDir, fileName);
    
    // Write file to local directory
    fs.writeFileSync(filePath, file.buffer);
    
    // Generate URL
    const baseUrl = getBaseUrl();
    const relativePath = `uploads/${folderName}/${fileName}`;
    const fileUrl = `${baseUrl}/${relativePath}`;
    
    console.log(`File uploaded locally: ${fileUrl}`);
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error(`File upload failed: ${error.message}`);
  }
};

/**
 * Delete a file from local upload directory
 * @param {String} url - Full URL of the file to delete
 * @returns {Promise<Object>} - Result of the delete operation
 */
export const deleteFile = async (url) => {
  try {
    const filePath = getFilePathFromUrl(url);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    // Delete the file
    fs.unlinkSync(filePath);
    console.log(`File deleted successfully: ${filePath}`);
    return { success: true, message: 'File deleted successfully' };
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error(`Error deleting file: ${error.message}`);
  }
};

/**
 * Update a file in local upload directory (delete and upload new version)
 * @param {String} url - Full URL of the file to update
 * @param {Object} newFile - New file object to upload
 * @returns {Promise<String>} - URL of the updated file
 */
export const updateFile = async (url, newFile) => {
  try {
    const oldFilePath = getFilePathFromUrl(url);
    
    // Extract folder name from the old file path
    const uploadsIndex = oldFilePath.indexOf('uploads');
    if (uploadsIndex === -1) {
      throw new Error('Invalid file path: must be in uploads directory');
    }
    
    const relativePath = oldFilePath.substring(uploadsIndex);
    const pathParts = relativePath.split(path.sep);
    const folderName = pathParts[1]; // uploads/folderName/filename
    
    // Delete the old file if it exists
    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }
    
    // Upload the new file with the same folder structure
    return await uploadFile2(newFile, folderName);
  } catch (error) {
    console.error("Error updating file:", error);
    throw new Error(`Error updating file: ${error.message}`);
  }
};

/**
 * Upload multiple files to local upload directory
 * @param {Array<Object>} files - Array of file objects from multer
 * @param {String} bucketname - Folder name within the uploads directory (optional)
 * @returns {Promise<Array<String>>} - Array of URLs of the uploaded files
 */
export const multifileUpload = async (files, bucketname) => {
  try {
    const uploadPromises = files.map(async (file) => {
      return await uploadFile2(file, bucketname);
    });
    
    return Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error uploading multiple files:", error);
    throw new Error(`Error uploading multiple files: ${error.message}`);
  }
};

export default { 
  uploadFile2, 
  deleteFile, 
  updateFile, 
  multifileUpload 
};
