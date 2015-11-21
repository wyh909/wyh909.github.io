window.jQuery && !window.handleHeaderProduct && (window.handleHeaderProduct = function() {
    $(".log-dd-trigger").hover(function() {
        $(".u-box").show(), $(".log-dropdown").show();
    }, function() {
        $(".u-box").hide(), $(".log-dropdown").hide();
    }), $("#headerNav").on("mouseenter", ".meizu-header-sub a", function() {
        var e = $(this), t = e.closest(".meizu-header-sub"), i = t.find("a");
        i.each(function() {
            $(this)[0] !== e[0] && ($(this).css("opacity", "0.5"), $(this).css("filter", 'alpha(opacity="50")'));
        });
    }).on("mouseleave", ".meizu-header-sub a", function() {
        var e = $(this), t = e.closest(".meizu-header-sub"), i = t.find("a");
        i.each(function() {
            $(this)[0] != e[0] && ($(this).css("opacity", "1"), $(this).css("filter", 'alpha(opacity="100")'));
        });
    });
    var e, t = $("#headerNav");
    return t.on("mouseover", function() {
        e && (clearTimeout(e), e = null);
    }), t.on("mouseover", ".meizu-header-link > li", function() {
        var e = $(this), i = $("#meizu-header-sub-" + e.data("subnav")), o = !!$(".meizu-header-sub:visible").length;
        $(".meizu-header-sub").hide(), e.hasClass("meizu-header-link-product") && (o ? i.show() : i.slideDown("fast")), 
        t.addClass("toggle");
    }).on("mouseout", function() {
        e = setTimeout(function() {
            $(".meizu-header-sub").hide(), t.removeClass("toggle");
        }, 200);
    }), window.navigator.userAgent.indexOf("MSIE 7.0") > -1 && (document.getElementById("headerNav").onclick = function(e) {
        var e = e || window.event, t = e.targetElement || e.srcElement;
        return "IMG" === t.tagName.toUpperCase() && t.parentNode.className.indexOf("meizu-header-sub-img") > -1 ? (t = t.parentNode.parentNode, 
        window.location.href = t.href, !1) : void 0;
    }), 1;
}()), $(function() {
    function e() {
        r.toggleClass("open"), $(".subnav-menu").slideToggle(200, function() {
            l = r.outerHeight();
        });
    }
    var t = $(window), i = $(".container"), o = $(".meizu-header"), n = o.outerHeight(), a = $("#meizu-header-sub"), r = $(".subnav"), s = $(".toTop"), d = $(window).scrollTop(), c = 0, u = 0, l = ($("#meizu-header").height(), 
    r.outerHeight()), h = r.offset() ? r.offset().top : 0;
    window.isIE = function() {
        return window.ActiveXObject || "ActiveXObject" in window || /MSIE ([^;]+)/.test(navigator.userAgent) ? !0 : !1;
    }, window.isMac = function() {
        return -1 !== navigator.platform.indexOf("Mac");
    }, window.isMobile = function() {
        return !!navigator.userAgent.match(/android|webos|ip(hone|ad|od)|opera (mini|mobi|tablet)|iemobile|windows.+(phone|touch)|mobile|fennec|kindle (Fire)|Silk|maemo|blackberry|playbook|bb10\; (touch|kbd)|Symbian(OS)|Ubuntu Touch/i);
    }, window.isRetina = function() {
        var e = "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
        return window.devicePixelRatio > 1 ? !0 : window.matchMedia && window.matchMedia(e).matches ? !0 : !1;
    }, isMac() && $("body").addClass("mac"), $("body").addClass(isIE() ? "ie" : "notIE"), 
    window.Cookie = {
        set: function(e, t, i) {
            if (i) {
                var o = new Date();
                o.setTime(o.getTime() + 60 * i * 60 * 1e3);
                var n = "; expires=" + o.toGMTString();
            } else var n = "";
            document.cookie = e + "=" + t + n + "; domain=.meizu.com;path=/";
        },
        get: function(e) {
            for (var t = e + "=", i = document.cookie.split(";"), o = 0; o < i.length; o++) {
                for (var n = i[o]; " " == n.charAt(0); ) n = n.substring(1, n.length);
                if (0 == n.indexOf(t)) return n.substring(t.length, n.length);
            }
            return null;
        },
        remove: function(e) {
            this.set(e, "", -1);
        }
    };
    var p = $("img[data-src]");
    p.each(isRetina() ? function() {
        var e = $(this).attr("data-src-2x");
        $(this).attr("src", e);
    } : function() {
        var e = $(this).attr("data-src");
        $(this).attr("src", e);
    }), window.getViewport = function() {
        return "BackCompat" == document.compatMode ? {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        } : {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        };
    }, Cookie.get("subnavShow") || (Cookie.set("subnavShow", "1", 240), e(), setTimeout(e, 2e3)), 
    $(".subnav-disclosure").on("click", function() {
        e();
    }), setTimeout(function() {
        t.scroll(function() {
            r.hasClass("open") && e();
        });
    }, 2e3), window.toggleSubnavMenu = e, window.fixSubnav = function(e) {
        var i = !0;
        t.scroll(function() {
            c = t.scrollTop(), u = t.scrollLeft(), c > h ? r.addClass("fixed").css("left", -u) : r.removeClass("fixed").css("left", 0), 
            1 === e && (c > d ? c > h + l ? 1 == i && (i = !1, r.animate({
                top: -l
            }, 200, "linear", function() {
                i = !0;
            })) : c > h && h + l > c && (r.stop().css({
                top: 0
            }), i = !0) : c > h ? 1 == i && (i = !1, r.animate({
                top: 0
            }, 200, "linear", function() {
                i = !0;
            })) : d > h && (r.stop().css({
                top: h
            }), i = !0)), d = c;
        });
    }, window.Player = function(e) {
        function t(e) {
            i.$player.jPlayer("setMedia", {
                m4v: e + ".mp4",
                flv: e + ".flv",
                webmv: e + ".webm"
            });
        }
        this.videoWidth = e.videoWidth ? e.videoWidth : 960, this.videoHeight = e.videoHeight ? e.videoHeight : 540, 
        this.playerWrapId = e.playerWrapId ? e.playerWrapId : "player1", this.$playerWrap = $("#" + this.playerWrapId), 
        this.$player = $(".jp-jplayer", this.$playerWrap), this.$jpMask = $(".jp-mask", this.$playerWrap);
        var i = this;
        return this.$player.jPlayer({
            ready: function() {
                t(i.$playerWrap.attr("data-video"));
            },
            cssSelectorAncestor: "#" + i.playerWrapId,
            swfPath: "http://www2.res.meizu.com/zh_cn/videos",
            supplied: "webmv, flv, m4v",
            size: {
                width: i.videoWidth + "px",
                height: i.videoHeight + "px"
            },
            useStateClassSkin: !0,
            autoBlur: !0,
            smoothPlayBar: !0,
            volume: .5,
            keyEnabled: !0,
            keyBindings: {
                play: {
                    key: 32,
                    fn: function(e) {
                        e.status.paused ? e.play() : e.pause();
                    }
                },
                esc: {
                    key: 27,
                    fn: function(e) {
                        i.$jpMask.click();
                    }
                }
            }
        }), this.init(), this;
    }, Player.prototype.init = function() {
        var e, t = this;
        this.$jpInterface = $(".jp-interface", t.$playerWrap), $(".jp-wrapper", t.$playerWrap).mousemove(function() {
            clearTimeout(e), t.$jpInterface.show();
        }).mouseout(function() {
            t.$jpInterface.hide();
        }), this.$jpMask.click(function() {
            t.hideAndPause();
        });
    }, Player.prototype.showAndPlay = function() {
        var e = this, t = $("body"), i = $(window), o = t[0].scrollHeight, n = i.scrollTop(), a = t.height();
        n = i.scrollTop(), $("body").addClass("vh"), $(".jp-mask, .jp_container", e.$playerWrap).show(), 
        this.$jpMask.height(o).css({
            top: n
        }), $(".jp_container", e.$playerWrap).css({
            width: e.videoWidth,
            top: n + (a - e.videoHeight) / 2
        }), e.$jpInterface.focus(), setTimeout(function() {
            e.$player.jPlayer("play");
        }, 200), setTimeout(function() {
            e.$jpInterface.hide();
        }, 1e3);
    }, Player.prototype.hideAndPause = function() {
        var e = this;
        $("body").removeClass("vh"), $(".jp-mask, .jp_container", e.$playerWrap).hide(), 
        e.$player.jPlayer("pause");
    }, window.hideSiteHeader = function() {
        setTimeout(function() {
            document.getElementsByTagName("body")[0].scrollTop = n;
        }, 50);
    }, t.scroll(function() {
        c = t.scrollTop(), 900 > c ? s.fadeOut() : s.fadeIn();
    }).resize(function() {
        getViewport().width < 1080 ? (i.addClass("JSWrapperWidth"), r.addClass("JSWrapperWidth"), 
        o.addClass("JSWrapperWidth"), a.css("width", "1080px")) : (i.removeClass("JSWrapperWidth"), 
        r.removeClass("JSWrapperWidth"), o.removeClass("JSWrapperWidth"), a.css("width", "100%"));
    }), s.click(function() {
        $("html,body").animate({
            scrollTop: 0
        }, 500);
    }), t.scroll().resize();
});