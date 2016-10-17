const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mokryi_course_app',
  port: process.env.PORT || 8000,
  UPLOADS_DIR: process.env.UPLOADS_DIR || '../uploads',
  JWT_TOKEN: process.env.JWT_TOKEN || 'schtanySorokGryven'
};

export default config;
