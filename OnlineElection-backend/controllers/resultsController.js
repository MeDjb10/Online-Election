const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");
const Election = require("../models/Election");

exports.getElectionResults = async (req, res) => {
  const { electionId } = req.params;

  try {
    const election = await Election.findById(electionId).populate(
      "candidates",
      "name party"
    );
    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }

    const results = await Vote.aggregate([
      {
        $match: { candidate: { $in: election.candidates.map((c) => c._id) } },
      },
      {
        $group: {
          _id: "$candidate",
          votes: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "candidates",
          localField: "_id",
          foreignField: "_id",
          as: "candidate",
        },
      },
      {
        $unwind: "$candidate",
      },
      {
        $project: {
          _id: 0,
          candidate: "$candidate.name",
          party: "$candidate.party",
          votes: 1,
        },
      },
      {
        $sort: { votes: -1 },
      },
    ]);

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
