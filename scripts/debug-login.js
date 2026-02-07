const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local because we don't know if dotenv is available in this environment
function loadEnv() {
    const envPath = path.join(__dirname, '../.env.local');
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        content.split('\n').forEach(line => {
            const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
            if (match) {
                let value = match[2] || '';
                // Remove surrounding quotes
                if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
                if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
                process.env[match[1]] = value;
            }
        });
    }
}

async function debug() {
    loadEnv();
    console.log("--- Environment Variable Diagnostic ---");
    const initialPass = process.env.INITIAL_ADMIN_PASSWORD;
    const approvalPass = process.env.APPROVAL_PASSWORD;

    console.log(`INITIAL_ADMIN_PASSWORD value: [${initialPass}]`);
    console.log(`INITIAL_ADMIN_PASSWORD length: ${initialPass ? initialPass.length : 'undefined'}`);

    console.log(`APPROVAL_PASSWORD value: [${approvalPass}]`);
    console.log(`APPROVAL_PASSWORD length: ${approvalPass ? approvalPass.length : 'undefined'}`);

    console.log("\n--- Database Diagnostic ---");
    if (!process.env.DATABASE_URL) {
        console.error("DATABASE_URL not found in .env.local");
        return;
    }

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        const res = await client.query(`
            SELECT * FROM approved_admins WHERE email IN (
                'aliraza.dev.crusader@gmail.com',
                'mabdulrasheedtalal@gmail.com'
            );
        `);
        console.log("Initial Admins in DB:");
        console.table(res.rows);

        const resRequests = await client.query("SELECT * FROM pending_requests;");
        console.log("\nPending Requests in DB:");
        console.table(resRequests.rows);

    } catch (err) {
        console.error("Database error:", err);
    } finally {
        await client.end();
    }
}

debug();
