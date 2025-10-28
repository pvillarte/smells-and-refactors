// TODO: Refactor this code to follow clean naming conventions

class Product {
  constructor(
    public name: string,
    public price: number,
    public quantity: number,
    public hasDiscount: boolean
  ) {}
}

class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public isBlocked: boolean,
    public balance: number
  ) {}
}

class Order {
  constructor(
    public orderNumber: number,
    public user: User,
    public items: Product[],
    public status: string
  ) {}
}

class Manager {
  private data: Order[] = [];
  private flag = true;

  do(order: Order): boolean {
    if (!this.check(order)) {
      console.log("err");
      return false;
    }

    const t = this.getOrderAmount(order);
    if (t > 0) {
      this.processOrder(order, t);
      return true;
    }
    return false;
  }

  check(order: Order): boolean {
    if (order.user.isBlocked) {
      return false;
    }
    if (!this.invalid(order)) {
      return true;
    }
    return false;
  }

  invalid(order: Order): boolean {
    if (order.status != "ready") {
      return true;
    }
    let error = false;
    for (let i = 0; i < order.items.length; i++) {
      if (order.items[i].quantity <= 0) {
        error = true;
      }
    }
    return error;
  }

  getOrderAmount(order: Order): number {
    let amount = 0;
    for (let i = 0; i < order.items.length; i++) {
      const item = order.items[i];
      let itemPrice = item.price * item.quantity;
      if (item.hasDiscount) {
        itemPrice = itemPrice * 0.9;
      }
      amount += itemPrice;
    }
    return amount * 1.21;
  }

  processOrder(order: Order, amount: number): void {
    order.user.balance = order.user.balance - amount;
    order.status = "done";
    this.data.push(order);
    if (this.flag) {
      this.addEmailLog(order.user.email, order.orderNumber);
    }
  }

  addEmailLog(email: string, orderNumber: number): void {
    console.log("Email to " + email + ": #" + orderNumber);
  }

  run1(id: number): boolean {
    const x = this.data.find((d) => d.orderNumber == id);
    if (x) {
      return this.do(x);
    }
    return false;
  }
}

function main01() {
  const manager = new Manager();
  const user1 = new User(1, "John", "j@test.com", false, 1000);
  const product1 = new Product("Laptop", 999, 1, true);
  const product2 = new Product("Mouse", 25, 2, false);
  const order1 = new Order(1001, user1, [product1, product2], "ready");

  const hasOrderSucceded = manager.do(order1);
  console.log(hasOrderSucceded ? "OK" : "FAIL");
  console.log("Balance: " + user1.balance);

  manager.run1(1001);
  console.log("Product: " + product1.name);
  console.log("User ID: " + user1.id);
}

main01();