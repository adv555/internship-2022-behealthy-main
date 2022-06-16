require "kafka"

$kafka = Kafka.new(
  ["127.0.0.1:9092"], 
  logger: Rails.logger
)

$kafka_producer = $kafka.async_producer(
  delivery_interval: 10,
)

at_exit { 
  $kafka_producer.shutdown 
}