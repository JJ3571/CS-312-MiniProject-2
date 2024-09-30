// --- Express Setup ---
import express from "express";
const app = express();
const port = 3000;



// --- Directory/Path Setup ---
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname + '/public'));



// --- Cors Setup --- 
import cors from "cors";

const corsOptions = {
    origin: 'localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))



// --- Body Parser Setup ---
import bodyparser from "body-parser";
app.use(bodyparser.urlencoded({ extended: true }));



// --- Environment Variables ---
import dotenv from 'dotenv'
dotenv.config();
const OMDB_API_KEY = process.env.OMDB_API_KEY;



// --- EJS Rendering & Templates ---
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// --- Axios & Page Routes ---
import axios from 'axios'

app.get('/', (req, res) => {
    res.render('index', { movie: null, error: null }); // Movie needs to be null to avoid an immediate error!
});

app.get('/movie', (req, res) => { // Redirect route
    res.redirect('/');
});

app.post('/movie', async (req, res) => {
    const title = req.body.title;
    if (!title) {                 // If no title is entered, redirect to the home page
        return res.redirect('/');
    }

    const apiKey = OMDB_API_KEY;
    const url = `http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const movie = response.data;
        const posterUrl = `http://img.omdbapi.com/?i=${movie.imdbID}&h=600&apikey=${apiKey}`;
        res.render('index', { movie: movie, poster: posterUrl, error: null });
    } catch (error) {
        res.render('index', { movie: null, poster: null, error: 'Error, please try again' });
    }
});


// --- Server Start ---
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});