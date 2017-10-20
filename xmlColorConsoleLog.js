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
	}

	var CONSTANTS = {
		tab: '    '
	}

	var ns = {};

	ns.colorize = function($xml){
		if(!$xml)
			return;

		if(typeof $xml === 'string')
			$xml = $($.parseXML($xml));

		console.log(readNodeElement($xml));
	}

	function readNodeElement($elementNode, processedXmlStr, tabAmount){
		if(!processedXmlStr)
			processedXmlStr = '';

		if(!tabAmount)
			tabAmount = 0;

		$.each($elementNode, function(){
			var $node = $(this);
			
			console.log($node);

			var elemNode = $node[0];

			switch(parseInt($node.prop('nodeType'))){
				case NODE_TYPES.Element : 

					for(var i = 0; i < tabAmount; i++){
						processedXmlStr += CONSTANTS.tab;
					}

					processedXmlStr += '<' + elemNode.nodeName;

					if(elemNode.attributes && elemNode.attributes.length > 0){
						processedXmlStr += ' ';

						for(var i = 0, attrLength = elemNode.attributes.length; i < attrLength; i++){
							var attr = elemNode.attributes.item(i);
							processedXmlStr += attr.nodeName;

							if(attr.nodeValue)
								processedXmlStr += '=\"' + attr.nodeValue + '\"';

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
						processedXmlStr += elemNode.childNodes[0].textContent;
						addTabs = false;
					}
					else{
						processedXmlStr += '\n\r';
					}

					processedXmlStr = readNodeElement($node.children(), processedXmlStr, tabAmount + 1);

					for(var i = 0; addTabs && i < tabAmount; i++){
						processedXmlStr += CONSTANTS.tab;
					}

					processedXmlStr += '</' + elemNode.nodeName + '>\n\r';
					break;
				case NODE_TYPES.Document : 
				case NODE_TYPES.DocumentType : 
				case NODE_TYPES.DocumentFragment : 
					processedXmlStr = readNodeElement($node.children(), processedXmlStr);
					break;
				//case NODE_TYPES.Notation : 
				//	break;
			}
		});

		return processedXmlStr;
	}

	window.XmlColorConsoleLog = ns;

}());