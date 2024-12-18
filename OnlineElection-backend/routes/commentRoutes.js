const express = require("express");
const {
  addComment,
  getComments,
  getCommentById,
} = require("../controllers/commentController");
const { protect } = require("../utils/authMiddleware");
const router = express.Router();

router.route("/").post(protect, addComment);
router.route("/:candidateId").get(getComments);
router.route("/comment/:id").get(getCommentById);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - user
 *         - candidate
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         user:
 *           type: string
 *           description: The ID of the user who made the comment
 *         candidate:
 *           type: string
 *           description: The ID of the candidate being commented on
 *         content:
 *           type: string
 *           description: The content of the comment
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the comment was created
 *       example:
 *         id: d5fE_asz
 *         user: 60d0fe4f5311236168a109ca
 *         candidate: 60d0fe4f5311236168a109cb
 *         content: This is a comment.
 *         createdAt: 2024-11-15T15:16:07.557Z
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The comments managing API
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
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
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: The comment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/comments/{candidateId}:
 *   get:
 *     summary: Get comments by candidate id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidate id
 *     responses:
 *       200:
 *         description: The list of comments for the candidate
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: The candidate was not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/comments/comment/{id}:
 *   get:
 *     summary: Get the comment by id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     responses:
 *       200:
 *         description: The comment description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: The comment was not found
 *       500:
 *         description: Some server error
 */
