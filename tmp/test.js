function generate(x) {
    var y = 2*i;
    return function() {
        return y;
    }
}

funcs = [];
for (var i = 0; i < 10; i++) {
    funcs.push(generate(i));
}

for (var i = 0; i < funcs.length; i++) {
    process.stdout.write(funcs[i]() + "\n");
}
