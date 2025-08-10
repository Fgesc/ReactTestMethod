type BookInfo = { id: string; title: string; author: string };


export class LibraryCollection {
  #books: Record<string, BookInfo> = {};

  addBook(title: string, author: string): string {
    const id = `${title}-${author}`;

    if (this.#books[id]) {
      throw new Error('Книга с таким названием и автором уже существует.');
    }
    this.#books[id] = { id, title, author };
    return id
  }

  removeBook(id: string): void {
    delete this.#books[id];
  }

  getBookInfo(id: string): { title: string, author: string } | null {
    return this.#books[id] ?? null;
  }

  getAllBooks(): Array<{ id: string, title: string, author: string }> {
    return Object.values(this.#books);
  }

  getBooksCount(): number {
    return Object.keys(this.#books).length;
  }
}

