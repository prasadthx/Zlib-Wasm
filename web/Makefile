CC=emcc

all: zlibtool.html

zlibtool.html: zlibtool.o libz.a
		$(CC) zlibtool.o libz.a -o zlibtool.html \
		-s EXPORTED_RUNTIME_METHODS="['callMain']" \
	-s EXPORTED_FUNCTIONS="['_main']" \

zlibtool.o: zlibtool.c
		$(CC) -c zlibtool.c -o zlibtool.o

clean:
		@echo "Cleaning Files.."
		@echo "zlibtool.o zlibtool.html zlibtool.wasm"
		rm -f zlibtool.o zlibtool.html zlibtool.wasm
