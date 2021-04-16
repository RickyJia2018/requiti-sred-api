
const {GraphQLEnumType} = require('graphql')

exports.RoleEnumType = new GraphQLEnumType({
    name: 'TaskStateEnum',
    values: {
        TRIAL: {
            value: 'trial',
        },
        NORMAL: {
            value: 'normal',
        },
        ADMIN: {
            value: 'admin',
        },
    },
});


//https://atheros.ai/blog/how-to-use-graphql-enum-type-and-its-best-practices