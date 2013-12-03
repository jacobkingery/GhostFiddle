from Adafruit_PWM_Servo_Driver import PWM
from time import sleep

pwm = PWM(0x40, debug=True)

with open("data/song0.txt") as f:
	sequence = f.readline()
	notes = []
	for note in sequence:
		notes.append(int(note))

for i in range(5):
	pwm.setPWM(0, 0, 3000)
	sleep(2)
	pwm.setPWM(0, 0, 0)
	sleep(2)


