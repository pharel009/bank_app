import pkg from "pg";
import { config } from "./env.js";

const { Pool } = pkg;

const pool = new Pool({
    connectionString: config.db.database_url, 
    ssl: {
        rejectUnauthorized: false  // Required for Supabase
    }
});

// Check DB connection at startup
export const connectToDB = async () => {
    try {
      const client = await pool.connect();
      console.log("✅ Connected to supabase DB successfully");
      client.release(); // Always release the client
    } catch (err) {
      console.error("❌ Database connection failed:", err.message);
    }
  };

// Query the database
export const executeQuery = async (query, values = []) => {
    let client;
    try {
        client = await pool.connect(); // obtain a connection from the pool 
        const result = await client.query(query, values); // execute the query
        return result.rows; // return the rows from the result
    } catch (err) {
        console.error("Error executing query", err);
        throw err;
    } finally {
        client.release();
    }
};





// using promises to connet to database and execute query
// export const executeQuery = (query, values = []) => {

//     return new Promise((resolve, reject) => {
//         pool.connect((err, conn, done) => {
//             if (err) {
//                 console.error("Error creating database connection", err.stack);
//                 return reject(err);
//             }

//             conn.query(query, values, (err, results) => {
//                 done();
//                 if(err) {
//                     console.error("Error executing query", err);
//                     return reject(err);
//                 }
//                 return resolve(results.rows);
//             })
//         })
//     })
// };