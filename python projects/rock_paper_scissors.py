import random
import sys

players_choices = {}

def main():
    options = ["rock", "scissors", "paper"]
    
    player_choice = input("Choose one: rock, scissors, or paper: ").strip().lower()
    if player_choice not in options:
        print("Invaild option")
        sys.exit()

    computer_choice = random.choice(options)

    players_choices["player_choice"] = player_choice

    players_choices["computer_choice"] = computer_choice

    if players_choices["player_choice"] == players_choices["computer_choice"]:
        winner = None

    else:
        if "rock" in players_choices.values() and "scissors" in players_choices.values():
            winner = get_key("rock") 
        elif "rock" in players_choices.values() and "paper" in players_choices.values():
            winner = get_key("paper") 
        elif "paper" in players_choices.values() and "scissors" in players_choices.values():
            winner = get_key("scissors") 
    
    print(f'My choice is {players_choices["computer_choice"]}')
    print("It's a tie!") if winner == None else print(f"{winner} won!")


def get_key(w_value):
    for key, value in players_choices.items():
        if value == w_value:
            return "You"
    return "I"
    
    
if __name__ == "__main__":
    main()