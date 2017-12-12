class Employee {
    constructor() {
        this.age = 18;
        this.name = "Default Name";
    }

    isValid() {
        if (this.age === null) {
            console.error("Value could not be null!");
            return false;
        }

        if (this.age >= 150) {
            console.error("Age could not be greater than 150!");
            return false;
        }

        if (this.age <= 18) {
            console.error("You must be at least 18 years old to use our service!");
            return false;
        }

        if (this.name === "Artur") {
            console.error("Bad name, sorry :(");
            return false;
        }

        if (this.name.length >= 120) {
            console.error("Max string length is 120!");
            return false;
        }

        if (this.name.length <= 2) {
            console.error("Min string length is 2");
            return false;
        }

        if (this.name === null) {
            console.error("Value could not be null!");
            return false;
        }
    }

}