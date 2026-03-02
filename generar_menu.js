const { Pool } = require('pg');
const fs = require('fs');

// Configuración de tu DB en Rocky Linux
const pool = new Pool({
  user: 'admin_sql',
  host: 'localhost',
  database: 'restaurante_gestion',
  password: 'rh831203JJ', // Pónle tu contraseña real
  port: 5432,
});

async function sincronizar() {
  try {
    console.log("conectando a la base de datos...");
    
    // Consulta según tus tablas: solo productos con stock > 0
    const query = `
      SELECT nombre, precio, descripcion, categoria 
      FROM productos 
      WHERE stock > 0 
      ORDER BY categoria ASC
    `;
    
    const res = await pool.query(query);
    
    // Guardamos el JSON en la misma carpeta
    fs.writeFileSync('productos.json', JSON.stringify(res.rows, null, 2));
    
    console.log(`✅ ¡Éxito! Se exportaron ${res.rows.length} productos a productos.json`);
    
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    pool.end();
  }
}

sincronizar();