var amqp = require('amqplib/callback_api');

amqp.connect('amqp://svcdim:ou5GSz$KDs@ma-queue1.test.cdon.com/cdonevents.dev', function (err, conn) {
	conn.createChannel(function(err, ch) {
		var q = 'hello';
		for(var i = 0; i < 50000; i++) {
			ch.assertQueue(q, {durable: false});
			ch.sendToQueue(q, new Buffer('Hello World!'));
			console.log(' [x] Sent "Hello World!"');
		}
	});
	setTimeout(function () { conn.close(); process.exit(0); }, 5000);

});

