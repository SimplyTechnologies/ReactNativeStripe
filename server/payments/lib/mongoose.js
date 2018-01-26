import mongoose from 'mongoose';

const dbConnection = `${process.env.MONGO_URI || 'mongodb://localhost:27017'}/stripe_integration`;

export function init() {
    console.log('connecting ', dbConnection);
    mongoose
        .connect(dbConnection)
        .then((res) => console.log('Connection established'))
        .catch(console.error);
}