package util

func IsWhitespace(s uint8) bool {
	return (s == ' ' || s == '\t' || s == '\r')
}

func SkipWhitespace(str string) string {
	i := 0
	for i < len(str) && IsWhitespace(str[i]) {
		i += 1
	}
	return str[i:]
}
