
import urllib
import os
from os.path import isfile, join

if __name__ == "__main__":
	for f in os.listdir("."):
		if f!="url_decode.py":
			#os.rename(f, urllib.unquote(f).decode('utf8'))
			print(f)
			d=urllib.unquote(f)
			os.rename(f, urllib.unquote(d).decode('utf8'))