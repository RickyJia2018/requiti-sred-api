const { EventType } = require("../types");
// const  User = require("../../models/userModel");
const Event = require('../../services/event')
const { GraphQLString, GraphQLID, GraphQLBoolean,GraphQLFloat } = require("graphql");

const addEvent = {
    type: EventType,
    description: "Create new Event. \n Required: title, description, user_id, company_id, start, end",
    args: {
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        hours: {type: GraphQLFloat},
        user_id: {type: GraphQLString},
        company_id: {type: GraphQLID},
        allDay: {type: GraphQLString},
        start: {type: GraphQLString},
        end: {type: GraphQLString},
        color: {type: GraphQLString},
    },
    async resolve(parent, args,{verifiedUser}){    
        if(!verifiedUser) throw new Error("Unauthorized")
        let newData = {...args}
        return await Event.create(newData);
    }
}

const updateEvent = {
    type: EventType,
    description: "Update Event",
    args: {
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        hours: {type: GraphQLFloat},
        user_id: {type: GraphQLString},
        company_id: {type: GraphQLID},
        allDay: {type: GraphQLString},
        start: {type: GraphQLString},
        end: {type: GraphQLString},
        color: {type: GraphQLString},
    },
    async resolve(parent, args,{verifiedUser}){   
        if(!verifiedUser) throw new Error("Unauthorized")
  
        let newData = {...args}
        return await Event.update(args.id, newData);
    }
}
const deleteEvent = {
    type: GraphQLBoolean,
    description: "Delete Event",
    args: {
        id: {type: GraphQLID},
    },
    async resolve(parent, args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        let result = await Event.delete(args.id);
        return result.n
    }
}

module.exports = { addEvent, updateEvent, deleteEvent }