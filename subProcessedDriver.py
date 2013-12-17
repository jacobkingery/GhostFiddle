#!/usr/bin/python
from Adafruit_PWM_Servo_Driver import PWM
import threading
import sys
pwm = PWM(0x40, debug=True)
noteLen = .5
breakLen = .1
def playSong(song):
	#f = open('SongsPlayed.txt','a')
	#f.write(song + '\n')
	#f.close()
	song = song[:len(song)-1].split(';')
	song = [glass+'0' for glass in song]
	global i
	i=0
	def playPause():
		global i
		i=i+1
		for j in range(len(song)):
#			print(j, int(song[j][i]), i)
			pwm.setPWM(j, 0, 3000*int(song[j][i]))
		if(i<len(song[0])-1):
			threading.Timer(breakLen,playNote).start()

	def playNote():
		global i
		i=i+1
		for j in range(len(song)):
#			print(j, int(song[j][i]), i)
			pwm.setPWM(j, 0, 3000*int(song[j][i]))
		if(i<len(song[0])-1):
			threading.Timer(noteLen,playPause).start()

	playNote()


if __name__ == "__main__":
	print("Driver Ran")
	playSong(sys.argv[1])
