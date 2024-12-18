const express = require("express");
const { getElectionResults } = require("../controllers/resultsController");
const router = express.Router();

router.route("/:electionId").get(getElectionResults);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Results
 *   description: The election results managing API
 */

/**
 * @swagger
 * /api/results:
 *   get:
 *     summary: Get election results
 *     tags: [Results]
 *     responses:
 *       200:
 *         description: The list of election results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   candidate:
 *                     type: string
 *                     description: The name of the candidate
 *                   party:
 *                     type: string
 *                     description: The party of the candidate
 *                   votes:
 *                     type: integer
 *                     description: The number of votes the candidate received
 *       500:
 *         description: Server error
 */