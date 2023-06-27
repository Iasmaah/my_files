import pyperclip
import pyshorteners
from tkinter import *

background = "#E5FCC2"
foreground = "#2A363B"

# functions
def url_shortener():
    long_url = user_url.get()
    short_url = pyshorteners.Shortener().tinyurl.short(long_url)
    shortened_url.set(short_url)

def url_copier():
    url = shortened_url.get()
    pyperclip.copy(url)
    confirmation_label.config(text="Copied!")

def reset():
    confirmation_label.config(text="")
    user_s.delete(0, END)
    shortened.delete(0, END)

# GUI
window = Tk()
window.geometry('500x250')
window.resizable(0,0)
window.title("URL SHORTENER")

user_url = StringVar()
shortened_url = StringVar()


Label(window, text="URL SHORTENER", font="Garamond 15", fg=foreground ).pack(pady=5)

user_s = Entry(window, width=50, textvariable=user_url)
user_s.pack()

Button(window, font="Garamond", text = "Generate a shortened url", bg= foreground, fg= background,command=url_shortener).pack(pady=10)

shortened = Entry(window, width=50, textvariable=shortened_url)
shortened.pack()

Button(window, font="Garamond", text="Copy short url", bg= foreground, fg= background, command=url_copier).pack(pady=10)
Button(window, font="Garamond", text="Restart",bg= foreground, fg= background, command=reset).pack(pady=10)

confirmation_label = Label(window, text="", fg=foreground , font="Garamond 20")
confirmation_label.pack()

window.mainloop()