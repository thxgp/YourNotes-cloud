/**
 * Supabase Database Service
 * Provides configured Supabase client for database operations
 */

const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

/**
 * Create a Supabase client with user context for RLS
 * This sets the user ID in the request context for Row Level Security
 * @param {string} userId - The authenticated user's ID
 * @returns {object} - Supabase client configured for the user
 */
function getClientForUser(userId) {
    return createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY,
        {
            global: {
                headers: {
                    "x-user-id": userId,
                },
            },
        }
    );
}

module.exports = {
    supabase,
    getClientForUser,
};
