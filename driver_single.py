from Adafruit_PWM_Servo_Driver import PWM
from time import sleep

pwm = PWM(0x40, debug=True)

with open("data/song0.txt") as f:
	notes = f.readline()

noteLen = 2
breakLen = 1

for i, n in enumerate(notes):
	pwm.setPWM(0, 0, 3000*int(n))
	sleep(noteLen*(not i%2) + breakLen*(i%2))

pwm.setPWM(0, 0, 0)