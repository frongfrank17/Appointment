// /middleware/authMiddleware.js
const jwtUtils = require('../utils/jwt');


async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token required' });

  try {
    // Verify the access token
    const payload = await jwtUtils.verifyAccessToken(token)

    // Check if the token exists in Redis
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
