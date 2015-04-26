var svgTree = (function () {
	var parser = new DOMParser();
	var diagonal = d3.svg.diagonal();
	var layout = d3.layout.tree()
		.size([950, 940]);

	function getTreeData(node) {

		var _replacement,
			treeData = {
				children: []
			};

		function inner(node, replacement) {
			replacement.ref = node;
			_replacement = {
				children: []
			};
			for (var i = 0; i < node.childNodes.length; i++) {
				replacement.children.push(_replacement);
				inner(node.childNodes[i], _replacement);
			}
			return replacement;
		}

		return inner(node, treeData);
	}

	function svgTree(htmlString, node) {
		var data = getTreeData(parser.parseFromString(htmlString.replace(/&lt;/g, '<').replace(/&gt;/g, '>'), 'text/html'));
		var nodes = layout.nodes(data);
		var links = layout.links(nodes);

		var canvas = d3.select(node)
			.append('svg')
			.attr('width', '100%')
			.attr('height', '100%')
			.attr('viewBox', '0 -60 1000 1060');

		canvas.append('g')
			.classed('links', true)
			.selectAll('path')
			.data(links)
			.enter()
			.append('path')
			.attr('d', diagonal);

		var g = canvas.append('g')
			.classed('nodes', true)
			.selectAll('.node')
			.data(nodes)
			.enter()
			.append('g')
			.attr('transform', function (d) { return 'translate(' + d.x + ' ,' + d.y + ' )'; });

		g.append('text')
			.text(function (d) {
				if (d.ref.tagName) {
					return d.ref.tagName.toLowerCase();
				}

				if (d.ref.constructor === HTMLDocument) {
					return 'DOCUMENT';
				}
				if (d.ref.constructor === DocumentType) {
					return 'DOCTYPE';
				}

				if (d.ref.constructor === Text) {
					return 'text';
				}
			})
			.attr('dx', function (d) {
				var length = d.textLength = this.getComputedTextLength();
				return - length / 2;
			});

		g.insert('rect', 'text')
			.attr('x', function (d) { return - d.textLength / 2 - 30; })
			.attr('y', -32)
			.attr('width', function (d) {
				return d.textLength + 60;
			})
			.attr('height', 60);
	}

	return svgTree;

})();
