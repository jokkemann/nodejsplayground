var amqp = require('amqplib/callback_api');

var timestamp = Date.now();
amqp.connect('amqp://svcdim:ou5GSz$KDs@ma-queue1.test.cdon.com/cdonevents.dev', function (err, conn) {
	conn.createChannel(function(err, ch) {
		var q = 'hello';

		ch.assertQueue(q, {durable: false});

		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
		ch.consume(q, function (msg) {
			console.log(" [X] Received %s (%s ms taken)", msg.content.toString(), Date.now() - timestamp);
		}, {noAck: false});
	});
});
