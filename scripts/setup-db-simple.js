const { Client } = require('pg');

async function setup() {
    const client = new Client({
        connectionString: "postgresql://neondb_owner:npg_EKpet7Nn2rjP@ep-wandering-smoke-a10567k7-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
    });

    try {
        await client.connect();
        console.log("Connected to database");

        // Clear old tables first if they conflict
        await client.query('DROP TABLE IF EXISTS admin_activity_logs, admin_sessions, admin_approvals, admin_requests, admin_users CASCADE;');

        // Create Tables
        await client.query(`
      CREATE TABLE IF NOT EXISTS approved_admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        approved_by VARCHAR(255),
        approved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS pending_requests (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log("Tables created successfully");

        // Insert Initial Admins
        await client.query(`
      INSERT INTO approved_admins (email, approved_by) 
      VALUES 
      ('aliraza.dev.crusader@gmail.com', 'system'),
      ('mabdulrasheedtalal@gmail.com', 'system')
      ON CONFLICT (email) DO NOTHING;
    `);
        console.log("Initial admins seeded");

    } catch (err) {
        console.error("Setup failed:", err);
    } finally {
        await client.end();
    }
}

setup();
