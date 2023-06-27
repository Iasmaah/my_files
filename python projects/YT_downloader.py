# first we import the libraries

from tkinter import * 
from pytube import YouTube

# functions
def download():
    yt = YouTube(str(link.get()))
    # This captures the link(url) and locates it from YouTube.
    # url = yt(str(link.get()))

    # This captures the streams available for downloaded for the video i.e. 360p, 720p, 1080p. etc.s
    # streams = yt.streams.filter(file_extension='mp4', res="720p", progressive="True")

    stream = yt.streams.get_by_itag("22")
    stream.download()

    # This is the method with the instruction to download the video.

    # Once the video is downloaded, this label `downloaded` is displayed to show dowload completion.
    downloaded_label.config(text="Downloaded!")

    
def restart():
    downloaded_label.config(text="")
    entry.delete(0, END)


# Gui
window = Tk()

window.geometry('500x200') # number+small x+number
window.resizable(0,0) # makes the window adjustable with its features
window.title("YouTube Downloader")

link = StringVar() # Specifying the variable type
Label(window, text="Paste your link here", font='courier 15 bold').pack(pady=20)
entry = Entry(window, width=70, textvariable=link)
entry.pack()

# padx is the internal padding while pady in the pack option is an external padding
Button(window, text='Download', font='courier 16 bold', bg='light blue', padx=10,command=download).place(x=100, y=100) 

Button(window, text='Restart', font='courier 16 bold', bg='light green', padx=10,command=restart).place(x=275, y=100) 


downloaded_label = Label(window, text="", font = "courier 15", fg="light blue")
downloaded_label.pack()



window.mainloop()

