ifndef LIGO
LIGO=docker run --rm -v "$(PWD)":"$(PWD)" -w "$(PWD)" ligolang/ligo:0.37.0
endif

test:
	$(LIGO) run test ./src/tests/FA2_NFT.test.mligo

compile:
	$(LIGO) compile contract ./src/contracts/FA2_NFT.mligo -o ./src/compiled/FA2_NFT.tz
	$(LIGO) compile contract ./src/contracts/FA2_NFT.mligo -o ./src/compiled/FA2_NFT.json --michelson-format json

deploy:
	@npx ts-node ./src/deploy.ts