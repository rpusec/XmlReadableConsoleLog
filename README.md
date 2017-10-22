# XmlReadableConsoleLog #

This is a JavaScript library that allows you to print out your XML data on your browser's console in a readable way, by making use of `console.log`'s CSS parsing functionality. 

Say you for instance recieve a server response that contains some XML data, the value itself might look something in the lines of: 

add image

Which is clearly unreadable, but by using this library, the XML data would be displayed as following: 

add image

# Examples #

To pretty print the XML data, simply call `XmlReadableConsoleLog` and add the XML data either in `String` format or as an actual `XML` object. Alternatively, you can also add your own custom settings in the second parameter as the second parameter. See the example below. 

```javascript 

//with default settings
XmlReadableConsoleLog(xml);

//with custom settings
XmlReadableConsoleLog(xmlTest, {
	tabSize: 7,
	css: {
		element: 'color: #0a1429',
		attrName: 'color: #00cc99',
		attrValue: 'color: #b3b3ff',
		text: 'color: #ff6600',
	}
});

```