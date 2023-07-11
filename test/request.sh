#!/bin/sh -l
set -e

# curl https://127.0.0.1:5000/doc-icon.js -v 

# 范围请求
curl https://127.0.0.1:5000/doc-icon.js -v --header "Range: bytes=0-390"