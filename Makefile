lib/lexer.wat: lib/lexer.wasm
	wasm2wat lib/lexer.wasm -o lib/lexer.wat

lib/lexer.wasm: ./lexer.c
	@mkdir -p lib
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
		-o ./lib/lexer.wasm \
		./lexer.c

optimize: lib/lexer.wasm
	wasm-opt -Oz lib/lexer.wasm -o lib/lexer.wasm

clean:
	rm lib/*
