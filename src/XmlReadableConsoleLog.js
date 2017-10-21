(function(){

	var NODE_TYPES = {
		'Element': 1,
		'Attr': 2,
		'Text': 3,
		'CDATASection': 4,
		'EntryReference': 5,
		'Entity': 6,
		'ProcessingInstruction': 7,
		'Comment': 8,
		'Document': 9,
		'DocumentType': 10,
		'DocumentFragment': 11,
		'Notation': 12
	};

	var TAB = '    ';
	var NEW_LINE = '\n\r';

	var CSS = {
		element: 'color: #cc0000',
		attrName: 'color: #ff8c1a',
		attrValue: 'color: #6666ff',
		text: 'color: #000',
	};

	var expectedStyles = [];

	/**
	 * Main object. 
	 * @param {XML/String} xml An xml either represented in string format or as an actual XML. 
	 * @author rpusec
	 */
	function XmlReadableConsoleLog(xml){
		if(typeof xml === 'string')
			xml = parseXML(xml);

		var convertedXmlStr = readNodeElement(xml.childNodes);

		expectedStyles.unshift(convertedXmlStr);
		console.log.apply(console, expectedStyles);

		while(expectedStyles.length > 0)
			expectedStyles.pop();
	}

	/**
	 * Alters CSS used to represent a part of an XML. 
	 * @param {String} type   Refers the node type of an XML file. Possible values include: 'element', 'attrName', 'attrValue', 'text'. 
	 * @param {String} strCss The CSS markup in string format. Example: 'color: #cc0000; background-color: #000; ...'
	 */
	XmlReadableConsoleLog.setCSS = function(type, strCss){
		CSS[type] = strCss;
	}

	/**
	 * Sets the size of tabs. 
	 * @param {Integer} size The specified tab size. 
	 */
	XmlReadableConsoleLog.setTabSize = function(size){
		TAB = '';
		for(var i = 0; i < size; i++)
			TAB += ' ';
	}

	/**
	 * Reads an XML object line by line, recreates the said XML by concatenating each 
	 * individual node element to processedXmlStr parameter, and adds %c characters to specific positions. 
	 * @param  {NodeList} childNodes     Current child nodes.
	 * @param  {String} processedXmlStr  Currently processed XML string. 
	 * @param  {Integer} tabAmount       The amount of tabs. 
	 * @return {String}                  Processed string. 
	 */
	function readNodeElement(childNodes, processedXmlStr, tabAmount){
		if(!processedXmlStr)
			processedXmlStr = '';

		if(!tabAmount)
			tabAmount = 0;

		for(var elemNodeKey in childNodes){
			var elemNode = childNodes[elemNodeKey];

			switch(parseInt(elemNode.nodeType)){
				case NODE_TYPES.Element : 
					for(var i = 0; i < tabAmount; i++){
						processedXmlStr += TAB;
					}

					processedXmlStr += assocWith(CSS.element, '<' + elemNode.nodeName);

					if(elemNode.attributes && elemNode.attributes.length > 0){
						processedXmlStr += ' ';

						for(var i = 0, attrLength = elemNode.attributes.length; i < attrLength; i++){
							var attr = elemNode.attributes.item(i);
							processedXmlStr += assocWith(CSS.attrName, attr.nodeName);

							if(attr.nodeValue){
								processedXmlStr += '=';
								processedXmlStr += assocWith(CSS.attrValue, '\"' + attr.nodeValue + '\"');
							}

							if(i != attrLength - 1)
								processedXmlStr += ' ';
						}
					}

					processedXmlStr += '>';

					var addTabs = true;

					if(elemNode.childNodes && 
						elemNode.childNodes.length > 0 && 
						elemNode.childNodes[0].nodeType === NODE_TYPES.Text && 
						elemNode.childNodes[0].textContent)
					{
						processedXmlStr += assocWith(CSS.text, elemNode.childNodes[0].textContent);
						addTabs = false;
					}
					else if(elemNode.childNodes && elemNode.childNodes.length == 0){
						addTabs = false;
					}
					else{
						processedXmlStr += NEW_LINE;
					}

					processedXmlStr = readNodeElement(elemNode.childNodes, processedXmlStr, tabAmount + 1);

					for(var i = 0; addTabs && i < tabAmount; i++){
						processedXmlStr += TAB;
					}

					processedXmlStr += '</' + elemNode.nodeName + '>' + NEW_LINE;
					break;
				case NODE_TYPES.Document : 
				case NODE_TYPES.DocumentType : 
				case NODE_TYPES.DocumentFragment : 
					processedXmlStr = readNodeElement(elemNode.childNodes, processedXmlStr);
					break;
			}
		}

		return processedXmlStr;
	}

	/**
	 * Adds %c to a specific xml node. 
	 * @param  {String} strCss     CSS in string format. 
	 * @param  {String} xmlNodeStr Specified part/node of the xml
	 * @return {String}            The XML node concatenated with the %c params. 
	 */
	function assocWith(strCss, xmlNodeStr){
		expectedStyles.push(strCss, CSS.element);
		return '%c' + xmlNodeStr + '%c';
	}

	function parseXML(xml){
		if ( window.DOMParser ) { // Standard
			var tmp = new DOMParser();
			xml = tmp.parseFromString( xml , "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( xml );
		}
		return xml;
	}

	window.XmlReadableConsoleLog = XmlReadableConsoleLog;

}());