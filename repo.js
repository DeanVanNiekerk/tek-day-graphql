const User = require('./models')

const getUsers = function(userGuid) {
    let filter = { }
    if(userGuid)
        filter.userGuid = userGuid;
    return User.find(filter).exec();
}

const getIdentities = function() {
    return User.find().exec()
        .then(users => {
            return users.reduce((a, c) => {
                return [...a, ...c.identities];
            }, [])
        });
}

module.exports = {
    getUsers,
    getIdentities
};