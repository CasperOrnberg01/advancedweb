const db     = require('../config/db'); //tietokantayhteys poolin avulla
const bcrypt = require('bcrypt'); //bcrypt hashaamiseen ja varmistamsieen

// uuden käyttäjän rekisteröinti, ja tarkistetaan rooli
exports.registerUser = async (req,res,next) => {
  const { username, password, role } = req.body;
  if (!['manager','worker'].includes(role)) 
    return res.status(400).json({ error: 'Invalid role' });
// hashataan salasana suolauksen avulla
  const hash = await bcrypt.hash(password, 10);
  try {
    // lisätään käyttäjä tietokantaan ja palautetaan id + username + rooli
    const result = await db.query(
      'INSERT INTO users (username,password_hash,role) VALUES ($1,$2,$3) RETURNING id,username,role',
      [username, hash, role]
    );
    res.status(201).json(result.rows[0]);
  } catch(err) {
    // virheenkäsittely blokki jos käyttäjänimi jo olemassa
    if (err.code === '23505') // koodi unique name taken
      return res.status(409).json({ error: 'Username taken' });
      // muut virheet ohjataan yleiselle middlewarelle
    next(err);
  }
};
// autentikoidaan käyttäjä
exports.authenticate = async (req,res,next) => {
    // tarkistetaan username+salasana+rooli
  const { username, password, role } = req.body;
  try {
    const result = await db.query(
      'SELECT id,username,password_hash,role FROM users WHERE username=$1',
      [username]
    );
    if (result.rows.length === 0) 
      return res.status(401).json({ error: 'Invalid credentials' });

    const user = result.rows[0];
    const ok   = await bcrypt.compare(password, user.password_hash);
    if (!ok || user.role !== role)
      return res.status(401).json({ error: 'Invalid credentials' });

    // palautetaan käyttäjätiedot
    res.json({ id: user.id, username: user.username, role: user.role });
  } catch(err) {
    //muiden virheiden ohjaus middlewwarelle
    next(err);
  }
};
