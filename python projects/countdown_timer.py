from plyer import notification
import threading
import time
import tkinter as tk

class CountdownTimer:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title("Countdown Timer")
        self.window.geometry("375x140")
        self.window.config(bg="#f0f6fc")
        
        self.label = tk.Label(self.window, bg="#f0f6fc", font="Garamond 20", text="Enter time: ")
        self.label.grid(row=0, column=0)

        self.time_entry = tk.Entry(self.window, font="Garamond 20")
        self.time_entry.grid(row=0, column=1, pady=2, padx=5)

        self.start_button = tk.Button(self.window, width=12, fg="#f0f6fc" ,bg="#9ec2e6",text="Start", font="Garamond 15", command=self.start_thread)
        self.start_button.grid(row=1, column=0, pady=5)

        self.stop_button = tk.Button(self.window, width=12, fg="#f0f6fc" ,bg="#9ec2e6", text="Stop", font="Garamond 15", command=self.stop_countdown)
        self.stop_button.grid(row=1, column=1, pady=5)

        self.time_label = tk.Label(self.window, bg="#f0f6fc", font="Garamond 20", text="Time 00:00:00")
        self.time_label.grid(row=2, column=0)

        self.stop_loop = False

        self.window.mainloop()
    
    def start_thread(self):
        th = threading.Thread(target=self.start)
        th.start()
    
    def start(self):
        self.stop_loop = False
        hours,minutes,seconds=0,0,0
        string_split = self.time_entry.get().split(":")
        
        # validating the user's entry
        if len(string_split) == 3:
            hours = int(string_split[0])
            minutes = int(string_split[1])
            seconds = int(string_split[2])

        elif len(string_split) == 2:
            minutes = int(string_split[0])
            seconds = int(string_split[1])

        elif len(string_split) == 1:
            seconds = int(string_split[0])

        else:
            print("Invalid time format")
            return
        
        full_seconds = (hours*3600) + (minutes * 60) + seconds

        while full_seconds > 0 and not self.stop_loop:
            full_seconds -= 1

            minutes, seconds = divmod(full_seconds, 60)
            hours, minutes = divmod(minutes, 60)

            self.time_label.config(text=f"Time: {hours:02d}:{minutes:02d}:{seconds:02d}")
            self.window.update()
            time.sleep(1)
        
        # notification code
        if not self.stop_loop:
            notification.notify(title = "Timer",
                                message = "Time is UP!",
                                app_name= "Timer",
                                timeout = 3
                                )

    def stop_countdown(self):
        self.stop_loop = True
        self.time_label.config(text="Text: 00:00:00")


CountdownTimer()