import pkg from "pg";
import { config } from "./env.js";

const { Pool } = pkg;

const pool = new Pool({
    max: 100,
    host: config.db.host,
    user: config.db.user,
    database: config.db.name,
    password: config.db.password,
    port: config.db.port
});

//using async and await to connect to database and execute query
export const executeQuery = async (query, values = []) => {   
    try {
        const client = await pool.connect(); // obtain a connection from the pool 

        const result = await client.query(query, values); // execute the query

        return result.rows; // return the rows from the result
    } catch (err) {
        console.error("Error executing query", err);
        throw err;
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