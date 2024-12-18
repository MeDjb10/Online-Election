const express = require("express");
const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require("../controllers/favoritesController");
const { protect } = require("../utils/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getFavorites);
router
  .route("/:candidateId")
  .post(protect, addFavorite)
  .delete(protect, removeFavorite);

module.exports = router;


/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       required:
 *         - candidateId
 *       properties:
 *         candidateId:
 *           type: string
 *           description: The ID of the candidate to be added to favorites
 *       example:
 *         candidateId: 60d0fe4f5311236168a109ca
 */

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: The favorites managing API
 */

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Get favorite candidates
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of favorite candidates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the candidate
 *                   name:
 *                     type: string
 *                     description: The name of the candidate
 *                   party:
 *                     type: string
 *                     description: The party of the candidate
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/favorites/{candidateId}:
 *   post:
 *     summary: Add a candidate to favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the candidate to be added to favorites
 *     responses:
 *       201:
 *         description: Candidate added to favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Candidate already in favorites
 *       404:
 *         description: Candidate not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Remove a candidate from favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the candidate to be removed from favorites
 *     responses:
 *       200:
 *         description: Candidate removed from favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Candidate not in favorites
 *       500:
 *         description: Server error
 */
