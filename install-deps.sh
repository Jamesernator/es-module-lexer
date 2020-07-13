#!/bin/bash

# Binaryen
git clone https://github.com/WebAssembly/binaryen ./binaryen/
pushd ./binaryen/
cmake . && make
popd

# Wasi SDK
wget https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-11/wasi-sdk-11.0-linux.tar.gz
tar xvf wasi-sdk-11.0-linux.tar.gz

# Wbat
git clone --recursive https://github.com/WebAssembly/wabt
pushd wabt/
make
popd
