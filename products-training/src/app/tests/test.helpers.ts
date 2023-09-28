/* tslint:disable forin */
declare var jasmine: any;
import { DebugElement } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { By } from "@angular/platform-browser";
import { Book } from "../models/book.model";

class SpyObject {
  constructor(type?: any) {
    if (type) {
      for (const prop in type.prototype) {
        let m: any = null;
        try {
          m = type.prototype[prop];
        } catch (e) {
          // As we are creating spys for abstract classes,
          // these classes might have getters that throw when they are accessed.
          // As we are only auto creating spys for methods, this
          // should not matter.
        }
        if (typeof m === "function") {
          this.spy(prop);
        }
      }
    }
  }

  spy(name: string) {
    if (!(this as any)[name]) {
      (this as any)[name] = jasmine.createSpy(name);
    }
    return (this as any)[name];
  }

  prop(name: string, value: any) {
    (this as any)[name] = value;
  }
}

const book1: Book = {
  id: 0,
  name: "The Great Adventure",
  author: "John Doe",
  description: "A thrilling journey through unknown lands.",
  size: 300,
  imageUrl: "https://example.com/images/book1.jpg",
  genre: "Adventure",
  price: 15.99,
  state: "Available",
  rentTerm: 7
};

const book2: Book = {
  id: 1,
  name: "Mysteries of the Deep",
  author: "Jane Smith",
  description: "Discover the secrets of the ocean.",
  size: 250,
  imageUrl: "https://example.com/images/book2.jpg",
  genre: "Mystery",
  price: 12.99,
  state: "Rented",
  rentTerm: 14
};

const book3: Book = {
  id: 2,
  name: "Space Odyssey",
  author: "Alice Johnson",
  description: "A journey through space and time.",
  size: 320,
  imageUrl: "https://example.com/images/book3.jpg",
  genre: "Science Fiction",
  price: 18.99,
  state: "Available",
  rentTerm: 7
};

export const mockBooksArray: Book[] = [book1, book2, book3];
