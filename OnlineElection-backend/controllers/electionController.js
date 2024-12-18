const Election = require("../models/Election");
const Candidate = require("../models/Candidate");

exports.createElection = async (req, res) => {
  const { title, startDate, endDate, candidates } = req.body;

  try {
    const election = new Election({
      title,
      startDate,
      endDate,
      candidates,
    });

    await election.save();
    res.status(201).json(election);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllElections = async (req, res) => {
  try {
    const elections = await Election.find().populate(
      "candidates",
      "name party"
    );
    res.json(elections);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getElectionById = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id).populate(
      "candidates",
      "name party"
    );
    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }
    res.json(election);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateElection = async (req, res) => {
  const { title, startDate, endDate, isActive, candidates } = req.body;

  try {
    const election = await Election.findById(req.params.id);
    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }

    election.title = title || election.title;
    election.startDate = startDate || election.startDate;
    election.endDate = endDate || election.endDate;
    election.isActive = isActive !== undefined ? isActive : election.isActive;
    election.candidates = candidates || election.candidates;

    await election.save();
    res.json(election);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteElection = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }

    await election.remove();
    res.json({ message: "Election removed" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
