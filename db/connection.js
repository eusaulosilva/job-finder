const Sequelize = require('sequelize');
const pg = require('pg'); // <--- Importamos explicitamente

// A Vercel/Neon preenche a POSTGRES_URL automaticamente
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectModule: pg, // <--- Forçamos o Sequelize a usar este módulo
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;

