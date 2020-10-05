
all: lexer.wasm lexer.wat optimize

lexer.wat: lexer.wasm
	./wabt/bin/wasm2wat ./dist/lexer.wasm -o ./dist/lexer.wat

lexer.wasm: ./src/lexer.c
	mkdir dist/
	clang \
		--target=wasm32 \
		-O3 \
		-flto \
		-nostdlib \
		-Wno-logical-op-parentheses \
		-Wno-int-conversion \
		-Wl,--no-entry \
		-Wl,--export=parse \
		-Wl,--export=__heap_base \
		-Wl,-z,stack-size=8388608 \
		-Wl,--allow-undefined \
		-o ./dist/lexer.wasm \
		./src/lexer.c

optimize: lexer.wasm
	./binaryen/bin/wasm-opt -Oz ./dist/lexer.wasm -o ./dist/lexer.wasm

clean:
	rm dist/lexer.wasm dist/lexer.wat
