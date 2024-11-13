package utils

import (
	"math/rand"
	"strconv"
)

func GenerateOTP() string {

	otp := rand.Intn(900000) + 100000
	return strconv.Itoa(otp)
}
