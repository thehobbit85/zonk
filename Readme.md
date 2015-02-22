# Zonk 

Text Based Adventure Games built with Node.js

> "_It runs on the world's most powerful graphic chip - Imagination_" - Sheldon Cooper

This module is inspired by amazing text based adventure games like [Zork](http://www.infocom-if.org/downloads/downloads.html). 

The game engine is still in active development and supports only basic features. 

_Pull requests and Game Scripts welcome!_

## Installation
Run 
```bash
$ [sudo] npm install -g zonk
```

To play, execute
```bash
$ zonk
```

## For players
Pick a Game script to start off. 
![player demo](https://raw.githubusercontent.com/thehobbit85/zonk/master/demos/demo_player.gif)

You will be shown help instructions before you start the game. At any point, you can type `help` to get help.

If you type 'save' you will create a quick-save which will save the current game.
If you type 'save "savename"' you will create a specific save file.

Type 'restore' to load the quick-save game and 'restore "savename"' to load a specific save file.


## For developers
There is a Game Script, that is fed into the Game Engine. The script file is a JSON, that consists of how the game should work. The game engine describes the scenarios listed in the JSON to the player, takes his input and acts accordingly.

You can either contribute to the Game Script, by building one of your own games or you can contribute to the engine as well. 

To create your own game script, please refer to the `Maya.json` in the `Games` folder.

### Todos :  
* [ ] After restoring a game there is a bug that causes problems with input
* [ ] Player interaction with the objects (_use swords or rocket launchers_)
* [ ] Implement Lexical processing of commands
* [ ] Build game scripts for Zork I, Zork II and Zork III

Based on CLI Adventure Games : https://github.com/arvindr21/cli-adventure-games

## License

Copyright (c) 2015 Eliran Zach, contributors.

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
