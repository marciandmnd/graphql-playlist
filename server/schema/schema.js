const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID
} = graphql;

// dummy data

var books = [
  {name: 'Gone with the Wind', genre: 'Fantasy', id: '1'},
  {name: 'Lord of the Rings', genre: 'Fantasy', id: '2'},
  {name: 'Star Wars', genre: 'Sci Fi', id: '3'}
];

var authors = [
  {name: 'Patrick Rothfulls', age: 20, id: '1'},
  {name: 'Jon Doe', age: 25, id: '2'},
  {name: 'Whoop Whoop', age: 30, id: '3'}
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString}
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        // code to get data from db / other source
        console.log(typeof(args.id));
        return _.find(books, {id: args.id})
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return _.find(authors, {id: args.id})
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});