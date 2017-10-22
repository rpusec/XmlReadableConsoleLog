# XmlReadableConsoleLog #

This is a JavaScript library that allows you to print out your XML data on your browser's console in a readable way, by making use of `console.log`'s CSS parsing functionality. 
This library is used specifically for debugging purposes which involves handling XML data. 

# Examples #

Let's say you receive a server response that contains some XML data, and you print it out on your JS console, the value itself might look something in the lines of: 

add image

Which is clearly unreadable, but this library allows you to display our data as:  

add image

# API #

Simply call `XmlReadableConsoleLog` and add the XML data either as a `String` or as an actual `XML` object. 

```javascript 

//without custom settings
XmlReadableConsoleLog(xml);

```

Alternatively, you can also add your own custom settings as the second parameter (These are all of the custom settings that can be applied). 

```javascript 

//with custom settings
XmlReadableConsoleLog(xml, {
	tabSize: 7,
	css: {
		element: 'color: #0a1429',
		attrName: 'color: #00cc99',
		attrValue: 'color: #b3b3ff',
		text: 'color: #ff6600',
	}
});

``` 

Another option is to use the `XmlReadableConsoleLog.globalSettings` object to set your own default settings. 

To change the default CSS for `element`, `attrName`, `attrValue`, and `text`:

```javascript

XmlReadableConsoleLog.globalSettings.setCSS('element', 'color: #000');

```

To setup the default tab size, use: 

```javascript

XmlReadableConsoleLog.globalSettings.setTabSize(7);

```