export const CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET || 'STUB_JWT_SECRET',
  SERVER_PORT: process.env.PORT || 8000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/mobyourlife',
};
