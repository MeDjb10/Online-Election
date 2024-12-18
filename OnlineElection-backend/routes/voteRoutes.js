const express = require("express");
const {
  castVote,
  getVotes,
  getUserVotes,
  getVotesByCandidate,
} = require("../controllers/voteController");
const { protect } = require("../utils/authMiddleware");
const router = express.Router();

router.route("/").post(protect, castVote).get(protect, getVotes);
router.route("/user").get(protect, getUserVotes);
router.route("/candidate/:candidateId").get(protect, getVotesByCandidate);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Vote:
 *       type: object
 *       required:
 *         - user
 *         - candidate
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user who cast the vote
 *         candidate:
 *           type: string
 *           description: The ID of the candidate who received the vote
 *       example:
 *         user: 60d0fe4f5311236168a109ca
 *         candidate: 60d0fe4f5311236168a109cb
 */

/**
 * @swagger
 * tags:
 *   name: Votes
 *   description: The votes managing API
 */

/**
 * @swagger
 * /api/votes:
 *   post:
 *     summary: Cast a vote
 *     tags: [Votes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               candidateId:
 *                 type: string
 *             example:
 *               candidateId: 60d0fe4f5311236168a109cb
 *     responses:
 *       201:
 *         description: Vote cast successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: User has already voted or invalid candidate ID
 *       404:
 *         description: Candidate not found
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get all votes
 *     tags: [Votes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of votes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vote'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/votes/user:
 *   get:
 *     summary: Get votes for the authenticated user
 *     tags: [Votes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of votes for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vote'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/votes/candidate/{candidateId}:
 *   get:
 *     summary: Get votes by candidate ID
 *     tags: [Votes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidate ID
 *     responses:
 *       200:
 *         description: The list of votes for the candidate
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vote'
 *       500:
 *         description: Server error
 */
