#from Adafruit_PWM_Servo_Driver import PWM
from time import sleep
#pwm = PWM(0x40, debug=True)
noteLen = .8
breakLen = .2

def playSong(song):
	f = open('SongsPlayed.txt','a')
	f.write(song + '\n')
	f.close()
	song = song[:len(song)-1].split(';')
	song = list(map(lambda x : str(x).split(','),song))

	for i in range(len(song[0])):
		for j in range(len(song)):
			print(j, 0, 3000*int(song[j][i]))
			#pwm.setPWM(j, 0, 3000*int(song[j][i]))
		sleep(noteLen*(not i%2) + breakLen*(i%2))
	#pwm.setPWM(0, 0, 0)