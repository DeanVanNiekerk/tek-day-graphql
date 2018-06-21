const graphql = require('graphql');
const { getUsers, getIdentities } = require('./repo');


var identityType = new graphql.GraphQLObjectType({
    name: 'identity',
    fields: function() {
        return {
            userGuid: {
                type: graphql.GraphQLString
            },
            identityGuid: {
                type: graphql.GraphQLString
            },
            applicationGuid: {
                type: graphql.GraphQLString
            }
        }
    }
});

var userType = new graphql.GraphQLObjectType({
    name: 'user',
    fields: function() {
        return {
            userGuid: {
                type: graphql.GraphQLString
            },
            firstName: {
                type: graphql.GraphQLString
            },
            lastName: {
                type: graphql.GraphQLString
            },
            identities: {
                type: new graphql.GraphQLList(identityType),
                resolve: function(root) {
                    return root.identities;
                }
            }
        }
    }
});


var queryType = new graphql.GraphQLObjectType({
    name: "Query",
    fields: function() {
        return {
            user: {
                type: new graphql.GraphQLList(userType),
                args: {
                    userGuid: { type: graphql.GraphQLString }
                },
                resolve: function(root, args) {
                    return getUsers(args.userGuid);
                }
            },
            identity: {
                type: new graphql.GraphQLList(identityType),
                resolve: function() {
                    return getIdentities();
                }
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: queryType
});


/*

{
  user {
    userGuid,
    firstName,
    lastName,
    identities {
      identityGuid
    }
  }
}

{
  identity {
    identityGuid,
    userGuid,
    applicationGuid
  }
}

*/


