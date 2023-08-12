const mysql = require('mysql2/promise');
require('dotenv').config()

const pool = mysql.createPool({
    //connectionLimit : 10, // ALTERAR MAIS TARDE PARA ESCALABILIDADE
    host: process.env.DB_IP,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});

// CRUD
function crud() {
    const pool = mysql.createPool({
        //connectionLimit : 10, // ALTERAR MAIS TARDE PARA ESCALABILIDADE
        host: process.env.DB_IP,
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME
    });
    return {
        insert: async function(table, rows, values) { 
            // let query = 'INSERT INTO ? (?) VALUES (?)'
            let query = `INSERT INTO ${table} (${rows}) VALUES (${values})`;
            let params = [table, rows, values]
            try {
                await pool.query(query, params)            
            } catch (error) {
                console.error('Erro ao executar insert:', error)
            }
            pool.end();
        },
        select: async function(table, rows) {
            let query = `SELECT ${rows} FROM ${table}`
            // let params = [rows, table]
            try {
                promise = await pool.query(query);
                return promise;
            } catch (error) {
                console.error('Erro ao executar select:', error)
            }
            pool.end();
        },
        selectWhere: async function(table, rows, condition) {
            let query = `SELECT ${rows} FROM ${table} WHERE ${condition}`
            // let params = [rows, table]
            try {
                promise = await pool.query(query)
                return promise
            } catch (error) {
                console.error('Erro ao executar select:', error)
            }
            pool.end();
        },
        update: async function(table, set, condition) {
            let query = `UPDATE ${table} SET ${set} WHERE ${condition}`;
            try {
                await pool.query(query)
            } catch (error) {
                console.error('Erro ao executar update:', error)
            }
            pool.end();
        },
        delete: async function(table, condition) {
            let query = 'DELETE FROM ? WHERE ?'
            let params = [table, condition]
            try {
                await pool.query(query, params)
            } catch (error) {
                console.error('Erro ao executar delete:', error)
            }
            pool.end();
        }
    }
}

module.exports = { crud }