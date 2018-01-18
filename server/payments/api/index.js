import express from 'express';

const api = express();

require('./payments.routes').init(api);

export default api;