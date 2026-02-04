const Sequelize = require('sequelize');
const sqlite3 = require('sqlite3');
const path = require('path');
const fs = require('fs');

// Caminho do banco original (pasta do projeto)
const dbPathOriginal = path.resolve(__dirname, 'app.db');
// Caminho do banco na pasta temporária (onde temos permissão de escrita)
const dbPathTemp = '/tmp/app.db';

// Se estiver rodando no Vercel, copiamos o banco para a pasta temporária
if (process.env.VERCEL) {
  try {
    // Só copia se ainda não existir lá (para evitar sobrescrever em execuções quentes)
    if (!fs.existsSync(dbPathTemp)) {
      if (fs.existsSync(dbPathOriginal)) {
        fs.copyFileSync(dbPathOriginal, dbPathTemp);
        console.log('Banco de dados copiado para /tmp com sucesso!');
      } else {
        console.log('Arquivo app.db original não encontrado!');
      }
    }
  } catch (err) {
    console.error('Erro ao copiar banco de dados:', err);
  }
}

// Define qual caminho usar: o temporário (no Vercel) ou o original (no seu PC)
const storagePath = process.env.VERCEL ? dbPathTemp : dbPathOriginal;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  dialectModule: sqlite3
});

module.exports = sequelize;
