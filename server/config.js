const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mokryi_course_app',
  port: process.env.PORT || 8000,
  UPLOADS_DIR: process.env.UPLOADS_DIR || '../uploads',
};

export default config;
