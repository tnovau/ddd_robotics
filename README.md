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