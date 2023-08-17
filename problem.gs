function CustomRandom(seed) {
    this.seed = seed;
}

CustomRandom.prototype.next = function() {
    this.seed = (this.seed * 16807) % 2147483647;
    return this.seed;
};

function generateProblem(seed) {
    var rand = new CustomRandom(seed);
    var ip_address = [];
    for (var i = 0; i < 4; i++) {
        ip_address.push(Math.floor(rand.next() % 256));
    }
    var cidr = Math.floor(rand.next() % 6) + 24;

    return [ip_address.join('.'), cidr];
}

function generateProblemsForStudents() {
    var unique_code = Math.floor(Math.random() * 100000);
    
    for (var j = 0; j < 5; j++) {
        var problem = generateProblem(unique_code + j);
        console.log("Problem " + (j+1) + ": IP Address: " + problem[0] + ", CIDR: " + problem[1]);
    }
    console.log("Unique Code: " + unique_code);
}
