const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql');

//data
const reports = [
  { id: '1', name: 'report 1' },
  { id: '2', name: 'report 2' },
  { id: '3', name: 'report 3' },
  { id: '4', name: 'report 4' }
]

//report type
const ReportType = new GraphQLObjectType({
  name: 'Report',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  })
});

//root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    report: {
      type: ReportType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args){
        for(var i = 0; i<reports.length; i++) {
          if(reports[i].id === args.id)
          return reports[i];
        }
      }
    },
    reports: {
      type: new GraphQLList(ReportType),
      resolve(parentValue, args){
        return reports;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});