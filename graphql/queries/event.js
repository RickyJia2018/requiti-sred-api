const { GraphQLList, GraphQLID } = require('graphql');
const { EventType } = require('../types');
const EventService = require('../../services/event');

const allEvents = {
    type: new GraphQLList(EventType),
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")
        return await EventService.findAll();
    }
}
const eventsByCompany = {
    type: new GraphQLList(EventType),
    args: {
        company_id: {type: GraphQLID}
    },
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        return await EventService.findByCondition({company_id: args.company_id});
    }
}
const eventsByEmployee = {
    type: new GraphQLList(EventType),
    args: {
        empolyee_id: {type: GraphQLID}
    },
    async resolve(parent,args,{verifiedUser}){
        if(!verifiedUser) throw new Error("Unauthorized")

        return await EventService.findByCondition({empolyee_id: args.empolyee_id});
    }
}
const event = {
    type: EventType,
    args: {id: {type: GraphQLID }},
    async resolve(parent,args,{verifiedUser}){
        // if(!verifiedUser) throw new Error("Unauthorized")

        return await EventService.findById(args.id);
    }
}

module.exports = { allEvents, event, eventsByCompany, eventsByEmployee }