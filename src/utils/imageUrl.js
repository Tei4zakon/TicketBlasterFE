export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http://')) {
    return imagePath;
  }
  
  if (imagePath.startsWith('/')) {
    return `http://127.0.0.1:8080${imagePath}`;
  }
  
  return imagePath;
};
