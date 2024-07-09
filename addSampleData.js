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

		const sampleAlbums = [
			{
				id: "1",
				name: "Thriller",
				artist: "Michael Jackson",
				releaseDate: new Date("1982-11-30"),
			},
			{
				id: "2",
				name: "Back in Black",
				artist: "AC/DC",
				releaseDate: new Date("1980-07-25"),
			},
			{
				id: "3",
				name: "The Dark Side of the Moon",
				artist: "Pink Floyd",
				releaseDate: new Date("1973-03-01"),
			},
		];

		const sampleArtists = [
			{ id: "1", name: "Michael Jackson", genre: "Pop" },
			{ id: "2", name: "AC/DC", genre: "Rock" },
			{ id: "3", name: "Pink Floyd", genre: "Progressive Rock" },
		];

		const samplePlaylists = [
			{ id: "1", name: "Top Hits", tracks: ["Thriller", "Back in Black"] },
			{
				id: "2",
				name: "Rock Classics",
				tracks: ["Back in Black", "Comfortably Numb"],
			},
			{
				id: "3",
				name: "Best of the 80s",
				tracks: ["Thriller", "Back in Black"],
			},
		];

		const sampleUsers = [
			{
				id: "1",
				email: "samuel.smith@test.com",
				password: await bcrypt.hash("password123", 10),
			},
			{
				id: "2",
				email: "stefani.germanotta@test.com",
				password: await bcrypt.hash("password123", 10),
			},
			{
				id: "3",
				email: "adele.adkins@test.com",
				password: await bcrypt.hash("password123", 10),
			},
			{
				id: "4",
				email: "jelena.hadid@test.com",
				password: await bcrypt.hash("password123", 10),
			},
		];

		try {
			await Album.deleteMany({});
			await Artist.deleteMany({});
			await Playlist.deleteMany({});
			await User.deleteMany({});

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
