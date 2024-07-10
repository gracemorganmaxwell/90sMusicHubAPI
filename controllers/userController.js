const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup User
exports.signupUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ email, password: hashedPassword });
		await newUser.save();
		res
			.status(201)
			.json({ message: "User created successfully", user: newUser });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Login User
exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid password" });
		}
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		res.status(200).json({ message: "Authentication successful", token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
