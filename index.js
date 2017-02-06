(function(factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        if (typeof module === 'object' && module.exports) {
            module.exports = factory();
        } else {
            window.cssObject = factory();
        }
    }
}(function() {
    "use strict";

    function isArray(data) {
        if (Array.isArray(data)) {
            return true;
        }
        if (typeof data === 'object') {
            if (Object.prototype.toString.call(data) === '[object Array]') {
                return true;
            }
        }
        return false;
    }

    function isObject(data) {
        return typeof data === 'object';
    }

    function isString(data) {
        return typeof data === 'string';
    }

    function isEmpty(data) {
        var emptyValues = [undef, null, false, 0, '', '0'];
        for (var i in emptyValues) {
            if (data === emptyValues[i]) {
                return true;
            }
        }
        if (typeof data === 'object') {
            for (var i in data) {
                return false;
            }
            return true;
        }
        return false;
    }

    function extend(foo, bar) {
        if (isArray(foo) === false && isObject(foo) === false) {
            return foo;
        }
        if (isArray(bar) === false && isObject(bar) === false) {
            return foo;
        }
        for (var i in bar) {
            if (isArray(bar[i]) || isObject(bar[i])) {
                if (foo[i] === undefined) {
                    if (isArray(bar[i])) {
                        foo[i] = [];
                    } else if (isObject(bar[i])) {
                        foo[i] = {};
                    } else {
                        foo[i] = '';
                    }
                }
                foo[i] = extend(foo[i], bar[i]);
            } else {
                foo[i] = bar[i];
            }
        }
        return foo;
    }

    function joinCss(css) {
        var result = [];
        for (var i in css) {
            result.push(i + ': ' + css[i]);
        }
        return result.join('; ').trim();
    }

    function splitCss(css) {
        var result = {};
        var style = css.split(';');
        for (var i in style) {
            var data = style[i].toString().trim().split(':');
            if (data.length === 2) {
                var a = data[0].trim();
                var b = data[1].trim();
                result[a] = b;
            }
        }
        return result;
    }

    function splitClass(classes) {
        return classes.replace(/\s+/g, ' ').toString().trim().split(' ');
    }
    
    return {
        addClass: function(options, className) {
            if (!isObject(options)) {
                return options;
            }
            if (isArray(className) || isObject(className)) {
                for (var i in className) {
                    options = this.addClass(options, className[i]);
                }
            } else {
                if (options.class === undefined) {
                    options.class = '';
                }
                var classArray = splitClass(options.class);
                if (classArray.indexOf(className) === -1) {
                    classArray.push(className.trim());
                }
                for (var i in classArray) {
                    if (classArray[i].trim() == '') {
                        classArray.splice(i, 1);
                    }
                }
                options.class = classArray.join(' ');
            }
            return options;
        },
        removeClass: function(options, className) {
            if (!isObject(options)) {
                return options;
            }
            if (isArray(className) || isObject(className)) {
                for (var i in className) {
                    this.removeClass(options, className[i]);
                }
            } else {
                if (options.class === undefined) {
                    return options;
                }
                var classArray = splitClass(options.class);
                if (classArray.indexOf(className) !== -1) {
                    classArray.splice(classArray.indexOf(className), 1);
                }
                options.class = classArray.join(' ');
            }
            return options;
        },
        attr: function(options, property, value) {
            if (!isObject(options)) {
                return options;
            }
            if (isObject(property)) {
                options = extend(options, property);
            } else if (property && value) {
                var attribute = {};
                attribute[property] = value;
                options = extend(options, attribute);
            } else if (isString(property)) {
                return options[property];
            }
            return options;
        },
        removeAttr: function(options, property) {
            if (!isObject(options)) {
                return options;
            }
            if (isObject(property) || isArray(property)) {
                for (var i in property) {
                    options = this.removeAttr(options, property[i]);
                }
            } else {
                if (options[property] !== undefined) {
                    delete options[property];
                }
            }
            return options;
        },
        css: function(options, key, value) {
            if (!isObject(options)) {
                return options;
            }
            if (options.style === undefined) {
                options.style = {};
            }
            var styles = options.style;
            if (!isObject(styles)) {
                styles = splitCss(styles);
            }
            if (isObject(key)) {
                for (var i in key) {
                    styles[i] = key[i];
                }
            } else {
                styles[key] = value;
            }
            options.style = joinCss(styles);
            return options;
        },
        removeCss: function(options, key) {
            if (!isObject(options)) {
                return options;
            }
            if (options.style === undefined) {
                return options;
            }
            var styles = options.style;
            if (!isObject(styles)) {
                styles = splitCss(styles);
            }
            if (isObject(key) || isArray(key)) {
                for (var i in key) {
                    var name = key[i];
                    if (styles[name] !== undefined) {
                        delete styles[name];
                    }
                }
            } else {
                if (styles[key] !== undefined) {
                    delete styles[key];
                }
            }
            options.style = joinCss(styles);
            return options;
        },
        merge: function(options, options2) {
            if (!isObject(options)) {
                options = {};
            }
            if (!isObject(options2)) {
                return options;
            }
            for (var i in options2) {
                if (i == 'class') {
                    options = this.addClass(options, options2[i]);
                } else if (i == 'style') {
                    var styles = options2[i];
                    if (!isObject(styles)) {
                        styles = splitCss(styles);
                    }
                    options = this.css(options, styles);
                } else {
                    if (!isObject(options)) {
                        options = {};
                    }
                    
                    if (options[i] === undefined) {
                        options[i] = options2[i];
                    } else {
                        options = extend(options[i], options2[i]);
                    }
                }
            }
            return options;
        }
    }
}));