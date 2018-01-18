import mongoose from 'mongoose';

export function init() {
    console.log('connecting ', process.env.db);
    mongoose.connect(process.env.db);
}