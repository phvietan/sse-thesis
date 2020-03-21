package main

import (
	"crypto/rsa"
	"math/big"
)

func encryptRSA(pub *rsa.PublicKey, msg []byte) []byte {
	m := new(big.Int).SetBytes(msg)
	e := big.NewInt(int64(pub.E))
	c := new(big.Int)
	c.Exp(m, e, pub.N)

	return c.Bytes()
}