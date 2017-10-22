(function(){

	var ENUM = {
		NODE_TYPES: {
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
		},
		NEW_LINE: '\n\r'
	};

	var defaultSettings = {
		tabSize: 4,
		css: {
			element: 'color: #cc0000',
			attrName: 'color: #ff8c1a',
			attrValue: 'color: #6666ff',
			text: 'color: #000',
		}
	};

	/**
	 * Main object. 
	 * @param {XML/String} xml An xml either represented in string format or as an actual XML. 
	 * @author rpusec
	 */
	function XmlReadableConsoleLog(xml, customSettings){
		var xmlReadable = new XmlReadable(xml, customSettings);
		console.log.apply(console, xmlReadable.expectedStyles);
	}

	function XmlReadable(xml, customSettings){

		if(typeof customSettings === 'object'){
			if(!customSettings.hasOwnProperty('tabSize')){
				customSettings.tabSize = defaultSettings.tabSize;
				customSettings.tab = parseTabBySize(defaultSettings.tabSize);
			}

			if(!customSettings.hasOwnProperty('css'))
				customSettings.css = defaultSettings.css;
			else
			{
				for(var sKey in defaultSettings.css){
					if(!customSettings.css.hasOwnProperty(sKey))
						customSettings.css[sKey] = defaultSettings.css[sKey];
				}
			}

			for(var key in customSettings)
				this[key] = customSettings[key];
			this['tab'] = parseTabBySize(customSettings.tabSize);
		}
		else
		{
			for(var key in defaultSettings)
				this[key] = defaultSettings[key];
			this['tab'] = parseTabBySize(defaultSettings.tabSize);
		}

		if(typeof xml === 'string')
			xml = parseXML(xml);

		this.expectedStyles = [];
		this.readNodeElement(xml.childNodes);
		this.expectedStyles.unshift(this.processedXmlStr);
	}

	var proto = XmlReadable.prototype;

	/**
	 * Reads an XML object line by line, recreates the said XML by concatenating each 
	 * individual node element to this.processedXmlStr parameter, and adds %c characters to specific positions. 
	 * @param  {NodeList} childNodes     Current child nodes.
	 * @return {String}                  Processed string. 
	 */
	proto.readNodeElement = function(childNodes, tabAmount){
		if(!this.processedXmlStr)
			this.processedXmlStr = '';

		if(!tabAmount)
			tabAmount = 0;

		for(var elemNodeKey in childNodes){
			var elemNode = childNodes[elemNodeKey];

			switch(parseInt(elemNode.nodeType)){
				case ENUM.NODE_TYPES.Element : 
					for(var i = 0; i < tabAmount; i++){
						this.processedXmlStr += this.tab;
					}

					this.processedXmlStr += this.assocWith(this.css.element, '<' + elemNode.nodeName);

					if(elemNode.attributes && elemNode.attributes.length > 0){
						this.processedXmlStr += ' ';

						for(var i = 0, attrLength = elemNode.attributes.length; i < attrLength; i++){
							var notLastItem = (i != attrLength - 1);

							var attr = elemNode.attributes.item(i);
							this.processedXmlStr += this.assocWith(this.css.attrName, attr.nodeName, notLastItem ? false : !attr.nodeValue);

							if(attr.nodeValue){
								this.processedXmlStr += '=';
								this.processedXmlStr += this.assocWith(this.css.attrValue, '\"' + attr.nodeValue + '\"', !notLastItem);
							}

							if(notLastItem)
								this.processedXmlStr += ' ';
						}
					}

					this.processedXmlStr += '>';

					var addTabs = true;

					if(elemNode.childNodes && 
						elemNode.childNodes.length > 0 && 
						elemNode.childNodes[0].nodeType === ENUM.NODE_TYPES.Text && 
						elemNode.childNodes[0].textContent)
					{
						this.processedXmlStr += this.assocWith(this.css.text, elemNode.childNodes[0].textContent);
						addTabs = false;
					}
					else if(elemNode.childNodes && elemNode.childNodes.length == 0){
						addTabs = false;
					}
					else{
						this.processedXmlStr += ENUM.NEW_LINE;
					}

					this.readNodeElement(elemNode.childNodes, tabAmount + 1);

					for(var i = 0; addTabs && i < tabAmount; i++){
						this.processedXmlStr += this.tab;
					}

					this.processedXmlStr += '</' + elemNode.nodeName + '>' + ENUM.NEW_LINE;
					break;
				case ENUM.NODE_TYPES.Document : 
				case ENUM.NODE_TYPES.DocumentType : 
				case ENUM.NODE_TYPES.DocumentFragment : 
					this.readNodeElement(elemNode.childNodes, tabAmount);
					break;
			}
		}
	}

	/**
	 * Adds %c to a specific xml node. 
	 * @param  {String} strCss     CSS in string format. 
	 * @param  {String} xmlNodeStr Specified part/node of the xml
	 * @return {String}            The XML node concatenated with the %c params. 
	 */
	proto.assocWith = function(strCss, xmlNodeStr, addElemCSS){
		if(typeof addElemCSS === 'undefined')
			addElemCSS = true;

		this.expectedStyles.push(strCss);
		var res = '%c' + xmlNodeStr;

		if(addElemCSS){
			this.expectedStyles.push(this.css.element);
			res += '%c';
		}

		return res;
	}

	/**
	 * Parses an xml string to an actual xml. 
	 * @param  {String} xml Xml string. 
	 * @return {Xml}        Actual Xml.
	 */
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

	//global settings
	var globalSettings = {};

	/**
	 * Alters CSS used to represent a part of an XML. 
	 *
	 * //first option
	 * @param {String} type   Refers the node type of an XML file. Possible values include: 'element', 'attrName', 'attrValue', 'text'. 
	 * @param {String} strCss The CSS markup in string format. Example: 'color: #cc0000; background-color: #000; ...'
	 *
	 * //second option
	 * @param {Object} params CSS custom props as Key-value pairs 
	 */
	globalSettings.setCSS = function(){
		if(arguments.length == 2 && typeof arguments[0] === 'string' && typeof arguments[1] === 'string'){
			var type = arguments[0];
			var strCss = arguments[1];
			defaultSettings.css[type] = strCss;
		}
		else if(typeof arguments[0] === 'object'){
			var params = arguments[0];
			for(var cssKey in params){
				defaultSettings.css[cssKey] = params[cssKey];
			}
		}
	}

	/**
	 * Sets the size of tabs. 
	 * @param {Integer} size The specified tab size. 
	 */
	globalSettings.setTabSize = function(size){
		defaultSettings.tabSize = size;
	}

	function parseTabBySize(size) {
		var tab = '';
		for(var i = 0; i < size; i++)
			tab += ' ';
		return tab;
	}

	globalSettings.setTabSize(defaultSettings.tabSize);

	XmlReadableConsoleLog.globalSettings = globalSettings;

	window.xmlReadableLog = XmlReadableConsoleLog;

}());