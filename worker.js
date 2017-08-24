var redis = require("redis");

var publisher  = redis.createClient(process.env.REDIS_URL);

var  minutely =  parseInt((process.env.POLL_TIME || 60*1*1000));

var pollTheMinute= function() {
	var date = new Date();
	publisher.publish("minutely", JSON.stringify(date) );
	if(date.getMinutes() === 0){
		publisher.publish("hourly", JSON.stringify(date) );
	}
	if(date.getHours() === 0){
		publisher.publish("dayly", JSON.stringify(date) );
	}
};

setInterval(pollTheMinute, minutely);

	
	
		
console.log('Node worker is running, start at '+JSON.stringify(new Date()));
publisher.publish("debug", 'Node worker is running');

process.on('uncaughtException', function (err) {
	  console.error(err.stack);
	});