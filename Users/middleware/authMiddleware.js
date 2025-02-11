// /middleware/authMiddleware.js
const authService = require('../service/authentication.service');
const { getSession } = require('../utils/redis');

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token required' });

  try {
    // Verify the access token
    const payload = await authService.verifyAccessToken(token)
    
    // Check if the token exists in Redis
    const session = await getSession(token);
    if (!session) return res.status(401).json({ message: 'Session expired or invalid' });
    console.log(session)
    req.payload = payload;
    next();
  } catch (error) {
    console.log(error)
    res.status(403).json({ message: 'Invalid access token' });
  }
}

// async function authDupcate(req, res, next) {
//   try{
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token)  { 
//         return res.status(401).json({ message: 'Access token required' });
//     }
//     const session = await getSession(token);
//     if (session)  {
//       return res.status(401).json({ message: 'Session Dupcate' });
//     }
//   } catch (error) {
//     res.status(403).json({ message: 'Invalid access token' });
//   }
// }
module.exports =   authMiddleware  
