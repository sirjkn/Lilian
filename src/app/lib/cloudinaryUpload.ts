// Cloudinary upload utility

interface CloudinaryUploadResponse {
  url: string;
  secureUrl: string;
  publicId: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

/**
 * Uploads an image to Cloudinary
 * @param dataUrl - Base64 data URL of the image
 * @param cloudName - Your Cloudinary cloud name
 * @param uploadPreset - Your Cloudinary upload preset
 * @returns Promise with Cloudinary response containing the image URL
 */
export async function uploadToCloudinary(
  dataUrl: string,
  cloudName: string = 'demo', // Replace with your cloud name
  uploadPreset: string = 'ml_default' // Replace with your upload preset
): Promise<CloudinaryUploadResponse> {
  const formData = new FormData();
  
  // Convert data URL to blob
  const blob = await fetch(dataUrl).then(res => res.blob());
  
  formData.append('file', blob);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', 'skyway-suites'); // Optional: organize uploads in folders
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Upload failed');
    }

    const data = await response.json();
    
    return {
      url: data.url,
      secureUrl: data.secure_url,
      publicId: data.public_id,
      format: data.format,
      width: data.width,
      height: data.height,
      bytes: data.bytes,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}

/**
 * Gets Cloudinary configuration from environment or settings
 */
export function getCloudinaryConfig() {
  // Try to get from environment variables first
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  
  // Fall back to localStorage (saved from settings)
  const savedCloudName = localStorage.getItem('cloudinary_cloud_name');
  const savedUploadPreset = localStorage.getItem('cloudinary_upload_preset');
  
  return {
    cloudName: cloudName || savedCloudName || '',
    uploadPreset: uploadPreset || savedUploadPreset || '',
  };
}

/**
 * Saves Cloudinary configuration to localStorage
 */
export function saveCloudinaryConfig(cloudName: string, uploadPreset: string) {
  localStorage.setItem('cloudinary_cloud_name', cloudName);
  localStorage.setItem('cloudinary_upload_preset', uploadPreset);
}
