const express = require('express');

const { auth } = require('express-oauth2-jwt-bearer');

const librosRouter = require('./routes/libros');

const errorHandler = require('./middlewares/errorHandler');

const jwtCheck = auth({
    audience: 'https://localhost:3000/api/libros',
    issuerBaseURL: 'https://dev-lkfqum3zbxve2law.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

const app = express();

app.use(express.json());

app.use(jwtCheck);

app.get("/", (req, res) => {
    res.send("API de libros");
});

app.use("/libros", librosRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API de libros escuchando en el puerto ${PORT}`);
});