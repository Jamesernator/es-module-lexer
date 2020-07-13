lexer.wat: lexer.wasm
	./wabt/bin/wasm2wat ./lexer.wasm -o ./lexer.wat

lexer.wasm: ./lexer.c
	./wasi-sdk-10.0/bin/clang \
		--target=wasm32 \
		-O3 \
		-flto \
		-nostdlib \
		-Wno-logical-op-parentheses \
		-Wno-int-conversion \
		-Wl,--no-entry \
		-Wl,--export=parse \
		-Wl,-z,stack-size=8388608 \
		-Wl,--allow-undefined \
		-o ./\lexer.wasm \
		./lexer.c

optimize: lexer.wasm
	./binaryen/bin/wasm-opt -Oz ./lexer.wasm -o ./lexer.wasm

all: lexer.wasm lexer.wat optimize

clean:
	rm lexer.wasm lexer.wat
