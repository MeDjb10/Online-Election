const User = require("../models/User");
const Candidate = require("../models/Candidate");

exports.addFavorite = async (req, res) => {
  const { candidateId } = req.params;

  try {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const user = await User.findById(req.user.id);
    if (user.favorites.includes(candidateId)) {
      return res
        .status(400)
        .json({ message: "Candidate already in favorites" });
    }

    user.favorites.push(candidateId);
    await user.save();

    res.status(201).json({ message: "Candidate added to favorites" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.removeFavorite = async (req, res) => {
  const { candidateId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    if (!user.favorites.includes(candidateId)) {
      return res.status(400).json({ message: "Candidate not in favorites" });
    }

    user.favorites = user.favorites.filter(
      (id) => id.toString() !== candidateId
    );
    await user.save();

    res.status(200).json({ message: "Candidate removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "favorites",
      "name party"
    );
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
