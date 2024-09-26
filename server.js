// --- Express Setup ---
import express from "express";
const app = express();
const port = 3000;



// --- Directory/Path Setup ---
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname + '/public'));



// --- Body Parser Setup ---
import bodyparser from "body-parser";
app.use(bodyparser.urlencoded({ extended: true }));



// --- EJS Rendering & Templates ---
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



// --- Page Routes ---
app.get('/', (req, res) => {
    res.render('index');
});



// --- Server Start ---
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});