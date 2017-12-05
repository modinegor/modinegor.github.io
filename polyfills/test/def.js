def("class", "Employee", {
    age: deft(18).minv(18, "You must be at least 18 years old to use our service!").maxv(150, "Age could not be greater than 150!").notnull("Value could not be null!"),
    name: deft("Default Name").notnull("Value could not be null!").minl(2, "Min string length is 2").maxl(120, "Max string length is 120!").notequal("Artur", "Bad name, sorry :(")
});