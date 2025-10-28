// TODO: Refactor this code to follow clean naming conventions

class Prod {
  constructor(
    public n: string,
    public p: number,
    public q: number,
    public d: boolean
  ) {}
}

class Usr {
  constructor(
    public id: number,
    public nm: string,
    public e: string,
    public blocked: boolean,
    public bal: number
  ) {}
}

class Ord {
  constructor(
    public no: number,
    public u: Usr,
    public items: Prod[],
    public st: string
  ) {}
}

class Mgr {
  private data: Ord[] = [];
  private flag = true;

  do(x: Ord): boolean {
    if (!this.check(x)) {
      console.log("err");
      return false;
    }

    const t = this.calc(x);
    if (t > 0) {
      this.proc(x, t);
      return true;
    }
    return false;
  }

  check(o: Ord): boolean {
    if (o.u.blocked) {
      return false;
    }
    if (!this.invalid(o)) {
      return true;
    }
    return false;
  }

  invalid(obj: Ord): boolean {
    if (obj.st != "ready") {
      return true;
    }
    let err = false;
    for (let i = 0; i < obj.items.length; i++) {
      if (obj.items[i].q <= 0) {
        err = true;
      }
    }
    return err;
  }

  calc(o: Ord): number {
    let amt = 0;
    for (let i = 0; i < o.items.length; i++) {
      const itm = o.items[i];
      let p = itm.p * itm.q;
      if (itm.d) {
        p = p * 0.9;
      }
      amt += p;
    }
    return amt * 1.21;
  }

  proc(o: Ord, v: number): void {
    o.u.bal = o.u.bal - v;
    o.st = "done";
    this.data.push(o);
    if (this.flag) {
      this.util(o.u.e, o.no);
    }
  }

  util(addr: string, n: number): void {
    console.log("Email to " + addr + ": #" + n);
  }

  run1(id: number): boolean {
    const x = this.data.find((d) => d.no == id);
    if (x) {
      return this.do(x);
    }
    return false;
  }
}

function main01() {
  const mgr = new Mgr();
  const u1 = new Usr(1, "John", "j@test.com", false, 1000);
  const p1 = new Prod("Laptop", 999, 1, true);
  const p2 = new Prod("Mouse", 25, 2, false);
  const ord1 = new Ord(1001, u1, [p1, p2], "ready");

  const res = mgr.do(ord1);
  console.log(res ? "OK" : "FAIL");
  console.log("Balance: " + u1.bal);

  mgr.run1(1001);
  console.log("Product: " + p1.n);
  console.log("User ID: " + u1.id);
}

main01();