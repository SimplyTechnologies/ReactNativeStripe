const config = {
  port: process.env.PORT || 3000,
  db: `${process.env.MONGO_URI || 'mongodb://localhost:27017'}/stripe_integration`
};

export default config;
