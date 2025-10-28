// TODO: Refactor to improve structure and consistency

class Book {
  private _title: string;
  public ISBN: string;
  author_name: string;

  constructor(title: string, isbn: string, author: string) {
    this._title = title;
    this.ISBN = isbn;
    this.author_name = author;
  }

  saveToDatabase(): void {
    console.log("INSERT INTO books...");
  }

  get_title(): string {
    return this._title;
  }

  sendNotification(email: string): void {
    console.log("Email to: " + email);
  }
}

class library_manager {
  private calculateFee(days: number): number {
    return days * 0.5;
  }

  public GetBook(isbn: string): Book {
    console.log("SELECT * FROM books WHERE isbn = " + isbn);
    return new Book("Sample", isbn, "Author");
  }

  private log_activity(action: string): void {
    console.log("LOG: " + action);
  }

  public checkout_book(bookISBN: string, userName: string): boolean {
    console.log("UPDATE books SET available = false");
    this.log_activity("Checkout: " + bookISBN);
    console.log("Email to " + userName);

    if (this.validateUser(userName)) {
      return true;
    }
    return false;
  }

  private validateUser(user: string): boolean {
    return user.length > 0;
  }

  public Return_Book(isbn: string, user_name: string, daysLate: number): void {
    if (daysLate > 0) {
      const fee = this.calculateFee(daysLate);
      console.log("UPDATE users SET balance = balance - " + fee);
    }
    console.log("UPDATE books SET available = true");

    if (this.Check_Availability(isbn)) {
      console.log("Book available again");
    }
  }

  public searchBooks(AuthorName: string): Book[] {
    console.log("SELECT * FROM books WHERE author = " + AuthorName);
    return [];
  }

  public reserve_Book(BookId: string, USER: string): void {
    console.log("INSERT INTO reservations...");
    this.log_activity("Reserve: " + BookId + " for " + USER);
  }

  private Check_Availability(book_isbn: string): boolean {
    return true;
  }

  public findByTitle(Title: string): Book[] {
    console.log("Finding books with title: " + Title);
    return [];
  }
}

class UserAccount {
  public name: string;
  private _email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this._email = email;
  }

  loadFromDatabase(id: number): void {
    console.log("SELECT * FROM users WHERE id = " + id);
  }

  GetEmail(): string {
    return this._email;
  }

  chargeLateFee(amount: number): void {
    console.log("Processing payment of $" + amount);
  }
}

function main04() {
  const manager = new library_manager();

  const book = new Book("Clean Code", "123", "Martin");
  book.saveToDatabase();
  book.sendNotification("user@email.com");

  manager.checkout_book("123", "john@email.com");

  manager.Return_Book("123", "john", 5);

  const user = new UserAccount("John", "john@email.com");
  user.loadFromDatabase(1);
  user.chargeLateFee(2.5);

  console.log("Book title: " + book.get_title());
  console.log("Book author: " + book.author_name);
  console.log("User email: " + user.GetEmail());
  console.log("User name: " + user.name);

  manager.searchBooks("Martin");
  manager.findByTitle("Clean");
  manager.reserve_Book("456", "ALICE");

  const newBook = manager.GetBook("789");
  console.log("Got book: " + newBook.ISBN);
}

main04();