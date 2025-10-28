// TODO: Refactor functions to follow single responsibility principle

class Order {
  constructor(
    public id: number,
    public customerName: string,
    public customerPhone: string,
    public items: string[],
    public quantities: number[],
    public prices: number[],
    public address: string
  ) {}
}

class RestaurantSystem {
  private orders: Order[] = [];

  processOrder(
    name: string,
    phone: string,
    items: string[],
    quantities: number[],
    prices: number[],
    address: string,
    cardNumber: string
  ): boolean {
    if (name == "" || phone == "") {
      console.log("Customer missing");
      return false;
    } else {
      if (phone.length < 10) {
        console.log("Bad phone");
        return false;
      } else {
        if (items.length == 0) {
          console.log("No items");
          return false;
        } else {
          let subtotal = 0;
          for (let i = 0; i < items.length; i++) {
            if (quantities[i] <= 0) {
              console.log("Bad qty");
              return false;
            }
            subtotal += prices[i] * quantities[i];
          }

          let delivery = subtotal > 50 ? 0 : 5;
          const tax = subtotal * 0.1;
          const total = subtotal + delivery + tax;

          if (address.length < 10) {
            console.log("Bad addr");
            return false;
          } else {
            if (cardNumber.length != 16) {
              console.log("Bad card");
              return false;
            } else {
              console.log("Charging: $" + total);

              const orderId = Math.floor(Math.random() * 10000);
              const order = new Order(
                orderId,
                name,
                phone,
                items,
                quantities,
                prices,
                address
              );

              this.orders.push(order);

              console.log("ORDER #" + orderId);
              for (let i = 0; i < items.length; i++) {
                console.log(items[i] + " x" + quantities[i]);
              }
              console.log("Total: $" + total);

              console.log("KITCHEN: #" + orderId);
              console.log("SMS to " + phone);

              return true;
            }
          }
        }
      }
    }
  }

  cancelOrder(orderId: number): void {
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].id == orderId) {
        const order = this.orders[i];

        let total = 0;
        for (let j = 0; j < order.items.length; j++) {
          total += order.prices[j] * order.quantities[j];
        }

        console.log("Refund: $" + total);

        this.orders.splice(i, 1);

        console.log("SMS: Cancelled");
        console.log("AUDIT: #" + orderId);
        console.log("Customer: " + order.customerName);
        console.log("Address: " + order.address);
        break;
      }
    }
  }
}

function main02() {
  const restaurant = new RestaurantSystem();

  const success = restaurant.processOrder(
    "Alice",
    "5551234567",
    ["Pizza", "Salad"],
    [2, 1],
    [15, 8],
    "123 Main Street",
    "4111111111111111"
  );

  if (success) {
    console.log("Success!");
  }

  restaurant.cancelOrder(1234);
}

main02();