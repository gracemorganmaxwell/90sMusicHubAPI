require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Album = require("./models/album");
const Artist = require("./models/artist");
const Playlist = require("./models/playlist");
const User = require("./models/user");

const uri = process.env.MONGODB_URI;

mongoose.set("strictQuery", true);

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(async () => {
		console.log("Connected to MongoDB Atlas");

		// Sample Data
		const sampleAlbums = [
			{
				name: "Thriller",
				artist: "Michael Jackson",
				releaseDate: new Date("1982-11-30"),
			},
			{
				name: "Back in Black",
				artist: "AC/DC",
				releaseDate: new Date("1980-07-25"),
			},
			{
				name: "The Dark Side of the Moon",
				artist: "Pink Floyd",
				releaseDate: new Date("1973-03-01"),
			},
		];

		const sampleArtists = [
			{ name: "Michael Jackson", genre: "Pop" },
			{ name: "AC/DC", genre: "Rock" },
			{ name: "Pink Floyd", genre: "Progressive Rock" },
		];

		const samplePlaylists = [
			{ name: "Top Hits", tracks: ["Thriller", "Back in Black"] },
			{ name: "Rock Classics", tracks: ["Back in Black", "Comfortably Numb"] },
			{ name: "Best of the 80s", tracks: ["Thriller", "Back in Black"] },
		];

		const sampleUsers = [
			{
				email: "samuel.smith@test.com",
				password: await bcrypt.hash("password123", 10),
			},
			{
				email: "stefani.germanotta@test.com",
				password: await bcrypt.hash("password123", 10),
			},
			{
				email: "adele.adkins@test.com",
				password: await bcrypt.hash("password123", 10),
			},
			{
				email: "jelena.hadid@test.com",
				password: await bcrypt.hash("password123", 10),
			},
		];

		try {
			await Album.insertMany(sampleAlbums);
			await Artist.insertMany(sampleArtists);
			await Playlist.insertMany(samplePlaylists);
			await User.insertMany(sampleUsers);

			console.log("Sample data added successfully");
		} catch (err) {
			console.error("Error adding sample data:", err);
		} finally {
			mongoose.connection.close();
		}
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB Atlas:", err);
	});
