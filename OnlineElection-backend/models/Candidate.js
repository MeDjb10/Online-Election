const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    party: { type: String, required: true },
    biography: { type: String, required: true },
    electoralProgram: { type: String, required: true },
    profilePicture: { type: String, required: false },
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", CandidateSchema);
module.exports = Candidate;
