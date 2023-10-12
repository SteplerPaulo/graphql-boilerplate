// SERVER ONE FILE VERSION
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import axios from 'axios';
import gql from 'graphql-tag';

// The GraphQL schema
const typeDefs = gql`
  type User {
    id: Int
    email: String
    first_name: String
    last_name: String
    avatar: String
  }

  type Support {
    url: String
    text: String
  }

  type UserData {
    page: Int
    per_page: Int
    total: Int
    total_pages: Int
    data: [User]
    support: Support
  }

  type Color {
    id: Int
    name: String
    year: Int
    color: String
    pantone_value: String
  }

  type Query {
    userData: UserData,
    colors: [Color]
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    userData: async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users');
        return response.data; // Assuming the response shape matches the UserData type
      } catch (error) {
        throw new Error('Failed to fetch data');
      }
    },
    colors: async () => {
      try {
        const response = await axios.get('https://reqres.in/api/unknown');
        return response.data; // Assuming the response shape matches the UnknownData type
      } catch (error) {
        throw new Error('Failed to fetch data');
      }
    },

  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);