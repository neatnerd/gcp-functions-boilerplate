#!/usr/bin/env bash

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source ${__dir}/common.sh

if [ "$1" == "start" ]; then
  checkGCloudTool
  header "Starting local Pub/Sub instance"
  gcloud beta emulators pubsub start --project=test
elif [ "$1" == "init" ]; then
  checkGCloudTool
  header "Initializing PubSub environment variables"
  $(gcloud beta emulators pubsub env-init)
else
  header "Usage ${0##*/} [start | init]"
fi
