#!/bin/bash

# Binaryen
git clone https://github.com/WebAssembly/binaryen ./binaryen/
pushd ./binaryen/
cmake . && make
popd

# Wbat
git clone --recursive https://github.com/WebAssembly/wabt
pushd wabt/
make
popd
