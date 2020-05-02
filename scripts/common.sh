#!/usr/bin/env bash

function is_tput(){
  [[ -x "$(command -v tput)" ]] && return
  false
}

function print_color(){
  if is_tput; then
    echo "$(tput setaf $2)$1$(tput sgr0)"
  else
    echo "$1"
  fi
}

function error(){
    print_color "$1" "1"
}

function header(){
    echo "$(tput setaf 2)$1$(tput sgr0)"
}

function log(){
    echo $1
}

function checkGCloudTool(){
  if ! [ -x "$(command -v gcloud)" ]; then
  error "$(tput setaf 1)Error: gcloud is not installed.$(tput sgr0)" >&2
  exit 1
  fi
}
