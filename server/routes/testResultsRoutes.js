const express = require("express");
const router = express.Router();
const TestResult = require("../models/testResult");
const auth = require("./authMiddleware"); // Ensure the path is correct

router.post("/", auth, async (req, res) => {
    try {
        const userId = req.user._id;

        const { answers, score, category } = req.body;
        
        const testResult = new TestResult({
            userId,
            answers,
            score,
            category
        });

        await testResult.save();
        res.status(201).json({ message: "Test result saved successfully." });
    } catch (error) {
        console.error("Error while saving test result:", error);
        res.status(500).json({ error: "Failed to save test result." });
    }
});

router.get('/myresults', auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const results = await TestResult.find({ userId: userId });
        
        res.status(200).send(results);
    } catch (error) {
        console.error("Error fetching user results:", error);
        res.status(500).send({ error: "Failed to fetch user results." });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const resultId = req.params.id;
        
        const testResult = await TestResult.findById(resultId);
        if (!testResult) return res.status(404).send({ message: "Test result not found." });

        // Check if the test result belongs to the logged-in user
        if (testResult.userId.toString() !== userId) {
            return res.status(403).send({ message: "Unauthorized action." });
        }

        await TestResult.findByIdAndDelete(resultId);
        res.status(200).send({ message: "Test result deleted successfully." });
    } catch (error) {
        console.error("Error while deleting test result:", error);
        res.status(500).send({ error: "Failed to delete test result." });
    }
});


module.exports = router;
