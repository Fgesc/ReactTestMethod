import { describe, it, expect, beforeEach } from 'vitest';
import { LibraryCollection } from './LibratyCollection';


describe('LibraryCollection', () => {
  let library: LibraryCollection;

  beforeEach(() => {
    library = new LibraryCollection();
  });
  
  it('Должен корректно добавить книгу', () => {
      const result = library.addBook('Невесомость', 'Виктор Лавров');
      expect(result).not.toBeNull();
      expect(library.getBooksCount()).toEqual(1);
  });

  it('Должен корректно добавить несколько книг', () => {
      library.addBook('Невесомость', 'Виктор Лавров');
      library.addBook('Война и Мир', 'Лев Толствой');
      expect(library.getBooksCount()).toEqual(2);
  });

  it('Должен корректно удалить книгу', () => {
      library.addBook('Невесомость', 'Виктор Лавров');
      expect(library).not.toBeNull();
      library.removeBook('Невесомость-Виктор Лавров')
      expect(library.getBooksCount()).toEqual(0);
  });

  it('Должен корректно удалить несколько книг', () => {
    const bookIds = [
      library.addBook('Книга1', 'Автор1'),
      library.addBook('Книга2', 'Автор2'),
      library.addBook('Книга3', 'Автор3'),
    ];
    
    for (const id of bookIds) {
      library.removeBook(id);
    }
    expect(library.getBooksCount()).toEqual(0);
  });

it('Должен корректно получить данные о книге', () => {
  const bookId = library.addBook('Невесомость', 'Виктор Лавров');
  expect(bookId).not.toBeNull();
  const bookInfo = library.getBookInfo(bookId);
  expect(bookInfo).not.toBeNull();
  expect(bookInfo!.title).toEqual('Невесомость');
  expect(bookInfo!.author).toEqual('Виктор Лавров');
});

it('Должен вернуть null, если книги такой нет в библиотеке', () => {
  const bookInfo = library.getBookInfo('Книга1-Автор1');
  expect(bookInfo).toBeNull();
});

it('Должен вернуть массив книг, которые есть в библиотеке', () => {
  library.addBook('Книга1', 'Автор1');
  library.addBook('Книга2', 'Автор2');
  library.addBook('Книга3', 'Автор3');

  const expectedBooks = [
    { id: 'Книга1-Автор1', title: 'Книга1', author: 'Автор1' },
    { id: 'Книга2-Автор2', title: 'Книга2', author: 'Автор2' },
    { id: 'Книга3-Автор3', title: 'Книга3', author: 'Автор3' },
  ];
  expect(library.getAllBooks()).toEqual(expectedBooks);
});

it('Должен возвращать 0, если библиотека пуста', () => {
    expect(library.getBooksCount()).toEqual(0);
});

it('Должен корректно увеличивать счётчик при добавлении одной книги', () => {
    library.addBook('Книга1', 'Автор1');
    expect(library.getBooksCount()).toEqual(1);
});

it('Должен предотвратить добавление книги с тем же названием и автором', () => {
  library.addBook('Невесомость', 'Виктор Лавров');
  expect(() => library.addBook('Невесомость', 'Виктор Лавров'))
    .toThrow('Книга с таким названием и автором уже существует.');
});

});