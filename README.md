# XmlReadableConsoleLog #

This is a JavaScript library that allows you to print out your XML data on your browser's console in a readable way, by making use of `console.log`'s CSS parsing functionality. 

# Examples #

Say you for instance recieve a server response that contains some XML data, the value itself might look something in the lines of: 

```javascript
"<bookstore><book><title attrOne=\"valueOne\" attrTwo=\"valueTwo\" attrThree=\"valueThree\">Lorem ipsum dolor sit amet.</title><author>Aenean malesuada</author><year attrThree=\"test\" >1980</year></book><book><author>In quis</author><year attrThree=\"test\" dashed-attr=\"test\">1999</year></book></bookstore>"
```

If you print out that value in your browser's console for debugging purposes, it'd be all in one line and unreadable like above. 