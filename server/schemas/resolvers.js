const { Book } = require('../models');

const resolvers = {
    Query: {
        books: async () => {
            return Book.find()
        },
        book: async (parent, { title }) => {
            return Book.findOne({ title })
        }
    },
    Mutations: {
        addBook: async (parent, args) => {
            const book = await Book.insertMany(args);
            return book;
        }
    }
}

module.exports = resolvers;