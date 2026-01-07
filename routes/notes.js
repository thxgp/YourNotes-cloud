/**
 * Notes Routes
 * CRUD operations for user notes with Supabase RLS enforcement
 */

const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const { supabase } = require("../services/supabase");

/**
 * GET /api/notes
 * Get all notes for the authenticated user
 * RLS enforces that users can only see their own notes
 */
router.get("/", requireAuth, async (req, res) => {
    try {
        const userId = req.auth.userId;

        const { data, error } = await supabase
            .from("notes")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase error fetching notes:", error);
            return res.status(500).json({
                error: "Database error",
                message: "Failed to fetch notes",
            });
        }

        res.json({
            notes: data,
            count: data.length,
        });
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({
            error: "Server error",
            message: error.message,
        });
    }
});

/**
 * GET /api/notes/:id
 * Get a specific note by ID
 * RLS ensures user can only access their own notes
 */
router.get("/:id", requireAuth, async (req, res) => {
    try {
        const userId = req.auth.userId;
        const noteId = req.params.id;

        const { data, error } = await supabase
            .from("notes")
            .select("*")
            .eq("id", noteId)
            .eq("user_id", userId)
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                return res.status(404).json({
                    error: "Not found",
                    message: "Note not found or access denied",
                });
            }
            console.error("Supabase error:", error);
            return res.status(500).json({
                error: "Database error",
                message: "Failed to fetch note",
            });
        }

        res.json({ note: data });
    } catch (error) {
        console.error("Error fetching note:", error);
        res.status(500).json({
            error: "Server error",
            message: error.message,
        });
    }
});

/**
 * POST /api/notes
 * Create a new note for the authenticated user
 */
router.post("/", requireAuth, async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { title, content } = req.body;

        // Validate required fields
        if (!title || typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({
                error: "Validation error",
                message: "Title is required and must be a non-empty string",
            });
        }

        const { data, error } = await supabase
            .from("notes")
            .insert({
                user_id: userId,
                title: title.trim(),
                content: content?.trim() || null,
            })
            .select()
            .single();

        if (error) {
            console.error("Supabase error creating note:", error);
            return res.status(500).json({
                error: "Database error",
                message: "Failed to create note",
            });
        }

        res.status(201).json({
            message: "Note created successfully",
            note: data,
        });
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({
            error: "Server error",
            message: error.message,
        });
    }
});

/**
 * PUT /api/notes/:id
 * Update an existing note
 * Only owner can update
 */
router.put("/:id", requireAuth, async (req, res) => {
    try {
        const userId = req.auth.userId;
        const noteId = req.params.id;
        const { title, content } = req.body;

        const { data, error } = await supabase
            .from("notes")
            .update({
                title: title?.trim(),
                content: content // Don't trim HTML content blindly, keep structure
            })
            .eq("id", noteId)
            .eq("user_id", userId)
            .select()
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                return res.status(404).json({
                    error: "Not found",
                    message: "Note not found or you don't have permission to edit it.",
                });
            }
            console.error("Supabase error updating note:", error);
            return res.status(500).json({
                error: "Database error",
                message: "Failed to update note",
            });
        }

        res.json({
            message: "Note updated successfully",
            note: data,
        });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({
            error: "Server error",
            message: error.message,
        });
    }
});

/**
 * DELETE /api/notes/:id
 * Delete a note (only owner can delete)
 */
router.delete("/:id", requireAuth, async (req, res) => {
    try {
        const userId = req.auth.userId;
        const noteId = req.params.id;

        const { data, error } = await supabase
            .from("notes")
            .delete()
            .eq("id", noteId)
            .eq("user_id", userId)
            .select()
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                return res.status(404).json({
                    error: "Not found",
                    message: "Note not found or access denied",
                });
            }
            console.error("Supabase error:", error);
            return res.status(500).json({
                error: "Database error",
                message: "Failed to delete note",
            });
        }

        res.json({
            message: "Note deleted successfully",
            note: data,
        });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({
            error: "Server error",
            message: error.message,
        });
    }
});

module.exports = router;
