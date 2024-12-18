const Vote = require("../models/Vote");
const Election = require("../models/Election");
const { io } = require("../app");

const emitResultsUpdate = async (electionId) => {
  const election = await Election.findById(electionId).populate(
    "candidates",
    "name party"
  );
  if (!election) {
    return;
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

  io.emit("resultsUpdate", { electionId, results });
};

module.exports = emitResultsUpdate;
