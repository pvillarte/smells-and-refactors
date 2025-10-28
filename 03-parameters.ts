// TODO: Refactor to use better parameter patterns

class PayrollSystem {
  calculateSalary(
    empId: number,
    hours: number,
    rate: number,
    isOvertime: boolean,
    isWeekend: boolean,
    hasBonus: boolean,
    bonusAmount: number,
    taxRate: number,
    includeDeductions: boolean
  ): number {
    let salary = hours * rate;

    if (isOvertime) {
      salary = salary * 1.5;
    }

    if (isWeekend) {
      salary = salary * 2;
    }

    if (hasBonus) {
      salary = salary + bonusAmount;
    }

    const tax = salary * taxRate;

    if (includeDeductions) {
      const insurance = 100;
      const pension = salary * 0.05;
      salary = salary - tax - insurance - pension;
    } else {
      salary = salary - tax;
    }

    console.log("Salary for " + empId + ": $" + salary);
    return salary;
  }

  generateReport(
    type: string,
    includeSummary: boolean,
    includeDetails: boolean,
    includeGraphs: boolean,
    isPdf: boolean,
    isEmail: boolean,
    recipients: string,
    startDate: string,
    endDate: string
  ): void {
    console.log("Generating " + type + " report");
    console.log("From " + startDate + " to " + endDate);

    if (includeSummary) {
      console.log("Adding summary");
    }

    if (includeDetails) {
      console.log("Adding details");
    }

    if (includeGraphs) {
      console.log("Adding graphs");
    }

    if (isPdf) {
      console.log("Export as PDF");
    } else {
      console.log("Export as Excel");
    }

    if (isEmail) {
      console.log("Send to: " + recipients);
    }
  }

  transferFunds(
    fromAccount: string,
    toAccount: string,
    amount: number,
    currency: string,
    fee: number,
    isUrgent: boolean
  ): boolean {
    console.log("Transfer from " + fromAccount + " to " + toAccount);
    console.log("Amount: " + amount + " " + currency);

    const totalAmount = isUrgent ? amount + fee + 10 : amount + fee;
    console.log("Total: " + totalAmount);

    if (amount > 0) {
      console.log("Transfer done");
      return true;
    }
    return false;
  }
}

function main03() {
  const payroll = new PayrollSystem();

  const salary = payroll.calculateSalary(
    101,
    40,
    25,
    true,
    false,
    true,
    200,
    0.2,
    true
  );

  payroll.generateReport(
    "monthly",
    true,
    true,
    false,
    true,
    true,
    "boss@company.com",
    "2024-01-01",
    "2024-01-31"
  );

  payroll.transferFunds("ACC123", "ACC456", 1000, "USD", 15, true);

  console.log("Calculated salary: " + salary);
}

main03();