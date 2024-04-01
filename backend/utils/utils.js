const findUserByToken = (users, token) => {
    return users.find(user => user.token === token);
};

module.exports = { findUserByToken };
