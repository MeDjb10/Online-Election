const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");

const castVote = async (req, res) => {
  const { candidateId } = req.body;
  console.log("Received vote request for candidate:", candidateId);

  try {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      console.log("Candidate not found");
      return res.status(404).json({ message: "Candidate not found" });
    }

    const existingVote = await Vote.findOne({ user: req.user.id });
    if (existingVote) {
      console.log("User has already voted");
      return res.status(400).json({ message: "User has already voted" });
    }

    const vote = new Vote({ user: req.user.id, candidate: candidateId });
    await vote.save();
    console.log("Vote saved successfully");

    res.status(201).json({ message: "Vote cast successfully" });
  } catch (err) {
    console.error("Error casting vote:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getVotes = async (req, res) => {
  try {
    const votes = await Vote.find().populate("candidate", "name party");
    res.json(votes);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getUserVotes = async (req, res) => {
  try {
    const votes = await Vote.find({ user: req.user.id }).populate(
      "candidate",
      "name party"
    );
    res.json(votes);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getVotesByCandidate = async (req, res) => {
  const { candidateId } = req.params;
  try {
    const votes = await Vote.find({ candidate: candidateId }).populate(
      "user",
      "name"
    );
    res.json(votes);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { castVote, getVotes, getUserVotes, getVotesByCandidate };
