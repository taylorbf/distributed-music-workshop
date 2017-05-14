# Distributed Music Workshop

Leaders: Sebastien Piquemal (Helsinki, Finland) & Ben Taylor (Massachusetts, US)



### Outline

Introduction <br>
Discussion: Concept & History <br>
[Installation](#installation) <br>

​	

[WebPd](#webpd) <br>

[NexusUI](#nexusui) <br>
[Rhizome](#rhizome) <br>
[Templates](#templates)

**Lunch**

Develop Your Instrument<br>
Investigation of different strategies / interfaces / synths <br>
Performance





# Introduction









### History

This history of distributed music precedes the smartphone by several decades. (For more on this, come to my [paper](media/history-audience-speaker.pdf) presentation on Thursday!)

In 1974, Jose Maceda's [Ugnayan]() is the first work identified with this genre of performance. He was able to broadcast a 1 hour multi-track *musique concrete* composition over approximately 30 radio stations in Manila, Philipines. The event was highly publicized and city-goers were encouraged to take their radios out into the street to realize the piece.

Maceda’s assistant Ramo ́n Santos notes how Maceda used the unique performance format as a compositional mechanism:

> Instead of reprocessing and reshaping these sounds electronically in a studio, Maceda utilized the human energies and the physical space of town plazas and parks to reprocess the sounds in semi-improvised dispersion schemes.

In other words, Maceda used distribution and participation, rather than the studio, as a means to compose musique concrete, to transform *objet sonores* into music.

![](media/ugnayan-santos.png)

We see this model in many other distributed music performances over the past 2 decades, including Golan Levin's *Dialtones: A Telesymphony* (2001). The composers installed custom ringtones on the audience's phones, and gave them precise seating locations, giving the composers control over both harmonic and spatial aspects.

<img src="media/dialtones-audience.jpg" width="800px">

There have been many more performances in this model since 2001 — check the paper!



### How Javascript Enables Distributed Music

Contemporary developments in Javascript enable distributed music, and have led to its proliferation.

- Web Audio API: Web audio, a full-featured synthesis engine in the browser, allows websites to become distributed music instruments. This makes for much quicker setup. 

  - In addition to WebPD, you might want to check out the Web Audio API and/or Tone.js.

- Socket.io:

  ​

Javascript has really expanded from its original use as an interaction engine, to a language that encompasses interface, communication, and sound — all the elements needed to create a distributed performance.

<img src="media/js-illustr.png" width="350px">



### Our toolkits

links to our 3 toolkits here...










# Installation

**Install node with nvm**

**Install Pure Data**

**Atom / Sublime**

rhizome

incl command line primer





# WebPd









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
var dial = new mt.Dial("target")
```



*Tip: My preferred method is to use a div element with a display style of inline-block. You also might want to give your element a width and height. So your HTML may look something like this:*

```html
<div id="dial" style="width:200px;height:200px;display:inline-block"></div>
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

#### If the event data is a JS object ( with { } around it )

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









# Rhizome







# Templates



### [Standalone web instrument](/standalone/)  

### [One Performer controls N Devices](/one-to-n)

### [N Devices control One Computer](/n-to-one/)

### Device-to-Device Communication 

### If Time: One Performer sends a series of interfaces to N Devices


