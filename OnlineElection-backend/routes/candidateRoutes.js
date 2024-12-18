const express = require("express");
const {
  getCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} = require("../controllers/candidateController");
const protect = require("../utils/auth");
const authorize = require("../utils/authorize");
const router = express.Router();

router
  .route("/")
  .get(getCandidates)
  .post(protect, authorize(["admin"]), createCandidate);
router
  .route("/:id")
  .get(getCandidateById)
  .put(protect, authorize(["admin"]), updateCandidate)
  .delete(protect, authorize(["admin"]), deleteCandidate);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Candidate:
 *       type: object
 *       required:
 *         - name
 *         - party
 *         - biography
 *         - electoralProgram
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the candidate
 *         name:
 *           type: string
 *           description: The name of the candidate
 *         party:
 *           type: string
 *           description: The party of the candidate
 *         biography:
 *           type: string
 *           description: The biography of the candidate
 *         electoralProgram:
 *           type: string
 *           description: The electoral program of the candidate
 *         profilePicture:
 *           type: string
 *           description: The profile picture URL of the candidate
 *       example:
 *         id: d5fE_asz
 *         name: Candidate One
 *         party: Party A
 *         biography: Biography of Candidate One
 *         electoralProgram: Electoral Program of Candidate One
 *         profilePicture: http://example.com/profile1.jpg
 */

/**
 * @swagger
 * tags:
 *   name: Candidates
 *   description: The candidates managing API
 */

/**
 * @swagger
 * /api/candidates:
 *   get:
 *     summary: Returns the list of all the candidates
 *     tags: [Candidates]
 *     responses:
 *       200:
 *         description: The list of the candidates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Candidate'
 *   post:
 *     summary: Create a new candidate
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidate'
 *     responses:
 *       201:
 *         description: The candidate was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/candidates/{id}:
 *   get:
 *     summary: Get the candidate by id
 *     tags: [Candidates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidate id
 *     responses:
 *       200:
 *         description: The candidate description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       404:
 *         description: The candidate was not found
 *       500:
 *         description: Some server error
 *   put:
 *     summary: Update the candidate by id
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidate id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Candidate'
 *     responses:
 *       200:
 *         description: The candidate was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       400:
 *         description: Validation error
 *       404:
 *         description: The candidate was not found
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Delete the candidate by id
 *     tags: [Candidates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidate id
 *     responses:
 *       200:
 *         description: The candidate was successfully deleted
 *       404:
 *         description: The candidate was not found
 *       500:
 *         description: Some server error
 */
