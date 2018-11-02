# XmlReadableConsoleLog #

This library leverages JavaScript's `console.log` CSS parsing functionality in order to print out your XML data in a readable manner. 
This library is used specifically for debugging purposes.

## Examples ##

Say that you receive a server response that contains an XML output in string format, the output might look something like: 

![unreadable](docs/imgs/xml_unreadable.png)

Which is clearly unreadable, but this library allows you to display your data as: 

![readable](docs/imgs/xml_readable.png)

## API ##

### xmlReadableLog(xmlData, settings) ###

Simply call `xmlReadableLog` and add the XML data either as a `String` or as an actual `XML` object. 

```javascript 

//without custom settings
xmlReadableLog(xml);

```

Alternatively, you can also add your own custom settings as the second parameter (These are all of the custom settings that can be applied). 

```javascript 

//with custom settings
xmlReadableLog(xml, {
	tabSize: 7,
	css: {
		element: 'color: #0a1429',
		attrName: 'color: #00cc99',
		attrValue: 'color: #b3b3ff',
		text: 'color: #ff6600',
	}
});

``` 

The output for the above example will look like: 

![custom settings](docs/imgs/xml_readable_custom.png)

### xmlReadableLog.globalSettings ###

Another option is to use the `xmlReadableLog.globalSettings` object to override the default settings. 

To change the default CSS for `element`, `attrName`, `attrValue`, or `text`, call the `xmlReadableLog.globalSettings.setCSS(String, String)` and add one of the attributes as the first parameter and 
the CSS markup as the second.

To override the default tab size, use `xmlReadableLog.globalSettings.setTabSize(Integer)`. 

The following code demonstrates the `setCSS` and `setTabSize` functions.  

```javascript

//setting up the global settings
xmlReadableLog.globalSettings.setCSS('element', 'color: #000');
xmlReadableLog.globalSettings.setCSS('attrName', 'color: #737373');
xmlReadableLog.globalSettings.setCSS('attrValue', 'color: #a6a6a6; font-weight: bold;');
xmlReadableLog.globalSettings.setCSS('text', 'color: #fff; background-color: #000');
xmlReadableLog.globalSettings.setTabSize(2);
xmlReadableLog(xml);

```

Alternatively, you can pass a key-value paired object to apply your custom CSS settings: 

```javascript 

xmlReadableLog.globalSettings.setCSS({
	element: 'color: #000',
	attrName: 'color: #737373',
	attrValue: 'color: #a6a6a6; font-weight: bold;',
	text: 'color: #fff; background-color: #000'
});

```

The above result will look like: 

![global custom settings](docs/imgs/xml_w_global_settings.png)

## Browser Compatibility ##

Some browsers do not support console log CSS formatting, so the API won't work as expected. 

Known browsers that do support CSS formating are:

* [Chrome](https://developers.google.com/web/tools/chrome-devtools/console/console-write#string_substitution_and_formatting)
* [Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/Console#Styling_console_output)
