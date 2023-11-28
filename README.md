# ddd_robotics

This project is using node.js __20.10.0__ as it's the LTS version today.

`event_writer` writes events that represents _metrology system_.
`event_consumer` will consume those events and write them to a db.

ENV variables that make this project works:

RABBIT_HOST
RABBIT_QUEUE

Example:

export RABBIT_HOST=amqp://localhost
export RABBIT_QUEUE=hello
export MONGO_URI=mongodb://localhost:27017
export MONGO_DB=test

Useful commands:

## Run mongo
docker run --name some-mongo -d mongo -p 27017:27017
## Run rabbit
docker run -d --hostname my-rabbit --name some-rabbit -p 8080:15672 5671:5671 5672:5672 rabbitmq:3-management