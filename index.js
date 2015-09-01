#!/usr/bin/env node

var fs    = require("fs");
var redis = require("redis").createClient();

var script = fs.readFileSync("create.lua", "utf8");

// var script = 'return cjson.decode(ARGV[1])["foo"]';

var schema = {
    name: "users",
    fields: {
        name: String,
        email: String,
        password: String
    },
    indexes: ["email"]
}

var user = {
    name: "Zuliat",
    email: "zuliat@intelos.is",
    password: "secret"
}

console.log("script:", script);

redis.eval(script, 0, JSON.stringify(schema), JSON.stringify(user), function(err, res) {
// redis.eval(script, 0, JSON.stringify({ foo: "bar" }), function(err, res) {
    console.log("err:", err);
    console.log("res:", res);
    redis.end();
});
