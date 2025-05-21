# myunp for Tosu

![{4ECB5624-FEE5-467C-9137-B4AAC4356BF0}](https://github.com/user-attachments/assets/a96ef243-df49-4570-bcfc-8723afe51046)


A Spotify-inspired "Now Playing" overlay for osu! designed to work with [Tosu](https://github.com/tosuapp/tosu).  

---

## Features

- **Looks good** (true) 

- **Shows anything you need, PP, background, song name, progress bar, you name it.**

---

## Requirements

- [Tosu](https://github.com/tosuapp/tosu) running 
- osu! running.
- OBS Studio 

---

## Installation

1. **Clone or download this repository:**
    ```sh
    git clone https://github.com/eaeaaaaaaaaaaaeeeeeeeee/spotifynp.git
    ```

2. **Place the folder in your Tosu static overlays directory**  
 
3. **In OBS:**
    - Add a new **Browser Source**.
    - Set the URL to the local path or Tosu's overlay URL, e.g.:
      ```
      http://localhost:24050/spotifynp/
      ```
    - Set the resolution to **900 x 300**

4. **Start Tosu and osu!**  

---

## Customization

- If you'd like to customize anything in the editor, just go ahead.
- **Fonts and colors** can be changed in `style.css`.
- **Album art** is fetched automatically from osu! beatmap covers.

---

## Credits

- Overlay by **m.d** ([GitHub](https://github.com/eaeaaaaaaaaaaaeeeeeeeee))
- Inspired by Spotify and other osu! overlays I have seen. Thank you.

---
