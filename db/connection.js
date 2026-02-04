const Sequelize = require('sequelize');

// Cria a conexão usando a variável de ambiente que a Vercel criou automaticamente
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Necessário para conexões seguras na nuvem
        }
    }
});

module.exports = sequelize;
