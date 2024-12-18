const Comment = require("../models/Comment");
const Candidate = require("../models/Candidate");

exports.addComment = async (req, res) => {
  const { candidateId, content } = req.body;

  try {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const comment = new Comment({
      user: req.user.id,
      candidate: candidateId,
      content,
    });
    await comment.save();
   
    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      candidate: req.params.candidateId,
    }).populate("user", "name");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate(
      "user",
      "name"
    );
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};