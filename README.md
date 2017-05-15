# Distributed Music Workshop

Sébastien Piquemal (Helsinki, Finland)

Ben Taylor (Massachusetts, US)



### Outline

[Introduction & Overview](#introduction) <br>
[Installation](#installation) <br>
[WebPd](#webpd) <br>
[NexusUI](#nexusui) <br>
[Rhizome](#rhizome) <br>
[Templates](#templates)

**Lunch**

Develop Your Instrument<br>
Investigation of different strategies / interfaces / synths <br>
Performance





# Introduction

You can follow along with our [slides](./slides.pdf)

### How Javascript Enables Distributed Music

Contemporary developments in Javascript are enabling modern distributed music, and have led to its growth as a performance practice:

- Web Audio API: Web audio, a full-featured synthesis engine in Javascript, allows mobile browsers to become distributed music instruments. The setup time for the audience is much quicker than when using native mobile apps. In addition to WebPD, you might want to check out the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) and [Tone.js](https://tonejs.github.io/).

- Socket.io is a Node.js library which opens a bi-directional communication channel between remote devices using WebSockets. Written in Javascript, it allows developers to write front-end (interface) code and back-end (server) code in the same language.


Javascript has expanded from its original use as an interaction engine, to a language that encompasses interface, communication, and sound— all the elements needed to create a distributed performance.



<img src="media/js-illustr.png" width="350px">



In this workshop, we will look at three toolkits which develop these aspects of distributed music:

- **Sound**: WebPd : https://github.com/sebpiq/WebPd
- **Interface**: NexusUI : https://taylorbf.github.io/Musicians-Toolkit/api/#intro
- **Communication**: Rhizome : https://github.com/sebpiq/rhizome






# Installation

### Command-line basics:

To install node.js and work with node.js, you will need to know use the command line interface on your computer.

The command line is a program that allows you to run commands on your machine by using a text interface. On Linux and OSX it is called **Terminal** and on Windows **PowerShell**. We will use it fairly frequently during this workshop.

With the command line, you can navigate your file system, create & edit files, run scripts, etc ... If you have never used a terminal, no panic. Here a very short primer.

- **To run a command**: type it in the command line prompt and press enter
- **Listing files:**  At any moment in your terminal you are located withing a folder on your filesystem. To list the contents of the current folder, run the command `ls`
- **Changing directory:** To navigate to a subfolder within your current folder, run the command `cd foldername`. For example, if the folder's name is my-files, run `cd my-files`
- **Changing directory (to parent):** To navigate to the parent folder of your current folder, run the command `cd ..`




## Install Node.js and npm

**Install node with nvm (Linux)**

- Go to [nvm](https://github.com/creationix/nvm#install-script) web page, and copy the one-liner install script. Depending on your distribution, you might not have `curl` installed, so copy the script starting with `wget` instead.
- Paste that script in a terminal and execute.
- Then install node by running `nvm install 6` in your terminal.
- try that `node` and `npm` are installed correctly by running `node -v` and `npm -v`



**Install node with nvm (OSX)**

- Go to [node.js](https://nodejs.org/en/) web page, and run the installer.
- Open a terminal and try that `node` and `npm` are installed correctly by running `node -v` and `npm -v`

If running these commands failed, you might need to manually add the node folder to your `PATH` :

**Install node on Windows**

- Download from [Node.js](https://nodejs.org/en/), and run the installer
- Open PowerShell, and try to run `node -v` as well as `npm -v` to make sure that `node` and `npm` are installed

If running these commands failed, you might need to manually add the node folder to your `PATH` :

- Figure out first where your node executables are located on your disk, most likely somewhere below `C:\Program Files\nodejs\`.
- Open windows system settings `System > Advanced system settings > Environment variables` and add the folder you found in the previous step to the `PATH` variable.
- Restart PowerShell, and try to run again `node -v` and `npm -v` commands.




## Install node libraries

Now that node.js is installed properly, let's install a couple of node libraries we will need during the workshop.

Run the two following commands :

```
npm install -g http-server
npm install -g rhizome-server
```

**Note:** It is possible that you will need to use sudo to install these with admin privileges:

`sudo npm install -g rhizome-server`



## Install Pure Data

Download and install Pure Data from the following [page](https://puredata.info/downloads/pure-data).




## Install a Code editor

Install a text editor for programming. We recommend [Atom](https://flight-manual.atom.io/getting-started/sections/installing-atom/). Programs such as Word or LibreOffice won't work. 









___

Now the fun part!

___





# WebPd

WebPd is a Pure Data runtime implemented in JavaScript and built on top of Web Audio API.

Full WebPd instructions are [here](https://github.com/sebpiq/WebPd#step-by-step-guide). 

However, we've prepared a template for you to jump start your use of WebPd.

- Download this repository if you haven't yet. At the top of this page, click the big green button that says "Clone or Download", and choose "Download Zip" to download the contents of this repository.

- Open the "webpd-basic" folder in your code editor

- Check out the [Readme](./webpd-basic) for the template.

  ​


**Let's pause here and hack a bit with WebPd**





# NexusUI

NexusUI is a set of musical interface components written in HTML, SVG, and Javascript. They will be the interface engine for our distributed music instruments.

This updated version of NexusUI is in a beta period right now, so if you find bugs, please speak up and feel free to [report them on Github]().

A full tutorial on NexusUI is in the [NexusUI API]().

Here are the basics --

### Creating an interface

NexusUI transforms regular HTML elements into interfaces.

Create an HTML element in the body of your document and give it an ID. You can use **div** or **span**.

HTML:

```HTML
<div id="target"></div>
```

JS:

```javascript
var dial = new mt.Dial("#target")
```



*Tip: My preferred method is to use a div element with a display style of inline-block. You also might want to give your element a width and height. So your HTML may look something like this:*

```html
<div id="target" style="width:200px;height:200px;display:inline-block"></div>
```



### Configuring the interface

You can give your interface certain settings when you create it.

```javascript
var dial = new mt.Dial('#target',{
  min: 0,
  max: 1000,
  step: 100,
  value: 500  // its initial value
  interaction: "vertical"
});
```

Check each interface's API for its setting options.



### Listening for interaction events

After you create an interface, you can create an event listener for its interaction:

```javascript
dial.on('change',function(v) {
  // do something with v!
});
```

Check each interface's API for a list of its events. (Almost all interfaces use only a 'change' event, which is called when the interface is interacted with.)



### Sending interaction event data to WebPD

We can integrate NexusUI with WebPD by sending the interface's event data to WebPD.

A good first step is to log your data.

```javascript
dial.on('change',function(v) {
  console.log(v);
});
```

What kind of information is your interface giving you?

 (The answer is also written in the NexusUI API for each interface, under "Events".)

#### If the event data is a number or string:

If your data is a number or text string, you can send it to WebPD directly:

```javascript
dial.on('change',function(v) {
  Pd.send("frequency", [v])
});
```

This will often be the case! Such as with: dial, slider, number.

#### If the event data is a boolean

Some interfaces, such as a toggle, return a boolean (true/false) when interacted with. PD won't understand this exactly, so you will need to convert it to a number, such as 0 and 1.

```javascript
var toggle = new mt.Toggle("#target")

toggle.on('change',function(v) {
  var state;
  if (v) {
    state = 1
  } else {
    state = 0
  }
  // Or, use the shorthand:    
  // var state = v ? 1 : 0;

  // Then send the state number value to PD
  Pd.send('note', [state]);
});
```

#### If the event data is a JS Object 

However, sometimes your interface data might be a Javascript object with several properties, and PD won't understand it. This will especially happen with the more complex interfaces: sequencer, piano, multislider, envelope, etc.

In that case you will need to send each of the properties separately, or create a PD message with multiple items, as in this example:

```javascript
var multislider = new mt.Multislider("#target")

multislider.on('change',function(v) {
  // v.index contains slider number being changed
  // v.value is the new value of the slider
  // we can send them as a combined message to PD
  Pd.send('note', [v.index, v.value]);
});
```

Another good example of this is the *position* NexusUI element — a 2d touch slider with x and y properties:

```javascript
var position = new mt.Position("#target")

position.on('change',function(v) {
  // v.x contains the touch value on the x axis
  // v.y contains the touch value on the y axis
  // we can use them each to control something different:
  Pd.send('frequency', [ v.x * 1000 ]);
  Pd.send('volume', [v.y]);
});
```



#### Full NexusUI / WebPD Example

Cool, let's put it all together!!

You can try this code out in the [Standalone Web Instrument](/standalone) template

```html
<html>
  <head>
    <script type="text/javascript" src="libraries/mt.js"></script>
    <script type="text/javascript" src="libraries/webpd-latest.js"></script>
    <script type="text/javascript" src="libraries/jquery.js"></script>
  </head>
  <body>

    <div id="position" style="widht:100%;height:100%"></div>

    <script>

      /* Load WebPD */

      var patch
      $.get('./pd/main.pd', function(mainStr) {
        // Loading the patch
        patch = Pd.loadPatch(mainStr)
        Pd.start()
      })

      /* Config the UI */

      var position = new mt.Position('#position',{
        minX: 0,
        maxX: 500,
        minY: 0,
        maxY: 1,
        event: function(v) {
          // send v.x and v.y to PD
          Pd.send('frequency', [v.x])
          Pd.send('volume', [v.y])
        }
      })

    </script>

  </body>
</html>
```



**Let's pause here to develop your instrument using NexusUI to control WebPD.**





# Rhizome

The rhizome setup tutorial is [here](https://github.com/sebpiq/rhizome) at the rhizome github.

### Basics

In any template folder using rhizome — such as the 1-to-n, n-to-1, and n-to-n templates — you can start the rhizome server by running the following command in your Terminal/Shell.

```
rhizome config.js
```

You may need to use sudo to run this with admin privileges, depending on your computer settings:

```
sudo rhizome config.js
```



See the templates, such as the [1-to-n](./one-to-n) template to see rhizome configured to control an array of devices from a central interface. 





# Templates

### [Standalone Web Instrument](/standalone/)  

### [One Performer controls N Devices](/one-to-n)

### [N Devices control One Computer](/n-to-one/)

### [Device-to-Device Communication](n-to-n)



# Lab

**Take one of the above templates as a starting point for developing your own distributed music instrument.**

If you're not sure where to get started, we recommend "One Performer Controls N Devices," which uses the audience as a speaker array.

