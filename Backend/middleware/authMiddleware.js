const jwt = require('jsonwebtoken');
const supabase = require('../services/supabaseClient');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('JWT_SECRET missing in env');
  process.exit(1);
}

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing Authorization header' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Invalid Authorization header' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // Optionally verify user exists in DB
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', payload.userId)
      .limit(1);

    if (error || !users || users.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = users[0];
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authMiddleware;
        