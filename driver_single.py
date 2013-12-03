from Adafruit_PWM_Servo_Driver import PWM
from time import sleep

pwm = PWM(0x40, debug=True)

with open("data/song0.txt") as f:
	notes = f.readline()

for n in notes:
	pwm.setPWM(0, 0, 3000*int(n))
	sleep(2)

pwm.setPWM(0, 0, 0)
