const a = {this_is: "object~~~"}
Object.defineProperty(a, "a", { get: function () { return console.log(this) } });
Object.defineProperty(a, "b", { get: () => console.log(this)});

a.a;
a.b;
