require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const routes_users = require("./routes/routes_users");
const routes_albums = require("./routes/routes_albums");
const routes_artists = require("./routes/routes_artists");
const routes_playlists = require("./routes/routes_playlists");

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const uri = process.env.MONGODB_URI;

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB Atlas");
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB Atlas:", err);
	});

// Routes
app.use("/api/users", routes_users);
app.use("/api/albums", routes_albums);
app.use("/api/artists", routes_artists);
app.use("/api/playlists", routes_playlists);

// Handle 404 errors
app.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});

// Error handling
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
