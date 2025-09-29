import API_BASE_URL from './app/apiConfig';

export const getImageUrl = (path) => {
  if (!path) return null;
  const filename = path.split(/[/\\]/).pop();
  return `${API_BASE_URL}/uploads/${filename}`;
};
