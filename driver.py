from Adafruit_PWM_Servo_Driver import PWM
from time import sleep

pwm = PWM(0x40, debug=True)

with open("data/song0.txt") as f:
	sequence = f.readlines()
#print sequence	
for i in range(len(sequence[0])-1):
	for j in range(len(sequence)):
		#print(j, 0, 3000*int(sequence[j][i]))
		pwm.setPWM(j, 0, 3000*int(sequence[j][i]))
	sleep(2)
pwm.setPWM(0, 0, 0)