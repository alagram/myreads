# MyReads Project
 MyReads is a simple React app that allows you to select and categorize books you have read, are currently reading, or want to read.

## Installation
 Clone the GitHub repository and install dependencies.
 ```bash
 $ git clone https://github.com/alagram/myreads.git

 $ cd myreads

 $ npm install

 $ npm start
 ```

## Usage
From the main page, you can select books you want to move to different shelves. This allows a user to select books to the "currently reading", "want to read", or "read" shelves.

The search page has a search input field. As a user types into the search field, books that match the query are displayed on the page. Search results on the search page allows the user to select a book to different shelves as well. Books that have already been assigned to a shelf should be selected based on the shelf they've been assgined to. Books that have not been assigned a shelf will have "None" checked.

To get an idea of search terms to use, check out [SEARCH_TERMS.md](SEARCH_TERMS.md).

All information generated in the app persists between page refreshes.
