const models =  require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../helpers/logger');
const Op = require('sequelize').Op;

async function register(data) {
    try {
        const userExists = await models.User.findOne({
            where: { email: data.email }
        })
        if (userExists) {
            throw new Error('User already registered');
        }
        const hashPassword = await bcrypt.hashSync(data.password, 10);
        const result = await models.User.create({
            userName: data.userName,
            password: hashPassword,
            email: data.email,
            role: data.role
        })
        logger.info('User registered successfuly')
        return {
            userId: result.id,
            email: data.email,
            userName: data.userName
        }
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function login(data) {
    try {
        let userExists = await models.User.findOne({
            where: { email: data.email }
        })
        if(!userExists) {
          logger.error('User not exists to login');
          throw new Error('User not exists');
        }
        if (userExists.role === 'MarketVendor') {
            const marketVendorExists = await models.MarketVendor.findOne({
                where: {
                    userId: userExists.id,
                    isApproved: true
                }
            })
            if(!marketVendorExists) {
              logger.error('Need Approval from Market Admin to access the application')
              throw new Error('Need Approval from Market Admin to access the application')
            }
        }
        if (!userExists) {
          logger.error("We were unable to find a user for this email. Please SignUp!")
            return {
                statusCode: 401,
                message: {
                  message: "We were unable to find a user for this email. Please SignUp!"
                }
              };
        }
        if (userExists) {
            if (await bcrypt.compare(data.password, userExists.password)) {
              const token = jwt.sign({ sub: userExists.id }, process.env.secret, {
                expiresIn: "7d",
              });

              logger.info(`Login successful`)
              return {
                statusCode: 200,
                message: {
                  message: "Login successful",
                  token: token,
                  ...omitPassword(userExists.get())
                }
              };
            } else {
              logger.error('Authentication failed')
              return {
                statusCode: 401,
                message: {
                  error: "Authentication failed"
                }
              };
            }
          } else {
            logger.error('Authentication failed')
            return {
              statusCode: 401,
              message: {
                error: "Authentication failed"
              }
            };
          }
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

async function validateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    logger.error({ message: 'No token provided!' })
    return res.status(403).send({ message: 'No token provided!' });
  }
  jwt.verify(token, process.env.secret, function (err, decoded) {
    if (err) {
      return err;
    } else {
      req.userId = decoded.sub;
      logger.info({ message: 'Token verified successfully'})
      next();
    }
  });
}

async function getUser(userId) {
  try {
    if(!userId) {
      logger.error('User Id is required')
      throw new Error("User Id is required");
    }
    const userExists = await models.User.findByPk(userId);
    if (!userExists) {
      logger.error('User not Exists')
      throw new Error("User not Exists");
    }
    logger.info('Returned user details!')
    return {
      ...omitPassword(userExists.get())
    }
  } catch(error) {
    logger.error(error);
    throw error;
  }
}

function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  logger.info('Returned user details without password')
  return userWithoutPassword;
}

async function updateUser(data, userId) {
  try {
    const userExists = await models.User.findByPk(userId);
    if (!userExists) {
      logger.error('User not Exists')
      throw new Error("User not Exists");
    }
    const user = await models.User.update(data, { where: { id: userId }});
    logger.info('User updated successfully')
    return user;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}


async function passwordReset(email, password) {
  try {
    const user = await models.User.findOne({
      where: { email },
    });
    if (!user) {
      logger.error('User not found')
      throw new Error("User not found");
    }
    
    const passwordHash = await bcrypt.hashSync(password, 10);
    const result = await models.User.update(
      {
          password: passwordHash,
      },
      { where: { id: user.id } }
      );

    logger.info('Password reset is done successfully');
    return {
      id: user.id,
      email: email,
    };
  } catch (err) {
    logger.error(error);
    throw err;
  }
}

const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await models.User.findByPk(req.userId); // assuming userId is set in req object
      if (!user) {
        logger.error({ message: 'User not found' })
        return res.status(404).json({ message: 'User not found' });
      }

      if (!roles.includes(user.role)) {
        logger.error({ message: 'Access denied' })
        return res.status(403).json({ message: 'Access denied' });
      }
      logger.info('Role verified successfully');
      next();
    } catch (error) {
      logger.error(`Error in role middleware:', ${error}`)
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};

async function listUsers() {
  try {
    const users = await models.User.findAndCountAll({ where: {
      role: 'MarketAdmin'
    }});
    const result = users.rows.map(ele => {
      return {
        ...omitPassword(ele.get())
      }
    })
    logger.info(`Users fetched successfully`)
    return result;
  } catch(error) {
    logger.error(error);
    throw error;
  }
}


module.exports = {
    register,
    login,
    validateToken,
    getUser,
    updateUser,
    passwordReset,
    checkRole,
    listUsers
}