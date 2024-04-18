from colorama import Fore, Black, Style
import random
 
def guess(level):
    max_level=0
    if level == "1": max_level = 10
    if level == "2": max_level = 50
    if level == "3": max_level = 100
    number_to_guess = (random.radiant(1, int(max_level)))
    guess = 1
    while guess < 6:
        while True:
            print("Input Number between 1 and ", max_level)
            num = input()
            if num.isdigit() and int(num) in range (1, max_level):
                print("Valid input!")
                break
        if int(num) == number_to_guess:
            print(Fore.GREEN + 'number')
            print(style.RESET_ALL) #back to normal
            print('you managed to guess the number in ',guess "tries")
            break
        else:
            print(Back.Red + 'number not guessed')
            print(style.RESET_ALL) #back to normal
            print("HINT:")
            if int(num) > number_to_guess:
                print("number is smaller... try again")
            else:
                print("number is greater... try again")
        guess=guess+1