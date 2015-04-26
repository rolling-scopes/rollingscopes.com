(function () {
	'use strict';

	var TASK_NOT_FOUND_MD = '**TASK NOT FOUND**';
	var TASKS_BASE_URL = window.location.pathname.replace('tasks.html', '') + 'tasks/markdown/';
	var WELCOME = '**WELCOME**';
	var mdContainer = document.querySelector('.markdown-body');
	var taskName;

	marked.setOptions({
		highlight: function (code) {
			return hljs.highlightAuto(code).value;
		}
	});

	window.onhashchange = render;
	render();

	function render() {
		var taskName = getTaskName();

		if (!taskName) {
			return renderTaskContent(WELCOME);
		}

		loadTask(taskName)
			.then(renderTaskContent)
			.catch(function () {
				renderTaskContent(TASK_NOT_FOUND_MD);
			});
	}

	function loadTask(taskName) {
		return fetch(TASKS_BASE_URL + taskName + '.md')
			.then(getResponseText);
	}

	function getResponseText(res) {
		if (res.status === 404) {
			return TASK_NOT_FOUND_MD;
		}
		return res.text();
	}

	function renderTaskContent(md) {
		mdContainer.innerHTML = marked(md);
	}

	function getTaskName() {
		return window.location.hash.replace('#', '');
	}

})();
