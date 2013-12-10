import time
c = "hello"
def makeFile():
	f = open('testText.txt','w')
	f.write('Begin Test!\n')
	f.write(c)
	f.close()

def writeSong(s):
	f = open('testText.txt','a')
	f.write(str(s)+'\n\n')
	time.sleep(10)
	f.close()