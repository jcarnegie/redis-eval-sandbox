
local schema = cjson.decode(ARGV[1])
local doc    = cjson.decode(ARGV[2])
local seqKey = schema["name"] .. "_seq"
local id     = redis.call("INCR", seqKey)
local docKey = schema["name"] .. ":" .. id

doc["id"]    = id

redis.call("SET", docKey, doc)

return cjson.encode(doc)
