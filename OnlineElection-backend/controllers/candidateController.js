const Joi = require("joi");
const Candidate = require("../models/Candidate");

const candidateSchema = Joi.object({
  name: Joi.string().required(),
  party: Joi.string().required(),
  biography: Joi.string().required(),
  electoralProgram: Joi.string().required(),
  profilePicture: Joi.string().uri().optional(),
});

exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createCandidate = async (req, res) => {
  const { error } = candidateSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.status(201).json(candidate);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateCandidate = async (req, res) => {
  const { error } = candidateSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    candidate.name = req.body.name || candidate.name;
    candidate.party = req.body.party || candidate.party;
    candidate.biography = req.body.biography || candidate.biography;
    candidate.electoralProgram =
      req.body.electoralProgram || candidate.electoralProgram;
    candidate.profilePicture =
      req.body.profilePicture || candidate.profilePicture;

    await candidate.save();
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteCandidate = async (req, res) => {
  try {
    console.log("Received request to delete candidate with ID:", req.params.id);
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      console.log("Candidate not found");
      return res.status(404).json({ message: "Candidate not found" });
    }

    await Candidate.deleteOne({ _id: req.params.id });
    console.log("Candidate removed successfully");
    res.json({ message: "Candidate removed" });
  } catch (err) {
    console.error("Error deleting candidate:", err);
    res.status(500).json({ message: "Server Error" });
  }
};