import { v2 } from 'cloudinary';
import { REPOSITORY } from 'src/constants';

export const CloudinaryProvider = {
  provide: REPOSITORY.CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
