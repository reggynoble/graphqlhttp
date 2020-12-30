const axios = require('axios');
const { GraphQLJSON, GraphQLJSONObject } = require ('graphql-type-json');
const { DateTimeScalar, DateTime }  = require ('@saeris/graphql-scalars');

const {
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

// User Type from Customer end point
//https://anna-codechallenge.s3.us-east-2.amazonaws.com/customers.json

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    last_login_date: { type: GraphQLString },
    total_money_spent: { type: GraphQLInt }
  })
});


const RatingsDetailCategory = new GraphQLObjectType({
  name: 'RatingsDetailCategory',
    fields: () => ({
        scores: RatingType
  })
});

// ScoreType from the recommender endpoint
//https://anna-codechallenge.s3.us-east-2.amazonaws.com/recommender.json
const ScoreType = new GraphQLObjectType({
  name: 'Scores',
  fields: () => ({
    customer_id: { type: GraphQLString },
    scores: { type: GraphQLJSON }
  })
});
const RatingType = new GraphQLObjectType({
    name: 'Rating',
    fields: () => ({
      rating: new GraphQLList(GraphQLJSON)
    })
});
// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parent, args) {
        return axios
          .get('https://anna-codechallenge.s3.us-east-2.amazonaws.com/customers.json')
          .then(res => res.data)
      }
    },
    ratings: {
      type: new GraphQLList(ScoreType),
      resolve(parent, args) {
        return axios
          .get('https://anna-codechallenge.s3.us-east-2.amazonaws.com/recommender.json')
          .then(res => res.data);
      }
    },

  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
