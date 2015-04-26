module.exports = function (grunt) {
	var global = {
		property: "asdddddddd"
	};
	grunt.initConfig({
		stylus: {
			1: {
				options: {
					compress: false
				},
				files: {
					'styles/stylus.css': ['styles/1.styl']
				}
			},
			11: {
				options: {
					compress: false
				},
				files: {
					'styles/stylus.css': ['styles/11.styl']
				}
			},
			2: {
				options: {
					compress: false
				},
				files: {
					'styles/stylus.css': ['styles/2.styl']
				}
			},
			3: {
				options: {
					compress: false
				},
				files: {
					'styles/stylus.css': ['styles/3.styl']
				}
			},
			33: {
				options: {
					compress: false
				},
				files: {
					'styles/stylus.css': ['styles/33.styl']
				}
			},
			333: {
				options: {
					compress: false
				},
				files: {
					'styles/stylus.css': ['styles/333.styl']
				}
			},
			4: {
				options: {
					compress: false
				},
				files: {
					'styles/stylus.css': ['styles/4.styl']
				}
			},
			5: {
				options: {
					compress: false,
					use: [
						copyright
					]
				},
				files: {
					'styles/stylus.css': ['styles/5.styl']
				}
			},
			//@extend
			6: {
				options: {
					compress: false,
					use: [
						copyright
					]
				},
				files: {
					'styles/stylus.css': ['styles/6.styl']
				}
			},
			7: {
				options: {
					compress: false,
					use: [
						copyright
					]
				},
				files: {
					'styles/stylus.css': ['styles/7.styl']
				}
			},
			// copyright image
			9: {
				options: {
					compress: false,
					urlfunc: {
						name: 'embedurl',
						limit: 500000 // 30000by default (30kb)
					},

					use: [
						copyright
					]
				},
				files: {
					'styles/stylus.css': ['styles/9.styl']
				}
			},
			10: {
				options: {
					compress: false,
					urlfunc: {
						name: 'embedurl',
						limit: 500000 // 30000by default (30kb)
					},
					use: [
						copyrightImage,
						copyright
					]
				},
				files: {
					'styles/stylus.css': ['styles/10.styl']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-stylus');

	function copyright() {
		return function (style) {
			var date = new Date();
			style.define('copyright', date.getFullYear().toString());
		};
	}

	function copyrightImage(var1) {
		console.log(var1);
		return function (style, option) {
			JSON.stringify(style);
			console.log(option);
			console.log(style);
			var date = new Date();
			style.define('copyrightImage', function (path) {
				var Canvas = require('canvas'),
					Image = Canvas.Image,
					canvas = new Canvas(),
					ctx = canvas.getContext('2d'),
					fs = require('fs');

				var background = new Image();
				background.src = fs.readFileSync(__dirname + '\\styles\\background.png');
				canvas.width = background.width;
				canvas.height = background.height;
				ctx.drawImage(background, 0, 0);

				var logo = new Image();
				logo.src = fs.readFileSync(__dirname + '\\styles\\stylus.png');
				ctx.drawImage(logo, background.width / 2 - logo.width / 2, 100, logo.width, logo.height);
				return canvas.toDataURL();
			});
		};
	}
};
