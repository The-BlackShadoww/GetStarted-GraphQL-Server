import { books, libraries, users } from "../db";
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
        users: () => users,
        user(parent, args, contextValue, info) {
            return users.find((user) => user.id === args.id);
        },
        libraries() {
            // Return our hardcoded array of libraries
            return libraries;
        },
    },
    Library: {
        books(parent) {
            // Filter the hardcoded array of books to only include
            // books that are located at the correct branch
            return books.filter((book) => book.branch === parent.branch);
        },
    },
    Book: {
        // The parent resolver (Library.books) returns an object with the
        // author's name in the "author" field. Return a JSON object containing
        // the name, because this field expects an object.
        author(parent) {
            return {
                name: parent.author,
            };
        },
    },
};
export default resolvers;
