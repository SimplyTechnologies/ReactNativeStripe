import express from 'express';

const api = express();

require('./users.model');
require('./users.routes').init(api);


export default api;
