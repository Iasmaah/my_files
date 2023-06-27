import secrets
import string
# use secrets instead of random when sensitivity is important. 
def main(): 
    n = int(input("How many characters do you want in your password?  "))

    print(generate_password(n))


def generate_password(n): 
    generated_password = ""
    chars = string.ascii_lowercase + string.ascii_uppercase + string.digits + string.punctuation
    for _ in range(n):
        generated_password += str(secrets.choice(chars))

    return generated_password


if __name__ == "__main__":
    main()