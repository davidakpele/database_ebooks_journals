"use strict"
define("browzine-web/adapters/application", ["exports", "ember-data", "browzine-web/config/environment", "browzine-web/mixins/belongs-to-library-adapter", "browzine-web/mixins/client-adapter", "browzine-web/mixins/localization-adapter", "browzine-web/mixins/authenticating-adapter"], function (e, t, n, r, i, a, s) {
    Object.defineProperty(e, "__esModule", { value: !0 })
    var o = {
        namespace: n.default.apiNamespace, auth: Ember.inject.service(), applicationSession: Ember.inject.service(), handleResponse: function (e, t, n) {
            var r = this.handleUnauthorizedResponse(e, t, n)
            return r || this._super.apply(this, arguments)
        }, shouldBackgroundReloadRecord: function () { return !1 }, shouldReloadAll: function () { return !0 }
    }
    n.default.apiHost && (o.host = n.default.apiHost), e.default = t.default.RESTAdapter.extend(s.default, i.default, a.default, r.default, o)
}), define("browzine-web/adapters/article", ["exports", "ember-data", "browzine-web/mixins/authenticating-adapter", "browzine-web/mixins/client-adapter", "browzine-web/mixins/localization-adapter", "browzine-web/config/environment"], function (e, t, n, r, i, a) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.JSONAPIAdapter.extend(n.default, r.default, i.default, {
        namespace: a.default.apiNamespace, host: a.default.apiHost, handleResponse: function (e, t, n) {
            var r = this.handleUnauthorizedResponse(e, t, n)
            if (r) return r
            if (404 === e) {
                var i = new Error("article not found")
                return i.status = 404, i.payload = n, i
            } return this._super.apply(this, arguments)
        }, urlForQueryRecord: function (e, t) {
            if (!e.doi) return this._super(e, t)
            var n = this.get("host"), r = this.urlPrefix(), i = [], a = this.pathForType(t)
            return i.push(a), i.push(encodeURIComponent("doi:" + e.doi)), r && i.unshift(r), i = i.join("/"), !n && i && "/" !== i.charAt(0) && (i = "/" + i), delete e.doi, i
        }
    })
}), define("browzine-web/adapters/bookcase", ["exports", "browzine-web/adapters/application", "ember-data-has-many-query"], function (e, t, n) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.extend(n.default.RESTAdapterMixin, {}) }), define("browzine-web/adapters/bookshelf", ["exports", "browzine-web/adapters/application", "ember-data-has-many-query"], function (e, t, n) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.extend(n.default.RESTAdapterMixin, {}) }), define("browzine-web/adapters/issue", ["exports", "browzine-web/adapters/application", "ember-data-has-many-query"], function (e, t, n) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.extend(n.default.RESTAdapterMixin, {}) }), define("browzine-web/adapters/journal", ["exports", "ember-data", "browzine-web/config/environment", "browzine-web/mixins/belongs-to-library-adapter", "browzine-web/mixins/client-adapter", "browzine-web/mixins/localization-adapter", "browzine-web/mixins/authenticating-adapter"], function (e, t, n, r, i, a, s) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.JSONAPIAdapter.extend(s.default, i.default, a.default, r.default, {
        namespace: n.default.apiNamespace, host: n.default.apiHost, handleResponse: function (e, t, n) {
            var r = this.handleUnauthorizedResponse(e, t, n)
            return r || this._super.apply(this, arguments)
        }
    })
}), define("browzine-web/adapters/library", ["exports", "ember-data", "browzine-web/config/environment", "browzine-web/mixins/authenticating-adapter", "browzine-web/mixins/client-adapter", "browzine-web/mixins/localization-adapter", "browzine-web/utils/lodash-replacements"], function (e, t, n, r, i, a, s) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.JSONAPIAdapter.extend(r.default, i.default, a.default, {
        namespace: n.default.apiNamespace, host: n.default.apiHost, updateRecord: function (e, t, n) {
            var r = {}, i = e.serializerFor(t.modelName), a = n.id, o = this.buildURL(t.modelName, a, n, "updateRecord"), l = Object.keys(n.changedAttributes())
            return i.serializeIntoHash(r, t, n, { includeId: !0 }), r.data.attributes = (0, s.pick)(r.data.attributes, l), this.ajax(o, "PATCH", { data: r })
        }, handleResponse: function (e, t, n) {
            var r = this.handleUnauthorizedResponse(e, t, n)
            return r || this._super.apply(this, arguments)
        }, shouldBackgroundReloadRecord: function () { return !1 }, shouldReloadAll: function () { return !0 }
    })
}), define("browzine-web/adapters/ls-adapter", ["exports", "ember-localstorage-adapter/adapters/ls-adapter"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default }), define("browzine-web/adapters/search", ["exports", "ember-localstorage-adapter"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.extend({ namespace: "bz-search" }) }), define("browzine-web/adapters/subject", ["exports", "browzine-web/adapters/application", "ember-data-has-many-query"], function (e, t, n) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.extend(n.default.RESTAdapterMixin, {}) }), define("browzine-web/app", ["exports", "browzine-web/resolver", "ember-load-initializers", "browzine-web/config/environment", "browzine-web/errors/tracing"], function (e, t, n, r, i) {
    Object.defineProperty(e, "__esModule", { value: !0 }), window.Browzine = window.Browzine || {}, window.Browzine.getTrace = i.getTrace
    var a = void 0
    a = Ember.Application.extend({ modulePrefix: r.default.modulePrefix, podModulePrefix: r.default.podModulePrefix, Resolver: t.default })
    "test" === r.default.environment || (window.Modernizr || {}).flexbox || (window.Modernizr || {}).flexboxlegacy && window.navigator.userAgent.indexOf("Android 4.0") >= 0 || window.location.href.match("auth") || window.location.href.match("confirm-email") ? (0, n.default)(a, r.default.modulePrefix) : window.location = "/incompatible-browser.html", function () {
        if ("performance" in window == !1 && (window.performance = {}), Date.now = Date.now || function () { return (new Date).getTime() }, "now" in window.performance == !1) {
            var e = Date.now()
            performance.timing && performance.timing.navigationStart && (e = performance.timing.navigationStart), window.performance.now = function () { return Date.now() - e }
        }
    }(), a.reopen({ init: function () { this._super.apply(this, arguments), this.register("service:router", { create: function (e) { return Ember.getOwner(e).lookup("router:main") } }) } }), Ember.Router.reopen({
        didTransition: function () {
            var e = this
            this._super.apply(this, arguments), Ember.run.schedule("afterRender", this, function () { Ember.run.later(e, function () { Ember.$("a").attr("tabindex", 0) }, 1e3) })
        }
    }), e.default = a
}),
    define("browzine-web/breakpoints", ["exports"], function (e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
            e.default = {
                mobile: "(max-width: 685px)",
                tablet: "(min-width: 686px) and (max-width: 1024px)",
                desktop: "(min-width: 1025px) and (max-width: 1440px)",
                jumbo: "(min-width: 1441px)"
            }
    }),
    define("browzine-web/components/article-list-item/component",
        [
            "exports",
            "ember-window-mock",
            "browzine-web/mixins/trigger-on-enter",
            "browzine-web/config/environment",
            "ember-intl"
        ],
        function (e, t, n, r, i) {
    function a(e) {
        return function () {
            var t = e.apply(this, arguments)
            return new Promise(function (e, n) {
                return function r(i, a) {
                    try { var s = t[i](a), o = s.value } catch (l) {
                        return void n(l)
                    }
                    if (!s.done)
                        return Promise.resolve(o).then(function (e) {
                            r("next", e)
                        },
                            function (e) {
                                r("throw", e)
                            })
                    e(o)
                }("next")
            })
        }
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(n.default, {
        classNames: ["article-list-item"], classNameBindings: ["shownInContext:article-in-context-highlight"], unreads: Ember.inject.service(), sync: Ember.inject.service(), applicationSession: Ember.inject.service(), myBookshelf: Ember.inject.service(), myArticles: Ember.inject.service(), store: Ember.inject.service(), flashMessages: Ember.inject.service(), a11y: Ember.inject.service(), intl: Ember.inject.service(), analytics: Ember.inject.service(), enableAbstracts: r.default.enableAbstracts, removeArticleFromCollectionModalTitle: (0, i.t)("articles.remove_article_from_collection_modal_title"), removeArticleFromCollectionModalMessage: (0, i.t)("articles.remove_article_from_collection_modal_message"), untranslatedStart: (0, i.t)("untranslated.start"), untranslatedEnd: (0, i.t)("untranslated.end"), untranslatedAuthors: (0, i.t)("untranslated.authors"), init: function () {
            var e = a(regeneratorRuntime.mark(function e() {
                var t = this, n = arguments
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: if (this._super.apply(this, n), this.set("confirmModal", {}), this.set("citationModal", {}), this.set("shareModal", {}), this.set("copyLinkToArticleModal", {}), this.set("addToCollectionModal", {
                            isSelectCollection: !0, getSelected: function () {
                                var e = t.get("article.syncId"), n = t.get("myArticles").getArticleAssignments(e), r = {}
                                return n.forEach(function (e) { r[e] = !0 }), r
                            }, onSelect: function () {
                                var e = a(regeneratorRuntime.mark(function e(n) {
                                    var r, i, a, s, o
                                    return regeneratorRuntime.wrap(function (e) {
                                        for (; ;)switch (e.prev = e.next) {
                                            case 0: return r = t.get("myArticles"), i = t.get("store"), a = t.get("article"), s = i.peekAll("collection"), e.next = 6, r.toggleArticleAssignments(a, n)
                                            case 6: t.get("savedToCollection") && (o = s.filter(function (e) { return n.indexOf(e.get("id")) > -1 }), t.set("savedToCollection", o)), t.sendAction("onListUpdated")
                                            case 8: case "end": return e.stop()
                                        }
                                    }, e, t)
                                }))
                                return function (t) { return e.apply(this, arguments) }
                            }()
                        }), !this.get("article.retractionNoticeUrl")) {
                            e.next = 9
                            break
                        } return e.next = 9, this.get("analytics").recordEvent({ category: "RetractedLabelImpression", action: "ArticleList", value: this.get("article.id") })
                        case 9: case "end": return e.stop()
                    }
                }, e, this)
            }))
            return function () { return e.apply(this, arguments) }
        }(), didReceiveAttrs: function () {
            var e = this.get("router._routerMicrolib.state.fullQueryParams.searchVisible"), t = this.get("a11y")
            e && this.get("showMyArticles") && t.headerSearchFocus()
        }, didInsertElement: function () { this._super.apply(this, arguments), this.get("shownInContext") && this.send("toggleExpansion") }, tabindex: -1, isExpanded: !1, noPersonalizationLibrary: Ember.computed.alias("library.noPersonalization"), statusDocumentInitialLoadComplete: Ember.computed.alias("sync.initialLoadComplete"), statusDocument: Ember.computed("statusDocumentInitialLoadComplete", function () { return this.get("statusDocumentInitialLoadComplete") ? this.get("unreads").getArticleStatusBySyncId(this.get("article.syncId")) : {} }), unread: Ember.computed("statusDocument.isUnread", function () {
            var e = this.get("statusDocument.isUnread")
            return !0 === this.get("article.inPress") && "articles-in-press" !== this.get("statusDocument.issueId") && (e = !1), e
        }), syncing: Ember.computed.alias("statusDocument.isSyncing"), canBeMarkedUnread: Ember.computed("statusDocument.canBeMarkedUnread", function () {
            var e = this.get("statusDocument.canBeMarkedUnread")
            return !0 === this.get("article.inPress") && "articles-in-press" !== this.get("statusDocument.issueId") && (e = !1), e
        }), journalIsAccessedThroughAggregator: Ember.computed.alias("article.journal.accessedThroughAggregator"), issueIsEmbargoed: Ember.computed.alias("article.issue.embargoed"), issueIsNotEmbargoed: Ember.computed.not("issueIsEmbargoed"), suppressed: Ember.computed.or("article.issue.suppressed", "article.suppressed"), displayReadingLink: Ember.computed.or("issueIsNotEmbargoed", "article.ILLURL"), abstractLength: Ember.computed("media.isMobile", "media.isTablet", "media.isDesktop", function () { return this.get("media.isMobile") ? 150 : this.get("media.isTablet") ? 333.66 : 389 }), savedToCollection: Ember.computed(function () {
            var e = this.get("article")
            return this.get("store").peekAll("collection").filter(function (t) { return t.get("items").any(function (t) { return t.get("itemId") === e.get("syncId") }) })
        }), analyticsCategory: Ember.computed("issueIsEmbargoed", function () { return this.get("issueIsEmbargoed") ? "issue_summary_article_embargoed_tapped" : "issue_summary_article_withfulltext_tapped" }), authorsOverflow: Ember.computed(function () {
            var e = 0
            this.get("article.authors") && (e = this.get("article.authors").split(";").length)
            return e > 4
        }), downloadPDFTitle: Ember.computed("intl.primaryLocale", function () { return this.get("intl").t("journal.article.tools.download_pdf") }), articleLinkTitle: Ember.computed("intl.primaryLocale", function () { return this.get("intl").t("journal.article.tools.article_link") }), saveToMyArticlesTitle: Ember.computed("intl.primaryLocale", function () { return this.get("intl").t("journal.article.tools.save_to_my_articles") }), citationServiceTitle: Ember.computed("intl.primaryLocale", function () { return this.get("intl").t("journal.article.tools.citation_services") }), socialMediaTitle: Ember.computed("intl.primaryLocale", function () { return this.get("intl").t("journal.article.tools.social_share") }), actions: {
            addToCollection: function () { this.get("addToCollectionModal").show() }, cite: function () { this.get("citationModal").show() }, share: function () { this.get("shareModal").show() }, markRead: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
                this.get("unreads").markArticleReadBySyncId(this.get("article.syncId"), e)
            }, markUnread: function () { this.get("unreads").markArticleUnreadBySyncId(this.get("article.syncId")) }, confirmRemoveArticle: function (e, t) {
                var n = this, r = this.get("confirmModal")
                r.removeArticle = function () { n.send("removeArticle", e, t) }, r.show()
            }, removeArticle: function () {
                var e = a(regeneratorRuntime.mark(function e(t, n) {
                    var r, i, a, s, o, l
                    return regeneratorRuntime.wrap(function (e) {
                        for (; ;)switch (e.prev = e.next) {
                            case 0: return r = t.get("items").findBy("itemId", n.get("syncId")), t.get("items").removeObject(r), this.$().remove(), i = n.get("id"), a = n.get("journal"), s = a.get("id"), o = a.get("title"), l = n.get("syncId"), e.next = 10, this.get("analytics").recordEvent({ category: "MyArticles", action: "ArticleRemoveFromCollection", label: o, value: l })
                            case 10: if (!n.get("retractionNoticeUrl")) {
                                e.next = 13
                                break
                            } return e.next = 13, this.get("analytics").recordEvent({ category: "RetractedArticleInteraction", action: "Unsaved", label: i, value: s })
                            case 13: this.get("myArticles").saveCollection(t, "removeArticle")
                            case 14: case "end": return e.stop()
                        }
                    }, e, this)
                }))
                return function (t, n) { return e.apply(this, arguments) }
            }(), notifyUnavailableJournal: function () { this.get("flashMessages").alert("This journal is currently unavailable at this library. Please contact your librarian for more information.") }, login: function () {
                this.set("myBookshelf.loginRequired", !0), this.set("myBookshelf.returnRoute", t.default.location.pathname), this.set("myArticles.addToMyArticles", this.get("article.syncId"))
                var e = this.get("applicationSession").get("selectedLibrary")
                this.get("router").transitionTo("library.login", e)
            }, mostRecentLibrary: function () {
                var e = this.get("applicationSession"), t = e.get("selectedLibrary")
                e.set("mostRecentLibrary", t)
            }, toggleExpansion: function () {
                var e = this.get("isExpanded")
                this.set("isExpanded", !e)
            }, abstractTruncate: function (e) { this.set("abstractOverflow", e) }, viewRetractionNotice: function () { return t.default.location.assign(this.get("article.retractionNoticeUrl")) }
        }
    })
}),
    define("browzine-web/components/article-list-item/template", ["exports"], function (e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
            e.default = Ember.HTMLBars.template(
                { id: "E7zKy9AW", block: '{"symbols":["collection","index"],"statements":[[6,"article"],[10,"aria-label",[26,[[20,["article","title"]]]]],[10,"class",[26,[[20,["article","syncId"]]," ",[25,"if",[[20,["editMode"]],"edit"],null]," ",[25,"if",[[20,["suppressed"]],"suppressed"],null]," ",[25,"if",[[25,"not",[[20,["unread"]]],null],"no-unread-articles"],null]," ",[25,"if",[[20,["isExpanded"]],"is-expanded"],null]," ",[25,"if",[[20,["showMyArticles"]],"my-article"],null]]]],[7],[0,"\\n"],[4,"if",[[20,["article","suppressed"]]],null,{"statements":[[0,"    "],[6,"p"],[9,"class","suppressed-warning-small"],[7],[0,"\\n      "],[1,[25,"t",["untranslated.suppressed_warning"],null],false],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["editMode"]]],null,{"statements":[[0,"    "],[1,[25,"textarea",null,[["class","value","placeholder","disabled","aria-label"],["edit-title",[20,["article","title"]],"Title",[20,["suppressed"]],"Title"]]],false],[0,"\\n    "],[6,"div"],[9,"class","edit-metadata"],[7],[0,"\\n"],[4,"unless",[[20,["article","issue","suppressed"]]],null,{"statements":[[0,"        "],[6,"label"],[9,"class","item-suppression"],[7],[0,"\\n          "],[1,[25,"input",null,[["type","checked"],["checkbox",[20,["article","suppressed"]]]]],false],[1,[25,"t",["untranslated.suppress_article"],null],false],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]},null],[0,"      "],[6,"span"],[9,"class","icon link flaticon solid"],[10,"title",[26,[[25,"t",["untranslated.article_location"],null]]]],[7],[8],[0,"\\n      "],[6,"a"],[9,"class","edit-link"],[10,"href",[26,[[20,["article","permalink"]]]]],[9,"target","_blank"],[10,"title",[26,[[25,"t",["untranslated.article_location"],null]]]],[7],[0,"\\n"],[4,"if",[[25,"or",[[20,["media","isDesktop"]],[20,["media","isJumbo"]]],null]],null,{"statements":[[0,"            "],[1,[20,["article","permalink"]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"            "],[1,[25,"t",["untranslated.permalink"],null],false],[0,"\\n"]],"parameters":[]}],[0,"        "],[8],[0,"\\n\\n"],[4,"if",[[20,["article","fullTextLocation"]]],null,{"statements":[[0,"        "],[6,"span"],[9,"class","icon document-4 flaticon stroke"],[10,"title",[26,[[25,"t",["untranslated.pdf_location"],null]]]],[7],[8],[0,"\\n        "],[6,"a"],[9,"class","edit-link"],[10,"href",[26,[[20,["article","fullTextLocation"]]]]],[9,"target","_blank"],[10,"title",[26,[[25,"t",["untranslated.pdf_location"],null]]]],[7],[1,[20,["article","fullTextLocation"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"    "],[8],[0,"\\n\\n    "],[6,"div"],[9,"class","edit-metadata"],[7],[0,"\\n"],[4,"unless",[[20,["hidePageNumbers"]]],null,{"statements":[[0,"        "],[6,"span"],[9,"class","pages"],[7],[1,[25,"t",["untranslated.pp"],null],false],[8],[0,"\\n        "],[1,[25,"input",null,[["class","value","placeholder","disabled","aria-label"],["edit-pages",[20,["article","startPage"]],[20,["untranslatedStart"]],[20,["suppressed"]],[20,["untranslatedStart"]]]]],false],[0,"\\n        "],[1,[25,"input",null,[["class","value","placeholder","disabled","aria-label"],["edit-pages",[20,["article","endPage"]],[20,["untranslatedEnd"]],[20,["suppressed"]],[20,["untranslatedEnd"]]]]],false],[0,"\\n"]],"parameters":[]},null],[0,"\\n      "],[1,[25,"input",null,[["class","value","placeholder","disabled","aria-label"],["edit-authors",[20,["article","authors"]],"Authors",[20,["suppressed"]],[20,["untranslatedAuthors"]]]]],false],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["showMyArticles"]]],null,{"statements":[[0,"      "],[6,"div"],[9,"class","remove"],[9,"tabindex","0"],[10,"aria-label",[26,[[25,"t",["my_articles.remove_article_label"],null]]]],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","confirmRemoveArticle",[20,["collection"]],[20,["article"]]],[["preventDefault"],[true]]],null],[7],[0,"\\n        "],[6,"span"],[9,"class","icon flaticon solid x-3"],[10,"title",[26,[[25,"t",["my_articles.remove_article_title"],null]]]],[3,"action",[[19,0,[]],"confirmRemoveArticle",[20,["collection"]],[20,["article"]]],[["preventDefault"],[true]]],[7],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"and",[[20,["showMyArticles"]],[20,["article","retractionNoticeUrl"]]],null]],null,{"statements":[[0,"      "],[6,"div"],[9,"class","retracted-article-label"],[7],[0,"\\n        "],[1,[25,"t",["articles.retracted_article_label"],null],false],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},null],[0,"    "],[6,"table"],[9,"class","article-split-container"],[7],[0,"\\n      "],[6,"tr"],[7],[0,"\\n"],[4,"if",[[25,"and",[[20,["journalIsOnMyBookshelf"]],[20,["hasUnreadArticles"]]],null]],null,{"statements":[[0,"          "],[6,"td"],[9,"class","unreads-container"],[7],[0,"\\n"],[4,"if",[[20,["unread"]]],null,{"statements":[[0,"            "],[6,"span"],[9,"class","gutter icon unread tabindex"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","markRead"],null],null],[9,"tabindex","0"],[10,"title",[26,[[25,"t",["articles.mark_read_control_title"],null]]]],[3,"action",[[19,0,[]],"markRead"]],[7],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["canBeMarkedUnread"]]],null,{"statements":[[0,"            "],[6,"span"],[9,"class","gutter icon mark-unread tabindex"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","markUnread"],null],null],[9,"tabindex","0"],[10,"title",[26,[[25,"t",["articles.mark_unread_control_title"],null]]]],[3,"action",[[19,0,[]],"markUnread"]],[7],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"              "],[6,"span"],[9,"class","gutter icon no-unread tabindex"],[7],[8],[0,"\\n            "]],"parameters":[]}]],"parameters":[]}],[0,"          "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"and",[[20,["showMyArticles"]],[25,"or",[[25,"or",[[20,["media","isDesktop"]],[20,["media","isJumbo"]]],null],[20,["media","isTablet"]]],null]],null]],null,{"statements":[[0,"          "],[6,"td"],[9,"class","journal-container"],[7],[0,"\\n            "],[6,"section"],[10,"aria-label",[26,[[25,"t",["articles.article_section_aria_label"],[["articleTitle","journalTitle"],[[20,["article","title"]],[20,["article","journal","title"]]]]]]]],[9,"class","article-list-item-journal-cover-block"],[7],[0,"\\n"],[4,"if",[[25,"not-eq",[[20,["article","journal","available"]],false],null]],null,{"statements":[[4,"link-to",["library.journal",[20,["article","journal","id"]]],null,{"statements":[[0,"                  "],[6,"img"],[10,"src",[26,[[20,["article","journal","coverURL"]]]]],[10,"alt",[26,[[20,["article","journal","title"]]]]],[9,"width","110"],[9,"height","150"],[7],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},{"statements":[[0,"                "],[6,"img"],[9,"class","unavailable-element"],[10,"src",[26,[[20,["article","journal","coverURL"]]]]],[10,"alt",[26,[[20,["article","journal","title"]]]]],[9,"width","110"],[9,"height","150"],[3,"action",[[19,0,[]],"notifyUnavailableJournal"]],[7],[8],[0,"\\n"]],"parameters":[]}],[0,"            "],[8],[0,"\\n          "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n        "],[6,"td"],[9,"class","metadata-container"],[7],[0,"\\n          "],[6,"section"],[10,"aria-label",[26,[[25,"t",["articles.article_metadata_section_aria_label"],[["articleTitle"],[[20,["article","title"]]]]]]]],[10,"class",[26,["article-list-item-content-block ",[25,"if",[[25,"and",[[25,"or",[[20,["unread"]],[20,["hasUnreadArticles"]]],null],[25,"or",[[20,["media","isDesktop"]],[20,["media","isJumbo"]]],null]],null],"metadata-unread"],null]]]],[7],[0,"\\n"],[4,"if",[[25,"and",[[25,"not",[[20,["showMyArticles"]]],null],[20,["article","retractionNoticeUrl"]]],null]],null,{"statements":[[0,"              "],[6,"div"],[9,"class","retracted-article-label"],[7],[0,"\\n                "],[1,[25,"t",["articles.retracted_article_label"],null],false],[0,"\\n              "],[8],[0,"\\n"]],"parameters":[]},null],[0,"            "],[6,"div"],[10,"class",[26,["title ",[25,"if",[[25,"eq",[[20,["article","journal","available"]],false],null],"unavailable-element"],null]]]],[3,"action",[[19,0,[]],"markRead",true],[["preventDefault"],[false]]],[7],[0,"\\n"],[4,"if",[[25,"not-eq",[[20,["article","journal","available"]],false],null]],null,{"statements":[[4,"if",[[20,["article","retractionNoticeUrl"]]],null,{"statements":[[4,"track-clicks",null,[["category","action"],["RetractedArticleInteraction","UserSelected"]],{"statements":[[4,"link-to",["library.article-retraction-notice",[20,["article"]]],[["target","tabindex"],["_blank","0"]],{"statements":[[0,"                      "],[1,[20,["article","parsedTitle"]],true],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null]],"parameters":[]},{"statements":[[4,"track-clicks",null,[["category","action"],[[20,["analyticsCategory"]],[20,["article","id"]]]],{"statements":[[4,"if",[[25,"and",[[20,["library","articleTitleUsesBestAvailableLink"]],[20,["article","fullTextFile"]]],null]],null,{"statements":[[4,"link-to",["library.article-download",[20,["article"]]],[["target","invokeAction","tabindex"],["_blank",[25,"action",[[19,0,[]],"mostRecentLibrary"],null],"0"]],{"statements":[[0,"                        "],[1,[20,["article","parsedTitle"]],true],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},{"statements":[[4,"link-to",["library.article",[20,["article"]]],[["target","invokeAction","tabindex"],["_blank",[25,"action",[[19,0,[]],"mostRecentLibrary"],null],"0"]],{"statements":[[0,"                        "],[1,[20,["article","parsedTitle"]],true],[0,"\\n"]],"parameters":[]},null]],"parameters":[]}]],"parameters":[]},null]],"parameters":[]}]],"parameters":[]},{"statements":[[0,"                "],[6,"span"],[9,"class","unavailable-element"],[9,"tabindex","0"],[3,"action",[[19,0,[]],"notifyUnavailableJournal"]],[7],[0,"\\n                  "],[1,[20,["article","parsedTitle"]],true],[0,"\\n                "],[8],[0,"\\n"]],"parameters":[]}],[0,"            "],[8],[0,"\\n\\n"],[4,"if",[[20,["showMyArticles"]]],null,{"statements":[[0,"              "],[6,"div"],[9,"class","journal-title"],[7],[0,"\\n"],[4,"if",[[25,"not-eq",[[20,["article","journal","available"]],false],null]],null,{"statements":[[4,"link-to",["library.journal",[20,["article","journal","id"]]],null,{"statements":[[0,"                    "],[1,[20,["article","journal","title"]],false],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},{"statements":[[0,"                  "],[6,"span"],[9,"class","unavailable-element"],[3,"action",[[19,0,[]],"notifyUnavailableJournal"]],[7],[0,"\\n                    "],[1,[20,["article","journal","title"]],false],[0,"\\n                  "],[8],[0,"\\n"]],"parameters":[]}],[0,"              "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n            "],[6,"div"],[9,"class","metadata"],[7],[0,"\\n"],[4,"if",[[20,["showMyArticles"]]],null,{"statements":[[4,"if",[[20,["article","inPress"]]],null,{"statements":[[0,"                  "],[6,"span"],[10,"class",[26,["issue my-articles ",[25,"if",[[25,"eq",[[20,["article","journal","available"]],false],null],"unavailable-element"],null]]]],[7],[0,"\\n"],[4,"if",[[25,"not-eq",[[20,["article","journal","available"]],false],null]],null,{"statements":[[4,"link-to",["library.journal.articles-in-press",[20,["article","journal","id"]]],null,{"statements":[[0,"                        "],[1,[25,"t",["articles.article_aip_issue_text"],null],false],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},{"statements":[[0,"                      "],[6,"span"],[9,"class","unavailable-element"],[3,"action",[[19,0,[]],"notifyUnavailableJournal"]],[7],[0,"\\n                        "],[1,[25,"t",["articles.article_aip_issue_text"],null],false],[0,"\\n                      "],[8],[0,"\\n"]],"parameters":[]}],[0,"                  "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["article","issue","isValidIssue"]]],null,{"statements":[[4,"if",[[20,["article","issue","title"]]],null,{"statements":[[0,"                    "],[6,"span"],[10,"class",[26,["issue my-articles ",[25,"if",[[25,"eq",[[20,["article","journal","available"]],false],null],"unavailable-element"],null]]]],[7],[0,"\\n"],[4,"if",[[25,"not-eq",[[20,["article","journal","available"]],false],null]],null,{"statements":[[4,"link-to",["library.journal.issue",[20,["article","journal","id"]],[20,["article","issue","id"]]],null,{"statements":[[0,"                          "],[1,[20,["article","issue","title"]],false],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},{"statements":[[0,"                        "],[6,"span"],[9,"class","unavailable-element"],[3,"action",[[19,0,[]],"notifyUnavailableJournal"]],[7],[0,"\\n                          "],[1,[20,["article","issue","title"]],false],[0,"\\n                        "],[8],[0,"\\n"]],"parameters":[]}],[0,"                    "],[8],[0,"\\n"]],"parameters":[]},null],[0,"                "]],"parameters":[]},null]],"parameters":[]}]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"or",[[20,["article","issue","isValidIssue"]],[20,["issue","isValidIssue"]]],null]],null,{"statements":[[4,"unless",[[20,["hidePageNumbers"]]],null,{"statements":[[4,"if",[[25,"or",[[20,["article","startPage"]],[20,["article","endPage"]]],null]],null,{"statements":[[0,"                    "],[6,"span"],[9,"tabindex","0"],[10,"class",[26,["pages ",[25,"if",[[20,["showMyArticles"]],"my-articles"],null]]]],[7],[0,"\\n"],[4,"if",[[20,["article","isSinglePage"]]],null,{"statements":[[0,"                        "],[1,[25,"t",["untranslated.p"],null],false],[0," "],[1,[20,["article","startPage"]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                        "],[1,[25,"t",["untranslated.pp"],null],false],[0," "],[1,[20,["article","startPage"]],false],[1,[25,"t",["untranslated.emdash"],null],false],[1,[20,["article","endPage"]],false],[0,"\\n"]],"parameters":[]}],[0,"                    "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["showMyArticles"]]],null,{"statements":[[4,"if",[[20,["article","issue","isValidIssue"]]],null,{"statements":[[4,"if",[[25,"not",[[20,["article","inPress"]]],null]],null,{"statements":[[4,"if",[[20,["article","issue","year"]]],null,{"statements":[[0,"                      "],[6,"span"],[9,"class","year my-articles"],[7],[0,"\\n                        "],[1,[20,["article","issue","year"]],false],[0,"\\n                      "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null]],"parameters":[]},{"statements":[[4,"if",[[20,["article","year"]]],null,{"statements":[[0,"                    "],[6,"span"],[9,"class","year my-articles"],[7],[0,"\\n                      "],[1,[20,["article","year"]],false],[0,"\\n                    "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]}]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["article","authors"]]],null,{"statements":[[0,"                "],[6,"span"],[9,"class","authors"],[10,"onkeypress",[25,"action",[[19,0,[]],"toggleExpansion"],null],null],[3,"action",[[19,0,[]],"toggleExpansion"]],[7],[0,"\\n"],[4,"if",[[20,["isExpanded"]]],null,{"statements":[[0,"                    "],[6,"span"],[9,"tabindex","0"],[9,"class","full-authors tabindex"],[7],[0,"\\n                      "],[1,[20,["article","authors"]],false],[0,"\\n                    "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                    "],[6,"span"],[9,"tabindex","0"],[9,"class","preview tabindex"],[7],[0,"\\n                      "],[1,[20,["article","authorsPreview"]],false],[0,"\\n                    "],[8],[0,"\\n"]],"parameters":[]}],[0,"                "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"and",[[20,["article","abstract"]],[20,["enableAbstracts"]]],null]],null,{"statements":[[4,"track-clicks",null,[["category","action","exceptWhen"],["RetractedArticleInteraction","AbstractViewed",[25,"not",[[20,["article","retractionNoticeUrl"]]],null]]],{"statements":[[0,"                  "],[6,"div"],[9,"class","abstract"],[10,"onkeypress",[25,"action",[[19,0,[]],"toggleExpansion"],null],null],[3,"action",[[19,0,[]],"toggleExpansion"]],[7],[0,"\\n"],[4,"if",[[20,["isExpanded"]]],null,{"statements":[[0,"                      "],[6,"div"],[9,"tabindex","0"],[9,"class","full-abstract tabindex"],[7],[0,"\\n                        "],[1,[20,["article","abstract"]],false],[0,"\\n                      "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                      "],[6,"div"],[9,"tabindex","0"],[9,"class","preview tabindex"],[7],[0,"\\n                        "],[1,[25,"line-clamp",null,[["text","lines","ellipsis","showMoreButton","showLessButton","useJsOnly","handleTruncate"],[[20,["article","abstract"]],3,"…",false,false,true,[25,"action",[[19,0,[]],"abstractTruncate"],null]]]],false],[0,"\\n                      "],[8],[0,"\\n"]],"parameters":[]}],[0,"                  "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"            "],[8],[0,"\\n\\n"],[4,"if",[[20,["savedToCollection"]]],null,{"statements":[[0,"              "],[6,"div"],[9,"tabindex","0"],[9,"class","metadata saved-to-collection"],[7],[0,"\\n                "],[1,[25,"t",["articles.saved_to_collection_label_before"],null],false],[0,"\\n"],[4,"each",[[20,["savedToCollection"]]],null,{"statements":[[0,"                  "],[6,"span"],[9,"class","label"],[7],[0,"\\n"],[4,"link-to",["library.my-articles.collection",[19,1,["id"]]],null,{"statements":[[4,"if",[[25,"eq",[[19,1,["name"]],"General Collection"],null]],null,{"statements":[[0,"                        "],[1,[25,"t",["my_articles.general_collection_name"],null],false]],"parameters":[]},{"statements":[[0,"                        "],[1,[19,1,["name"]],false]],"parameters":[]}]],"parameters":[]},null],[4,"unless",[[25,"eq",[[19,1,[]],[20,["savedToCollection","lastObject"]]],null]],null,{"statements":[[0,","]],"parameters":[]},null],[0,"\\n                  "],[8],[0,"\\n"]],"parameters":[1,2]},null],[0,"                "],[1,[25,"t",["articles.saved_to_collection_label_after"],null],false],[0,"\\n              "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n            "],[6,"div"],[10,"class",[26,["content-overflow ",[25,"if",[[25,"and",[[25,"or",[[20,["abstractOverflow"]],[20,["authorsOverflow"]]],null],[25,"or",[[20,["media","isDesktop"]],[20,["media","isJumbo"]]],null]],null],"show-content-overflow-chevron"],null]]]],[10,"onkeypress",[25,"action",[[19,0,[]],"toggleExpansion"],null],null],[3,"action",[[19,0,[]],"toggleExpansion"]],[7],[0,"\\n"],[4,"if",[[20,["isExpanded"]]],null,{"statements":[[0,"                "],[6,"span"],[9,"class","chevron icon flaticon solid up-2"],[7],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                "],[6,"span"],[9,"class","chevron icon flaticon solid down-2"],[7],[8],[0,"\\n"]],"parameters":[]}],[0,"            "],[8],[0,"\\n\\n            "],[6,"div"],[10,"class",[26,["tools ",[25,"if",[[20,["showMyArticles"]],"my-articles-layout"],null]]]],[7],[0,"\\n              "],[6,"div"],[9,"class","buttons noselect"],[7],[0,"\\n"],[4,"if",[[25,"and",[[20,["article","fullTextFile"]],[25,"not",[[20,["article","issue","embargoed"]]],null]],null]],null,{"statements":[[4,"unless",[[25,"or",[[25,"and",[[20,["journal","accessedThroughAggregator"]],[20,["article","inPress"]]],null],[25,"and",[[20,["journal","embargoDescription"]],[20,["article","inPress"]]],null]],null]],null,{"statements":[[0,"                    "],[6,"div"],[9,"class","button invisible download-pdf"],[3,"action",[[19,0,[]],"markRead",true],[["preventDefault"],[false]]],[7],[0,"\\n"],[4,"if",[[20,["article","retractionNoticeUrl"]]],null,{"statements":[[4,"track-clicks",null,[["category","action"],["RetractedArticleInteraction","UserSelected"]],{"statements":[[4,"link-to",["library.article-retraction-notice",[20,["article"]]],[["class","aria-label","target","tabindex"],["tooltip",[20,["downloadPDFTitle"]],"_blank","0"]],{"statements":[[0,"                            "],[6,"span"],[9,"class","icon fal fa-file-pdf"],[9,"aria-hidden","true"],[7],[8],[0,"\\n                            "],[6,"span"],[9,"class","aria-hidden"],[7],[1,[25,"t",["journal.article.tools.download_pdf"],null],false],[0," - "],[1,[20,["article","title"]],false],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null]],"parameters":[]},{"statements":[[4,"track-clicks",null,[["category","action"],["issue_summary_article_fulltextfile_downloaded",[20,["article","id"]]]],{"statements":[[4,"link-to",["library.article-download",[20,["article"]]],[["class","aria-label","target","invokeAction","tabindex"],["tooltip",[20,["downloadPDFTitle"]],"_blank",[25,"action",[[19,0,[]],"mostRecentLibrary"],null],"0"]],{"statements":[[0,"                            "],[6,"span"],[9,"class","icon fal fa-file-pdf"],[9,"aria-hidden","true"],[7],[8],[0,"\\n                            "],[6,"span"],[9,"class","aria-hidden"],[7],[1,[25,"t",["journal.article.tools.download_pdf"],null],false],[0," - "],[1,[20,["article","title"]],false],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null]],"parameters":[]}],[0,"                    "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["displayReadingLink"]]],null,{"statements":[[0,"                  "],[6,"div"],[9,"class","button invisible read-full-text"],[3,"action",[[19,0,[]],"markRead",true],[["preventDefault"],[false]]],[7],[0,"\\n"],[4,"if",[[20,["article","retractionNoticeUrl"]]],null,{"statements":[[4,"track-clicks",null,[["category","action"],["RetractedArticleInteraction","UserSelected"]],{"statements":[[4,"link-to",["library.article-retraction-notice",[20,["article"]]],[["class","aria-label","target","tabindex"],["tooltip",[20,["articleLinkTitle"]],"_blank","0"]],{"statements":[[0,"                          "],[6,"span"],[9,"class","icon fal fa-link"],[9,"aria-hidden","true"],[7],[8],[0,"\\n                          "],[6,"span"],[9,"class","aria-hidden"],[7],[1,[25,"t",["journal.article.tools.article_link"],null],false],[0," - "],[1,[20,["article","title"]],false],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null]],"parameters":[]},{"statements":[[4,"track-clicks",null,[["category","action"],[[20,["analyticsCategory"]],[20,["article","id"]]]],{"statements":[[4,"link-to",["library.article",[20,["article"]]],[["class","aria-label","target","invokeAction","tabindex"],["tooltip",[20,["articleLinkTitle"]],"_blank",[25,"action",[[19,0,[]],"mostRecentLibrary"],null],"0"]],{"statements":[[0,"                          "],[6,"span"],[9,"class","icon fal fa-link"],[9,"aria-hidden","true"],[7],[8],[0,"\\n                          "],[6,"span"],[9,"class","aria-hidden"],[7],[1,[25,"t",["journal.article.tools.article_link"],null],false],[0," - "],[1,[20,["article","title"]],false],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null]],"parameters":[]}],[0,"                  "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"unless",[[20,["noPersonalizationLibrary"]]],null,{"statements":[[0,"                  "],[6,"div"],[9,"class","button invisible add-to-my-articles"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter",[25,"if",[[20,["applicationSession","userIsLoggedIn"]],"addToCollection","login"],null]],null],null],[3,"action",[[19,0,[]],[25,"if",[[20,["applicationSession","userIsLoggedIn"]],"addToCollection","login"],null]]],[7],[0,"\\n                    "],[6,"a"],[9,"tabindex","0"],[9,"class","tabindex tooltip"],[10,"aria-label",[25,"t",["journal.article.tools.save_to_my_articles"],null],null],[7],[0,"\\n                      "],[6,"span"],[9,"class","icon fal fa-folder"],[9,"aria-hidden","true"],[7],[8],[0,"\\n                      "],[6,"span"],[9,"class","aria-hidden"],[7],[1,[25,"t",["journal.article.tools.save_to_my_articles"],null],false],[0," - "],[1,[20,["article","title"]],false],[8],[0,"\\n                    "],[8],[0,"\\n                  "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[0,"                  "],[6,"div"],[9,"class","button invisible citation-services"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","cite"],null],null],[3,"action",[[19,0,[]],"cite"]],[7],[0,"\\n                    "],[6,"a"],[9,"tabindex","0"],[9,"class","tabindex tooltip"],[10,"aria-label",[25,"t",["journal.article.tools.citation_services"],null],null],[7],[0,"\\n                      "],[6,"span"],[9,"class","icon fal fa-graduation-cap"],[9,"aria-hidden","true"],[7],[8],[0,"\\n                      "],[6,"span"],[9,"class","aria-hidden"],[7],[1,[25,"t",["journal.article.tools.citation_services"],null],false],[0," - "],[1,[20,["article","title"]],false],[8],[0,"\\n                    "],[8],[0,"\\n                  "],[8],[0,"\\n\\n                  "],[6,"div"],[9,"class","button invisible social-media-services"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","share"],null],null],[3,"action",[[19,0,[]],"share"]],[7],[0,"\\n                    "],[6,"a"],[9,"tabindex","0"],[9,"class","tabindex tooltip"],[10,"aria-label",[25,"t",["journal.article.tools.social_share"],null],null],[7],[0,"\\n                      "],[6,"span"],[9,"class","icon fal fa-share-alt"],[9,"aria-hidden","true"],[7],[8],[0,"\\n                      "],[6,"span"],[9,"class","aria-hidden"],[7],[1,[25,"t",["journal.article.tools.social_share"],null],false],[0," - "],[1,[20,["article","title"]],false],[8],[0,"\\n                    "],[8],[0,"\\n                  "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                  "],[1,[25,"export-button",null,[["services","article","library","text","icon-type","specificity"],[[20,["citationServices"]],[20,["article"]],[20,["library"]],[20,["citationServiceTitle"]],"fal fa-graduation-cap","citation-services"]]],false],[0,"\\n\\n                  "],[1,[25,"export-button",null,[["services","article","library","text","icon-type","specificity","copyLinkToArticleModal"],[[20,["shareServices"]],[20,["article"]],[20,["library"]],[20,["socialMediaTitle"]],"fal fa-share-alt","social-media-services",[20,["copyLinkToArticleModal"]]]]],false],[0,"\\n"]],"parameters":[]}],[0,"              "],[8],[0,"\\n            "],[8],[0,"\\n          "],[8],[0,"\\n        "],[8],[0,"\\n      "],[8],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[]}],[8],[0,"\\n\\n"],[1,[25,"collection-modal",null,[["modal"],[[20,["addToCollectionModal"]]]]],false],[0,"\\n\\n"],[1,[25,"confirm-modal",null,[["modal","title","message","successAction"],[[20,["confirmModal"]],[20,["removeArticleFromCollectionModalTitle"]],[20,["removeArticleFromCollectionModalMessage"]],"removeArticle"]]],false],[0,"\\n\\n"],[1,[25,"citation-modal",null,[["modal","article","library"],[[20,["citationModal"]],[20,["article"]],[20,["library"]]]]],false],[0,"\\n\\n"],[1,[25,"share-modal",null,[["modal","article","library","copyLinkToArticleModal"],[[20,["shareModal"]],[20,["article"]],[20,["library"]],[20,["copyLinkToArticleModal"]]]]],false],[0,"\\n\\n"],[1,[25,"copy-link-to-article-modal",null,[["modal","article","library"],[[20,["copyLinkToArticleModal"]],[20,["article"]],[20,["library"]]]]],false],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/article-list-item/template.hbs" } })
    }), define("browzine-web/components/article-list/component", ["exports", "browzine-web/mixins/accordion-container", "browzine-web/mixins/trigger-on-enter"], function (e, t, n) {
        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, n.default, {
            classNames: ["article-list"], userAgent: Ember.inject.service("user-agent"), scrollDebounce: 10, displayBackToTop: !1, scrollContainer: Ember.computed(function () { return Ember.$(window) }), didInsertElement: function () { this._super.apply(this, arguments), this._bindScroll(), this._checkIfScrolled(), Ember.run.schedule("afterRender", this, this._addToMyArticles), this.preloadResources() }, didReceiveAttrs: function () { this._super.apply(this, arguments), this.scrollToArticleInContext() }, willDestroyElement: function () { this._unbindScroll() }, scrollToArticleInContext: function () {
                var e = this
                Ember.run.next(function () {
                    var t = Ember.$(".article-in-context-highlight")
                    if (t.length) {
                        var n = e.get("userAgent").get("isAndroid"), r = e.get("userAgent").get("isSafari"), i = e.get("userAgent").get("isEdge"), a = e.get("userAgent").get("isChrome"), s = e.get("userAgent").get("safariVersion"), o = e.get("userAgent").get("iOSVersion"), l = e.get("media.isDesktop") || e.get("media.isJumbo"), u = r && s < 13 || o < 13 && a && !n && !l || i ? "body" : "html", c = Ember.testing ? "#ember-testing-container" : u, d = Ember.$(c), m = Ember.$(".screen-header") ? Math.ceil(Ember.$(".screen-header").height()) : 0, b = Ember.$(".journal-toc header.sticky") ? Math.ceil(Ember.$(".journal-toc header.sticky").height()) : 0, f = 0, p = 0
                        if (e.get("media.isDesktop") || e.get("media.isJumbo") ? (f = Math.ceil(d.height() - m - b), p = Math.ceil(t.offset().top) - (m + b + 15)) : (f = Math.ceil(d.height() - b), p = Math.ceil(t.offset().top) - (b + 15)), Ember.testing) { e.get("media.isDesktop") || e.get("media.isJumbo") ? p -= 135 : p -= 270 } p && f && t.length > 0 && d.animate({ scrollTop: p }, 1e3, "easeOutCubic")
                    }
                })
            }, _addToMyArticles: function () {
                var e = localStorage.getItem("myArticles.addToMyArticles")
                void 0 !== e && null != e && "undefined" != e || (e = null)
                var t = JSON.parse(e) || this.get("myArticles.addToMyArticles")
                if (t) {
                    var n = JSON.parse(t)
                    Ember.run.next(function () { Ember.$("article." + n).length > 0 && (Ember.$("html, body").animate({ scrollTop: Ember.$("article." + n).offset().top - 110 }, "slow"), Ember.run.later(function () { Ember.$("article." + n + " .tools .add-to-my-articles").click(), localStorage.removeItem("myArticles.addToMyArticles") }, 1e3)) })
                }
            }, _bindScroll: function () {
                var e = this
                Ember.$(window).on("scroll.article-list", function () { Ember.run.debounce(e, e._checkIfScrolled, e.get("scrollDebounce")) })
            }, _unbindScroll: function () { Ember.$(window).off("scroll.article-list") }, _checkIfScrolled: function () {
                var e = Ember.$(window).scrollTop(), t = Ember.$(window).height(), n = Ember.$("aside .journal .rest").height(), r = e > t && !this.get("articles.isUpdating")
                this.isDestroyed || (this.set("displayBackToTop", e > t), e > n ? Ember.$(".journal-toc header.sticky").css({ visibility: "visible" }) : Ember.$(".journal-toc header.sticky").css({ visibility: "hidden" }), r && Ember.$(".article-list").addClass("article-list-padding"))
            }, preloadResources: function () { (this.get("media.isMobile") || this.get("media.isTablet")) && Ember.run.once(function () { Ember.$(".controls .issues").click(), Ember.run.once(function () { Ember.$(".controls .related").click(), Ember.run.once(function () { Ember.$(".controls .related").click() }) }) }) }, actions: {
                loadMoreArticles: function () {
                    var e = Ember.RSVP.defer()
                    return this.sendAction("loadMoreArticles", e), e.promise
                }, returnToTop: function () { Ember.$(window).scrollTop(0) }, collectionListUpdated: function () { this.sendAction("refreshCollectionList") }
            }
        })
    }), define("browzine-web/components/article-list/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "tw5VLu8U", block: '{"symbols":["article","scroller","article"],"statements":[[4,"unless",[[20,["disableInfiniteScrolling"]]],null,{"statements":[[4,"infinite-scroller",null,[["use-document","trigger-at","on-load-more"],[true,"70%",[25,"action",[[19,0,[]],"loadMoreArticles"],null]]],{"statements":[[4,"each",[[20,["articles"]]],null,{"statements":[[0,"      "],[1,[25,"article-list-item",null,[["article","library","journal","issue","expandedItem","width","journalIsOnMyBookshelf","expanded","shownInContext","editMode","hidePageNumbers","showMyArticles","onListUpdated","collection","hasUnreadArticles"],[[19,3,[]],[20,["library"]],[20,["journal"]],[20,["issue"]],[20,["expandedItem"]],[20,["width"]],[20,["journalIsOnMyBookshelf"]],"itemExpanded",[25,"and",[[20,["doiToShow"]],[25,"eq",[[20,["doiToShow"]],[19,3,["doi"]]],null]],null],[20,["editMode"]],[20,["hidePageNumbers"]],[20,["showMyArticles"]],[25,"action",[[19,0,[]],"collectionListUpdated"],null],[20,["collection"]],[20,["hasUnreadArticles"]]]]],false],[0,"\\n"]],"parameters":[3]},null],[4,"if",[[19,2,["isLoading"]]],null,{"statements":[[0,"      "],[1,[25,"loading-indicator",null,[["alignment"],["center"]]],false],[0,"\\n"]],"parameters":[]},null]],"parameters":[2]},null]],"parameters":[]},{"statements":[[4,"each",[[20,["articles"]]],null,{"statements":[[0,"    "],[1,[25,"article-list-item",null,[["article","library","journal","issue","expandedItem","width","journalIsOnMyBookshelf","expanded","shownInContext","editMode","hidePageNumbers","showMyArticles","onListUpdated","collection"],[[19,1,[]],[20,["library"]],[20,["journal"]],[20,["issue"]],[20,["expandedItem"]],[20,["width"]],[20,["journalIsOnMyBookshelf"]],"itemExpanded",[25,"and",[[20,["doiToShow"]],[25,"eq",[[20,["doiToShow"]],[19,1,["doi"]]],null]],null],[20,["editMode"]],[20,["hidePageNumbers"]],[20,["showMyArticles"]],[25,"action",[[19,0,[]],"collectionListUpdated"],null],[20,["collection"]]]]],false],[0,"\\n"]],"parameters":[1]},null]],"parameters":[]}],[0,"\\n"],[4,"if",[[20,["displayBackToTop"]]],null,{"statements":[[0,"  "],[6,"div"],[9,"class","back-to-top tabindex"],[9,"tabindex","0"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","returnToTop"],null],null],[3,"action",[[19,0,[]],"returnToTop"]],[7],[0,"\\n    "],[6,"div"],[9,"class","icon flaticon solid up-2"],[7],[8],[0,"\\n    "],[6,"div"],[9,"class","label"],[7],[1,[25,"t",["journal.articles.back_to_top"],null],false],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/article-list/template.hbs" } }) }), define("browzine-web/components/article-loading-box/component", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({ intl: Ember.inject.service(), shouldShowHelp: Ember.computed(function () { return (!this.get("article.openAccess") || !this.get("article.contentLocation") && !this.get("article.fullTextFile")) && ("fullText" === this.get("loadingType") ? !this.get("hasArticle") || this.get("issue.embargoed") || this.get("article.journal.accessedThroughAggregator") && this.get("article.inPress") || this.get("article.journal.embargoDescription") && this.get("article.inPress") : "inContext" === this.get("loadingType") ? !this.get("article.browseable") : void 0) }), supportTitle: Ember.computed("intl.primaryLocale", function () { return this.get("intl").t("library.interstitial.support") }), actions: { retry: function () { window.location.reload() } } }) }), define("browzine-web/components/article-loading-box/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "J5yumpPb", block: '{"symbols":[],"statements":[[6,"div"],[9,"class","article-loading-box"],[7],[0,"\\n  "],[6,"div"],[9,"class","header"],[7],[0,"\\n    "],[6,"div"],[9,"class","logo"],[7],[1,[25,"library-logo",null,[["library"],[[20,["library"]]]]],false],[8],[0,"\\n    "],[6,"div"],[9,"tabindex","0"],[9,"class","library"],[7],[0,"\\n      "],[6,"h1"],[9,"class","attribution"],[7],[1,[25,"t",["library.header.access_provided_by"],null],false],[8],[0,"\\n      "],[6,"span"],[9,"class","name"],[10,"title",[26,[[20,["library","name"]]]]],[7],[1,[20,["library","name"]],false],[8],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"div"],[9,"class","border"],[7],[8],[0,"\\n\\n  "],[6,"div"],[9,"tabindex","0"],[9,"class","body"],[7],[0,"\\n"],[4,"content-preview-box",null,[["article","issue","journal","shouldShowILL"],[[20,["article"]],[20,["issue"]],[20,["journal"]],[20,["shouldShowHelp"]]]],{"statements":[[4,"if",[[25,"eq",[[20,["loadingType"]],"fullTextFile"],null]],null,{"statements":[[4,"if",[[20,["hasFullTextFile"]]],null,{"statements":[[4,"if",[[25,"and",[[20,["article","vpnRequired"]],[25,"not",[[20,["article","openAccess"]]],null]],null]],null,{"statements":[[0,"            "],[6,"span"],[9,"class","loading auth-fail"],[7],[1,[25,"t",["library.interstitial.authentication_failed"],null],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"            "],[6,"span"],[9,"class","loading"],[7],[1,[25,"t",["library.interstitial.locating_article"],null],false],[0," "],[1,[25,"t",["untranslated.pdf"],null],false],[0," "],[1,[25,"loading-indicator",null,[["alignment"],["right"]]],false],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[0,"          "],[6,"span"],[9,"class","loading auth-fail"],[7],[1,[25,"t",["library.interstitial.file_not_found"],null],false],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[4,"if",[[25,"eq",[[20,["loadingType"]],"fullText"],null]],null,{"statements":[[4,"if",[[20,["hasArticle"]]],null,{"statements":[[4,"if",[[25,"and",[[20,["article","vpnRequired"]],[25,"not",[[20,["article","openAccess"]]],null]],null]],null,{"statements":[[0,"            "],[6,"span"],[9,"class","loading auth-fail"],[7],[1,[25,"t",["library.interstitial.authentication_failed"],null],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[25,"and",[[25,"or",[[20,["issue","embargoed"]],[25,"and",[[20,["article","journal","accessedThroughAggregator"]],[20,["article","inPress"]]],null],[25,"and",[[20,["article","journal","embargoDescription"]],[20,["article","inPress"]]],null]],null],[25,"not",[[20,["article","openAccess"]]],null]],null]],null,{"statements":[[0,"            "],[6,"span"],[9,"class","loading auth-fail"],[7],[1,[25,"t",["library.interstitial.library_has_no_fulltext"],null],false],[0,":"],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"            "],[6,"span"],[9,"class","loading"],[7],[1,[25,"t",["library.interstitial.locating_article"],null],false],[0," "],[1,[25,"loading-indicator",null,[["alignment"],["right"]]],false],[8],[0,"\\n          "]],"parameters":[]}]],"parameters":[]}]],"parameters":[]},{"statements":[[4,"if",[[25,"and",[[20,["shouldShowHelp"]],[20,["article","ILLURL"]]],null]],null,{"statements":[[0,"            "],[6,"span"],[9,"class","loading auth-fail"],[7],[1,[25,"t",["library.interstitial.full_text_unavailable"],null],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"            "],[6,"span"],[9,"class","loading auth-fail"],[7],[1,[25,"t",["library.interstitial.article_unavailable_at_library"],null],false],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]}]],"parameters":[]},{"statements":[[4,"if",[[25,"or",[[25,"eq",[[20,["loadingType"]],"inContext"],null],true],null]],null,{"statements":[[4,"if",[[20,["article","browseable"]]],null,{"statements":[[0,"          "],[6,"span"],[9,"class","loading"],[7],[1,[25,"t",["library.interstitial.locating_article"],null],false],[0," "],[1,[25,"loading-indicator",null,[["alignment"],["right"]]],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[25,"and",[[20,["shouldShowHelp"]],[20,["article","ILLURL"]]],null]],null,{"statements":[[0,"            "],[6,"span"],[9,"class","loading auth-fail"],[7],[1,[25,"t",["library.interstitial.full_text_unavailable"],null],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"            "],[6,"span"],[9,"class","loading auth-fail"],[7],[1,[25,"t",["library.interstitial.article_unavailable_at_library"],null],false],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]}],[0,"      "]],"parameters":[]},null]],"parameters":[]}]],"parameters":[]}]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"or",[[25,"eq",[[20,["loadingType"]],"fullText"],null],[25,"eq",[[20,["loadingType"]],"fullTextFile"],null]],null]],null,{"statements":[[4,"if",[[20,["article","vpnRequired"]]],null,{"statements":[[0,"        "],[6,"div"],[9,"class","vpn"],[7],[0,"\\n          "],[1,[25,"login-information",null,[["library","shouldDisplayIp","shouldDisplayVpnError","error"],[[20,["library"]],true,false,[20,["article","ipRangeError"]]]]],false],[0,"\\n\\n          "],[6,"div"],[9,"class","options"],[7],[0,"\\n            "],[6,"button"],[9,"class","button primary"],[3,"action",[[19,0,[]],"retry"]],[7],[1,[25,"t",["library.interstitial.try_again_button_text"],null],false],[8],[0,"\\n            "],[6,"div"],[9,"class","contact-link"],[7],[1,[25,"help-link",null,[["label","icon"],[[20,["supportTitle"]],"help-2"]]],false],[8],[0,"\\n          "],[8],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["shouldShowHelp"]]],null,{"statements":[[0,"        "],[1,[25,"article-loading-unavailable-article-help",null,[["article","library","shouldShowHelp"],[[20,["article"]],[20,["library"]],[20,["shouldShowHelp"]]]]],false],[0,"\\n      "]],"parameters":[]},null]],"parameters":[]}]],"parameters":[]},{"statements":[[4,"if",[[25,"or",[[25,"eq",[[20,["loadingType"]],"inContext"],null],true],null]],null,{"statements":[[4,"if",[[20,["shouldShowHelp"]]],null,{"statements":[[0,"        "],[1,[25,"article-loading-unavailable-article-help",null,[["article","library","shouldShowHelp"],[[20,["article"]],[20,["library"]],[20,["shouldShowHelp"]]]]],false],[0,"\\n"]],"parameters":[]},null],[0,"    "]],"parameters":[]},null]],"parameters":[]}],[0,"  "],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/article-loading-box/template.hbs" } }) }), define("browzine-web/components/article-loading-unavailable-article-help/component", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({ actions: { gotoILL: function (e) { window.location.assign(e.get("ILLURL")) } } }) }), define("browzine-web/components/article-loading-unavailable-article-help/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "rjq0nBJD", block: '{"symbols":[],"statements":[[4,"if",[[20,["article","ILLURL"]]],null,{"statements":[[0,"  "],[6,"button"],[9,"class","button ill-button primary"],[3,"action",[[19,0,[]],"gotoILL",[20,["article"]]]],[7],[1,[25,"t",["library.interstitial.ill_link"],null],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"  "],[6,"div"],[9,"class","gray-box"],[7],[0,"\\n    "],[6,"p"],[9,"class","assistance"],[7],[1,[25,"t",["library.interstitial.assistance_message"],null],false],[8],[0,"\\n"],[4,"if",[[20,["library","webInfoURL"]]],null,{"statements":[[0,"      "],[6,"p"],[7],[6,"a"],[10,"href",[26,[[20,["library","webInfoURL"]]]]],[9,"class","contact-link"],[7],[1,[25,"t",["library.interstitial.contact_link_text"],null],false],[8],[8],[0,"\\n"]],"parameters":[]},null],[0,"  "],[8],[0,"\\n"]],"parameters":[]}]],"hasEval":false}', meta: { moduleName: "browzine-web/components/article-loading-unavailable-article-help/template.hbs" } }) }), define("browzine-web/components/article-not-found-screen/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "/C3Oz006", block: '{"symbols":[],"statements":[[4,"splash-panel",null,null,{"statements":[[0,"  "],[6,"div"],[9,"class","error-screen"],[7],[0,"\\n    "],[6,"img"],[9,"src","//browzine-app.thirdiron.com/images/bz_question_mark-fdd992c72b9bc01a06fb6d01a19d52ce.png"],[10,"alt",[26,[[25,"t",["error_screen.question_mark"],null]]]],[7],[8],[0,"\\n    "],[6,"p"],[7],[0,"\\n      "],[1,[25,"t",["error_screen.article_not_found_message"],null],false],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/article-not-found-screen/template.hbs" } }) }), define("browzine-web/components/back-issue-item/component", ["exports"], function (e) {
        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({
            classNames: "issue", classNameBindings: ["locked", "active:active-override", "journal.accessedThroughAggregator"], a11y: Ember.inject.service(), unreads: Ember.inject.service(), issueOrArticlesInPressStatus: Ember.computed(function () { return this.get("articlesInPress") ? this.get("unreads").getArticlesInPressStatusById(this.get("journal.id")) : this.get("unreads").getIssueStatusById(this.get("issue").id) }), unreadCount: Ember.computed.alias("issueOrArticlesInPressStatus.unreadCount"), actions: {
                toggleIssues: function (e, t) { var n = this; (this.get("media.isMobile") || this.get("media.isTablet")) && Ember.run(function () { Ember.$(".controls .issues").click(), Ember.run.schedule("actions", n, function () { n.get("router").transitionTo(e, t) }) }) }, focusIssueTitle: function () {
                    var e = this, t = this.get("a11y")
                    Ember.run(function () { Ember.run.schedule("actions", e, function () { t.issueTitleFocus() }) })
                }
            }
        })
    }), define("browzine-web/components/back-issue-item/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "JfbFlHAO", block: '{"symbols":[],"statements":[[4,"link-to",[[20,["route"]],[20,["issue"]]],[["tabindex","invokeAction"],["0",[25,"action",[[19,0,[]],"focusIssueTitle"],null]]],{"statements":[[0,"  "],[6,"span"],[9,"class","label"],[3,"action",[[19,0,[]],"toggleIssues",[20,["route"]],[20,["issue"]]]],[7],[1,[18,"title"],false],[8],[0,"\\n\\n  "],[6,"div"],[9,"class","accessories"],[7],[0,"\\n"],[4,"if",[[20,["issue","suppressed"]]],null,{"statements":[[0,"      "],[6,"div"],[7],[0,"\\n        "],[6,"span"],[9,"class","suppressed-warning-badge"],[7],[0,"\\n          "],[1,[25,"t",["untranslated.suppressed"],null],false],[0,"\\n        "],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["journalIsOnMyBookshelf"]]],null,{"statements":[[0,"      "],[1,[25,"unread-badge",null,[["count"],[[20,["unreadCount"]]]]],false],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["locked"]]],null,{"statements":[[0,"      "],[6,"span"],[9,"class","icon flaticon stroke lock-1"],[7],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n    "],[6,"span"],[9,"class","icon arrow flaticon solid right-2"],[7],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/back-issue-item/template.hbs" } }) }), define("browzine-web/components/basic-dropdown", ["exports", "ember-basic-dropdown/components/basic-dropdown"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/basic-dropdown/content-element", ["exports", "ember-basic-dropdown/components/basic-dropdown/content-element"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/basic-dropdown/content", ["exports", "ember-basic-dropdown/components/basic-dropdown/content"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/basic-dropdown/trigger", ["exports", "ember-basic-dropdown/components/basic-dropdown/trigger"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/browzine-logo/component", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({ tagName: "" }) }), define("browzine-web/components/browzine-logo/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "ln+WUGln", block: '{"symbols":[],"statements":[[6,"img"],[9,"id","app-logo"],[10,"alt",[26,[[25,"t",["browzine_logo"],null]]]],[9,"src","//browzine-app.thirdiron.com/images/logo-browzine-62b8624c8d0e82b217b594ea8bf3ba1b.png"],[7],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/browzine-logo/template.hbs" } }) }), define("browzine-web/components/bz-modal/component", ["exports", "browzine-web/mixins/trigger-on-enter"], function (e, t) {
        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, {
            a11y: Ember.inject.service(), previousActiveElement: null, init: function () {
                var e = this
                this._super.apply(this, arguments)
                var t = this.get("modal")
                t.hide = function () { e.hide() }, t.show = function () { e.show() }
                var n = function (t) { 27 === t.keyCode && Ember.run.next(function () { e.hide() }) }
                Ember.$(document).on("keyup", n), this.set("handleKeyPress", n)
            }, didDestroyElement: function () { Ember.$(document).unbind("keyup", this.get("handleKeyPress")) }, show: function () {
                var e = this.get("modal"), t = this.get("a11y")
                t.set("previousActiveElement", document.activeElement), t.bzModalFocus(e), Ember.$("body").addClass("no-scroll"), this.$(".bz-modal-container").show(), e.onShow && e.onShow()
            }, hide: function () {
                var e = this.get("modal")
                this.get("a11y").bzModalBlur(), Ember.$("body").removeClass("no-scroll"), this.$(".bz-modal-container").hide(), e.onHide && e.onHide()
            }, actions: { hide: function () { this.hide() }, show: function () { this.show() }, hold: function () { } }
        })
    })
define("browzine-web/components/bz-modal/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "2LzYaLNq", block: '{"symbols":["&default"],"statements":[[6,"div"],[9,"class","bz-modal-container"],[9,"role","dialog"],[7],[0,"\\n  "],[6,"div"],[9,"class","bz-modal"],[7],[0,"\\n    "],[6,"span"],[9,"class","bz-modal-cancel-button"],[10,"onclick",[25,"action",[[19,0,[]],"hide"],null],null],[7],[0,"\\n      "],[6,"span"],[9,"class","icon x-1 flaticon stroke"],[9,"aria-hidden","true"],[7],[8],[0,"\\n    "],[8],[0,"\\n    "],[11,1],[0,"\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"class","bz-modal-backdrop"],[10,"onclick",[25,"action",[[19,0,[]],[25,"if",[[25,"or",[[20,["media","isDesktop"]],[20,["media","isJumbo"]]],null],"hide","hold"],null]],null],null],[7],[0,"\\n  "],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/bz-modal/template.hbs" } }) }), define("browzine-web/components/centered-menu/component", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({
        customizations: Ember.inject.service(), customStyle: Ember.computed("customStyleString", function () {
            var e = this.get("customStyleString")
            return Ember.String.htmlSafe(e)
        }), init: function () { this._super.apply(this, arguments), this.set("customStyleString", this.get("customizations").getCustomStyle()) }
    })
}), define("browzine-web/components/centered-menu/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "1Qc4GnvR", block: '{"symbols":["&default"],"statements":[[6,"div"],[9,"class","centered-menu"],[7],[0,"\\n  "],[6,"div"],[9,"class","banner"],[10,"style",[18,"customStyle"],null],[7],[0,"\\n"],[4,"if",[[20,["showShadows"]]],null,{"statements":[[0,"      "],[6,"div"],[9,"class","shadow-top"],[7],[8],[0,"\\n      "],[6,"div"],[9,"class","shadow-bottom"],[7],[8],[0,"\\n"]],"parameters":[]},null],[0,"  "],[8],[0,"\\n\\n  "],[6,"div"],[9,"class","content"],[7],[0,"\\n    "],[11,1],[0,"\\n  "],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/centered-menu/template.hbs" } }) }), define("browzine-web/components/citation-modal/component", ["exports", "browzine-web/mixins/trigger-on-enter"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, {
        classNames: ["citation-modal"], exporters: Ember.inject.service(), init: function () {
            var e = this
            this._super.apply(this, arguments)
            var t = this.get("modal")
            Ember.run.next(function () { t.element = e.element, t.element.id = e.element.id }), t.ok = function () { e.ok() }, t.cancel = function () { e.cancel() }
        }, didReceiveAttrs: function () {
            var e = this
            this.get("modal").onShow = function () { Ember.run.next(function () { e.$("ul.services li:first-child").focus() }) }
        }, actions: {
            ok: function () { this.get("modal").hide() }, zotero: function () {
                var e = this.get("article"), t = this.get("library")
                this.get("exporters").zotero(t, e), this.send("ok")
            }, mendeley: function () {
                var e = this.get("article"), t = this.get("library")
                this.get("exporters").mendeley(t, e), this.send("ok")
            }, bibtex: function () {
                var e = this.get("article"), t = this.get("library")
                this.get("exporters").bibtex(t, e), this.send("ok")
            }, refworks: function () {
                var e = this.get("article"), t = this.get("library")
                this.get("exporters").refworks(t, e), this.send("ok")
            }, endnote: function () {
                var e = this.get("article"), t = this.get("library")
                this.get("exporters").endnote(t, e), this.send("ok")
            }, universal: function () { this.send("endnote") }, citavi: function () { this.send("endnote") }
        }
    })
}), define("browzine-web/components/citation-modal/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "9HXgDX9/", block: '{"symbols":[],"statements":[[4,"bz-modal",null,[["modal"],[[20,["modal"]]]],{"statements":[[0,"  "],[6,"div"],[9,"class","bz-modal-title"],[7],[0,"\\n    "],[1,[25,"t",["journal.article.tools.citation_services"],null],false],[0,"\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"class","bz-modal-content"],[7],[0,"\\n    "],[6,"ul"],[9,"class","services"],[7],[0,"\\n      "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","zotero"],null],null],[3,"action",[[19,0,[]],"zotero"]],[7],[0,"\\n        "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["untranslated.zotero"],null],false],[8],[0,"\\n      "],[8],[0,"\\n      "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","mendeley"],null],null],[3,"action",[[19,0,[]],"mendeley"]],[7],[0,"\\n        "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["untranslated.mendeley"],null],false],[8],[0,"\\n      "],[8],[0,"\\n      "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","bibtex"],null],null],[3,"action",[[19,0,[]],"bibtex"]],[7],[0,"\\n        "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["untranslated.bibtex"],null],false],[8],[0,"\\n      "],[8],[0,"\\n      "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","refworks"],null],null],[3,"action",[[19,0,[]],"refworks"]],[7],[0,"\\n        "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["untranslated.refworks"],null],false],[8],[0,"\\n      "],[8],[0,"\\n      "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","endnote"],null],null],[3,"action",[[19,0,[]],"endnote"]],[7],[0,"\\n        "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["untranslated.endnote_ris"],null],false],[8],[0,"\\n      "],[8],[0,"\\n      "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","citavi"],null],null],[3,"action",[[19,0,[]],"citavi"]],[7],[0,"\\n        "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["untranslated.citavi_ris"],null],false],[8],[0,"\\n      "],[8],[0,"\\n      "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","universal"],null],null],[3,"action",[[19,0,[]],"universal"]],[7],[0,"\\n        "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["journal.article.export_citation_menu.universal_ris"],null],false],[8],[0,"\\n      "],[8],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"class","bz-modal-footer"],[7],[0,"\\n    "],[6,"span"],[9,"tabindex","0"],[9,"class","button primary tabindex"],[10,"onclick",[25,"action",[[19,0,[]],"ok"],null],null],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","ok"],null],null],[7],[0,"\\n      "],[1,[25,"t",["settings.close_button"],null],false],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/citation-modal/template.hbs" } }) }), define("browzine-web/components/collection-items/component", ["exports", "moment", "browzine-web/mixins/trigger-on-enter", "ember-intl"], function (e, t, n, r) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(n.default, {
        classNames: ["collection-items"], store: Ember.inject.service(), router: Ember.inject.service(), myArticles: Ember.inject.service(), sync: Ember.inject.service(), intl: Ember.inject.service(), noArticles: !1, collectionNameEditableElementLabel: (0, r.t)("my_articles.collection_name_editable_element_label"), sortByJournalDateAddedLinkAriaLabel: (0, r.t)("my_articles.collection_sort_by_journal_date_added_link_label"), sortByJournalTitleLinkAriaLabel: (0, r.t)("my_articles.collection_sort_by_journal_title_link_label"), sortByJournalTitleLinkText: (0, r.t)("my_articles.collection_sort_by_journal_title_link_text"), removeCollectionModalTitle: (0, r.t)("my_articles.remove_collection_modal_title"), removeCollectionModalMessage: (0, r.t)("my_articles.remove_collection_modal_message"), init: function () { this._super.apply(this, arguments), this.set("collectionRemoveModal", {}), Ember.getOwner(this).lookup("router:main")._routerMicrolib.state.fullQueryParams.searchVisible && Ember.run.throttle(this, this.refreshCollectionList, 1e3) }, sortedArticles: Ember.computed.sort("paginatedArticles", function (e, n) {
            var r = this.get("store"), i = Ember.getOwner(this).lookup("router:main")._routerMicrolib.state, a = i.params["library.my-articles.collection"].collection_id, s = i.queryParams.sort, o = r.peekRecord("collection", a), l = e.get("journal.sortTitle"), u = n.get("journal.sortTitle"), c = void 0, d = void 0
            switch (o.get("items").forEach(function (t) {
                if ("article" === t.get("itemType")) {
                    var r = t.get("itemId")
                    r === e.get("syncId") ? c = t.get("addedAt") : r === n.get("syncId") && (d = t.get("addedAt"))
                }
            }), s) {
                case "journal": return l > u ? 1 : l < u ? -1 : (0, t.default)(c).isAfter(d) ? -1 : 1
                case "date": return (0, t.default)(c).isAfter(d) ? -1 : 1
            }
        }), didReceiveAttrs: function () { this._super.apply(this, arguments), Ember.getOwner(this).lookup("router:main")._routerMicrolib.state.fullQueryParams.searchVisible || Ember.run.throttle(this, this.refreshCollectionList, 1e3) }, refreshCollectionList: function () {
            var e = this, t = this.get("store"), n = this.get("myArticles"), r = this.get("collectionId")
            if (!this.get("sync.initialCollectionLoadComplete")) return this.set("initializing", !1), this.set("noArticles", !0), !1
            this.set("initializing", !0), this.set("noArticles", !1), n.loadCollections().then(function () {
                var n = t.peekRecord("collection", r)
                e.set("collection", n)
                var i = n.get("items").filter(function (e) { return !e.get("isDeleted") }).mapBy("itemId")
                if (i.length > 0) {
                    for (var a = 0, s = []; a <= i.length;) {
                        var o = i.slice(a, a + 20)
                        if (o.length > 0) {
                            var l = t.query("article", { filter: { syncId: o.toString() }, include: "journal,issue" })
                            s.push(l)
                        } a += 20
                    } Ember.RSVP.all(s).then(function () {
                        var n = t.peekAll("article").filter(function (e) { return i.indexOf(e.get("syncId")) > -1 })
                        e.set("paginatedArticles", n), e.set("initializing", !1)
                    }).catch(function () { e.set("noArticles", !0) })
                } else e.set("noArticles", !0)
            })
        }, actions: {
            updateCollectionName: function (e, t) { e && t && (e.set("name", t), this.get("myArticles").saveCollection(e)) }, refreshCollectionList: function () { this.refreshCollectionList() }, confirmRemoveCollection: function (e) {
                var t = this, n = this.get("collectionRemoveModal"), r = e.get("name")
                n.removeCollection = function () { t.send("removeCollection", e) }, n.show()
                var i = this.get("intl"), a = i.t("my_articles.other_remove_collection_modal_message_1", { collectionName: r }), s = i.t("my_articles.other_remove_collection_modal_message_2")
                this.$(".collection-remove-modal .bz-modal-content").html("\n        " + a + "\n        <br><br>\n        " + s + "\n      ")
            }, removeCollection: function (e) { "collection-general" !== e.get("id") && (e.deleteRecord(), this.get("myArticles").saveCollection(e, "removeCollection"), this.get("router").transitionTo("library.my-articles.collection", "collection-general")) }
        }
    })
}), define("browzine-web/components/collection-items/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "osje/LFx", block: '{"symbols":[],"statements":[[4,"if",[[20,["noArticles"]]],null,{"statements":[[0,"  "],[6,"header"],[10,"aria-label",[26,[[25,"t",["my_articles.collection_header_aria_label"],null]]]],[9,"class","collection-header"],[7],[0,"\\n"],[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[0,"      "],[6,"span"],[9,"tabindex","0"],[9,"class","saved-articles"],[7],[0,"\\n        "],[1,[25,"t",["my_articles.collection_saved_article_count"],[["count"],[[20,["collection","items","length"]]]]],false],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[4,"unless",[[25,"eq",[[20,["collection","name"]],"General Collection"],null]],null,{"statements":[[0,"        "],[6,"div"],[9,"tabindex","0"],[9,"class","remove-collection"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","confirmRemoveCollection",[20,["collection"]]],null],null],[3,"action",[[19,0,[]],"confirmRemoveCollection",[20,["collection"]]]],[7],[0,"\\n          "],[6,"span"],[9,"class","icon fa fa-trash-o"],[7],[8],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"eq",[[20,["collection","name"]],"General Collection"],null]],null,{"statements":[[0,"      "],[6,"h1"],[9,"tabindex","0"],[9,"class","title"],[7],[1,[25,"t",["my_articles.general_collection_name"],null],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"editable-element",null,[["value","label","editable","save"],[[20,["collection","name"]],[20,["collectionNameEditableElementLabel"]],true,[25,"action",[[19,0,[]],"updateCollectionName",[20,["collection"]]],null]]],{"statements":[[0,"        "],[6,"h1"],[9,"tabindex","0"],[9,"class","title"],[7],[1,[20,["collection","name"]],false],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]}],[0,"  "],[8],[0,"\\n\\n  "],[6,"p"],[9,"tabindex","0"],[9,"class","no-articles-message"],[7],[1,[25,"t",["my_articles.collection_no_articles_message"],null],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["initializing"]]],null,{"statements":[[0,"  "],[1,[25,"loading-indicator",null,[["alignment"],["center"]]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"  "],[6,"div"],[9,"class","header-container"],[7],[0,"\\n    "],[6,"header"],[10,"aria-label",[26,[[25,"t",["my_articles.collection_header_aria_label"],null]]]],[9,"class","collection-header"],[7],[0,"\\n"],[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[0,"        "],[6,"span"],[9,"tabindex","0"],[9,"class","saved-articles"],[7],[0,"\\n          "],[1,[25,"t",["my_articles.collection_saved_article_count"],[["count"],[[20,["collection","items","length"]]]]],false],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[4,"unless",[[25,"eq",[[20,["collection","name"]],"General Collection"],null]],null,{"statements":[[0,"          "],[6,"div"],[9,"tabindex","0"],[9,"class","remove-collection"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","confirmRemoveCollection",[20,["collection"]]],null],null],[3,"action",[[19,0,[]],"confirmRemoveCollection",[20,["collection"]]]],[7],[0,"\\n            "],[6,"span"],[9,"class","icon fa fa-trash-o"],[7],[8],[0,"\\n          "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"eq",[[20,["collection","name"]],"General Collection"],null]],null,{"statements":[[0,"        "],[6,"h1"],[9,"tabindex","0"],[9,"class","title"],[7],[1,[25,"t",["my_articles.general_collection_name"],null],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"editable-element",null,[["value","label","editable","save"],[[20,["collection","name"]],[20,["collectionNameEditableElementLabel"]],true,[25,"action",[[19,0,[]],"updateCollectionName",[20,["collection"]]],null]]],{"statements":[[0,"          "],[6,"h1"],[9,"tabindex","0"],[9,"class","title"],[7],[1,[20,["collection","name"]],false],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]}],[0,"    "],[8],[0,"\\n\\n"],[4,"if",[[25,"or",[[20,["media","isDesktop"]],[20,["media","isJumbo"]]],null]],null,{"statements":[[0,"      "],[6,"section"],[10,"aria-label",[26,[[25,"t",["my_articles.collection_sort_section_label"],null]]]],[9,"class","collection-items-sort"],[7],[0,"\\n        "],[6,"span"],[10,"class",[26,[[25,"if",[[25,"eq",[[20,["sort"]],"date"],null],"active"],null]]]],[7],[0,"\\n"],[4,"link-to",[[25,"query-params",null,[["sort"],["date"]]]],[["class","aria-label","tabindex"],["sort-control sort-by-date hide-underline",[20,["sortByJournalDateAddedLinkAriaLabel"]],"0"]],{"statements":[[0,"            "],[1,[25,"t",["my_articles.collection_sort_by_journal_date_added_link_text"],[["htmlSafe"],[true]]],false],[0,"\\n"]],"parameters":[]},null],[0,"        "],[8],[0,"\\n        /\\n        "],[6,"span"],[10,"class",[26,[[25,"if",[[25,"eq",[[20,["sort"]],"journal"],null],"active"],null]]]],[7],[0,"\\n          "],[4,"link-to",[[25,"query-params",null,[["sort"],["journal"]]]],[["class","aria-label","tabindex"],["sort-control sort-by-journal",[20,["sortByJournalTitleLinkAriaLabel"]],"0"]],{"statements":[[1,[18,"sortByJournalTitleLinkText"],false]],"parameters":[]},null],[0,"\\n        "],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},null],[0,"  "],[8],[0,"\\n\\n  "],[1,[25,"article-list",null,[["articles","library","highlight","editMode","journalIsOnMyBookshelf","hidePageNumbers","showMyArticles","disableInfiniteScrolling","refreshCollectionList","collection"],[[20,["sortedArticles"]],[20,["library"]],[20,["highlight"]],[20,["editMode"]],[20,["journalIsOnMyBookshelf"]],[20,["model","articlesInPress"]],true,true,[25,"action",[[19,0,[]],"refreshCollectionList"],null],[20,["collection"]]]]],false],[0,"\\n"]],"parameters":[]}]],"parameters":[]}],[0,"\\n"],[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[0,"  "],[1,[25,"collection-remove-modal",null,[["modal","title","message","successAction"],[[20,["collectionRemoveModal"]],[20,["removeCollectionModalTitle"]],[20,["removeCollectionModalMessage"]],"removeCollection"]]],false],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/collection-items/template.hbs" } }) }), define("browzine-web/components/collection-list/component", ["exports", "browzine-web/mixins/trigger-on-enter", "ember-intl"], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, {
        classNameBindings: ["issue.embargoed", "active:active-override", "journal.accessedThroughAggregator"], store: Ember.inject.service(), myArticles: Ember.inject.service(), sorting: Ember.inject.service(), intl: Ember.inject.service(), removeCollectionModalTitle: (0, n.t)("my_articles.remove_collection_modal_title"), removeCollectionModalMessage: (0, n.t)("my_articles.remove_collection_modal_message"), init: function () {
            this._super.apply(this, arguments)
            var e = this.get("store").peekAll("collection")
            this.set("collections", e), this.set("collectionRemoveModal", {})
        }, sortedCollections: Ember.computed.sort("collections.@each.{name}", function (e, t) { return this.get("sorting").get("sortCollections")(e, t) }), actions: {
            confirmRemoveCollection: function (e) {
                var t = this, n = this.get("collectionRemoveModal"), r = e.get("name")
                n.removeCollection = function () { t.send("removeCollection", e) }, n.show()
                var i = this.get("intl"), a = i.t("my_articles.other_remove_collection_modal_message_1", { collectionName: r }), s = i.t("my_articles.other_remove_collection_modal_message_2")
                this.$(".bz-modal-content").html("\n        " + a + "\n        <br><br>\n        " + s + "\n      ")
            }, removeCollection: function (e) { "collection-general" !== e.get("id") && (e.deleteRecord(), this.get("myArticles").saveCollection(e, "removeCollection"), this.get("router").transitionTo("library.my-articles.collection", "collection-general")) }, toggleCollections: function () { this.sendAction("toggleCollections") }, createCollection: function () { this.sendAction("createCollection") }
        }
    })
}), define("browzine-web/components/collection-list/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "O6caiCu2", block: '{"symbols":["collection","collection"],"statements":[[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[0,"  "],[6,"ul"],[9,"class","collection-list"],[7],[0,"\\n"],[4,"each",[[20,["sortedCollections"]]],null,{"statements":[[4,"link-to",["library.my-articles.collection",[19,2,["id"]]],[["class","tagName","invokeAction"],["collection-list-item collection-item","li",[25,"action",[[19,0,[]],"toggleCollections"],null]]],{"statements":[[4,"link-to",["library.my-articles.collection",[19,2,["id"]]],[["id","tabindex"],[[19,2,["id"]],"0"]],{"statements":[[4,"if",[[25,"eq",[[19,2,["name"]],"General Collection"],null]],null,{"statements":[[0,"            "],[6,"div"],[9,"class","text label-text"],[7],[1,[25,"t",["my_articles.general_collection_name"],null],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"            "],[6,"div"],[9,"class","text label-text"],[7],[1,[19,2,["name"]],false],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]},null],[0,"\\n        "],[1,[25,"unread-badge",null,[["count"],[[19,2,["items","length"]]]]],false],[0,"\\n        "],[6,"span"],[9,"class","icon flaticon solid right-2"],[9,"aria-hidden","true"],[7],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[2]},null],[0,"\\n"],[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[0,"      "],[6,"li"],[9,"tabindex","0"],[9,"class","create-new-collection-item create-new-collection tabindex"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","createCollection"],null],null],[3,"action",[[19,0,[]],"createCollection"]],[7],[0,"\\n        "],[6,"div"],[9,"class","text"],[7],[6,"span"],[9,"class","icon flaticon solid plus-2"],[9,"aria-hidden","true"],[7],[8],[1,[25,"t",["my_articles.create_new_collection_menu_item_text"],null],false],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},null],[0,"  "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"  "],[6,"div"],[9,"class","collection-list"],[7],[0,"\\n"],[4,"each",[[20,["sortedCollections"]]],null,{"statements":[[4,"link-to",["library.my-articles.collection",[19,1,["id"]]],[["id","class","tabindex"],[[19,1,["id"]],"collection-item","0"]],{"statements":[[4,"if",[[25,"eq",[[19,1,["name"]],"General Collection"],null]],null,{"statements":[[0,"          "],[6,"span"],[9,"class","label label-text"],[7],[1,[25,"t",["my_articles.general_collection_name"],null],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"          "],[6,"span"],[9,"class","label label-text"],[7],[1,[19,1,["name"]],false],[8],[0,"\\n"]],"parameters":[]}],[0,"\\n        "],[6,"div"],[9,"class","accessories"],[7],[0,"\\n"],[4,"unless",[[25,"eq",[[19,1,["name"]],"General Collection"],null]],null,{"statements":[[0,"          "],[6,"span"],[9,"class","remove-collection flaticon solid x-3"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","confirmRemoveCollection",[19,1,[]]],[["preventDefault"],[true]]],null],[10,"title",[26,[[25,"t",["my_articles.remove_collection_button_title"],null]]]],[10,"aria-label",[26,[[25,"t",["my_articles.remove_collection_button_aria_label"],null]]]],[9,"tabindex","0"],[3,"action",[[19,0,[]],"confirmRemoveCollection",[19,1,[]]],[["preventDefault"],[true]]],[7],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n          "],[1,[25,"unread-badge",null,[["count"],[[19,1,["items","length"]]]]],false],[0,"\\n\\n          "],[6,"span"],[9,"class","icon arrow flaticon solid right-2"],[7],[8],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[1]},null],[0,"  "],[8],[0,"\\n"]],"parameters":[]}],[0,"\\n"],[4,"if",[[25,"or",[[20,["media","isDesktop"]],[20,["media","isJumbo"]]],null]],null,{"statements":[[0,"  "],[1,[25,"collection-remove-modal",null,[["modal","title","message","successAction"],[[20,["collectionRemoveModal"]],[20,["removeCollectionModalTitle"]],[20,["removeCollectionModalMessage"]],"removeCollection"]]],false],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/collection-list/template.hbs" } }) }), define("browzine-web/components/collection-modal/component", ["exports", "lodash.foreach", "browzine-web/mixins/trigger-on-enter", "ember-intl"], function (e, t, n, r) {
    function i(e) {
        return function () {
            var t = e.apply(this, arguments)
            return new Promise(function (e, n) {
                return function r(i, a) {
                    try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                    e(o)
                }("next")
            })
        }
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(n.default, {
        classNames: ["collection-modal"], store: Ember.inject.service(), myArticles: Ember.inject.service(), sorting: Ember.inject.service(), newCollectionNameInputLabel: (0, r.t)("my_articles.new_collection_name_input_label"), newCollectionNameInputPlaceholder: (0, r.t)("my_articles.new_collection_name_input_placeholder"), didReceiveAttrs: function () {
            this._super.apply(this, arguments), Ember.run.scheduleOnce("afterRender", this, function () {
                var e = this, t = this.get("store"), n = this.get("modal"), r = t.peekAll("collection")
                this.set("collections", r), n.element = this.element, n.element.id = this.element.id, n.onShow = function () { e.set("name", ""), e.set("addCollection", !1), e.setSelectedCollections(), n.isSelectCollection ? Ember.run.next(function () { e.$("ul.collection-select-container li:first-child") && e.$("ul.collection-select-container li:first-child").focus() }) : Ember.run.next(function () { e.$("input.create-collection-name") && e.$("input.create-collection-name").focus() }) }, this.setSelectedCollections()
            })
        }, setSelectedCollections: function () {
            var e = this.get("modal"), t = {}
            e.getSelected && (t = e.getSelected()), Object.keys(t).length || (t = { "collection-general": !0 }), this.set("selectedCollectionIds", Ember.Object.create(t))
        }, createCollection: function () {
            var e = i(regeneratorRuntime.mark(function e() {
                var t, n, r, i = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return t = this.get("myArticles"), n = this.get("name"), r = { name: n }, this.set("name", ""), e.next = 6, t.createCollection(r, i)
                        case 6: return e.abrupt("return", e.sent)
                        case 7: case "end": return e.stop()
                    }
                }, e, this)
            }))
            return function () { return e.apply(this, arguments) }
        }(), sortedCollections: Ember.computed.sort("collections.@each.{name}", function (e, t) { return this.get("sorting").get("sortCollections")(e, t) }), actions: {
            create: function () {
                var e = i(regeneratorRuntime.mark(function e() {
                    return regeneratorRuntime.wrap(function (e) {
                        for (; ;)switch (e.prev = e.next) {
                            case 0: if (this.get("name")) {
                                e.next = 2
                                break
                            } return e.abrupt("return")
                            case 2: return e.next = 4, this.createCollection()
                            case 4: this.get("modal").hide()
                            case 6: case "end": return e.stop()
                        }
                    }, e, this)
                }))
                return function () { return e.apply(this, arguments) }
            }(), toggleAddCollection: function () {
                var e = this
                if (this.get("name")) this.send("select")
                else {
                    var t = !this.get("addCollection")
                    this.set("addCollection", t), t && Ember.run.next(function () { e.$("input").focus() })
                }
            }, toggleCollectionSelection: function (e) {
                var t = this.get("selectedCollectionIds"), n = t.get(e)
                t.set(e, !n)
            }, select: function () {
                var e = i(regeneratorRuntime.mark(function e() {
                    var n, r, i, a, s
                    return regeneratorRuntime.wrap(function (e) {
                        for (; ;)switch (e.prev = e.next) {
                            case 0: if (n = this.get("modal"), r = this.get("selectedCollectionIds"), i = this.get("name"), a = [], !i) {
                                e.next = 9
                                break
                            } return e.next = 7, this.createCollection(!1)
                            case 7: s = e.sent.get("id"), r.set(s, !0)
                            case 9: return (0, t.default)(r, function (e, t) { e && a.push(t) }), e.next = 12, n.onSelect(a)
                            case 12: n.hide()
                            case 13: case "end": return e.stop()
                        }
                    }, e, this)
                }))
                return function () { return e.apply(this, arguments) }
            }(), cancel: function () { this.get("modal").hide() }
        }
    })
}), define("browzine-web/components/collection-modal/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "egB9VvYG", block: '{"symbols":["collection"],"statements":[[4,"bz-modal",null,[["modal"],[[20,["modal"]]]],{"statements":[[0,"  "],[6,"div"],[10,"class",[26,[[25,"if",[[20,["modal","isSelectCollection"]],"collection-modal-select","collection-modal-create"],null]]]],[7],[0,"\\n    "],[6,"div"],[9,"class","bz-modal-title"],[7],[0,"\\n"],[4,"if",[[20,["modal","isSelectCollection"]]],null,{"statements":[[0,"        "],[1,[25,"t",["my_articles.save_to_my_articles_modal_heading"],null],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[1,[25,"t",["my_articles.create_collection_modal_heading"],null],false],[0,"\\n"]],"parameters":[]}],[0,"    "],[8],[0,"\\n    "],[6,"div"],[9,"class","bz-modal-content"],[7],[0,"\\n"],[4,"if",[[20,["modal","isSelectCollection"]]],null,{"statements":[[0,"        "],[6,"ul"],[9,"class","collection-select-container"],[7],[0,"\\n"],[4,"each",[[20,["sortedCollections"]]],null,{"statements":[[0,"            "],[6,"li"],[9,"tabindex","0"],[10,"class",[26,[[25,"if",[[25,"get",[[20,["selectedCollectionIds"]],[19,1,["id"]]],null],"selected"],null]," tabindex"]]],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","toggleCollectionSelection",[19,1,["id"]]],null],null],[3,"action",[[19,0,[]],"toggleCollectionSelection",[19,1,["id"]]]],[7],[0,"\\n"],[4,"if",[[25,"eq",[[19,1,["name"]],"General Collection"],null]],null,{"statements":[[0,"                "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["my_articles.general_collection_name"],null],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                "],[6,"span"],[9,"class","label"],[7],[1,[19,1,["name"]],false],[8],[0,"\\n"]],"parameters":[]}],[0,"\\n              "],[6,"span"],[9,"class","collection-select-icon"],[7],[0,"\\n"],[4,"if",[[25,"get",[[20,["selectedCollectionIds"]],[19,1,["id"]]],null]],null,{"statements":[[0,"                  "],[6,"span"],[9,"class","fa fa-check-circle"],[7],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                  "],[6,"span"],[9,"class","fa fa-circle"],[7],[8],[0,"\\n"]],"parameters":[]}],[0,"              "],[8],[0,"\\n\\n              "],[6,"span"],[9,"class","details"],[7],[1,[25,"t",["my_articles.collection_article_count_message"],[["count"],[[19,1,["items","length"]]]]],false],[8],[0,"\\n            "],[8],[0,"\\n"]],"parameters":[1]},null],[0,"\\n          "],[6,"li"],[9,"tabindex","0"],[9,"class","new-collection-container tabindex"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","toggleAddCollection"],null],null],[7],[0,"\\n"],[4,"if",[[20,["addCollection"]]],null,{"statements":[[0,"              "],[1,[25,"input",null,[["aria-label","type","class","placeholder","value"],[[20,["newCollectionNameInputLabel"]],"text","new-collection-name",[20,["newCollectionNameInputPlaceholder"]],[20,["name"]]]]],false],[0,"\\n              "],[6,"span"],[9,"class","collection-select-icon"],[7],[0,"\\n                "],[6,"span"],[9,"class","fa fa-check-circle"],[7],[8],[0,"\\n              "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"              "],[6,"span"],[9,"class","label new-collection"],[3,"action",[[19,0,[]],"toggleAddCollection"]],[7],[1,[25,"t",["my_articles.create_new_collection_option_label"],null],false],[8],[0,"\\n              "],[6,"span"],[9,"class","collection-select-icon"],[3,"action",[[19,0,[]],"toggleAddCollection"]],[7],[0,"\\n                "],[6,"span"],[9,"class","fa fa-plus-circle"],[7],[8],[0,"\\n              "],[8],[0,"\\n"]],"parameters":[]}],[0,"          "],[8],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[1,[25,"input",null,[["aria-label","type","class","placeholder","value","enter"],[[20,["newCollectionNameInputLabel"]],"text","create-collection-name",[20,["newCollectionNameInputPlaceholder"]],[20,["name"]],"create"]]],false],[0,"\\n"]],"parameters":[]}],[0,"    "],[8],[0,"\\n\\n    "],[6,"div"],[9,"class","bz-modal-footer"],[7],[0,"\\n"],[4,"if",[[20,["modal","isSelectCollection"]]],null,{"statements":[[0,"        "],[6,"span"],[9,"tabindex","0"],[9,"class","button primary tabindex"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","select"],null],null],[3,"action",[[19,0,[]],"select"]],[7],[0,"\\n          "],[1,[25,"t",["my_articles.modal_done_button_text"],null],false],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[6,"span"],[9,"tabindex","0"],[9,"class","button primary tabindex"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","create"],null],null],[3,"action",[[19,0,[]],"create"]],[7],[0,"\\n          "],[1,[25,"t",["my_articles.modal_save_button_text"],null],false],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]}],[0,"\\n      "],[6,"span"],[9,"tabindex","0"],[9,"class","button secondary tabindex"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","cancel"],null],null],[3,"action",[[19,0,[]],"cancel"]],[7],[0,"\\n        "],[1,[25,"t",["my_articles.modal_cancel_button_text"],null],false],[0,"\\n      "],[8],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/collection-modal/template.hbs" } }) }), define("browzine-web/components/collection-remove-modal/component", ["exports", "browzine-web/mixins/trigger-on-enter"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, {
        classNames: ["collection-remove-modal"], myArticles: Ember.inject.service(), init: function () {
            var e = this
            this._super.apply(this, arguments)
            var t = this.get("modal")
            Ember.run.next(function () { t.element = e.element, t.element.id = e.element.id }), t.ok = function () { e.ok() }, t.cancel = function () { e.cancel() }
        }, didReceiveAttrs: function () {
            var e = this
            this.get("modal").onShow = function () { Ember.run.next(function () { e.$(".bz-modal-content").focus() }) }
        }, actions: {
            ok: function () {
                var e = this.get("modal")
                e[this.get("successAction")](), e.hide()
            }, cancel: function () { this.get("modal").hide() }
        }
    })
}), define("browzine-web/components/collection-remove-modal/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "j7hSnjvS", block: '{"symbols":[],"statements":[[4,"bz-modal",null,[["modal"],[[20,["modal"]]]],{"statements":[[0,"  "],[6,"div"],[9,"class","bz-modal-title"],[7],[0,"\\n    "],[1,[18,"title"],false],[0,"\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"tabindex","0"],[9,"class","bz-modal-content tabindex"],[7],[0,"\\n    "],[1,[18,"message"],false],[0,"\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"class","bz-modal-footer"],[7],[0,"\\n    "],[6,"span"],[9,"tabindex","0"],[9,"class","button primary tabindex"],[10,"onclick",[25,"action",[[19,0,[]],"ok"],null],null],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","ok"],null],null],[7],[0,"\\n      "],[1,[25,"t",["modal_ok_button_text"],null],false],[0,"\\n    "],[8],[0,"\\n\\n    "],[6,"span"],[9,"tabindex","0"],[9,"class","button secondary tabindex"],[10,"onclick",[25,"action",[[19,0,[]],"cancel"],null],null],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","cancel"],null],null],[7],[0,"\\n      "],[1,[25,"t",["modal_cancel_button_text"],null],false],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/collection-remove-modal/template.hbs" } }) }), define("browzine-web/components/confirm-modal/component", ["exports", "browzine-web/mixins/trigger-on-enter"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, {
        classNames: ["confirm-modal"], myArticles: Ember.inject.service(), init: function () {
            var e = this
            this._super.apply(this, arguments)
            var t = this.get("modal")
            Ember.run.next(function () { t.element = e.element, t.element.id = e.element.id }), t.ok = function () { e.ok() }, t.cancel = function () { e.cancel() }
        }, didReceiveAttrs: function () {
            var e = this
            this.get("modal").onShow = function () { Ember.run.next(function () { e.$(".bz-modal-content").focus() }) }
        }, actions: {
            ok: function () {
                var e = this.get("modal")
                e[this.get("successAction")](), e.hide()
            }, cancel: function () { this.get("modal").hide() }
        }
    })
}), define("browzine-web/components/confirm-modal/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "7wfMdNxg", block: '{"symbols":[],"statements":[[4,"bz-modal",null,[["modal"],[[20,["modal"]]]],{"statements":[[0,"  "],[6,"div"],[9,"class","bz-modal-title"],[7],[0,"\\n    "],[1,[18,"title"],false],[0,"\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"tabindex","0"],[9,"class","bz-modal-content tabindex"],[7],[0,"\\n    "],[1,[18,"message"],false],[0,"\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"class","bz-modal-footer"],[7],[0,"\\n    "],[6,"span"],[9,"tabindex","0"],[9,"class","button primary tabindex"],[10,"onclick",[25,"action",[[19,0,[]],"ok"],null],null],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","ok"],null],null],[7],[0,"\\n      "],[1,[25,"t",["modal_ok_button_text"],null],false],[0,"\\n    "],[8],[0,"\\n\\n    "],[6,"span"],[9,"tabindex","0"],[9,"class","button secondary tabindex"],[10,"onclick",[25,"action",[[19,0,[]],"cancel"],null],null],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","cancel"],null],null],[7],[0,"\\n      "],[1,[25,"t",["modal_cancel_button_text"],null],false],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/confirm-modal/template.hbs" } }) }), define("browzine-web/components/content-preview-box/component", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({ classNameBindings: ["isArticlePreview:article-preview", "isIssuePreview:issue-preview"], isArticlePreview: Ember.computed("article", function () { return !!this.get("article") }), isIssuePreview: Ember.computed("issue", "article", function () { return !!this.get("issue") && !this.get("article") }) }) }), define("browzine-web/components/content-preview-box/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "upp4VCfh", block: '{"symbols":["&default"],"statements":[[6,"div"],[10,"class",[26,["content-preview-box ",[18,"previewTypeClass"]]]],[7],[0,"\\n  "],[1,[25,"journal-cover",null,[["journal"],[[20,["journal"]]]]],false],[0,"\\n  "],[6,"div"],[9,"class","info"],[7],[0,"\\n    "],[11,1],[0,"\\n    "],[6,"span"],[9,"tabindex","0"],[9,"class","title"],[7],[1,[20,["article","strippedTitle"]],false],[8],[6,"br"],[7],[8],[0,"\\n    "],[6,"span"],[9,"tabindex","0"],[9,"class","journal"],[7],[1,[20,["journal","title"]],false],[8],[6,"br"],[7],[8],[0,"\\n    "],[6,"span"],[9,"tabindex","0"],[9,"class","authors"],[7],[1,[20,["article","authors"]],false],[8],[6,"br"],[7],[8],[0,"\\n\\n    "],[6,"span"],[9,"tabindex","0"],[9,"class","location"],[7],[0,"\\n"],[4,"if",[[20,["article","inPress"]]],null,{"statements":[[0,"        "],[1,[25,"t",["journal.articles_in_press.location"],null],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[1,[20,["issue","title"]],false],[1,[25,"t",["untranslated.comma"],null],false],[0,"\\n"],[4,"if",[[20,["article","startPage"]]],null,{"statements":[[4,"if",[[20,["article","isSinglePage"]]],null,{"statements":[[0,"            "],[1,[25,"t",["untranslated.p"],null],false],[0," "],[1,[20,["article","startPage"]],false],[1,[25,"t",["untranslated.comma"],null],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"            "],[1,[25,"t",["untranslated.pp"],null],false],[0," "],[1,[20,["article","startPage"]],false],[1,[25,"t",["untranslated.emdash"],null],false],[1,[20,["article","endPage"]],false],[1,[25,"t",["untranslated.comma"],null],false],[0,"\\n"]],"parameters":[]}],[0,"        "]],"parameters":[]},null],[1,[20,["issue","year"]],false],[1,[25,"t",["untranslated.period"],null],false],[0,"\\n"]],"parameters":[]}],[0,"    "],[8],[0,"\\n  "],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/content-preview-box/template.hbs" } }) }), define("browzine-web/components/copy-link-to-article-modal/component", ["exports", "browzine-web/mixins/trigger-on-enter"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, {
        classNames: ["copy-link-to-article-modal"], clipboard: Ember.inject.service(), init: function () {
            var e = this
            this._super.apply(this, arguments)
            var t = this.get("modal")
            Ember.run.next(function () { t.element = e.element, t.element.id = e.element.id }), t.ok = function () { e.ok() }
        }, actions: {
            ok: function () { this.get("modal").hide() }, copyToClipboard: function () {
                var e = this.get("clipboard"), t = this.get("article.browzineWebInContextLink"), n = this.$(".article-in-context-link")[0]
                e.copy(t, n), this.send("ok")
            }
        }
    })
}), define("browzine-web/components/copy-link-to-article-modal/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "8eKSfTYF", block: '{"symbols":[],"statements":[[4,"bz-modal",null,[["modal"],[[20,["modal"]]]],{"statements":[[0,"  "],[6,"div"],[9,"class","bz-modal-title"],[7],[0,"\\n    "],[1,[25,"t",["journal.article.social_share_menu.copy"],null],false],[0,"\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"class","bz-modal-content"],[7],[0,"\\n    "],[6,"textarea"],[9,"readonly",""],[9,"class","article-in-context-link"],[10,"aria-label",[25,"t",["journal.article.social_share_menu.copy"],null],null],[9,"rows","5"],[10,"value",[20,["article","browzineWebInContextLink"]],null],[7],[8],[0,"\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"class","bz-modal-footer"],[7],[0,"\\n    "],[6,"span"],[9,"tabindex","0"],[9,"class","button primary tabindex"],[10,"onclick",[25,"action",[[19,0,[]],"copyToClipboard"],null],null],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","copyToClipboard"],null],null],[7],[0,"\\n      "],[1,[25,"t",["settings.copy_to_clipboard_button"],null],false],[0,"\\n    "],[8],[0,"\\n\\n    "],[6,"span"],[9,"tabindex","0"],[9,"class","button secondary tabindex"],[10,"onclick",[25,"action",[[19,0,[]],"ok"],null],null],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","ok"],null],null],[7],[0,"\\n      "],[1,[25,"t",["settings.close_button"],null],false],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/copy-link-to-article-modal/template.hbs" } }) }), define("browzine-web/components/editable-element/component", ["exports", "browzine-web/mixins/trigger-on-enter"], function (e, t) {
    function n(e) {
        return function () {
            var t = e.apply(this, arguments)
            return new Promise(function (e, n) {
                return function r(i, a) {
                    try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                    e(o)
                }("next")
            })
        }
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, {
        classNames: ["editable-element"], editing: !1, newValue: Ember.computed.oneWay("value"), getInputWhenVisible: function () {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
            return new Ember.RSVP.Promise(function (r, i) {
                Ember.run.next(n(regeneratorRuntime.mark(function a() {
                    var s
                    return regeneratorRuntime.wrap(function (a) {
                        for (; ;)switch (a.prev = a.next) {
                            case 0: if (!(s = e.$("input"))) {
                                a.next = 3
                                break
                            } return a.abrupt("return", r(s))
                            case 3: if (!(t >= 5)) {
                                a.next = 5
                                break
                            } return a.abrupt("return", i(new Error("Gave up waiting for input element to appear, could not set focus")))
                            case 5: Ember.run.later(n(regeneratorRuntime.mark(function n() {
                                var a
                                return regeneratorRuntime.wrap(function (n) {
                                    for (; ;)switch (n.prev = n.next) {
                                        case 0: return n.prev = 0, n.next = 3, e.getInputWhenVisible(t++)
                                        case 3: return a = n.sent, n.abrupt("return", r(a))
                                        case 7: return n.prev = 7, n.t0 = n.catch(0), n.abrupt("return", i(n.t0))
                                        case 10: case "end": return n.stop()
                                    }
                                }, n, e, [[0, 7]])
                            })), 50)
                            case 6: case "end": return a.stop()
                        }
                    }, a, e)
                })))
            })
        }, actions: {
            edit: function () {
                var e = this, t = this
                this.get("editable") && (this.set("editing", !0), Ember.run.next(n(regeneratorRuntime.mark(function n() {
                    return regeneratorRuntime.wrap(function (e) {
                        for (; ;)switch (e.prev = e.next) {
                            case 0: return e.prev = 0, e.next = 3, t.getInputWhenVisible()
                            case 3: e.sent.focus(), e.next = 10
                                break
                            case 7: e.prev = 7, e.t0 = e.catch(0), console.log(e.t0.stack)
                            case 10: case "end": return e.stop()
                        }
                    }, n, e, [[0, 7]])
                }))))
            }, save: function () { this.set("editing", !1), this.attrs.save(this.get("newValue")) }, cancel: function () { this.set("editing", !1) }
        }
    })
}), define("browzine-web/components/editable-element/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "OI4bsR4W", block: '{"symbols":["&default"],"statements":[[4,"if",[[25,"and",[[20,["editable"]],[20,["editing"]]],null]],null,{"statements":[[0,"  "],[1,[25,"input",null,[["value","aria-label","maxlength","size","escape-press","key-up"],[[20,["newValue"]],[20,["label"]],[20,["max-length"]],[20,["max-length"]],[25,"action",[[19,0,[]],"cancel"],null],[25,"action",[[19,0,[]],"triggerOnEnter","save"],null]]]],false],[0,"\\n"],[4,"if",[[20,["editable"]]],null,{"statements":[[0,"    "],[6,"button"],[9,"class","icon flaticon solid checkmark-1 save"],[10,"onclick",[25,"action",[[19,0,[]],"save"],null],null],[10,"title",[26,[[25,"t",["editable_element.save_button_title"],[["label"],[[20,["label"]]]]]]]],[7],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n  "],[6,"button"],[9,"class","icon flaticon solid x-1 cancel"],[10,"onclick",[25,"action",[[19,0,[]],"cancel"],null],null],[10,"title",[26,[[25,"t",["editable_element.cancel_button_title"],[["label"],[[20,["label"]]]]]]]],[7],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"  "],[6,"div"],[10,"onclick",[25,"action",[[19,0,[]],"edit"],null],null],[7],[11,1],[8],[0,"\\n"],[4,"if",[[20,["editable"]]],null,{"statements":[[0,"    "],[6,"button"],[10,"class",[26,["icon flaticon solid pencil edit ",[25,"if",[[20,["editBookcase"]],"show-edit-icon"],null]]]],[10,"onclick",[25,"action",[[19,0,[]],"edit"],null],null],[10,"title",[26,[[25,"t",["editable_element.edit_button_title"],[["label"],[[20,["label"]]]]]]]],[7],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]}]],"hasEval":false}', meta: { moduleName: "browzine-web/components/editable-element/template.hbs" } }) }), define("browzine-web/components/ember-collection", ["exports", "ember-collection/components/ember-collection"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/ember-native-scrollable", ["exports", "ember-collection/components/ember-native-scrollable"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/error-screen/component", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({
        errorReporter: Ember.inject.service(), didInsertElement: function () {
            var e = this.get("error")
            this.get("errorReporter").reportUnknownError("hitFailBook", e)
        }, actions: { retry: function () { this.sendAction("retry") } }
    })
}), define("browzine-web/components/error-screen/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "+6H3hNb7", block: '{"symbols":[],"statements":[[4,"splash-panel",null,[["forceDesktopHeader"],[true]],{"statements":[[0,"  "],[6,"div"],[9,"class","error-screen"],[7],[0,"\\n    "],[6,"img"],[9,"src","//browzine-app.thirdiron.com/images/bz_question_mark-fdd992c72b9bc01a06fb6d01a19d52ce.png"],[10,"alt",[26,[[25,"t",["error_screen.question_mark"],null]]]],[7],[8],[0,"\\n\\n    "],[6,"div"],[9,"tabindex","0"],[9,"class","message"],[7],[0,"\\n      "],[6,"p"],[7],[1,[25,"t",["error_screen.error_message_p_1"],null],false],[8],[0,"\\n      "],[6,"p"],[7],[1,[25,"t",["error_screen.error_message_p_2"],null],false],[8],[0,"\\n    "],[8],[0,"\\n\\n    "],[6,"button"],[9,"class","button primary"],[3,"action",[[19,0,[]],"retry"]],[7],[1,[25,"t",["error_screen.try_again_button_text"],null],false],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/error-screen/template.hbs" } }) }), define("browzine-web/components/export-button/component", ["exports", "browzine-web/mixins/trigger-on-enter"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, { exporters: Ember.inject.service(), actions: { hide: function () { this.set("show", !1) }, toggle: function () { this.set("show", !this.get("show")) } } }) }), define("browzine-web/components/export-button/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "4xpxENxe", block: '{"symbols":[],"statements":[[6,"div"],[10,"class",[26,["button invisible ",[25,"if",[[20,["show"]],"darken"],null]," ",[18,"specificity"]]]],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","toggle"],null],null],[3,"action",[[19,0,[]],"toggle"],[["bubbles"],[false]]],[7],[0,"\\n  "],[6,"a"],[9,"tabindex","0"],[9,"class","tabindex tooltip"],[10,"aria-label",[26,[[18,"text"]]]],[7],[0,"\\n    "],[6,"span"],[10,"class",[26,["icon ",[18,"icon-type"]]]],[9,"aria-hidden","true"],[7],[8],[0,"\\n    "],[6,"span"],[9,"class","aria-hidden"],[7],[1,[18,"text"],false],[0," - "],[1,[20,["article","title"]],false],[8],[0,"\\n  "],[8],[0,"\\n"],[8],[0,"\\n"],[4,"if",[[20,["show"]]],null,{"statements":[[0,"  "],[1,[25,"service-list",null,[["hide","services","article","library","specificity","copyLinkToArticleModal"],[[25,"action",[[19,0,[]],"hide"],null],[20,["services"]],[20,["article"]],[20,["library"]],[20,["specificity"]],[20,["copyLinkToArticleModal"]]]]],false],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/export-button/template.hbs" } }) }), define("browzine-web/components/flash-message", ["exports", "ember-cli-flash/components/flash-message"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/focusable-input/component", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.TextField.extend({ autofocus: Ember.computed("autofocusIfAvailable", "autofocusAvailable", function () { return this.get("autofocusAvailable") && this.get("autofocusIfAvailable") }), autofocusIfAvailable: !0, autofocusAvailable: Ember.computed("media.isMobile", "media.isTablet", "media.isDesktop", "media.isJumbo", function () { return this.get("media.isDesktop") || this.get("media.isJumbo") }), becomeFocused: function () { this.get("autofocus") && this.$().focus() }.on("didInsertElement") }) }), define("browzine-web/components/help-link/component", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({
        tagName: "span", errorReporter: Ember.inject.service(), label: "Visit Third Iron Support", icon: "", didInsertElement: function () {
            var e = this.get("errorDetails")
            e && this.get("errorReporter").reportHelpError(e)
        }, linkTrackingSelector: Ember.computed(function () { return "#" + this.elementId + " > a" }), currentUrl: Ember.computed(function () { return window.location.href })
    })
})
define("browzine-web/components/help-link/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "9FTzJCxE", block: '{"symbols":[],"statements":[[4,"track-clicks",null,[["trackedElement","category","action"],[".help_widget_launcher","Help_Displayed",[20,["currentUrl"]]]],{"statements":[[0,"  "],[6,"a"],[9,"tabindex","0"],[9,"href","http://support.thirdiron.com/"],[9,"class","help_widget_launcher"],[9,"target","_blank"],[10,"title",[25,"t",["library.header.support"],null],null],[7],[0,"\\n"],[4,"if",[[20,["icon"]]],null,{"statements":[[0,"      "],[6,"span"],[10,"class",[26,["icon flaticon solid ",[18,"icon"]]]],[7],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n    "],[6,"span"],[9,"class","text"],[7],[1,[18,"label"],false],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/help-link/template.hbs" } }) }), define("browzine-web/components/hint-toggle/component", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({ active: !1, init: function () { this._super.apply(this, arguments) }, actions: { toggle: function () { this.set("active", !this.get("active")) } } }) }), define("browzine-web/components/hint-toggle/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "eedKq7Pr", block: '{"symbols":["&default"],"statements":[[6,"div"],[10,"class",[26,["hint-toggle ",[25,"if",[[20,["active"]],"active"],null]]]],[7],[0,"\\n  "],[6,"a"],[9,"class","hint-toggle-button"],[3,"action",[[19,0,[]],"toggle"]],[7],[0,"\\n    "],[6,"span"],[9,"class","icon fa fa-question-circle"],[7],[8],[0,"\\n    "],[1,[25,"if",[[20,["active"]],"Hide","Show"],null],false],[0,"\\n    "],[1,[18,"hint"],false],[0,"\\n  "],[8],[0,"\\n\\n  "],[11,1],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/hint-toggle/template.hbs" } }) }), define("browzine-web/components/infinite-scroller", ["exports", "@zestia/ember-simple-infinite-scroller/components/infinite-scroller"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/intro-screen/component", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({ errorReporter: Ember.inject.service(), classNames: ["intro-screen"], actions: { selectOpenAccessLibrary: function () { this.sendAction("selectOpenAccessLibrary") } } }) }), define("browzine-web/components/intro-screen/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "Vsp91PkB", block: '{"symbols":[],"statements":[[6,"section"],[10,"aria-label",[26,[[25,"t",["welcome_page.intro_to_browzine"],null]]]],[7],[0,"\\n  "],[1,[18,"browzine-logo"],false],[0,"\\n\\n  "],[6,"h1"],[9,"tabindex","0"],[7],[1,[25,"t",["welcome_page.welcome_to_browzine"],null],false],[8],[0,"\\n\\n  "],[6,"div"],[9,"class","intro-links"],[7],[0,"\\n    "],[4,"link-to",["libraries"],[["class","tabindex"],["button primary","0"]],{"statements":[[1,[25,"t",["welcome_page.choose_my_library"],null],false]],"parameters":[]},null],[0,"\\n\\n    "],[6,"div"],[9,"tabindex","0"],[7],[1,[25,"t",["welcome_page.or"],null],false],[8],[0,"\\n\\n    "],[6,"a"],[9,"tabindex","0"],[10,"aria-label",[26,[[25,"t",["welcome_page.use_open_access_library"],null]]]],[9,"href","#"],[9,"class","use-open-access-library"],[3,"action",[[19,0,[]],"selectOpenAccessLibrary"]],[7],[1,[25,"t",["welcome_page.use_open_access_library"],null],false],[8],[0,"\\n\\n    "],[6,"p"],[9,"tabindex","0"],[9,"class","bring-bz-to-your-library"],[10,"aria-label",[26,[[25,"t",["welcome_page.bring_bz_to_your_library_aria_label"],null]]]],[7],[0,"\\n      "],[1,[25,"t",["welcome_page.bring_bz_to_your_library_1"],null],false],[6,"br"],[7],[8],[0,"\\n      "],[1,[25,"t",["welcome_page.bring_bz_to_your_library_2"],[["htmlSafe"],[true]]],false],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/intro-screen/template.hbs" } }) }), define("browzine-web/components/journal-content-navigation/component", ["exports", "browzine-web/mixins/trigger-on-enter"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, {
        a11y: Ember.inject.service(), intl: Ember.inject.service(), init: function () { this.set("year", this.get("issueNavigationState.selectedYear")), this.set("currentIssueId", this.get("currentlyDisplayedContent.id")), this._super.apply(this, arguments) }, year: void 0, currentIssueId: null, modelYearObserver: Ember.observer("issueNavigationState.selectedYear", function () { this.set("year", this.get("issueNavigationState.selectedYear")) }), issueYearObserver: Ember.observer("currentlyDisplayedContent.year", function () {
            var e = this.get("currentIssueId"), t = this.get("currentlyDisplayedContent.id")
            e !== t ? this.set("currentIssueId", t) : this.set("year", this.get("currentlyDisplayedContent.year"))
        }), issues: Ember.computed("journal.issues.[]", "year", function () {
            var e = this.get("year")
            return (this.get("journal.issues") || []).filterBy("year", e).filterBy("title")
        }), articlesInPressSelected: Ember.computed("currentlyDisplayedContent", function () { return !!this.get("currentlyDisplayedContent.articlesInPress") }), selectedIssueId: Ember.computed("currentlyDisplayedContent", function () { if (this.get("currentlyDisplayedContent.articlesInPress")) { return 0 } return this.get("currentlyDisplayedContent.id") }), articlesInPressTitle: Ember.computed("intl.primaryLocale", function () { return this.get("intl").t("journal.articles_in_press.link") }), actions: {
            setYear: function (e) {
                var t = this.get("a11y")
                if (this.set("year", e), !this.get("media.isMobile") && !this.get("media.isTablet")) {
                    var n = this.get("issues").get("firstObject")
                    this.get("router").transitionTo("library.journal.issue", n), t.issueNavFocus()
                }
            }, enableFocus: function () { this.set("focusDisabled", !1) }, disableFocus: function () { this.set("focusDisabled", !0) }
        }
    })
}), define("browzine-web/components/journal-content-navigation/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "Ra6ICKqH", block: '{"symbols":["backIssue","publicationYear","backIssue","publicationYear"],"statements":[[4,"if",[[20,["journal","articlesInPress"]]],null,{"statements":[[6,"section"],[9,"class","articles-in-press issues"],[10,"aria-label",[25,"t",["journal.articles_in_press.header"],null],null],[7],[0,"\\n  "],[6,"div"],[9,"class","header-container"],[7],[0,"\\n    "],[6,"header"],[9,"tabindex","0"],[7],[1,[25,"t",["journal.articles_in_press.header"],null],false],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[1,[25,"back-issue-item",null,[["title","route","articlesInPress","journal","issue","locked","active","journalIsOnMyBookshelf"],[[20,["articlesInPressTitle"]],"library.journal.articles-in-press",true,[20,["journal"]],[20,["journal","id"]],[25,"or",[[20,["journal","accessedThroughAggregator"]],[25,"not",[[25,"not",[[20,["journal","embargoDescription"]]],null]],null]],null],[25,"eq",[[20,["articlesInPressSelected"]],true],null],[20,["journalIsOnMyBookshelf"]]]]],false],[0,"\\n"],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"or",[[20,["media","isDesktop"]],[20,["media","isJumbo"]]],null]],null,{"statements":[[0,"  "],[6,"section"],[10,"class",[26,["back-issues ",[25,"if",[[20,["showYears"]],"years","issues"],null]," ",[25,"if",[[20,["focusDisabled"]],"focus-disabled"],null]]]],[10,"aria-label",[25,"t",["journal.issues.header"],null],null],[10,"onmousemove",[25,"action",[[19,0,[]],"disableFocus"],null],null],[10,"onkeydown",[25,"action",[[19,0,[]],"enableFocus"],null],null],[7],[0,"\\n    "],[6,"div"],[9,"class","header-container"],[7],[0,"\\n      "],[6,"header"],[9,"tabindex","0"],[7],[1,[25,"t",["journal.issues.header"],null],false],[8],[0,"\\n    "],[8],[0,"\\n    "],[6,"div"],[9,"class","back-issue-navigation"],[7],[0,"\\n      "],[6,"div"],[9,"class","years"],[7],[0,"\\n"],[4,"each",[[20,["journal","publicationYears"]]],null,{"statements":[[0,"          "],[6,"div"],[9,"tabindex","0"],[10,"class",[26,["year ",[25,"if",[[25,"and",[[25,"eq",[[20,["year"]],[19,4,["id"]]],null],[25,"not",[[20,["articlesInPressSelected"]]],null]],null],"selected"],null]," tabindex"]]],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","setYear",[19,4,["id"]]],null],null],[3,"action",[[19,0,[]],"setYear",[19,4,["id"]]]],[7],[0,"\\n            "],[1,[19,4,["id"]],false],[0,"\\n            "],[6,"span"],[9,"class","icon arrow flaticon solid right-2"],[7],[8],[0,"\\n          "],[8],[0,"\\n"]],"parameters":[4]},null],[4,"if",[[20,["journal","externalSearchLocation"]]],null,{"statements":[[4,"track-clicks",null,[["trackedElement","category","action","label","value"],[".all-back-issues-link","ViewAllBackIssues",[20,["journal","id"]],[20,["journal","title"]],[20,["year"]]]],{"statements":[[0,"            "],[6,"a"],[10,"href",[26,[[20,["journal","externalSearchLocation"]]]]],[9,"class","all-back-issues-link"],[9,"target","_blank"],[7],[0,"\\n"],[4,"if",[[20,["journal","externalSearchLinkMessage"]]],null,{"statements":[[0,"                "],[1,[20,["journal","externalSearchLinkMessage"]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                "],[1,[25,"t",["journal.issues.extended"],null],false],[0,"\\n"]],"parameters":[]}],[0,"              "],[6,"span"],[9,"class","icon fa fa-external-link"],[7],[8],[0,"\\n            "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"      "],[8],[0,"\\n      "],[6,"div"],[9,"class","back-issue-items"],[7],[0,"\\n"],[4,"each",[[20,["issues"]]],null,{"statements":[[0,"          "],[1,[25,"back-issue-item",null,[["title","route","issue","locked","active","journalIsOnMyBookshelf"],[[19,3,["shortTitle"]],"library.journal.issue",[19,3,[]],[25,"or",[[19,3,["embargoed"]],[25,"and",[[25,"not-eq",[[19,3,["withinSubscription"]],[24]],null],[25,"not",[[19,3,["withinSubscription"]]],null]],null]],null],[25,"and",[[25,"not",[[20,["articlesInPressSelected"]]],null],[25,"eq",[[19,3,["id"]],[20,["selectedIssueId"]]],null]],null],[20,["journalIsOnMyBookshelf"]]]]],false],[0,"\\n"]],"parameters":[3]},null],[0,"      "],[8],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"  "],[6,"section"],[9,"class","years"],[10,"aria-label",[26,[[25,"t",["journal.publication_years"],null]]]],[7],[0,"\\n    "],[6,"ul"],[7],[0,"\\n"],[4,"each",[[20,["journal","publicationYears"]]],null,{"statements":[[0,"        "],[6,"li"],[10,"class",[26,["year ",[25,"if",[[25,"eq",[[20,["year"]],[19,2,["id"]]],null],"selected"],null]," tabindex"]]],[9,"tabindex","0"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","setYear",[19,2,["id"]]],null],null],[3,"action",[[19,0,[]],"setYear",[19,2,["id"]]]],[7],[1,[19,2,["id"]],false],[8],[0,"\\n"]],"parameters":[2]},null],[0,"\\n"],[4,"if",[[20,["journal","externalSearchLocation"]]],null,{"statements":[[4,"track-clicks",null,[["class","trackedElement","category","action","label","value"],["all-issues",".all-back-issues-link","ViewAllBackIssues",[20,["journal","id"]],[20,["journal","title"]],[20,["year"]]]],{"statements":[[0,"          "],[6,"li"],[9,"class","all-back-issues-link tabindex"],[9,"tabindex","0"],[7],[0,"\\n            "],[6,"a"],[10,"href",[26,[[20,["journal","externalSearchLocation"]]]]],[9,"target","_blank"],[7],[0,"\\n"],[4,"if",[[20,["journal","externalSearchLinkMessage"]]],null,{"statements":[[0,"                "],[1,[20,["journal","externalSearchLinkMessage"]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                "],[1,[25,"t",["journal.issues.extended"],null],false],[0,"\\n"]],"parameters":[]}],[0,"              "],[6,"span"],[9,"class","icon fa fa-external-link"],[7],[8],[0,"\\n            "],[8],[0,"\\n          "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"    "],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"section"],[9,"class","back-issues issues"],[10,"aria-label",[26,[[25,"t",["journal.journal_issues"],null]]]],[7],[0,"\\n"],[4,"each",[[20,["issues"]]],null,{"statements":[[0,"      "],[1,[25,"back-issue-item",null,[["title","route","issue","active","locked","journalIsOnMyBookshelf"],[[19,1,["title"]],"library.journal.issue",[19,1,[]],[25,"and",[[25,"not",[[20,["articlesInPressSelected"]]],null],[25,"eq",[[19,1,["id"]],[20,["selectedIssueId"]]],null]],null],[25,"or",[[19,1,["embargoed"]],[25,"and",[[25,"not-eq",[[19,1,["withinSubscription"]],[24]],null],[25,"not",[[19,1,["withinSubscription"]]],null]],null]],null],[20,["journalIsOnMyBookshelf"]]]]],false],[0,"\\n"]],"parameters":[1]},null],[0,"  "],[8],[0,"\\n"]],"parameters":[]}]],"hasEval":false}', meta: { moduleName: "browzine-web/components/journal-content-navigation/template.hbs" } }) }), define("browzine-web/components/journal-cover/component", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({ classNames: ["journal-cover"] }) }), define("browzine-web/components/journal-cover/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "qkvCVPfQ", block: '{"symbols":["&default"],"statements":[[6,"div"],[9,"class","image-container"],[7],[0,"\\n"],[4,"if",[[20,["eventCategory"]]],null,{"statements":[[4,"track-clicks",null,[["trackedElement","category","action","label","value"],[".journal-cover-image",[20,["eventCategory"]],"Cover_Tapped",[20,["journal","title"]],[20,["journal","id"]]]],{"statements":[[0,"      "],[6,"img"],[9,"class","journal-cover-image"],[10,"src",[26,[[20,["journal","coverURL"]]]]],[10,"alt",[26,[[25,"t",["journal_cover_image_alt_text"],[["journalTitle"],[[20,["journal","title"]]]]]]]],[10,"title",[26,[[20,["journal","title"]]]]],[7],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},{"statements":[[0,"    "],[6,"img"],[10,"src",[26,[[20,["journal","coverURL"]]]]],[10,"alt",[26,[[25,"t",["journal_cover_image_alt_text"],[["journalTitle"],[[20,["journal","title"]]]]]]]],[10,"title",[26,[[20,["journal","title"]]]]],[7],[8],[0,"\\n"]],"parameters":[]}],[0,"  "],[11,1],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/journal-cover/template.hbs" } }) }), define("browzine-web/components/journal-sort-controls/component", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({
        classNames: ["sort-options-container"], attributeBindings: ["style"], intl: Ember.inject.service(), style: Ember.computed("containerWidth", function () {
            var e = this.get("containerWidth") - 5 - 55, t = e - 150 * Math.floor(e / 150) + 20 + 5
            return new Ember.String.htmlSafe("margin-right: " + t + "px")
        }), isActiveObserver: Ember.observer("isActive", function () {
            var e = this.get("isActive")
            e || Ember.$(".sort-control").bind("click", function (e) { return e.preventDefault(), !1 }), e && Ember.run.later(this, function () { this.get("isActive") && Ember.$(".sort-control").unbind("click") }, 1e3)
        }), sortAToZTitle: Ember.computed("intl.primaryLocale", function () { return this.get("intl").t("subjects.menu.sort.desktop.aToZ") }), sortScimagoRankTitle: Ember.computed("intl.primaryLocale", function () { return this.get("intl").t("subjects.menu.sort.desktop.journal_rank") }), didInsertElement: function () { this._resizeHandler = function () { this.set("containerWidth", this.$().parent().width()) }.bind(this), Ember.$(window).on("resize", this._resizeHandler), this._resizeHandler() }, willDestroyElement: function () { Ember.$(window).off("resize", this._resizeHandler), Ember.$(".sort-control").unbind("click") }
    })
}), define("browzine-web/components/journal-sort-controls/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "2howuGf0", block: '{"symbols":[],"statements":[[6,"div"],[9,"class","sort-options"],[7],[0,"\\n"],[4,"if",[[25,"not",[[20,["isActive"]]],null]],null,{"statements":[[0,"    "],[6,"div"],[9,"class","inline"],[7],[0,"\\n      "],[1,[25,"loading-indicator",null,[["alignment"],["center"]]],false],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n  "],[6,"span"],[10,"class",[26,[[25,"if",[[25,"eq",[[20,["sort"]],"title"],null],"active"],null]]]],[7],[0,"\\n"],[4,"link-to",[[25,"query-params",null,[["sort"],["title"]]]],[["class","aria-label"],["sort-control sort-by-title hide-underline",[20,["sortAToZTitle"]]]],{"statements":[[0,"      "],[1,[25,"t",["subjects.menu.sort.desktop.header"],null],false],[0," "],[6,"span"],[9,"class","show-underline"],[7],[1,[25,"t",["subjects.menu.sort.desktop.aToZ"],null],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"  "],[8],[0,"\\n  /\\n  "],[6,"span"],[10,"class",[26,[[25,"if",[[25,"eq",[[20,["sort"]],"rank"],null],"active"],null]]]],[7],[0,"\\n"],[4,"link-to",[[25,"query-params",null,[["sort"],["rank"]]]],[["class","aria-label"],["sort-control sort-by-scimago",[20,["sortScimagoRankTitle"]]]],{"statements":[[0,"      "],[1,[25,"t",["subjects.menu.sort.desktop.journal_rank"],null],false],[0,"\\n"]],"parameters":[]},null],[0,"  "],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/journal-sort-controls/template.hbs" } }) }), define("browzine-web/components/language-chooser-modal/component", ["exports", "browzine-web/mixins/trigger-on-enter"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, {
        classNames: ["language-chooser-modal"], intl: Ember.inject.service(), init: function () {
            var e = this
            this._super.apply(this, arguments)
            var t = this.get("modal")
            Ember.run.next(function () { e.element && (t.element = e.element, t.element.id = e.element.id) }), t.ok = function () { e.ok() }, t.cancel = function () { e.cancel() }
        }, didReceiveAttrs: function () {
            var e = this
            this.get("modal").onShow = function () { Ember.run.next(function () { e.$("ul.languages li:first-child").focus() }) }
        }, actions: { ok: function () { this.get("modal").hide() }, selectLanguage: function (e) { this.get("selectLanguage")(e), this.send("ok") } }
    })
}), define("browzine-web/components/language-chooser-modal/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "/WEck94X", block: '{"symbols":["language"],"statements":[[4,"bz-modal",null,[["modal"],[[20,["modal"]]]],{"statements":[[0,"  "],[6,"div"],[9,"class","bz-modal-title"],[7],[0,"\\n    "],[1,[25,"t",["library.language_chooser.header"],null],false],[0,"\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"class","bz-modal-content"],[7],[0,"\\n    "],[6,"ul"],[9,"class","languages"],[7],[0,"\\n"],[4,"each",[[20,["languages"]]],null,{"statements":[[4,"if",[[25,"eq",[[19,1,[]],"fr-fr"],null]],null,{"statements":[[0,"          "],[6,"li"],[9,"tabindex","0"],[9,"class","language"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","selectLanguage",[19,1,[]]],null],null],[3,"action",[[19,0,[]],"selectLanguage",[19,1,[]]]],[7],[0,"\\n            "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["library.language_chooser.french"],null],false],[8],[0,"\\n          "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[25,"eq",[[19,1,[]],"ja"],null]],null,{"statements":[[0,"          "],[6,"li"],[9,"tabindex","0"],[9,"class","language"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","selectLanguage",[19,1,[]]],null],null],[3,"action",[[19,0,[]],"selectLanguage",[19,1,[]]]],[7],[0,"\\n            "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["library.language_chooser.japanese"],null],false],[8],[0,"\\n          "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"          "],[6,"li"],[9,"tabindex","0"],[9,"class","language"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","selectLanguage",[19,1,[]]],null],null],[3,"action",[[19,0,[]],"selectLanguage",[19,1,[]]]],[7],[0,"\\n            "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["library.language_chooser.english"],null],false],[8],[0,"\\n          "],[8],[0,"\\n        "]],"parameters":[]}]],"parameters":[]}]],"parameters":[1]},null],[0,"    "],[8],[0,"\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"class","bz-modal-footer"],[7],[0,"\\n    "],[6,"span"],[9,"tabindex","0"],[9,"class","button primary tabindex"],[10,"onclick",[25,"action",[[19,0,[]],"ok"],null],null],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","ok"],null],null],[7],[0,"\\n      "],[1,[25,"t",["settings.close_button"],null],false],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/language-chooser-modal/template.hbs" } }) }), define("browzine-web/components/language-chooser/component", ["exports", "browzine-web/mixins/trigger-on-enter"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, {
        intl: Ember.inject.service(), applicationSession: Ember.inject.service(), i18n: Ember.inject.service(), init: function () { this._super.apply(this, arguments), this.set("languageChooserModal", {}) }, languages: Ember.computed(function () { return this.get("library.languagesSupported").split(",") }), abbreviation: Ember.computed(function () {
            var e = this.get("intl.locale")
            return e ? e[0].slice(0, 2).toUpperCase() : "EN"
        }), actions: {
            chooseLanguage: function () { this.get("languageChooserModal").show(), this.get("closeMenu")() }, selectLanguage: function (e) {
                this.get("applicationSession").set("localeOverride", e), this.get("intl").setLocale(e)
                var t = e.slice(0, 2).toUpperCase()
                this.set("abbreviation", t), this.sendAction("refreshCurrentRoute")
            }
        }
    })
}), define("browzine-web/components/language-chooser/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "pYRNeDNm", block: '{"symbols":[],"statements":[[6,"div"],[9,"class","language-chooser"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","chooseLanguage"],null],null],[3,"action",[[19,0,[]],"chooseLanguage"]],[7],[0,"\\n  "],[6,"div"],[9,"class","locale"],[7],[0,"\\n    "],[6,"span"],[9,"class","fal fa-globe"],[7],[8],[0," "],[6,"span"],[9,"class","language"],[7],[1,[18,"abbreviation"],false],[8],[0,"\\n  "],[8],[0,"\\n"],[8],[0,"\\n\\n"],[1,[25,"language-chooser-modal",null,[["modal","library","languages","selectLanguage"],[[20,["languageChooserModal"]],[20,["library"]],[20,["languages"]],[25,"action",[[19,0,[]],"selectLanguage"],null]]]],false],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/language-chooser/template.hbs" } }) }), define("browzine-web/components/library-customization-settings/component", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({
        flashMessages: Ember.inject.service(), init: function () { this._super.apply(this, arguments) }, actions: {
            reset: function () { this.get("library").rollbackAttributes() }, save: function () {
                var e = this, t = this.get("library")
                t.get("hasDirtyAttributes") && t.save().then(function () { e.get("flashMessages").success("Library Saved") }).catch(function (t) { e.get("flashMessages").alert("Error Updating Library: " + t) })
            }
        }
    })
}), define("browzine-web/components/library-customization-settings/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "yOdepXZx", block: '{"symbols":[],"statements":[[6,"div"],[9,"class","customization-settings-container"],[7],[0,"\\n  "],[6,"div"],[7],[0,"\\n    "],[6,"label"],[7],[0,"\\n      "],[1,[25,"t",["customization_settings.library_name"],null],false],[0,"\\n      "],[1,[25,"input",null,[["class","type","value"],["library-name","text",[20,["library","name"]]]]],false],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"div"],[7],[0,"\\n    "],[6,"label"],[7],[0,"\\n      "],[1,[25,"t",["customization_settings.native_app_info_url"],null],false],[0,"\\n      "],[1,[25,"input",null,[["class","type","value"],["info-url","text",[20,["library","infoURL"]]]]],false],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"div"],[7],[0,"\\n    "],[6,"label"],[7],[0,"\\n      "],[1,[25,"t",["customization_settings.web_info_url"],null],false],[0,"\\n      "],[1,[25,"input",null,[["class","type","value"],["web-info-url","text",[20,["library","webInfoURL"]]]]],false],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"div"],[7],[0,"\\n    "],[6,"label"],[7],[0,"\\n      "],[1,[25,"t",["customization_settings.access_provided_by_label"],null],false],[0,"\\n      "],[1,[25,"input",null,[["class","type","value"],["access-provided-by-label","text",[20,["library","accessProvidedByLabel"]]]]],false],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"div"],[7],[0,"\\n    "],[6,"label"],[7],[0,"\\n      "],[1,[25,"t",["customization_settings.access_provided_by_link"],null],false],[0,"\\n      "],[1,[25,"input",null,[["class","type","value"],["access-provided-by-link","text",[20,["library","accessProvidedByLink"]]]]],false],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"div"],[7],[0,"\\n    "],[6,"label"],[7],[0,"\\n      "],[1,[25,"t",["customization_settings.promo_label"],null],false],[0,"\\n      "],[1,[25,"input",null,[["class","type","value"],["promo-label","text",[20,["library","promoLabel"]]]]],false],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"div"],[7],[0,"\\n    "],[6,"label"],[7],[0,"\\n      "],[1,[25,"t",["customization_settings.promo_link"],null],false],[0,"\\n      "],[1,[25,"input",null,[["class","type","value"],["promo-link","text",[20,["library","promoLink"]]]]],false],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"h3"],[9,"tabindex","0"],[7],[1,[25,"t",["customization_settings.login_info.header"],null],false],[8],[0,"\\n  "],[6,"div"],[9,"class","row subsection"],[7],[0,"\\n    "],[6,"div"],[7],[0,"\\n      "],[6,"h4"],[9,"tabindex","0"],[7],[1,[25,"t",["customization_settings.login_info.native.header"],null],false],[8],[0,"\\n      "],[6,"div"],[7],[0,"\\n        "],[6,"label"],[7],[0,"\\n          "],[1,[25,"t",["customization_settings.login_info.native.title"],null],false],[0,"\\n          "],[1,[25,"input",null,[["class","type","value"],["native-login-info-title","text",[20,["library","nativeLoginInfoTitle"]]]]],false],[0,"\\n        "],[8],[0,"\\n      "],[8],[0,"\\n      "],[6,"div"],[7],[0,"\\n        "],[6,"label"],[7],[0,"\\n          "],[1,[25,"t",["customization_settings.login_info.native.description"],null],false],[0,"\\n          "],[1,[25,"input",null,[["class","type","value"],["native-login-info-description","text",[20,["library","nativeLoginInfoDescription"]]]]],false],[0,"\\n        "],[8],[0,"\\n      "],[8],[0,"\\n    "],[8],[0,"\\n\\n    "],[6,"div"],[7],[0,"\\n      "],[6,"h4"],[9,"tabindex","0"],[9,"class","mobile-margin-top"],[7],[1,[25,"t",["customization_settings.login_info.web.header"],null],false],[8],[0,"\\n      "],[6,"div"],[7],[0,"\\n        "],[6,"label"],[7],[0,"\\n          "],[1,[25,"t",["customization_settings.login_info.web.title"],null],false],[0,"\\n          "],[1,[25,"input",null,[["class","type","value"],["web-login-info-title","text",[20,["library","webLoginInfoTitle"]]]]],false],[0,"\\n        "],[8],[0,"\\n      "],[8],[0,"\\n      "],[6,"div"],[7],[0,"\\n        "],[6,"label"],[7],[0,"\\n          "],[1,[25,"t",["customization_settings.login_info.web.description"],null],false],[0,"\\n          "],[1,[25,"input",null,[["class","type","value"],["web-login-info-description","text",[20,["library","webLoginInfoDescription"]]]]],false],[0,"\\n        "],[8],[0,"\\n      "],[8],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"div"],[9,"class","buttons"],[7],[0,"\\n    "],[6,"a"],[9,"class","button reset-library"],[3,"action",[[19,0,[]],"reset"]],[7],[1,[25,"t",["settings.reset_button"],null],false],[8],[0,"\\n    "],[6,"a"],[9,"class","button update-library"],[3,"action",[[19,0,[]],"save"]],[7],[1,[25,"t",["settings.save_button"],null],false],[8],[0,"\\n  "],[8],[0,"\\n\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/library-customization-settings/template.hbs" } }) }), define("browzine-web/components/library-list-item/component", ["exports", "browzine-web/mixins/accordion-item", "browzine-web/mixins/trigger-on-enter"], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, n.default, {
        classNames: ["library-list-item"], tagName: "li", selecting: !1, classNameBindings: ["selecting"], shouldExpand: function () { return this.get("library.webLoginInfo") }, authenticateButtonLabel: Ember.computed("library.webLoginInfo.continueLabel", function () {
            var e = this.get("library.webLoginInfo.continueLabel")
            return Ember.isBlank(e) ? "Authenticate Library" : e
        }), isExpandedOrSelected: Ember.computed("isExpanded", "selected", function () { return this.get("isExpanded") || this.get("selected") && this.shouldExpand() }), click: function () { }, actions: { collapsedItemClicked: function () { this.shouldExpand() ? this.send("expand") : this.sendAction("viewLibrary", this.get("library")) }, viewLibrary: function (e) { this.sendAction("viewLibrary", e) } }
    })
}), define("browzine-web/components/library-list-item/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "vUCAixhP", block: '{"symbols":["&default"],"statements":[[4,"if",[[20,["isExpandedOrSelected"]]],null,{"statements":[[0,"  "],[6,"div"],[9,"class","library expanded"],[7],[0,"\\n    "],[6,"div"],[9,"class","section"],[7],[0,"\\n      "],[6,"div"],[7],[0,"\\n        "],[1,[25,"library-logo",null,[["library"],[[20,["library"]]]]],false],[0,"\\n"],[4,"unless",[[20,["library","logoHasLibraryName"]]],null,{"statements":[[0,"          "],[6,"span"],[9,"class","name"],[10,"title",[26,[[20,["library","name"]]]]],[7],[1,[20,["library","name"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"      "],[8],[0,"\\n      "],[6,"span"],[9,"class","action"],[7],[0,"\\n"],[4,"if",[[20,["selecting"]]],null,{"statements":[[0,"          "],[1,[18,"loading-indicator"],false],[0,"\\n"]],"parameters":[]},null],[0,"      "],[8],[0,"\\n    "],[8],[0,"\\n    "],[1,[25,"login-information",null,[["library","error"],[[20,["library"]],[20,["ipRangeError"]]]]],false],[0,"\\n    "],[6,"a"],[9,"tabindex","0"],[9,"href","#"],[9,"class","button primary"],[3,"action",[[19,0,[]],"viewLibrary",[20,["library"]]]],[7],[1,[18,"authenticateButtonLabel"],false],[8],[0,"\\n    "],[6,"span"],[9,"tabindex","0"],[9,"class","button js-contract tabindex"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","contract",false],null],null],[3,"action",[[19,0,[]],"contract",false]],[7],[1,[25,"t",["untranslated.cancel"],null],false],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"  "],[6,"div"],[9,"class","library collapsed"],[3,"action",[[19,0,[]],"collapsedItemClicked"]],[7],[0,"\\n    "],[6,"div"],[9,"class","collapsed section"],[7],[0,"\\n      "],[6,"span"],[9,"class","label"],[10,"title",[26,[[20,["library","name"]]]]],[7],[1,[20,["library","name"]],false],[8],[0,"\\n      "],[6,"span"],[9,"class","action"],[7],[0,"\\n"],[4,"if",[[20,["selecting"]]],null,{"statements":[[0,"          "],[1,[18,"loading-indicator"],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"          "],[1,[25,"t",["choose_library_page.click_to_authenticate"],null],false],[0,"\\n"]],"parameters":[]}],[0,"      "],[8],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]}],[11,1],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/library-list-item/template.hbs" } }) }), define("browzine-web/components/library-list/component", ["exports", "diacritics", "browzine-web/mixins/accordion-container", "ember-intl"], function (e, t, n, r) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(n.default, {
        classNames: ["library-list"], search: "", chooseLibrarySearchLibraryNames: (0, r.t)("choose_library_page.search_library_names"), filteredLibraries: function () {
            var e = this.get("libraries"), n = this.get("search")
            return Ember.isEmpty(n) ? e : (n = t.default.remove(n).toLowerCase(), e.filter(function (e) {
                var r = e.get("name") || ""
                return (r = t.default.remove(r).toLowerCase()).indexOf(n) > -1
            }))
        }.property("libraries", "search"), groupedLibraries: function () {
            var e = this.get("filteredLibraries"), n = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(function (n) { return Ember.Object.create({ name: n, libraries: e.filter(function (e) { return t.default.remove(e.get("name")[0]).toUpperCase() === n }) }) }), r = Ember.Object.create({ name: "0-9", libraries: e.filter(function (e) { return !0 === isFinite(t.default.remove(e.get("name")[0])) }) })
            return n.unshiftObject(r), n
        }.property("filteredLibraries"), focusSearchField: function () {
            var e = this
            Ember.$(".search-field input").on("click", function () { (e.get("media.isMobile") || e.get("media.isTablet")) && Ember.$("html, body").animate({ scrollTop: Ember.$(".search").offset().top }, 500) })
        }.on("didInsertElement"), actions: {
            itemExpanded: function (e) {
                var t = e.get("library")
                t.get("webLoginInfo") ? this.set("expandedItem", e) : this.sendAction("viewLibrary", t)
            }, viewLibrary: function (e) { this.sendAction("viewLibrary", e) }, gotoAnchor: function (e) { window.location.hash = "#" + e }
        }
    })
}), define("browzine-web/components/library-list/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "6mdaFm/n", block: '{"symbols":["group","library","group"],"statements":[[6,"main"],[7],[0,"\\n  "],[6,"div"],[9,"class","header-items"],[7],[0,"\\n    "],[6,"h1"],[9,"tabindex","0"],[9,"class","choose-library"],[7],[1,[25,"t",["choose_library_page.choose_library"],null],false],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"ul"],[9,"class","library-list"],[7],[0,"\\n    "],[6,"li"],[9,"class","search"],[7],[0,"\\n      "],[1,[25,"search-field",null,[["value","placeholder","title","autocomplete"],[[20,["search"]],[20,["chooseLibrarySearchLibraryNames"]],[20,["chooseLibrarySearchLibraryNames"]],[20,["chooseLibrarySearchLibraryNames"]]]]],false],[0,"\\n      "],[6,"div"],[9,"class","skip-links"],[7],[0,"\\n"],[4,"each",[[20,["groupedLibraries"]]],[["key"],["name"]],{"statements":[[0,"          "],[6,"a"],[10,"href",[26,["#",[19,3,["name"]]]]],[10,"aria-label",[26,[[25,"t",["untranslated.skip_to_library_group"],[["groupName"],[[19,3,["name"]]]]]]]],[3,"action",[[19,0,[]],"gotoAnchor",[19,3,["name"]]]],[7],[1,[19,3,["name"]],false],[8],[0,"\\n"]],"parameters":[3]},null],[0,"      "],[8],[0,"\\n    "],[8],[0,"\\n\\n"],[4,"each",[[20,["groupedLibraries"]]],[["key"],["name"]],{"statements":[[4,"if",[[19,1,["libraries"]]],null,{"statements":[[0,"        "],[6,"li"],[9,"tabindex","0"],[10,"id",[19,1,["name"]],null],[9,"class","group"],[10,"aria-label",[26,[[25,"t",["untranslated.library_group"],[["groupName"],[[19,1,["name"]]]]]]]],[7],[0,"\\n          "],[1,[19,1,["name"]],false],[0,"\\n        "],[8],[0,"\\n"],[4,"each",[[19,1,["libraries"]]],[["key"],["id"]],{"statements":[[4,"library-list-item",null,[["library","expandedItem","expanded","selecting","selected","viewLibrary","ipRangeError"],[[19,2,[]],[20,["expandedItem"]],"itemExpanded",[25,"eq",[[19,2,["id"]],[20,["selecting"]]],null],[25,"eq",[[19,2,["id"]],[20,["selectedLibrary"]]],null],"viewLibrary",[20,["ipRangeError"]]]],{"statements":[[0,"            "],[1,[25,"scroll-to",null,[["scrollTo","resultTopMargin"],[[25,"eq",[[19,2,["id"]],[20,["selectedLibrary"]]],null],0]]],false],[0,"\\n"]],"parameters":[]},null]],"parameters":[2]},null]],"parameters":[]},null]],"parameters":[1]},null],[0,"  "],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/library-list/template.hbs" } }) }), define("browzine-web/components/library-logo/component", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({ tagName: "", library: Ember.computed.alias("for") }) }), define("browzine-web/components/library-logo/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "j1qUpie+", block: '{"symbols":[],"statements":[[4,"if",[[20,["library","logo"]]],null,{"statements":[[0,"  "],[6,"img"],[10,"class",[26,["library-logo ",[25,"if",[[20,["library","logoHasLibraryName"]],"has-name"],null]]]],[10,"src",[26,[[20,["library","logo"]]]]],[10,"alt",[26,[[25,"t",["library.logo_for_library"],[["libraryName"],[[20,["library","name"]]]]]]]],[7],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/library-logo/template.hbs" } }) }), define("browzine-web/components/library-subject-header/component", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({ library: Ember.computed.alias("for") }) }), define("browzine-web/components/library-subject-header/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "z3aPtHDW", block: '{"symbols":[],"statements":[[6,"div"],[7],[0,"\\n  "],[6,"h3"],[9,"class","subjects-library-attribution"],[7],[1,[25,"t",["library.header.access_provided_by"],null],false],[8],[0,"\\n"],[4,"if",[[20,["library","webInfoURL"]]],null,{"statements":[[4,"track-clicks",null,[["trackedElement","category"],["#logo-provided-by-link","LogoProvidedByClicked"]],{"statements":[[0,"      "],[6,"a"],[9,"id","logo-provided-by-link"],[10,"href",[26,[[20,["library","webInfoURL"]]]]],[9,"target","_new"],[7],[0,"\\n"],[4,"if",[[20,["library","logo"]]],null,{"statements":[[0,"          "],[1,[25,"library-logo",null,[["for"],[[20,["library"]]]]],false],[0,"\\n"]],"parameters":[]},null],[4,"unless",[[20,["library","logoHasLibraryName"]]],null,{"statements":[[0,"          "],[6,"h1"],[9,"class","subjects-library-name"],[7],[1,[20,["library","name"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"      "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},{"statements":[[4,"if",[[20,["library","logo"]]],null,{"statements":[[0,"      "],[1,[25,"library-logo",null,[["for"],[[20,["library"]]]]],false],[0,"\\n"]],"parameters":[]},null],[4,"unless",[[20,["library","logoHasLibraryName"]]],null,{"statements":[[0,"      "],[6,"h1"],[9,"class","subjects-library-name"],[7],[1,[20,["library","name"]],false],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]}],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/library-subject-header/template.hbs" } }) }), define("browzine-web/components/line-clamp", ["exports", "ember-line-clamp/components/line-clamp"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/loading-indicator/component", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({ classNameBindings: ["inline", "white", "smaller"], alignment: "right" }) }), define("browzine-web/components/loading-indicator/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "hO43dml1", block: '{"symbols":[],"statements":[[6,"div"],[10,"class",[26,["spinner align-",[18,"alignment"]]]],[7],[0,"\\n  "],[6,"div"],[9,"class","bounce1"],[7],[8],[0,"\\n  "],[6,"div"],[9,"class","bounce2"],[7],[8],[0,"\\n  "],[6,"div"],[9,"class","bounce3"],[7],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/loading-indicator/template.hbs" } }) }), define("browzine-web/components/loading-screen/component", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({}) })
define("browzine-web/components/loading-screen/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "NKy/tnSz", block: '{"symbols":[],"statements":[[1,[18,"browzine-logo"],false],[0,"\\n\\n"],[6,"div"],[7],[0,"\\n  "],[1,[25,"t",["loading_screen.loading_message"],null],false],[0,"\\n  "],[1,[18,"loading-indicator"],false],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/loading-screen/template.hbs" } }) }), define("browzine-web/components/login-information/component", ["exports", "ember-intl"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({
        shouldDisplayVpnError: Ember.computed("error", "library", function () { return this.get("error") && this.get("library.id") === this.getWithDefault("error.libraryId", 0).toString() }), vpnErrorMessage: (0, t.intl)("error", function (e) { return e.t("login_info.vpn_error_message_2", { libraryName: this.get("library.name"), libraryId: this.get("library.id"), ipAddress: this.get("error.requestIp") }) }), authenticationInfoLinkLabel: (0, t.intl)("library.webLoginInfo.linkLabel", function (e) {
            var t = this.get("library.webLoginInfo.linkLabel")
            return Ember.isBlank(t) ? e.t("login_info.auth_info_link_default_text") : t
        })
    })
}), define("browzine-web/components/login-information/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "RegKoHBS", block: '{"symbols":[],"statements":[[6,"div"],[9,"class","vpn-card"],[7],[0,"\\n"],[4,"if",[[20,["library","webLoginInfo","title"]]],null,{"statements":[[0,"    "],[6,"p"],[9,"tabindex","0"],[9,"class","vpn-title"],[7],[1,[20,["library","webLoginInfo","title"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["shouldDisplayIp"]]],null,{"statements":[[0,"    "],[6,"p"],[9,"tabindex","0"],[9,"class","vpn-ip"],[7],[1,[25,"t",["login_info.your_ip_address"],null],false],[0," "],[6,"code"],[7],[1,[20,["error","requestIp"]],false],[8],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["library","webLoginInfo","description"]]],null,{"statements":[[0,"    "],[6,"p"],[9,"tabindex","0"],[9,"class","vpn-description"],[7],[1,[20,["library","webLoginInfo","description"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["library","webLoginInfo","url"]]],null,{"statements":[[0,"    "],[6,"a"],[9,"tabindex","0"],[10,"aria-label",[26,[[18,"authenticationInfoLinkLabel"]]]],[10,"href",[20,["library","webLoginInfo","url"]],null],[9,"class","vpn-link"],[9,"target","_blank"],[7],[1,[18,"authenticationInfoLinkLabel"],false],[8],[0,"\\n"]],"parameters":[]},null],[8],[0,"\\n"],[4,"if",[[20,["shouldDisplayVpnError"]]],null,{"statements":[[0,"  "],[6,"div"],[9,"class","vpn-error"],[7],[0,"\\n    "],[6,"p"],[9,"tabindex","0"],[7],[0,"\\n      "],[1,[25,"t",["login_info.vpn_error_message"],[["requestIp","libraryName","htmlSafe"],[[20,["error","requestIp"]],[20,["library","name"]],true]]],false],[0,"\\n    "],[8],[0,"\\n    "],[6,"p"],[7],[0,"\\n"],[4,"if",[[20,["library","webLoginInfo","url"]]],null,{"statements":[[0,"        "],[6,"p"],[9,"tabindex","0"],[9,"class","vpn-link"],[7],[0,"\\n          "],[1,[25,"t",["login_info.vpn_need_assistance_message"],[["webLoginInfoUrl","htmlSafe"],[[20,["library","webLoginInfo","url"]],true]]],false],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]},null],[0,"    "],[8],[0,"\\n\\n    "],[6,"p"],[7],[0,"\\n      "],[1,[25,"help-link",null,[["icon","errorDetails"],["help-2",[20,["vpnErrorMessage"]]]]],false],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/login-information/template.hbs" } }) }), define("browzine-web/components/move-target/component", ["exports", "browzine-web/mixins/click-on-enter"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, {
        tagName: "li", classNames: "move-target", classNameBindings: ["active", "inactive"], active: Ember.computed("journals", "following-journal", "preceding-journal", "moving-journal", function () {
            var e = this.get("journals"), t = this.get("following-journal"), n = this.get("preceding-journal"), r = this.get("moving-journal")
            if (n === r) return !1
            var i = e.indexOf(t), a = e.indexOf(r)
            return -1 === a || -1 === i || (a > i || a !== i && a !== i - 1)
        }), inactive: Ember.computed.not("active"), tabindex: Ember.computed("active", function () { return this.get("active") ? 0 : -1 }), click: function () { this.get("active") && this.attrs.move() }, hover: !1, resetHover: Ember.observer("moving-journal", function () { Ember.isEmpty(this, "moving-journal") && this.set("hover", !1) }), mouseEnter: function () { this.set("hover", !0) }, focusIn: function () { this.set("hover", !0) }, mouseLeave: function () { this.set("hover", !1) }, focusOut: function () { this.set("hover", !1) }
    })
}), define("browzine-web/components/move-target/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "TFVan1xF", block: '{"symbols":[],"statements":[[4,"if",[[25,"and",[[20,["hover"]],[25,"or",[[20,["media","isDesktop"]],[20,["media","isJumbo"]]],null]],null]],null,{"statements":[[0,"  "],[1,[25,"journal-cover",null,[["journal"],[[20,["moving-journal","journal"]]]]],false],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[6,"span"],[9,"class","icon flaticon solid down-4"],[7],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/move-target/template.hbs" } }) }), define("browzine-web/components/my-bookcase/component", ["exports", "ember-intl", "browzine-web/mixins/accordion-container"], function (e, t, n) {
    function r(e) {
        return function () {
            var t = e.apply(this, arguments)
            return new Promise(function (e, n) {
                return function r(i, a) {
                    try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                    e(o)
                }("next")
            })
        }
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(n.default, {
        analytics: Ember.inject.service(), myBookshelf: Ember.inject.service(), unreads: Ember.inject.service(), classNames: "my-bookcase", classNameBindings: ["move-in-progress"], bookshelfTitleEditableElementLabel: (0, t.t)("my_bookshelf.bookshelf_title_editable_element_label"), bookshelves: Ember.computed.alias("my-bookcase.bookshelves"), "move-in-progress": Ember.computed.notEmpty("movingJournal"), checkEditBookcase: Ember.observer("editBookcase", function () {
            var e = this.get("editBookcase"), t = this.get("movingJournal")
            !e && t && this.send("moveCancel")
        }), actions: {
            updateBookshelfTitle: function (e, t) { e.set("title", t), this.get("myBookshelf").save().catch(function () { }) }, deleteJournal: function () {
                var e = r(regeneratorRuntime.mark(function e(t, n) {
                    return regeneratorRuntime.wrap(function (e) {
                        for (; ;)switch (e.prev = e.next) {
                            case 0: return t.deleteJournal(n), e.next = 3, this.get("analytics").recordEvent({ category: "MyBookshelf", action: "Remove_Journal_from_MyBookshelf", label: n.get("journal.title"), value: n.get("journal.id") })
                            case 3: return e.next = 5, this.get("unreads").markIssuesReadByJournalId(n.get("journal.id"))
                            case 5: return e.abrupt("return", this.get("myBookshelf").save().catch(function () { }))
                            case 6: case "end": return e.stop()
                        }
                    }, e, this)
                }))
                return function (t, n) { return e.apply(this, arguments) }
            }(), moveJournalStart: function (e, t) {
                var n = this.get("movingJournal")
                n && n.set("isMoving", !1), this.set("movingJournal", t), this.set("movingBookshelf", e), t.set("isMoving", !0)
            }, moveJournalEnd: function () {
                var e = r(regeneratorRuntime.mark(function e(t, n) {
                    var r
                    return regeneratorRuntime.wrap(function (e) {
                        for (; ;)switch (e.prev = e.next) {
                            case 0: if (!t.get("isFull")) {
                                e.next = 2
                                break
                            } return e.abrupt("return")
                            case 2: return r = this.get("movingJournal"), this.get("movingBookshelf").deleteJournal(r), t.addJournal(r, n), r.set("isMoving", !1), this.set("movingJournal", void 0), this.set("movingBookshelf", void 0), e.next = 11, this.get("analytics").recordEvent({ category: "MyBookshelf", action: "Moved_Journal_in_MyBookshelf", label: r.get("journal.title"), value: r.get("journal.id") })
                            case 11: return e.abrupt("return", this.get("myBookshelf").save())
                            case 12: case "end": return e.stop()
                        }
                    }, e, this)
                }))
                return function (t, n) { return e.apply(this, arguments) }
            }(), moveCancel: function () { this.get("movingJournal").set("isMoving", !1), this.set("movingJournal", void 0) }
        }
    })
}), define("browzine-web/components/my-bookcase/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "Nn1yX0Lw", block: '{"symbols":["bookshelf","my-journal"],"statements":[[4,"each",[[20,["bookshelves"]]],null,{"statements":[[0,"  "],[6,"div"],[10,"class",[26,["my-bookshelf ",[25,"if",[[19,1,["isFull"]],"full"],null]," my-bookcase-",[20,["my-bookcase","index"]]]]],[7],[0,"\\n    "],[6,"header"],[7],[0,"\\n"],[4,"editable-element",null,[["value","label","editBookcase","editable","save"],[[19,1,["title"]],[20,["bookshelfTitleEditableElementLabel"]],[20,["editBookcase"]],[20,["isEditable"]],[25,"action",[[19,0,[]],"updateBookshelfTitle",[19,1,[]]],null]]],{"statements":[[0,"        "],[6,"h2"],[9,"tabindex","0"],[7],[1,[19,1,["title"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"    "],[8],[0,"\\n\\n    "],[6,"ul"],[9,"class","journals bookshelf"],[7],[0,"\\n"],[4,"each",[[19,1,["journals"]]],null,{"statements":[[0,"        "],[1,[25,"move-target",null,[["move","moving-journal","journals","following-journal","editBookcase"],[[25,"action",[[19,0,[]],"moveJournalEnd",[19,1,[]],[19,2,[]]],null],[20,["movingJournal"]],[19,1,["journals"]],[19,2,[]],[20,["editBookcase"]]]]],false],[0,"\\n\\n        "],[6,"li"],[10,"id",[26,["journal-",[19,2,["unresolved","id"]]]]],[9,"class","bookshelf-journal-list-item"],[7],[0,"\\n          "],[1,[25,"my-journal",null,[["bookshelf","my-journal","expandedItem","editBookcase","expanded","delete","move-start","move-end","move-cancel"],[[19,1,[]],[19,2,[]],[20,["expandedItem"]],[20,["editBookcase"]],[25,"action",[[19,0,[]],"itemExpanded"],null],[25,"action",[[19,0,[]],"deleteJournal",[19,1,[]],[19,2,[]]],null],[25,"action",[[19,0,[]],"moveJournalStart",[19,1,[]],[19,2,[]]],null],[25,"action",[[19,0,[]],"moveJournalEnd",[19,1,[]],[19,2,[]]],null],[25,"action",[[19,0,[]],"moveCancel"],null]]]],false],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[2]},null],[0,"\\n      "],[1,[25,"move-target",null,[["move","moving-journal","journals","preceding-journal","editBookcase"],[[25,"action",[[19,0,[]],"moveJournalEnd",[19,1,[]],[20,["my-journal"]]],null],[20,["movingJournal"]],[19,1,["journals"]],[19,1,["journals","lastObject"]],[20,["editBookcase"]]]]],false],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[1]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/my-bookcase/template.hbs" } }) }), define("browzine-web/components/my-bookshelf-intro-flash-message/component", ["exports", "browzine-web/mixins/click-on-enter", "browzine-web/mixins/trigger-on-enter"], function (e, t, n) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, n.default, { actions: { dismissSyncMessage: function () { localStorage.setItem("syncMessageDismissed", JSON.stringify(!0)) } } }) }), define("browzine-web/components/my-bookshelf-intro-flash-message/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "FImrJGJF", block: '{"symbols":[],"statements":[[6,"div"],[9,"class","my-Bookshelf-intro-flash-message"],[10,"onclick",[25,"action",[[19,0,[]],"dismissSyncMessage"],null],null],[9,"tabindex","0"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","dismissSyncMessage"],null],null],[7],[0,"\\n  "],[6,"span"],[9,"class","icon flaticon solid x-1"],[7],[8],[0,"\\n  "],[6,"p"],[7],[1,[25,"t",["my_bookshelf.intro_message_p_1"],null],false],[8],[0,"\\n  "],[6,"p"],[7],[1,[25,"t",["my_bookshelf.intro_message_p_2"],null],false],[0,"\\n    "],[6,"a"],[10,"href",[26,[[25,"t",["my_bookshelf.intro_message_learn_more_link_url"],null]]]],[9,"target","_new"],[7],[1,[25,"t",["my_bookshelf.intro_message_learn_more_link_text"],null],false],[8],[1,[25,"t",["my_bookshelf.intro_message_learn_more_punctuation"],null],false],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/my-bookshelf-intro-flash-message/template.hbs" } }) }), define("browzine-web/components/my-journal-cancel-move/component", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({ classNames: ["cancel-move", "corner-element", "right"], click: function () { return this.attrs["move-cancel"](), !1 } }) }), define("browzine-web/components/my-journal-cancel-move/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "yh+Z/j0d", block: '{"symbols":[],"statements":[[6,"span"],[9,"class","flaticon icon solid down-4"],[7],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/my-journal-cancel-move/template.hbs" } }) }), define("browzine-web/components/my-journal-delete/component", ["exports", "browzine-web/mixins/accordion-item", "browzine-web/mixins/click-on-enter", "browzine-web/mixins/trigger-on-enter"], function (e, t, n, r) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, n.default, r.default, { classNames: ["my-journal-delete", "corner-element", "right"], classNameBindings: ["isExpanded:showing", "editBookcase:my-journal-delete-visible"], attributeBindings: ["title"], title: Ember.computed("journal.title", function () { return "Delete " + this.get("journal.title") }), click: function () { return this.get("isExpanded") ? this.send("contract") : this.send("expand"), !1 }, actions: { delete: function () { return this.attrs.delete(), !1 }, move: function () { return this.attrs["move-start"](), !1 } } }) }), define("browzine-web/components/my-journal-delete/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "kWFLSRK6", block: '{"symbols":[],"statements":[[6,"span"],[9,"class","flaticon icon stroke x-1 delete tabindex"],[10,"onclick",[25,"action",[[19,0,[]],"delete"],null],null],[9,"tabindex","0"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","delete"],null],null],[7],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/my-journal-delete/template.hbs" } }) }), define("browzine-web/components/my-journal-menu/component", ["exports", "browzine-web/mixins/accordion-item", "browzine-web/mixins/click-on-enter", "browzine-web/mixins/trigger-on-enter", "ember-intl"], function (e, t, n, r, i) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, n.default, r.default, { classNames: ["menu", "corner-element", "right"], classNameBindings: ["isExpanded:showing", "enableVisibleMenu:my-journal-menu-visible"], attributeBindings: ["title"], title: (0, i.intl)("journal.title", function (e) { return e.t("my_bookshelf.journal_menu_title", { journalTitle: this.get("journal.title") }) }), enableVisibleMenu: Ember.computed("editBookcase", "media.isMobile", "media.isTablet", function () { return this.get("editBookcase") && (this.get("media.isMobile") || this.get("media.isTablet")) }), click: function () { return this.get("isExpanded") ? this.send("contract") : this.send("expand"), !1 }, actions: { delete: function () { return this.attrs.delete(), !1 }, move: function () { return this.attrs["move-start"](), !1 } } }) }), define("browzine-web/components/my-journal-menu/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "4XMaNuxD", block: '{"symbols":[],"statements":[[6,"span"],[9,"class","flaticon icon stroke menu-2"],[7],[8],[0,"\\n\\n"],[4,"if",[[20,["isExpanded"]]],null,{"statements":[[0,"  "],[6,"ul"],[7],[0,"\\n    "],[6,"li"],[9,"class","move tabindex"],[10,"onclick",[25,"action",[[19,0,[]],"move"],null],null],[9,"tabindex","0"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","move"],null],null],[7],[1,[25,"t",["my_bookshelf.journal_menu_move_option_text"],null],false],[8],[0,"\\n    "],[6,"li"],[9,"class","delete tabindex"],[10,"onclick",[25,"action",[[19,0,[]],"delete"],null],null],[9,"tabindex","0"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","delete"],null],null],[7],[1,[25,"t",["my_bookshelf.journal_menu_delete_option_text"],null],false],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/my-journal-menu/template.hbs" } }) }), define("browzine-web/components/my-journal/component", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({ classNames: ["journal", "bookshelf-journal"], classNameBindings: ["unavailable", "moving", "isPending:pending"], myBookshelf: Ember.inject.service(), unread: Ember.computed.alias("my-journal.unreadCount"), unavailable: Ember.computed.alias("my-journal.unavailable"), isPending: Ember.computed.alias("my-journal.isPending"), moving: Ember.computed.alias("my-journal.isMoving"), journal: Ember.computed.alias("my-journal.journal"), actions: { visitUnavailableJournal: function () { this.get("flashMessages").alert("This journal is currently unavailable at this library. Please contact your librarian for more information.") } } }) }), define("browzine-web/components/my-journal/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "HgFLeBNV", block: '{"symbols":[],"statements":[[4,"if",[[20,["my-journal","isPending"]]],null,{"statements":[[0,"  "],[6,"div"],[7],[0,"\\n    "],[12,"my-bookshelf/my-journal-cover",[]],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[25,"and",[[20,["editBookcase"]],[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null]],null,{"statements":[[0,"  "],[12,"my-bookshelf/my-journal-cover",[]],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["unavailable"]]],null,{"statements":[[0,"  "],[6,"a"],[9,"href","#"],[3,"action",[[19,0,[]],"visitUnavailableJournal"]],[7],[0,"\\n    "],[12,"my-bookshelf/my-journal-cover",[]],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"link-to",["library.journal",[20,["my-journal","journal"]]],null,{"statements":[[0,"    "],[12,"my-bookshelf/my-journal-cover",[]],[0,"\\n"]],"parameters":[]},null]],"parameters":[]}]],"parameters":[]}]],"parameters":[]}]],"hasEval":true}', meta: { moduleName: "browzine-web/components/my-journal/template.hbs" } }) }), define("browzine-web/components/permissions-error-alert/component", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({ tagName: "" }) }), define("browzine-web/components/permissions-error-alert/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "yURj4Vnd", block: '{"symbols":[],"statements":[[6,"div"],[7],[0,"\\n  "],[1,[25,"t",["untranslated.permissions_error_alert_message"],[["htmlSafe"],[true]]],false],[0,"\\n"],[8]],"hasEval":false}', meta: { moduleName: "browzine-web/components/permissions-error-alert/template.hbs" } }) }), define("browzine-web/components/power-select-multiple", ["exports", "ember-power-select/components/power-select-multiple"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/power-select-multiple/trigger", ["exports", "ember-power-select/components/power-select-multiple/trigger"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/power-select", ["exports", "ember-power-select/components/power-select"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/power-select/before-options", ["exports", "ember-power-select/components/power-select/before-options"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/power-select/options", ["exports", "ember-power-select/components/power-select/options"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/power-select/placeholder", ["exports", "ember-power-select/components/power-select/placeholder"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/power-select/power-select-group", ["exports", "ember-power-select/components/power-select/power-select-group"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/power-select/search-message", ["exports", "ember-power-select/components/power-select/search-message"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/power-select/trigger", ["exports", "ember-power-select/components/power-select/trigger"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/require-permissions/component", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({
        permissions: Ember.inject.service(), tagName: "", hasPermission: Ember.computed("requestedPermissions", "library", function () {
            var e = this.get("permissions"), t = this.get("requestedPermissions").split(","), n = this.get("library")
            return e.hasPermission(t, n)
        })
    })
}), define("browzine-web/components/require-permissions/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "Z1KgCyZr", block: '{"symbols":["&default"],"statements":[[4,"if",[[20,["hasPermission"]]],null,{"statements":[[0,"  "],[11,1],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/require-permissions/template.hbs" } }) })
define("browzine-web/components/reset-password/component", ["exports", "ember-intl"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({
        classNames: ["reset-password"], auth: Ember.inject.service(), errorReporter: Ember.inject.service(), intl: Ember.inject.service(), inProgress: !1, newPasswordLabel: (0, t.t)("auth.new_password_label"), newPasswordConfirmLabel: (0, t.t)("auth.new_password_confirm_label"), savePasswordButtonLabel: (0, t.intl)("inProgress", function (e) { return this.get("inProgress") ? e.t("auth.save_password_button_in_progress") : e.t("auth.save_password_button") }), resetPasswordButtonLabel: (0, t.intl)("inProgress", function (e) { return this.get("inProgress") ? e.t("auth.reset_password_button_label_in_progress") : e.t("auth.reset_password_button_label") }), actions: {
            sendToken: function () {
                var e = this, t = this.getProperties("email", "auth"), n = t.email, r = t.auth
                if (this.set("error", null), n && n.length && !(n.indexOf("@") < 0)) return this.set("inProgress", !0), r.emailResetToken(n).then(function () { return e.set("tokenSent", !0) }).catch(function (t) { "unknown_user" !== t.code ? (console.log(t.message), e.set("error", e.get("intl").t("auth.reset_password_server_error_message"))) : e.sendAction("onUnknownUser", n) }).finally(function () { return e.set("inProgress", !1) })
                this.set("error", this.get("intl").t("auth.invalid_email_error_message"))
            }, updatePassword: function () {
                var e = this, t = this.get("auth"), n = this.getProperties("email", "token", "newPassword", "newPasswordConfirm"), r = n.email, i = n.newPassword, a = n.newPasswordConfirm
                this.set("error", null)
                var s = t.validatePassword(i, a), o = s.valid, l = s.validationErrorMessage
                return o ? (this.set("inProgress", !0), t.updatePassword(n).then(function () { return t.authenticateUser(r, i) }).then(function () { return e.set("resetComplete", !0) }).catch(function (t) { console.log(t.message), e.set("error", e.get("intl").t("auth.reset_password_server_error_message")), e.set("tokenSent", !1), e.set("token", null), e.set("newPassword", null), e.set("newPasswordConfirm", null) }).finally(function () { return e.set("inProgress", !1) })) : (this.set("error", l), this.set("tokenSent", !1), this.set("token", null), this.set("newPassword", null), void this.set("newPasswordConfirm", null))
            }, continue: function () { this.sendAction("onLoggedIn") }
        }
    })
}), define("browzine-web/components/reset-password/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "5/S6m19b", block: '{"symbols":[],"statements":[[6,"div"],[9,"class","auth-form"],[7],[0,"\\n  "],[1,[18,"browzine-logo"],false],[0,"\\n\\n  "],[6,"h2"],[7],[1,[25,"t",["auth.reset_password_heading"],null],false],[8],[0,"\\n\\n"],[4,"if",[[20,["error"]]],null,{"statements":[[0,"    "],[6,"section"],[7],[0,"\\n      "],[6,"span"],[9,"id","reset-error"],[7],[0,"\\n        "],[1,[18,"error"],false],[0,"\\n      "],[8],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["resetComplete"]]],null,{"statements":[[0,"    "],[6,"section"],[7],[0,"\\n      "],[6,"span"],[9,"class","reset-message"],[7],[1,[25,"t",["auth.reset_complete_message"],null],false],[8],[0,"\\n    "],[8],[0,"\\n\\n    "],[6,"button"],[9,"id","reset-continue"],[9,"class","button primary"],[3,"action",[[19,0,[]],"continue"]],[7],[1,[25,"t",["auth.continue"],null],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["tokenSent"]]],null,{"statements":[[0,"    "],[6,"section"],[7],[0,"\\n      "],[6,"span"],[9,"class","reset-message"],[7],[1,[25,"t",["auth.email_sent_message"],[["email"],[[20,["email"]]]]],false],[8],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["token"]]],null,{"statements":[[0,"    "],[6,"section"],[7],[0,"\\n      "],[6,"label"],[9,"for","new-password"],[7],[1,[25,"t",["auth.new_password_label"],null],false],[8],[0,"\\n      "],[1,[25,"focusable-input",null,[["aria-label","id","type","label","value","insert-newline"],[[20,["newPasswordLabel"]],"new-password","password",[20,["newPasswordLabel"]],[20,["newPassword"]],[25,"action",[[19,0,[]],"updatePassword"],null]]]],false],[0,"\\n    "],[8],[0,"\\n\\n    "],[6,"section"],[7],[0,"\\n      "],[6,"label"],[9,"for","new-password-confirm"],[7],[1,[25,"t",["auth.new_password_confirm_label"],null],false],[8],[0,"\\n      "],[1,[25,"input",null,[["aria-label","id","type","label","value","insert-newline"],[[20,["newPasswordConfirmLabel"]],"new-password-confirm","password",[20,["newPasswordConfirmLabel"]],[20,["newPasswordConfirm"]],[25,"action",[[19,0,[]],"updatePassword"],null]]]],false],[0,"\\n    "],[8],[0,"\\n\\n    "],[6,"button"],[9,"id","submit-reset"],[9,"class","button primary"],[10,"aria-label",[26,[[18,"savePasswordButtonLabel"]]]],[3,"action",[[19,0,[]],"updatePassword"]],[7],[0,"\\n"],[4,"if",[[20,["inProgress"]]],null,{"statements":[[0,"        "],[1,[25,"loading-indicator",null,[["white","inline","smaller"],[true,true,true]]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[1,[25,"t",["auth.save_password_button"],null],false],[0,"\\n"]],"parameters":[]}],[0,"    "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"    "],[6,"section"],[7],[0,"\\n      "],[6,"label"],[9,"for","email"],[7],[1,[25,"t",["auth.reset_password_email_input_label"],null],false],[8],[0,"\\n      "],[1,[25,"focusable-input",null,[["id","value","insert-newline"],["email",[20,["email"]],[25,"action",[[19,0,[]],"sendToken"],null]]]],false],[0,"\\n    "],[8],[0,"\\n\\n    "],[6,"button"],[9,"id","submit-reset"],[9,"class","button primary"],[10,"aria-label",[26,[[18,"resetPasswordButtonLabel"]]]],[3,"action",[[19,0,[]],"sendToken"]],[7],[0,"\\n"],[4,"if",[[20,["inProgress"]]],null,{"statements":[[0,"        "],[1,[25,"loading-indicator",null,[["white","inline","smaller"],[true,true,true]]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[1,[25,"t",["auth.reset_password_button_text"],null],false],[0,"\\n"]],"parameters":[]}],[0,"    "],[8],[0,"\\n  "]],"parameters":[]}]],"parameters":[]}]],"parameters":[]}],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/reset-password/template.hbs" } }) }), define("browzine-web/components/route-announcer", ["exports", "a11y-announcer/components/route-announcer"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/components/scimago-rank/component", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({ attributeBindings: ["url:href", "target"], classNames: "scimago-rank", tagName: "a", url: Ember.computed.alias("journal.scimagoURL"), target: "_new" }) }), define("browzine-web/components/scimago-rank/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "oj/MoPpO", block: '{"symbols":[],"statements":[[1,[25,"t",["untranslated.sjr"],null],false],[0," "],[6,"span"],[7],[1,[25,"if",[[20,["journal","scimagoRank"]],[20,["journal","scimagoRank"]],"Unranked"],null],false],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/scimago-rank/template.hbs" } }) }), define("browzine-web/components/scroll-each/component", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({
        collectionColumns: [100], pageSize: 40, pageIndex: 0, init: function () { this._super.apply(this, arguments), this.set("pagedItems", []), this.loadNext() }, itemWatcher: Ember.observer("items.@each.id", function () { this.set("pagedItems", []), this.set("pageIndex", 0), this.loadNext() }), loadNext: function () {
            var e = this.get("items"), t = this.get("pagedItems"), n = this.get("pageSize"), r = this.get("pageIndex")
            this.set("isLoading", !0), r < e.length ? (e.slice(r, r + n).forEach(function (e) { t.pushObject(e) }), r += n, this.set("pageIndex", r), e.length < n && this.set("isLoading", !1)) : this.set("isLoading", !1)
        }, actions: { loadMore: function () { this.loadNext() } }
    })
}), define("browzine-web/components/scroll-each/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "DfP2IhCr", block: '{"symbols":["result","index","scroller","result","index","&default"],"statements":[[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[4,"infinite-scroller",null,[["use-document","trigger-at","on-load-more"],[true,"70%",[25,"action",[[19,0,[]],"loadMore"],null]]],{"statements":[[4,"each",[[20,["pagedItems"]]],null,{"statements":[[0,"      "],[11,6,[[19,4,[]],[19,5,[]]]],[0,"\\n"]],"parameters":[4,5]},null]],"parameters":[3]},null],[4,"if",[[20,["isLoading"]]],null,{"statements":[[0,"    "],[1,[25,"loading-indicator",null,[["alignment"],["center"]]],false],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},{"statements":[[4,"ember-collection",null,[["items","cell-layout"],[[20,["items"]],[25,"percentage-columns-layout",[[20,["items","length"]],[20,["collectionColumns"]],[20,["itemHeight"]]],null]]],{"statements":[[0,"    "],[11,6,[[19,1,[]],[19,2,[]]]],[0,"\\n"]],"parameters":[1,2]},null]],"parameters":[]}]],"hasEval":false}', meta: { moduleName: "browzine-web/components/scroll-each/template.hbs" } }) }), define("browzine-web/components/scroll-to/component", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 })
    e.default = Ember.Component.extend({
        userAgent: Ember.inject.service("user-agent"), didInsertElement: function () {
            if (this.get("scrollTo")) {
                var e = this.get("userAgent").get("isIOS"), t = this.get("userAgent").get("isSafari"), n = this.get("userAgent").get("isEdge"), r = e || t || n ? "body" : "html", i = Ember.testing ? "#ember-testing-container" : r, a = this.get("containerSelector") || i, s = Ember.$(a), o = this.get("scrollStyle") || "jump", l = parseInt(this.get("scrollDuration") || 1e3, 10), u = this.get("scrollEasing") || "easeOutCubic", c = this.get("offsetSelector"), d = c ? Math.ceil(Ember.$(c).height()) : 0, m = Math.ceil(s.height() - d), b = parseInt(this.get("resultTopMargin") || 80, 10), f = m, p = parseInt(this.get("pixelsToJumpToWithin") || f, 10), h = Math.ceil(this.$().offset().top) - (d + b)
                if (Ember.testing && (h -= 120), "animated" === o) (function (e, t, n, r, i) { t - e.scrollTop() > i && e.scrollTop(t - i), e.animate({ scrollTop: t }, n, r) })(s, h, l, u, p)
                else {
                    if ("jump" !== o) throw new Error("scroll-to component configured with unsupported scrollStyle")
                    Ember.$(a).scrollTop(h)
                } var g = this.get("emphasisSelector")
                g && Ember.$(g).parent().addClass("article-in-context-highlight")
            }
        }
    })
}), define("browzine-web/components/scroll-top/component", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({ didInsertElement: function () { (this.get("media.isMobile") || this.get("media.isTablet")) && Ember.$(window).scrollTop(0) } }) }), define("browzine-web/components/search-field/component", ["exports", "browzine-web/mixins/trigger-on-enter"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, { classNames: ["search-field"], isEmpty: function () { return Ember.isEmpty(this.get("value")) }.property("value"), becomeFocused: function () { this.get("disableFocus") || !this.get("media.isDesktop") && !this.get("media.isJumbo") || this.$("input").focus() }.on("didInsertElement"), hideKeyboardOnReturn: function () { (this.get("media.isMobile") || this.get("media.isTablet")) && this.$("input").keypress(function (e) { 13 === (e.keyCode || e.which) && Ember.$(".search-field-container input").blur() }) }.on("didInsertElement"), actions: { clear: function () { this.set("value", ""), this.becomeFocused(), this.sendAction("cleared") } } }) }), define("browzine-web/components/search-field/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "554rFaNS", block: '{"symbols":[],"statements":[[1,[25,"input",null,[["type","value","placeholder","aria-label","class","autocomplete","title"],["text",[20,["value"]],[20,["placeholder"]],[20,["aria-label"]],"hero-search",[20,["autocomplete"]],[20,["title"]]]]],false],[0,"\\n\\n"],[6,"div"],[9,"class","icon"],[7],[0,"\\n"],[4,"if",[[20,["isLoading"]]],null,{"statements":[[0,"    "],[1,[18,"loading-indicator"],false],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["isEmpty"]]],null,{"statements":[[0,"    "],[6,"div"],[9,"class","magnifying-glass flaticon stroke magnifying-glass-2"],[7],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"    "],[6,"div"],[9,"tabindex","0"],[10,"aria-label",[26,[[25,"t",["search.clear_search_aria_label"],null]]]],[9,"class","clearer flaticon stroke x-2"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","clear"],null],null],[3,"action",[[19,0,[]],"clear"]],[7],[8],[0,"\\n  "]],"parameters":[]}]],"parameters":[]}],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/search-field/template.hbs" } }) }), define("browzine-web/components/search-pane/component", ["exports", "browzine-web/mixins/trigger-on-enter"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 })
    e.default = Ember.Component.extend(t.default, {
        classNames: ["search-pane-container"], classNameBindings: ["position", "complete", "filtered"], disableScrollingOnEnter: !1, disableScrollingOnInsert: !1, notFiltered: Ember.computed.equal("filter", "all"), filtered: Ember.computed.not("notFiltered"), maxTitleLength: 90, a11y: Ember.inject.service(), intl: Ember.inject.service(), init: function () {
            var e = this
            this._super.apply(this, arguments)
            var t = function (t) { 27 === t.keyCode && Ember.run.next(function () { e.hide() }) }
            Ember.$(document).on("keyup", t), this.set("handleKeyPress", t)
        }, didDestroyElement: function () { this.get("a11y").headerSearchBlur(), Ember.$(document).unbind("keyup", this.get("handleKeyPress")) }, setDefaultFilter: function () {
            var e = this.get("filter")
            Ember.isBlank(e) && this.set("filter", "all")
        }.observes("filter"), presentationFilter: Ember.computed("filter", function () {
            var e = this.get("filter")
            return "bookshelves" === e ? "subjects" : "journals" === e ? e : void 0
        }), willInsertElement: function () { this.get("disableScrollingOnInsert") && (this.get("media.isDesktop") || this.get("media.isJumbo")) && Ember.$("body").addClass("no-scroll") }, willDestroyElement: function () { Ember.$("body").removeClass("no-scroll") }, mouseEnter: function () { this.get("disableScrollingOnEnter") && (this.get("media.isDesktop") || this.get("media.isJumbo")) && Ember.$("body").addClass("no-scroll") }, mouseLeave: function () { this.get("disableScrollingOnEnter") && Ember.$("body").removeClass("no-scroll") }, filteredResults: Ember.computed("filter", "results", function () {
            var e = this.get("filter"), t = this.get("results").slice(0)
            if (t.length > 0) { var n = t.findIndex(function (e) { return "journals" === e.type && e.external_link && -5 !== e.rank }); -1 !== n && t.splice(n, 0, { type: "journals", showExternalResultsHeader: !0 }) } return "all" === e ? t : "subjects" === e ? t.filter(function (e) { return "bookcases" === e.type || "bookshelves" === e.type }) : t.filterBy("type", e)
        }), resetScrollPosition: Ember.observer("results", function () {
            var e = this.$(".search-pane")
            e && e.scrollTop(0)
        }), hide: function () { this.sendAction("exit") }, searchTitle: Ember.computed("intl.primaryLocale", function () { return this.get("intl").t("search.header") }), actions: { filter: function (e) { this.set("filter", e) }, resetFilter: function () { this.set("filter", "all") }, setQuery: function (e) { this.set("query", e) }, clearHistory: function () { this.sendAction("clearHistory") }, exit: function () { this.sendAction("exit") }, enteredField: function () { this.get("disableScrollingOnEnter") && Ember.$("body").addClass("but-actually-scroll") }, leftField: function () { this.get("disableScrollingOnEnter") && Ember.$("body").removeClass("but-actually-scroll") } }
    })
}), define("browzine-web/components/search-pane/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "zLdVrSYG", block: '{"symbols":["search","result","index"],"statements":[[6,"ul"],[9,"class","search-pane"],[9,"role","dialog"],[7],[0,"\\n"],[4,"if",[[20,["showSearchField"]]],null,{"statements":[[0,"    "],[6,"li"],[9,"class","search-field-container"],[3,"action",[[19,0,[]],"enteredField"],[["on"],["mouseEnter"]]],[3,"action",[[19,0,[]],"leftField"],[["on"],["mouseLeave"]]],[7],[0,"\\n      "],[1,[25,"search-field",null,[["value","placeholder","isLoading","aria-label","cleared","title","autocomplete"],[[20,["query"]],[20,["placeholder"]],[20,["inProgress"]],[20,["searchTitle"]],"resetFilter",[20,["searchTitle"]],[20,["searchTitle"]]]]],false],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["showResults"]]],null,{"statements":[[4,"if",[[20,["results"]]],null,{"statements":[[0,"      "],[6,"li"],[9,"class","filter-container"],[7],[0,"\\n        "],[6,"span"],[9,"class","label results-label-header"],[7],[1,[25,"t",["search.search_results.header"],null],false],[8],[0,"\\n        "],[6,"div"],[9,"class","filters"],[7],[0,"\\n          "],[6,"div"],[10,"aria-label",[26,[[25,"t",["search.search_results.all_results_aria_label"],null]]]],[10,"class",[26,["filter all ",[25,"if",[[25,"eq",[[20,["filter"]],"all"],null],"active"],null]," tabindex"]]],[9,"tabindex","0"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","filter","all"],null],null],[3,"action",[[19,0,[]],"filter","all"]],[7],[0,"\\n            "],[6,"div"],[9,"class","label icon flaticon solid article-2"],[7],[0," "],[1,[25,"t",["search.search_results.all_results"],null],false],[8],[0,"\\n          "],[8],[0,"\\n          "],[6,"div"],[10,"aria-label",[26,[[25,"t",["search.search_results.subjects_aria_label"],null]]]],[10,"class",[26,["filter subjects ",[25,"if",[[25,"eq",[[20,["filter"]],"subjects"],null],"active"],null]," tabindex"]]],[9,"tabindex","0"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","filter","subjects"],null],null],[3,"action",[[19,0,[]],"filter","subjects"]],[7],[0,"\\n            "],[6,"div"],[9,"class","icon flaticon solid files-1"],[7],[0," "],[1,[25,"t",["search.search_results.subjects"],null],false],[8],[0,"\\n          "],[8],[0,"\\n          "],[6,"div"],[10,"aria-label",[26,[[25,"t",["search.search_results.journals_aria_label"],null]]]],[10,"class",[26,["filter journals ",[25,"if",[[25,"eq",[[20,["filter"]],"journals"],null],"active"],null]," tabindex"]]],[9,"tabindex","0"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","filter","journals"],null],null],[3,"action",[[19,0,[]],"filter","journals"]],[7],[0,"\\n            "],[6,"div"],[9,"class","icon flaticon solid journal-2"],[7],[0," "],[1,[25,"t",["search.search_results.journals"],null],false],[8],[0,"\\n          "],[8],[0,"\\n        "],[8],[0,"\\n      "],[8],[0,"\\n      "],[6,"li"],[9,"class","result-container"],[7],[0,"\\n        "],[6,"ul"],[7],[0,"\\n"],[4,"scroll-each",null,[["items","itemHeight"],[[20,["filteredResults"]],64]],{"statements":[[4,"if",[[25,"eq",[[19,2,["type"]],"journals"],null]],null,{"statements":[[0,"            "],[6,"li"],[10,"class",[26,["result journal ",[25,"if",[[25,"eq",[[19,3,[]],0],null],"first-result"],null]," ",[25,"if",[[19,2,["showExternalResultsHeader"]],"external"],null]]]],[7],[0,"\\n"],[4,"if",[[19,2,["showExternalResultsHeader"]]],null,{"statements":[[0,"                "],[6,"div"],[9,"class","external-results-header"],[7],[0,"\\n                  "],[6,"div"],[9,"class","external-icon-container"],[7],[0,"\\n                    "],[6,"div"],[9,"class","text"],[7],[0,"\\n                      "],[6,"div"],[9,"class","external-icon"],[7],[8],[0,"\\n"],[4,"if",[[20,["library","formattedExternalSearchHeader"]]],null,{"statements":[[0,"                        "],[1,[20,["library","formattedExternalSearchHeader"]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                        "],[1,[25,"t",["search.search_results.external_results_header"],null],false],[0,"\\n"]],"parameters":[]}],[0,"                    "],[8],[0,"\\n                  "],[8],[0,"\\n                "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[19,2,["external_link"]]],null,{"statements":[[0,"                  "],[6,"a"],[10,"href",[26,[[19,2,["external_link"]]]]],[9,"target","_blank"],[9,"tabindex","0"],[7],[0,"\\n                    "],[6,"div"],[9,"class","text"],[10,"title",[26,[[19,2,["title"]]]]],[7],[0,"\\n"],[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[0,"                        "],[1,[19,2,["title"]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                        "],[1,[25,"truncate-text",[[19,2,["title"]]],[["length","omission"],[[20,["maxTitleLength"]],"..."]]],false],[0,"\\n"]],"parameters":[]}],[0,"                    "],[8],[0,"\\n                    "],[6,"div"],[9,"class","icon external-journal"],[7],[6,"img"],[9,"src","//browzine-app.thirdiron.com/images/white_arrow-78a34ad04d2b0cc9c66d1ae91fa3d3e9.png"],[10,"alt",[26,[[25,"t",["search.search_results.external_journal_image"],null]]]],[7],[8],[8],[0,"\\n                  "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"track-clicks",null,[["category","action","label","value"],["allpubs_name_tapped",[20,["query"]],[19,2,["title"]],[19,2,["id"]]]],{"statements":[[4,"link-to",["library.journal",[19,2,["id"]],[25,"query-params",null,[["storeQuery","searchVisible","filter"],[true,false,"all"]]]],[["tabindex"],["0"]],{"statements":[[0,"                      "],[6,"div"],[9,"class","text"],[10,"title",[26,[[19,2,["title"]]]]],[7],[0,"\\n"],[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[0,"                          "],[1,[19,2,["title"]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                          "],[1,[25,"truncate-text",[[19,2,["title"]]],[["length","omission"],[[20,["maxTitleLength"]],"..."]]],false],[0,"\\n"]],"parameters":[]}],[0,"                      "],[8],[0,"\\n                      "],[6,"div"],[9,"class","icon flaticon solid journal-2"],[7],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null]],"parameters":[]}]],"parameters":[]}],[0,"            "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"            "],[6,"li"],[10,"class",[26,["result subject ",[25,"if",[[25,"eq",[[19,3,[]],0],null],"first-result"],null]]]],[7],[0,"\\n"],[4,"track-clicks",null,[["category","action","label","value"],["allpubs_cat_tapped",[20,["query"]],[19,2,["name"]],[19,2,["id"]]]],{"statements":[[4,"if",[[25,"eq",[[19,2,["type"]],"bookshelves"],null]],null,{"statements":[[4,"link-to",["library.subject.bookcase.bookshelf",[19,2,["subject_id"]],[19,2,["bookcase_id"]],[19,2,["id"]],[25,"query-params",null,[["storeQuery","searchVisible","filter"],[true,false,"all"]]]],[["tabindex"],["0"]],{"statements":[[0,"                    "],[6,"div"],[9,"class","text"],[10,"title",[26,[[19,2,["name"]]]]],[7],[0,"\\n"],[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[0,"                        "],[1,[19,2,["name"]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                        "],[1,[25,"truncate-text",[[19,2,["name"]]],[["length","omission"],[[20,["maxTitleLength"]],"..."]]],false],[0,"\\n"]],"parameters":[]}],[0,"                    "],[8],[0,"\\n                    "],[6,"div"],[9,"class","icon flaticon solid files-1"],[7],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},{"statements":[[4,"if",[[25,"eq",[[19,2,["type"]],"bookcases"],null]],null,{"statements":[[4,"link-to",["library.subject.bookcase",[19,2,["subject_id"]],[19,2,["bookcase_id"]],[25,"query-params",null,[["storeQuery","searchVisible","filter"],[true,false,"all"]]]],[["tabindex"],["0"]],{"statements":[[0,"                    "],[6,"div"],[9,"class","text"],[10,"title",[26,[[19,2,["name"]]]]],[7],[0,"\\n"],[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[0,"                        "],[1,[19,2,["name"]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                        "],[1,[25,"truncate-text",[[19,2,["name"]]],[["length","omission"],[[20,["maxTitleLength"]],"..."]]],false],[0,"\\n"]],"parameters":[]}],[0,"                    "],[8],[0,"\\n                    "],[6,"div"],[9,"class","icon flaticon solid files-1"],[7],[8],[0,"\\n"]],"parameters":[]},null],[0,"                "]],"parameters":[]},null]],"parameters":[]}]],"parameters":[]},null],[0,"            "],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[2,3]},null],[0,"\\n"],[4,"if",[[25,"not",[[20,["filteredResults","length"]]],null]],null,{"statements":[[0,"          "],[6,"li"],[9,"class","no-results-container"],[7],[0,"\\n            "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["search.empty_search_results.no"],null],false],[0," "],[1,[18,"presentationFilter"],false],[0," "],[1,[25,"t",["search.empty_search_results.matching"],null],false],[0," "],[1,[25,"t",["untranslated.open_quote"],null],false],[1,[18,"query"],false],[1,[25,"t",["untranslated.close_quote"],null],false],[8],[0,"\\n          "],[8],[0,"\\n"]],"parameters":[]},null],[0,"        "],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["query"]]],null,{"statements":[[4,"unless",[[20,["lowerLimit"]]],null,{"statements":[[0,"        "],[6,"li"],[9,"tabindex","0"],[10,"class",[26,["no-results-container ",[25,"if",["inProgress","in-progress"],null]]]],[7],[0,"\\n"],[4,"if",[[20,["inProgress"]]],null,{"statements":[[0,"            "],[1,[18,"loading-indicator"],false],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["isIssn"]]],null,{"statements":[[4,"if",[[20,["issnMsg"]]],null,{"statements":[[0,"                "],[6,"span"],[9,"class","label"],[7],[1,[18,"issnMsg"],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["search.empty_search_results.description"],[["query"],[[20,["query"]]]]],false],[4,"if",[[20,["externalSearchLocation"]]],null,{"statements":[[0," "],[1,[25,"t",["search.empty_search_results.external_search_description"],null],false],[0," "],[6,"a"],[9,"tabindex","0"],[10,"href",[26,[[18,"externalSearchLocation"]]]],[9,"target","_new"],[7],[1,[25,"t",["search.empty_search_results.retry"],null],false],[8],[1,[25,"t",["search.empty_search_results.retry_punctuation"],null],false]],"parameters":[]},null],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[0,"              "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["search.empty_search_results.description"],[["query"],[[20,["query"]]]]],false],[4,"if",[[20,["externalSearchLocation"]]],null,{"statements":[[0," "],[1,[25,"t",["search.empty_search_results.external_search_description"],null],false],[0," "],[6,"a"],[9,"tabindex","0"],[10,"href",[26,[[18,"externalSearchLocation"]]]],[9,"target","_new"],[7],[1,[25,"t",["search.empty_search_results.retry"],null],false],[8],[1,[25,"t",["search.empty_search_results.retry_punctuation"],null],false]],"parameters":[]},null],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]}],[0,"        "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},{"statements":[[4,"if",[[20,["previous"]]],null,{"statements":[[0,"      "],[6,"li"],[9,"class","previous-search-header"],[7],[0,"\\n        "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["search.search_results.previous_searches"],null],false],[8],[0,"\\n        "],[6,"span"],[9,"class","action clear-history tabindex"],[9,"tabindex","0"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","clearHistory"],null],null],[3,"action",[[19,0,[]],"clearHistory"]],[7],[1,[25,"t",["search.search_results.clear_history"],null],false],[8],[0,"\\n      "],[8],[0,"\\n"],[4,"each",[[20,["previous"]]],null,{"statements":[[0,"        "],[6,"li"],[9,"class","previous-search tabindex"],[9,"tabindex","0"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","setQuery",[19,1,["query"]]],null],null],[3,"action",[[19,0,[]],"setQuery",[19,1,["query"]]]],[7],[1,[19,1,["query"]],false],[8],[0,"\\n"]],"parameters":[1]},null],[0,"    "]],"parameters":[]},null]],"parameters":[]}]],"parameters":[]}],[0,"\\n    "],[6,"li"],[9,"class","exit"],[3,"action",[[19,0,[]],"exit"]],[7],[8],[0,"\\n"]],"parameters":[]},null],[8],[0,"\\n\\n"],[6,"ul"],[9,"class","responsive-menu"],[7],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/search-pane/template.hbs" } }) }), define("browzine-web/components/service-list/component", ["exports", "browzine-web/mixins/trigger-on-enter"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, {
        classNames: ["share-modal"], exporters: Ember.inject.service(), init: function () {
            var e = this
            this._super.apply(this, arguments)
            var t = function (t) { 27 === t.keyCode && Ember.run.next(function () { e.hide() }) }
            Ember.$(document).on("keyup", t), this.set("handleKeyPress", t)
        }, didInsertElement: function () {
            var e = this, t = function (t) {
                var n = e.$(".services-list").parent().parent()
                n && (n.is(t.target) || 0 !== n.has(t.target).length || e.hide())
            }
            Ember.$(document).mouseup(t), Ember.$(document).keypress(t), this.set("hideListener", t)
        }, didDestroyElement: function () { Ember.$(document).unbind("mouseup", this.get("hideListener")), Ember.$(document).unbind("keypress", this.get("hideListener")), Ember.$(document).unbind("keyup", this.get("handleKeyPress")) }, hide: function () { this.sendAction("hide") }, actions: {
            share: function (e) {
                this.hide()
                var t = this.get("article") ? this.get("article").get("library") : void 0, n = this.get("library") || t || this.get("article.library")
                e.call(this, this.get("article"), n, this.get("exporters"))
            }, zotero: function () {
                var e = this.get("article"), t = this.get("library")
                this.get("exporters").zotero(t, e), this.hide()
            }, mendeley: function () {
                var e = this.get("article"), t = this.get("library")
                this.get("exporters").mendeley(t, e), this.hide()
            }, bibtex: function () {
                var e = this.get("article"), t = this.get("library")
                this.get("exporters").bibtex(t, e), this.hide()
            }, refworks: function () {
                var e = this.get("article"), t = this.get("library")
                this.get("exporters").refworks(t, e), this.hide()
            }, endnote: function () {
                var e = this.get("article"), t = this.get("library")
                this.get("exporters").endnote(t, e), this.hide()
            }, universal: function () { this.send("endnote") }, citavi: function () { this.send("endnote") }, copyLinkToArticle: function () { this.hide(), this.get("copyLinkToArticleModal").show() }, twitter: function () {
                var e = this.get("article")
                this.get("exporters").twitter(e), this.hide()
            }, facebook: function () {
                var e = this.get("article")
                this.get("exporters").facebook(e), this.hide()
            }, linkedin: function () {
                var e = this.get("article")
                this.get("exporters").linkedin(e), this.hide()
            }, email: function () {
                var e = this.get("article")
                this.get("exporters").email(e), this.hide()
            }
        }
    })
}), define("browzine-web/components/service-list/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "//AuEVYe", block: '{"symbols":[],"statements":[[6,"div"],[9,"class","services-list"],[7],[0,"\\n "],[6,"ul"],[9,"class","services"],[7],[0,"\\n"],[4,"if",[[25,"eq",[[20,["specificity"]],"citation-services"],null]],null,{"statements":[[0,"     "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","zotero"],null],null],[3,"action",[[19,0,[]],"zotero"]],[7],[0,"\\n       "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["untranslated.zotero"],null],false],[8],[0,"\\n     "],[8],[0,"\\n     "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","mendeley"],null],null],[3,"action",[[19,0,[]],"mendeley"]],[7],[0,"\\n       "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["untranslated.mendeley"],null],false],[8],[0,"\\n     "],[8],[0,"\\n     "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","bibtex"],null],null],[3,"action",[[19,0,[]],"bibtex"]],[7],[0,"\\n       "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["untranslated.bibtex"],null],false],[8],[0,"\\n     "],[8],[0,"\\n     "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","refworks"],null],null],[3,"action",[[19,0,[]],"refworks"]],[7],[0,"\\n       "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["untranslated.refworks"],null],false],[8],[0,"\\n     "],[8],[0,"\\n     "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","endnote"],null],null],[3,"action",[[19,0,[]],"endnote"]],[7],[0,"\\n       "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["untranslated.endnote_ris"],null],false],[8],[0,"\\n     "],[8],[0,"\\n     "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","citavi"],null],null],[3,"action",[[19,0,[]],"citavi"]],[7],[0,"\\n       "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["untranslated.citavi_ris"],null],false],[8],[0,"\\n     "],[8],[0,"\\n     "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","universal"],null],null],[3,"action",[[19,0,[]],"universal"]],[7],[0,"\\n       "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["journal.article.export_citation_menu.universal_ris"],null],false],[8],[0,"\\n     "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"     "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","copyLinkToArticle"],null],null],[3,"action",[[19,0,[]],"copyLinkToArticle"]],[7],[0,"\\n       "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["journal.article.social_share_menu.copy"],null],false],[8],[0,"\\n     "],[8],[0,"\\n     "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","twitter"],null],null],[3,"action",[[19,0,[]],"twitter"]],[7],[0,"\\n       "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["untranslated.twitter"],null],false],[8],[0,"\\n     "],[8],[0,"\\n     "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","facebook"],null],null],[3,"action",[[19,0,[]],"facebook"]],[7],[0,"\\n       "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["untranslated.facebook"],null],false],[8],[0,"\\n     "],[8],[0,"\\n     "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","linkedin"],null],null],[3,"action",[[19,0,[]],"linkedin"]],[7],[0,"\\n       "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["untranslated.linkedin"],null],false],[8],[0,"\\n     "],[8],[0,"\\n     "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","email"],null],null],[3,"action",[[19,0,[]],"email"]],[7],[0,"\\n       "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["journal.article.social_share_menu.email"],null],false],[8],[0,"\\n     "],[8],[0,"\\n"]],"parameters":[]}],[0," "],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/service-list/template.hbs" } }) }), define("browzine-web/components/share-modal/component", ["exports", "browzine-web/mixins/trigger-on-enter"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, {
        classNames: ["share-modal"], exporters: Ember.inject.service(), init: function () {
            var e = this
            this._super.apply(this, arguments)
            var t = this.get("modal")
            Ember.run.next(function () { t.element = e.element, t.element.id = e.element.id }), t.ok = function () { e.ok() }, t.cancel = function () { e.cancel() }
        }, didReceiveAttrs: function () {
            var e = this
            this.get("modal").onShow = function () { Ember.run.next(function () { e.$("ul.services li:first-child").focus() }) }
        }, actions: {
            ok: function () { this.get("modal").hide() }, copyLinkToArticle: function () { this.send("ok"), this.get("copyLinkToArticleModal").show() }, twitter: function () {
                var e = this.get("article")
                this.get("exporters").twitter(e), this.send("ok")
            }, facebook: function () {
                var e = this.get("article")
                this.get("exporters").facebook(e), this.send("ok")
            }, linkedin: function () {
                var e = this.get("article")
                this.get("exporters").linkedin(e), this.send("ok")
            }, email: function () {
                var e = this.get("article")
                this.get("exporters").email(e), this.send("ok")
            }
        }
    })
}), define("browzine-web/components/share-modal/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "saccGSvX", block: '{"symbols":[],"statements":[[4,"bz-modal",null,[["modal"],[[20,["modal"]]]],{"statements":[[0,"  "],[6,"div"],[9,"class","bz-modal-title"],[7],[0,"\\n    "],[1,[25,"t",["journal.article.tools.social_share"],null],false],[0,"\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"class","bz-modal-content"],[7],[0,"\\n    "],[6,"ul"],[9,"class","services"],[7],[0,"\\n      "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","copyLinkToArticle"],null],null],[3,"action",[[19,0,[]],"copyLinkToArticle"]],[7],[0,"\\n        "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["journal.article.social_share_menu.copy"],null],false],[8],[0,"\\n      "],[8],[0,"\\n      "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","twitter"],null],null],[3,"action",[[19,0,[]],"twitter"]],[7],[0,"\\n        "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["untranslated.twitter"],null],false],[8],[0,"\\n      "],[8],[0,"\\n      "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","facebook"],null],null],[3,"action",[[19,0,[]],"facebook"]],[7],[0,"\\n        "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["untranslated.facebook"],null],false],[8],[0,"\\n      "],[8],[0,"\\n      "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","linkedin"],null],null],[3,"action",[[19,0,[]],"linkedin"]],[7],[0,"\\n        "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["untranslated.linkedin"],null],false],[8],[0,"\\n      "],[8],[0,"\\n      "],[6,"li"],[9,"tabindex","0"],[9,"class","service"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","email"],null],null],[3,"action",[[19,0,[]],"email"]],[7],[0,"\\n        "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["journal.article.social_share_menu.email"],null],false],[8],[0,"\\n      "],[8],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"class","bz-modal-footer"],[7],[0,"\\n    "],[6,"span"],[9,"tabindex","0"],[9,"class","button primary tabindex"],[10,"onclick",[25,"action",[[19,0,[]],"ok"],null],null],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","ok"],null],null],[7],[0,"\\n      "],[1,[25,"t",["settings.close_button"],null],false],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/share-modal/template.hbs" } }) }), define("browzine-web/components/skip-navigation-link/component", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({
        classNames: ["skip-navigation-link"], skipLinkActived: !1, skipLinkActivedFromBackButton: !1, didInsertElement: function () { this._super.apply(this, arguments), Ember.testing || (Ember.$(".tabs.links .library-home-link").on("focusout", this.openSkipLink.bind(this)), Ember.$(".tabs.links .my-articles-link").on("focusout", this.disableSkipLink.bind(this)), Ember.$(document).on("focusout", ".back-button a", this.openSkipLink.bind(this)), Ember.$(document).on("click", this.clickedOnPage.bind(this)), Ember.$(document).on("focusout", "a.scimago-rank", this.disableSkipLink.bind(this)), Ember.$(".skip-navigation-link a").on("focusout", this.deactivateSkipLink.bind(this))) }, willDestroyElement: function () { this._super.apply(this, arguments), this.deactivateSkipLink() }, clickedOnPage: function () { this.set("skipLinkActivedFromBackButton", !1) }, openSkipLink: function (e) {
            var t = this
            Ember.run.next(function () {
                if (Ember.$(".journal-toc").length > 0 && !t.get("skipLinkActived") && !t.get("skipLinkActivedFromBackButton")) {
                    var n = Ember.$(".skip-navigation-link")
                    n.css("display", "block"), n.find("a").focus(), e.relatedTarget && e.relatedTarget.classList.contains("scimago-rank") && t.set("skipLinkActivedFromBackButton", !0)
                }
            })
        }, disableSkipLink: function () { this.set("skipLinkActived", !1) }, deactivateSkipLink: function () { this.send("closeSkipLink") }, actions: { closeSkipLink: function () { Ember.$(".skip-navigation-link").css("display", "none"), this.set("skipLinkActived", !0) } }
    })
}), define("browzine-web/components/skip-navigation-link/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "il7gA/yH", block: '{"symbols":[],"statements":[[6,"a"],[9,"tabindex","0"],[10,"aria-label",[26,[[25,"t",["library.skip_to_main_content"],null]]]],[9,"href","#main-content"],[10,"onClick",[25,"action",[[19,0,[]],"closeSkipLink"],null],null],[7],[0,"\\n  "],[6,"span"],[7],[1,[25,"t",["library.skip_to_main_content"],null],false],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/skip-navigation-link/template.hbs" } }) }), define("browzine-web/components/splash-panel/component", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({
        classNames: ["splash-panel"], classNameBindings: ["hide-header"], header: Ember.inject.service(), customizations: Ember.inject.service(), applicationSession: Ember.inject.service(), customStyle: Ember.computed("applicationSession.selectedLibrary", function () {
            var e = this.get("customizations").getCustomStyle()
            return Ember.String.htmlSafe(e)
        })
    })
}), define("browzine-web/components/splash-panel/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "jcqmNOB2", block: '{"symbols":["&default"],"statements":[[4,"unless",[[20,["hide-header"]]],null,{"statements":[[0,"  "],[6,"nav"],[9,"id","intro-header"],[9,"class","screen-header"],[7],[0,"\\n"],[4,"if",[[25,"and",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null],[25,"not",[[20,["forceDesktopHeader"]]],null]],null]],null,{"statements":[[0,"      "],[6,"ul"],[9,"class","mobile-header"],[7],[0,"\\n        "],[6,"li"],[9,"class","details"],[7],[6,"span"],[9,"class","subject"],[7],[1,[20,["header","subject","value"]],false],[8],[0," "],[6,"span"],[9,"class","title"],[7],[1,[20,["header","title","value"]],false],[8],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"      "],[6,"ul"],[9,"class","tabs"],[7],[0,"\\n        "],[6,"li"],[7],[6,"a"],[9,"id","browzine-link"],[9,"class","active"],[9,"href","/"],[7],[1,[25,"t",["untranslated.browzine"],null],false],[8],[8],[0,"\\n      "],[8],[0,"\\n\\n      "],[6,"div"],[9,"class","items links"],[7],[0,"\\n        "],[6,"section"],[10,"aria-label",[26,[[25,"t",["accessibility.help_link"],null]]]],[9,"class","help-link help"],[7],[0,"\\n          "],[1,[25,"help-link",null,[["label","icon"],["","help-2"]]],false],[0,"\\n        "],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]}],[0,"  "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[6,"div"],[9,"class","content"],[7],[0,"\\n  "],[11,1],[0,"\\n"],[8],[0,"\\n\\n"],[4,"unless",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[0,"  "],[6,"div"],[9,"class","banner"],[10,"style",[18,"customStyle"],null],[7],[0,"\\n    "],[6,"div"],[9,"class","shadow-top"],[7],[8],[0,"\\n    "],[6,"div"],[9,"class","shadow-bottom"],[7],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/splash-panel/template.hbs" } }) }), define("browzine-web/components/sso-login/component", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({
        didReceiveAttrs: function () {
            var e = this.get("auto"), t = this.get("disableRedirect")
            e && !t && this.sendAction("onContinue")
        }, actions: { continue: function () { return this.sendAction("onContinue") } }
    })
}), define("browzine-web/components/sso-login/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "1VUWllpc", block: '{"symbols":[],"statements":[[6,"div"],[9,"class","sso-login-library-panel splash-panel-message"],[7],[0,"\\n  "],[6,"header"],[9,"class","library-metadata"],[7],[0,"\\n    "],[6,"div"],[7],[0,"\\n      "],[1,[25,"library-logo",null,[["library"],[[20,["library"]]]]],false],[0,"\\n"],[4,"unless",[[20,["library","logoHasLibraryName"]]],null,{"statements":[[0,"        "],[6,"span"],[9,"class","name"],[10,"title",[26,[[20,["library","name"]]]]],[7],[1,[20,["library","name"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"    "],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"div"],[9,"class","message-card"],[7],[0,"\\n    "],[6,"p"],[9,"class","message-title"],[7],[1,[25,"t",["sso_auth.sso_authentication"],null],false],[8],[0,"\\n"],[4,"unless",[[20,["auto"]]],null,{"statements":[[0,"      "],[6,"p"],[9,"class","message-description"],[7],[0,"\\n        "],[1,[25,"t",["sso_auth.sso_auth_message"],null],false],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"      "],[6,"p"],[9,"class","message-description"],[7],[0,"\\n        "],[1,[25,"t",["sso_auth.sso_auto_auth_message"],null],false],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]}],[0,"  "],[8],[0,"\\n\\n"],[4,"unless",[[20,["auto"]]],null,{"statements":[[0,"    "],[6,"div"],[9,"class","button-bar"],[7],[0,"\\n      "],[6,"button"],[9,"class","button primary continue"],[3,"action",[[19,0,[]],"continue"]],[7],[1,[25,"t",["sso_auth.continue_button"],null],false],[8],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[]},null],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/sso-login/template.hbs" } }) }), define("browzine-web/components/track-clicks/component", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({
        category: null, action: null, label: null, value: null, exceptWhen: null, analytics: Ember.inject.service(), didInsertElement: function () { var e = this; (this.get("trackedElement") ? this.$(this.get("trackedElement")) : this.$()).on("click", function () { e.get("exceptWhen") || Ember.run(e, e.sendAnalyticsEvent) }) }, sendAnalyticsEvent: function () {
            var e, t = (e = regeneratorRuntime.mark(function e() {
                var t
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return t = this.getProperties("category", "action", "label", "value"), e.next = 3, this.get("analytics").recordEvent(t)
                        case 3: case "end": return e.stop()
                    }
                }, e, this)
            }), function () {
                var t = e.apply(this, arguments)
                return new Promise(function (e, n) {
                    return function r(i, a) {
                        try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        e(o)
                    }("next")
                })
            })
            return function () { return t.apply(this, arguments) }
        }()
    })
}), define("browzine-web/components/unread-badge/component", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({ classNames: "unread-badge", maximum: 999, aboveMaximum: Ember.computed.gt("count", 999), singular: Ember.computed.equal("count", 1), align: "left" }) }), define("browzine-web/components/unread-badge/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "9Vow0weJ", block: '{"symbols":[],"statements":[[4,"if",[[20,["count"]]],null,{"statements":[[0,"  "],[6,"div"],[9,"tabindex","0"],[10,"class",[26,["unread badge corner-element ",[18,"align"]]]],[10,"title",[26,[[25,"t",["unread_badge_title"],[["count"],[[20,["count"]]]]]]]],[7],[0,"\\n    "],[6,"span"],[7],[4,"if",[[20,["aboveMaximum"]]],null,{"statements":[[1,[18,"maximum"],false],[0,"+"]],"parameters":[]},{"statements":[[1,[18,"count"],false]],"parameters":[]}],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/components/unread-badge/template.hbs" } }) }), define("browzine-web/components/user-bps-auth/component", ["exports", "ember-intl"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({
        classNames: ["user-bps-auth"], auth: Ember.inject.service(), errorReporter: Ember.inject.service("error-reporter"), inProgress: !1, unknownError: Ember.computed("error", function () { return "unknown" === this.get("error") }), outsideRangeError: Ember.computed("error", function () { return "outsideRange" === this.get("error") }), submitButtonAriaLabel: (0, t.intl)("inProgress", function (e) { return this.get("inProgress") ? e.t("bps_auth.activate_bps_in_progress") : e.t("bps_auth.activate_bps") }), submitEmailButtonAriaLabel: (0, t.intl)("emailInProgress", function (e) { return this.get("emailInProgress") ? e.t("bps_auth.activate_via_email_sending_email") : e.t("bps_auth.activate_via_email") }), bpsTokenData: null, init: function () { this._super.apply(this, arguments), this.send("authenticateBps", this.get("libraryId")) }, actions: {
            authenticateBps: function (e) {
                var t = this, n = this.get("auth")
                return this.set("error", null), this.set("inProgress", !0), this.set("emailSent", !1), n.authenticateBps(e).then(function (e) { t.get("check") ? t.sendAction("onAuthSuccess", e) : (t.set("bpsTokenData", e), t.set("bpsConfirmed", !0)) }).catch(function (e) { "403" === e.status ? t.set("error", "outsideRange") : (t.set("error", "unknown"), t.get("errorReporter").reportUnknownError("error authenticating BPS", e)) }).finally(function () { return t.set("inProgress", !1) })
            }, sendBpsEmail: function (e) {
                var t = this
                return this.set("error", null), this.set("emailInProgress", !0), this.get("auth").sendBpsEmail(e).then(function (e) {
                    var n = e.sentTo
                    t.set("emailSent", !0), t.set("emailSentTo", n)
                }).catch(function (e) { t.set("error", "unknown"), t.get("errorReporter").reportUnknownError("error authenticating BPS", e) }).finally(function () { return t.set("emailInProgress", !1) })
            }, sendAuthSuccess: function () {
                var e = this.get("bpsTokenData")
                this.sendAction("onAuthSuccess", e)
            }
        }
    })
}), define("browzine-web/components/user-bps-auth/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "TINRE3uJ", block: '{"symbols":[],"statements":[[6,"div"],[9,"class","auth-form"],[7],[0,"\\n  "],[1,[18,"browzine-logo"],false],[0,"\\n\\n  "],[6,"h1"],[9,"tabindex","0"],[7],[1,[25,"t",["bps_auth.authorize_this_device"],null],false],[8],[0,"\\n\\n"],[4,"if",[[20,["inProgress"]]],null,{"statements":[[0,"    "],[6,"div"],[9,"tabindex","0"],[7],[1,[25,"t",["bps_auth.bps_authorizing_message"],null],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["outsideRangeError"]]],null,{"statements":[[0,"    "],[6,"div"],[9,"tabindex","0"],[9,"id","bps-message"],[7],[0,"\\n      "],[6,"p"],[7],[1,[25,"t",["bps_auth.bps_outside_range_error"],null],false],[8],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["unknownError"]]],null,{"statements":[[0,"    "],[6,"div"],[9,"tabindex","0"],[9,"id","bps-message"],[7],[0,"\\n      "],[6,"p"],[7],[1,[25,"t",["bps_auth.bps_unknown_error_1"],null],false],[8],[0,"\\n      "],[6,"p"],[7],[1,[25,"t",["bps_auth.bps_unknown_error_2"],null],false],[8],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n\\n"],[4,"if",[[20,["emailSent"]]],null,{"statements":[[0,"    "],[6,"div"],[9,"tabindex","0"],[9,"id","bps-message"],[7],[0,"\\n      "],[6,"p"],[7],[1,[25,"t",["bps_auth.bps_email_sent_message"],[["emailSentTo"],[[20,["emailSentTo"]]]]],false],[8],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["bpsConfirmed"]]],null,{"statements":[[0,"     "],[6,"div"],[9,"tabindex","0"],[9,"id","bps-message"],[7],[0,"\\n       "],[6,"strong"],[7],[1,[25,"t",["bps_auth.bps_confirmed_message_1"],null],false],[8],[0,"\\n     "],[8],[0,"\\n"],[4,"if",[[20,["showContinueButton"]]],null,{"statements":[[0,"      "],[6,"button"],[9,"id","bps-continue"],[9,"class","button primary"],[10,"aria-label",[26,[[25,"t",["auth.continue"],null]]]],[3,"action",[[19,0,[]],"sendAuthSuccess"]],[7],[0,"\\n        "],[1,[25,"t",["auth.continue"],null],false],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"      "],[6,"div"],[9,"tabindex","0"],[7],[1,[25,"t",["bps_auth.bps_confirmed_message_2"],null],false],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[0,"    "],[6,"button"],[9,"id","submit-bps"],[9,"class","button primary"],[10,"aria-label",[26,[[18,"submitButtonAriaLabel"]]]],[3,"action",[[19,0,[]],"authenticateBps",[20,["libraryId"]]]],[7],[0,"\\n"],[4,"if",[[20,["inProgress"]]],null,{"statements":[[0,"        "],[1,[25,"loading-indicator",null,[["white","inline","smaller"],[true,true,true]]],false],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["emailSent"]]],null,{"statements":[[0,"        "],[6,"p"],[7],[1,[25,"t",["bps_auth.tap_here_after_you_authorize"],[["htmlSafe"],[true]]],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[6,"p"],[7],[1,[25,"t",["bps_auth.tap_here_when_on_your_library"],null],false],[8],[0,"\\n      "]],"parameters":[]}]],"parameters":[]}],[0,"    "],[8],[0,"\\n\\n\\n    "],[6,"button"],[9,"id","submit-bps-email"],[9,"class","button"],[10,"aria-label",[26,[[18,"submitEmailButtonAriaLabel"]]]],[3,"action",[[19,0,[]],"sendBpsEmail",[20,["libraryId"]]]],[7],[0,"\\n"],[4,"if",[[20,["emailInProgress"]]],null,{"statements":[[0,"        "],[1,[25,"loading-indicator",null,[["white","inline","smaller"],[true,true,true]]],false],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["emailSent"]]],null,{"statements":[[0,"        "],[6,"p"],[7],[1,[25,"t",["bps_auth.tap_here_to_resend_auth_email"],null],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[6,"p"],[7],[1,[25,"t",["bps_auth.tap_here_to_receive_auth_email_1"],null],false],[8],[0,"\\n        "],[6,"p"],[7],[6,"strong"],[7],[1,[25,"t",["bps_auth.tap_here_to_receive_auth_email_2"],null],false],[8],[8],[0,"\\n      "]],"parameters":[]}]],"parameters":[]}],[0,"    "],[8],[0,"\\n\\n    "],[6,"button"],[9,"id","email-support"],[9,"class","button"],[10,"aria-label",[26,[[25,"t",["bps_auth.visit_third_iron_support"],null]]]],[7],[0,"\\n      "],[6,"p"],[7],[1,[25,"t",["bps_auth.authorize_by_sending_support_email"],[["htmlSafe"],[true]]],false],[8],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[]}],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/user-bps-auth/template.hbs" } }) }), define("browzine-web/components/user-login/component", ["exports", "browzine-web/mixins/error-helpers", "ember-intl"], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend(t.default, {
        classNames: ["user-login"], auth: Ember.inject.service(), errorReporter: Ember.inject.service("error-reporter"), intl: Ember.inject.service(), inProgress: !1, deviceId: null, userToken: null, email: null, password: null, emailInputAriaLabel: (0, n.t)("auth.login_email_input_aria_label"), passwordInputLabel: (0, n.t)("auth.login_password_input_label"), forgotPasswordLinkText: (0, n.t)("auth.login_forgot_password_link_text"), forgotPasswordLinkAriaLabel: (0, n.t)("auth.login_forgot_password_link_aria_label"), submitButtonAriaLabel: (0, n.intl)("inProgress", function (e) { return this.get("inProgress") ? e.t("auth.login_submit_button_aria_label_in_progress") : e.t("auth.login_submit_button_aria_label") }), noAccountMessageSignUpLinkText: (0, n.t)("auth.login_no_account_sign_up_link_text"), noAccountMessageSignUpLinkAriaLabel: (0, n.t)("auth.login_no_account_sign_up_link_aria_label"), init: function () { this._super.apply(this, arguments), this.send("authenticateExistingUser") }, _performLoginWithToken: function (e) {
            var t = this
            return this.set("error", null), this.set("inProgress", !0), this.get("auth").authenticateWithUserToken(e).then(function () { return t.sendAction("onLoggedIn") }).catch(function (e) {
                var n = t.getErrorObjectFromErrorResponse(e)
                console.log("Error while attempting to login with token: " + n.userDetail), t.set("error", t.get("intl").t("auth.login_form_token_generic_error_message"))
            }).finally(function () { return t.set("inProgress", !1) })
        }, _performLoginWithCredentials: function (e, t, n) {
            var r = this, i = this.getProperties("errorReporter", "auth"), a = i.errorReporter, s = i.auth
            return this.set("error", null), this.set("inProgress", !0), s.authenticateUser(e, t).then(function () { return r.sendAction("onLoggedIn") }).catch(function (i) {
                var o = r.getErrorObjectFromErrorResponse(i)
                if (o.userData && o.userData.confirmationRequired) return r.set("error", r.get("intl").t("auth.login_form_needs_confirmation_error_message", { email: e })), s.signUpUser(e, t, n).then(function (n) { return s.awaitSignupConfirmationAndAuthenticate(n.id, e, t) }).then(function () { return r.sendAction("onLoggedIn") })
                o.userData && "bad_credentials" === o.userData.code ? r.set("error", r.get("intl").t("auth.login_form_bad_credentials_error_message")) : (r.set("error", r.get("intl").t("auth.login_form_credentials_generic_error_message")), a.reportUnknownError("error authenticating " + e, o))
            }).finally(function () { return r.set("inProgress", !1) })
        }, actions: {
            authenticateExistingUser: function () {
                var e = this.get("userToken")
                if (e) return this._performLoginWithToken(e)
            }, performLogin: function () {
                var e = this.get("email"), t = this.get("password"), n = this.get("deviceId")
                return this._performLoginWithCredentials(e, t, n)
            }
        }
    })
}), define("browzine-web/components/user-login/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "nX236/1f", block: '{"symbols":[],"statements":[[6,"div"],[9,"class","auth-form"],[7],[0,"\\n  "],[1,[18,"browzine-logo"],false],[0,"\\n\\n  "],[6,"h1"],[9,"tabindex","0"],[7],[1,[25,"t",["auth.login_heading"],null],false],[8],[0,"\\n\\n"],[4,"if",[[20,["showBpsMessage"]]],null,{"statements":[[0,"    "],[6,"section"],[9,"tabindex","0"],[9,"id","bps-message"],[9,"class","instructions"],[7],[0,"\\n      "],[1,[25,"t",["auth.login_bps_message_line_one"],null],false],[0,"\\n      "],[6,"br"],[7],[8],[0,"\\n      "],[1,[25,"t",["auth.login_bps_message_line_two"],null],false],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["loginRequired"]]],null,{"statements":[[0,"    "],[6,"section"],[9,"tabindex","0"],[9,"id","login-required-message"],[9,"class","instructions"],[7],[0,"\\n      "],[1,[25,"t",["auth.login_login_required_message"],null],false],[0," \\n    "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n  "],[6,"section"],[10,"aria-label",[26,[[25,"t",["auth.login_email_section_label"],null]]]],[7],[0,"\\n    "],[6,"label"],[9,"for","email"],[7],[1,[25,"t",["auth.login_email_input_label"],null],false],[8],[0,"\\n    "],[1,[25,"focusable-input",null,[["autocomplete","aria-label","type","id","label","value","insert-newline"],["email",[20,["emailInputAriaLabel"]],"email","email",[20,["emailInputLabelAttribute"]],[20,["email"]],[25,"action",[[19,0,[]],"performLogin"],null]]]],false],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"section"],[9,"class","reversed"],[10,"aria-label",[26,[[25,"t",["auth.login_password_section_label"],null]]]],[7],[0,"\\n    "],[1,[25,"input",null,[["autocomplete","aria-label","id","type","value","insert-newline"],["password",[20,["passwordInputLabel"]],"password","password",[20,["password"]],[25,"action",[[19,0,[]],"performLogin"],null]]]],false],[0,"\\n    "],[6,"div"],[9,"class","dual-label"],[7],[0,"\\n      "],[6,"label"],[9,"for","password"],[7],[1,[25,"t",["auth.login_password_input_label"],null],false],[8],[0,"\\n      "],[4,"link-to",["auth.reset"],[["aria-label"],[[20,["forgotPasswordLinkAriaLabel"]]]],{"statements":[[1,[18,"forgotPasswordLinkText"],false]],"parameters":[]},null],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n\\n"],[4,"if",[[20,["error"]]],null,{"statements":[[0,"  "],[6,"section"],[10,"aria-label",[26,[[25,"t",["auth.login_error_label"],null]]]],[7],[0,"\\n      "],[6,"span"],[9,"id","error"],[7],[0,"\\n        "],[1,[18,"error"],false],[0,"\\n      "],[8],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n  "],[6,"button"],[9,"id","submit-login"],[9,"class","button primary"],[10,"aria-label",[26,[[18,"submitButtonAriaLabel"]]]],[3,"action",[[19,0,[]],"performLogin"]],[7],[0,"\\n"],[4,"if",[[20,["inProgress"]]],null,{"statements":[[0,"      "],[1,[25,"loading-indicator",null,[["white","inline","smaller"],[true,true,true]]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"      "],[1,[25,"t",["auth.login_submit_button_text"],null],false],[0,"\\n"]],"parameters":[]}],[0,"  "],[8],[0,"\\n\\n  "],[6,"section"],[7],[0,"\\n    "],[1,[25,"t",["auth.login_no_account_message_part_one"],null],false],[0," "],[4,"link-to",["auth.signup"],[["id","aria-label"],["login-sign-up",[20,["noAccountMessageSignUpLinkAriaLabel"]]]],{"statements":[[1,[18,"noAccountMessageSignUpLinkText"],false]],"parameters":[]},null],[0," "],[1,[25,"t",["auth.login_no_account_message_part_two"],null],false],[0,"\\n  "],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/user-login/template.hbs" } }) })
define("browzine-web/components/user-signup/component", ["exports", "browzine-web/config/environment", "ember-intl"], function (e, t, n) {
    function r(e) {
        return function () {
            var t = e.apply(this, arguments)
            return new Promise(function (e, n) {
                return function r(i, a) {
                    try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                    e(o)
                }("next")
            })
        }
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({
        classNames: ["user-signup"], auth: Ember.inject.service(), errorReporter: Ember.inject.service(), analytics: Ember.inject.service(), applicationSession: Ember.inject.service(), intl: Ember.inject.service(), userAgent: Ember.inject.service("user-agent"), inProgress: !1, focusEmail: Ember.computed("addPassword", function () { return !this.get("addPassword") }), focusPassword: Ember.computed.alias("addPassword"), emailInputLabel: (0, n.t)("auth.signup_email_input_label"), passwordInputLabel: (0, n.t)("auth.signup_password_input_label"), passwordConfirmationInputLabel: (0, n.t)("auth.signup_password_confirmation_input_label"), forgotPasswordLinkText: (0, n.t)("auth.signup_forgot_password_link_text"), forgotPasswordLinkLabel: (0, n.t)("auth.signup_forgot_password_link_label"), submitButtonLabel: (0, n.intl)("inProgress", function (e) { return this.get("inProgress") ? e.t("auth.signup_submit_button_label_in_progress") : e.t("auth.signup_submit_button_label") }), email: null, addPassword: null, showBpsMessage: null, loginRequired: null, returnRoute: null, deviceId: null, certified: !1, consentToEmailNotifications: !1, disabled: "disabled", init: function () {
            var e = r(regeneratorRuntime.mark(function e() {
                var t, n, r = arguments
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return this._super.apply(this, r), t = this.get("analytics"), n = this.get("applicationSession"), e.next = 5, t.recordEvent({ category: "AccountSignup", action: "BzAccountNewlyConsidered", label: this.get("userAgent.platform"), value: n.get("selectedLibrary") || "no-selected-library" })
                        case 5: case "end": return e.stop()
                    }
                }, e, this)
            }))
            return function () { return e.apply(this, arguments) }
        }(), certifiedChanged: Ember.observer("certified", function () { this.get("certified") ? this.set("disabled", "") : this.set("disabled", "disabled") }), showEmailNotificationsFeatures: Ember.computed(function () { return t.default.APP.showEmailNotificationsFeatures }), getErrorMessageForCode: function (e) {
            var t = this.get("intl")
            return "missing_email" === e ? t.t("auth.signup_missing_email_error_message") : "malformed_email" === e ? t.t("auth.signup_invalid_email_error_message") : "password_too_short" === e ? t.t("auth.password_too_short_validation_message") : "user_already_exists" === e ? t.t("auth.signup_user_already_exists_error_message") : void 0
        }, checkEmailConfirmed: function () {
            var e = this
            this.set("inProgress", !1)
            var t = this.getProperties("signupCreated", "auth", "email", "password", "errorReporter"), n = t.signupCreated, r = t.email, i = t.password, a = t.auth, s = t.errorReporter
            return a.awaitSignupConfirmationAndAuthenticate(n.id, r, i).then(function () { e.set("signupConfirmed", !0) }).catch(function (t) {
                if (t.userDetail) if (t.userData && t.userData.code) {
                    var n = e.getErrorMessageForCode(t.userData.code)
                    n || (n = e.get("intl").t("auth.signup_unknown_error_while_authenticating_error_message")), e.set("error", n)
                } else e.set("error", t.userDetail)
                else e.set("error", e.get("intl").t("auth.signup_unknown_error_while_authenticating_error_message")), s.reportUnknownError("error authenticating " + r, t)
            })
        }, actions: {
            onLoggedIn: null, performSignup: function () {
                var e = this, t = this.getProperties("email", "password", "deviceId", "passwordConfirm", "auth", "showBpsMessage", "analytics", "applicationSession", "certified", "consentToEmailNotifications"), n = t.email, i = t.password, a = t.deviceId, s = t.passwordConfirm, o = t.auth, l = t.showBpsMessage, u = t.analytics, c = t.applicationSession, d = t.certified, m = t.consentToEmailNotifications
                if (this.set("error", null), this.set("maybeForgot", null), !n || !n.length || n.indexOf("@") < 0) this.set("error", this.get("intl").t("auth.signup_invalid_email_error_message"))
                else {
                    var b = o.validatePassword(i, s), f = b.valid, p = b.validationErrorMessage
                    if (f) {
                        var h
                        if (d) return this.set("inProgress", !0), o.signUpUser(n, i, m, a, !!l).then((h = r(regeneratorRuntime.mark(function t(n) {
                            return regeneratorRuntime.wrap(function (t) {
                                for (; ;)switch (t.prev = t.next) {
                                    case 0: return e.set("signupCreated", n), t.next = 3, u.recordEvent({ category: "AccountSignup", action: "BzAccountCreated", label: e.get("userAgent.platform"), value: c.get("selectedLibrary") || "no-selected-library" })
                                    case 3: case "end": return t.stop()
                                }
                            }, t, e)
                        })), function (e) { return h.apply(this, arguments) })).then(function () { return e.checkEmailConfirmed() }).catch(function (t) {
                            if (t.code) {
                                var n = e.getErrorMessageForCode(t.code)
                                n || (n = e.get("intl").t("auth.signup_unknown_error_during_signup_error_message")), e.set("error", n), "user_already_exists" === t.code && e.set("maybeForgot", !0)
                            } else console.log(t.message), e.set("error", e.get("intl").t("auth.signup_unknown_error_during_signup_error_message"))
                        }).finally(function () { return e.set("inProgress", !1) })
                        this.set("error", this.get("intl").t("auth.signup_missing_privacy_policy_agreement_error_message"))
                    } else this.set("error", p)
                }
            }, continue: function () { this.sendAction("onLoggedIn") }
        }
    })
}), define("browzine-web/components/user-signup/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "qJcWeq7E", block: '{"symbols":[],"statements":[[6,"div"],[9,"class","auth-form"],[7],[0,"\\n  "],[1,[18,"browzine-logo"],false],[0,"\\n\\n  "],[6,"h1"],[9,"tabindex","0"],[7],[1,[25,"t",["auth.signup_heading"],null],false],[8],[0,"\\n\\n"],[4,"if",[[20,["signupConfirmed"]]],null,{"statements":[[0,"    "],[6,"section"],[9,"tabindex","0"],[7],[0,"\\n      "],[6,"span"],[9,"class","signup-message"],[7],[1,[25,"t",["auth.signup_confirmation_message"],[["email","htmlSafe"],[[20,["email"]],true]]],false],[8],[0,"\\n    "],[8],[0,"\\n\\n    "],[6,"button"],[9,"class","button primary"],[3,"action",[[19,0,[]],"continue"]],[7],[0,"\\n      "],[1,[25,"t",["auth.signup_confirmed_continue_button_text"],null],false],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["signupCreated"]]],null,{"statements":[[4,"if",[[20,["error"]]],null,{"statements":[[0,"      "],[6,"section"],[10,"aria-label",[26,[[25,"t",["auth.signup_error_label"],null]]]],[7],[0,"\\n        "],[6,"span"],[9,"id","signup-error"],[7],[0,"\\n          "],[1,[18,"error"],false],[0,"\\n        "],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"      "],[6,"section"],[9,"tabindex","0"],[7],[0,"\\n        "],[6,"span"],[9,"class","signup-message"],[7],[1,[25,"t",["auth.signup_message_line_one"],[["email"],[[20,["email"]]]]],false],[8],[0,"\\n        "],[6,"p"],[9,"class","notice-message"],[7],[1,[25,"t",["auth.signup_message_line_two"],null],false],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[4,"if",[[20,["showBpsMessage"]]],null,{"statements":[[0,"      "],[6,"section"],[9,"tabindex","0"],[9,"id","bps-message"],[9,"class","instructions"],[7],[0,"\\n        "],[1,[25,"t",["auth.signup_bps_message_line_one"],null],false],[0,"\\n        "],[6,"br"],[7],[8],[0,"\\n        "],[1,[25,"t",["auth.signup_bps_message_line_two"],null],false],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["loginRequired"]]],null,{"statements":[[0,"      "],[6,"section"],[9,"tabindex","0"],[9,"id","login-required-message"],[9,"class","instructions"],[7],[0,"\\n        "],[1,[25,"t",["auth.signup_login_required_message"],null],false],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["addPassword"]]],null,{"statements":[[0,"      "],[6,"section"],[9,"tabindex","0"],[9,"id","signup-instructions"],[9,"class","instructions success"],[7],[0,"\\n        "],[1,[25,"t",["auth.signup_add_password_message"],null],false],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n    "],[6,"section"],[10,"aria-label",[26,[[25,"t",["auth.signup_email_section_label"],null]]]],[7],[0,"\\n      "],[6,"label"],[9,"for","email"],[7],[1,[25,"t",["auth.signup_email_input_label"],null],false],[8],[0,"\\n      "],[1,[25,"focusable-input",null,[["autocomplete","aria-label","id","type","label","value","autofocusIfAvailable","insert-newline"],["email","Email","email","email",[20,["emailInputLabel"]],[20,["email"]],[20,["focusEmail"]],[25,"action",[[19,0,[]],"performSignup"],null]]]],false],[0,"\\n    "],[8],[0,"\\n\\n    "],[6,"section"],[10,"aria-label",[26,[[25,"t",["auth.signup_password_section_label"],null]]]],[7],[0,"\\n      "],[6,"label"],[9,"for","password"],[7],[1,[25,"t",["auth.signup_password_input_label"],null],false],[8],[0,"\\n      "],[1,[25,"focusable-input",null,[["autocomplete","aria-label","id","type","value","autofocusIfAvailable","insert-newline"],["password",[20,["passwordInputLabel"]],"password","password",[20,["password"]],[20,["focusPassword"]],[25,"action",[[19,0,[]],"performSignup"],null]]]],false],[0,"\\n    "],[8],[0,"\\n\\n    "],[6,"section"],[10,"aria-label",[26,[[25,"t",["auth.signup_password_confirmation_section_label"],null]]]],[7],[0,"\\n      "],[6,"label"],[9,"for","password-confirm"],[7],[1,[25,"t",["auth.signup_password_confirmation_input_label"],null],false],[8],[0,"\\n      "],[1,[25,"input",null,[["autocomplete","aria-label","id","type","value","insert-newline"],["password",[20,["passwordConfirmationInputLabel"]],"password-confirm","password",[20,["passwordConfirm"]],[25,"action",[[19,0,[]],"performSignup"],null]]]],false],[0,"\\n    "],[8],[0,"\\n\\n"],[4,"if",[[20,["error"]]],null,{"statements":[[0,"      "],[6,"section"],[10,"aria-label",[26,[[25,"t",["auth.signup_error_label"],null]]]],[7],[0,"\\n        "],[6,"span"],[9,"tabindex","0"],[9,"id","signup-error"],[7],[0,"\\n          "],[1,[18,"error"],false],[0,"\\n        "],[8],[0,"\\n"],[4,"if",[[20,["maybeForgot"]]],null,{"statements":[[0,"          "],[4,"link-to",["auth.reset"],[["aria-label"],[[20,["forgotPasswordLinkLabel"]]]],{"statements":[[1,[18,"forgotPasswordLinkText"],false]],"parameters":[]},null],[0,"\\n"]],"parameters":[]},null],[0,"      "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n    "],[6,"section"],[9,"id","privacy-policy-statement"],[10,"aria-label",[26,[[25,"t",["auth.signup_privacy_policy_section_label"],null]]]],[7],[0,"\\n      "],[6,"div"],[9,"class","privacy-policy-agreement-select"],[7],[0,"\\n        "],[1,[25,"input",null,[["type","id","role","aria-checked","checked","tabindex"],["checkbox","privacy-policy-agreement","checkbox",[20,["certified"]],[20,["certified"]],"0"]]],false],[0,"\\n      "],[8],[0,"\\n      "],[6,"div"],[9,"class","privacy-policy-agreement-statement-text"],[7],[0,"\\n        "],[6,"label"],[9,"for","privacy-policy-agreement"],[7],[6,"p"],[7],[1,[25,"t",["auth.signup_privacy_policy_agreement_statement"],[["htmlSafe"],[true]]],false],[8],[8],[0,"\\n      "],[8],[0,"\\n    "],[8],[0,"\\n\\n"],[4,"if",[[20,["showEmailNotificationsFeatures"]]],null,{"statements":[[0,"      "],[6,"section"],[9,"id","email-notifications-consent"],[10,"aria-label",[26,[[25,"t",["auth.signup_email_notifications_section_label"],null]]]],[7],[0,"\\n        "],[6,"div"],[9,"class","email-notifications-consent-select"],[7],[0,"\\n          "],[1,[25,"input",null,[["type","id","role","aria-checked","checked","tabindex"],["checkbox","consent-to-email-notifications","checkbox",[20,["consentToEmailNotifications"]],[20,["consentToEmailNotifications"]],"0"]]],false],[0,"\\n        "],[8],[0,"\\n        "],[6,"div"],[9,"class","email-notifications-label"],[7],[0,"\\n          "],[6,"label"],[9,"for","consent-to-email-notifications"],[7],[6,"p"],[7],[1,[25,"t",["auth.signup_email_notifications_consent_label"],[["htmlSafe"],[true]]],false],[8],[8],[0,"\\n        "],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n    "],[6,"button"],[9,"id","submit-signup"],[10,"class",[26,["button primary ",[18,"disabled"]]]],[10,"aria-label",[26,[[18,"submitButtonLabel"]]]],[3,"action",[[19,0,[]],"performSignup"]],[7],[0,"\\n"],[4,"if",[[20,["inProgress"]]],null,{"statements":[[0,"        "],[1,[25,"loading-indicator",null,[["white","inline","smaller"],[true,true,true]]],false],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["addPassword"]]],null,{"statements":[[0,"        "],[1,[25,"t",["auth.signup_continue_button_text"],null],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[1,[25,"t",["auth.signup_submit_button_text"],null],false],[0,"\\n      "]],"parameters":[]}]],"parameters":[]}],[0,"    "],[8],[0,"\\n  "]],"parameters":[]}]],"parameters":[]}],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/user-signup/template.hbs" } }) }), define("browzine-web/components/wayf-library-selector/component", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Component.extend({
        classNames: ["wayf-library-list"], applicationSession: Ember.inject.service(), auth: Ember.inject.service(), router: Ember.inject.service(), i18n: Ember.inject.service(), actions: {
            viewLibrary: function () {
                var e, t = (e = regeneratorRuntime.mark(function e(t) {
                    var n, r = this
                    return regeneratorRuntime.wrap(function (e) {
                        for (; ;)switch (e.prev = e.next) {
                            case 0: this.set("selectingLibrary", t.id), this.set("ipRangeError", void 0), n = this.get("applicationSession").get("transitionToRetryAfterAuth"), this.get("auth").authenticateLibrary({ libraryId: t.id }, n).then(function () { r.get("i18n").determineAndSetLocale(t), n ? n.retry() : r.get("router").transitionTo("library", t.id) }, function (e) { e && e.ipRangeError ? r.set("ipRangeError", e.ipRangeError) : r.get("router").transitionTo("token-failure", t.id) }).finally(function () { r.set("selectingLibrary", !1) })
                            case 4: case "end": return e.stop()
                        }
                    }, e, this)
                }), function () {
                    var t = e.apply(this, arguments)
                    return new Promise(function (e, n) {
                        return function r(i, a) {
                            try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                            e(o)
                        }("next")
                    })
                })
                return function (e) { return t.apply(this, arguments) }
            }()
        }
    })
}), define("browzine-web/components/wayf-library-selector/template", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "9PLkjp0I", block: '{"symbols":[],"statements":[[1,[25,"library-list",null,[["libraries","viewLibrary","selecting","selectedLibrary","ipRangeError"],[[20,["libraries"]],"viewLibrary",[20,["selectingLibrary"]],[20,["selectedLibrary"]],[20,["ipRangeError"]]]]],false],[0,"\\n\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/components/wayf-library-selector/template.hbs" } }) }), define("browzine-web/controllers/application", ["exports", "ember-intl"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Controller.extend({ localeClass: (0, t.intl)(function (e) { return "fr-fr" === e.get("primaryLocale") ? "locale-fr-fr" : "ja" === e.get("primaryLocale") ? "locale-ja" : "locale-en-us" }) }) }), define("browzine-web/controllers/article-wayf", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Controller.extend({ sorting: ["name"], libraries: Ember.computed.sort("model.libraries", "sorting"), queryParams: ["selectedLibrary"] }) }), define("browzine-web/controllers/article", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Controller.extend({ queryParams: ["disableRedirect"] }) }), define("browzine-web/controllers/issue-wayf", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Controller.extend({ sorting: ["name"], libraries: Ember.computed.sort("model.libraries", "sorting"), queryParams: ["selectedLibrary"] }) }), define("browzine-web/controllers/libraries", ["exports", "browzine-web/mixins/error-helpers"], function (e, t) {
    function n(e) {
        return function () {
            var t = e.apply(this, arguments)
            return new Promise(function (e, n) {
                return function r(i, a) {
                    try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                    e(o)
                }("next")
            })
        }
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Controller.extend(t.default, {
        sorting: ["name"], libraries: Ember.computed.sort("model", "sorting"), queryParams: ["selectedLibrary"], flashMessages: Ember.inject.service(), analytics: Ember.inject.service(), auth: Ember.inject.service(), applicationSession: Ember.inject.service(), i18n: Ember.inject.service(), ipRangeError: null, actions: {
            viewLibrary: function () {
                var e = n(regeneratorRuntime.mark(function e(t) {
                    var r, i, a = this
                    return regeneratorRuntime.wrap(function (e) {
                        for (; ;)switch (e.prev = e.next) {
                            case 0: return r = this.get("applicationSession"), e.next = 3, this.get("analytics").recordEvent({ category: "login_button_tapped", action: t.get("id"), label: t.get("name"), value: t.get("id") })
                            case 3: this.set("selectingLibrary", t.id), this.set("ipRangeError", void 0), i = r.get("transitionToRetryAfterAuth"), this.get("auth").authenticateLibrary({ libraryId: t.id, forceAuth: t.get("forceAuthAtFrontDoor") }, i).then(function () {
                                var e = n(regeneratorRuntime.mark(function e(n) {
                                    return regeneratorRuntime.wrap(function (e) {
                                        for (; ;)switch (e.prev = e.next) {
                                            case 0: if (r.set("selectedLibrary", t.id), a.get("i18n").determineAndSetLocale(t), !n || !n.updatedWindowLocation) {
                                                e.next = 4
                                                break
                                            } return e.abrupt("return")
                                            case 4: i ? i.retry() : a.transitionToRoute("library.subjects", t.id)
                                            case 5: case "end": return e.stop()
                                        }
                                    }, e, a)
                                }))
                                return function (t) { return e.apply(this, arguments) }
                            }(), function (e) {
                                var n = a.getErrorObjectFromErrorResponse(e)
                                n && n.ipRangeError ? a.set("ipRangeError", n.ipRangeError) : a.transitionToRoute("library.unavailable", t.id)
                            }).finally(function () { a.set("selectingLibrary", !1) })
                            case 7: case "end": return e.stop()
                        }
                    }, e, this)
                }))
                return function (t) { return e.apply(this, arguments) }
            }()
        }
    })
}), define("browzine-web/controllers/library", ["exports", "browzine-web/config/environment", "browzine-web/mixins/trigger-on-enter", "browzine-web/mixins/error-helpers"], function (e, t, n, r) {
    function i(e) {
        return function () {
            var t = e.apply(this, arguments)
            return new Promise(function (e, n) {
                return function r(i, a) {
                    try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                    e(o)
                }("next")
            })
        }
    } Object.defineProperty(e, "__esModule", { value: !0 })
    var a = t.default.apiBaseUrl
    e.default = Ember.Controller.extend(n.default, r.default, {
        analytics: Ember.inject.service(), auth: Ember.inject.service(), applicationSession: Ember.inject.service(), myBookshelf: Ember.inject.service(), unreads: Ember.inject.service(), header: Ember.inject.service(), router: Ember.inject.service(), a11y: Ember.inject.service(), intl: Ember.inject.service(), queryParams: ["filter", "searchVisible", "query", "storeQuery", "sort"], query: "", filter: "all", sort: "", storeQuery: !1, searchVisible: !1, searchResults: [], showResponsiveMenu: !1, init: function () {
            var e = this
            this._super.apply(this, arguments), this.get("router._routerMicrolib.state.fullQueryParams.searchVisible") && this.send("openSearch"), Ember.run.next(this, function () {
                var e = this
                Ember.$(".search-pane input").keypress(function (t) { if ((e.get("media.isDesktop") || e.get("media.isJumbo")) && 13 === t.which) { e.triggerSearchCall(0) } })
            })
            var t = function (t) { 27 === t.keyCode && Ember.run.next(function () { e.hideMenu() }) }
            Ember.$(document).on("keyup", t), this.set("handleKeyPress", t)
        }, didDestroyElement: function () { Ember.$(document).unbind("keyup", this.get("handleKeyPress")) }, breakpointChanged: Ember.observer("media.isDesktop", "media.isJumbo", function () { this.get("showResponsiveMenu") && this.hideMenu() }), headerSubject: Ember.computed("header.subject", "intl.primaryLocale", function () {
            var e = this.get("header.subject")
            return e.template ? this.get("intl").t(e.value) : e.value
        }), headerTitle: Ember.computed("header.title", "intl.primaryLocale", function () {
            var e = this.get("header.title")
            return e.template ? this.get("intl").t(e.value) : e.value
        }), hamburgerTitle: Ember.computed("showResponsiveMenu", "intl.primaryLocale", function () { return this.get("showResponsiveMenu") ? this.get("intl").t("library.header.hamburger_close") : this.get("intl").t("library.header.hamburger_open") }), searchTitle: Ember.computed("searchVisible", "intl.primaryLocale", function () { return this.get("searchVisible") ? this.get("intl").t("library.header.search_close") : this.get("intl").t("library.header.search_open") }), helpLabel: Ember.computed("intl.primaryLocale", function () { return this.get("intl").t("library.header.help") }), showLanguageChooser: Ember.computed("model.languagesSupported", "intl.primaryLocale", function () { return (this.get("model.languagesSupported") || "").split(",").length > 1 }), hideSubjects: Ember.computed("media.isMobile", "media.isTablet", "query", "searchIsComplete", function () {
            var e = !1
            return (this.get("media.isMobile") || this.get("media.isTablet")) && this.get("query") && this.get("searchIsComplete") && (e = !0), e
        }), sortSubjectsBy: Ember.computed("sort", function () {
            var e = this.get("sort")
            return "title" === e || "rank" === e ? e : "title"
        }), placeholder: Ember.computed("media.isMobile", "intl.primaryLocale", function () {
            var e = this.get("intl").t("search.placeholder.desktop")
            return this.get("media.isMobile") && (e = this.get("intl").t("search.placeholder.responsive")), e
        }), triggerSearch: Ember.observer("query", "model.id", function () {
            var e = this.get("query").length > 3 ? 450 : 1500
            this.triggerSearchCall(e)
        }), triggerSearchCall: function (e) { Ember.run.debounce(this, this.searchCall, e) }, searchCall: function () { this.get("model.id") && this.send("performSearch", this.get("query")) }, getPreviousSearches: function () { return this.store.findAll("search").then(function (e) { return e.sortBy("createdAt").reverseObjects() }) }, searchIsComplete: Ember.computed("query", "searchResults", "searchInProgress", "searchLowerLimit", function () {
            var e = this.get("query"), t = this.get("searchResults"), n = this.get("searchInProgress"), r = this.get("searchLowerLimit")
            return !Ember.isEmpty(e) && (!Ember.isEmpty(t) || !n && !r)
        }), recordGAEvent: function () {
            var e = i(regeneratorRuntime.mark(function e(t, n, r) {
                var i
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return i = n.length > 1 ? "many" : 1 === n.length ? n[0].title : "", e.next = 3, this.get("analytics").recordEvent({ category: r, action: t, label: i, value: "" })
                        case 3: case "end": return e.stop()
                    }
                }, e, this)
            }))
            return function (t, n, r) { return e.apply(this, arguments) }
        }(), libraryActiveOverride: Ember.computed("applicationController.currentRouteName", function () { return "library.subjects" !== this.get("applicationController.currentRouteName") ? "active-override" : "" }), hideSearch: Ember.computed("applicationController.currentRouteName", function () { return "library.subjects" === this.get("applicationController.currentRouteName") }), currentRoute: Ember.computed("applicationController.currentRouteName", function () { return this.get("applicationController.currentRouteName") }), _destroySearches: function (e) {
            return this.getPreviousSearches().then(function (t) {
                var n = Ember.RSVP.resolve(!0), r = t && t.filter(e)
                return r && r.length && r.forEach(function (e) { n = n.then(function () { return e.destroyRecord() }) }), n
            })
        }, noPersonalizationLibrary: Ember.computed.alias("model.noPersonalization"), responsiveMenuTransform: function (e, t) { Ember.$(".canvas").css("transform", e), Ember.$("#main-nav-check:checked ~ .canvas").css("transform", t) }, responsiveMenuScrollBars: function (e) { Ember.$("body").css("overflow-x", e), Ember.$("html").css("overflow-x", e), Ember.$("body").css("overflow-y", e), Ember.$("html").css("overflow-y", e) }, responsiveMenuScrollXBars: function (e) { Ember.$("body").css("overflow-x", e), Ember.$("html").css("overflow-x", e) }, responsiveMenuScrollYBars: function (e) { Ember.$("body").css("overflow-y", e), Ember.$("html").css("overflow-y", e) }, responsiveLibraryContentPointerEvents: function (e) { Ember.$("#library-content").css("pointer-events", e) }, showMenu: function () {
            var e = this.get("a11y")
            this.responsiveMenuTransform("transform .25s ease", "translate(80%, 0)"), this.responsiveMenuScrollBars("hidden"), this.responsiveMenuScrollYBars("visible"), this.responsiveLibraryContentPointerEvents("none"), this.set("showResponsiveMenu", !0), e.responsiveMenuFocus()
        }, hideMenu: function () {
            var e = this.get("a11y")
            this.responsiveMenuTransform("inherit", "inherit"), this.responsiveMenuScrollBars("visible"), this.responsiveLibraryContentPointerEvents("auto"), this.set("showResponsiveMenu", !1), e.responsiveMenuBlur()
        }, actions: {
            openSearch: function () {
                var e = this
                this.getPreviousSearches().then(function (t) {
                    var n = e.get("a11y")
                    e.set("previousSearches", t), e.set("searchVisible", !0), n.headerSearchFocus()
                })
            }, closeSearch: function () {
                var e = this.get("a11y")
                this.set("searchVisible", !1), e.headerSearchBlur()
            }, toggleSearch: function () { this.get("searchVisible") ? this.send("closeSearch") : this.send("openSearch") }, performSearch: function (e) {
                var t = this
                this.set("query", e), this.set("searchIsIssn", !1), this.set("searchIssnMsg", "")
                var n = (this.get("currSearchId") || 0) + 1
                this.set("currSearchId", n)
                var r = !1, s = e.replace(/-|–|—|\s|/g, "").trim()
                if (s.match(/^\d{5}/) && (r = !0, s.length < 8 ? this.set("searchIssnMsg", "Continue typing ISSN…") : s.length > 8 && this.set("searchIssnMsg", "ISSN is too long: 8 digits only please"), this.set("searchIsIssn", !0)), e.length <= 0) this.set("searchResults", []), this.set("searchLowerLimit", !0)
                else if (r && 8 !== s.length) this.set("searchResults", []), this.set("searchLowerLimit", !1)
                else if (Ember.isPresent(e) && (e.length > 0 && !r || 8 === s.length && r)) {
                    this.set("searchLowerLimit", !1), this.set("searchInProgress", !0)
                    var o = this.get("model.id")
                    Ember.$.ajax({ dataType: "json", headers: { Authorization: this.get("auth").getAPIAuthHeaderForLibrary(o) }, url: a + "/libraries/" + o + "/search?client=bzweb&query=" + encodeURIComponent(e) }).then(function (a) {
                        t.get("currSearchId") === n && Ember.run(i(regeneratorRuntime.mark(function n() {
                            var i
                            return regeneratorRuntime.wrap(function (n) {
                                for (; ;)switch (n.prev = n.next) {
                                    case 0: if (t.set("searchInProgress", !1), t.set("searchResults", a.data), !r) {
                                        n.next = 5
                                        break
                                    } return n.next = 5, t.recordGAEvent(e, a.data, "IssnSearchPerformed")
                                    case 5: i = Ember.get(a, "meta.externalSearchLocation"), t.set("externalSearchLocation", i)
                                    case 7: case "end": return n.stop()
                                }
                            }, n, t)
                        })))
                    }).fail(function (e) {
                        if (401 === e.status) {
                            var n = JSON.parse(e.responseText)
                            t.send("handleSearchError", t.interpretError(e.status, n))
                        } else Ember.run(function () { t.set("searchInProgress", !1) })
                        console.error(e.statusText)
                    })
                } else this.set("searchResults", []), this.set("searchLowerLimit", !1)
            }, clearHistory: function () {
                var e = this.get("previousSearches")
                this.set("previousSearches", []), e.invoke("destroyRecord")
            }, storePreviousSearch: function (e) {
                var t = this
                Ember.run.next(function () { t.set("query", ""), t.set("storeQuery", !1) }), window.queryLogLock !== e && (window.queryLogLock = e, this.store.findAll("search").then(function (t) {
                    var n = t.filterBy("query", e)
                    return n.setEach("createdAt", new Date), n.invoke("save")
                }).then(function () { return t._destroySearches(function (e, t) { return t >= 9 }) }).then(function () { return t._destroySearches(function (t) { return t.get("query") === e }) }).then(function () { return t.store.createRecord("search", { query: e }).save() }).then(function () { return t.getPreviousSearches().then(function (e) { t.set("previousSearches", e) }) }).then(function () { window.queryLogLock = void 0 }))
            }, logoutToLibraryList: function () {
                this.set("error", null)
                var e = this.get("applicationSession")
                e.clearLoggedInUser(), e.clearSelectedLibrary()
                var t = this.get("model")
                t.get("ssoEnabled") && t.get("ssoRequiredOnSite") && e.clearLibraryToken(t.get("id")), this.transitionToRoute("libraries")
            }, toggleMenu: function () {
                var e = this
                this.get("searchVisible") && this.send("closeSearch"), Ember.run(function () { e.get("showResponsiveMenu") ? e.hideMenu() : e.showMenu() })
            }, toggleMenuOnEnter: function () { Ember.$("#main-nav-check").click(), this.responsiveMenuScrollBars("visible") }, closeMenu: function () {
                var e = this
                Ember.run(function () { e.hideMenu() })
            }, refreshCurrentRoute: function () {
                var e = this.get("refreshCurrentRoute")
                e && e()
            }
        }
    })
}), define("browzine-web/controllers/library/journal", ["exports", "browzine-web/mixins/trigger-on-enter"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Controller.extend(t.default, {
        myBookshelf: Ember.inject.service(), myArticles: Ember.inject.service(), applicationSession: Ember.inject.service(), unreads: Ember.inject.service(), flashMessages: Ember.inject.service(), sync: Ember.inject.service(), header: Ember.inject.service(), windowOpen: Ember.inject.service(), init: function () {
            var e = this
            this._super.apply(this, arguments)
            var t = function (t) { 27 === t.keyCode && Ember.run.later(function () { e.get("showIssues") && (e.set("showIssues", !1), Ember.$(".issues").focus()), e.get("showRelated") && (e.set("showRelated", !1), Ember.$(".related").focus()) }, 100) }
            Ember.$(document).on("keyup", t), this.set("handleKeyPress", t)
        }, didDestroyElement: function () { Ember.$(document).unbind("keyup", this.get("handleKeyPress")) }, journal: Ember.computed.alias("model"), library: void 0, bookshelves: Ember.computed.filterBy("journal.bookshelves", "name"), bookshelfSorting: ["name"], sortedBookshelves: Ember.computed.sort("bookshelves", "bookshelfSorting"), unreadStatuses: Ember.computed("model.id", function () { return this.get("unreads").getJournalStatusById(this.get("model.id")) }), hasUnreadArticles: Ember.computed.gt("unreadStatuses.unreadCount", 0), onMyBookshelf: Ember.computed("applicationSession.loggedInUser", "myBookshelfModel", "myBookshelfModel.syncData", "model.id", "myBookshelf.isSyncing", "sync.isLoading", "myBookshelf.library", function () {
            var e = this
            if (!this.get("applicationSession.loggedInUser")) return !1
            if (this.get("sync.db") && this.get("sync.isLoading")) return this.get("onMyBookshelf")
            var t = this.get("myBookshelfModel")
            return !!this.get("myBookshelf").get("library") && (t ? this.get("myBookshelfModel").hasJournal(this.get("model")) : (this.get("myBookshelf").get("model").then(function (t) { e.set("myBookshelfModel", t) }), !1))
        }), actions: {
            addToMyBookshelf: function () {
                var e, t = (e = regeneratorRuntime.mark(function e() {
                    return regeneratorRuntime.wrap(function (e) {
                        for (; ;)switch (e.prev = e.next) {
                            case 0: return Ember.$("button.add-to-my-bookshelf").prop("disabled", !0), this.set("myBookshelf.isProcessing", !0), e.next = 4, this.get("myBookshelf").addJournal(this.get("model"))
                            case 4: case "end": return e.stop()
                        }
                    }, e, this)
                }), function () {
                    var t = e.apply(this, arguments)
                    return new Promise(function (e, n) {
                        return function r(i, a) {
                            try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                            e(o)
                        }("next")
                    })
                })
                return function () { return t.apply(this, arguments) }
            }(), viewPublisherSite: function () { this.get("windowOpen").open(this.get("model.homePageAtPublisherSite")) }, markAllIssuesRead: function () { this.get("unreads").markIssuesReadByJournalId(this.get("model.id")) }, login: function () { this.set("myBookshelf.shelve", !0), this.set("myBookshelf.loginRequired", !0), this.set("myBookshelf.returnRoute", window.location.pathname), this.replaceRoute("library.login", this.get("library")) }, back: function () { return !0 }, scrollTop: function () { Ember.$(window).scrollTop(0) }, toggleIssues: function () { this.set("showRelated", !1), this.set("showIssues", !this.get("showIssues")) }, toggleRelated: function () { this.set("showIssues", !1), this.set("showRelated", !this.get("showRelated")) }
        }
    })
}), define("browzine-web/controllers/library/journal/issue", ["exports", "ember-intl"], function (e, t) {
    function n(e) {
        return function () {
            var t = e.apply(this, arguments)
            return new Promise(function (e, n) {
                return function r(i, a) {
                    try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                    e(o)
                }("next")
            })
        }
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Controller.extend({
        ajax: Ember.inject.service(), journalController: Ember.inject.controller("library/journal"), store: Ember.inject.service(), unreads: Ember.inject.service(), paginatedArticles: Ember.A(), articlesCursor: void 0, queryParams: ["scrollDuration", "scrollEasing", "resultTopMargin", "pixelsToJumpToWithin"], noArticles: !1, untranslatedSuppressIssue: (0, t.t)("untranslated.suppress_issue"), journalIsOnMyBookshelf: Ember.computed.alias("journalController.onMyBookshelf"), issueStatus: Ember.computed("model.id", "unreads.database", function () { return this.get("model.articlesInPress") ? this.get("unreads").getArticlesInPressStatusById(this.get("journal.id")) : this.get("unreads").getIssueStatusById(this.get("model.id")) }), hasUnreadArticles: Ember.computed.gt("issueStatus.unreadCount", 0), _loadMoreArticles: function () {
            var e = this
            return (this.get("model.articlesInPress") ? this.get("ajax").request("/libraries/" + this.get("library.id") + "/journals/" + this.get("journal.id") + "/articles-in-press?client=bzweb", { data: { cursor: this.get("articlesCursor") } }) : this.get("model").query("articles", { cursor: this.get("articlesCursor") })).then(function (t) {
                var n = []
                e.get("model.articlesInPress") ? (e.get("store").pushPayload({ articles: t.data }), (t.data || []).forEach(function (t) {
                    var r = e.get("store").peekRecord("article", t.id)
                    r && n.push(r)
                })) : n = t.toArray(), e.set("paginatedArticles", e.get("paginatedArticles").concat(n))
                var r = e.get("model.articlesInPress") ? t.meta : t.get("meta")
                e.set("articlesCursor", r && r.cursor && r.cursor.next)
            })
        }, initializePagination: function () {
            var e = this
            this.set("initializing", !0)
            var t
            return (this.get("model.articlesInPress") ? this.get("model.articles") : this.get("model").query("articles")).then((t = n(regeneratorRuntime.mark(function t(r) {
                var i, a, s
                return regeneratorRuntime.wrap(function (t) {
                    for (; ;)switch (t.prev = t.next) {
                        case 0: if (e.set("paginatedArticles", r.toArray()), i = r.get("meta"), e.set("articlesCursor", i && i.cursor && i.cursor.next), a = void 0, (s = e.get("showArticleInContext")) && 0 === s.indexOf("doi:") && (a = s.substring(4), e.set("doiToShow", a)), !a) {
                            t.next = 10
                            break
                        } return t.next = 9, new Promise(function () {
                            var t = n(regeneratorRuntime.mark(function t(n) {
                                var r
                                return regeneratorRuntime.wrap(function (t) {
                                    for (; ;)switch (t.prev = t.next) {
                                        case 0: r = void 0
                                        case 1: if (r) {
                                            t.next = 11
                                            break
                                        } if (r = e.get("paginatedArticles").find(function (e) { return e.get("doi") === a }), !e.get("articlesCursor") || r) {
                                            t.next = 8
                                            break
                                        } return t.next = 6, e._loadMoreArticles()
                                        case 6: t.next = 9
                                            break
                                        case 8: return t.abrupt("break", 11)
                                        case 9: t.next = 1
                                            break
                                        case 11: Ember.run(function () { n() })
                                        case 12: case "end": return t.stop()
                                    }
                                }, t, e)
                            }))
                            return function (e) { return t.apply(this, arguments) }
                        }())
                        case 9: Ember.run(n(regeneratorRuntime.mark(function t() {
                            var n, r, i
                            return regeneratorRuntime.wrap(function (t) {
                                for (; ;)switch (t.prev = t.next) {
                                    case 0: if (!e.get("articlesCursor")) {
                                        t.next = 7
                                        break
                                    } if (n = e.get("paginatedArticles").get("length"), r = e.get("paginatedArticles").slice(n - 5), i = r.any(function (e) { return e.get("doi") === a }), !(n > 25 && i)) {
                                        t.next = 7
                                        break
                                    } return t.next = 7, e._loadMoreArticles()
                                    case 7: case "end": return t.stop()
                                }
                            }, t, e)
                        })))
                        case 10: Ember.run(function () { e.set("initializing", !1) })
                        case 11: case "end": return t.stop()
                    }
                }, t, e)
            })), function (e) { return t.apply(this, arguments) })).catch(function (t) { console.log(t.stack), e.set("noArticles", !0) })
        }, resetController: function () { this.set("doiToShow", "") }, actions: {
            loadMoreArticles: function () {
                var e = n(regeneratorRuntime.mark(function e(t) {
                    var r = this
                    return regeneratorRuntime.wrap(function (e) {
                        for (; ;)switch (e.prev = e.next) {
                            case 0: if (this.get("articlesCursor")) {
                                e.next = 2
                                break
                            } return e.abrupt("return", t.resolve())
                            case 2: return e.next = 4, this._loadMoreArticles()
                            case 4: Ember.run(n(regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function (e) {
                                    for (; ;)switch (e.prev = e.next) {
                                        case 0: t.resolve()
                                        case 1: case "end": return e.stop()
                                    }
                                }, e, r)
                            })))
                            case 5: case "end": return e.stop()
                        }
                    }, e, this)
                }))
                return function (t) { return e.apply(this, arguments) }
            }(), markIssueRead: function () { this.get("model.articlesInPress") ? this.get("unreads").markArticlesInPressReadByJournalId(this.get("journal.id")) : this.get("unreads").markIssueReadById(this.get("model.id")) }
        }
    })
}), define("browzine-web/controllers/library/my-articles", ["exports", "browzine-web/mixins/trigger-on-enter", "ember-intl"], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Controller.extend(t.default, {
        myArticles: Ember.inject.service(), router: Ember.inject.service("router"), libraryController: Ember.inject.controller("library"), library: Ember.computed.alias("libraryController.model"), sync: Ember.inject.service(), intl: Ember.inject.service(), loginLinkText: (0, n.t)("my_articles.pre_login_login_link_text"), signupLinkText: (0, n.t)("my_articles.pre_login_signup_link_text"), primaryLocale: Ember.computed.alias("intl.primaryLocale"), init: function () {
            var e = this
            this._super.apply(this, arguments)
            this.set("newCollectionModal", {})
            var t = function (t) { 27 === t.keyCode && Ember.run.later(function () { e.get("showCollections") && (e.set("showCollections", !1), Ember.$(".collections").focus()), e.get("showSort") && (e.set("showSort", !1), Ember.$(".sort").focus()) }, 100) }
            Ember.$(document).on("keyup", t), this.set("handleKeyPress", t)
        }, didDestroyElement: function () { Ember.$(document).unbind("keyup", this.get("handleKeyPress")) }, actions: { createCollection: function () { this.set("showCollections", !1), this.get("newCollectionModal").show() }, toggleCollections: function () { this.set("showSort", !1), this.set("showCollections", !this.get("showCollections")) }, toggleSort: function () { this.set("showCollections", !1), this.set("showSort", !this.get("showSort")) } }
    })
}), define("browzine-web/controllers/library/my-articles/collection", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Controller.extend({ libraryController: Ember.inject.controller("library"), library: Ember.computed.alias("libraryController.model") }) }), define("browzine-web/controllers/library/settings/user-settings", ["exports", "browzine-web/config/environment", "fetch", "ember-intl"], function (e, t, n, r) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Controller.extend({
        auth: Ember.inject.service(), myBookshelf: Ember.inject.service(), notifications: Ember.inject.service(), unreads: Ember.inject.service(), applicationSession: Ember.inject.service(), flashMessages: Ember.inject.service(), intl: Ember.inject.service(), loginLinkText: (0, r.t)("settings.login_button"), displayConfig: Ember.computed("media.isMobile", "media.isTablet", function () { return ("development" === t.default.environment || window.location.hostname.indexOf("develop") > -1) && !this.get("media.isMobile") && !this.get("media.isTablet") }), displayTestButtons: Ember.computed(function () {
            var e = t.default.environment
            return "development" === e || "test" === e || window.location.hostname.indexOf("develop") > -1
        }), displayMyBookshelfSection: Ember.computed("myBookshelf.isAvailable", "myBookshelf.hasUnreadArticles", "notifications.canBeRequested", function () { return !!this.get("myBookshelf.isAvailable") && (this.get("myBookshelf.hasUnreadArticles") || this.get("notifications.canBeRequested")) }), configKeyValuePairs: Ember.computed(function () { return Object.keys(t.default).map(function (e) { return { key: e, value: JSON.stringify(t.default[e]) } }) }), localStorageKeyValuePairs: Ember.computed("model.localStorage", function () {
            var e = this.get("model.localStorage")
            return Object.keys(e).map(function (t) { return { key: t, value: e[t] } })
        }), showEmailNotificationsFeatures: Ember.computed(function () { return t.default.APP.showEmailNotificationsFeatures }), changeEmailNotificationSetting: function () {
            var e, r = (e = regeneratorRuntime.mark(function e(r) {
                var i, a, s, o
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return i = this.get("selectedEmailNotificationValue"), e.prev = 1, a = this.get("applicationSession").get("selectedLibrary"), s = this.get("auth").getAPIAuthHeaderForLibrary(a), e.next = 6, (0, n.default)(t.default.apiBaseUrl + "/users/notification-status", { body: JSON.stringify({ digestEmailStatus: r.value }), method: "post", headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: s } })
                        case 6: if (200 === (o = e.sent).status) {
                            e.next = 9
                            break
                        } throw new Error("Received status " + o.status + " when trying to save email notifications setting")
                        case 9: this.set("selectedEmailNotificationValue", r.value), e.next = 17
                            break
                        case 12: e.prev = 12, e.t0 = e.catch(1), console.log("Error while saving email notitications setting: " + e.t0.stack), this.get("flashMessages").alert(this.get("intl").t("settings.save_email_notification_settings_failed_message")), this.set("selectedEmailNotificationValue", i)
                        case 17: case "end": return e.stop()
                    }
                }, e, this, [[1, 12]])
            }), function () {
                var t = e.apply(this, arguments)
                return new Promise(function (e, n) {
                    return function r(i, a) {
                        try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        e(o)
                    }("next")
                })
            })
            return function (e) { return r.apply(this, arguments) }
        }(), disableEmailNotificationSetting: Ember.computed("emailRemoved", function () { return !!this.get("emailRemoved") }), selectedEmailNotificationOption: Ember.computed("emailNotificationsOptions", "selectedEmailNotificationValue", function () {
            var e = this.get("emailNotificationsOptions"), t = this.get("selectedEmailNotificationValue")
            return e.find(function (e) { return e.value === t })
        }), emailNotificationsOptions: (0, r.intl)(function (e) { return [{ name: e.t("settings.off"), value: "off" }, { name: e.t("settings.daily"), value: "daily" }, { name: e.t("settings.weekly"), value: "weekly" }] }), showEmailNotificationsLaunchMessage: Ember.computed(function () { return new Date < new Date("2022-12-19T00:00:00") }), actions: { markAllJournalsRead: function () { this.get("unreads").markAllJournalsRead() }, requestNotificationPermission: function () { this.get("notifications").requestPermission() }, deleteAllUnreads: function () { this.get("unreads")._deleteAll() }, createUnreads: function () { this.get("unreads")._createForLoadedArticles() }, forgetZotero: function () { localStorage.removeItem("zotero_oauth_token_secret"), localStorage.removeItem("zotero_user_id"), localStorage.removeItem("zotero_temp_oauth_token"), localStorage.removeItem("zotero_temp_oauth_token_secret"), localStorage.removeItem("export_article"), localStorage.removeItem("save_article_success"), this.get("flashMessages").success("Successfully cleared Zotero login data") }, forgetMendeley: function () { localStorage.removeItem("mendeley_token"), localStorage.removeItem("mendeley_expiration"), localStorage.removeItem("export_article"), localStorage.removeItem("save_article_success"), this.get("flashMessages").success("Successfully cleared Mendeley login data") } }
    })
}), define("browzine-web/controllers/library/sso-login", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Controller.extend({ queryParams: ["auto", "disableRedirect"], auto: !1, disableRedirect: !1 }) }), define("browzine-web/controllers/library/subject", ["exports", "browzine-web/mixins/trigger-on-enter", "ember-concurrency"], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Controller.extend(t.default, {
        header: Ember.inject.service(), sortedJournals: Ember.A(), journalsCursor: void 0, init: function () {
            var e = this
            this._super.apply(this, arguments)
            var t = function (t) { 27 === t.keyCode && Ember.run.later(function () { e.get("showCategories") && (e.set("showCategories", !1), Ember.$(".categories").focus()), e.get("showSort") && (e.set("showSort", !1), Ember.$(".sort").focus()) }, 100) }
            Ember.$(document).on("keyup", t), this.set("handleKeyPress", t)
        }, didDestroyElement: function () { Ember.$(document).unbind("keyup", this.get("handleKeyPress")) }, journalsPropertyName: Ember.computed("parentController.sort", function () { return "title" === this.get("parentController.sort") ? "journals" : "rankSortedJournals" }), journalsChanged: Ember.observer("journalsContainer", "journalsPropertyName", function () { this.get("journalsChangedTask").perform() }), journalsChangedTask: (0, n.task)(regeneratorRuntime.mark(function e() {
            var t, n
            return regeneratorRuntime.wrap(function (e) {
                for (; ;)switch (e.prev = e.next) {
                    case 0: return this.set("sortedJournals", Ember.A()), e.next = 3, this.get("journalsContainer").query(this.get("journalsPropertyName"))
                    case 3: t = e.sent, this.set("sortedJournals", t.toArray()), n = t.get("meta"), this.set("journalsCursor", n && n.cursor && n.cursor.next)
                    case 7: case "end": return e.stop()
                }
            }, e, this)
        })).restartable(), containerSelector: Ember.computed("media.isDesktop", "media.isJumbo", function () { return this.get("media.isDesktop") || this.get("media.isJumbo") ? ".journals-container" : window }), hasScrollBars: Ember.computed(function () {
            var e = document.body, t = e.scrollTop
            return t > 0 || (e.scrollTop += 10, t !== e.scrollTop && (e.scrollTop = t, !0))
        }), actions: {
            loadMoreJournals: function () {
                var e = this
                if (this.get("journalsCursor")) return this.get("journalsChangedTask").set("isRunning", !0), this.get("journalsContainer").query(this.get("journalsPropertyName"), { cursor: this.get("journalsCursor") }).then(function (t) {
                    e.set("sortedJournals", e.get("sortedJournals").concat(t.toArray()))
                    var n = t.get("meta")
                    e.set("journalsCursor", n && n.cursor && n.cursor.next), e.get("journalsChangedTask").set("isRunning", !1)
                })
            }, back: function () { return !0 }, scrollTop: function () { Ember.$(window).scrollTop(0) }, toggleCategories: function () { Ember.$(window).scrollTop(0), this.set("showSort", !1), this.set("showCategories", !this.get("showCategories")) }, toggleSort: function () { this.set("showCategories", !1), this.set("showSort", !this.get("showSort")) }
        }
    })
}), define("browzine-web/controllers/my-bookshelf", ["exports", "ember-intl"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Controller.extend({ myBookshelf: Ember.inject.service(), router: Ember.inject.service("router"), intl: Ember.inject.service(), libraryController: Ember.inject.controller("library"), library: Ember.computed.alias("libraryController.model"), preLoginLoginLinkText: (0, t.t)("my_bookshelf.pre_login_login_link_text"), preLoginSignupLinkText: (0, t.t)("my_bookshelf.pre_login_signup_link_text"), primaryLocale: Ember.computed.alias("intl.primaryLocale") }) }), define("browzine-web/controllers/my-bookshelf/bookcase", ["exports", "ember-intl"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Controller.extend({ myBookshelf: Ember.inject.service(), editBookcase: !1, bookcaseTitleEditableElementLabel: (0, t.t)("my_bookshelf.bookcase_title_editable_element_label"), previousBookcaseLinkTitle: (0, t.t)("my_bookshelf.previous_bookcase_link_title"), nextBookcaseLinkTitle: (0, t.t)("my_bookshelf.next_bookcase_link_title"), checkEditBookcase: Ember.observer("editBookcase", "media.isDesktop", "media.isJumbo", function () { this.get("editBookcase") && (this.get("media.isDesktop") || this.get("media.isJumbo")) && this.set("editBookcase", !1) }), actions: { updateTitle: function (e) { this.set("model.title", e), this.get("myBookshelf").save() }, editBookcase: function () { this.set("editBookcase", !this.get("editBookcase")) } } }) }), define("browzine-web/controllers/wayf", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Controller.extend({ sorting: ["name"], libraries: Ember.computed.sort("model.libraries", "sorting"), queryParams: ["selectedLibrary"] }) }), define("browzine-web/errors/ApiSessionExpiredError", ["exports"], function (e) { function t(e) { Ember.Error.call(this, "The API reported that the client's session has expired"), this.payload = e } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t, t.prototype = Object.create(Ember.Error.prototype) }), define("browzine-web/errors/AuthRequiredError", ["exports"], function (e) { function t(e) { Ember.Error.call(this, "The API reported that an authentication credential is required"), this.payload = e } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t, t.prototype = Object.create(Ember.Error.prototype) }), define("browzine-web/errors/tracing", ["exports", "browzine-web/config/environment"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.addActionToTrace = function (e, r, i, a, s) {
        if (!t.default.recordUserTrace) return
        n.length > 40 && n.shift()
        var o = "ACTION     - actionName: " + e + ", actionArgs: " + Ember.inspect(r) + ", route: " + Ember.inspect(i) + ", routeName: " + a + ", url: " + s
        n.push(o)
    }, e.addTransitionToTrace = function (e, r, i, a) {
        if (!t.default.recordUserTrace) return
        n.length > 40 && n.shift()
        var s = "TRANSITION - newRouteName: " + e + ", prevRouteName: " + r + ", newUrl: " + i + ", prevUrl: " + a
        n.push(s)
    }, e.getTrace = function () { return n.join("\n") }
    var n = []
}), define("browzine-web/flash/object", ["exports", "ember-cli-flash/flash/object"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/formats", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = { time: { hhmmss: { hour: "numeric", minute: "numeric", second: "numeric" } }, date: { hhmmss: { hour: "numeric", minute: "numeric", second: "numeric" } }, number: { compact: { notation: "compact" }, EUR: { style: "currency", currency: "EUR" }, USD: { style: "currency", currency: "USD" } } } }), define("browzine-web/helpers/and", ["exports", "ember-truth-helpers/helpers/and"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "and", { enumerable: !0, get: function () { return t.and } }) }), define("browzine-web/helpers/app-version", ["exports", "browzine-web/config/environment", "ember-cli-app-version/utils/regexp"], function (e, t, n) {
    function r(e) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = t.default.APP.version, a = r.versionOnly || r.hideSha, s = r.shaOnly || r.hideVersion, o = null
        return a && (r.showExtended && (o = i.match(n.versionExtendedRegExp)), o || (o = i.match(n.versionRegExp))), s && (o = i.match(n.shaRegExp)), o ? o[0] : i
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.appVersion = r, e.default = Ember.Helper.helper(r)
}), define("browzine-web/helpers/cancel-all", ["exports", "ember-concurrency/helpers/cancel-all"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/ember-power-select-is-group", ["exports", "ember-power-select/helpers/ember-power-select-is-group"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "emberPowerSelectIsGroup", { enumerable: !0, get: function () { return t.emberPowerSelectIsGroup } }) }), define("browzine-web/helpers/ember-power-select-is-selected", ["exports", "ember-power-select/helpers/ember-power-select-is-selected"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "emberPowerSelectIsSelected", { enumerable: !0, get: function () { return t.emberPowerSelectIsSelected } }) })
define("browzine-web/helpers/ember-power-select-true-string-if-present", ["exports", "ember-power-select/helpers/ember-power-select-true-string-if-present"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "emberPowerSelectTrueStringIfPresent", { enumerable: !0, get: function () { return t.emberPowerSelectTrueStringIfPresent } }) }), define("browzine-web/helpers/eq", ["exports", "ember-truth-helpers/helpers/equal"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "equal", { enumerable: !0, get: function () { return t.equal } }) }), define("browzine-web/helpers/fixed-grid-layout", ["exports", "ember-collection/layouts/grid"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Helper.helper(function (e) { return new t.default(e[0], e[1]) }) }), define("browzine-web/helpers/format-date", ["exports", "ember-intl/helpers/format-date"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/format-message", ["exports", "ember-intl/helpers/format-message"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/format-number", ["exports", "ember-intl/helpers/format-number"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/format-relative", ["exports", "ember-intl/helpers/format-relative"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/format-time", ["exports", "ember-intl/helpers/format-time"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/gt", ["exports", "ember-truth-helpers/helpers/gt"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "gt", { enumerable: !0, get: function () { return t.gt } }) }), define("browzine-web/helpers/gte", ["exports", "ember-truth-helpers/helpers/gte"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "gte", { enumerable: !0, get: function () { return t.gte } }) }), define("browzine-web/helpers/is-after", ["exports", "ember-moment/helpers/is-after"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/is-array", ["exports", "ember-truth-helpers/helpers/is-array"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "isArray", { enumerable: !0, get: function () { return t.isArray } }) }), define("browzine-web/helpers/is-before", ["exports", "ember-moment/helpers/is-before"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/is-between", ["exports", "ember-moment/helpers/is-between"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/is-empty", ["exports", "ember-truth-helpers/helpers/is-empty"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/is-equal", ["exports", "ember-truth-helpers/helpers/is-equal"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "isEqual", { enumerable: !0, get: function () { return t.isEqual } }) }), define("browzine-web/helpers/is-same-or-after", ["exports", "ember-moment/helpers/is-same-or-after"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/is-same-or-before", ["exports", "ember-moment/helpers/is-same-or-before"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/is-same", ["exports", "ember-moment/helpers/is-same"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/lt", ["exports", "ember-truth-helpers/helpers/lt"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "lt", { enumerable: !0, get: function () { return t.lt } }) }), define("browzine-web/helpers/lte", ["exports", "ember-truth-helpers/helpers/lte"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "lte", { enumerable: !0, get: function () { return t.lte } }) }), define("browzine-web/helpers/mixed-grid-layout", ["exports", "ember-collection/layouts/mixed-grid"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Helper.helper(function (e) { return new t.default(e[0]) }) }), define("browzine-web/helpers/moment-add", ["exports", "ember-moment/helpers/moment-add"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/moment-calendar", ["exports", "ember-moment/helpers/moment-calendar"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/moment-diff", ["exports", "ember-moment/helpers/moment-diff"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/moment-duration", ["exports", "ember-moment/helpers/moment-duration"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/moment-format", ["exports", "ember-moment/helpers/moment-format"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/moment-from-now", ["exports", "ember-moment/helpers/moment-from-now"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/moment-from", ["exports", "ember-moment/helpers/moment-from"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/moment-subtract", ["exports", "ember-moment/helpers/moment-subtract"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) })
define("browzine-web/helpers/moment-to-date", ["exports", "ember-moment/helpers/moment-to-date"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/moment-to-now", ["exports", "ember-moment/helpers/moment-to-now"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/moment-to", ["exports", "ember-moment/helpers/moment-to"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/moment-unix", ["exports", "ember-moment/helpers/unix"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/moment", ["exports", "ember-moment/helpers/moment"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/not-eq", ["exports", "ember-truth-helpers/helpers/not-equal"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "notEq", { enumerable: !0, get: function () { return t.notEq } }) }), define("browzine-web/helpers/not", ["exports", "ember-truth-helpers/helpers/not"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "not", { enumerable: !0, get: function () { return t.not } }) }), define("browzine-web/helpers/now", ["exports", "ember-moment/helpers/now"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/or", ["exports", "ember-truth-helpers/helpers/or"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "or", { enumerable: !0, get: function () { return t.or } }) }), define("browzine-web/helpers/percentage-columns-layout", ["exports", "ember-collection/layouts/percentage-columns"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Helper.helper(function (e) { return new t.default(e[0], e[1], e[2]) }) }), define("browzine-web/helpers/perform", ["exports", "ember-concurrency/helpers/perform"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default }), define("browzine-web/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default }), define("browzine-web/helpers/t", ["exports", "ember-intl/helpers/t"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/task", ["exports", "ember-concurrency/helpers/task"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/truncate-text", ["exports"], function (e) {
    function t(e, t) {
        var n, r = e[0] || "", i = (t = t || { length: 30 }).length, a = t.delimiter
        n = r.length < i ? "" : t.omission || ""
        var s = r.substr(0, i)
        if (a) {
            var o = s.lastIndexOf(a)
            return "" !== n && -1 !== o || (o = s.length), s.substr(0, o) + n
        } return s + n
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.truncateText = t, e.default = Ember.Helper.helper(t)
}), define("browzine-web/helpers/unix", ["exports", "ember-moment/helpers/unix"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/helpers/utc", ["exports", "ember-moment/helpers/utc"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "utc", { enumerable: !0, get: function () { return t.utc } }) }), define("browzine-web/helpers/xor", ["exports", "ember-truth-helpers/helpers/xor"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "xor", { enumerable: !0, get: function () { return t.xor } }) }), define("browzine-web/initializers/activity-tracking", ["exports", "browzine-web/errors/tracing", "browzine-web/config/environment"], function (e, t, n) {
    function r() {
        n.default.recordUserTrace && (Ember.ActionHandler.reopen({
            send: function (e) {
                for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)r[i - 1] = arguments[i]
                var a = Ember.getOwner(this).lookup("controller:application").get("currentRouteName"), s = Ember.getOwner(this).lookup("route:" + a), o = Ember.getOwner(this).lookup("router:main").get("url"); (0, t.addActionToTrace)(e, r, s, a, o), this._super.apply(this, arguments)
            }
        }), Ember.Router.reopen({
            didTransition: function () {
                var e = this, n = Ember.getOwner(this).lookup("controller:application").get("currentRouteName"), r = n ? this.get("url") : "", i = arguments[0][arguments[0].length - 1].name
                Ember.run.schedule("afterRender", this, function () { (0, t.addTransitionToTrace)(i, n, e.get("url") || "/", r) }), this._super.apply(this, arguments)
            }
        }))
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.initialize = r, e.default = { initialize: r }
}), define("browzine-web/initializers/add-announcer-to-router", ["exports", "browzine-web/router"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = {
        name: "add-announcer-to-router", initialize: function () {
            t.default.reopen({
                announcer: Ember.inject.service("announcer"), intl: Ember.inject.service("intl"), didTransition: function () {
                    var e = this
                    this._super.apply(this, arguments), this._timerId = Ember.run.later(function () {
                        if (!e.isDestroying && !e.isDestroyed) {
                            var t = document.title.trim(), n = (e.get("announcer.message"), e.get("intl").t("route_announcement", { pageTitle: t }))
                            e.get("announcer").announce(n, "polite")
                        }
                    }, 100)
                }, willDestroy: function () { Ember.run.cancel(this._timerId), this._super() }
            })
        }
    }
}), define("browzine-web/initializers/allow-link-action", ["exports", "ember-link-action/initializers/allow-link-action"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "initialize", { enumerable: !0, get: function () { return t.initialize } }) }), define("browzine-web/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "browzine-web/config/environment"], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 })
    var r = void 0, i = void 0
    n.default.APP && (r = n.default.APP.name, i = n.default.APP.version), e.default = { name: "App Version", initialize: (0, t.default)(r, i) }
}), define("browzine-web/initializers/aria-attributes", ["exports"], function (e) { function t() { [Ember.TextArea, Ember.TextField].forEach(function (e) { e.reopen({ attributeBindings: ["aria-label"] }) }), Ember.LinkComponent.reopen({ attributeBindings: ["aria-label"] }) } Object.defineProperty(e, "__esModule", { value: !0 }), e.initialize = t, e.default = { name: "aria-attributes", initialize: t } }), define("browzine-web/initializers/component-router-injector", ["exports"], function (e) { function t(e) { e.inject("component", "router", "router:main") } Object.defineProperty(e, "__esModule", { value: !0 }), e.initialize = t, e.default = { name: "component-router-injector", initialize: t } }), define("browzine-web/initializers/component-styles", ["exports", "ember-component-css/initializers/component-styles", "browzine-web/mixins/style-namespacing-extras"], function (e, t, n) { Object.defineProperty(e, "__esModule", { value: !0 }), e.initialize = e.default = void 0, Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "initialize", { enumerable: !0, get: function () { return t.initialize } }), Ember.Component.reopen(n.default) }), define("browzine-web/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = {
        name: "container-debug-adapter", initialize: function () {
            var e = arguments[1] || arguments[0]
            e.register("container-debug-adapter:main", t.default), e.inject("container-debug-adapter:main", "namespace", "application:main")
        }
    }
}), define("browzine-web/initializers/data-adapter", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = { name: "data-adapter", before: "store", initialize: function () { } } }), define("browzine-web/initializers/ember-concurrency", ["exports", "ember-concurrency/initializers/ember-concurrency"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/initializers/ember-data", ["exports", "ember-data/setup-container", "ember-data"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = { name: "ember-data", initialize: t.default } })
define("browzine-web/initializers/export-application-global", ["exports", "browzine-web/config/environment"], function (e, t) {
    function n() {
        var e = arguments[1] || arguments[0]
        if (!1 !== t.default.exportApplicationGlobal) {
            var n
            if ("undefined" != typeof window) n = window
            else if ("undefined" != typeof global) n = global
            else {
                if ("undefined" == typeof self) return
                n = self
            } var r, i = t.default.exportApplicationGlobal
            r = "string" == typeof i ? i : Ember.String.classify(t.default.modulePrefix), n[r] || (n[r] = e, e.reopen({ willDestroy: function () { this._super.apply(this, arguments), delete n[r] } }))
        }
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.initialize = n, e.default = { name: "export-application-global", initialize: n }
}), define("browzine-web/initializers/flash-messages", ["exports", "browzine-web/config/environment", "ember-cli-flash/utils/flash-message-options"], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.initialize = i
    var r = "[ember-cli-flash] Future versions of ember-cli-flash will no longer inject the service automatically. Instead, you should explicitly inject it into your Route, Controller or Component with `Ember.inject.service`."
    function i() {
        var e = arguments[1] || arguments[0], i = (t.default || {}).flashMessageDefaults, a = (i || []).injectionFactories, s = (0, n.default)(i), o = !(a && a.length)
        Ember.deprecate(r, o, { id: "ember-cli-flash.deprecate-injection-factories", until: "2.0.0" }), s.injectionFactories.forEach(function (t) { e.inject(t, "flashMessages", "service:flash-messages") })
    } e.default = { name: "flash-messages", initialize: i }
}), define("browzine-web/initializers/injectStore", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = { name: "injectStore", before: "store", initialize: function () { } } }), define("browzine-web/initializers/model-relationship-loading-workarounds", ["exports", "ember-data"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.initialize = r
    var n = !1
    function r() {
        n || (n = !0, t.default.Model.reopen({
            fixedBelongsToLoad: function (e, t) {
                var n = this.belongsTo(e), r = n.load()
                return r._result && r._result instanceof Error ? n.reload() : t ? n.reload() : r
            }, fixedHasManyLoad: function (e) {
                var t = this.hasMany(e)
                return t.load().catch(function () { return t.reload() })
            }
        }))
    } e.default = { initialize: r }
}), define("browzine-web/initializers/responsive", ["exports", "ember-responsive/initializers/responsive"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = { name: "responsive", initialize: t.initialize } }), define("browzine-web/initializers/route-styles", ["exports", "ember-component-css/initializers/route-styles"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }), Object.defineProperty(e, "initialize", { enumerable: !0, get: function () { return t.initialize } }) }), define("browzine-web/initializers/store", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = { name: "store", after: "ember-data", initialize: function () { } } }), define("browzine-web/initializers/transforms", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = { name: "transforms", before: "store", initialize: function () { } } }), define("browzine-web/instance-initializers/announce-flash-messages", ["exports", "ember-cli-flash/flash/object"], function (e, t) {
    function n(e) {
        var n = e.lookup("service:announcer")
        t.default.reopen({
            announce: Ember.on("init", function () {
                var e = this.get("type") + ": " + this.get("message")
                n.announce(e, "assertive")
            })
        })
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.initialize = n, e.default = { name: "announce-flash-messages", initialize: n }
}), define("browzine-web/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = { name: "ember-data", initialize: t.default } }), define("browzine-web/instance-initializers/google-analytics", ["exports", "browzine-web/router", "browzine-web/config/environment", "lodash.startcase"], function (e, t, n, r) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = {
        name: "google-analytics", getTimingCategory: function (e) {
            var t = this.getUrl(e).pathname.replace("/v2", "")
            return "" + this.getCategory(t) + this.getActivity(e)
        }, getUrl: function (e) { return "test" === n.default.environment ? new URL("" + n.default.analyticsHost + e) : new URL(e) }, getCategory: function (e) { return (0, r.default)(e.replace("-", " ").split("/").filter(function (e) { return !isFinite(e) }).reduce(function (e, t) { return e.concat(Ember.String.capitalize(t)) }, "")).replace(/\s/g, "") }, getActivity: function (e) { return e.indexOf("cursor") > 0 ? "Pagination" : "Load" }, initialize: function (e) {
            var n = this, r = void 0
            Ember.$(document).ajaxStart(function () { r = performance.now() }), Ember.$(document).ajaxComplete(function (t, i, a) {
                var s = performance.now(), o = Math.round(s - r), l = n.getTimingCategory(a.url), u = location.href, c = o, d = a.url
                e.lookup("service:analytics").recordTiming({ timingCategory: l, timingVar: u, timingValue: c, timingLabel: d })
            }), t.default.reopen({
                notifyAnalytics: function () {
                    var t = this.get("url")
                    e.lookup("service:analytics").recordPageView(t)
                }.on("didTransition")
            })
        }
    }
}), define("browzine-web/mixins/accordion-container", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Mixin.create({ expandedItem: null, actions: { itemExpanded: function (e) { this.set("expandedItem", e) } } }) }), define("browzine-web/mixins/accordion-item", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Mixin.create({ attributeBindings: ["tabindex"], tabindex: 0, isExpanded: !1, keyPress: function (e) { 13 !== e.keyCode || this.get("isExpanded") || this.send("expand") }, expandedChanged: Ember.observer("expandedItem", function () { this.get("expandedItem") !== this && this.send("contract", !0) }), shouldExpand: function () { return !0 }, actions: { toggleExpansion: function (e) { this.get("isExpanded") ? this.send("contract", e) : this.send("expand") }, expand: function () { this.get("contracting") ? this.set("contracting", !1) : (this.shouldExpand() && this.set("isExpanded", !0), this.sendAction("expanded", this)) }, contract: function (e) { this.set("isExpanded", !1), e || this.set("contracting", !0) } } }) }), define("browzine-web/mixins/article-loading-route", ["exports", "ember-window-mock"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Mixin.create({
        prepareArticleLoadingBoxModel: function (e, t) {
            return e.then(function (e) {
                var n, r = void 0
                return n = e.fixedBelongsToLoad("journal"), r = e.get("inPress") ? Ember.Object.create({ library: t, journal: n, title: "Articles in Press", date: (new Date).toISOString().split("T")[0], year: (new Date).getFullYear() }) : e.fixedBelongsToLoad("issue"), Ember.RSVP.allSettled([t, n, r]).then(function (t) {
                    var n = t[0].value, r = t[1].value || e.get("journal"), i = t[2].value
                    r && r.belongsTo && r.belongsTo("library").push(n)
                    i && i.belongsTo && i.belongsTo("library").push(n)
                    return Ember.RSVP.hash({ article: e, issue: i, library: n, journal: r })
                })
            })
        }, hasFullTextAccess: function (e, t) { return this.hasAccessIfHasLink(e) && t }, hasFullTextFileAccess: function (e, t) { return this.hasAccessIfHasLink(e) && t }, hasAccessIfHasLink: function (e) { return !!e.article.get("openAccess") || !(e.journal.get("accessedThroughAggregator") && e.article.get("inPress") || e.journal.get("embargoDescription") && e.article.get("inPress") || e.issue.get("embargoed") || e.article.get("vpnRequired")) }, setupRedirectAfterRender: function (e) {
            var n = this
            if (e.urlPropertyName) {
                var r = this.get(e.urlPropertyName)
                r && Ember.run.later(this, function () { t.default.location.assign(r) }, 100)
            } if (e.transitionToArgumentsPropertyName) {
                var i = this.get(e.transitionToArgumentsPropertyName)
                i && Ember.run.scheduleOnce("afterRender", this, function () { Ember.run.later(n, function () { n.transitionTo.apply(n, i) }, 3e3) })
            }
        }
    })
}), define("browzine-web/mixins/authenticating-adapter", ["exports", "browzine-web/mixins/error-helpers"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Mixin.create(t.default, {
        auth: Ember.inject.service(), applicationSession: Ember.inject.service(), flashMessages: Ember.inject.service(), ajaxOptions: function () {
            var e = this, t = this._super.apply(this, arguments), n = t.beforeSend
            return t.beforeSend = function (t) {
                var r = e.get("applicationSession").get("selectedLibrary")
                if (r) {
                    var i = e.get("auth").getAPIAuthHeaderForLibrary(r)
                    i && t.setRequestHeader("Authorization", i)
                } n && n(t)
            }, t
        }, handleUnauthorizedResponse: function (e, t, n) {
            var r = this
            if (401 === e) return this.interpretError(e, n)
            if (403 === e) {
                var i = this.get("auth"), a = (this.get("applicationSession").get("loggedInUser") || {}).token
                return Ember.run(function () { i.authenticateUser(null, null, a), r.get("flashMessages").add({ message: "", type: "alert", componentName: "permissions-error-alert", sticky: !0 }) }), new Error("invalid permissions")
            }
        }
    })
}), define("browzine-web/mixins/belongs-to-library-adapter", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Mixin.create({
        buildURL: function (e, t, n) {
            var r, i = this._super(e, t, n)
            try { r = n.belongsTo("library", { id: !0 }) } catch (s) { } if (!r || "article" === e) return i
            var a = this.urlPrefix()
            return a.indexOf("/") < 0 && (a = "/" + a), a + "/libraries/" + r + i.replace(a, "")
        }
    })
}), define("browzine-web/mixins/click-on-enter", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Mixin.create({ attributeBindings: ["tabindex"], tabindex: 0, keyPress: function (e) { 13 === e.keyCode && this.click() } }) }), define("browzine-web/mixins/client-adapter", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Mixin.create({
        ajaxOptions: function () {
            var e = arguments[0]
            try {
                var t = new URL(e)
                t.searchParams ? t.searchParams.set("client", "bzweb") : t.search.length > 1 ? t.search = t.search + "&client=bzweb" : t.search = "?client=bzweb", arguments[0] = t.toString()
            } catch (r) {
                if (0 === e.indexOf("/")) {
                    var n = e
                    e.indexOf("?") >= 0 ? n += "&client=bzweb" : n += "?client=bzweb", arguments[0] = n
                }
            } return this._super.apply(this, arguments)
        }
    })
}), define("browzine-web/mixins/ember-data-workarounds", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Mixin.create({
        store: Ember.inject.service(), relateCachedModelToLibrary: function (e, t) {
            var n = this.store.peekRecord(e, t)
            n && !n.belongsTo("library").value() && n.belongsTo("library").push(this.modelFor("library"))
        }
    })
}), define("browzine-web/mixins/error-helpers", ["exports", "browzine-web/errors/ApiSessionExpiredError", "browzine-web/errors/AuthRequiredError"], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 })
    e.default = Ember.Mixin.create({ interpretError: function (e, r) { return 401 === e && "expired_library_session" === r.code ? new t.default(r) : 401 === e ? new n.default(r) : void 0 }, getErrorObjectFromErrorResponse: function (e) { return e.errors && e.errors.length ? e.errors[0] : e.length ? e[0] : e } })
}), define("browzine-web/mixins/journal-container", ["exports", "browzine-web/utils/lodash-replacements"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Mixin.create({
        isFull: Ember.computed("children.@each.isFull", function () {
            var e = this.get("children")
            return Ember.A(e).isEvery("isFull", !0)
        }), hasJournal: function (e) { return Ember.A(this.get("children")).any(function (t) { return t.hasJournal(e) }) }, addJournal: function (e) { this.get("children").findBy("isFull", !1).addJournal(e) }, childUnreadCounts: Ember.computed("children.@each.unreadCount", function () { return this.get("children").mapBy("unreadCount") }), unreadCount: Ember.computed.sum("childUnreadCounts"), journalIds: Ember.computed("children.@each.journalIds", function () { return (0, t.flatten)(this.get("children").mapBy("journalIds")) })
    })
}), define("browzine-web/mixins/link-action", ["exports", "ember-link-action/mixins/link-action"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/mixins/localization-adapter", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Mixin.create({
        intl: Ember.inject.service(), ajaxOptions: function () {
            var e = this, t = this._super.apply(this, arguments), n = t.beforeSend
            return t.beforeSend = function (t) {
                var r = e.get("intl.locale")
                t.setRequestHeader("Accept-Language", r), n && n(t)
            }, t
        }
    })
}), define("browzine-web/mixins/query-storing-route", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Mixin.create({
        setupController: function (e, t) {
            this._super(e, t)
            var n = this.paramsFor("library")
            n.storeQuery && this.controllerFor("library").send("storePreviousSearch", n.query)
        }
    })
}), define("browzine-web/mixins/reset-scroll-position", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Mixin.create({ activate: function () { this._super.apply(this, arguments), window.scrollTo(0, 0) } }) }), define("browzine-web/mixins/route-auth-helpers", ["exports", "browzine-web/errors/ApiSessionExpiredError", "browzine-web/errors/AuthRequiredError", "lodash.find"], function (e, t, n, r) {
    function i(e) { return Array.isArray(e.responseJSON) } function a(e) { return e.responseJSON && e.responseJSON.errors && Array.isArray(e.responseJSON.errors) } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Mixin.create({
        analytics: Ember.inject.service(), auth: Ember.inject.service(), applicationSession: Ember.inject.service(), ensureLibrarySelectedGeneric: function (e) {
            var t = this, n = this.get("applicationSession")
            return this.ensureLibrarySelected(e, function () { n.set("transitionToRetryAfterAuth", e), t.transitionTo("wayf") })
        }, ensureLibrarySelectedForArticle: function (e, t) {
            var n = this, r = this.get("applicationSession")
            return this.ensureLibrarySelected(e, function () { r.set("transitionToRetryAfterAuth", e), n.transitionTo("article-wayf", t) })
        }, ensureLibrarySelectedForIssue: function (e, t) {
            var n = this, r = this.get("applicationSession")
            return this.ensureLibrarySelected(e, function () { r.set("transitionToRetryAfterAuth", e), n.transitionTo("issue-wayf", t) })
        }, ensureLibrarySelected: function (e, t) {
            var n = this, r = this.get("applicationSession"), i = this.get("auth"), a = r.get("selectedLibrary")
            if (a) return Ember.RSVP.Promise.resolve().then(function () { if (!r.lookupLibraryToken(a)) return i.authenticateLibrary({ libraryId: a }, e) }).then(function () { return Ember.RSVP.Promise.resolve(a) })
            var s, o, l = r.get("mostRecentLibrary")
            return l ? (r.set("selectedLibrary", l), Ember.RSVP.Promise.resolve().then(function () { if (!r.lookupLibraryToken(a)) return i.authenticateLibrary({ libraryId: a }, e) }).then(function () { return Ember.RSVP.Promise.resolve(l) })) : this.get("store").query("library", { detect: "ip", subscription: "bzweb" }).then((s = regeneratorRuntime.mark(function r(a) {
                var s
                return regeneratorRuntime.wrap(function (r) {
                    for (; ;)switch (r.prev = r.next) {
                        case 0: if (a.get("length")) {
                            r.next = 4
                            break
                        } return r.abrupt("return", t())
                        case 4: return s = a.get("firstObject"), r.next = 7, n.get("analytics").recordEvent({ category: "userJoinedLibrary", action: "IPDetected", label: s.get("name"), value: s.get("id") })
                        case 7: return r.abrupt("return", i.authenticateLibraryDirectOnly(s.get("id")).then(function () { return e.retry() }, function () { t() }))
                        case 8: case "end": return r.stop()
                    }
                }, r, n)
            }), o = function () {
                var e = s.apply(this, arguments)
                return new Promise(function (t, n) {
                    return function r(i, a) {
                        try { var s = e[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        t(o)
                    }("next")
                })
            }, function (e) { return o.apply(this, arguments) }))
        }, handleAPIAuthDemandError: function (e, s, o) {
            var l = this, u = e instanceof t.default
            if (u || e instanceof n.default) return this.get("auth").attemptDirectLibraryAuth(s, !1, o).then(function () { return o.retry() }, function (e) {
                function t(t) { function n(e) { return "403" === e.status && "Authentication Failed" === e.title && !!e.ipRangeError } return i(t) ? t.responseJSON.some(function (e) { return n(e) }) : a(t) ? t.responseJSON.errors.some(function (e) { return n(e) }) : e.responseJSON && n(e.responseJSON) } function n(e) { return "403" === e.status && "Authentication Failed" === e.title && !!e.preproxy } function c(t) { return i(t) ? t.responseJSON.some(function (e) { return n(e) }) : a(t) ? t.responseJSON.errors.some(function (e) { return n(e) }) : e.responseJSON && n(e.responseJSON) } function d(e) { return "403" === e.status && "Authentication Failed" === e.title && !!e.ssoGateway } function m(t) { return i(t) ? t.responseJSON.some(function (e) { return d(e) }) : a(t) ? t.responseJSON.errors.some(function (e) { return d(e) }) : e.responseJSON && d(e.responseJSON) } if ("TransitionAborted" !== e.name) {
                    if (function (n) { function r(e) { return "403" === e.status && "Authentication Failed" === e.title } return i(n) ? n.responseJSON.some(function (e) { return r(e) }) && !t(n) && !c(n) && !m(n) : a(n) ? n.responseJSON.errors.some(function (e) { return r(e) }) && !t(n) && !c(n) && !m(n) : e.responseJSON && "403" === e.responseJSON.status && "Authentication Failed" === e.responseJSON.title && !e.responseJSON.preproxy && !e.responseJSON.ipRangeError && !e.responseJSON.ssoGateway }(e)) return l.transitionTo("library.unavailable", s, { queryParams: { context: u ? "Expired Session" : void 0 } })
                    if (t(e)) return l.get("applicationSession").set("transitionToRetryAfterAuth", o), l.transitionTo("library.vpn-required", s, { queryParams: { context: u ? "Expired Session" : void 0 } })
                    if (m(e)) {
                        var b = i(p = e) ? (0, r.default)(p.responseJSON, d).ssoGateway : a(p) ? (0, r.default)(p.responseJSON.errors, d).ssoGateway : p.responseJSON.ssoGateway
                        return l.get("auth").authenticateLibraryThroughSSOGateway(b, o)
                    } if (c(e)) {
                        var f = function (e) { return i(e) ? (0, r.default)(e.responseJSON, n).preproxy : a(e) ? (0, r.default)(e.responseJSON.errors, n).preproxy : e.responseJSON.preproxy }(e)
                        return l.get("auth").authenticateLibraryThroughProxy(f, o)
                    } var p
                    console.warn("\n          Direct auth failed for unknown reason, could not detect how to handle failure\n          error: " + e.stack)
                }
            })
        }
    })
}), define("browzine-web/mixins/style-namespacing-extras", ["exports", "ember-component-css/mixins/style-namespacing-extras"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/mixins/taxonomy-route", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Mixin.create({
        windowHistory: Ember.inject.service(), buildTaxonomy: function (e) {
            var t = this, n = e.subject, r = e.bookcase, i = e.bookshelf
            return Ember.RSVP.hash({ subject: n, bookcases: n.fixedHasManyLoad("bookcases"), bookcase: r, bookshelves: (r || n).hasMany("bookshelves").reload(), bookshelf: i }).then(function (e) { t.set("taxonomy", e) })
        }, setupController: function () {
            var e = this.get("taxonomy"), t = this.controllerFor("library.subject")
            t.set("subject", e.subject), t.set("bookcases", e.bookcases), t.set("bookcase", e.bookcase), t.set("bookshelves", e.bookshelves), t.set("bookshelf", e.bookshelf), t.set("journals", void 0)
            var n = e.bookshelf || e.bookcase || e.subject
            t.set("journalsContainer", n)
        }, actions: {
            willTransition: function () {
                var e = this.get("windowHistory"), t = this.controllerFor("application"), n = this.get("router.url")
                return t.set("previousTaxonomyPath", n), e.pushState(null, null, n), !0
            }
        }
    })
}), define("browzine-web/mixins/trigger-on-enter", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Mixin.create({
        actions: {
            triggerOnEnter: function () {
                if (13 === arguments[arguments.length - 1].keyCode) {
                    for (var e = [], t = 1; t < arguments.length - 1; t++)e.push(arguments[t])
                    this.send.apply(this, [arguments[0]].concat(e))
                }
            }
        }
    })
}), define("browzine-web/models/article-status-collection", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Object.extend({ cachedCount: null, init: function () { this.set("articleStatuses", Ember.A()) }, addArticleStatus: function (e) { this.get("articleStatuses").addObject(e) }, removeArticleStatus: function (e) { this.get("articleStatuses").removeObject(e) }, unreadCount: Ember.computed.alias("cachedCount") }) })
define("browzine-web/models/article-status", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 })
    e.default = Ember.Object.extend({
        isSyncing: !1, isUnread: !1, isPlaceholder: Ember.computed.empty("id"), canBeMarkedUnread: Ember.computed("isPlaceholder", "isDeleted", function () { return !(this.get("isPlaceholder") || this.get("isDeleted")) }), revisionObserver: Ember.observer("rev", function () {
            var e = this.get("pastRevisions") || []
            e.push(this.get("rev")), this.set("pastRevisions", e)
        }), unreadObserver: Ember.on("init", Ember.observer("isPlaceholder", "isDeleted", "markedRead", "viewCount", function () {
            Ember.testing && window.unreadObserverCount++
            var e = this.get("isPlaceholder"), t = this.get("isDeleted"), n = this.get("isUnread"), r = void 0
            if (r = !e && !t && !(this.get("markedRead") || this.get("viewCount")), this.set("isUnread", r), n && !r) {
                var i = this.get("unreads"), a = this.get("issueId"), s = this.get("journalId")
                i.updateCounts({ issueId: a, journalId: s })
            }
        })), syncData: Ember.computed("id", "rev", "$schema", "issueId", "journalId", "viewCount", "viewedAt", "metadataUpdated", "markedRead", {
            get: function () { return { _id: this.get("id"), _rev: this.get("rev"), type: "article", $schema: this.get("$schema") || "http://thirdiron.com/jsonSchemas/couch-article/0", issue: this.get("issueId"), journal: this.get("journalId"), markedRead: this.get("markedRead"), viewCount: this.get("viewCount"), viewedAt: this.get("viewedAt"), metadataUpdated: this.get("metadataUpdated") } }, set: function (e, t, n) {
                var r = t._rev, i = (this.get("pastRevisions") || []).indexOf(r) > -1, a = this.get("rev") === r
                if (n || !a && !i) return this.setProperties({ rev: r, id: t._id, $schema: t.$schema, isDeleted: t._deleted, issueId: t.issue, journalId: t.journal, markedRead: t.markedRead, viewCount: t.viewCount, viewedAt: t.viewedAt, metadataUpdated: t.metadataUpdated }), t
            }
        })
    })
}), define("browzine-web/models/article", ["exports", "ember-data"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.Model.extend({
        syncId: t.default.attr("string"), library: t.default.belongsTo("library", { async: !0 }), issue: t.default.belongsTo("issue", { async: !0 }), journal: t.default.belongsTo("journal", { async: !0, inverse: "allArticles" }), title: t.default.attr("string"), parsedTitle: function () {
            var e = this.get("title")
            return e = (e = (e = e.replace(/\$\$[^$]+\$\$/g, " ")).replace(/(<\/?(?!\/?[bi]>)[^<>]+>)/g, " ")).replace(/(<(\/[bi])>)/g, "$1 ")
        }.property("title"), strippedTitle: function () {
            var e = this.get("parsedTitle")
            return e = (e = e.replace(/(<(\/[bi])>)/g, "")).replace(/(<([bi])>)/g, "")
        }.property("title"), abstract: t.default.attr("string"), authors: t.default.attr("string"), authorsPreview: Ember.computed("authors", function () {
            var e = [], t = this.get("authors").split(";")
            return t.length < 4 ? e = t.join(";") : (e.push(t[0]), e.push(t[1]), e.push(t[2]), e.push(" … " + t[t.length - 1].trim()), e = e.join(";")), e
        }), inPress: t.default.attr("boolean"), startPage: t.default.attr("string"), endPage: t.default.attr("string"), doi: t.default.attr("string"), contentLocation: t.default.attr("string"), ILLURL: t.default.attr("string"), browzineWebInContextLink: t.default.attr("string"), browseable: Ember.computed.notEmpty("browzineWebInContextLink"), permalink: t.default.attr("string"), fullTextLocation: t.default.attr("string"), fullTextFile: t.default.attr("string"), suppressed: t.default.attr("boolean"), vpnRequired: t.default.attr("boolean"), ipRangeError: t.default.attr(), hasNoEndPage: Ember.computed.empty("endPage"), startPageEqualsEndPage: Ember.computed("startPage", "endPage", function () { return this.get("startPage") === this.get("endPage") }), isSinglePage: Ember.computed.or("hasNoEndPage", "startPageEqualsEndPage"), date: t.default.attr("date"), year: Ember.computed("date", function () { return this.get("date").getFullYear() }), openAccess: t.default.attr("boolean"), retractionNoticeUrl: t.default.attr("string")
    })
}), define("browzine-web/models/bookcase", ["exports", "ember-data", "ember-data-has-many-query"], function (e, t, n) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.Model.extend(n.default.ModelMixin, { library: t.default.belongsTo("library", { async: !0 }), name: t.default.attr("string"), subject: t.default.belongsTo("subject", { async: !0 }), bookshelves: t.default.hasMany("bookshelf", { async: !0 }), journals: t.default.hasMany("journal", { async: !0 }), rankSortedJournals: t.default.hasMany("journal", { async: !0, inverse: null }) }) }), define("browzine-web/models/bookshelf", ["exports", "ember-data", "ember-data-has-many-query"], function (e, t, n) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.Model.extend(n.default.ModelMixin, { library: t.default.belongsTo("library", { async: !0 }), name: t.default.attr("string"), subject: t.default.belongsTo("subject", { async: !0 }), bookcase: t.default.belongsTo("bookcase", { async: !0 }), journals: t.default.hasMany("journal", { async: !0 }), rankSortedJournals: t.default.hasMany("journal", { async: !0, inverse: null }) }) }), define("browzine-web/models/collection-item", ["exports", "ember-data"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.Model.extend({
        itemId: t.default.attr("string"), itemType: t.default.attr("string"), rawDoc: t.default.attr(), itemData: t.default.attr(), description: t.default.attr("string"), addedAt: t.default.attr("date", { defaultValue: function () { return (new Date).toISOString() } }), syncData: Ember.computed("items.@each.syncData", function () {
            var e = this.get("store"), t = this.get("itemId"), n = e.peekAll("article").find(function (e) { return e.get("syncId") === t }), r = this.get("itemData") || { articleTitle: "", journalTitle: "", journalCoverUrl: "https://assets.thirdiron.com/default-journal-cover.png" }
            n && (r.articleTitle = n.get("title"), r.articleDoi = n.get("doi"), r.journalTitle = n.get("journal.title") || r.journalTitle, r.journalCoverUrl = n.get("journal.rawCoverURL") || r.journalCoverUrl)
            var i = this.get("rawDoc"), a = { itemData: r, $schema: this.get("schema"), addedAt: this.get("addedAt"), itemId: this.get("itemId"), itemType: "article" }
            return Object.assign({}, i, a)
        })
    })
}), define("browzine-web/models/collection", ["exports", "ember-data"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 })
    e.default = t.default.Model.extend({
        myArticles: Ember.inject.service(), _rev: t.default.attr("string"), rawDoc: t.default.attr(), name: t.default.attr("string"), description: t.default.attr("string"), dateCreated: t.default.attr("date", { defaultValue: function () { return (new Date).toISOString() } }), items: t.default.hasMany("collectionItem", { async: !0 }), addItem: function () {
            var e, t = (e = regeneratorRuntime.mark(function e(t) {
                var n, r, i, a
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: if (n = this.get("store"), r = {}, t.syncId && (r.itemId = t.syncId, r.itemType = "article", r.id = this.get("id") + "-article-" + t.syncId), r.description = t.description || "", !r.id) {
                            e.next = 13
                            break
                        } if (!(i = n.peekRecord("collectionItem", r.id))) {
                            e.next = 13
                            break
                        } if (!i.isDeleted) {
                            e.next = 11
                            break
                        } n.unloadRecord(i), e.next = 13
                            break
                        case 11: return e.next = 13, i.destroyRecord()
                        case 13: a = n.createRecord("collectionItem", r), this.get("items").pushObject(a)
                        case 15: case "end": return e.stop()
                    }
                }, e, this)
            }), function () {
                var t = e.apply(this, arguments)
                return new Promise(function (e, n) {
                    return function r(i, a) {
                        try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        e(o)
                    }("next")
                })
            })
            return function (e) { return t.apply(this, arguments) }
        }(), syncData: Ember.computed("items.@each.syncData", "schema", "id", "_rev", "name", "description", "dateCreated", function () {
            var e = { $schema: this.get("schema") || "http://thirdiron.com/jsonSchemas/couch-collection/1", _id: this.get("id"), _rev: this.get("_rev"), type: "collection", name: this.get("name"), description: this.get("description"), dateCreated: this.get("dateCreated"), items: this.get("items").mapBy("syncData") }, t = this.get("rawDoc")
            return Object.assign({}, t, e)
        })
    })
}), define("browzine-web/models/issue", ["exports", "ember-data", "ember-data-has-many-query"], function (e, t, n) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.Model.extend(n.default.ModelMixin, { library: t.default.belongsTo("library", { async: !0 }), journal: t.default.belongsTo("journal", { async: !0, inverse: "issues" }), title: t.default.attr("string"), shortTitle: Ember.computed("title", function () { return this.get("title").replace("Vol.", "Vol") }), date: t.default.attr("string"), year: Ember.computed("date", function () { return this.get("date").substr(0, 4) }), availabilityMessage: t.default.attr("string"), withinSubscription: t.default.attr("boolean"), embargoed: t.default.attr("boolean"), suppressed: t.default.attr("boolean"), articles: t.default.hasMany("article", { async: !0 }), isValidIssue: t.default.attr("boolean") }) }), define("browzine-web/models/journal", ["exports", "ember-data"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.Model.extend({
        library: t.default.belongsTo("library", { async: !0 }), title: t.default.attr("string"), sortTitle: Ember.computed("title", function () {
            var e = this.get("title").toLowerCase()
            return e = (e = e.replace(/^(a\s+|an\s+|the\s+)/, "")).replace(/&/g, "and")
        }), available: t.default.attr("boolean"), rawCoverURL: t.default.attr("string"), coverURL: Ember.computed("rawCoverURL", function () { return (this.get("rawCoverURL") || "").replace("http:", "https:") }), issn: Ember.computed("coverURL", function () {
            var e = (this.get("coverURL") || "").match(/[\S]{4}-[\S]{4}/i)
            return e ? e.toString() : ""
        }), scimagoRank: t.default.attr("number"), scimagoURL: t.default.attr("string"), homePageAtPublisherSite: t.default.attr("string"), embargoDescription: t.default.attr("string"), issues: t.default.hasMany("issue", { async: !0 }), currentIssue: t.default.belongsTo("issue", { async: !0 }), latestFullTextIssue: t.default.belongsTo("issue", { async: !0 }), articlesInPress: t.default.hasMany("article", { async: !0 }), publicationYears: t.default.hasMany("publicationYear", { async: !0 }), allArticles: t.default.hasMany("article", { async: !0 }), externalSearchLocation: t.default.attr("string"), externalSearchLinkMessage: t.default.attr("string"), accessedThroughAggregator: t.default.attr("boolean"), articlesInPressAvailabilityMessage: t.default.attr("string"), subjects: t.default.hasMany("subjects", { async: !0 }), bookshelves: t.default.hasMany("bookshelves", { async: !0, inverse: "journals" })
    })
}), define("browzine-web/models/library", ["exports", "ember-data", "ember-intl"], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.Model.extend({
        name: t.default.attr("string"), rawLogo: t.default.attr("string"), logo: Ember.computed("rawLogo", function () { return (this.get("rawLogo") || "").replace("http:", "https:") }), customBackgroundImageUrl: t.default.attr("string"), httpsCustomBackgroundImageUrl: Ember.computed("customBackgroundImageUrl", function () { return (this.get("customBackgroundImageUrl") || "").replace("http:", "https:") }), customEmbargoMessage: t.default.attr("string"), customAvailabilityMessage: t.default.attr("string"), noPersonalization: Ember.computed("subscriptions.web.type", function () {
            var e = this.get("subscriptions.web.type")
            return "free" === e || "activeNoPersonalization" === e || "trialNoPersonalization" === e
        }), logoHasLibraryName: t.default.attr("boolean"), promoteNativeApp: t.default.attr("boolean"), azISSNSearchTemplate: t.default.attr("string"), azPreProxy: t.default.attr("string"), azSystem: t.default.attr("string"), azSystemLibraryId: t.default.attr("string"), azTitleSearchTemplate: t.default.attr("string"), aToZListUrl: t.default.attr("string"), knownJournalLookupTemplate: t.default.attr("string"), displayPublisherHomePageLinkButton: t.default.attr("boolean"), promoLink: t.default.attr("string"), promoLabel: t.default.attr("string"), accessProvidedByLink: t.default.attr("string"), accessProvidedByLabel: t.default.attr("string"), externalSearchHeader: t.default.attr("string"), infoURL: t.default.attr("string"), webInfoURL: t.default.attr("string"), subscriptions: t.default.attr(), webLoginInfo: t.default.attr(), defaultIssue: t.default.attr("string"), supportsILL: t.default.attr("boolean"), webStripsProxy: t.default.attr("boolean"), webLoginInfoTitle: t.default.attr("string"), webLoginInfoDescription: t.default.attr("string"), webLoginInfoContinueLabel: t.default.attr("string"), webLoginInfoLinkLabel: t.default.attr("string"), webLoginInfoLinkUrl: t.default.attr("string"), nativeLoginInfoTitle: t.default.attr("string"), nativeLoginInfoDescription: t.default.attr("string"), nativeLoginInfoContinueLabel: t.default.attr("string"), nativeLoginInfoLinkLabel: t.default.attr("string"), nativeLoginInfoLinkUrl: t.default.attr("string"), allBackIssuesMessage: t.default.attr("string"), formattedExternalSearchHeader: (0, n.intl)("externalSearchHeader", function (e) { return Ember.isEmpty(this.get("externalSearchHeader")) ? e.t("search.search_results.external_results_header") : this.get("externalSearchHeader") }), subjects: t.default.hasMany("subject", { async: !0 }), bpsLibrary: t.default.attr("boolean"), forceAuthAtFrontDoor: t.default.attr("boolean"), ssoEnabled: t.default.attr("boolean"), ssoRequiredOnSite: t.default.attr("boolean"), articleTitleUsesBestAvailableLink: t.default.attr("boolean"), languagesSupported: t.default.attr("string")
    })
}), define("browzine-web/models/my-bookcase", ["exports", "browzine-web/mixins/journal-container"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Object.extend(t.default, { children: Ember.computed.alias("bookshelves"), syncData: Ember.computed("title", "bookshelves.@each.syncData", function () { return { title: this.get("title"), bookshelves: this.get("bookshelves").mapBy("syncData") } }), id: Ember.computed("index", "title", function () { return this.get("index") + "-" + (this.get("title") || "").dasherize() }) }) }), define("browzine-web/models/my-bookshelf", ["exports", "browzine-web/mixins/journal-container"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Object.extend(t.default, {
        children: Ember.computed.alias("journals"), isFull: Ember.computed.gte("notMovingJournals.length", 4), notMovingJournals: Ember.computed.filterBy("journals", "isMoving", !1), addJournal: function (e, t) {
            var n = this.get("journals")
            if (t) {
                var r = n.indexOf(t)
                n.insertAt(r, e)
            } else n.addObject(e)
        }, deleteJournal: function (e) { this.get("journals").removeObject(e) }, syncData: Ember.computed("title", "journals.@each.syncData", function () { return { title: this.get("title"), items: this.get("journals").mapBy("syncData") } }), myJournalJournals: Ember.computed.mapBy("journals", "journal"), journalIds: Ember.computed.mapBy("myJournalJournals", "id")
    })
}), define("browzine-web/models/my-bookshelves", ["exports", "browzine-web/mixins/journal-container"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 })
    e.default = Ember.Object.extend(t.default, {
        children: Ember.computed.alias("bookcases"), init: function () {
            for (var e = [], t = 0; t < 4; t++) {
                var n = Ember.getOwner(this)
                e.push(n.resolveRegistration("model:my-bookcase").create({ index: t + 1 }))
            } e.forEach(function (t, n) {
                var r = (n + 1) % 4, i = (4 + n - 1) % 4
                t.set("next", e.objectAt(r)), t.set("previous", e.objectAt(i))
            }), this.set("bookcases", e)
        }, getBookcase: function (e) {
            var t = parseInt(e, 10)
            return this.get("bookcases").objectAt(t - 1)
        }, syncData: Ember.computed("bookcases.@each.syncData", function () { return { $schema: this.get("schema"), _id: "my_bookshelf", bookcases: this.get("bookcases").mapBy("syncData"), type: this.get("type") } })
    })
}), define("browzine-web/models/my-journal", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Object.extend(Ember.PromiseProxyMixin, {
        store: Ember.inject.service(), unreads: Ember.inject.service(), isMoving: !1, journal: Ember.computed("isPending", "unavailable", "content", function () { return this.get("isPending") || this.get("unavailable") ? this.get("unresolved") : this.get("content") }), hasJournal: function (e) { return this.get("journal.id") === e.get("id") }, articleStatusCollection: Ember.computed("journal.id", function () { return this.get("unreads").getJournalStatusById(this.get("journal.id")) }), unreadCount: Ember.computed.alias("articleStatusCollection.unreadCount"), syncData: Ember.computed("journal", "unavailable", "isPending", {
            get: function () { return { title: this.get("journal.title"), coverImage: this.get("journal.coverURL"), journal: this.get("journal.id") } }, set: function (e, t) {
                var n = this, r = this.get("store"), i = (t.coverImage || "").replace("http:", "https:")
                this.set("unresolved", { id: t.journal + "", title: t.title, coverURL: i })
                var a = r.peekRecord("journal", t.journal), s = void 0
                return a ? (s = Ember.RSVP.resolve(a), this.set("unavailable", !a.get("available"))) : s = r.findRecord("journal", t.journal, { preload: { library: this.get("library") } }).then(function (e) { return n.set("unavailable", !1), e }).catch(function () { return n.set("unavailable", !0), {} }), this.set("promise", s), a ? { journal: a.get("id"), title: a.get("title"), coverImage: a.get("coverURL") } : { journal: t.journal + "", title: t.title, coverImage: i }
            }
        })
    })
}), define("browzine-web/models/publication-year", ["exports", "ember-data"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.Model.extend({}) }), define("browzine-web/models/search", ["exports", "ember-data"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.Model.extend({ query: t.default.attr("string"), createdAt: t.default.attr("date", { defaultValue: function () { return new Date } }) }) }), define("browzine-web/models/subject", ["exports", "ember-data", "ember-data-has-many-query"], function (e, t, n) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.Model.extend(n.default.ModelMixin, { library: t.default.belongsTo("library", { async: !0 }), name: t.default.attr("string"), bookcases: t.default.hasMany("bookcase", { async: !0 }), bookshelves: t.default.hasMany("bookshelf", { async: !0 }), journals: t.default.hasMany("journal", { async: !0, inverse: "subjects" }), rankSortedJournals: t.default.hasMany("journal", { async: !0, inverse: null }) }) }), define("browzine-web/resolver", ["exports", "ember-resolver"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default }), define("browzine-web/router", ["exports", "browzine-web/config/environment"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 })
    var n = Ember.Router.extend({ location: t.default.locationType, rootURL: t.default.rootURL })
    n.map(function () { "test" === t.default.environment && this.route("refresh-collection-in-store-from-pouch", { path: "/test-helper/refresh-collection-in-store-from-pouch" }), this.route("libraries", function () { this.route("images") }), this.route("oauth"), this.route("auth", function () { this.route("login"), this.route("signup"), this.route("reset"), this.route("bps") }), this.route("confirm-email", { path: "/confirm-email/:token" }), this.route("token-failure", { path: "/token-failure/:library_id" }), this.route("article-full-text-file", { path: "libraries/:library_id/articles/:article_id/full-text-file" }), this.route("accept-token", { path: "libraries/:library_id/accept-token" }), this.route("libraryless-settings", { path: "/settings" }), this.route("library", { path: "libraries/:library_id" }, function () { this.route("login"), this.route("sso-login"), this.route("user-idle-session-expired"), this.route("my-articles", function () { this.route("index", { path: "/" }), this.route("collection", { path: ":collection_id" }) }), this.route("app-promotion"), this.route("my-bookshelf", { resetNamespace: !0 }, function () { this.route("bookcase", { path: ":bookcase_index" }) }), this.route("settings", function () { this.route("user-settings", { path: "/" }), this.route("library-customization", { path: "/library" }) }), this.route("journal", { path: "journals/:journal_id" }, function () { this.route("issue", { path: "issues/:issue_id" }, function () { }), this.route("current-issue", { path: "issues/current" }), this.route("latest-full-text-issue", { path: "issues/latest-full-text" }), this.route("articles-in-press", { path: "articles-in-press" }) }), this.route("subjects"), this.route("subject", { path: "subjects/:subject_id" }, function () { this.route("bookcase", { path: "bookcases/:bookcase_id" }, function () { this.route("bookshelf", { path: "bookshelves/:bookshelf_id" }) }) }), this.route("unavailable"), this.route("vpn-required"), this.route("article", { path: "articles/:article_id" }), this.route("article-download", { path: "articles/:article_id/pdf" }), this.route("article-retraction-notice", { path: "articles/:article_id/retraction-notice" }) }), this.route("doi-lookup", { path: "articles/doi/*doi" }), this.route("doi-redirect", { path: "doi/*doi" }), this.route("article", { path: "articles/:article_id" }), this.route("issue", { path: "/journals/:journal_id/issues/:issue_id" }), this.route("article-download", { path: "articles/:article_id/pdf" }), this.route("wayf", { path: "wayf" }), this.route("article-wayf", { path: "wayf/:article_id" }), this.route("issue-wayf", { path: "issue-wayf/:issue_id" }), this.route("unknown", { path: "*path" }) }), e.default = n
}), define("browzine-web/routes/accept-token", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        queryParams: { token: {}, intent: {} }, auth: Ember.inject.service(), analytics: Ember.inject.service(), applicationSession: Ember.inject.service(), i18n: Ember.inject.service(), beforeModel: function (e) {
            var t = this, n = e.queryParams.token, r = e.queryParams.userToken
            if (!n) throw new Error('There was an error trying to authorize BrowZine to access library "' + name + '"')
            var i = e.params["accept-token"].library_id, a = this.get("applicationSession")
            a.storeTokenForLibrary(i, { token: e.queryParams.token }), a.set("selectedLibrary", i), this.store.unloadAll()
            var s, o = this.get("library")
            return this.get("i18n").determineAndSetLocale(o), Ember.RSVP.resolve().then(function () { if (r) return t.get("auth").authenticateWithUserToken(r) }).then((s = regeneratorRuntime.mark(function n() {
                var r
                return regeneratorRuntime.wrap(function (n) {
                    for (; ;)switch (n.prev = n.next) {
                        case 0: return n.next = 2, t.get("analytics").recordEvent({ category: "Login", action: "Login To Library" })
                        case 2: if (!e.queryParams.intent) {
                            n.next = 12
                            break
                        } if (r = JSON.parse(window.atob(e.queryParams.intent)), e.abort(), !r.url) {
                            n.next = 9
                            break
                        } return n.abrupt("return", t.transitionTo(r.url))
                        case 9: console.log("Malformed intent - do appropriate action here")
                        case 10: n.next = 13
                            break
                        case 12: return n.abrupt("return", t.transitionTo("library", i))
                        case 13: case "end": return n.stop()
                    }
                }, n, t)
            }), function () {
                var e = s.apply(this, arguments)
                return new Promise(function (t, n) {
                    return function r(i, a) {
                        try { var s = e[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        t(o)
                    }("next")
                })
            }))
        }
    })
}), define("browzine-web/routes/application", ["exports", "browzine-web/config/environment", "browzine-web/mixins/route-auth-helpers", "browzine-web/errors/ApiSessionExpiredError", "browzine-web/errors/AuthRequiredError"], function (e, t, n, r, i) {
    function a(e) {
        return function () {
            var t = e.apply(this, arguments)
            return new Promise(function (e, n) {
                return function r(i, a) {
                    try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                    e(o)
                }("next")
            })
        }
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend(n.default, {
        flashMessages: Ember.inject.service(), errorReporter: Ember.inject.service(), applicationSession: Ember.inject.service(), auth: Ember.inject.service(), myBookshelf: Ember.inject.service(), userIdle: Ember.inject.service(), analytics: Ember.inject.service(), i18n: Ember.inject.service(), isUserSessionExpired: function (e) { return this.get("auth").lookupUserSession(e).then(function (e) { return !e }) }, fireOpenedEvent: function () {
            var e = a(regeneratorRuntime.mark(function e(t, n) {
                var r
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return r = this.get("analytics"), t && r.setCustomDimension(1, t), e.next = 4, r.recordEvent({ category: "Activity", action: "Opened", routeName: n })
                        case 4: case "end": return e.stop()
                    }
                }, e, this)
            }))
            return function (t, n) { return e.apply(this, arguments) }
        }(), beforeModel: function () {
            var e = a(regeneratorRuntime.mark(function e(n) {
                var r, i, a, s, o, l, u, c, d, m, b, f, p, h = this
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: if (p = function (e) { return e.indexOf("://") > -1 ? e.split("/")[2] : e.split("/")[0] }, r = this.get("applicationSession"), i = this.get("analytics"), a = !r.get("_anyTransitionRun"), r.set("_anyTransitionRun", !0), a && (i.setUTMDimension("utm_source", n.queryParams.utm_source), i.setUTMDimension("utm_medium", n.queryParams.utm_medium), i.setUTMDimension("utm_campaign", n.queryParams.utm_campaign), i.setUTMDimension("utm_term", n.queryParams.utm_term), i.setUTMDimension("utm_content", n.queryParams.utm_content)), s = r.get("selectedLibrary"), o = r.get("mostRecentLibrary"), window.opener = null, l = s ? this.store.findRecord("library", s) : Ember.RSVP.resolve(), s) {
                            e.next = 27
                            break
                        } if (u = n.queryParams, c = void 0 === u ? {} : u, d = n.params, m = void 0 === d ? {} : d, b = Object.values(m).find(function (e) { return e.library_id }) || {}, !(f = c.selectedLibrary || b.library_id || o)) {
                            e.next = 22
                            break
                        } return r.set("selectedLibrary", f), l = this.store.findRecord("library", f), r.set("mostRecentLibrary", f), e.next = 20, this.fireOpenedEvent(f, n.targetName)
                        case 20: e.next = 25
                            break
                        case 22: return e.next = 24, this.fireOpenedEvent(null, n.targetName)
                        case 24: "test" !== t.default.environment && console.warn("Could not associate window with a selected library from queryParameters or route parameters, leaving window unassociated")
                        case 25: e.next = 29
                            break
                        case 27: return e.next = 29, this.fireOpenedEvent(s, n.targetName)
                        case 29: Ember.testing || this.get("userIdle").on("idleChanged", function (e) {
                            var t = void 0
                            e ? r.get("userIsLoggedIn") && function e() {
                                var n = r.get("loggedInUser")
                                h.isUserSessionExpired(n.token).then(function (n) {
                                    if (n) {
                                        var i = r.get("selectedLibrary")
                                        return h.transitionTo("library.user-idle-session-expired", i)
                                    } t = Ember.run.later(function () { e() }, 3e5)
                                })
                            }() : t && Ember.cancel(t)
                        }), Ember.RSVP.resolve().then(function () { return l }).then(function (e) {
                            return h.get("i18n").determineAndSetLocale(e), Ember.RSVP.resolve().then(function () {
                                if (r.get("userIsLoggedIn") && a) {
                                    var t = r.get("loggedInUser")
                                    return h.isUserSessionExpired(t.token).then(function (t) { t && (e.get("ssoEnabled") && r.clearLibraryToken(e.get("id")), r.clearLoggedInUser()) })
                                }
                            }).then(function () { return e })
                        }).then(function (e) {
                            if (!1 === e.get("webStripsProxy")); else {
                                var n = p(t.default.baseURLForProxyComparison)
                                if (n && n.length > 0 && "test" !== t.default.environment && -1 === n.indexOf(window.location.host)) {
                                    var r = window.location.protocol + "//" + n + window.location.pathname + window.location.search
                                    window.location = r
                                }
                            }
                        }).catch(function () { })
                        case 31: case "end": return e.stop()
                    }
                }, e, this)
            }))
            return function (t) { return e.apply(this, arguments) }
        }(), actions: {
            loading: function (e) {
                var t = this.get("applicationSession")
                return e.promise.finally(function () { t.set("localizedModelsNeedReload", !1), t.set("languageSwitching", !1) }), !t.get("languageSwitching")
            }, error: function (e, t) {
                if (e instanceof r.default || e instanceof i.default) {
                    var n = this.get("applicationSession").get("selectedLibrary")
                    if (n) return this.handleAPIAuthDemandError(e, n, t)
                    console.warn("Received unexpected Auth demand: API demands auth, but no library is selected")
                } t && t.intent && t.intent.url && (e.lastTransitionUrl = t.intent.url)
                try { this.get("errorReporter").reportUnknownError("error transitioning to " + t.targetName, e) } catch (a) { console.error(a) } return !0
            }, goToCurrentLibrary: function () {
                var e = this.get("applicationSession").get("selectedLibrary"), t = this.get("myBookshelf.loginRequired"), n = this.get("myBookshelf.returnRoute")
                t && n ? this.transitionTo(n) : e ? this.transitionTo("library", e) : this.transitionTo("libraries")
            }
        }, title: function (e) { return e.reverse().join(" — ") + (e.length > 0 ? " — " : "") + "BrowZine" }
    })
}), define("browzine-web/routes/article-download", ["exports", "browzine-web/config/environment", "browzine-web/mixins/route-auth-helpers", "browzine-web/mixins/article-loading-route", "browzine-web/errors/ApiSessionExpiredError", "browzine-web/errors/AuthRequiredError"], function (e, t, n, r, i, a) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend(n.default, r.default, {
        auth: Ember.inject.service(), intl: Ember.inject.service(), controllerName: "article", templateName: "article", beforeModel: function (e) { return this.ensureLibrarySelectedForArticle(e, e.params["article-download"].article_id) }, model: function (e) {
            e.disableRedirect ? this.set("disableRedirect", !0) : this.set("disableRedirect", !1), this.set("hasFullTextFile", !0)
            var t = this.get("applicationSession").get("selectedLibrary"), n = this.store.findRecord("article", e.article_id, { reload: !0, include: "issue,journal" }), r = this.store.findRecord("library", t)
            return this.prepareArticleLoadingBoxModel(n, r).catch(function (e) {
                if (404 === e.status) {
                    var t = new Error("Article not found")
                    throw t.articleNotFound = !0, t
                } throw e
            })
        }, afterModel: function () {
            var e, n = (e = regeneratorRuntime.mark(function e(n) {
                var r, i, a, s, o, l
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return e.next = 2, this.get("analytics").recordEvent({ category: "ArticleDownloadSuccess", action: n.article.id, label: n.journal.get("title"), value: n.journal.id, openAccess: n.article.get("openAccess") })
                        case 2: r = n.article.get("fullTextFile"), i = !!r, this.set("hasFullTextFile", i), "test" !== t.default.environment && this.hasFullTextFileAccess(n, i) && !this.get("disableRedirect") && (a = this.get("applicationSession"), s = a.get("selectedLibrary"), o = a.lookupLibraryToken(s).token, (l = new URL(r)).searchParams.has("access_token") || l.searchParams.append("access_token", o), l.searchParams.has("client") || l.searchParams.append("client", "bzweb"), this.set("content-location-to-redirect-to", l.toString()))
                        case 6: case "end": return e.stop()
                    }
                }, e, this)
            }), function () {
                var t = e.apply(this, arguments)
                return new Promise(function (e, n) {
                    return function r(i, a) {
                        try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        e(o)
                    }("next")
                })
            })
            return function (e) { return n.apply(this, arguments) }
        }(), renderTemplate: function () { this.setupRedirectAfterRender({ urlPropertyName: "content-location-to-redirect-to" }), this.render() }, titleToken: function (e) { return Ember.getWithDefault(e, "title", this.get("intl").t("article.default_page_title_token")) }, setupController: function (e, t) { e.set("article", t.article), e.set("issue", t.issue), e.set("library", t.library), e.set("journal", t.journal), e.set("hasFullTextFile", this.get("hasFullTextFile")), e.set("loadingType", "fullTextFile") }, actions: {
            error: function (e, t) {
                if (e instanceof i.default || e instanceof a.default) {
                    var n = this.get("applicationSession").get("selectedLibrary")
                    return this.handleAPIAuthDemandError(e, n, t)
                } return !0
            }
        }
    })
}), define("browzine-web/routes/article-full-text-file", ["exports", "browzine-web/mixins/route-auth-helpers", "browzine-web/mixins/article-loading-route", "ember-window-mock", "lodash.omit"], function (e, t, n, r, i) {
    function a(e) {
        return function () {
            var t = e.apply(this, arguments)
            return new Promise(function (e, n) {
                return function r(i, a) {
                    try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                    e(o)
                }("next")
            })
        }
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend(t.default, n.default, {
        analytics: Ember.inject.service(), applicationSession: Ember.inject.service(), controllerName: "article", templateName: "article-full-text-file", beforeModel: function () {
            var e = a(regeneratorRuntime.mark(function e(t) {
                var n, r, a, s
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: if (n = t.params["article-full-text-file"].library_id, this.get("analytics").setCustomDimension(1, n), r = this.get("applicationSession"), r.lookupLibraryToken(n)) {
                            e.next = 6
                            break
                        } return e.abrupt("return", this.get("auth").authenticateLibrary({ libraryId: n }, t))
                        case 6: if (!t.queryParams.utm_source || !t.queryParams.utm_source.includes("api_")) {
                            e.next = 11
                            break
                        } return a = t.params["article-full-text-file"].library_id, s = t.params["article-full-text-file"].article_id, e.next = 10, this.get("analytics").recordEvent({ category: "PublicAPIFullTextFile", action: s })
                        case 10: this.replaceWith("article-full-text-file", a, s, { queryParams: (0, i.default)(t.queryParams, "utm_source") })
                        case 11: case "end": return e.stop()
                    }
                }, e, this)
            }))
            return function (t) { return e.apply(this, arguments) }
        }(), model: function (e) {
            var t = this.get("applicationSession"), n = this.store.findRecord("article", e.article_id, { reload: !0, include: "issue,journal" }), r = this.store.findRecord("library", t.get("selectedLibrary"))
            return this.prepareArticleLoadingBoxModel(n, r)
        }, afterModel: function () {
            var e = a(regeneratorRuntime.mark(function e(t, n) {
                var i, a, s, o, l, u, c, d, m, b
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: if (i = t.journal.get("id"), a = t.issue.get("id"), s = n.params["article-full-text-file"].article_id, o = this.get("applicationSession"), l = o.get("selectedLibrary"), u = t.article.get("fullTextFile")) {
                            e.next = 8
                            break
                        } return e.abrupt("return", this.transitionTo("library.journal.issue", l, i, a, { queryParams: { showArticleInContext: "doi:" + t.article.get("doi") } }))
                        case 8: if (this.set("hasFullTextFile", !0), c = "", n.queryParams.ref_system && (c = "&ref_system=" + n.queryParams.ref_system), d = o.lookupLibraryToken(l).token, !t.article.get("vpnRequired") || t.article.get("openAccess")) {
                            e.next = 14
                            break
                        } return e.abrupt("return")
                        case 14: return (m = new URL(u)).searchParams.has("access_token") || m.searchParams.append("access_token", d), m.searchParams.has("client") || m.searchParams.append("client", "bzweb"), b = "" + m.toString() + c, e.next = 20, this.get("analytics").recordEvent({ category: "ArticleDownloadSuccess", action: s, label: t.journal.get("title"), value: i, openAccess: t.article.get("openAccess") })
                        case 20: r.default.location.replace(b)
                        case 21: case "end": return e.stop()
                    }
                }, e, this)
            }))
            return function (t, n) { return e.apply(this, arguments) }
        }(), setupController: function (e, t) { e.set("article", t.article), e.set("issue", t.issue), e.set("library", t.library), e.set("journal", t.journal), e.set("hasFullTextFile", this.get("hasFullTextFile")), e.set("loadingType", "fullTextFile") }
    })
}), define("browzine-web/routes/article-wayf", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        header: Ember.inject.service(), model: function (e) {
            var t = void 0
            if (0 === decodeURIComponent(e.article_id).indexOf("doi:")) {
                var n = decodeURIComponent(e.article_id).substring("doi:".length)
                t = this.store.queryRecord("article", { doi: n, reload: !0, include: "issue,journal" })
            } else t = this.store.findRecord("article", e.article_id, { reload: !0, include: "issue, journal" })
            return Ember.RSVP.hash({ article: t, libraries: this.store.findAll("library").then(function (e) { return e.filterBy("subscriptions.web.active") }) })
        }, setupController: function (e, t) { this._super.apply(this, arguments), Ember.set(e, "article", t.article) }, titleToken: function () { return this.get("header").setProperties({ subject: { value: "Choose", template: !1 }, title: { value: "Library", template: !1 } }), "Choose Library" }
    })
}), define("browzine-web/routes/article", ["exports", "browzine-web/config/environment", "browzine-web/mixins/route-auth-helpers", "browzine-web/mixins/article-loading-route", "browzine-web/errors/ApiSessionExpiredError", "browzine-web/errors/AuthRequiredError"], function (e, t, n, r, i, a) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend(n.default, r.default, {
        auth: Ember.inject.service(), intl: Ember.inject.service(), beforeModel: function (e) { return this.ensureLibrarySelectedForArticle(e, e.params.article.article_id) }, model: function (e) {
            e.disableRedirect ? this.set("disableRedirect", !0) : this.set("disableRedirect", !1), this.set("hasArticle", !0)
            var t = this.get("applicationSession").get("selectedLibrary")
            this.get("analytics").setCustomDimension(1, t)
            var n = this.store.findRecord("article", e.article_id, { reload: !0, include: "issue,journal" }), r = this.store.findRecord("library", t)
            return this.prepareArticleLoadingBoxModel(n, r).catch(function (e) {
                if (404 === e.status) {
                    var t = new Error("Article not found")
                    throw t.articleNotFound = !0, t
                } throw e
            })
        }, afterModel: function () {
            var e, n = (e = regeneratorRuntime.mark(function e(n) {
                var r, i, a, s, o
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return e.next = 2, this.get("analytics").recordEvent({ category: "ArticleDownloadSuccess", action: n.article.id, label: n.journal.get("title"), value: n.journal.id, openAccess: n.article.get("openAccess") })
                        case 2: Ember.isEmpty(n.article.get("contentLocation")) && this.set("hasArticle", !1), "test" !== t.default.environment && this.hasFullTextAccess(n, this.get("hasArticle")) && !this.get("disableRedirect") && (r = n.article.get("contentLocation"), i = this.get("applicationSession"), a = i.get("selectedLibrary"), s = i.lookupLibraryToken(a).token, (o = new URL(r)).searchParams.has("access_token") || o.searchParams.append("access_token", s), o.searchParams.has("client") || o.searchParams.append("client", "bzweb"), this.set("content-location-to-redirect-to", o.toString()))
                        case 4: case "end": return e.stop()
                    }
                }, e, this)
            }), function () {
                var t = e.apply(this, arguments)
                return new Promise(function (e, n) {
                    return function r(i, a) {
                        try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        e(o)
                    }("next")
                })
            })
            return function (e) { return n.apply(this, arguments) }
        }(), renderTemplate: function () { this.setupRedirectAfterRender({ urlPropertyName: "content-location-to-redirect-to" }), this.render() }, titleToken: function (e) { return Ember.getWithDefault(e, "title", this.get("intl").t("article.default_page_title_token")) }, setupController: function (e, t) { e.set("article", t.article), e.set("issue", t.issue), e.set("library", t.library), e.set("journal", t.journal), e.set("hasArticle", this.get("hasArticle")), e.set("loadingType", "fullText") }, actions: {
            error: function (e, t) {
                if (e instanceof i.default || e instanceof a.default) {
                    var n = this.get("applicationSession").get("selectedLibrary")
                    return this.handleAPIAuthDemandError(e, n, t)
                } return !0
            }
        }
    })
}), define("browzine-web/routes/auth", ["exports", "urijs"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        auth: Ember.inject.service(), windowLocation: Ember.inject.service(), myBookshelf: Ember.inject.service(), myArticles: Ember.inject.service(), applicationSession: Ember.inject.service(), intl: Ember.inject.service(), callback: null, deviceId: null, libraryId: null, userToken: null, checkBps: null, beforeModel: function (e) { e.queryParams.returnRoute = e.queryParams.returnRoute || this.get("myBookshelf.returnRoute"), e.queryParams.loginRequired = e.queryParams.loginRequired || this.get("myBookshelf.loginRequired"), this.set("callback", e.queryParams.callback), this.set("deviceId", e.queryParams["device-id"]), this.set("libraryId", e.queryParams["library-id"]), this.set("userToken", e.queryParams["user-token"]), this.set("checkBps", e.queryParams["check-bps"]), this.set("returnRoute", e.queryParams.returnRoute), this.set("loginRequired", e.queryParams.loginRequired), this.set("returnParameter", e.queryParams.returnParameter), this.set("confirmBpsEmail", e.queryParams["confirm-bps-email"]) }, model: function () {
            var e = this, t = this.get("libraryId")
            return this.get("auth").checkIfLibraryUsesBPS(t).then(function (t) { return Ember.RSVP.hash({ confirmingBpsEmail: e.get("confirmBpsEmail"), checkingBps: e.get("checkBps"), isBpsLibrary: t, loginRequired: e.get("loginRequired"), returnRoute: e.get("returnRoute"), deviceId: e.get("deviceId"), userToken: e.get("userToken") }) })
        }, titleToken: function () { return this.get("intl").t("auth.login_page_title") }, actions: {
            loginComplete: function () {
                var e = this, t = this.get("auth"), n = this.get("callback"), r = this.get("returnRoute"), i = this.get("confirmBpsEmail"), a = this.get("checkingBps"), s = this.get("loginRequired"), o = this.get("libraryId"), l = this.get("applicationSession").get("transitionToRetryAfterAuth")
                if (i || a) this.transitionTo("auth.bps", { queryParams: { "library-id": this.get("libraryId") } })
                else {
                    if (n) return t.checkIfLibraryUsesBPS(o).then(function (t) { t ? e.transitionTo("auth.bps", { queryParams: { "library-id": e.get("libraryId") } }) : e.send("sendDeviceCallback") })
                    if (l) return this.get("applicationSession").set("transitionToRetryAfterAuth", void 0), l.retry()
                    Ember.isEmpty(r) ? this.send("goToCurrentLibrary") : s && r ? (localStorage.setItem("myBookshelf.shelve", JSON.stringify(this.get("myBookshelf.shelve"))), localStorage.setItem("myArticles.addToMyArticles", this.get("myArticles.addToMyArticles")), this.get("windowLocation").assign(r)) : this.transitionTo(r, this.get("returnParameter"))
                }
            }, sendDeviceCallback: function (e) {
                var n = this.get("callback"), r = this.get("applicationSession").get("loggedInUser"), i = r.userId, a = r.email, s = r.token, o = r.couchdbDatabaseLocation, l = (0, t.default)(n).addQuery("user-id", i).addQuery("email", a).addQuery("api-token", s).addQuery("couch-url", o)
                e && (l.addQuery("bps-token", e.token), l.addQuery("bps-expires-at", e.expiresAt)), this.get("windowLocation").assign(l.toString())
            }
        }
    })
}), define("browzine-web/routes/auth/bps", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({ auth: Ember.inject.service(), libraryId: null, beforeModel: function (e) { this.set("libraryId", e.queryParams["library-id"]) }, model: function () { return { check: this.modelFor("auth").checkingBps, showContinueButton: !this.modelFor("auth").confirmingBpsEmail, libraryId: this.get("libraryId") } } }) }), define("browzine-web/routes/auth/login", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({ actions: { forwardToSignup: function (e) { this.transitionTo("auth.signup", { queryParams: { addPasswordFor: e } }) } } }) }), define("browzine-web/routes/auth/reset", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({ beforeModel: function (e) { this.set("token", e.queryParams.token), this.set("email", e.queryParams.email) }, model: function () { return { token: this.get("token"), email: this.get("email") } }, actions: { signUpUnknownUser: function (e) { this.transitionTo("auth.signup", { queryParams: { addPasswordFor: e } }) } } }) }), define("browzine-web/routes/auth/signup", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        auth: Ember.inject.service(), myBookshelf: Ember.inject.service(), beforeModel: function (e) { this.set("deviceId", e.queryParams["device-id"]), e.queryParams.returnRoute = e.queryParams.returnRoute || this.get("myBookshelf.returnRoute"), e.queryParams.loginRequired = e.queryParams.loginRequired || this.get("myBookshelf.loginRequired"), this.set("addPasswordFor", e.queryParams.addPasswordFor), this.set("loginRequired", e.queryParams.loginRequired), this.set("returnRoute", e.queryParams.returnRoute) }, model: function () {
            var e = this
            return Ember.RSVP.Promise.resolve().then(function () { return new Ember.RSVP.hash({ email: e.get("addPasswordFor"), addPassword: !!e.get("addPasswordFor"), isBpsLibrary: e.modelFor("auth").isBpsLibrary, loginRequired: e.get("loginRequired"), returnRoute: e.get("returnRoute"), deviceId: e.get("deviceId") }) })
        }
    })
}), define("browzine-web/routes/confirm-email", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        header: Ember.inject.service(), auth: Ember.inject.service(), myBookshelf: Ember.inject.service(), myArticles: Ember.inject.service(), intl: Ember.inject.service(), showBpsMessage: null, beforeModel: function (e) { this.set("myBookshelf.returnRoute", e.queryParams.returnRoute), this.set("myBookshelf.loginRequired", e.queryParams.loginRequired), this.set("myBookshelf.shelve", e.queryParams.shelve), this.set("myArticles.addToMyArticles", e.queryParams.addToMyArticles), localStorage.setItem("myArticles.addToMyArticles", e.queryParams.addToMyArticles), e.queryParams.showBpsMessage && "undefined" !== e.queryParams.showBpsMessage && this.set("showBpsMessage", JSON.parse(e.queryParams.showBpsMessage)) }, model: function (e) { return this.get("auth").confirmEmail(e.token) }, titleToken: function () {
            var e = this.get("intl").t("auth.confirm_email_title")
            return this.get("header").setProperties({ subject: { value: "BrowZine", template: !1 }, title: { value: e, template: !1 } }), e
        }, setupController: function (e) { e.set("showBpsMessage", this.get("showBpsMessage")) }
    })
})
define("browzine-web/routes/doi-lookup", ["exports", "browzine-web/config/environment", "browzine-web/mixins/route-auth-helpers", "browzine-web/mixins/article-loading-route", "browzine-web/errors/ApiSessionExpiredError", "browzine-web/errors/AuthRequiredError"], function (e, t, n, r, i, a) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend(n.default, r.default, {
        intl: Ember.inject.service(), controllerName: "article", templateName: "article", beforeModel: function (e) {
            var t = e.params["doi-lookup"].doi
            return this.ensureLibrarySelectedForArticle(e, encodeURIComponent("doi:" + t))
        }, model: function (e) {
            var t = this.get("applicationSession").get("selectedLibrary"), n = e.doi, r = this.store.queryRecord("article", { doi: n, reload: !0, include: "issue,journal" }), i = this.store.findRecord("library", t)
            return this.set("disableRedirect", !!e.disableRedirect), this.set("hasArticle", !0), this.prepareArticleLoadingBoxModel(r, i).then(function (e) { return e }).catch(function (e) {
                if (404 === e.status) {
                    var t = new Error("Article not found")
                    throw t.articleNotFound = !0, t
                } throw e
            })
        }, afterModel: function (e) {
            if (Ember.isEmpty(e.article.get("contentLocation")) && this.set("hasArticle", !1), "test" !== t.default.environment && e.article.get("browseable") && !this.get("disableRedirect")) {
                var n = void 0
                n = e.article.get("inPress") ? ["library.journal.articles-in-press", e.library.id, e.journal.id, { queryParams: { showArticleInContext: "doi:" + e.article.doi } }] : ["library.journal.issue", e.library.id, e.journal.id, e.issue.id, { queryParams: { showArticleInContext: "doi:" + e.article.get("doi") } }], this.set("article-in-context-to-transition-to", n)
            }
        }, renderTemplate: function () { this.setupRedirectAfterRender({ transitionToArgumentsPropertyName: "article-in-context-to-transition-to" }), this.render() }, titleToken: function (e) { return Ember.getWithDefault(e, "title", this.get("intl").t("article.default_page_title_token")) }, setupController: function (e, t) { e.set("article", t.article), e.set("issue", t.issue), e.set("library", t.library), e.set("journal", t.journal), e.set("hasArticle", this.get("hasArticle")), e.set("loadingType", "inContext") }, actions: {
            error: function (e, t) {
                if (e instanceof i.default || e instanceof a.default) {
                    var n = this.get("applicationSession").get("selectedLibrary")
                    this.handleAPIAuthDemandError(e, n, t)
                } return !0
            }
        }
    })
}), define("browzine-web/routes/doi-redirect", ["exports", "browzine-web/config/environment", "browzine-web/mixins/route-auth-helpers", "browzine-web/mixins/article-loading-route", "browzine-web/errors/ApiSessionExpiredError", "browzine-web/errors/AuthRequiredError"], function (e, t, n, r, i, a) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend(n.default, r.default, {
        intl: Ember.inject.service(), controllerName: "article", templateName: "article", beforeModel: function (e) {
            var t = e.params["doi-redirect"].doi
            return this.ensureLibrarySelectedForArticle(e, encodeURIComponent("doi:" + t))
        }, model: function (e) {
            var t = this.get("applicationSession").get("selectedLibrary"), n = e.doi, r = this.store.queryRecord("article", { doi: n, reload: !0, include: "issue,journal" }), i = this.store.findRecord("library", t)
            return this.set("disableRedirect", !!e.disableRedirect), this.set("hasArticle", !0), this.prepareArticleLoadingBoxModel(r, i).then(function (e) { return e }).catch(function (e) {
                if (404 === e.status) {
                    var t = new Error("Article not found")
                    throw t.articleNotFound = !0, t
                } throw e
            })
        }, afterModel: function () {
            var e, n = (e = regeneratorRuntime.mark(function e(n) {
                var r, i, a, s, o
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return e.next = 2, this.get("analytics").recordEvent({ category: "ArticleDownloadSuccess", action: n.article.id, label: n.journal.get("title"), value: n.journal.id, openAccess: n.article.get("openAccess") })
                        case 2: Ember.isEmpty(n.article.get("contentLocation")) && this.set("hasArticle", !1), "test" !== t.default.environment && this.hasFullTextAccess(n, this.get("hasArticle")) && !this.get("disableRedirect") && (r = n.article.get("contentLocation"), i = this.get("applicationSession"), a = i.get("selectedLibrary"), s = i.lookupLibraryToken(a).token, (o = new URL(r)).searchParams.has("access_token") || o.searchParams.append("access_token", s), o.searchParams.has("client") || o.searchParams.append("client", "bzweb"), this.set("content-location-to-redirect-to", o.toString()))
                        case 4: case "end": return e.stop()
                    }
                }, e, this)
            }), function () {
                var t = e.apply(this, arguments)
                return new Promise(function (e, n) {
                    return function r(i, a) {
                        try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        e(o)
                    }("next")
                })
            })
            return function (e) { return n.apply(this, arguments) }
        }(), renderTemplate: function () { this.setupRedirectAfterRender({ urlPropertyName: "content-location-to-redirect-to" }), this.render() }, titleToken: function (e) { return Ember.getWithDefault(e, "title", this.get("intl").t("article.default_page_title_token")) }, setupController: function (e, t) { e.set("article", t.article), e.set("issue", t.issue), e.set("library", t.library), e.set("journal", t.journal), e.set("hasArticle", this.get("hasArticle")), e.set("loadingType", "fullText") }, actions: {
            error: function (e, t) {
                if (e instanceof i.default || e instanceof a.default) {
                    var n = this.get("applicationSession").get("selectedLibrary")
                    this.handleAPIAuthDemandError(e, n, t)
                } return !0
            }
        }
    })
}), define("browzine-web/routes/error", ["exports", "browzine-web/config/environment"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        analytics: Ember.inject.service(), setupController: function (e, t) { e.set("model", t), console.error("transitioned to Error route for error: ", t) }, actions: {
            retry: function () {
                var e, n = (e = regeneratorRuntime.mark(function e() {
                    return regeneratorRuntime.wrap(function (e) {
                        for (; ;)switch (e.prev = e.next) {
                            case 0: return e.next = 2, this.get("analytics").recordEvent({ category: "ArticleTryAgainTapped", action: window.location.href })
                            case 2: "test" !== t.default.environment && window.location.reload()
                            case 3: case "end": return e.stop()
                        }
                    }, e, this)
                }), function () {
                    var t = e.apply(this, arguments)
                    return new Promise(function (e, n) {
                        return function r(i, a) {
                            try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                            e(o)
                        }("next")
                    })
                })
                return function () { return n.apply(this, arguments) }
            }()
        }
    })
}), define("browzine-web/routes/index", ["exports", "browzine-web/config/environment"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        errorReporter: Ember.inject.service(), auth: Ember.inject.service(), applicationSession: Ember.inject.service(), header: Ember.inject.service(), intl: Ember.inject.service(), beforeModel: function () {
            var e = this, t = this.get("applicationSession"), n = t.get("selectedLibrary"), r = t.get("mostRecentLibrary")
            if (n) this.transitionTo("library", n)
            else {
                if (!r) return this.get("store").query("library", { detect: "ip", subscription: "bzweb" }).then(function (t) {
                    if (t.get("length")) {
                        var n = t.get("firstObject").id
                        e.get("auth").authenticateLibraryDirectOnly(n).then(function () { return e.transitionTo("library", n) })
                    }
                }).catch(function () { e.get("errorReporter").reportLibraryDetectionError(), e.get("flashMessages").alert("Error detecting library") })
                this.transitionTo("library", r)
            }
        }, titleToken: function () { this.get("header").setProperties({ subject: { value: "library.header.welcome_to", template: !0 }, title: { value: "BrowZine", template: !1 } }) }, actions: {
            selectOpenAccessLibrary: function () {
                var e = this
                this.get("auth").authenticateLibrary({ libraryId: t.default.openAccessLibraryId }).then(function () { e.transitionTo("library", t.default.openAccessLibraryId) }, function () { e.transitionTo("token-failure", t.default.openAccessLibraryId) })
            }
        }
    })
}), define("browzine-web/routes/issue-wayf", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        model: function () {
            var e, t = (e = regeneratorRuntime.mark(function e(t) {
                var n
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return e.next = 2, this.store.findRecord("issue", t.issue_id, { reload: !0, include: "journal" })
                        case 2: return n = e.sent, e.abrupt("return", Ember.RSVP.hash({ issue: n, libraries: this.store.findAll("library").then(function (e) { return e.filterBy("subscriptions.web.active") }) }))
                        case 4: case "end": return e.stop()
                    }
                }, e, this)
            }), function () {
                var t = e.apply(this, arguments)
                return new Promise(function (e, n) {
                    return function r(i, a) {
                        try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        e(o)
                    }("next")
                })
            })
            return function (e) { return t.apply(this, arguments) }
        }(), setupController: function (e, t) { this._super.apply(this, arguments), e.set("issue", t.issue) }
    })
}), define("browzine-web/routes/issue", ["exports", "browzine-web/mixins/route-auth-helpers"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend(t.default, {
        applicationSession: Ember.inject.service(), auth: Ember.inject.service(), beforeModel: function () {
            var e, t = (e = regeneratorRuntime.mark(function e(t) {
                var n, r
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return n = this.get("applicationSession"), e.next = 3, this.ensureLibrarySelectedForIssue(t, t.params.issue.issue_id)
                        case 3: if (r = n.get("selectedLibrary")) {
                            e.next = 6
                            break
                        } return e.abrupt("return")
                        case 6: if ("true" !== t.queryParams.forceUserLogin) {
                            e.next = 10
                            break
                        } if (n.get("loggedInUser")) {
                            e.next = 10
                            break
                        } return n.set("transitionToRetryAfterAuth", t), e.abrupt("return", this.transitionTo("auth.login"))
                        case 10: return e.abrupt("return", this.transitionTo("library.journal.issue", r, t.params.issue.journal_id, t.params.issue.issue_id))
                        case 11: case "end": return e.stop()
                    }
                }, e, this)
            }), function () {
                var t = e.apply(this, arguments)
                return new Promise(function (e, n) {
                    return function r(i, a) {
                        try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        e(o)
                    }("next")
                })
            })
            return function (e) { return t.apply(this, arguments) }
        }()
    })
}), define("browzine-web/routes/libraries", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({ header: Ember.inject.service(), model: function () { return this.store.findAll("library").then(function (e) { return e.filterBy("subscriptions.web.active") }) }, titleToken: function () { return this.get("header").setProperties({ subject: { value: "Choose", template: !1 }, title: { value: "Library", template: !1 } }), "Choose Library" } }) }), define("browzine-web/routes/libraries/images", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({ renderTemplate: function () { this.render("libraries.images", { into: "application" }) } }) }), define("browzine-web/routes/library", ["exports", "browzine-web/mixins/reset-scroll-position", "browzine-web/mixins/route-auth-helpers", "browzine-web/errors/ApiSessionExpiredError", "browzine-web/errors/AuthRequiredError"], function (e, t, n, r, i) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend(t.default, n.default, {
        auth: Ember.inject.service(), sync: Ember.inject.service(), myBookshelf: Ember.inject.service(), queryParams: { query: { replace: !0 }, searchVisible: { replace: !0 } }, applicationSession: Ember.inject.service(), errorReporter: Ember.inject.service(), analytics: Ember.inject.service(), model: function (e) { return this.store.findRecord("library", e.library_id, { reload: !0 }) }, actions: {
            error: function (e, t) { return t && t.intent && t.intent.url && (e.lastTransitionUrl = t.intent.url), !(e instanceof r.default || e instanceof i.default) || this.handleAPIAuthDemandError(e, t.params.library.library_id, t) }, handleSearchError: function (e) {
                var t = this, n = this.refresh()
                return n.then(function () { t.controllerFor("library").notifyPropertyChange("query") }), this.send("error", e, n)
            }
        }, afterModel: function (e, t) {
            var n = this, r = this.get("applicationSession").get("loggedInUser"), i = this.get("applicationSession.selectedLibrary") !== e.id || r, a = !this.get("applicationSession").lookupLibraryToken(e.id)
            if (e.get("subscriptions.web.active")) { if (i && a && "library.unavailable" !== t.targetName && "library.vpn-required" !== t.targetName) return t.abort(), void this.get("auth").authenticateLibrary({ libraryId: e.id }, t).then(function () { t.retry() }, function (r) { r.ipRangeError ? (n.get("applicationSession").set("transitionToRetryAfterAuth", t), n.transitionTo("library.vpn-required", e.id)) : n.transitionTo("library.unavailable", e.id) }) } else this.get("flashMessages").alert("This library is not subscribed to BrowZine."), this.transitionTo("libraries")
            this.get("analytics").setCustomDimension(1, e.id), r && Ember.run.schedule("afterRender", this, function () {
                n.get("sync").ensureDataLoaded().then(function () {
                    var t = n.get("myBookshelf")
                    return t.set("library", e), t.get("model")
                }).catch(function (e) { console.log({ err: e }) })
            })
        }, onLoggedInUserChange: Ember.observer("applicationSession.loggedInUser", "sync.database", function (e, t, n, r) {
            var i = this
            this.get(t) != r && Ember.run.once(this, function () { i.get("applicationSession").get("loggedInUser") ? (i.get("myBookshelf").set("library", i.modelFor("library")), i.refresh()) : i.refresh() })
        }), setupController: function (e, t) { e.set("model", t), e.set("applicationController", this.controllerFor("application")), e.set("refreshCurrentRoute", this.refreshCurrentRoute.bind(this)) }, refreshCurrentRoute: function () {
            var e = this.get("applicationSession")
            e.set("languageSwitching", !0), e.set("localizedModelsNeedReload", !0), this.refresh()
        }, titleToken: function (e) { return Ember.getWithDefault(e, "name", "Library") }
    })
}), define("browzine-web/routes/library/article-download", ["exports", "browzine-web/mixins/route-auth-helpers", "browzine-web/mixins/article-loading-route", "browzine-web/errors/ApiSessionExpiredError", "browzine-web/errors/AuthRequiredError"], function (e, t, n, r, i) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend(t.default, n.default, {
        auth: Ember.inject.service(), intl: Ember.inject.service(), controllerName: "article", templateName: "article", beforeModel: function (e) { return this.ensureLibrarySelectedForArticle(e, e.params["library.article-download"].article_id) }, model: function (e) {
            e.disableRedirect ? this.set("disableRedirect", !0) : this.set("disableRedirect", !1), this.set("hasFullTextFile", !0)
            var t = this.get("applicationSession").get("selectedLibrary"), n = this.store.findRecord("article", e.article_id, { reload: !0, include: "issue,journal" }), r = this.store.findRecord("library", t)
            return this.prepareArticleLoadingBoxModel(n, r).catch(function (e) {
                if (404 === e.status) {
                    var t = new Error("Article not found")
                    throw t.articleNotFound = !0, t
                } throw e
            })
        }, afterModel: function () {
            var e, t = (e = regeneratorRuntime.mark(function e(t) {
                var n, r, i, a, s, o
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return e.next = 2, this.get("analytics").recordEvent({ category: "ArticleDownloadSuccess", action: t.article.id, label: t.journal.get("title"), value: t.journal.id, openAccess: t.article.get("openAccess") })
                        case 2: n = t.article.get("fullTextFile"), r = !!n, this.set("hasFullTextFile", r), this.hasFullTextFileAccess(t, r) && !this.get("disableRedirect") && (i = this.get("applicationSession"), a = i.get("selectedLibrary"), s = i.lookupLibraryToken(a).token, (o = new URL(n)).searchParams.has("access_token") || o.searchParams.append("access_token", s), o.searchParams.has("client") || o.searchParams.append("client", "bzweb"), this.set("content-location-to-redirect-to", o.toString()))
                        case 6: case "end": return e.stop()
                    }
                }, e, this)
            }), function () {
                var t = e.apply(this, arguments)
                return new Promise(function (e, n) {
                    return function r(i, a) {
                        try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        e(o)
                    }("next")
                })
            })
            return function (e) { return t.apply(this, arguments) }
        }(), renderTemplate: function () { this.setupRedirectAfterRender({ urlPropertyName: "content-location-to-redirect-to" }), this.render() }, titleToken: function (e) { return Ember.getWithDefault(e, "title", this.get("intl").t("article.default_page_title_token")) }, setupController: function (e, t) { e.set("article", t.article), e.set("issue", t.issue), e.set("library", t.library), e.set("journal", t.journal), e.set("hasFullTextFile", this.get("hasFullTextFile")), e.set("loadingType", "fullTextFile"), this.controllerFor("library").set("disableMenu", !0) }, actions: {
            error: function (e, t) {
                if (e instanceof r.default || e instanceof i.default) {
                    var n = this.get("applicationSession").get("selectedLibrary")
                    return this.handleAPIAuthDemandError(e, n, t)
                } return !0
            }
        }
    })
}), define("browzine-web/routes/library/article-retraction-notice", ["exports", "ember-window-mock", "browzine-web/mixins/route-auth-helpers", "browzine-web/errors/ApiSessionExpiredError", "browzine-web/errors/AuthRequiredError", "urijs"], function (e, t, n, r, i, a) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend(n.default, {
        auth: Ember.inject.service(), model: function (e) { return e.disableRedirect ? this.set("disableRedirect", !0) : this.set("disableRedirect", !1), this.store.findRecord("article", e.article_id, { reload: !0, include: "issue,journal" }) }, afterModel: function () {
            var e, n = (e = regeneratorRuntime.mark(function e(n) {
                var r, i
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: if (r = n.get("retractionNoticeUrl")) {
                            e.next = 5
                            break
                        } throw new Error("Visited retraction-notice route with article that isn't retracted")
                        case 5: i = (0, a.default)(r).addQuery("utm_source", "BZWeb"), t.default.location.assign(i.toString())
                        case 7: case "end": return e.stop()
                    }
                }, e, this)
            }), function () {
                var t = e.apply(this, arguments)
                return new Promise(function (e, n) {
                    return function r(i, a) {
                        try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        e(o)
                    }("next")
                })
            })
            return function (e) { return n.apply(this, arguments) }
        }(), actions: {
            error: function (e, t) {
                if (e instanceof r.default || e instanceof i.default) {
                    var n = this.get("applicationSession").get("selectedLibrary")
                    return this.handleAPIAuthDemandError(e, n, t)
                } return !0
            }
        }
    })
}), define("browzine-web/routes/library/article", ["exports", "browzine-web/mixins/route-auth-helpers", "browzine-web/mixins/article-loading-route", "browzine-web/errors/ApiSessionExpiredError", "browzine-web/errors/AuthRequiredError"], function (e, t, n, r, i) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend(t.default, n.default, {
        auth: Ember.inject.service(), intl: Ember.inject.service(), controllerName: "article", templateName: "article", beforeModel: function (e) { return this.ensureLibrarySelectedForArticle(e, e.params["library.article"].article_id) }, model: function (e) {
            e.disableRedirect ? this.set("disableRedirect", !0) : this.set("disableRedirect", !1), this.set("hasArticle", !0)
            var t = this.get("applicationSession").get("selectedLibrary")
            this.get("analytics").setCustomDimension(1, t)
            var n = this.store.findRecord("article", e.article_id, { reload: !0, include: "issue,journal" }), r = this.store.findRecord("library", t)
            return this.prepareArticleLoadingBoxModel(n, r).catch(function (e) {
                if (404 === e.status) {
                    var t = new Error("Article not found")
                    throw t.articleNotFound = !0, t
                } throw e
            })
        }, afterModel: function () {
            var e, t = (e = regeneratorRuntime.mark(function e(t) {
                var n, r, i, a, s
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return e.next = 2, this.get("analytics").recordEvent({ category: "ArticleDownloadSuccess", action: t.article.id, label: t.journal.get("title"), value: t.journal.id, openAccess: t.article.get("openAccess") })
                        case 2: Ember.isEmpty(t.article.get("contentLocation")) && this.set("hasArticle", !1), this.hasFullTextAccess(t, this.get("hasArticle")) && !this.get("disableRedirect") && (n = t.article.get("contentLocation"), r = this.get("applicationSession"), i = r.get("selectedLibrary"), a = r.lookupLibraryToken(i).token, (s = new URL(n)).searchParams.has("access_token") || s.searchParams.append("access_token", a), s.searchParams.has("client") || s.searchParams.append("client", "bzweb"), this.set("content-location-to-redirect-to", s.toString()))
                        case 4: case "end": return e.stop()
                    }
                }, e, this)
            }), function () {
                var t = e.apply(this, arguments)
                return new Promise(function (e, n) {
                    return function r(i, a) {
                        try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        e(o)
                    }("next")
                })
            })
            return function (e) { return t.apply(this, arguments) }
        }(), renderTemplate: function () { this.setupRedirectAfterRender({ urlPropertyName: "content-location-to-redirect-to" }), this.render() }, titleToken: function (e) { return Ember.getWithDefault(e, "title", this.get("intl").t("article.default_page_title_token")) }, setupController: function (e, t) { e.set("article", t.article), e.set("issue", t.issue), e.set("library", t.library), e.set("journal", t.journal), e.set("hasArticle", this.get("hasArticle")), e.set("loadingType", "fullText"), this.controllerFor("library").set("disableMenu", !0) }, actions: {
            error: function (e, t) {
                if (e instanceof r.default || e instanceof i.default) {
                    var n = this.get("applicationSession").get("selectedLibrary")
                    return this.handleAPIAuthDemandError(e, n, t)
                } return !0
            }
        }
    })
}), define("browzine-web/routes/library/index", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        beforeModel: function (e) {
            var t = e.params.library.library_id
            this.transitionTo("library.subjects", t)
        }
    })
}), define("browzine-web/routes/library/journal", ["exports", "browzine-web/mixins/ember-data-workarounds"], function (e, t) {
    function n(e) {
        return function () {
            var t = e.apply(this, arguments)
            return new Promise(function (e, n) {
                return function r(i, a) {
                    try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                    e(o)
                }("next")
            })
        }
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend(t.default, {
        applicationSession: Ember.inject.service(), myBookshelf: Ember.inject.service(), sync: Ember.inject.service(), intl: Ember.inject.service(), model: function () {
            var e = n(regeneratorRuntime.mark(function e(t) {
                var n
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return this.relateCachedModelToLibrary("journal", t.journal_id), e.next = 3, this.store.findRecord("journal", t.journal_id, { preload: { library: this.modelFor("library") } })
                        case 3: return n = e.sent, e.abrupt("return", n.hasMany("issues").load().then(function () { return n }))
                        case 5: case "end": return e.stop()
                    }
                }, e, this)
            }))
            return function (t) { return e.apply(this, arguments) }
        }(), afterModel: function () {
            var e = n(regeneratorRuntime.mark(function e(t) {
                var n, r = this
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: if (null !== (n = t.hasMany("issues")).value()) {
                            e.next = 4
                            break
                        } return e.next = 4, n.load()
                        case 4: if (!this.get("applicationSession").get("loggedInUser")) {
                            e.next = 6
                            break
                        } return e.abrupt("return", this.get("sync").ensureDataLoaded().then(function () { return r.get("myBookshelf").get("model").then(function (e) { r.set("myBookshelfModel", e) }) }).catch(function () { r.get("flashMessages").alert(r.get("intl").t("journal_unreads_unavailable_error_message")) }))
                        case 6: case "end": return e.stop()
                    }
                }, e, this)
            }))
            return function (t) { return e.apply(this, arguments) }
        }(), titleToken: function (e) { return Ember.get(e, "title") }, setupController: function (e, t) {
            var n = this.get("intl"), r = this.controllerFor("application").get("previousTaxonomyPath")
            e.set("model", t), e.set("library", this.modelFor("library")), e.set("myBookshelfModel", this.get("myBookshelfModel")), e.set("previousTaxonomyPath", r), Ember.run.next(this, function () {
                var t = JSON.parse(localStorage.getItem("myBookshelf.shelve") || null) || JSON.parse(e.get("myBookshelf.shelve") || null)
                if (e.get("applicationSession").get("userIsLoggedIn") && t) {
                    if (e.get("onMyBookshelf")) {
                        var r = e.get("journal.title")
                        e.get("flashMessages").success(n.t("my_bookshelf.journal_already_on_bookshelf_message", { journalTitle: r }))
                    } else e.set("myBookshelf.shelve", !0), Ember.$(".my-bookshelf").click()
                    localStorage.removeItem("myBookshelf.shelve")
                }
            })
        }, actions: {
            back: function () {
                var e = this.controllerFor("application").get("previousTaxonomyPath")
                e ? this.transitionTo(e) : this.transitionTo("library.subjects")
            }
        }
    })
}), define("browzine-web/routes/library/journal/articles-in-press", ["exports", "browzine-web/routes/library/journal/issue", "browzine-web/mixins/query-storing-route", "lodash.omit"], function (e, t, n, r) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.extend(n.default, {
        header: Ember.inject.service(), analytics: Ember.inject.service(), intl: Ember.inject.service(), beforeModel: function () {
            var e, t = (e = regeneratorRuntime.mark(function e(t) {
                var n, i, a
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: if (n = t.queryParams.showArticleInContext, !(t.queryParams.utm_source && t.queryParams.utm_source.includes("api_") && n)) {
                            e.next = 6
                            break
                        } return i = t.params.library.library_id, a = t.params["library.journal"].journal_id, e.next = 5, this.get("analytics").recordEvent({ category: "PublicAPIArticleInContext", action: n })
                        case 5: this.replaceWith("library.journal.articles-in-press", i, a, { queryParams: (0, r.default)(t.queryParams, "utm_source") })
                        case 6: n && this.set("articleToShow", n)
                        case 7: case "end": return e.stop()
                    }
                }, e, this)
            }), function () {
                var t = e.apply(this, arguments)
                return new Promise(function (e, n) {
                    return function r(i, a) {
                        try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        e(o)
                    }("next")
                })
            })
            return function (e) { return t.apply(this, arguments) }
        }(), model: function () {
            var e = this
            return this.modelFor("library.journal").get("articlesInPress").then(function (t) { return Ember.Object.create({ articles: Ember.RSVP.Promise.resolve(t), title: e.get("intl").t("journal.articles_in_press.link"), year: 2010, date: "", journal: Ember.RSVP.Promise.resolve(e.modelFor("library.journal")), articlesInPress: !0 }) })
        }, setupController: function (e, t) { this._super(e, t), this.controllerFor("application").set("showArticleInContext", this.get("articleToShow")) }, controllerName: "library.journal.issue", templateName: "library.journal.issue", titleToken: function () { return this.get("header").setProperties({ subject: { value: "journal.responsive.header", template: !0 }, title: { value: this.modelFor("library.journal").get("title"), template: !1 } }), this.get("intl").t("journal.articles_in_press.link") }
    })
}), define("browzine-web/routes/library/journal/current-issue", ["exports", "browzine-web/routes/library/journal/issue", "browzine-web/mixins/query-storing-route"], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.extend(n.default, {
        header: Ember.inject.service(), intl: Ember.inject.service(), applicationSession: Ember.inject.service(), model: function () {
            var e = this.modelFor("library.journal"), t = this.get("applicationSession").get("localizedModelsNeedReload")
            return e.fixedBelongsToLoad("currentIssue", t)
        }, controllerName: "library.journal.issue", templateName: "library.journal.issue", titleToken: function (e) { return this.get("header").setProperties({ subject: { value: "journal.responsive.header", template: !0 }, title: { value: e.get("journal.title"), template: !1 } }), this.get("intl").t("journal.current_issue") }
    })
}), define("browzine-web/routes/library/journal/index", ["exports", "lodash.omit"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        analytics: Ember.inject.service(), errorReporter: Ember.inject.service(), flashMessages: Ember.inject.service(), beforeModel: function () {
            var e, n = (e = regeneratorRuntime.mark(function e(n) {
                var r, i
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: if (!n.queryParams.utm_source || !n.queryParams.utm_source.includes("api_")) {
                            e.next = 5
                            break
                        } return r = n.params.library.library_id, i = n.params["library.journal"].journal_id, e.next = 4, this.get("analytics").recordEvent({ category: "PublicAPIViewJournalContentsClick", action: i })
                        case 4: this.replaceWith("library.journal", r, i, { queryParams: (0, t.default)(n.queryParams, "utm_source") })
                        case 5: case "end": return e.stop()
                    }
                }, e, this)
            }), function () {
                var t = e.apply(this, arguments)
                return new Promise(function (e, n) {
                    return function r(i, a) {
                        try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        e(o)
                    }("next")
                })
            })
            return function (e) { return n.apply(this, arguments) }
        }(), model: function () { return this.modelFor("library.journal") }, afterModel: function (e, t) {
            var n = this, r = "latest_full_text" === this.modelFor("library").get("defaultIssue"), i = r ? "latestFullTextIssue" : "currentIssue", a = r ? "library.journal.latest-full-text-issue" : "library.journal.current-issue"
            return e.fixedBelongsToLoad(i).then(function (r) { r ? n.replaceWith(a, { queryParams: Object.assign({ searchVisible: !1 }, t.queryParams) }) : (n.get("errorReporter").reportJournalWithNoIssuesError(e.id), n.get("flashMessages").alert("No issues found for “" + e.get("title") + "”!"), t.abort()) })
        }
    })
}), define("browzine-web/routes/library/journal/issue", ["exports", "browzine-web/mixins/reset-scroll-position", "browzine-web/mixins/ember-data-workarounds", "lodash.omit"], function (e, t, n, r) {
    function i(e) {
        return function () {
            var t = e.apply(this, arguments)
            return new Promise(function (e, n) {
                return function r(i, a) {
                    try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                    e(o)
                }("next")
            })
        }
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend(t.default, n.default, {
        analytics: Ember.inject.service(), errorReporter: Ember.inject.service(), sync: Ember.inject.service(), store: Ember.inject.service(), header: Ember.inject.service(), flashMessages: Ember.inject.service(), applicationSession: Ember.inject.service(), intl: Ember.inject.service(), beforeModel: function () {
            var e = i(regeneratorRuntime.mark(function e(t) {
                var n, i, a, s, o
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: if (n = t.queryParams.showArticleInContext, !((i = t.queryParams.utm_source) && i.toLowerCase().includes("api_") && n)) {
                            e.next = 11
                            break
                        } return a = t.params.library.library_id, s = t.params["library.journal"].journal_id, o = t.params["library.journal.issue"].issue_id, e.next = 6, this.get("analytics").recordEvent({ category: "PublicAPIArticleInContext", action: n })
                        case 6: return e.next = 8, this.get("analytics").recordEvent({ category: "ArticleInContext", action: n, referringProduct: "LibkeyAPI" })
                        case 8: this.replaceWith("library.journal.issue", a, s, o, { queryParams: (0, r.default)(t.queryParams, "utm_source") }), e.next = 29
                            break
                        case 11: if (!i || "libkeyio" !== i.toLowerCase() || !n) {
                            e.next = 16
                            break
                        } return e.next = 14, this.get("analytics").recordEvent({ category: "ArticleInContext", action: n, referringProduct: "LibkeyIO" })
                        case 14: e.next = 29
                            break
                        case 16: if (!i || "libkeylink" !== i.toLowerCase() || !n) {
                            e.next = 21
                            break
                        } return e.next = 19, this.get("analytics").recordEvent({ category: "ArticleInContext", action: n, referringProduct: "LibkeyLink" })
                        case 19: e.next = 29
                            break
                        case 21: if (!i || "nomad" !== i.toLowerCase() || !n) {
                            e.next = 26
                            break
                        } return e.next = 24, this.get("analytics").recordEvent({ category: "ArticleInContext", action: n, referringProduct: "LibkeyNomad" })
                        case 24: e.next = 29
                            break
                        case 26: if (!n) {
                            e.next = 29
                            break
                        } return e.next = 29, this.get("analytics").recordEvent({ category: "ArticleInContext", action: n })
                        case 29: n && this.set("articleToShow", n)
                        case 30: case "end": return e.stop()
                    }
                }, e, this)
            }))
            return function (t) { return e.apply(this, arguments) }
        }(), model: function (e) {
            this.relateCachedModelToLibrary("issue", e.issue_id)
            var t = this.get("applicationSession").get("localizedModelsNeedReload")
            return this.store.findRecord("issue", e.issue_id, { preload: { library: this.modelFor("library") }, reload: t })
        }, handleJournalHasNoContent: function (e, t) {
            var n = this.get("applicationSession")
            return t ? n.set("alertAfterTransition", this.get("intl").t("journal.not_available_alert_message", { journalName: t.get("title") })) : n.set("alertAfterTransition", this.get("intl").t("journal.does_not_exist_alert_message")), this.transitionTo("library", e)
        }, afterModel: function () {
            var e = i(regeneratorRuntime.mark(function e(t, n) {
                var r, i, a, s, o, l = this
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: if (t) {
                            e.next = 3
                            break
                        } return r = this.modelFor("library.journal"), e.abrupt("return", this.handleJournalHasNoContent(n.params.library.library_id, r))
                        case 3: return i = t.articlesInPress ? t.journal : t.fixedBelongsToLoad("journal"), e.next = 6, i
                        case 6: if ((a = e.sent) && a.get("available")) {
                            e.next = 9
                            break
                        } return e.abrupt("return", this.handleJournalHasNoContent(n.params.library.library_id, a))
                        case 9: if (this.set("journal", a), !t) {
                            e.next = 13
                            break
                        } return e.next = 13, this.get("analytics").recordEvent({ category: "TableOfContentsScreenView", action: t.get("title") + " - " + t.get("year"), label: this.get("journal.title"), value: this.get("journal.id"), issueId: t.articlesInPress ? "articles-in-press" : t.get("id") })
                        case 13: return e.next = 15, a.fixedBelongsToLoad("currentIssue")
                        case 15: if (s = e.sent, this.set("currentIssue", s), !this.get("applicationSession").get("loggedInUser")) {
                            e.next = 23
                            break
                        } return (o = this.get("sync")).set("initialLoadComplete", !1), e.next = 23, new Ember.RSVP.Promise(function (e) { Ember.run(function () { Ember.run.schedule("afterRender", l, function () { return o.getUnreadsForJournal(l.get("journal.id")).then(function () { return e() }).catch(function (e) { console.log({ err: e }) }) }) }) })
                        case 23: case "end": return e.stop()
                    }
                }, e, this)
            }))
            return function (t, n) { return e.apply(this, arguments) }
        }(), setupController: function (e, t) {
            var n = this.controllerFor("library.journal")
            e.set("noArticles", !1), e.set("model", t), e.set("library", this.modelFor("library")), e.set("journal", this.modelFor("library.journal")), e.set("editMode", !1), e.set("showArticleInContext", this.get("articleToShow")), n.set("selectedIssue", t)
            var r = t.get("articlesInPress"), i = Ember.Object.create({})
            if (r) {
                var a = e.get("lastViewedIssue")
                if (a) i.set("selectedYear", a.get("year")), i.set("selectedIssueId", a.get("id"))
                else {
                    var s = this.get("currentIssue")
                    i.set("selectedYear", s.get("year")), i.set("selectedIssueId", s.get("id"))
                }
            } else i.set("selectedYear", t.get("year")), i.set("selectedIssueId", t.get("id")), e.set("lastViewedIssue", t)
            e.set("issueNavigationState", i), e.initializePagination()
        }, renderTemplate: function () { this.render("library.journal.issue"), this.render("journal-content-navigation", { outlet: "journal-content-navigation" }) }, titleToken: function (e) { return this.get("header").setProperties({ subject: { value: "journal.responsive.header", template: !0 }, title: { value: e.get("journal.title"), template: !1 } }), Ember.getWithDefault(e, "title", this.get("intl").t("issue.default_page_title_token")) }, title: function (e) {
            var t = this.modelFor("library.journal"), n = this.modelFor("library")
            return Ember.getWithDefault(t, "title", this.get("intl").t("journal.journal")) + " — " + e[0] + " — " + Ember.getWithDefault(n, "name", this.get("intl").t("library.header.library")) + " — BrowZine"
        }, saveIssue: function (e) {
            var t = this, n = this.get("store")
            this.controller.set("saving", !0), e.save().then(function () {
                e.get("articles").forEach(function (e) {
                    if (e && e.get("hasDirtyAttributes")) {
                        var t = e.toJSON(), r = e.get("id")
                        Ember.run.next(function () { n.push({ data: { type: "article", id: r, attributes: t } }) })
                    }
                }), t.get("flashMessages").success("saved"), t.controller.set("editMode", !1), t.refresh()
            }).catch(function (e) { console.error(e), "invalid permissions" !== e.message && t.get("flashMessages").alert("" + e), t.get("errorReporter").reportUnknownError("error saving issue", e) }).finally(function () { t.controller.set("saving", !1) })
        }, saveArticlesInPress: function (e) {
            var t = this
            this.controller.set("saving", !0), e.get("articles").then(function (e) { e.forEach(function (e) { e && e.get("hasDirtyAttributes") && e.save().then(function () { t.get("flashMessages").success("saved") }).catch(function (e) { console.error(e), "invalid permissions" !== e.message && t.get("flashMessages").alert("" + e), t.get("errorReporter").reportUnknownError("error saving article", e) }) }) }).catch(function (e) { console.error(e), t.get("errorReporter").reportUnknownError("error resolving articles in press articles promise", e) }).finally(function () { t.controller.set("saving", !1), t.controller.set("editMode", !1) })
        }, actions: { edit: function () { this.controller.set("editMode", !0) }, save: function () { this.currentModel.set("library", this.get("controller.library")), this.currentModel.get("articlesInPress") ? this.saveArticlesInPress(this.currentModel) : this.saveIssue(this.currentModel) }, cancel: function () { this.currentModel.get("articlesInPress") ? this.currentModel.get("articles").then(function (e) { e.forEach(function (e) { return e.rollbackAttributes() }) }) : (this.currentModel.rollbackAttributes(), this.currentModel.get("articles").forEach(function (e) { return e.rollbackAttributes() })), this.controller.set("editMode", !1) } }
    })
}), define("browzine-web/routes/library/journal/latest-full-text-issue", ["exports", "browzine-web/routes/library/journal/issue", "browzine-web/mixins/query-storing-route"], function (e, t, n) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.extend(n.default, { header: Ember.inject.service(), intl: Ember.inject.service(), model: function () { return this.modelFor("library.journal").fixedBelongsToLoad("latestFullTextIssue") }, controllerName: "library.journal.issue", templateName: "library.journal.issue", titleToken: function (e) { return this.get("header").setProperties({ subject: { value: "journal.responsive.header", template: !0 }, title: { value: e.get("journal.title"), template: !1 } }), this.get("intl").t("journal.current_issue") } }) }), define("browzine-web/routes/library/login", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        myBookshelf: Ember.inject.service(), afterModel: function (e, t) {
            var n = t.queryParams.returnRoute, r = t.queryParams.returnParameter, i = this.modelFor("library")
            if (i.get("ssoEnabled")) {
                if (n) {
                    var a = this.get("router._routerMicrolib").generate(n, r)
                    this.set("myBookshelf.returnRoute", a)
                } this.transitionTo("library.sso-login", i)
            } else this.transitionTo("auth.login", { queryParams: { returnRoute: n, returnParameter: r } })
        }
    })
}), define("browzine-web/routes/library/my-articles", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({ myArticles: Ember.inject.service(), header: Ember.inject.service(), intl: Ember.inject.service(), setupController: function (e) { e.set("library", this.modelFor("library")) }, titleToken: function () { return this.get("header").setProperties({ subject: { value: "BrowZine", template: !1 }, title: { value: this.get("intl").t("my_articles.feature_name"), template: !1 } }), this.get("intl").t("my_articles.feature_name") } }) }), define("browzine-web/routes/library/my-articles/collection", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        sync: Ember.inject.service(), store: Ember.inject.service(), myArticles: Ember.inject.service(), applicationSession: Ember.inject.service(), init: function () {
            var e = this
            this.get("myArticles").onCollectionItemChange(function (t) { "library.my-articles.collection" === e.controllerFor("library.my-articles.collection").target.currentRouteName && e.send("refreshCollection", t) }), this.get("myArticles").onCollectionRemoved(function () { "library.my-articles.collection" === e.controllerFor("library.my-articles.collection").target.currentRouteName && e.transitionTo("library.my-articles.collection", "collection-general") }), this._super.apply(this, arguments)
        }, model: function (e) {
            var t = this
            if (this.get("applicationSession").get("loggedInUser")) {
                var n = this.get("myArticles"), r = e.collection_id
                return this.get("sync").ensureDataLoaded().then(function () { return Ember.RSVP.hash({ collectionId: r, loadCollections: n.loadCollections() }) }).catch(function () { t.get("flashMessages").alert("My Articles is currently unavailable. Please refresh or contact support if this persists.") })
            } this.transitionTo("library.my-articles")
        }, afterModel: function (e) {
            if (e) {
                var t = this.get("store"), n = e.collectionId, r = t.peekRecord("collection", n)
                if (!r && "collection-general" === n) throw console.log("Somehow the general collection failed to load!"), new Error("Model for general collection didn't load")
                r || this.transitionTo("library.my-articles")
            } else this.transitionTo("library.my-articles.collection", "collection-general")
        }, actions: { queryParamsDidChange: function () { this._super.apply(this, arguments), this.refresh() }, refreshCollection: function (e) { this.get("router._routerMicrolib.state").params["library.my-articles.collection"].collection_id === e.get("id") && this.refresh() } }
    })
}), define("browzine-web/routes/library/my-articles/index", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({ myArticles: Ember.inject.service(), applicationSession: Ember.inject.service(), beforeModel: function (e) { !e.collection_id && this.get("applicationSession").get("userIsLoggedIn") && this.transitionTo("library.my-articles.collection", "collection-general") } }) }), define("browzine-web/routes/library/settings", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        analytics: Ember.inject.service(), auth: Ember.inject.service(), header: Ember.inject.service(), applicationSession: Ember.inject.service(), intl: Ember.inject.service(), model: function () { return { library: this.modelFor("library"), localStorage: localStorage } }, actions: {
            changeLibrary: function () {
                var e, t = (e = regeneratorRuntime.mark(function e() {
                    return regeneratorRuntime.wrap(function (e) {
                        for (; ;)switch (e.prev = e.next) {
                            case 0: return e.next = 2, this.get("analytics").recordEvent({ category: "settings_screen", action: "logout_button_tapped", value: 1 })
                            case 2: this.get("applicationSession").clearSelectedLibrary(), this.transitionTo("libraries")
                            case 4: case "end": return e.stop()
                        }
                    }, e, this)
                }), function () {
                    var t = e.apply(this, arguments)
                    return new Promise(function (e, n) {
                        return function r(i, a) {
                            try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                            e(o)
                        }("next")
                    })
                })
                return function () { return t.apply(this, arguments) }
            }(), logout: function () { this.get("applicationSession").clearLoggedInUser() }
        }, titleToken: function () { return this.get("header").setProperties({ subject: { value: "settings.responsive.header", template: !0 }, title: { value: "settings.header", template: !0 } }), this.get("intl").t("settings.header") }
    })
}), define("browzine-web/routes/library/settings/library-customization", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        permissions: Ember.inject.service(), afterModel: function (e) {
            var t = this.get("permissions"), n = e.library.get("id")
            t.hasPermission(["admin.library.edit"], n) || this.transitionTo("library.settings.user-settings")
        }
    })
}), define("browzine-web/routes/library/settings/user-settings", ["exports", "fetch", "browzine-web/config/environment"], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        auth: Ember.inject.service(), applicationSession: Ember.inject.service(), model: function () {
            var e, r = (e = regeneratorRuntime.mark(function e() {
                var r, i, a, s, o
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return r = this.get("applicationSession").get("selectedLibrary"), i = this.get("auth").getAPIAuthHeaderForLibrary(r), e.next = 4, (0, t.default)(n.default.apiBaseUrl + "/users/notification-status", { method: "get", headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: i } })
                        case 4: if (a = e.sent, s = void 0, 200 === a.status) {
                            e.next = 10
                            break
                        } console.log("Received status " + a.status + " when trying to read email notifications setting"), e.next = 14
                            break
                        case 10: return e.next = 12, a.json()
                        case 12: o = e.sent, s = o.digestEmailStatus
                        case 14: return e.abrupt("return", { library: this.modelFor("library"), localStorage: localStorage, digestEmailStatus: s })
                        case 15: case "end": return e.stop()
                    }
                }, e, this)
            }), function () {
                var t = e.apply(this, arguments)
                return new Promise(function (e, n) {
                    return function r(i, a) {
                        try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        e(o)
                    }("next")
                })
            })
            return function () { return r.apply(this, arguments) }
        }(), setupController: function (e, t) { this._super(e, t), ["off", "eligible", "email-unsubscribed", "email-spam", "email-removed"].includes(t.digestEmailStatus) ? (e.set("selectedEmailNotificationValue", "off"), "email-removed" === t.digestEmailStatus && e.set("emailRemoved", !0)) : e.set("selectedEmailNotificationValue", t.digestEmailStatus) }
    })
}), define("browzine-web/routes/library/sso-login", ["exports", "browzine-web/config/environment"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        header: Ember.inject.service(), myBookshelf: Ember.inject.service(), setupController: function (e) { e.set("library", this.modelFor("library")) }, resetController: function (e, t, n) { this._super(e, t, n), t && (e.set("auto", !1), e.set("disableRedirect", !1)) }, titleToken: function () { return this.get("header").setProperties({ subject: { value: "Library", template: !1 }, title: { value: "SSO Authentication", template: !1 } }), "SSO Authentication" }, actions: {
            login: function () {
                var e = this.modelFor("library").get("id"), n = this.get("myBookshelf.returnRoute"), r = {}
                n && (r.intent = window.btoa(JSON.stringify({ url: n })))
                var i = this.get("router._routerMicrolib").generate("accept-token", e, { queryParams: r }), a = this.get("router._routerMicrolib").generate("token-failure", e)
                Ember.$.ajax({ url: t.default.apiBaseUrl + "/sso/login", type: "POST", data: JSON.stringify({ libraryId: e, client: "bzweb", success: i, failure: a }), contentType: "application/json; charset=utf-8", dataType: "json" }).then(function (e) {
                    var t = e.ssoGateway
                    window.location.replace(t)
                })
            }
        }
    })
}), define("browzine-web/routes/library/subject", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        applicationSession: Ember.inject.service(), parentController: Ember.computed(function () { return this.controllerFor("library") }), setupController: function (e) { e.set("parentController", this.get("parentController")), this.get("parentController.sort") || this.set("parentController.sort", "title") }, model: function (e) { return this.store.findRecord("subject", e.subject_id, { preload: { library: this.modelFor("library") } }) }, actions: {
            back: function () {
                var e = Ember.getOwner(this).lookup("router:main").currentPath.replace(".index", "").split(".")
                e.splice(-1)
                var t = e.join(".")
                this.transitionTo(t)
            }
        }
    })
}), define("browzine-web/routes/library/subject/bookcase", ["exports", "browzine-web/mixins/taxonomy-route", "browzine-web/mixins/query-storing-route"], function (e, t, n) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend(t.default, n.default, { header: Ember.inject.service(), applicationSession: Ember.inject.service(), intl: Ember.inject.service(), model: function (e) { return this.store.findRecord("bookcase", e.bookcase_id, { preload: { library: this.modelFor("library") } }) }, afterModel: function (e) { return this.buildTaxonomy({ subject: this.modelFor("library.subject"), bookcase: e }) }, titleToken: function (e) { return this.get("header").setProperties({ subject: { value: "subjects.subject", template: !0 }, title: { value: Ember.get(e, "name"), template: !1 } }), Ember.get(e, "name") } }) }), define("browzine-web/routes/library/subject/bookcase/bookshelf", ["exports", "browzine-web/mixins/taxonomy-route", "browzine-web/mixins/query-storing-route"], function (e, t, n) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend(t.default, n.default, { header: Ember.inject.service(), applicationSession: Ember.inject.service(), intl: Ember.inject.service(), model: function (e) { return this.store.findRecord("bookshelf", e.bookshelf_id, { preload: { library: this.modelFor("library") } }).then(function (e) { return e.hasMany("journals").reload().then(function () { return e }) }) }, afterModel: function (e) { return this.buildTaxonomy({ subject: this.modelFor("library.subject"), bookcase: this.modelFor("library.subject.bookcase"), bookshelf: e }) }, titleToken: function (e) { return this.get("header").setProperties({ subject: { value: "subjects.subject", template: !0 }, title: { value: Ember.get(e, "name"), template: !1 } }), Ember.get(e, "name") } }) })
define("browzine-web/routes/library/subject/bookcase/index", ["exports", "browzine-web/mixins/taxonomy-route"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend(t.default, { intl: Ember.inject.service(), afterModel: function (e) { return this.buildTaxonomy({ subject: this.modelFor("library.subject"), bookcase: e }) }, titleToken: function () { return this.get("intl").t("subjects.all_journals") } }) }), define("browzine-web/routes/library/subject/index", ["exports", "browzine-web/mixins/taxonomy-route"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend(t.default, { header: Ember.inject.service(), intl: Ember.inject.service(), model: function () { return this.modelFor("library.subject") }, afterModel: function (e) { return this.buildTaxonomy({ subject: e }) }, titleToken: function (e) { return this.get("header").setProperties({ subject: { value: "subjects.subject", template: !0 }, title: { value: Ember.get(e, "name"), template: !1 } }), Ember.get(e, "name") } }) }), define("browzine-web/routes/library/subjects", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        header: Ember.inject.service(), applicationSession: Ember.inject.service(), flashMessages: Ember.inject.service(), intl: Ember.inject.service(), model: function () {
            var e = this.modelFor("library")
            return e.fixedHasManyLoad("subjects").then(function (t) { return { subjects: t, library: e } })
        }, afterModel: function () {
            var e = this.get("applicationSession"), t = this.get("flashMessages"), n = e.get("alertAfterTransition")
            n && (e.set("alertAfterTransition", void 0), t.alert(n))
        }, renderTemplate: function () { this.render("library.subjects"), this.render("library.subjects-search", { into: "library.subjects", outlet: "search", controller: "library" }) }, titleToken: function () { this.get("header").setProperties({ subject: { value: "library.header.welcome_to", template: !0 }, title: { value: "BrowZine", template: !1 } }) }
    })
}), define("browzine-web/routes/library/unavailable", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({ header: Ember.inject.service(), intl: Ember.inject.service(), model: function (e, t) { return { context: t.queryParams.context, library: this.modelFor("library") } }, titleToken: function () { return this.get("header").setProperties({ subject: { value: "unavailable.responsive_page_subject", template: !0 }, title: { value: "unavailable.responsive_page_title", template: !0 } }), this.get("intl").t("unavailable.responsive_page_title") }, actions: { selectLibrary: function () { this.transitionTo("libraries") } } }) }), define("browzine-web/routes/library/user-idle-session-expired", ["exports", "browzine-web/config/environment"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        header: Ember.inject.service(), applicationSession: Ember.inject.service(), intl: Ember.inject.service(), beforeModel: function () {
            var e = this.get("applicationSession"), t = this.modelFor("library")
            t.get("ssoEnabled") && e.clearLibraryToken(t.get("id")), e.clearLoggedInUser()
        }, model: function () { return { library: this.modelFor("library") } }, titleToken: function () { return this.get("header").setProperties({ subject: { value: "library.header.library", template: !0 }, title: { value: "idle_session_expired.document_title_token", template: !0 } }), this.get("intl").t("idle_session_expired.document_title_token") }, actions: {
            reLogin: function () {
                var e = this.modelFor("library")
                if (!e.get("ssoEnabled")) return this.transitionTo("library.login", e)
                var n = e.get("id"), r = this.get("router._routerMicrolib").generate("accept-token", n), i = this.get("router._routerMicrolib").generate("token-failure", n)
                Ember.$.ajax({ url: t.default.apiBaseUrl + "/sso/login", type: "POST", data: JSON.stringify({ libraryId: n, client: "bzweb", success: r, failure: i }), contentType: "application/json; charset=utf-8", dataType: "json" }).then(function (e) {
                    var t = e.ssoGateway
                    window.location.replace(t)
                })
            }, selectLibrary: function () { return this.transitionTo("libraries") }, continue: function () {
                var e = this.modelFor("library")
                return this.transitionTo("library", e)
            }
        }
    })
}), define("browzine-web/routes/library/vpn-required", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({ header: Ember.inject.service(), applicationSession: Ember.inject.service(), intl: Ember.inject.service(), model: function (e, t) { return { context: t.queryParams.context, library: this.modelFor("library") } }, titleToken: function () { return this.get("header").setProperties({ subject: { value: "vpn_required.responsive_page_subject", template: !0 }, title: { value: "vpn_required.responsive_page_title", template: !0 } }), this.get("intl").t("vpn_required.responsive_page_title") }, actions: { selectLibrary: function () { this.get("applicationSession").set("transitionToRetryAfterAuth", void 0), this.transitionTo("libraries") }, continue: function () { this.get("applicationSession").get("transitionToRetryAfterAuth").retry() } } }) }), define("browzine-web/routes/libraryless-settings", ["exports", "browzine-web/mixins/route-auth-helpers"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend(t.default, {
        applicationSession: Ember.inject.service(), beforeModel: function () {
            var e, t = (e = regeneratorRuntime.mark(function e(t) {
                var n, r
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return e.next = 2, this.ensureLibrarySelectedGeneric(t)
                        case 2: if (n = this.get("applicationSession"), !(r = n.get("selectedLibrary"))) {
                            e.next = 9
                            break
                        } if (n.get("loggedInUser")) {
                            e.next = 8
                            break
                        } return n.set("transitionToRetryAfterAuth", t), e.abrupt("return", this.transitionTo("auth.login"))
                        case 8: return e.abrupt("return", this.transitionTo("library.settings.user-settings", r))
                        case 9: case "end": return e.stop()
                    }
                }, e, this)
            }), function () {
                var t = e.apply(this, arguments)
                return new Promise(function (e, n) {
                    return function r(i, a) {
                        try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        e(o)
                    }("next")
                })
            })
            return function (e) { return t.apply(this, arguments) }
        }()
    })
}), define("browzine-web/routes/my-bookshelf", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        auth: Ember.inject.service(), myBookshelf: Ember.inject.service(), applicationSession: Ember.inject.service(), sync: Ember.inject.service(), header: Ember.inject.service(), intl: Ember.inject.service(), model: function () {
            var e = this
            if (this.get("applicationSession").get("loggedInUser")) return this.get("sync").ensureDataLoaded().then(function () { return e.get("myBookshelf.model") }).catch(function () {
                var t = e.get("myBookshelf")
                return Promise.resolve(t.adaptModel(t.get("emptyBookcases")))
            })
        }, afterModel: function () { !JSON.parse(localStorage.getItem("syncMessageDismissed")) && this.get("myBookshelf.isAvailable") && this.get("flashMessages").add({ componentName: "my-bookshelf-intro-flash-message", type: "side", sticky: !0 }) }, setupController: function (e, t) { e.set("library", this.modelFor("library")), e.set("model", t) }, onLoggedInUserChange: Ember.observer("sync.database", function (e, t, n, r) {
            var i = this
            this.get(t) != r && Ember.run.once(this, function () { i.refresh() })
        }), titleToken: function () { return this.get("header").setProperties({ subject: { value: "BrowZine", template: !1 }, title: { value: this.get("intl").t("my_bookshelf.feature_name"), template: !1 } }), this.get("intl").t("my_bookshelf.feature_name") }, actions: { willTransition: function () { this.get("flashMessages").clearMessages() } }
    })
}), define("browzine-web/routes/my-bookshelf/bookcase", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        applicationSession: Ember.inject.service(), model: function (e) {
            if (this.get("applicationSession").get("loggedInUser")) return localStorage.setItem("my-bookcase", e.bookcase_index), this.modelFor("my-bookshelf").getBookcase(e.bookcase_index)
            this.transitionTo("my-bookshelf")
        }, titleToken: function (e) { return Ember.get(e, "title") }
    })
}), define("browzine-web/routes/my-bookshelf/index", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        sync: Ember.inject.service(), applicationSession: Ember.inject.service(), myBookshelf: Ember.inject.service(), flashMessages: Ember.inject.service(), intl: Ember.inject.service(), beforeModel: function () {
            var e = this
            if (this.get("applicationSession").get("loggedInUser")) return this.get("sync").ensureDataLoaded().then(function () {
                if (e.get("myBookshelf.isAvailable")) {
                    var t = e.modelFor("my-bookshelf").getBookcase(localStorage.getItem("my-bookcase") || 1)
                    e.transitionTo("my-bookshelf.bookcase", t.get("id"))
                }
            }).catch(function () {
                if (e.get("flashMessages").alert(e.get("intl").t("my_bookshelf.my_bookshelf_currently_unavailable_error_message")), e.get("myBookshelf.isAvailable")) {
                    var t = e.modelFor("my-bookshelf").getBookcase(localStorage.getItem("my-bookcase") || 1)
                    e.transitionTo("my-bookshelf.bookcase", t.get("id"))
                }
            })
        }
    })
}), define("browzine-web/routes/oauth", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        flashMessages: Ember.inject.service(), errorReporter: Ember.inject.service(), exporters: Ember.inject.service(), store: Ember.inject.service(), beforeModel: function (e) { this.params = e.queryParams }, model: function () {
            var e = this, t = localStorage.getItem("export_article")
            return this.get("store").findRecord("article", t).then(function (t) {
                var n = localStorage.getItem("BZ_mostRecentLibrary")
                return e.get("store").findRecord("library", n).then(function (e) { return Ember.RSVP.hash({ article: t, library: e }) })
            }, function (t) { e.get("flashMessages").alert("Error authenticating with citation service."), e.get("errorReporter").reportFailedArticleShare(t) })
        }, afterModel: function (e) {
            var t = this.get("exporters"), n = t.services[this.params.service]
            this.params.protocol = window.location.protocol, n.token(this.params, function () { t.saveArticle(n, e.article, e.library, function () { localStorage.setItem("save_article_success", "yes"), localStorage.setItem("export_service", n.get("name")), window.close() }) })
        }
    })
}), define("browzine-web/routes/refresh-collection-in-store-from-pouch", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({ sync: Ember.inject.service(), beforeModel: function () { return this.get("sync")._TEST_HELPER_refreshStore(), this.transitionTo("/") } }) }), define("browzine-web/routes/token-failure", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({ model: function (e) { this.get("flashMessages").alert("Library authentication failed"), this.transitionTo("libraries", { queryParams: { selectedLibrary: e.library_id } }) } }) }), define("browzine-web/routes/unknown", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        flashMessages: Ember.inject.service(), analytics: Ember.inject.service(), applicationSession: Ember.inject.service(), model: function () {
            var e, t = (e = regeneratorRuntime.mark(function e(t) {
                var n
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return e.next = 2, this.get("analytics").recordEvent({ category: "unknown_route", action: t.path })
                        case 2: (n = this.get("applicationSession").get("selectedLibrary")) ? (this.get("flashMessages").alert("Oops! “" + t.path + "” was not found, so we have redirected you to the main area of BrowZine"), this.transitionTo("library", n)) : (this.get("flashMessages").alert("“" + t.path + "” was not found. Please check the URL again to ensure it was properly spelled."), this.transitionTo("errors"))
                        case 4: case "end": return e.stop()
                    }
                }, e, this)
            }), function () {
                var t = e.apply(this, arguments)
                return new Promise(function (e, n) {
                    return function r(i, a) {
                        try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        e(o)
                    }("next")
                })
            })
            return function (e) { return t.apply(this, arguments) }
        }()
    })
}), define("browzine-web/routes/wayf", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Route.extend({
        model: function () {
            var e, t = (e = regeneratorRuntime.mark(function e() {
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return e.abrupt("return", Ember.RSVP.hash({ libraries: this.store.findAll("library").then(function (e) { return e.filterBy("subscriptions.web.active") }) }))
                        case 1: case "end": return e.stop()
                    }
                }, e, this)
            }), function () {
                var t = e.apply(this, arguments)
                return new Promise(function (e, n) {
                    return function r(i, a) {
                        try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        e(o)
                    }("next")
                })
            })
            return function () { return t.apply(this, arguments) }
        }()
    })
}), define("browzine-web/serializers/application", ["exports", "ember-data", "ember-inflector"], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.RESTSerializer.extend({
        isNewSerializerAPI: !0, modelNameFromPayloadKey: function (e) { return (0, n.singularize)(e) }, _normalizePolymorphicRecord: function (e, t, n, r, i) {
            var a = void 0, s = void 0
            return !function (e) { return Ember.get(e, "attributes").has("type") || Ember.get(e, "relationshipsByName").has("type") }(r) && t.type && e._hasModelFor(this.modelNameFromPayloadKey(t.type)) ? (a = e.serializerFor(this.modelNameFromPayloadKey(t.type)), s = e.modelFor(this.modelNameFromPayloadKey(t.type))) : (a = i, s = r), a.normalize(s, t, n)
        }
    })
}), define("browzine-web/serializers/article", ["exports", "ember-data"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.JSONAPISerializer.extend({ keyForAttribute: function (e) { return "ILLURL" === e ? "ILLURL" : Ember.String.camelize(e) }, keyForRelationship: function (e) { return Ember.String.camelize(e) } }) }), define("browzine-web/serializers/bookcase", ["exports", "browzine-web/serializers/application"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.extend({ extractRelationships: function (e, t) { return t.links.rankSortedJournals = t.links.journals + "?sort=rank", this._super(e, t) } }) }), define("browzine-web/serializers/bookshelf", ["exports", "browzine-web/serializers/application"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.extend({ extractRelationships: function (e, t) { return t.links.journals = t.links.journals + "?reload=true", t.links.rankSortedJournals = t.links.journals + "&sort=rank", this._super(e, t) } }) }), define("browzine-web/serializers/issue", ["exports", "browzine-web/serializers/application", "ember-data"], function (e, t, n) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.extend(n.default.EmbeddedRecordsMixin, { attrs: { articles: { embedded: "always" } } }) }), define("browzine-web/serializers/journal", ["exports", "ember-data"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.JSONAPISerializer.extend({ keyForAttribute: function (e) { return "rawCoverURL" === e ? "coverURL" : e }, keyForRelationship: function (e) { return Ember.String.camelize(e) } }) }), define("browzine-web/serializers/library", ["exports", "ember-data"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.JSONAPISerializer.extend({ keyForAttribute: function (e) { return "rawLogo" === e ? "logo" : e }, keyForRelationship: function (e) { return Ember.String.camelize(e) } }) }), define("browzine-web/serializers/ls-serializer", ["exports", "ember-localstorage-adapter/serializers/ls-serializer"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default }), define("browzine-web/serializers/search", ["exports", "ember-localstorage-adapter"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.LSSerializer.extend() }), define("browzine-web/serializers/subject", ["exports", "browzine-web/serializers/application"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.extend({ extractRelationships: function (e, t) { return t.links.rankSortedJournals = t.links.journals + "?sort=rank", this._super(e, t) } }) }), define("browzine-web/services/-infinite-scroller", ["exports", "@zestia/ember-simple-infinite-scroller/services/-infinite-scroller"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/services/a11y", ["exports"], function (e) {
    function t(e) {
        if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++)n[t] = e[t]
            return n
        } return Array.from(e)
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Service.extend({
        previousActiveElement: null, disableFocus: function (e) { [].concat(t(document.querySelectorAll(e))).forEach(function (e) { e.setAttribute("tabindex", -1), e.setAttribute("aria-hidden", !0) }) }, enableFocus: function (e) { [].concat(t(document.querySelectorAll(e))).forEach(function (t) { "a" === e ? t.removeAttribute("tabindex") : t.setAttribute("tabindex", 0), t.removeAttribute("aria-hidden") }) }, headerSearchFocus: function () {
            var e = this
            Ember.run.later(function () { e.set("previousActiveElement", document.querySelector(".search")), e.disableFocus("a"), e.disableFocus("button"), e.disableFocus(".tabindex"), e.enableFocus(".search"), e.enableFocus(".search-pane .tabindex"), e.enableFocus(".result-container .result a"), e.enableFocus(".filter-container .filters .filter") }, 1e3)
        }, headerSearchBlur: function () {
            var e = this
            Ember.run.later(function () {
                var t = e.get("previousActiveElement")
                e.enableFocus("a"), e.enableFocus("button"), e.enableFocus(".tabindex"), t && t.focus()
            }, 1e3)
        }, bzModalFocus: function (e) {
            var t = this
            Ember.run.next(function () { t.disableFocus("a"), t.disableFocus("button"), t.disableFocus(".tabindex"), t.enableFocus("#" + e.element.id + " .tabindex") })
        }, bzModalBlur: function () {
            var e = this
            Ember.run.next(function () {
                var t = e.get("previousActiveElement")
                e.enableFocus("a"), e.enableFocus("button"), e.enableFocus(".tabindex"), t && t.focus()
            })
        }, issueNavFocus: function () {
            var e = this
            Ember.run.next(function () {
                var t = ".back-issue-items .issue:nth-child(1) a", n = document.querySelector(t)
                e.set("previousActiveElement", n), e.enableFocus(t), n && n.focus()
            })
        }, issueTitleFocus: function () {
            var e = this
            Ember.run.next(function () {
                var t = document.querySelector(".issue .title")
                e.set("previousActiveElement", t), e.enableFocus(".issue .title"), t && t.focus()
            })
        }, responsiveMenuFocus: function () {
            this.set("previousActiveElement",
                document.querySelector("#menu")),
                this.disableFocus("a"),
                this.disableFocus("button"),
                this.disableFocus(".tabindex"),
                this.enableFocus("#menu")
        }, responsiveMenuBlur: function () {
            var e = this.get("previousActiveElement")
            this.enableFocus("a"), this.enableFocus("button"), this.enableFocus(".tabindex"), e && e.focus()
        }
    })
}), define("browzine-web/services/ajax", ["exports", "ember-ajax/services/ajax", "browzine-web/config/environment"], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.extend({
        auth: Ember.inject.service(), applicationSession: Ember.inject.service(), namespace: n.default.apiNamespace, host: n.default.apiHost, headers: Ember.computed("session.authToken", {
            get: function () {
                var e = {}, t = this.get("applicationSession").get("selectedLibrary")
                if (t) {
                    var n = this.get("auth").getAPIAuthHeaderForLibrary(t)
                    n && (e.Authorization = n)
                } return e
            }
        })
    })
}), define("browzine-web/services/analytics", ["exports", "browzine-web/config/environment", "uuid", "ti-es-analytics-client", "lodash.omit"], function (e, t, n, r, i) {
    function a(e) {
        return function () {
            var t = e.apply(this, arguments)
            return new Promise(function (e, n) {
                return function r(i, a) {
                    try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                    e(o)
                }("next")
            })
        }
    } Object.defineProperty(e, "__esModule", { value: !0 })
    var s = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t]
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        } return e
    }
    var o = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n]
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        } return function (t, n, r) { return n && e(t.prototype, n), r && e(t, r), t }
    }()
    var l = ["allpubs_name_tapped", "ArticleDownloadSuccess", "featured_cover_tapped", "MyBookshelf", "ShowJournalInShelves", "TableOfContentsScreenView"], u = ["PublicAPIViewJournalContentsClick"], c = ["ArticleDownloadSuccess", "issue_summary_article_withfulltext_tapped", "issue_summary_article_embargoed_tapped", "issue_summary_article_fulltextfile_downloaded", "PublicAPIFullTextFile"], d = ["PublicAPIArticleInContext"], m = ["login_button_tapped"], b = { ArticleDownloadSuccess: "ArticleDownload", TableOfContentsScreenView: "TableOfContents" }, f = function (e) { return b[e.category] || e.category }, p = function (e) { return ["allpubs_name_tapped", "ArticleDownloadSuccess", "featured_cover_tapped", "issue_summary_article_embargoed_tapped", "issue_summary_article_fulltextfile_downloaded", "issue_summary_article_withfulltext_tapped", "login_button_tapped", "PublicAPIArticleInContext", "PublicAPIFullTextFile", "PublicAPIViewJournalContentsClick", "ShowJournalInShelves"].includes(e.category) ? "Success" : "TableOfContentsScreenView" === e.category ? "Viewed" : e.action }, h = function (e) { return l.includes(e.category) ? e.value : u.includes(e.category) ? e.action : void 0 }, g = function (e) { return c.includes(e.category) ? e.action : void 0 }, y = function (e) { return d.includes(e.category) && e.action ? e.action.replace("doi:", "") : void 0 }, v = function (e) { return m.includes(e.category) ? e.action : void 0 }
    e.default = Ember.Service.extend({
        applicationSession: Ember.inject.service(), tiAnalyticsClient: null, uniqueDeviceId: null, libraryId: null, init: function () {
            this._super.apply(this, arguments)
            var e = localStorage.getItem("analytics.uniqueDeviceId")
            if (e) this.uniqueDeviceId = e
            else {
                var i = (0, n.v4)()
                localStorage.setItem("analytics.uniqueDeviceId", i), this.uniqueDeviceId = i
            } var a = this, l = new (function (e) {
                function t() {
                    return function (e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }(this, t), function (e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                } return function (e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t)
                    e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, r.AnalyticsBaseClientDelegate), o(t, [{ key: "getDimensions", value: function () { return s({}, a.newStaticDimensions(), a.newDynamicDimensions()) } }, { key: "logError", value: function (e) { console.error(e) } }]), t
            }())(t.default.analyticsServiceAddress)
            this.tiAnalyticsClient = new r.AnalyticsClient(l), this.setUserId()
        }, newStaticDimensions: function () { return { os: window.navigator.platform, appName: "BZWeb", property: "production" === t.default.environment ? r.AnalyticsProperty.PRODUCTION_FOREGROUND : r.AnalyticsProperty.NON_PRODUCTION_FOREGROUND, uniqueDeviceId: this.uniqueDeviceId, browser: window.navigator.appCodeName, browserVersion: window.navigator.appVersion, userAgent: window.navigator.userAgent, appVersion: void 0, osVersion: void 0, deviceMake: void 0, deviceModel: void 0 } }, newDynamicDimensions: function () { return { libraryId: this.libraryId, userId: this.getUserId(), url: window.location.href, openAccess: void 0, utmSource: this.utmSource, utmMedium: this.utmMedium, utmCampaign: this.utmCampaign, utmTerm: this.utmTerm, utmContent: this.utmContent } }, getUserId: function () {
            if (window.ga && t.default.recordAnalyticsMetrics) {
                var e = this.get("applicationSession").get("loggedInUser")
                return e && e.userId ? e.userId : null
            } return null
        }, setUserId: function () {
            var e = this.getUserId()
            e && window.ga("set", "userId", e)
        }, recordTiming: function (e) { window.ga && t.default.recordAnalyticsMetrics && window.ga("send", { hitType: "timing", timingCategory: e.timingCategory, timingVar: e.timingVar, timingValue: e.timingValue, timingLabel: e.timingLabel }) }, recordEvent: function () {
            var e = a(regeneratorRuntime.mark(function e(n) {
                var r, s, o = this
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: if (!window.ga || !t.default.recordAnalyticsMetrics) {
                            e.next = 5
                            break
                        } return window.ga("send", { hitType: "event", eventCategory: n.category, eventAction: n.action, eventLabel: n.label, eventValue: n.value }), r = ["category", "action", "label", "value", "journalId", "issueId", "articleId", "referringProduct", "openAccess"], s = (0, i.default)(n, r), e.abrupt("return", new Ember.RSVP.Promise(function (e) {
                            Ember.run(a(regeneratorRuntime.mark(function t() {
                                return regeneratorRuntime.wrap(function (t) {
                                    for (; ;)switch (t.prev = t.next) {
                                        case 0: return t.prev = 0, t.next = 3, o.tiAnalyticsClient.sendEvent({ articleId: g(n), doi: y(n), eventCategory: f(n), eventType: p(n), gaEventLabel: n.label, gaEventValue: n.value, journalId: h(n), issueId: n.issueId, libraryId: v(n), referringProduct: n.referringProduct, openAccess: n.openAccess, extras: s })
                                        case 3: return t.abrupt("return", e())
                                        case 6: return t.prev = 6, t.t0 = t.catch(0), console.log("Error recording analytics event: " + t.t0.stack), t.abrupt("return", e())
                                        case 10: case "end": return t.stop()
                                    }
                                }, t, o, [[0, 6]])
                            })))
                        }))
                        case 5: case "end": return e.stop()
                    }
                }, e, this)
            }))
            return function (t) { return e.apply(this, arguments) }
        }(), recordPageView: function (e) { window.ga && t.default.recordAnalyticsMetrics && window.ga("send", "pageview", { page: e, title: e }) }, setCustomDimension: function (e, n) { window.ga && t.default.recordAnalyticsMetrics && window.ga("set", "dimension" + e, n), 1 == e && (this.libraryId = n) }, setUTMDimension: function (e, t) { "utm_source" === e ? this.utmSource = t : "utm_medium" === e ? this.utmMedium = t : "utm_campaign" === e ? this.utmCampaign = t : "utm_term" === e ? this.utmTerm = t : "utm_content" === e ? this.utmContent = t : console.log("Tried to set unrecognized UTM dimension: " + e) }
    })
}), define("browzine-web/services/announcer", ["exports", "a11y-announcer/services/announcer"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) })
define("browzine-web/services/application-session", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 })
    var t = "browzine-library-token-"
    function n(e) { return "" + t + e } function r(e) { return { get: function () { if (localStorage.getItem(e)) return JSON.parse(localStorage.getItem(e)) }, set: function (t, n) { return n ? (localStorage.setItem(e, JSON.stringify(n)), n) : (localStorage.removeItem(e), n) } } } e.default = Ember.Service.extend({
        transitionToRetryAfterAuth: null, selectedLibrary: null, mostRecentLibrary: Ember.computed({ get: function () { return localStorage.getItem("BZ_mostRecentLibrary") }, set: function (e, t) { return localStorage.setItem("BZ_mostRecentLibrary", t.toString()), t.toString() } }), localeOverride: Ember.computed(r("libkey-locale-override")), clearSelectedLibrary: function () { this.set("selectedLibrary", void 0) }, loggedInUser: Ember.computed(r("browzine-logged-in-user-data")), getBrowserIdentifier: function () {
            var e = localStorage.getItem("browzine-browser-identifier")
            if (e) return e
            var t, n = (t = (new Date).getTime(), "undefined" != typeof performance && "function" == typeof performance.now && (t += performance.now()), "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
                var n = (t + 16 * Math.random()) % 16 | 0
                return t = Math.floor(t / 16), ("x" === e ? n : 3 & n | 8).toString(16)
            }))
            return localStorage.setItem("browzine-browser-identifier", n), n
        }, userIsLoggedIn: Ember.computed("loggedInUser", function () { return !!this.get("loggedInUser") }), setLoggedInUser: function (e) { this.set("loggedInUser", e) }, clearLoggedInUser: function () { this.set("loggedInUser", null), this.notifyPropertyChange("loggedInUser") }, lookupLibraryToken: function (e) {
            var t = n(e), r = localStorage.getItem(t)
            if (r) return JSON.parse(r)
        }, storeTokenForLibrary: function (e, t) {
            var r = n(e)
            localStorage.setItem(r, JSON.stringify(t)), localStorage.setItem("BZ_mostRecentLibrary", e)
        }, clearLibraryToken: function (e) {
            var t = n(e)
            localStorage.removeItem(t)
        }, clearAllLibraryTokens: function () {
            for (var e = [], n = 0; n < localStorage.length; n++)-1 !== localStorage.key(n).indexOf(t) && e.push(localStorage.key(n))
            var r = !0, i = !1, a = void 0
            try {
                for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done); r = !0) {
                    var l = s.value
                    localStorage.removeItem(l)
                }
            } catch (u) { i = !0, a = u } finally { try { !r && o.return && o.return() } finally { if (i) throw a } }
        }, currentIssueNeedsReload: !1
    })
}), define("browzine-web/services/auth", ["exports", "browzine-web/config/environment", "fetch", "browzine-web/mixins/error-helpers"], function (e, t, n, r) {
    function i(e) {
        var n = e["api-tokens"][0]
        if (n) {
            var r = n.id, i = (n.permission_grants || []).map(function (e) { return { permissionCode: e.permission_code, libraryScope: e.library_scope } })
            return { userId: n.links.user.id, email: n.links.user.email, permissionGrants: i, couchdbDatabaseLocation: n.links.user.couchdbDatabaseLocation || t.default.couchDatabase, token: r }
        }
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Service.extend(Ember.Evented, r.default, {
        errorReporter: Ember.inject.service(), analytics: Ember.inject.service(), applicationSession: Ember.inject.service(), userAgent: Ember.inject.service("user-agent"), windowLocation: Ember.inject.service(), router: Ember.inject.service(), store: Ember.inject.service(), myBookshelf: Ember.inject.service(), myArticles: Ember.inject.service(), intl: Ember.inject.service(), getAPIAuthHeaderForLibrary: function (e) {
            var t = this.get("applicationSession").lookupLibraryToken(e)
            if (t && t.token) {
                var n = this.get("applicationSession").get("loggedInUser")
                return n && n.token ? "Bearer " + t.token + "|" + n.token : "Bearer " + t.token
            }
        }, authenticateUser: function (e, n) {
            var r = this
            return new Ember.RSVP.Promise(function (a, s) {
                Ember.run(function () {
                    Ember.$.ajax({ url: t.default.apiBaseUrl + "/api-tokens", type: "POST", data: JSON.stringify({ email: e, password: n }), contentType: "application/json; charset=utf-8", dataType: "json" }).then(function (e) {
                        var t = i(e)
                        return a(t)
                    }).fail(function (e) {
                        var t = null
                        e && e.responseJSON && (t = r.getErrorObjectFromErrorResponse(e.responseJSON)), t || (t = "unknown error"), s(t)
                    })
                })
            }).then(function (e) { r.get("applicationSession").setLoggedInUser(e) })
        }, lookupUserSession: function (e) {
            var n = this
            return new Ember.RSVP.Promise(function (r, a) {
                Ember.$.ajax({ url: t.default.apiBaseUrl + "/api-tokens", type: "POST", data: JSON.stringify({ existingToken: e }), contentType: "application/json; charset=utf-8", dataType: "json" }).then(function (e) {
                    var t = i(e)
                    return r(t)
                }).fail(function (e) {
                    var t = null
                    e && e.responseJSON && (t = n.getErrorObjectFromErrorResponse(e.responseJSON)), t || (t = "unknown error"), a(t)
                })
            })
        }, authenticateWithUserToken: function (e) {
            var t = this
            return this.lookupUserSession(e).then(function (e) {
                if (!e) throw new Error("Lookup of user token failed")
                t.get("applicationSession").setLoggedInUser(e)
            })
        }, attemptDirectLibraryAuth: function (e, n, r) {
            var i = this, a = "/", s = "/", o = this.get("router._routerMicrolib")
            if (o) {
                var l = {}, u = r
                if (u && u.intent) {
                    var c = void 0
                    if (u.intent.url) c = u.intent.url
                    else {
                        var d = Object.getOwnPropertyNames(u.params).map(function (e) { return u.params[e] })
                        if (c = o.recognizer.generate(u.intent.name, function e(t, n) { return n && n.length ? (Ember.merge(t, n[0]), e(t, n.slice(1))) : t }({}, d)), u.queryParams && Object.getOwnPropertyNames(u.queryParams).length) c += "?" + Object.getOwnPropertyNames(u.queryParams).map(function (e) { return e + "=" + u.queryParams[e] }).join("&")
                    } l.intent = window.btoa(JSON.stringify({ url: c }))
                } a = this.get("router._routerMicrolib").generate("accept-token", e, { queryParams: l }), s = this.get("router._routerMicrolib").generate("token-failure", e)
            } return new Ember.RSVP.Promise(function (r, i) {
                Ember.$.ajax({ url: t.default.apiBaseUrl + "/api-tokens", type: "POST", data: JSON.stringify({ libraryId: e, returnPreproxy: !0, client: "bzweb", forceAuth: n, success: a, failure: s }), contentType: "application/json; charset=utf-8", dataType: "json" }).then(function (t) {
                    var n = t["api-tokens"][0], i = n.id
                    r({ libraryId: e, token: i, expiresAt: n.expires_at })
                }, function (e) { i(e) })
            }).then(function (t) {
                var n = i.get("applicationSession")
                n.storeTokenForLibrary(t.libraryId, { token: t.token, expiresAt: t.expiresAt }), n.set("selectedLibrary", e), i.get("store").unloadAll("journal"), i.get("store").unloadAll("issue"), i.get("store").unloadAll("article")
            })
        }, authenticateLibraryDirectOnly: function (e) {
            var n = this
            return new Ember.RSVP.Promise(function (n, r) {
                Ember.$.ajax({ url: t.default.apiBaseUrl + "/api-tokens", type: "POST", data: JSON.stringify({ libraryId: e, returnPreproxy: !0 }), contentType: "application/json; charset=utf-8", dataType: "json" }).then(function (t) {
                    var r = t["api-tokens"][0]
                    n({ libraryId: e, token: r.id, expiresAt: r.expires_at })
                }, function (e) { r(e) })
            }).then(function (t) {
                var r = n.get("applicationSession")
                r.storeTokenForLibrary(t.libraryId, { token: t.token, expiresAt: t.expiresAt }), r.set("selectedLibrary", e), n.get("store").unloadAll("journal"), n.get("store").unloadAll("issue"), n.get("store").unloadAll("article")
            })
        }, authenticateLibraryThroughProxy: function (e, t) { return this.get("windowLocation").assign(e), t && t.abort(), { updatedWindowLocation: !0 } }, authenticateLibraryThroughSSOGateway: function (e, t) { return this.get("windowLocation").assign(e), t && t.abort(), { updatedWindowLocation: !0 } }, authenticateLibrary: function (e, t) {
            var n = this, r = e.libraryId, i = e.forceAuth
            return this.attemptDirectLibraryAuth(r, i, t).catch(function (e) {
                var r = null
                return e && e.responseJSON && (r = n.getErrorObjectFromErrorResponse(e.responseJSON)), r || (r = "unknown error"), r.preproxy ? n.authenticateLibraryThroughProxy(r.preproxy, t) : r.ssoGateway ? n.authenticateLibraryThroughSSOGateway(r.ssoGateway, t) : Ember.RSVP.reject(r)
            })
        }, signUpUser: function (e, n, r, i, a) {
            var s = { shelve: this.get("myBookshelf.shelve"), addToMyArticles: this.get("myArticles.addToMyArticles"), loginRequired: this.get("myBookshelf.loginRequired"), returnRoute: this.get("myBookshelf.returnRoute"), showBpsMessage: a, selectedLibrary: this.get("applicationSession").get("selectedLibrary") }
            for (var o in s) s.hasOwnProperty(o) && (s[o] || delete s[o])
            var l = Ember.$.param(s), u = this.get("intl").get("primaryLocale") || "en-us"
            return this._authFetch(t.default.apiBaseUrl + "/user-signups", { method: "post", headers: { Accept: "application/json", "Content-Type": "application/json", "Accept-Language": u }, body: JSON.stringify({ email: e, password: n, digestEmailStatus: r ? "weekly" : "off", confirm_url_template: window.location.protocol + "//" + window.location.host + "/confirm-email/{email_confirmation_token}/?" + l, device_id: i }) }).then(function (e) { return e.json().then(function (e) { return e["user-signups"][0] }) })
        }, getUserSignupStatus: function (e) { return this._authFetch(t.default.apiBaseUrl + "/user-signups/" + e, { headers: { Accept: "application/json" } }).then(function (e) { return e.json().then(function (e) { return e["user-signups"][0] }) }) }, awaitSignupConfirmation: function (e) {
            var t = this
            return this.getUserSignupStatus(e).then(function (n) { return n.email_confirmed ? n : new Ember.RSVP.Promise(function (n, r) { setTimeout(function () { try { n(t.awaitSignupConfirmation(e)) } catch (i) { r(i) } }, 1e3) }) })
        }, awaitSignupConfirmationAndAuthenticate: function (e, t, n) {
            var r = this
            return this.awaitSignupConfirmation(e).then(function () { return r.authenticateUser(t, n) })
        }, confirmEmail: function (e) {
            var n, r, i = this
            return this._authFetch(t.default.apiBaseUrl + "/user-signup-confirmations/" + e, { method: "put", headers: { Accept: "application/json" } }).then(function (e) { return e.json() }).then((n = regeneratorRuntime.mark(function e(n) {
                var r, a, s, o, l, u
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: return r = i.get("analytics"), a = i.get("applicationSession"), e.next = 4, r.recordEvent({ category: "AccountSignup", action: "BzAccountVerified", label: i.get("userAgent.platform"), value: a.get("selectedLibrary") || "no-selected-library" })
                        case 4: s = n["user-signup-confirmations"][0], o = s.links["api-token"], l = s.links["api-token"].links.user, u = { userId: l.id, email: l.email, permissions: o.permissions, couchdbDatabaseLocation: l.couchdbDatabaseLocation || t.default.couchDatabase, token: o.id, expiresAt: o.expires_at }, i.get("applicationSession").setLoggedInUser(u)
                        case 9: case "end": return e.stop()
                    }
                }, e, i)
            }), r = function () {
                var e = n.apply(this, arguments)
                return new Promise(function (t, n) {
                    return function r(i, a) {
                        try { var s = e[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                        t(o)
                    }("next")
                })
            }, function (e) { return r.apply(this, arguments) }))
        }, emailResetToken: function (e) {
            var n = this.get("intl").get("primaryLocale") || "en-us"
            return this._authFetch(t.default.apiBaseUrl + "/users/password-resets", { method: "post", headers: { Accept: "application/json", "Content-Type": "application/json", "Accept-Language": n }, body: JSON.stringify({ email: e, reset_url_template: window.location.protocol + "//" + window.location.host + "/auth/reset?token={password_reset_token}&email={email}" }) }).then(function () { return !0 })
        }, updatePassword: function (e) {
            var n = e.email, r = e.token, i = e.newPassword
            return this._authFetch(t.default.apiBaseUrl + "/users/change-password", { method: "post", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ email: n, reset_token: r, new_password: i }) }).then(function () { return !0 })
        }, validatePassword: function (e, t) { return e && e.length ? e.length < 8 ? { valid: !1, validationErrorMessage: this.get("intl").t("auth.password_too_short_validation_message") } : e !== t ? { valid: !1, validationErrorMessage: this.get("intl").t("auth.password_mismatch_validation_message") } : { valid: !0 } : { valid: !1, validationErrorMessage: this.get("intl").t("auth.no_password_validation_message") } }, checkIfLibraryUsesBPS: function (e) {
            var t = this.get("store")
            return e ? t.findRecord("library", e).then(function (e) { return e.get("bpsLibrary") }) : Ember.RSVP.Promise.resolve(!1)
        }, authenticateBps: function (e) {
            var n = this, r = void 0, i = this.get("applicationSession").get("loggedInUser")
            return i && (r = i.token), new Ember.RSVP.Promise(function (i, a) {
                Ember.$.ajax({ url: t.default.apiBaseUrl + "/api-tokens", type: "POST", data: JSON.stringify({ libraryId: e, bpsAuth: !0, userToken: r }), contentType: "application/json; charset=utf-8", dataType: "json" }).then(function (t) {
                    var n = t["api-tokens"][0], r = n.id
                    return i({ libraryId: e, token: r, expiresAt: n.expires_at })
                }).fail(function (e) {
                    var t = null
                    e && e.responseJSON && (t = n.getErrorObjectFromErrorResponse(e.responseJSON)), t || (t = "unknown error"), a(t)
                })
            })
        }, sendBpsEmail: function (e) {
            var n = void 0, r = this.get("applicationSession").get("loggedInUser")
            return r && (n = r.token), this._authFetch(t.default.apiBaseUrl + "/bps-confirmations", { method: "post", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ userToken: n, libraryId: e, confirm_url_template: window.location.protocol + "//" + window.location.host + "/auth/login?confirm-bps-email=true&library-id={library_id}" }) }).then(function (e) { return e.json() }).then(function (e) { return e["bps-confirmations"][0] })
        }, _authFetch: function (e, t) {
            var r = this
            return new Ember.RSVP.Promise(function (i, a) {
                Ember.run(function () {
                    return (0, n.default)(e, t).then(function (e) {
                        if (200 === e.status) return e
                        if (422 === e.status) return e.json().then(function (e) {
                            var t = r.getErrorObjectFromErrorResponse(e[0])
                            if (t && t.userDetail) {
                                var n = new Error(t.userDetail)
                                n.isUserErr = !0
                                var i = t.userData
                                throw i && Object.keys(i).forEach(function (e) { return n[e] = i[e] }), n
                            } throw new Error("Unknown error response from server: " + JSON.stringify(e))
                        })
                        throw new Error("Invalid status code: " + e.status)
                    }).then(function (e) { i(e) }).catch(function (t) {
                        if (t.isUserErr) throw t
                        throw r.get("errorReporter").reportUnknownError("error performing auth fetch for url: " + e, t), new Error("An unknown error occurred, please try again.")
                    }).catch(function (e) { a(e) })
                })
            })
        }
    })
}), define("browzine-web/services/clipboard", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Service.extend({
        userAgent: Ember.inject.service("user-agent"), textarea: null, contentEditor: null, copyToClipboard: function () {
            var e = this.get("contentEditor"), t = this.get("textarea")
            document.execCommand("copy"), e || document.body.removeChild(t)
        }, selectText: function () {
            var e = this.get("textarea")
            if (this.get("userAgent").get("isIOS")) {
                var t = document.createRange()
                t.selectNodeContents(e)
                var n = window.getSelection()
                n.removeAllRanges(), n.addRange(t), e.setSelectionRange(0, 999999)
            } else e.select()
        }, createTextArea: function (e, t) { this.get("contentEditor") || ((t = document.createElement("textarea")).value = e, document.body.appendChild(t)), this.set("textarea", t) }, copy: function (e, t) { this.set("contentEditor", !!t), this.createTextArea(e, t), this.selectText(), this.copyToClipboard() }
    })
}), define("browzine-web/services/customizations", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Service.extend({
        auth: Ember.inject.service(), applicationSession: Ember.inject.service(), store: Ember.inject.service(), getCustomStyle: function () {
            var e = this.get("applicationSession.selectedLibrary")
            if (!e) return ""
            var t = this.get("store").peekRecord("library", e)
            if (!t) return ""
            var n = t.get("httpsCustomBackgroundImageUrl") || ""
            return n ? "background-size: auto; background-image: url(" + n + ");" : ""
        }
    })
}), define("browzine-web/services/error-reporter", ["exports", "browzine-web/config/environment", "browzine-web/errors/tracing"], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Service.extend({
        auth: Ember.inject.service(), applicationSession: Ember.inject.service(), reportLibraryDetectionError: function () { this._reportError("libraryDetectionError") }, reportOpenAccessTokenError: function () { this._reportError("openAccessTokenError") }, reportTooManySubscribeError: function () { this._reportError("tooManySubscriptionAttempts", { webPageString: "coming soon signup - too many subscribe attempts" }) }, reportUnknownSubscribeError: function () { this._reportError("unknownSubscribeError", { webPageString: "coming soon signup - unknown error" }) }, reportLibraryAuthenticationError: function (e) { this._reportError("libraryAuthenticationError", { libraryBZID: e }) }, reportJournalWithNoIssuesError: function (e) { this._reportError("journalWithNoIssuesError", { journal_bzid: e }) }, reportFailedArticleShare: function (e) { this._reportError("failedArticleShare", { webPageString: JSON.stringify(e) }) }, reportMyBookshelfUpdateError: function (e, t, n, r) { this._reportError("myBookshelfUpdateError", { webPageString: JSON.stringify({ error: e, requests: t, previousDocument: n, failedDocument: r }) }) }, reportMyArticlesUpdateError: function (e, t, n, r) { this._reportError("myArticlesUpdateError", { webPageString: JSON.stringify({ error: e, requests: t, previousDocument: n, failedDocument: r }) }) }, reportMyBookshelfFetchError: function (e) { this._reportError("myBookshelfFetchError", { webPageString: JSON.stringify(e) }) }, reportMyBookshelfParseError: function (e) { this._reportError("myBookshelfParseError", { webPageString: JSON.stringify(e) }) }, reportMyBookshelfValidationError: function (e, t) { this._reportError("myBookshelfValidationError", { webPageString: JSON.stringify({ failedDocument: e, errors: t }) }) }, reportMyArticlesValidationError: function (e, t) { this._reportError("myArticlesValidationError", { webPageString: JSON.stringify({ failedDocument: e, errors: t }) }) }, reportMyBookshelfReadValidationError: function (e, t) { this._reportError("myBookshelfReadValidationError", { webPageString: JSON.stringify({ failedDocument: e, errors: t }) }) }, reportArticleStatusUpdateError: function (e, t, n) { this._reportError("articleStatusUpdateError", { webPageString: JSON.stringify({ error: e, previousDocument: t, failedDocument: n }) }) }, reportArticleStatusValidationError: function (e, t) { this._reportError("articleStatusValidationError", { webPageString: JSON.stringify({ failedDocument: e, errors: t }) }) }, reportArticleStatusReadValidationError: function (e, t) { this._reportError("articleStatusReadValidationError", { webPageString: JSON.stringify({ failedDocument: e, errors: t }) }) }, reportHelpError: function (e) { this._reportError("helpError", { webPageString: JSON.stringify(e) }) }, reportUnknownError: function (e, t) { console.log(e, t), void 0 !== t.status ? this._reportError(e, { webPageString: "the server responded with an error: " + JSON.stringify(t), lastURLAccessed: t.lastTransitionUrl || window.location.href }) : this._reportError(e, { webPageString: (t.message || e) + ": \n" + t.stack, lastURLAccessed: t.lastTransitionUrl || window.location.href }) }, _reportError: function (e, r) {
            var i = void 0, a = this.get("applicationSession").get("loggedInUser"), s = (a || {}).email || "BID-" + this.get("applicationSession").getBrowserIdentifier()
            a && (i = new URL(a.couchdbDatabaseLocation).pathname.replace("/", ""))
            var o = Ember.$("#user-info-email").text(), l = { appVersion: t.default.APP.version, lastURLAccessed: window.location.href, libraryBZID: this.get("applicationSession.selectedLibrary"), webPageString: e, platform: "web", platformVersion: window.navigator.appVersion, deviceManuf: "", deviceModel: "", time_until_error: 0, errorType: e, deviceID: s, email: o }, u = Ember.assign(l, r || {}), c = { original: u.webPageString, localStorage: localStorage, couchDb: i }
            t.default.recordUserTrace && (c.userTrace = (0, n.getTrace)()), u.webPageString = JSON.stringify(c), t.default.errorReportingHost ? Ember.$.ajax({ url: t.default.errorReportingHost + "/bzadmin/reportProblem/", type: "POST", data: u }) : console.log("no errorReportingHost available, so not sending this error: ", u)
        }
    })
}), define("browzine-web/services/exporters", ["exports", "browzine-web/config/environment", "browzine-web/services/exporters/zotero", "browzine-web/services/exporters/mendeley"], function (e, t, n, r) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Service.extend({
        flashMessages: Ember.inject.service(), errorReporter: Ember.inject.service(), intl: Ember.inject.service(), services: { zotero: n.default.create(), mendeley: r.default.create() }, share: function (e, t, n) {
            var r = this, i = this.get("services")[e]
            i.hasCredentials() ? this.saveArticle(i, n, t, function () { r.showSuccess(i.get("name")) }) : (this.addSuccessListener(), this.setExportArticle(n), i.share(t, n))
        }, saveArticle: function (e, n, r, i) {
            var a = this, s = e.getSaveParams()
            s.libraryId = r.get("id"), Ember.$.ajax({ url: t.default.apiHost + "/oauth/" + e.get("name") + "/save-article/" + n.id + "?" + Ember.$.param(s), type: "POST", success: i, error: function (e) { a.get("flashMessages").alert("Error saving article"), a.get("errorReporter").reportFailedArticleShare(e) } })
        }, setExportArticle: function (e) { localStorage.setItem("export_article", e.id) }, addSuccessListener: function () {
            var e = this
            window.addEventListener("storage", function () { "yes" === localStorage.getItem("save_article_success") && (localStorage.setItem("save_article_success", "no"), e.showSuccess(localStorage.getItem("export_service"))) })
        }, showSuccess: function (e) { this.get("flashMessages").success("Succesfully saved article to " + e + "!") }, zotero: function (e, t) { this.share("zotero", e, t) }, mendeley: function (e, t) { this.share("mendeley", e, t) }, bibtex: function (e, n) {
            var r = e.get("id"), i = t.default.apiHost + "/oauth/bibtext/" + n.id + "?" + Ember.$.param({ libraryId: r })
            window.open(i)
        }, refworks: function (e, n) {
            var r = e.get("id"), i = t.default.apiHost + "/oauth/endnote-ris/" + n.id + "?libraryId=" + r, a = "http://www.refworks.com/express/expressimport.asp?" + Ember.$.param({ vendor: "BrowZine", filter: "RIS Format", url: i })
            window.open(a, "RefWorksMain")
        }, endnote: function (e, n) {
            var r = e.get("id"), i = t.default.apiHost + "/oauth/endnote-ris/" + n.id + "?" + Ember.$.param({ libraryId: r })
            window.open(i)
        }, twitter: function (e) {
            var t = e.get("strippedTitle"), n = "http://localhost/journals/articles/" + e.id, r = 280 - n.length
            t.length > r && (t = t.substring(0, r) + "...")
            var i = { text: t, url: n }, a = "https://twitter.com/intent/tweet?" + Ember.$.param(i)
            window.open(a, "_blank", "width=800,height=500")
        }, facebook: function (e) {
            var t = void 0
            t = e.get("inPress") ? e.get("journal") : e.get("issue").get("journal")
            var n = { app_id: 0x5b685b3bfd86e, display: "popup", caption: "Article from BrowZine", description: e.get("strippedTitle") + " http://localhost/journals/articles/" + e.id, href: "http://localhost/journals/articles/" + e.id, picture: t.get("coverURL"), hashtag: "#BrowZine" }, r = "https://www.facebook.com/dialog/share?" + Ember.$.param(n)
            window.open(r, "_blank", "width=800,height=500")
        }, linkedin: function (e) {
            var t = e.get("strippedTitle")
            t.length > 200 && (t = t.substring(0, 200) + "...")
            var n = "http://localhost/journals/articles/" + e.id, r = { title: t, summary: t + " " + n, url: n, source: "http://localhost/journals/", mini: !0 }, i = "https://www.linkedin.com/shareArticle?" + Ember.$.param(r)
            window.open(i, "_blank", "width=520,height=570")
        }, email: function (e) {
            var t = e.get("strippedTitle")
            t.length > 200 && (t = t.substring(0, 200) + "...")
            var n = ""
            e.get("inPress") || (n = e.get("issue").get("title"))
            var r = e.getWithDefault("startPage", "")
            r.length > 0 && (r = "pp. " + r, n.length > 0 && (r = ", " + r)), e.getWithDefault("hasNoEndPage", !0) || (r += "-" + e.get("endPage"))
            var i = void 0
            i = e.get("inPress") ? e.get("journal") : e.get("issue").get("journal")
            var a = ""
            e.get("inPress") || (a = e.get("issue").get("year"), (n.length > 0 || r.length > 0) && (a = ", " + a))
            var s = { subject: t, body: e.get("strippedTitle") + "\n" + i.get("title") + "\n" + n + r + a + "\n\n" + this.get("intl").t("journal.article.email.link") + ": http://localhost/journals/articles/" + e.id + "\n\n\n" + this.get("intl").t("journal.article.email.header") + "\n\n" + this.get("intl").t("journal.article.email.body") + "\n\n" + this.get("intl").t("journal.article.email.cta") + "\n" }
            window.location.href = "mailto:?subject=" + s.subject + "&body=" + encodeURIComponent(s.body)
        }
    })
}), define("browzine-web/services/exporters/mendeley", ["exports", "browzine-web/config/environment"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Object.extend({
        flashMessages: Ember.inject.service(), errorReporter: Ember.inject.service(), name: "Mendeley", share: function () {
            var e = window.location.protocol + "//" + window.location.host + "/oauth?service=mendeley", n = { client_id: "https:" === window.location.protocol.trim().toLowerCase() ? t.default.mendeleyClientIdHttps : t.default.mendeleyClientIdHttp, redirect_uri: e, response_type: "code", scope: "all" }
            window.open("https://api.mendeley.com/oauth/authorize?" + Ember.$.param(n), "Mendeley Authorization", "width=800,height=800")
        }, token: function (e, n) {
            var r = this
            Ember.$.ajax({
                url: t.default.apiHost + "/oauth/mendeley/token?" + Ember.$.param(e), type: "POST", success: function (e) {
                    var t = e.access_token, r = (new Date).getTime() + 1e3 * e.expires_in
                    localStorage.setItem("mendeley_token", t), localStorage.setItem("mendeley_expiration", r), n()
                }, error: function (e) { r.get("flashMessages").alert("Error getting Mendeley token"), r.get("errorReporter").reportFailedArticleShare(e) }
            })
        }, getSaveParams: function () { return { token: localStorage.getItem("mendeley_token") } }, hasCredentials: function () {
            var e = localStorage.getItem("mendeley_token"), t = +localStorage.getItem("mendeley_expiration"), n = new Date
            return e && t && t > n.getTime()
        }
    })
}), define("browzine-web/services/exporters/zotero", ["exports", "browzine-web/config/environment"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Object.extend({
        name: "Zotero", share: function (e, n) {
            var r = this, i = window.open("https://www.zotero.org/oauth/authorize?oauth_token=&write_access=1&library_access=1", "Zotero Authorization", "width=800,height=800"), a = window.location.protocol + "//" + window.location.host + "/oauth?article_id=" + n.id + "&service=zotero"
            Ember.$.ajax({ url: t.default.apiHost + "/oauth/zotero/request-token?callback_url=" + encodeURIComponent(a), type: "POST", success: function (e) { localStorage.setItem("zotero_temp_oauth_token", e.oauth_token), localStorage.setItem("zotero_temp_oauth_token_secret", e.oauth_token_secret), i.focus(), i.location.assign("https://www.zotero.org/oauth/authorize?oauth_token=" + e.oauth_token + "&write_access=1&library_access=1") }, error: function (e) { r.get("flashMessages").alert("Error getting Zotero share"), r.get("errorReporter").reportFailedArticleShare(e) } })
        }, token: function (e, n) {
            var r = this
            e.oauth_token = localStorage.getItem("zotero_temp_oauth_token"), e.oauth_token_secret = localStorage.getItem("zotero_temp_oauth_token_secret"), Ember.$.ajax({ url: t.default.apiHost + "/oauth/zotero/access-token?" + Ember.$.param(e), type: "POST", success: function (e) { localStorage.setItem("zotero_oauth_token_secret", e.oauth_token_secret), localStorage.setItem("zotero_user_id", e.userID), n() }, error: function (e) { r.get("flashMessages").alert("Error getting Zotero token"), r.get("errorReporter").reportFailedArticleShare(e) } })
        }, getSaveParams: function () { return { userId: localStorage.getItem("zotero_user_id"), secretToken: localStorage.getItem("zotero_oauth_token_secret") } }, hasCredentials: function () {
            var e = localStorage.getItem("zotero_user_id"), t = localStorage.getItem("zotero_oauth_token_secret")
            return e && t
        }
    })
}), define("browzine-web/services/flash-messages", ["exports", "ember-cli-flash/services/flash-messages"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/services/header", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Service.extend({ subject: { value: "", template: !1 }, title: { value: "", template: !1 } }) }), define("browzine-web/services/i18n", ["exports"], function (e) {
    function t(e) {
        return function () {
            var t = e.apply(this, arguments)
            return new Promise(function (e, n) {
                return function r(i, a) {
                    try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                    e(o)
                }("next")
            })
        }
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Service.extend({
        intl: Ember.inject.service(), applicationSession: Ember.inject.service(), store: Ember.inject.service(), setLocale: function (e) { this.get("intl").setLocale(e), localStorage.setItem("locale", JSON.stringify(e)) }, deleteLocale: function () { localStorage.removeItem("locale"), this.determineAndSetLocale() }, localeIsSupported: function (e, t) {
            if (!e) return { supported: !1 }
            if (t) {
                var n = (t.get("languagesSupported") || "").split(",")
                if (n.any(function (t) { return t.toLowerCase() === e.toLowerCase() })) return { supported: !0, supportedLocale: e.toLowerCase() }
                var r = !0, i = !1, a = void 0
                try {
                    for (var s, o = n[Symbol.iterator](); !(r = (s = o.next()).done); r = !0) {
                        var l = s.value
                        if (l.split("-")[0].toLowerCase() === e.split("-")[0].toLowerCase()) return { supported: !0, supportedLocale: l }
                    }
                } catch (b) { i = !0, a = b } finally { try { !r && o.return && o.return() } finally { if (i) throw a } }
            } if (!t) {
                var u = ["en-us", "fr-fr", "ja"], c = u.includes(e), d = e.substring(0, 2).toLowerCase(), m = u.filter(function (e) { return e.startsWith(d) })[0]
                if (c) return { supported: !0, supportedLocale: e.toLowerCase() }
                if (m) return { supported: !0, supportedLocale: m }
            } return { supported: !1 }
        }, reloadLibrary: function () {
            var e = t(regeneratorRuntime.mark(function e(t) {
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: if (t) {
                            e.next = 2
                            break
                        } return e.abrupt("return")
                        case 2: return e.next = 4, this.get("store").findRecord("library", t.id, { reload: !0 })
                        case 4: case "end": return e.stop()
                    }
                }, e, this)
            }))
            return function (t) { return e.apply(this, arguments) }
        }(), determineAndSetLocale: function () {
            var e = t(regeneratorRuntime.mark(function e(t) {
                var n, r, i, a, s, o, l, u, c, d
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: if (n = this.get("intl"), r = n.get("primaryLocale"), i = this.get("applicationSession").get("localeOverride"), a = this.localeIsSupported(i, t), s = a.supported, o = a.supportedLocale, i && !s && this.get("applicationSession").set("localeOverride", void 0), !i || !s) {
                            e.next = 12
                            break
                        } if (r == o) {
                            e.next = 10
                            break
                        } return n.setLocale(o), e.next = 10, this.reloadLibrary(t)
                        case 10: e.next = 46
                            break
                        case 12: if (l = window.testLanguage || navigator.language || navigator.userLanguage, u = this.localeIsSupported(l, t), c = u.supported, d = u.supportedLocale, !c) {
                            e.next = 21
                            break
                        } if (r == d) {
                            e.next = 19
                            break
                        } return n.setLocale(d), e.next = 19, this.reloadLibrary(t)
                        case 19: e.next = 46
                            break
                        case 21: if (!this.localeIsSupported("en-us", t)) {
                            e.next = 28
                            break
                        } if ("en-us" == r) {
                            e.next = 26
                            break
                        } return n.setLocale("en-us"), e.next = 26, this.reloadLibrary(t)
                        case 26: e.next = 46
                            break
                        case 28: if (!this.localeIsSupported("fr-fr", t)) {
                            e.next = 35
                            break
                        } if ("fr-fr" == r) {
                            e.next = 33
                            break
                        } return n.setLocale("fr-fr"), e.next = 33, this.reloadLibrary(t)
                        case 33: e.next = 46
                            break
                        case 35: if (!this.localeIsSupported("ja", t)) {
                            e.next = 42
                            break
                        } if ("ja" == r) {
                            e.next = 40
                            break
                        } return n.setLocale("ja"), e.next = 40, this.reloadLibrary(t)
                        case 40: e.next = 46
                            break
                        case 42: if ("en-us" == r) {
                            e.next = 46
                            break
                        } return n.setLocale("en-us"), e.next = 46, this.reloadLibrary(t)
                        case 46: case "end": return e.stop()
                    }
                }, e, this)
            }))
            return function (t) { return e.apply(this, arguments) }
        }()
    })
}), define("browzine-web/services/intl", ["exports", "ember-intl/services/intl"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/services/json-validator", ["exports", "ajv", "ajv/lib/refs/json-schema-draft-04.json"], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 })
    var r = new t.default({ schemaId: "id" })
    r.addMetaSchema(n), e.default = Ember.Service.extend({
        validate: function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = r.validate(t, e)
            return n || console.log("Encountered an invalid document!", r.errors, e, t), { isValid: n, errors: r.errors }
        }
    })
}), define("browzine-web/services/media", ["exports", "ember-responsive/media"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default }), define("browzine-web/services/moment", ["exports", "ember-moment/services/moment", "browzine-web/config/environment"], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 })
    var r = Ember.get
    e.default = t.default.extend({ defaultFormat: r(n.default, "moment.outputFormat") })
}), define("browzine-web/services/my-articles", ["exports", "uuid", "npm:browzine_schema_hub/couchDB/collection", "lodash.foreach", "lodash.keyby", "lodash.omit"], function (e, t, n, r, i, a) {
    function s(e) {
        return function () {
            var t = e.apply(this, arguments)
            return new Promise(function (e, n) {
                return function r(i, a) {
                    try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                    e(o)
                }("next")
            })
        }
    } Object.defineProperty(e, "__esModule", { value: !0 })
    var o = { id: "collection-general", name: "General Collection" }
    e.default = Ember.Service.extend({
        analytics: Ember.inject.service(), auth: Ember.inject.service(), applicationSession: Ember.inject.service(), store: Ember.inject.service(), sync: Ember.inject.service(), jsonValidator: Ember.inject.service(), flashMessages: Ember.inject.service(), errorReporter: Ember.inject.service(), intl: Ember.inject.service(), libraryIsSubscribed: Ember.computed.not("library.noPersonalization"), isAvailable: Ember.computed.and("applicationSession.userIsLoggedIn", "libraryIsSubscribed"), isSyncing: !1, isNotSyncing: Ember.computed.not("isSyncing"), database: Ember.computed.alias("sync.database"), addToMyArticles: null, loadCollections: function () {
            var e = this.get("sync.collectionDataPromise")
            return e ? e.then(function (e) { return e }) : (console.log("Expected a promise from sync.CollectionDataPromise but got nothing!"), Ember.RSVP.resolve())
        }, populateCollectionData: function (e) {
            var t = this
            return Ember.RSVP.resolve().then(function () {
                var n = t.get("store")
                if (!e.length) {
                    var r = n.createRecord("collection", o)
                    return t.saveCollection(r)
                } e.forEach(function (e) { t.createCollectionFromDocument(e) })
            })
        }, createCollectionFromDocument: function (e) {
            if (!e._deleted) {
                var t = this.get("store"), n = (0, a.default)(e, ["_id", "items"])
                n.id = e._id, n.rawDoc = e
                var r = t.createRecord("collection", n)
                e.items.forEach(function (e) {
                    var i = (0, a.default)(e, ["_id"])
                    i.id = n.id + "-" + i.itemType + "-" + i.itemId, i.rawDoc = e
                    var s = t.createRecord("collectionItem", i)
                    r.get("items").pushObject(s)
                })
            }
        }, processCollectionChange: function (e) {
            var t = this.get("store"), n = e._id, s = t.peekRecord("collection", n), o = this.get("collectionItemChangeListener"), l = this.get("collectionRemovedListener")
            if (s) {
                if (e._deleted) return s.get("isDeleted") || s.deleteRecord(), o(s), void l()
                var u = (0, a.default)(e, ["_id", "items", "schema"]); (0, r.default)(u, function (e, t) { s.set(t, e) })
                var c = (0, i.default)(e.items, function (e) { return n + "-" + e.itemType + "-" + e.itemId }), d = Object.keys(c), m = s.get("items"), b = [], f = !1
                m.forEach(function (e) {
                    var t = e.get("id")
                    d.indexOf(t) > -1 ? delete c[t] : (b.push(e), f = !0)
                }), b.forEach(function (e) { m.removeObject(e) }), (0, r.default)(c, function (e) {
                    var n = t.createRecord("collectionItem", e)
                    m.pushObject(n), f = !0
                }), f && o && o(s)
            } else this.createCollectionFromDocument(e)
        }, onCollectionItemChange: function (e) { this.set("collectionItemChangeListener", e) }, onCollectionRemoved: function (e) { this.set("collectionRemovedListener", e) }, saveCollection: function (e, t) {
            var r = this, i = this.get("database"), a = e.get("syncData")
            a.owner = ""
            var s = this.get("jsonValidator").validate(a, n.default)
            if (s.isValid) {
                this.get("sync").clearLoggedRequests()
                var o = void 0
                return o = "removeCollection" !== t ? i.put(a) : i.remove(a), this.set("syncPromise", o), this.set("isSyncing", !0), o.then(function (n) {
                    Ember.run(function () {
                        if ("removeCollection" !== t && e.set("_rev", n.rev), r.set("isSyncing", !1), "collection-general" !== a._id || a._rev) switch (t) {
                            case "addArticle": r.get("flashMessages").success(r.get("intl").t("my_articles.article_saved_flash_message", { collectionName: e.get("name") }))
                                break
                            case "removeArticle": r.get("flashMessages").success(r.get("intl").t("my_articles.article_removed_flash_message", { collectionName: e.get("name") }))
                                break
                            case "removeCollection": r.get("flashMessages").success(r.get("intl").t("my_articles.collection_removed_flash_message", { collectionName: e.get("name") }))
                                break
                            default: r.get("flashMessages").success(r.get("intl").t("my_articles.collection_saved_flash_message", { collectionName: e.get("name") }))
                        }
                    })
                }).catch(function (e) {
                    Ember.run(function () {
                        console.log("Error saving collection.", { e: e }), r.get("flashMessages").alert(r.get("intl").t("my_articles.error_saving_collection_message")), r.set("isSyncing", !1)
                        var t = r.get("previousSyncData")
                        r.get("errorReporter").reportMyArticlesUpdateError(e, r.get("sync").getLoggedRequests(), t, a)
                    })
                })
            } console.log("Error saving collection.  Collection failed json schema validation"), this.get("flashMessages").alert(this.get("intl").t("my_articles.error_saving_collection_message")), this.get("errorReporter").reportMyArticlesValidationError(a, s.errors)
        }, createCollection: function () {
            var e = s(regeneratorRuntime.mark(function e(n) {
                var r, i, a = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: if (r = this.get("store"), n.id || (n.id = "collection-" + (0, t.v4)()), i = r.createRecord("collection", n), !a) {
                            e.next = 8
                            break
                        } if ("collection-general" === i.get("id")) {
                            e.next = 7
                            break
                        } return e.next = 7, this.get("analytics").recordEvent({ category: "Collections", action: "Create", label: i.get("name"), value: 1 })
                        case 7: this.saveCollection(i)
                        case 8: return e.abrupt("return", i)
                        case 9: case "end": return e.stop()
                    }
                }, e, this)
            }))
            return function (t) { return e.apply(this, arguments) }
        }(), getArticleAssignments: function (e) {
            var t = this.get("store").peekAll("collection"), n = []
            return t.forEach(function (t) { t.get("items").forEach(function (r) { "article" === r.get("itemType") && r.get("itemId") === e && n.push(t.get("id")) }) }), n
        }, toggleArticleAssignments: function () {
            var e = s(regeneratorRuntime.mark(function e(t, n) {
                var r, i, a, s, o, l, u, c, d, m, b = this
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: if (r = this.get("store"), i = t.get("syncId"), a = t.get("id"), s = t.get("journal"), o = s.get("id"), l = s.get("title"), u = r.peekAll("collection"), c = [], d = [], m = [], u.forEach(function (e) {
                            var t = e.get("id"), r = e.get("items"), a = -1 !== n.indexOf(t), s = a
                            r.forEach(function (n) { n && "article" === n.get("itemType") && n.get("itemId") === i && (a ? s = !1 : (c.push(e), n.deleteRecord(), d.push(t))) }), s && (c.push(e), m.push(t), e.addItem({ syncId: i }))
                        }), !d.length) {
                            e.next = 17
                            break
                        } return e.next = 14, this.get("analytics").recordEvent({ category: "MyArticles", action: "ArticleRemoveFromCollection", label: l, value: i })
                        case 14: if (!t.get("retractionNoticeUrl")) {
                            e.next = 17
                            break
                        } return e.next = 17, this.get("analytics").recordEvent({ category: "RetractedArticleInteraction", action: "Unsaved", label: a, value: o })
                        case 17: if (!m.length) {
                            e.next = 23
                            break
                        } return e.next = 20, this.get("analytics").recordEvent({ category: "MyArticles", action: "ArticleSaveToSpecificCollection", label: l, value: i })
                        case 20: if (!t.get("retractionNoticeUrl")) {
                            e.next = 23
                            break
                        } return e.next = 23, this.get("analytics").recordEvent({ category: "RetractedArticleInteraction", action: "Saved", label: a, value: o })
                        case 23: c.forEach(function (e) {
                            var t = m.indexOf(e.get("id")) > -1 ? "addArticle" : "removeArticle"
                            b.saveCollection(e, t)
                        })
                        case 24: case "end": return e.stop()
                    }
                }, e, this)
            }))
            return function (t, n) { return e.apply(this, arguments) }
        }()
    })
}), define("browzine-web/services/my-bookshelf", ["exports", "browzine-web/models/my-journal", "browzine-web/models/my-bookshelf", "npm:browzine_schema_hub/couchDB/mybookshelf", "ember-intl"], function (e, t, n, r, i) {
    function a(e) {
        return function () {
            var t = e.apply(this, arguments)
            return new Promise(function (e, n) {
                return function r(i, a) {
                    try { var s = t[i](a), o = s.value } catch (l) { return void n(l) } if (!s.done) return Promise.resolve(o).then(function (e) { r("next", e) }, function (e) { r("throw", e) })
                    e(o)
                }("next")
            })
        }
    } Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Service.extend({
        auth: Ember.inject.service(), applicationSession: Ember.inject.service(), store: Ember.inject.service(), sync: Ember.inject.service(), jsonValidator: Ember.inject.service(), unreads: Ember.inject.service(), analytics: Ember.inject.service(), errorReporter: Ember.inject.service(), flashMessages: Ember.inject.service(), intl: Ember.inject.service(), libraryIsSubscribed: Ember.computed.not("library.noPersonalization"), isAvailable: Ember.computed.and("applicationSession.userIsLoggedIn", "libraryIsSubscribed"), isSyncing: !1, isNotSyncing: Ember.computed.not("isSyncing"), isProcessing: !1, dataIsValid: !1, hasUnreadArticles: Ember.computed.gt("bookshelves.unreadCount", 0), database: Ember.computed.alias("sync.database"), shelve: !1, loginRequired: !1, returnRoute: "", emptyBookcases: (0, i.intl)(function (e) { return { bookcases: [{ title: e.t("my_bookshelf.empty_bookshelf_bookcase_name", { bookcaseNumber: 1 }), bookshelves: [{ title: e.t("my_bookshelf.empty_bookshelf_bookshelf_name", { bookshelfNumber: 1 }), items: [] }, { title: e.t("my_bookshelf.empty_bookshelf_bookshelf_name", { bookshelfNumber: 2 }), items: [] }, { title: e.t("my_bookshelf.empty_bookshelf_bookshelf_name", { bookshelfNumber: 3 }), items: [] }, { title: e.t("my_bookshelf.empty_bookshelf_bookshelf_name", { bookshelfNumber: 4 }), items: [] }] }, { title: e.t("my_bookshelf.empty_bookshelf_bookcase_name", { bookcaseNumber: 2 }), bookshelves: [{ title: e.t("my_bookshelf.empty_bookshelf_bookshelf_name", { bookshelfNumber: 1 }), items: [] }, { title: e.t("my_bookshelf.empty_bookshelf_bookshelf_name", { bookshelfNumber: 2 }), items: [] }, { title: e.t("my_bookshelf.empty_bookshelf_bookshelf_name", { bookshelfNumber: 3 }), items: [] }, { title: e.t("my_bookshelf.empty_bookshelf_bookshelf_name", { bookshelfNumber: 4 }), items: [] }] }, { title: e.t("my_bookshelf.empty_bookshelf_bookcase_name", { bookcaseNumber: 3 }), bookshelves: [{ title: e.t("my_bookshelf.empty_bookshelf_bookshelf_name", { bookshelfNumber: 1 }), items: [] }, { title: e.t("my_bookshelf.empty_bookshelf_bookshelf_name", { bookshelfNumber: 2 }), items: [] }, { title: e.t("my_bookshelf.empty_bookshelf_bookshelf_name", { bookshelfNumber: 3 }), items: [] }, { title: e.t("my_bookshelf.empty_bookshelf_bookshelf_name", { bookshelfNumber: 4 }), items: [] }] }, { title: e.t("my_bookshelf.empty_bookshelf_bookcase_name", { bookcaseNumber: 4 }), bookshelves: [{ title: e.t("my_bookshelf.empty_bookshelf_bookshelf_name", { bookshelfNumber: 1 }), items: [] }, { title: e.t("my_bookshelf.empty_bookshelf_bookshelf_name", { bookshelfNumber: 2 }), items: [] }, { title: e.t("my_bookshelf.empty_bookshelf_bookshelf_name", { bookshelfNumber: 3 }), items: [] }, { title: e.t("my_bookshelf.empty_bookshelf_bookshelf_name", { bookshelfNumber: 4 }), items: [] }] }], type: "my_bookshelf" } }), save: function () {
            var e = this
            if (!this.get("isSyncing")) {
                var t = this.get("database"), n = this.get("bookshelves.syncData")
                n._rev = this.get("rev")
                var i = this.get("jsonValidator").validate(n, r.default)
                if (!i.isValid) return this.get("flashMessages").alert(this.get("intl").t("my_bookshelf.error_saving_bookshelf_error_message")), this.get("errorReporter").reportMyBookshelfValidationError(n, i.errors), Ember.RSVP.reject(new Error("bookshelf data failed to validate"))
                this.get("sync").clearLoggedRequests()
                var a = t.put(n)
                return this.set("syncPromise", a), this.set("isSyncing", !0), a.then(function (t) { Ember.run(function () { e.set("rev", t.rev), e.set("isSyncing", !1), e.set("isProcessing", !1) }) }).catch(function (t) {
                    return new Ember.RSVP.Promise(function (r, i) {
                        Ember.run(function () {
                            var r = e.get("flashMessages")
                            console.log("Error saving My Bookshelf", t), "unknown_error" === t.name ? r.alert(e.get("intl").t("my_bookshelf.saving_bookshelf_unknown_error_error_message")) : r.alert(e.get("intl").t("my_bookshelf.error_saving_bookshelf_error_message")), e.set("isSyncing", !1), e.set("isProcessing", !1)
                            var a = e.get("previousSyncData")
                            return e.get("errorReporter").reportMyBookshelfUpdateError(t, e.get("sync").getLoggedRequests(), a, n), e.adaptModel(a), i(t)
                        })
                    })
                })
            }
        }, model: (0, i.intl)("applicationSession.selectedLibrary", "sync.database", function () {
            var e = this, t = function () { return Ember.RSVP.Promise.resolve(this.adaptModel(this.get("emptyBookcases"))) }.bind(this)
            return this.get("isAvailable") ? this.get("sync").ensureDataLoaded().then(function () {
                var n = e.get("sync.myBookshelfDataPromise")
                return n ? n.then(function (t) { return e.adaptModel(t) }).catch(function () { return Ember.RSVP.Promise.resolve(e.adaptModel(e.get("emptyBookcases"))) }) : (console.log("Yikes!  Something is really wrong.  The promise that's supposed to resolve to the my bookshelf data is missing!"), t())
            }) : t()
        }), adaptModel: function () {
            var e = this, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
            this.set("rev", i._rev), this.set("previousSyncData", i)
            var a = this.get("jsonValidator").validate(i, r.default)
            a.isValid ? this.set("dataIsValid", !0) : (this.set("dataIsValid", !1), 0 === Object.keys(i).length || (this.get("flashMessages").alert(this.get("intl").t("my_bookshelf.error_reading_bookshelf_error_message_1")), this.get("errorReporter").reportMyBookshelfReadValidationError(i, a.errors)))
            Ember.isEmpty(this.get("bookshelves")) && this.set("bookshelves", Ember.getOwner(this).lookup("model:my-bookshelves"))
            var s = this.get("library"), o = this.get("bookshelves.bookcases")
            i.type && this.set("bookshelves.type", i.type), i.$schema && this.set("bookshelves.schema", i.$schema)
            try { this._padWithEmptyObjects(i.bookcases).forEach(function (r, i) { o.objectAt(i).setProperties({ title: r.title || e.get("intl").t("my_bookshelf.empty_bookshelf_bookcase_name", { bookcaseNumber: i + 1 }), bookshelves: e._padWithEmptyObjects(r.bookshelves).map(function (r, i) { return n.default.create({ container: Ember.getOwner(e), title: r.title || e.get("intl").t("my_bookshelf.empty_bookshelf_bookshelf_name", { bookshelfNumber: i + 1 }), journals: (r.items || []).map(function (n) { return n.library = s, t.default.create({ container: Ember.getOwner(e), library: s, syncData: n, unread: n.unreadArticles }) }) }) }) }) }) } catch (l) { console.log("Error creating My Bookshelves: " + l, l.stack), this.get("flashMessages").alert(this.get("intl").t("my_bookshelf.error_reading_bookshelf_error_message_2")), this.get("errorReporter").reportMyBookshelfParseError(l) } return this.get("bookshelves")
        }, addJournal: function () {
            var e = a(regeneratorRuntime.mark(function e(n) {
                var r, i, s = this
                return regeneratorRuntime.wrap(function (e) {
                    for (; ;)switch (e.prev = e.next) {
                        case 0: if (!this.get("bookshelves").get("isFull")) {
                            e.next = 7
                            break
                        } return this.get("flashMessages").alert(this.get("intl").t("my_bookshelf.full_bookshelf_error_message")), e.next = 5, this.get("analytics").recordEvent({ category: "MyBookshelf", action: "Journal_Add_But_Full_Bookshelf", label: n.get("title"), value: n.get("id") })
                        case 5: e.next = 12
                            break
                        case 7: return r = Ember.RSVP.Promise.resolve(n), i = t.default.create({ container: Ember.getOwner(this), library: this.get("library"), promise: r }), this.get("bookshelves").addJournal(i), e.next = 12, r.then(function () { return s.save() }).then(a(regeneratorRuntime.mark(function e() {
                            var t, r
                            return regeneratorRuntime.wrap(function (e) {
                                for (; ;)switch (e.prev = e.next) {
                                    case 0: return s.get("flashMessages").success(s.get("intl").t("my_bookshelf.journal_added_flash_message")), t = s.get("shelve"), r = !0 === t ? "Add_To_My_Bookshelf_When_Logged_Out" : "Add_Journal_to_MyBookshelf", s.set("shelve", !1), e.next = 6, s.get("analytics").recordEvent({ category: "MyBookshelf", action: r, label: n.get("title"), value: n.get("id") })
                                    case 6: case "end": return e.stop()
                                }
                            }, e, s)
                        }))).catch(function () { })
                        case 12: case "end": return e.stop()
                    }
                }, e, this)
            }))
            return function (t) { return e.apply(this, arguments) }
        }(), _padWithEmptyObjects: function (e) {
            for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 4, n = Ember.A(e || []); n.length < t;)n.push({})
            return n
        }
    })
}), define("browzine-web/services/notifications", ["exports", "fetch", "browzine-web/config/environment"], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 })
    var r = "test" === n.default.environment
    e.default = Ember.Service.extend({
        store: Ember.inject.service(), init: function () { this._super.apply(this, arguments), this.set("articleJournalTitles", []), this._setPermissionGranted() }, requestPermission: function () {
            var e = this
            window.Notification && "default" === Notification.permission && Notification.requestPermission(function () { e._setPermissionGranted() })
        }, isSupported: Ember.computed(function () { return window.SharedWorker }), canBeRequested: Ember.computed("isSupported", "permissionGranted", "permissionDenied", function () { return this.get("isSupported") && !this.get("permissionGranted") && !this.get("permissionDenied") }), add: function (e) {
            var t = this, r = e.get("journalId")
            r && this.get("worker") && this.get("store").findRecord("journal", r).then(function (r) { t.get("worker").port.postMessage({ syncId: e.get("id"), journalTitle: r.get("title"), journalCoverURL: r.get("coverURL"), test: "test" === n.default.environment }) })
        }, _setPermissionGranted: function () {
            var e = window.Notification && "granted" === Notification.permission, t = window.Notification && "denied" === Notification.permission
            this.set("permissionGranted", e || r), this.set("permissionDenied", t), this.get("permissionGranted") && this._fetchOrCreateWorker()
        }, _fetchOrCreateWorker: function () {
            var e = this, n = localStorage.getItem("workerBlobURL")
            n && !r ? (console.log("Blob URL stored, checking…"), (0, t.default)(n).then(function (t) { 404 === t.status ? (console.log("Blob is not valid, fetching another"), e._fetchWorker()) : (console.log("Blob seems valid, creating worker"), e._createWorkerFromBlobURL(n)) })) : this._fetchWorker()
        }, _fetchWorker: function () {
            var e = this
            this.set("workerPromise", new Ember.RSVP.Promise(function (n) { (0, t.default)("//browzine-app.thirdiron.com/assets/notifier-50044152970813bdee3267171d23a759.js").then(function (e) { return e.blob() }).then(function (e) { return URL.createObjectURL(e) }).then(function (t) { n(e._createWorkerFromBlobURL(t)) }) }))
        }, _createWorkerFromBlobURL: function (e) {
            localStorage.setItem("workerBlobURL", e)
            var t = new SharedWorker(e)
            return this.set("worker", t), r && this.set("notificationPromise", new Ember.RSVP.Promise(function (e) { t.port.onmessage = function (t) { e(t.data) } })), t
        }
    })
}), define("browzine-web/services/permissions", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Service.extend({
        applicationSession: Ember.inject.service(), hasPermission: function (e, t) {
            var n = this.get("applicationSession").get("loggedInUser")
            if (!n) return !1
            var r = n.permissionGrants
            return !!r && (t ? e.every(function (e) { return r.some(function (n) { return n.permissionCode === e && ("all" === n.libraryScope || n.libraryScope === t) }) }) : e.every(function (e) { return r.some(function (t) { return t.permissionCode === e }) }))
        }
    })
}), define("browzine-web/services/scroll-activity", ["exports", "ember-user-activity/services/scroll-activity"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/services/sorting", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Service.extend({ sortCollections: function (e, t) { return "collection-general" === e.get("id") ? -1 : "collection-general" === t.get("id") ? 1 : e.get("name").toUpperCase() < t.get("name").toUpperCase() ? -1 : 1 } }) }), define("browzine-web/services/sync", ["exports", "browzine-web/config/environment"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 })
    var n = function () {
        return function (e, t) {
            if (Array.isArray(e)) return e
            if (Symbol.iterator in Object(e)) return function (e, t) {
                var n = [], r = !0, i = !1, a = void 0
                try { for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0); } catch (l) { i = !0, a = l } finally { try { !r && o.return && o.return() } finally { if (i) throw a } } return n
            }(e, t)
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }()
    e.default = Ember.Service.extend({
        lastUnreadUpdate: Date.now(), store: Ember.inject.service(), applicationSession: Ember.inject.service(), myBookshelf: Ember.inject.service(), myArticles: Ember.inject.service(), unreads: Ember.inject.service(), initialCollectionLoadComplete: !1, init: function () {
            var e = this
            this._super.apply(this, arguments), this.get("database"), this._logPouchDBRequests(), Ember.testing && (this._loadingQueue = 0, Ember.Test.registerWaiter(function () { return e._loadingQueue <= 0 }))
        }, ensureDataLoaded: function () {
            var e = this
            if (this.get("isLoaded")) return Ember.RSVP.resolve()
            if (this.get("isLoading")) return this.get("dataLoadingPromise")
            var t = new Ember.RSVP.Promise(function (t, n) {
                var r = function (e) { return this.set("isLoaded", !0), this.set("isLoading", !1), t(e) }.bind(e), i = e.get("database"), a = e.get("store")
                return a.unloadAll("collection"), a.unloadAll("collectionItem"), i ? e._populateTestData(i).then(function () { return e._fetchMinimumData(i) }).then(function (e) { return r(e) }).catch(function (t) { return e.get("isDestroyed") || e.get("isDestroying") || e.set("isLoading", !1), n(t) }) : (e.get("myBookshelfDataPromise"), e.get("myBookshelfDataReject")(new Error("Can't load bookshelf because database property is somehow empty")), e.get("collectionDataPromise"), e.get("collectionDataReject")(new Error("Can't load article collection because database property is somehow empty")), r())
            })
            return this.set("dataLoadingPromise", t), this.set("isLoading", !0), t.then(function (t) { return e.subscribeToChanges(), t })
        }, subscribeToChanges: function () {
            var e = this.get("database")
            if (e) return this._subscribeToChanges(e)
        }, myBookshelfDataPromise: Ember.computed("database", function () {
            var e = this
            return new Ember.RSVP.Promise(function (t, n) { e.get("isDestroyed") || e.get("isDestroying") || (e.set("myBookshelfDataResolve", t), e.set("myBookshelfDataReject", n)) })
        }), collectionDataPromise: Ember.computed("database", function () {
            var e = this
            return new Ember.RSVP.Promise(function (t, n) { e.get("isDestroyed") || e.get("isDestroying") || (e.set("collectionDataResolve", t), e.set("collectionDataReject", n)) })
        }), getMyBookshelfData: function () { return this.get("myBookshelfDataPromise") }, getCollectionData: function () { return this.get("collectionDataPromise") }, database: Ember.computed("applicationSession.loggedInUser", function () {
            var e = this.get("applicationSession").get("loggedInUser")
            if (e) {
                var n = e.couchdbDatabaseLocation || t.default.couchDatabase
                if (!Ember.isEmpty(n)) return new PouchDB(n, t.default.couchOptions)
            }
        }), databaseDidChange: Ember.observer("database", function () {
            var e = this
            Ember.run.once(this, function () {
                e.set("isLoaded", !1), e.set("isLoading", !1)
                var t = e.get("changesFeedCanceller")
                t && t.cancel()
            })
        }), _TEST_HELPER_refreshStore: function () { this.notifyPropertyChange("database") }, _populateTestData: function (e) {
            var t = this
            return this._fixture ? (this._fixture.length || (this._fixture = [this._fixture]), new Ember.RSVP.Promise(function (n, r) { Ember.run.schedule("afterRender", t, function () { e.bulkDocs(t._fixture).then(function () { return n() }).catch(function (e) { return r(e) }) }) })) : Ember.RSVP.Promise.resolve(!0)
        }, getUnreadCounts: function () {
            var e = this
            if (this.get("isDestroyed") || !this.get("applicationSession").get("userIsLoggedIn")) return Ember.RSVP.resolve([])
            if (this.get("syncingUnreadCounts")) return this.set("syncingUnreadCountsInvalid", !0), Ember.RSVP.resolve([])
            this.set("syncingUnreadCounts", !0), this.set("syncingUnreadCountsInvalid", !1), Ember.testing && this._loadingQueue++
            var t = this.get("database"), n = this.get("unreads")
            return t.query("myBookshelf/unread-count", { group: !0, group_level: 2 }).then(function (t) { Ember.testing && e._loadingQueue--, e.set("syncingUnreadCounts", !1), e.get("syncingUnreadCountsInvalid") ? e.getUnreadCounts() : Ember.run(function () { n.processUnreadCounts(t) }) })
        }, _fetchMinimumData: function (e) {
            var t = this
            return new Ember.RSVP.Promise(function (r, i) {
                Ember.run.schedule("afterRender", t, function () {
                    t.getUnreadCounts().then(function () { return e.query("myBookshelf/bookshelf") }).then(function (r) {
                        var i = (r.rows[0] || {}).value
                        return i ? Ember.RSVP.all([t.fetchBookshelfJournals(i), e.query("myArticles/collections")]).then(function (e) {
                            var r = n(e, 2)[1]
                            return t.get("myBookshelfDataPromise"), t.get("myBookshelfDataResolve")(i), r
                        }) : (t.get("myBookshelfDataPromise"), t.get("myBookshelfDataReject")(), e.query("myArticles/collections"))
                    }).then(function (e) {
                        var n = e.rows.map(function (e) { return e.value })
                        t.get("myArticles").populateCollectionData(n).then(function () { return t.get("isDestroyed") || t.get("isDestroying") || (t.set("initialCollectionLoadComplete", !0), t.get("collectionDataPromise"), t.get("collectionDataResolve")(n)), r() })
                    }).catch(function (e) { return i(e) })
                })
            })
        }, fetchBookshelfJournals: function (e) {
            var t = this.get("store"), n = []
            if (e.bookcases.forEach(function (e) { e.bookshelves.forEach(function (e) { e.items.forEach(function (e) { e.journal && n.push(e.journal) }) }) }), n.length) {
                for (var r = 0, i = []; r <= n.length;) {
                    var a = n.slice(r, r + 100)
                    if (a.length > 0) {
                        var s = t.query("journal", { filter: { id: a.toString() } })
                        i.push(s)
                    } r += 100
                } return Ember.RSVP.all(i)
            } return Ember.RSVP.resolve(!0)
        }, fetchAllUnreads: function () {
            var e = this, t = this.get("database")
            return new Ember.RSVP.Promise(function (n) {
                Ember.run.schedule("actions", e, function () {
                    t.allDocs({ include_docs: !0 }).then(function (t) {
                        Ember.run(function () {
                            Ember.run.schedule("actions", e, function () {
                                t.rows.forEach(function (t) {
                                    var n = t.doc
                                    e._documentIsArticleStatus(n) && e.get("unreads").handleArticleStatusDocument(n, !0)
                                }), n(!0)
                            })
                        })
                    })
                })
            })
        }, getUnreadsForJournal: function (e) {
            var t = this, n = this.get("database")
            return n ? (Ember.testing && this._loadingQueue++, new Ember.RSVP.Promise(function (r) {
                Ember.run(function () {
                    Ember.run.schedule("afterRender", t, function () {
                        var i = { key: e }
                        n.query("myBookshelf/unreads-by-journal", i).then(function (e) {
                            var n = e.rows
                            Ember.run(function () { n.forEach(function (e) { t.get("unreads").handleArticleStatusDocument(e.value, !0) }), t.set("initialLoadComplete", !0) }), Ember.testing && t._loadingQueue--, r(n)
                        }).catch(function (e) { console.log("getUnreadsForJournal", { err: e }), t.set("initialLoadComplete", !0), r() })
                    })
                })
            })) : Ember.RSVP.resolve([])
        }, _reconnects: 0, _subscribeToChanges: function (e) {
            var t = this, n = this.get("latestChangeReceived"), r = n || "now", i = e.changes({ live: !0, include_docs: !0, since: r }).on("change", function (e) { Ember.testing || t.set("latestChangeReceived", e.seq), Ember.run(function () { t.get("isDestroyed") || t.set("_reconnects", 0), t._processChange(e) }) }).on("error", function (n) {
                Ember.run(function () {
                    console.log("Error in changes feed:", n)
                    var r = Math.min(1e3 * Math.pow(2, t.get("_reconnects")), 6e5)
                    console.log("Retrying subscription to changes in " + r + "…"), Ember.run.later(function () { t.get("isDestroyed") || (t.set("_reconnects", t.get("_reconnects") + 1), t._subscribeToChanges(e)) }, r)
                })
            })
            this.set("listeningForChanges", !0), Ember.testing || Ember.run.later(function () { i.cancel(), Ember.run.later(function () { t._subscribeToChanges(e) }, 1e4) }, 1e4), this.set("changesFeedCanceller", i)
        }, _processChange: function (e) {
            var t = e.doc
            this._documentIsMyBookshelf(t) ? this.get("isDestroyed") || this.get("myBookshelf").adaptModel(t) : this._documentIsArticleStatus(t) ? this.get("unreads").syncUnreadDocument(t) : this._documentIsCollection(t) && this.get("myArticles").processCollectionChange(t)
        }, _documentIsMyBookshelf: function (e) { return "my_bookshelf" === e._id }, _documentIsCollection: function () { return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {})._id.startsWith("collection") }, _documentIsArticleStatus: function () { return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {})._id.startsWith("article") }, _logPouchDBRequests: function () {
            var e = this
            e.set("loggedRequests", []), PouchDB.debug.log = function (t) {
                var r = t.split("%c"), i = n(r, 3), a = i[1], s = i[2]
                "pouchdb:http" === a.trim() && (console.log("want to store this request"), console.log(s), e.get("loggedRequests").push(s))
            }, PouchDB.debug.log.bind(PouchDB.debug)
        }, getLoggedRequests: function () { return this.get("loggedRequests") }, clearLoggedRequests: function () { this.set("loggedRequests", []) }
    })
}), define("browzine-web/services/text-measurer", ["exports", "ember-text-measurer/services/text-measurer"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/services/unified-event-handler", ["exports", "ember-singularity/services/unified-event-handler"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/services/unreads", ["exports", "lodash.foreach", "browzine-web/models/article-status-collection", "npm:browzine_schema_hub/couchDB/article", "moment"], function (e, t, n, r, i) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Service.extend(Ember.Evented, {
        myBookshelf: Ember.inject.service(), errorReporter: Ember.inject.service(), flashMessages: Ember.inject.service(), notifications: Ember.inject.service(), store: Ember.inject.service(), jsonValidator: Ember.inject.service(), sync: Ember.inject.service(), intl: Ember.inject.service(), database: Ember.computed.alias("myBookshelf.database"), init: function () { this._super.apply(this, arguments), this.set("articleStatusDocuments", {}), this.set("issueStatuses", {}), this.set("journalStatuses", {}), this.set("articlesInPressStatuses", {}), this.get("notifications") }, getStatusCollectionByTypeAndId: function (e, t, r) {
            var i = this.get(e + "Statuses"), a = i[t]
            return r && !a && (a = n.default.create({ type: e, id: t }), i[t] = a), a
        }, processUnreadCounts: function (e) {
            var n = this, r = e.rows, i = { _total: 0 }
            r.forEach(function (e) {
                var t = e.key, r = e.value, a = t[0], s = t[1]
                "articles-in-press" === s ? n.getStatusCollectionByTypeAndId("articlesInPress", a, !0).set("cachedCount", r) : n.getStatusCollectionByTypeAndId("issue", s, !0).set("cachedCount", r)
                i[a] = i[a] || { _total: 0 }, i[a]._total += r, i._total += r
            }), (0, t.default)(i, function (e, t) { n.getStatusCollectionByTypeAndId("journal", t, !0).set("cachedCount", e._total) })
        }, updateCounts: function (e) {
            var t = e.issueId, n = e.journalId, r = this.get("articlesInPressStatuses"), i = this.get("journalStatuses"), a = this.get("issueStatuses"), s = a[t], o = i[n]
            if ("articles-in-press" === t) {
                var l = r[n].cachedCount
                r[n].set("cachedCount", l + -1)
            } else if (s) {
                var u = a[t].cachedCount
                a[t].set("cachedCount", u + -1)
            } if (o) {
                var c = i[n].cachedCount
                i[n].set("cachedCount", c + -1)
            }
        }, syncUnreadDocument: function (e) {
            if (!this.get("isDestroyed")) {
                var t = this.get("sync"), n = this.get("journalStatuses"), r = this.get("articleStatusDocuments")[this._syncIdFromDocumentId(e._id)]
                if (!r || r.get("rev") !== e._rev) n[e.journal] && this.handleArticleStatusDocument(e), t.getUnreadCounts(), this.trigger("unreadSynced")
            }
        }, getArticleStatusBySyncId: function (e, t) {
            var n = this.get("articleStatusDocuments"), r = n[e]
            return r || (r = Ember.getOwner(this).resolveRegistration("model:article-status").create({ unreads: this, syncId: e, isNewSinceInitialLoad: !t }), n[e] = r), r
        }, handleArticleStatusDocument: function (e, t) {
            this.trigger("handlingStatusDoc")
            var n = this._syncIdFromDocumentId(e._id)
            if (n) {
                var i = this.get("jsonValidator").validate(e, r.default)
                e._deleted || i.isValid ? this._setArticleStatus(n, e, t) : this.get("errorReporter").reportArticleStatusReadValidationError(e, i.errors)
            }
        }, markArticleReadBySyncId: function (e, t) {
            var n = this.getArticleStatusBySyncId(e), r = { markedRead: !0 }
            n.get("canBeMarkedUnread") && (t && (r.viewedAt = (0, i.default)(new Date).format("YYYY-MM-DDTHH:mm:ssZ"), r.viewCount = (n.get("viewCount") || 0) + 1), this._updateArticleStatuses([e], r))
        }, filterUnreadArticleStatusSyncIds: function (e) {
            var n = this.get("articleStatusDocuments"), r = []
            return (0, t.default)(n, function (t) { t.get("isUnread") && e(t) && r.push(t.get("syncId")) }), r
        }, filterUnreadArticleStatusSyncIdsByIssue: function (e) { return this.filterUnreadArticleStatusSyncIds(function (t) { return t.get("issueId") === e }) }, filterUnreadArticleStatusSyncIdsByJournal: function (e) { return this.filterUnreadArticleStatusSyncIds(function (t) { return t.get("journalId") === e }) }, markIssueReadById: function (e) {
            var t = this.getIssueStatusById(e)
            if (t) {
                var n = t.get("id"), r = this.filterUnreadArticleStatusSyncIdsByIssue(n)
                this._updateArticleStatuses(r, { markedRead: !0 })
            }
        }, markArticlesInPressReadByJournalId: function (e) {
            var t = this.getArticlesInPressStatusById(e)
            if (t) {
                var n = t.get("id"), r = this.filterUnreadArticleStatusSyncIds(function (e) { return e.get("journalId") === n && "articles-in-press" === e.get("issueId") })
                this._updateArticleStatuses(r, { markedRead: !0 })
            }
        }, markIssuesReadByJournalId: function (e) {
            var t = this
            return this.get("sync").getUnreadsForJournal(e).then(function () {
                var n = t.getJournalStatusById(e)
                if (n) {
                    var r = n.get("id"), i = t.filterUnreadArticleStatusSyncIdsByJournal(r)
                    t._updateArticleStatuses(i, { markedRead: !0 }).then(function () { })
                }
            })
        }, markAllJournalsRead: function () {
            var e = this
            return this.get("sync").fetchAllUnreads().then(function () {
                var t = e.get("myBookshelf.bookshelves.journalIds").reduce(function (t, n) {
                    var r = e.getJournalStatusById(n)
                    if (r) {
                        var i = r.get("id"), a = e.filterUnreadArticleStatusSyncIdsByJournal(i)
                        return t.push.apply(t, function (e) {
                            if (Array.isArray(e)) {
                                for (var t = 0, n = Array(e.length); t < e.length; t++)n[t] = e[t]
                                return n
                            } return Array.from(e)
                        }(a)), t
                    } return t
                }, [])
                return e._updateArticleStatuses(t, { markedRead: !0 })
            })
        }, markArticleUnreadBySyncId: function (e) { this._updateArticleStatuses([e], { markedRead: void 0, viewCount: void 0, viewedAt: void 0 }) }, getIssueStatusById: function (e) { return this.getStatusCollectionByTypeAndId("issue", e, !0) }, getArticlesInPressStatusById: function (e) { return this.getStatusCollectionByTypeAndId("articlesInPress", e, !0) }, getJournalStatusById: function (e) { return this.getStatusCollectionByTypeAndId("journal", e, !0) }, _documentIsArticleInPress: function (e) { return e.issue.indexOf("articles-in-press") > -1 }, _syncIdFromDocumentId: function (e) {
            var t = e.match(/^article-(\d*)$/)
            if (t) return t[1]
        }, _setArticleStatus: function (e, t, n) {
            var r = t.issue, i = t.journal, a = this.getArticleStatusBySyncId(e, n)
            return a.get("issueId") !== r && (this._addArticleStatusToIssue(r, a), a.get("issueId") && this._removeArticleStatusFromIssue(a.get("issueId"), a)), a.get("journalId") !== i && (this._addArticleStatusToJournal(i, a), a.get("journalId") && this._removeArticleStatusFromJournal(a.get("journalId"), a)), this._documentIsArticleInPress(t) && (this._addArticleStatusToArticlesInPress(i, a), a.get("markedRead") && this._removeArticleStatusFromArticlesInPress(a.get("journalId"), a)), Ember.run(function () { a.set("syncData", t) }), a.get("isNewSinceInitialLoad") && this.get("notifications").add(a), a
        }, _updateArticleStatuses: function (e, t) {
            var n = this, i = this.get("database"), a = e.map(function (e) { return n.getArticleStatusBySyncId(e) }).filter(function (e) {
                var t = n.get("jsonValidator").validate(e.get("syncData"), r.default)
                if (t.isValid) return !0
                n.get("flashMessages").alert(n.get("intl").t("unreads.error_saving_error_message")), t.syncId = e.syncId, t.status = JSON.stringify(e.get("syncData")), console.log("ArticleStatus !validation.isValid (object)", e), console.log("ArticleStatus syncData", e.get("syncData")), n.get("errorReporter").reportArticleStatusValidationError(e.get("syncData"), t)
            })
            return a.forEach(function (e) { e.set("previousDocument", e.get("syncData")), e.setProperties(t), e.set("isSyncing", !0) }), i.bulkDocs(a.mapBy("syncData")).then(function (e) {
                Ember.run(function () {
                    e.forEach(function (e, t) {
                        var r = a[t]
                        if (r.set("isSyncing", !1), e.error) {
                            var i = r.get("previousDocument"), s = r.get("syncData")
                            console.log("Error saving article status document: " + e + "."), console.log("Previous document:", i), console.log("Failed document:", s), n.get("flashMessages").alert(n.get("intl").t("unreads.error_saving_error_message")), n.get("errorReporter").reportArticleStatusUpdateError(e.error, i, s), r.set("syncData", i, !0)
                        } else r.set("rev", e.rev)
                    })
                })
            })
        }, _addArticleStatusToArticlesInPress: function (e, t) { this.getArticlesInPressStatusById(e).addArticleStatus(t) }, _removeArticleStatusFromArticlesInPress: function (e, t) { this.getArticlesInPressStatusById(e).removeArticleStatus(t) }, _addArticleStatusToIssue: function (e, t) { this.getIssueStatusById(e).addArticleStatus(t) }, _removeArticleStatusFromIssue: function (e, t) { this.getIssueStatusById(e).removeArticleStatus(t) }, _addArticleStatusToJournal: function (e, t) { this.getJournalStatusById(e).addArticleStatus(t) }, _removeArticleStatusFromJournal: function (e, t) { this.getJournalStatusById(e).removeArticleStatus(t) }, _deleteAll: function () {
            var e = this.get("database")
            e.allDocs().then(function (t) { t.rows.forEach(function (t) { t.id.indexOf("article") > -1 && e.remove(t.id, t.value.rev) }) })
        }, _createForLoadedArticles: function () {
            var e = this.get("database")
            this.get("store").peekAll("article").forEach(function (t) { t.fixedBelongsToLoad("issue").then(function (n) { n.fixedBelongsToLoad("journal").then(function (r) { e.put({ _id: "article-" + t.get("syncId"), type: "article", journal: r.get("id"), issue: n.get("id"), metadataUpdated: (0, i.default)(new Date(2006, 4, 26)).format("YYYY-MM-DDTHH:mm:ssZ") }) }) }) })
        }
    })
}), define("browzine-web/services/user-activity", ["exports", "ember-user-activity/services/user-activity"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/services/user-agent", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Service.extend({
        isIOS: Ember.computed(function () { return navigator.userAgent.match(/(iPhone|iPod|iPad|iOS)/i) }), isSafari: Ember.computed(function () { return navigator.userAgent.match(/Safari/i) && !navigator.userAgent.match(/Chrome/i) && !navigator.userAgent.match(/CriOS/i) }), isChrome: Ember.computed(function () { return navigator.userAgent.match(/Chrome/i) || navigator.userAgent.match(/CriOS/i) }), safariVersion: Ember.computed(function () {
            var e = 0
            try {
                var t = navigator.appVersion.indexOf("Version/") + "Version/".length, n = navigator.appVersion.slice(t).split(" ")[0].split(".")[0]
                e = isNaN(Number(n)) ? 0 : Number(n)
            } catch (r) { console.log("Safari version unavailable:", r) } return e
        }), iOSVersion: Ember.computed(function () {
            var e = 0
            try {
                var t = navigator.appVersion.indexOf("iPhone OS") + "iPhone OS".length, n = navigator.appVersion.slice(t).trim().split(" ")[0].split("_")[0]
                if (0 === (e = isNaN(Number(n)) ? 0 : Number(n))) {
                    var r = navigator.appVersion.indexOf("iPad; CPU OS") + "iPad; CPU OS".length, i = navigator.appVersion.slice(r).trim().split(" ")[0].split("_")[0]
                    e = isNaN(Number(i)) ? 0 : Number(i)
                }
            } catch (a) { console.log("iOS version unavailable:", a) } return e
        }), isAndroid: Ember.computed(function () { return navigator.userAgent.match(/Android/i) }), isEdge: Ember.computed(function () { return navigator.userAgent.match(/Edge/i) }), isTest: !1, platform: Ember.computed(function () { return this.get("isIOS") ? "iOS" : this.get("isAndroid") ? "Android" : "BZ Web" })
    })
}), define("browzine-web/services/user-idle", ["exports", "ember-user-activity/services/user-idle"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = t.default.extend({ IDLE_TIMEOUT: 3e5 }) }), define("browzine-web/services/window-history", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Service.extend({ pushState: function (e, t, n) { window.history.pushState(e, t, n) } }) }), define("browzine-web/services/window-location", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Service.extend({ assign: function (e) { window.location.assign(e) } }) })
define("browzine-web/services/window-open", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.Service.extend({ open: function (e, t, n) { window.open(e, t, n) } })
}), define("browzine-web/templates/access-provided-by", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "ZPPNmvlO", block: '{"symbols":[],"statements":[[6,"div"],[9,"class","provided-by"],[7],[1,[25,"t",["library.header.access_provided_by"],null],false],[8],[0,"\\n"],[6,"div"],[9,"class","name library-name"],[7],[1,[20,["model","name"]],false],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/access-provided-by.hbs" } })
}), define("browzine-web/templates/application", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "ZoMfwHRp", block: '{"symbols":["flash","component","flash"],"statements":[[6,"aside"],[9,"class","route-announcer"],[7],[0,"\\n  "],[1,[18,"route-announcer"],false],[0,"\\n"],[8],[0,"\\n\\n"],[6,"div"],[10,"class",[26,[[20,["media","classNames"]]," ",[18,"localeClass"]]]],[7],[0,"\\n"],[1,[18,"outlet"],false],[0,"\\n\\n  "],[6,"div"],[9,"class","flash-messages"],[7],[0,"\\n"],[4,"each",[[20,["flashMessages","queue"]]],null,{"statements":[[4,"flash-message",null,[["flash"],[[19,1,[]]]],{"statements":[[4,"if",[[19,3,["componentName"]]],null,{"statements":[[0,"          "],[1,[25,"component",[[19,3,["componentName"]]],[["content"],[[19,3,["content"]]]]],false],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[19,3,["componentName"]]],null,{"statements":[[0,"            "],[1,[25,"component",[[19,3,["componentName"]]],null],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"            "],[1,[19,3,["message"]],false],[0,"\\n"]],"parameters":[]}]],"parameters":[]}]],"parameters":[2,3]},null]],"parameters":[1]},null],[0,"  "],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/application.hbs" } })
}), define("browzine-web/templates/article-full-text-file", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "0XIJX71P", block: '{"symbols":[],"statements":[[4,"if",[[25,"and",[[20,["article","vpnRequired"]],[25,"not",[[20,["article","openAccess"]]],null]],null]],null,{"statements":[[4,"centered-menu",null,[["showShadows"],[true]],{"statements":[[0,"    "],[1,[25,"article-loading-box",null,[["article","library","issue","journal","hasArticle","hasFullTextFile","shouldShowILL","loadingType"],[[20,["article"]],[20,["library"]],[20,["issue"]],[20,["journal"]],[20,["hasArticle"]],[20,["hasFullTextFile"]],[20,["shouldShowILL"]],[20,["loadingType"]]]]],false],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/article-full-text-file.hbs" } })
}), define("browzine-web/templates/article-wayf", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "jrgpG1BQ", block: '{"symbols":[],"statements":[[4,"splash-panel",null,null,{"statements":[[0,"  "],[6,"div"],[9,"class","wayf-container"],[7],[0,"\\n    "],[6,"div"],[9,"class","wayf-content-preview-box fullwidth"],[7],[0,"\\n"],[4,"content-preview-box",null,[["article","journal","issue"],[[20,["article"]],[20,["article","journal"]],[20,["article","issue"]]]],{"statements":[[0,"        "],[6,"span"],[9,"tabindex","0"],[9,"class","requested-title"],[7],[1,[25,"t",["untranslated.requested_article"],null],false],[8],[6,"br"],[7],[8],[0,"\\n"]],"parameters":[]},null],[0,"    "],[8],[0,"\\n    "],[6,"div"],[9,"class","border fullwidth"],[7],[8],[0,"\\n    "],[6,"div"],[9,"class","wayf-info-box"],[7],[0,"\\n      "],[6,"h1"],[9,"tabindex","0"],[9,"class","wayf-title"],[7],[1,[25,"t",["untranslated.wayf_heading"],null],false],[8],[0,"\\n      "],[6,"a"],[10,"href",[20,["article","permalink"]],null],[9,"class","wayf-info"],[7],[1,[25,"t",["untranslated.no_library_article_link_message"],null],false],[8],[0,"\\n    "],[8],[0,"\\n    "],[6,"div"],[9,"class","border"],[7],[8],[0,"\\n    "],[1,[25,"wayf-library-selector",null,[["libraries"],[[20,["libraries"]]]]],false],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/article-wayf.hbs" } })
}), define("browzine-web/templates/article", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "FStC10UK", block: '{"symbols":[],"statements":[[4,"centered-menu",null,[["showShadows"],[true]],{"statements":[[0,"  "],[1,[25,"article-loading-box",null,[["article","library","issue","journal","hasArticle","hasFullTextFile","shouldShowILL","loadingType"],[[20,["article"]],[20,["library"]],[20,["issue"]],[20,["journal"]],[20,["hasArticle"]],[20,["hasFullTextFile"]],[20,["shouldShowILL"]],[20,["loadingType"]]]]],false],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/article.hbs" } })
}), define("browzine-web/templates/auth/bps", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "1dt8Ed1q", block: '{"symbols":[],"statements":[[4,"splash-panel",null,[["hide-header"],[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]]],{"statements":[[0,"  "],[1,[25,"user-bps-auth",null,[["onAuthSuccess","check","showContinueButton","libraryId"],["sendDeviceCallback",[20,["model","check"]],[20,["model","showContinueButton"]],[20,["model","libraryId"]]]]],false],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/auth/bps.hbs" } })
}), define("browzine-web/templates/auth/login", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "B0/XK4/O", block: '{"symbols":[],"statements":[[4,"splash-panel",null,[["hide-header"],[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]]],{"statements":[[0,"  "],[1,[25,"user-login",null,[["onLoggedIn","showBpsMessage","loginRequired","returnRoute","deviceId","userToken"],["loginComplete",[20,["model","isBpsLibrary"]],[20,["model","loginRequired"]],[20,["model","returnRoute"]],[20,["model","deviceId"]],[20,["model","userToken"]]]]],false],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/auth/login.hbs" } })
}), define("browzine-web/templates/auth/reset", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "7J64uLP+", block: '{"symbols":[],"statements":[[4,"splash-panel",null,[["hide-header"],[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]]],{"statements":[[0,"  "],[1,[25,"reset-password",null,[["token","email","onLoggedIn","onUnknownUser"],[[20,["model","token"]],[20,["model","email"]],"goToCurrentLibrary","signUpUnknownUser"]]],false],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/auth/reset.hbs" } })
}), define("browzine-web/templates/auth/signup", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "P4QYKefD", block: '{"symbols":[],"statements":[[4,"splash-panel",null,[["hide-header"],[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]]],{"statements":[[0,"  "],[1,[25,"user-signup",null,[["onLoggedIn","email","addPassword","showBpsMessage","loginRequired","returnRoute","deviceId"],["loginComplete",[20,["model","email"]],[20,["model","addPassword"]],[20,["model","isBpsLibrary"]],[20,["model","loginRequired"]],[20,["model","returnRoute"]],[20,["model","deviceId"]]]]],false],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/auth/signup.hbs" } }) }), define("browzine-web/templates/confirm-email", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "wPQdzYwZ", block: '{"symbols":[],"statements":[[4,"splash-panel",null,null,{"statements":[[0,"  "],[6,"div"],[9,"class","auth-form-container"],[7],[0,"\\n    "],[6,"div"],[9,"class","auth-form"],[7],[0,"\\n"],[4,"if",[[20,["showBpsMessage"]]],null,{"statements":[[0,"        "],[6,"section"],[7],[0,"\\n          "],[6,"span"],[9,"class","confirm-message"],[7],[0,"\\n            "],[6,"p"],[7],[1,[25,"t",["auth.bps_confirm_email_message_1"],null],false],[8],[0,"\\n            "],[6,"p"],[7],[1,[25,"t",["auth.bps_confirm_email_message_2"],null],false],[8],[0,"\\n          "],[8],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[6,"section"],[7],[0,"\\n          "],[6,"span"],[9,"class","confirm-message"],[7],[1,[25,"t",["auth.confirm_email_message"],null],false],[8],[0,"\\n        "],[8],[0,"\\n        "],[6,"button"],[9,"class","button primary"],[3,"action",[[19,0,[]],"goToCurrentLibrary"]],[7],[1,[25,"t",["auth.confirm_email_continue"],null],false],[8],[0,"\\n"]],"parameters":[]}],[0,"    "],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/confirm-email.hbs" } }) }), define("browzine-web/templates/error", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "bLwmVFLE", block: '{"symbols":[],"statements":[[4,"if",[[20,["model","articleNotFound"]]],null,{"statements":[[0,"  "],[1,[18,"article-not-found-screen"],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"  "],[1,[25,"error-screen",null,[["error","retry"],[[20,["model"]],"retry"]]],false],[0,"\\n"]],"parameters":[]}]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/error.hbs" } }) }),
    define("browzine-web/templates/index", ["exports"], function (e) {
        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "C+Dfh3Xg", block: '{"symbols":[],"statements":[[4,"splash-panel",null,[["hide-header"],[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]]],{"statements":[[0,"  "],[1,[25,"intro-screen",null,[["selectOpenAccessLibrary"],["selectOpenAccessLibrary"]]],false],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/index.hbs" } })
    }), define("browzine-web/templates/issue-wayf", ["exports"], function (e) {
        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "GOujTQSE", block: '{"symbols":[],"statements":[[4,"splash-panel",null,null,{"statements":[[0,"  "],[6,"div"],[9,"class","wayf-container"],[7],[0,"\\n    "],[6,"div"],[9,"class","wayf-content-preview-box fullwidth"],[7],[0,"\\n"],[4,"content-preview-box",null,[["journal","issue"],[[20,["issue","journal"]],[20,["issue"]]]],{"statements":[[0,"        "],[6,"span"],[9,"tabindex","0"],[9,"class","requested-title"],[7],[1,[25,"t",["untranslated.requested_issue"],null],false],[8],[6,"br"],[7],[8],[0,"\\n"]],"parameters":[]},null],[0,"    "],[8],[0,"\\n    "],[6,"div"],[9,"class","border fullwidth"],[7],[8],[0,"\\n    "],[6,"div"],[9,"class","wayf-info-box"],[7],[0,"\\n      "],[6,"h1"],[9,"tabindex","0"],[9,"class","wayf-title"],[7],[1,[25,"t",["untranslated.login_to_library_for_issue_message"],null],false],[8],[0,"\\n    "],[8],[0,"\\n    "],[6,"div"],[9,"class","border"],[7],[8],[0,"\\n    "],[1,[25,"wayf-library-selector",null,[["libraries"],[[20,["libraries"]]]]],false],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/issue-wayf.hbs" } })
    }), define("browzine-web/templates/journal-content-navigation", ["exports"], function (e) {
        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "4k2peuwp", block: '{"symbols":[],"statements":[[1,[25,"journal-content-navigation",null,[["issueNavigationState","currentlyDisplayedContent","journal","journalIsOnMyBookshelf"],[[20,["issueNavigationState"]],[20,["model"]],[20,["journal"]],[20,["journalIsOnMyBookshelf"]]]]],false],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/journal-content-navigation.hbs" } })
    }), define("browzine-web/templates/libraries", ["exports"], function (e) {
        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "hVZgkRn1", block: '{"symbols":[],"statements":[[4,"splash-panel",null,null,{"statements":[[0,"  "],[1,[25,"library-list",null,[["libraries","viewLibrary","selecting","selectedLibrary","ipRangeError"],[[20,["libraries"]],"viewLibrary",[20,["selectingLibrary"]],[20,["selectedLibrary"]],[20,["ipRangeError"]]]]],false],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/libraries.hbs" } })
    }), define("browzine-web/templates/libraries/images", ["exports"], function (e) {
        Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "lLH32Q9H", block: '{"symbols":["library"],"statements":[[6,"div"],[9,"id","pattern"],[9,"class","pattern"],[7],[0,"\\n  "],[6,"div"],[9,"id","library-list-image-box"],[7],[0,"\\n"],[4,"each",[[20,["model"]]],null,{"statements":[[0,"    "],[6,"figure"],[7],[0,"\\n      "],[1,[25,"library-subject-header",null,[["for"],[[19,1,[]]]]],false],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[1]},null],[0,"  "],[8],[0,"\\n"],[8]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/libraries/images.hbs" } })
    }), define("browzine-web/templates/library", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "Uw8aBTkw", block: '{"symbols":[],"statements":[[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[0,"  "],[6,"input"],[10,"aria-label",[25,"t",["accessibility.toggle_menu"],null],null],[9,"type","checkbox"],[9,"id","main-nav-check"],[3,"action",[[19,0,[]],"toggleMenu"]],[7],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[6,"div"],[9,"class","canvas"],[7],[0,"\\n"],[4,"if",[[25,"not",[[20,["disableMenu"]]],null]],null,{"statements":[[0,"    "],[6,"nav"],[9,"class","screen-header"],[7],[0,"\\n      "],[1,[18,"skip-navigation-link"],false],[0,"\\n\\n"],[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[0,"        "],[6,"ul"],[9,"class","mobile-header"],[7],[0,"\\n            "],[6,"li"],[7],[6,"label"],[9,"id","menu"],[9,"tabindex","0"],[9,"for","main-nav-check"],[9,"class","toggle icon fa fa-bars tabindex"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","toggleMenuOnEnter"],null],null],[10,"alt",[18,"hamburgerTitle"],null],[10,"title",[18,"hamburgerTitle"],null],[7],[6,"span"],[7],[0,"."],[8],[8],[8],[0,"\\n            "],[6,"li"],[9,"class","details"],[9,"tabindex","0"],[10,"aria-label",[26,[[18,"headerSubject"]," ",[18,"headerTitle"]]]],[7],[6,"span"],[9,"class","subject"],[7],[1,[18,"headerSubject"],false],[8],[0," "],[6,"span"],[9,"class","title"],[7],[1,[18,"headerTitle"],false],[8],[8],[0,"\\n            "],[6,"li"],[7],[6,"span"],[9,"tabindex","0"],[10,"class",[26,["icon fa fa-search search toggle ",[25,"if",[[20,["searchVisible"]],"active"],null]," tabindex"]]],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","toggleSearch"],null],null],[10,"alt",[18,"searchTitle"],null],[10,"title",[18,"searchTitle"],null],[3,"action",[[19,0,[]],"toggleSearch"]],[7],[8],[8],[0,"\\n        "],[8],[0,"\\n\\n        "],[6,"ul"],[9,"class","responsive-menu links"],[7],[0,"\\n          "],[6,"li"],[10,"class",[26,["library-home-link library-home ",[18,"libraryActiveOverride"]]]],[3,"action",[[19,0,[]],"toggleMenu"]],[7],[0,"\\n"],[4,"link-to",["library",[20,["model"]]],null,{"statements":[[0,"              "],[1,[25,"t",["library.header.browzine_library"],null],false],[0,"\\n"]],"parameters":[]},null],[0,"          "],[8],[0,"\\n\\n"],[4,"unless",[[20,["noPersonalizationLibrary"]]],null,{"statements":[[0,"            "],[6,"li"],[9,"class","my-bookshelf-link"],[3,"action",[[19,0,[]],"toggleMenu"]],[7],[0,"\\n"],[4,"link-to",["my-bookshelf"],null,{"statements":[[0,"                "],[1,[25,"t",["library.header.my_bookshelf"],null],false],[0,"\\n"],[4,"if",[[20,["myBookshelf","isAvailable"]]],null,{"statements":[[0,"                  "],[1,[25,"unread-badge",null,[["count"],[[20,["myBookshelf","bookshelves","unreadCount"]]]]],false],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"            "],[8],[0,"\\n\\n            "],[6,"li"],[9,"class","my-articles-link"],[3,"action",[[19,0,[]],"toggleMenu"]],[7],[0,"\\n"],[4,"link-to",["library.my-articles",[25,"query-params",null,[["sort"],["date"]]]],null,{"statements":[[0,"                "],[1,[25,"t",["library.header.my_articles"],null],false],[0,"\\n"]],"parameters":[]},null],[0,"            "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["model","promoLink"]]],null,{"statements":[[0,"            "],[6,"li"],[9,"class","custom-promo-link"],[7],[0,"\\n              "],[6,"a"],[10,"href",[26,[[20,["model","promoLink"]]]]],[9,"target","_new"],[7],[1,[20,["model","promoLabel"]],false],[8],[0,"\\n            "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n          "],[6,"li"],[9,"class","help-link"],[7],[0,"\\n            "],[1,[25,"help-link",null,[["label"],[[20,["helpLabel"]]]]],false],[0,"\\n          "],[8],[0,"\\n\\n"],[4,"if",[[20,["showLanguageChooser"]]],null,{"statements":[[0,"            "],[6,"li"],[9,"class","language-chooser-link"],[7],[0,"\\n              "],[1,[25,"language-chooser",null,[["library","closeMenu","refreshCurrentRoute"],[[20,["model"]],[25,"action",[[19,0,[]],"closeMenu"],null],[25,"action",[[19,0,[]],"refreshCurrentRoute"],null]]]],false],[0,"\\n            "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n          "],[6,"li"],[9,"class","settings-link"],[3,"action",[[19,0,[]],"toggleMenu"]],[7],[0,"\\n"],[4,"link-to",["library.settings"],[["class"],["view-settings not-logged-in-link"]],{"statements":[[0,"              "],[1,[25,"t",["settings.header"],null],false],[0,"\\n"]],"parameters":[]},null],[0,"          "],[8],[0,"\\n\\n          "],[6,"li"],[9,"class","library access-provided-by-link access-provided-by"],[7],[0,"\\n"],[4,"if",[[20,["model","accessProvidedByLabel"]]],null,{"statements":[[4,"if",[[20,["model","accessProvidedByLink"]]],null,{"statements":[[4,"track-clicks",null,[["category"],["ProvidedByClicked"]],{"statements":[[0,"                  "],[6,"a"],[10,"href",[26,[[20,["model","accessProvidedByLink"]]]]],[9,"target","_new"],[7],[6,"span"],[9,"class","library-name"],[7],[1,[20,["model","accessProvidedByLabel"]],false],[8],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},{"statements":[[0,"                "],[6,"span"],[9,"class","library-name"],[7],[1,[20,["model","accessProvidedByLabel"]],false],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[0,"              "],[6,"span"],[7],[1,[25,"t",["library.header.access_provided_by"],null],false],[8],[0,"\\n"],[4,"if",[[20,["model","webInfoURL"]]],null,{"statements":[[4,"track-clicks",null,[["trackedElement","category"],[".provided-by-link","ProvidedByClicked"]],{"statements":[[0,"                  "],[6,"a"],[9,"class","provided-by-link"],[10,"href",[26,[[20,["model","webInfoURL"]]]]],[9,"target","_new"],[7],[6,"span"],[9,"class","library-name"],[7],[1,[20,["model","name"]],false],[8],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},{"statements":[[0,"                "],[6,"span"],[9,"class","library-name"],[7],[1,[20,["model","name"]],false],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]}],[0,"          "],[8],[0,"\\n        "],[8],[2,"responsive-menu"],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[6,"ul"],[9,"class","tabs links"],[7],[0,"\\n          "],[6,"li"],[10,"class",[26,["library-home-link library-home ",[18,"libraryActiveOverride"]]]],[7],[0,"\\n"],[4,"link-to",["library",[20,["model"]]],[["tabindex"],["0"]],{"statements":[[0,"              "],[1,[25,"t",["library.header.browzine_library"],null],false],[0,"\\n"]],"parameters":[]},null],[0,"          "],[8],[0,"\\n\\n"],[4,"unless",[[20,["noPersonalizationLibrary"]]],null,{"statements":[[0,"            "],[6,"li"],[9,"class","my-bookshelf-link my-bookshelf-home"],[7],[0,"\\n"],[4,"link-to",["my-bookshelf"],[["tabindex"],["0"]],{"statements":[[0,"                "],[1,[25,"t",["library.header.my_bookshelf"],null],false],[0,"\\n"],[4,"if",[[20,["myBookshelf","isAvailable"]]],null,{"statements":[[0,"                  "],[1,[25,"unread-badge",null,[["count"],[[20,["myBookshelf","bookshelves","unreadCount"]]]]],false],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"            "],[8],[0,"\\n\\n            "],[6,"li"],[9,"class","my-articles-link my-articles-home"],[7],[0,"\\n"],[4,"link-to",["library.my-articles",[25,"query-params",null,[["sort"],["date"]]]],[["tabindex"],["0"]],{"statements":[[0,"                "],[1,[25,"t",["library.header.my_articles"],null],false],[0,"\\n"]],"parameters":[]},null],[0,"            "],[8],[0,"\\n"]],"parameters":[]},null],[0,"        "],[8],[2,"tabs"],[0,"\\n\\n        "],[6,"div"],[9,"class","items links"],[7],[0,"\\n          "],[6,"section"],[10,"aria-label",[26,[[25,"t",["library.header.access_provided_by"],null]," ",[20,["model","name"]]]]],[9,"class","library access-provided-by-link"],[7],[0,"\\n"],[4,"if",[[20,["model","accessProvidedByLabel"]]],null,{"statements":[[4,"if",[[20,["model","accessProvidedByLink"]]],null,{"statements":[[0,"                "],[6,"a"],[9,"tabindex","0"],[10,"href",[26,[[20,["model","accessProvidedByLink"]]]]],[9,"target","_new"],[7],[1,[20,["model","accessProvidedByLabel"]],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                "],[6,"span"],[7],[1,[20,["model","accessProvidedByLabel"]],false],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[4,"if",[[20,["model","webInfoURL"]]],null,{"statements":[[4,"track-clicks",null,[["trackedElement","category"],[".provided-by-link","ProvidedByClicked"]],{"statements":[[0,"                  "],[6,"a"],[9,"tabindex","0"],[9,"class","provided-by-link"],[10,"href",[26,[[20,["model","webInfoURL"]]]]],[9,"target","_new"],[7],[12,"access-provided-by",[]],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},{"statements":[[0,"                "],[6,"div"],[7],[12,"access-provided-by",[]],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]}],[0,"          "],[8],[0,"\\n\\n"],[4,"if",[[20,["model","promoLink"]]],null,{"statements":[[0,"            "],[6,"section"],[10,"aria-label",[25,"t",["accessibility.custom_promo_link"],null],null],[9,"class","custom-promo-link"],[7],[0,"\\n              "],[6,"a"],[9,"tabindex","0"],[10,"href",[26,[[20,["model","promoLink"]]]]],[9,"target","_new"],[7],[1,[20,["model","promoLabel"]],false],[8],[0,"\\n            "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n          "],[6,"section"],[10,"aria-label",[25,"t",["accessibility.help_link"],null],null],[9,"class","help-link help"],[7],[0,"\\n            "],[1,[25,"help-link",null,[["label","icon"],["","help-2"]]],false],[0,"\\n          "],[8],[0,"\\n\\n"],[4,"if",[[20,["model","promoteNativeApp"]]],null,{"statements":[[0,"            "],[6,"section"],[10,"aria-label",[25,"t",["accessibility.app_promo_link"],null],null],[9,"class","app-promo-link app-promotion"],[7],[0,"\\n"],[4,"link-to",["library.app-promotion"],[["tabindex"],["0"]],{"statements":[[0,"                "],[6,"span"],[9,"class","icon"],[10,"title",[25,"t",["library.header.app_promo"],null],null],[7],[6,"img"],[9,"src","//browzine-app.thirdiron.com/images/apps/smart-phone-009336138444a5359fa0d739d1c54a0b.png"],[10,"alt",[25,"t",["library.header.app_promo"],null],null],[7],[8],[8],[0,"\\n"]],"parameters":[]},null],[0,"            "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["showLanguageChooser"]]],null,{"statements":[[0,"            "],[6,"section"],[10,"aria-label",[26,[[25,"t",["library.header.language_chooser"],null]]]],[9,"class","language-chooser-link"],[7],[0,"\\n              "],[1,[25,"language-chooser",null,[["library","closeMenu","refreshCurrentRoute"],[[20,["model"]],[25,"action",[[19,0,[]],"closeMenu"],null],[25,"action",[[19,0,[]],"refreshCurrentRoute"],null]]]],false],[0,"\\n            "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n          "],[6,"section"],[10,"aria-label",[25,"t",["accessibility.settings_link"],null],null],[9,"class","settings-link settings"],[10,"title",[25,"t",["library.header.settings"],null],null],[7],[0,"\\n"],[4,"if",[[20,["applicationSession","userIsLoggedIn"]]],null,{"statements":[[0,"              "],[12,"user-logged-in-info",[]],[0,"\\n"]],"parameters":[]},{"statements":[[4,"link-to",["library.settings"],[["class","tabindex"],["view-settings not-logged-in-link","0"]],{"statements":[[0,"                "],[6,"span"],[9,"class","icon flaticon solid settings"],[10,"title",[25,"t",["library.header.settings"],null],null],[7],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]}],[0,"          "],[8],[0,"\\n\\n"],[4,"unless",[[20,["hideSearch"]]],null,{"statements":[[0,"            "],[6,"section"],[9,"tabindex","0"],[10,"aria-label",[25,"t",["accessibility.access_search_pane"],null],null],[10,"class",[26,["search ",[25,"if",[[20,["searchVisible"]],"active"],null]," tabindex"]]],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","toggleSearch"],null],null],[3,"action",[[19,0,[]],"toggleSearch"]],[7],[0,"\\n"],[4,"if",[[20,["searchVisible"]]],null,{"statements":[[0,"                "],[6,"span"],[9,"class","active active-icon icon x-1 flaticon stroke"],[9,"aria-hidden","true"],[10,"title",[18,"searchTitle"],null],[7],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                "],[6,"span"],[9,"class","inactive-icon icon magnifying-glass-2 flaticon stroke"],[9,"aria-hidden","true"],[10,"title",[18,"searchTitle"],null],[7],[8],[0,"\\n"]],"parameters":[]}],[0,"            "],[8],[0,"\\n"]],"parameters":[]},null],[0,"        "],[8],[2,"items"],[0,"\\n"]],"parameters":[]}],[0,"    "],[8],[2,"screen-header"],[0,"\\n"]],"parameters":[]},null],[0,"\\n  "],[6,"div"],[9,"id","library-content"],[10,"class",[26,["container ",[25,"if",[[25,"and",[[20,["searchVisible"]],[20,["searchResults"]]],null],"disable-scroll-mobile"],null]]]],[7],[0,"\\n    "],[1,[18,"outlet"],false],[0,"\\n\\n"],[4,"if",[[20,["searchVisible"]]],null,{"statements":[[0,"      "],[6,"div"],[9,"class","search-underlay"],[3,"action",[[19,0,[]],"closeSearch"]],[7],[8],[0,"\\n      "],[1,[25,"search-pane",null,[["position","disableScrollingOnInsert","placeholder","library","showResults","showSearchField","filter","query","results","previous","inProgress","lowerLimit","isIssn","issnMsg","externalSearchLocation","clearHistory","storePreviousSearch","exit","visitResult"],["header",true,[20,["placeholder"]],[20,["model"]],true,true,[20,["filter"]],[20,["query"]],[20,["searchResults"]],[20,["previousSearches"]],[20,["searchInProgress"]],[20,["searchLowerLimit"]],[20,["searchIsIssn"]],[20,["searchIssnMsg"]],[20,["externalSearchLocation"]],"clearHistory","storePreviousSearch","closeSearch","visitSearchResult"]]],false],[0,"\\n"]],"parameters":[]},null],[0,"  "],[8],[0,"\\n"],[8],[2,"canvas"],[0,"\\n"]],"hasEval":true}', meta: { moduleName: "browzine-web/templates/library.hbs" } }) }), define("browzine-web/templates/library/app-promotion", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "aMj2vk/1", block: '{"symbols":[],"statements":[[6,"div"],[9,"class","app-promotion"],[7],[0,"\\n  "],[6,"h1"],[7],[1,[25,"t",["untranslated.download_browzine_app_heading"],null],false],[8],[0,"\\n  "],[6,"main"],[7],[0,"\\n    "],[6,"div"],[9,"class","devices"],[7],[6,"img"],[9,"src","//browzine-app.thirdiron.com/images/apps/devices-ae709cd5e4a26cca51d637806b2c52bc.png"],[10,"alt",[26,[[25,"t",["untranslated.supported_browzine_devices"],null]]]],[7],[8],[8],[0,"\\n    "],[6,"aside"],[7],[0,"\\n      "],[1,[25,"t",["untranslated.download_browzine_app_message"],null],false],[0,"\\n      "],[6,"ul"],[9,"class","store-list"],[7],[0,"\\n        "],[6,"li"],[7],[0,"\\n          "],[6,"a"],[9,"href","https://itunes.apple.com/us/app/browzine/id463787411?mt=8"],[9,"target","_new"],[7],[0,"\\n            "],[6,"img"],[9,"src","//browzine-app.thirdiron.com/images/apps/apple-cb4c86eb81fa3270f7dd71ccae9f5074.png"],[10,"alt",[26,[[25,"t",["untranslated.apple_app_store"],null]]]],[7],[8],[0,"\\n          "],[8],[0,"\\n        "],[8],[0,"\\n        "],[6,"li"],[7],[0,"\\n          "],[6,"a"],[9,"href","https://play.google.com/store/apps/details?id=com.browzine"],[9,"target","_new"],[7],[0,"\\n            "],[6,"img"],[9,"src","//browzine-app.thirdiron.com/images/apps/google-d343f08a6efef58089cf7de192eea2dd.jpg"],[10,"alt",[26,[[25,"t",["untranslated.google_play"],null]]]],[7],[8],[0,"\\n          "],[8],[0,"\\n        "],[8],[0,"\\n        "],[6,"li"],[7],[0,"\\n          "],[6,"a"],[9,"href","http://www.amazon.com/Third-Iron-LLC-BrowZine/dp/B00D553D42"],[9,"target","_new"],[7],[0,"\\n            "],[6,"img"],[9,"src","//browzine-app.thirdiron.com/images/apps/amazon-9ca7931d776a1014d1ad9f83e6a72e14.png"],[10,"alt",[26,[[25,"t",["untranslated.amazon_app_store"],null]]]],[7],[8],[0,"\\n          "],[8],[0,"\\n        "],[8],[0,"\\n      "],[8],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/library/app-promotion.hbs" } }) }), define("browzine-web/templates/library/journal", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "dnMOWhWF", block: '{"symbols":["bookshelf"],"statements":[[6,"section"],[10,"aria-label",[26,[[25,"t",["journal.journal"],null]]]],[9,"class","journal-toc"],[7],[0,"\\n  "],[6,"header"],[9,"class","sticky"],[7],[0,"\\n    "],[6,"section"],[9,"class","journal"],[7],[0,"\\n      "],[1,[25,"journal-cover",null,[["journal"],[[20,["journal"]]]]],false],[0,"\\n\\n      "],[6,"div"],[9,"class","details"],[7],[0,"\\n        "],[6,"h1"],[7],[1,[20,["journal","title"]],false],[8],[0,"\\n        "],[1,[25,"scimago-rank",null,[["journal"],[[20,["journal"]]]]],false],[0,"\\n      "],[8],[0,"\\n    "],[8],[0,"\\n\\n    "],[6,"section"],[9,"class","issue"],[7],[0,"\\n"],[4,"unless",[[20,["selectedIssue","articlesInPress"]]],null,{"statements":[[0,"        "],[6,"h2"],[7],[1,[20,["selectedIssue","title"]],false],[8],[0,"\\n        "],[6,"span"],[9,"class","selected-issue-year"],[7],[1,[20,["selectedIssue","year"]],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[6,"h2"],[7],[1,[25,"t",["journal.articles_in_press.link"],null],false],[8],[0,"\\n"]],"parameters":[]}],[0,"    "],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"aside"],[7],[0,"\\n    "],[6,"section"],[10,"aria-label",[26,[[20,["journal","title"]]]]],[9,"class","journal"],[7],[0,"\\n      "],[6,"div"],[9,"class","backdrop"],[7],[0,"\\n\\n      "],[8],[0,"\\n\\n      "],[6,"section"],[10,"aria-label",[26,[[25,"t",["journal.journal_header"],null]]]],[9,"class","rest"],[7],[0,"\\n"],[4,"journal-cover",null,[["journal"],[[20,["journal"]]]],{"statements":[[4,"if",[[25,"or",[[20,["media","isDesktop"]],[20,["media","isJumbo"]]],null]],null,{"statements":[[4,"if",[[20,["previousTaxonomyPath"]]],null,{"statements":[[0,"              "],[6,"div"],[9,"class","back-button back"],[3,"action",[[19,0,[]],"back"]],[7],[0,"\\n                "],[6,"a"],[9,"href","#"],[9,"tabindex","0"],[7],[6,"span"],[9,"class","left-2 flaticon stroke"],[7],[8],[1,[25,"t",["journal.back"],null],false],[8],[0,"\\n              "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"or",[[20,["media","isDesktop"]],[20,["media","isJumbo"]]],null]],null,{"statements":[[0,"            "],[1,[25,"scimago-rank",null,[["journal"],[[20,["journal"]]]]],false],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[0,"            "],[6,"div"],[9,"class","article-meta-data"],[7],[0,"\\n              "],[6,"h1"],[9,"tabindex","0"],[7],[1,[20,["journal","title"]],false],[8],[0,"\\n              "],[1,[25,"scimago-rank",null,[["journal"],[[20,["journal"]]]]],false],[0,"\\n            "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"or",[[20,["media","isDesktop"]],[20,["media","isJumbo"]]],null]],null,{"statements":[[0,"          "],[6,"h1"],[9,"tabindex","0"],[9,"class","journal-title"],[7],[1,[20,["journal","title"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["myBookshelf","libraryIsSubscribed"]]],null,{"statements":[[4,"if",[[20,["onMyBookshelf"]]],null,{"statements":[[0,"            "],[6,"button"],[9,"class","my-bookshelf button outline on-my-bookshelf"],[7],[0,"\\n              "],[6,"span"],[9,"class","icon-and-text"],[7],[0,"\\n                "],[6,"span"],[9,"class","icon flaticon solid checkmark-1"],[7],[8],[0,"\\n                "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["my_bookshelf.already_on_bookshelf_button_text"],null],false],[8],[0,"\\n              "],[8],[0,"\\n            "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["myBookshelf","isSyncing"]]],null,{"statements":[[0,"            "],[6,"button"],[10,"aria-label",[26,[[25,"t",["my_bookshelf.add_to_bookshelf_button_aria_label"],null]]]],[9,"class","my-bookshelf button outline tabindex"],[9,"disabled",""],[7],[0,"\\n              "],[6,"span"],[9,"class","icon-and-text"],[7],[0,"\\n                "],[6,"span"],[9,"class","icon"],[7],[1,[25,"loading-indicator",null,[["inline","white","smaller"],[true,true,true]]],false],[8],[0,"\\n                "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["my_bookshelf.add_to_bookshelf_button_text"],null],false],[8],[0,"\\n              "],[8],[0,"\\n            "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[25,"not",[[20,["applicationSession","userIsLoggedIn"]]],null]],null,{"statements":[[4,"unless",[[20,["library","noPersonalization"]]],null,{"statements":[[0,"              "],[6,"button"],[10,"aria-label",[26,[[25,"t",["my_bookshelf.add_to_bookshelf_button_aria_label"],null]]]],[9,"class","my-bookshelf button outline tabindex"],[10,"onclick",[25,"action",[[19,0,[]],"login"],null],null],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","login"],null],null],[9,"tabindex","0"],[7],[0,"\\n                "],[6,"span"],[9,"class","icon-and-text"],[7],[0,"\\n                  "],[6,"span"],[9,"class","icon flaticon solid plus-2"],[7],[8],[0,"\\n                  "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["my_bookshelf.add_to_bookshelf_button_text"],null],false],[8],[0,"\\n                "],[8],[0,"\\n              "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},{"statements":[[0,"            "],[6,"button"],[10,"aria-label",[26,[[25,"t",["my_bookshelf.add_to_bookshelf_button_aria_label"],null]]]],[9,"class","add-to-my-bookshelf my-bookshelf button outline tabindex"],[10,"onclick",[25,"action",[[19,0,[]],"addToMyBookshelf"],null],null],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","addToMyBookshelf"],null],null],[9,"tabindex","0"],[10,"disabled",[20,["myBookshelf","isProcessing"]],null],[7],[0,"\\n              "],[6,"span"],[9,"class","icon-and-text"],[7],[0,"\\n                "],[6,"span"],[9,"class","icon flaticon solid plus-2"],[7],[8],[0,"\\n                "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["my_bookshelf.add_to_bookshelf_button_text"],null],false],[8],[0,"\\n              "],[8],[0,"\\n            "],[8],[0,"\\n          "]],"parameters":[]}]],"parameters":[]}]],"parameters":[]}]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"and",[[20,["library","displayPublisherHomePageLinkButton"]],[20,["journal","homePageAtPublisherSite"]]],null]],null,{"statements":[[0,"          "],[6,"button"],[9,"class","view-publisher-site button outline tabindex"],[3,"action",[[19,0,[]],"viewPublisherSite"]],[7],[0,"\\n            "],[6,"span"],[9,"class","icon-and-text"],[7],[0,"\\n              "],[6,"span"],[9,"class","icon view-publisher-site fa fa-globe"],[7],[8],[0,"\\n              "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["journal.view_publisher_site"],null],false],[8],[0,"\\n            "],[8],[0,"\\n          "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"and",[[20,["myBookshelf","libraryIsSubscribed"]],[25,"and",[[20,["onMyBookshelf"]],[20,["hasUnreadArticles"]]],null]],null]],null,{"statements":[[0,"            "],[6,"button"],[9,"class","mark-all-issues-read button outline tabindex"],[3,"action",[[19,0,[]],"markAllIssuesRead"]],[7],[0,"\\n              "],[6,"span"],[9,"class","icon-and-text"],[7],[0,"\\n                "],[6,"span"],[9,"class","icon mark-all-read"],[7],[6,"span"],[9,"class","dot"],[7],[8],[8],[0,"\\n                "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["journal.mark_all_issues_read_button_text"],null],false],[8],[0,"\\n              "],[8],[0,"\\n            "],[8],[0,"\\n"]],"parameters":[]},null],[0,"      "],[8],[0,"\\n    "],[8],[0,"\\n\\n"],[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[0,"      "],[6,"ul"],[9,"class","controls"],[7],[0,"\\n        "],[6,"li"],[9,"tabindex","0"],[9,"class","back back-button tabindex"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","back"],null],null],[3,"action",[[19,0,[]],"back"]],[7],[0,"\\n          "],[6,"span"],[9,"class","icon flaticon solid left-2"],[9,"aria-hidden","true"],[7],[8],[0," "],[1,[25,"t",["journal.responsive.menu.back"],null],false],[0,"\\n        "],[8],[0,"\\n\\n        "],[6,"li"],[9,"tabindex","0"],[10,"class",[26,["issues ",[25,"if",[[20,["showIssues"]],"active"],null]," tabindex"]]],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","toggleIssues"],null],null],[3,"action",[[19,0,[]],"toggleIssues"]],[7],[0,"\\n            "],[1,[25,"t",["journal.responsive.menu.issues"],null],false],[0," "],[6,"span"],[9,"class","icon flaticon solid down-2"],[9,"aria-hidden","true"],[7],[8],[0,"\\n        "],[8],[0,"\\n\\n        "],[6,"li"],[9,"tabindex","0"],[10,"class",[26,["related ",[25,"if",[[20,["showRelated"]],"active"],null]," tabindex"]]],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","toggleRelated"],null],null],[3,"action",[[19,0,[]],"toggleRelated"]],[7],[0,"\\n          "],[1,[25,"t",["journal.responsive.menu.related"],null],false],[0," "],[6,"span"],[9,"class","icon flaticon solid down-2"],[9,"aria-hidden","true"],[7],[8],[0,"\\n        "],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"or",[[20,["showIssues"]],[25,"or",[[20,["media","isDesktop"]],[20,["media","isJumbo"]]],null]],null]],null,{"statements":[[0,"      "],[1,[25,"outlet",["journal-content-navigation"],null],false],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"or",[[20,["showRelated"]],[25,"or",[[20,["media","isDesktop"]],[20,["media","isJumbo"]]],null]],null]],null,{"statements":[[0,"      "],[6,"section"],[9,"class","related-bookshelves"],[10,"aria-label",[25,"t",["journal.browse_related_subjects"],null],null],[7],[0,"\\n        "],[6,"header"],[9,"tabindex","0"],[7],[1,[25,"t",["journal.browse_related_subjects"],null],false],[8],[0,"\\n"],[4,"each",[[20,["sortedBookshelves"]]],null,{"statements":[[4,"track-clicks",null,[["category","action","label","value"],["ShowJournalInShelves",[19,1,["id"]],[20,["journal","title"]],[20,["journal","id"]]]],{"statements":[[0,"            "],[6,"div"],[9,"class","bookshelf"],[7],[0,"\\n              "],[6,"span"],[9,"class","icon flaticon solid files-1"],[7],[8],[0,"\\n"],[4,"link-to",["library.subject.bookcase.bookshelf",[19,1,["subject"]],[19,1,["bookcase"]],[19,1,[]]],[["title","invokeAction","tabindex"],[[19,1,["name"]],[25,"action",[[19,0,[]],"toggleRelated"],null],"0"]],{"statements":[[0,"                "],[6,"span"],[9,"class","label"],[7],[1,[19,1,["name"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"            "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[1]},null],[0,"      "],[8],[0,"\\n"]],"parameters":[]},null],[0,"  "],[8],[0,"\\n\\n  "],[6,"main"],[7],[0,"\\n    "],[1,[18,"outlet"],false],[0,"\\n  "],[8],[0,"\\n"],[8],[0,"\\n\\n"],[6,"ul"],[9,"class","responsive-menu"],[7],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/library/journal.hbs" } }) }), define("browzine-web/templates/library/journal/issue", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "ESB44NBp", block: '{"symbols":[],"statements":[[4,"if",[[20,["model","embargoed"]]],null,{"statements":[[0,"  "],[6,"div"],[9,"class","issue-availability-message"],[7],[0,"\\n    "],[1,[20,["model","journal","embargoDescription"]],false],[0,"\\n"],[4,"if",[[20,["library","supportsILL"]]],null,{"statements":[[4,"if",[[20,["library","customEmbargoMessage"]]],null,{"statements":[[0,"        "],[1,[20,["library","customEmbargoMessage"]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[1,[25,"t",["library.custom_embargo_message_default"],null],false],[0,"\\n"]],"parameters":[]}]],"parameters":[]},null],[0,"  "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[25,"or",[[25,"and",[[20,["journal","accessedThroughAggregator"]],[20,["model","articlesInPress"]]],null],[25,"and",[[20,["journal","embargoDescription"]],[20,["model","articlesInPress"]]],null]],null]],null,{"statements":[[0,"  "],[6,"div"],[9,"class","issue-availability-message"],[7],[0,"\\n    "],[1,[25,"t",["library.articles_in_press_unavailable_message"],null],false],[0,"\\n"],[4,"if",[[20,["library","supportsILL"]]],null,{"statements":[[4,"if",[[20,["library","customEmbargoMessage"]]],null,{"statements":[[0,"        "],[1,[20,["library","customEmbargoMessage"]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[1,[25,"t",["library.custom_embargo_message_default"],null],false],[0,"\\n"]],"parameters":[]}]],"parameters":[]},null],[0,"  "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[25,"and",[[25,"not",[[20,["model","withinSubscription"]]],null],[20,["model","availabilityMessage"]]],null]],null,{"statements":[[0,"  "],[6,"div"],[9,"class","issue-availability-message"],[7],[0,"\\n    "],[1,[20,["model","availabilityMessage"]],false],[0,"\\n"],[4,"if",[[20,["library","supportsILL"]]],null,{"statements":[[4,"if",[[20,["library","customAvailabilityMessage"]]],null,{"statements":[[0,"        "],[1,[20,["library","customAvailabilityMessage"]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[1,[25,"t",["library.custom_availability_message_default"],null],false],[0,"\\n"]],"parameters":[]}]],"parameters":[]},null],[0,"  "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]}]],"parameters":[]}],[0,"\\n"],[6,"header"],[9,"id","main-content"],[10,"class",[26,["issue ",[25,"if",[[20,["model","articlesInPress"]],"articles-in-press"],null]," ",[25,"if",[[25,"not",[[20,["hasUnreadArticles"]]],null],"no-unread-articles"],null]]]],[7],[0,"\\n  "],[6,"div"],[9,"class","issue-info"],[7],[0,"\\n"],[4,"if",[[20,["editMode"]]],null,{"statements":[[4,"if",[[25,"not",[[20,["model","articlesInPress"]]],null]],null,{"statements":[[0,"        "],[1,[25,"input",null,[["class","value","disabled","aria-label"],["edit-issue-date",[20,["model","date"]],[20,["model","suppressed"]],"Issue date"]]],false],[0,"\\n        "],[6,"label"],[9,"class","item-suppression"],[7],[0,"\\n          "],[1,[25,"input",null,[["aria-label","type","checked"],[[20,["untranslatedSuppressIssue"]],"checkbox",[20,["model","suppressed"]]]]],false],[1,[25,"t",["untranslated.suppress_issue"],null],false],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["model","articlesInPress"]]],null,{"statements":[[0,"        "],[6,"h3"],[9,"class","title"],[7],[1,[25,"t",["journal.articles_in_press.link"],null],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[6,"h3"],[9,"class","title"],[7],[1,[20,["model","title"]],false],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[0,"      "],[6,"h4"],[9,"class","date"],[7],[0,"\\n"],[4,"if",[[20,["model","articlesInPress"]]],null,{"statements":[[0,"          "],[1,[25,"t",["journal.articles_in_press.date_message"],null],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"          "],[1,[25,"moment-format",[[20,["model","date"]],"YYYY"],null],false],[0,"\\n"]],"parameters":[]}],[0,"      "],[8],[0,"\\n\\n"],[4,"if",[[20,["model","articlesInPress"]]],null,{"statements":[[0,"        "],[6,"h3"],[9,"tabindex","0"],[9,"class","title"],[7],[1,[25,"t",["journal.articles_in_press.link"],null],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[6,"h3"],[9,"tabindex","0"],[9,"class","title"],[7],[1,[20,["model","title"]],false],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]}],[0,"  "],[8],[0,"\\n\\n  "],[6,"div"],[9,"class","issue-buttons"],[7],[0,"\\n"],[4,"if",[[20,["editMode"]]],null,{"statements":[[4,"if",[[20,["saving"]]],null,{"statements":[[0,"        "],[1,[18,"loading-indicator"],false],[0,"\\n"]],"parameters":[]},null],[0,"      "],[6,"button"],[9,"class","button primary issue-save"],[3,"action",[[19,0,[]],"save"]],[7],[1,[25,"t",["untranslated.save"],null],false],[8],[0,"\\n      "],[6,"button"],[9,"class","button issue-cancel"],[3,"action",[[19,0,[]],"cancel"]],[7],[1,[25,"t",["untranslated.lower_case_cancel"],null],false],[8],[0,"\\n\\n"]],"parameters":[]},{"statements":[[4,"require-permissions",null,[["requestedPermissions"],["library.issue.edit"]],{"statements":[[0,"        "],[6,"a"],[9,"class","icon flaticon solid pencil issue-edit"],[9,"href","#"],[10,"title",[26,[[25,"t",["untranslated.edit_issue"],null]]]],[3,"action",[[19,0,[]],"edit"]],[7],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]}],[0,"  "],[8],[0,"\\n"],[8],[0,"\\n\\n"],[4,"if",[[25,"and",[[20,["journalIsOnMyBookshelf"]],[20,["hasUnreadArticles"]]],null]],null,{"statements":[[0,"  "],[6,"button"],[9,"class","mark-issue-read"],[3,"action",[[19,0,[]],"markIssueRead"]],[7],[0,"\\n    "],[6,"div"],[9,"class","mark-all-read icon"],[7],[6,"div"],[9,"class","dot"],[7],[8],[8],[1,[25,"t",["journal.issue.mark_issue_read"],null],false],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["model","suppressed"]]],null,{"statements":[[0,"  "],[6,"p"],[9,"class","suppressed-warning"],[7],[0,"\\n    "],[1,[25,"t",["untranslated.issue_suppressed_message"],null],false],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["noArticles"]]],null,{"statements":[[0,"  "],[6,"p"],[7],[1,[25,"t",["journal.issue.no_articles_message"],null],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["initializing"]]],null,{"statements":[[0,"  "],[1,[25,"loading-indicator",null,[["alignment"],["left"]]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"  "],[1,[25,"article-list",null,[["articles","library","journal","issue","doiToShow","scrollDuration","scrollEasing","resultTopMargin","pixelsToJumpToWithin","editMode","journalIsOnMyBookshelf","hidePageNumbers","hasUnreadArticles","loadMoreArticles"],[[20,["paginatedArticles"]],[20,["library"]],[20,["journal"]],[20,["model"]],[20,["doiToShow"]],[20,["scrollDuration"]],[20,["scrollEasing"]],[20,["resultTopMargin"]],300,[20,["editMode"]],[20,["journalIsOnMyBookshelf"]],[20,["model","articlesInPress"]],[20,["hasUnreadArticles"]],[25,"action",[[19,0,[]],"loadMoreArticles"],null]]]],false],[0,"\\n"]],"parameters":[]}]],"parameters":[]}]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/library/journal/issue.hbs" } }) }), define("browzine-web/templates/library/my-articles", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "Dmm/KvBJ", block: '{"symbols":[],"statements":[[4,"if",[[20,["myArticles","isAvailable"]]],null,{"statements":[[0,"  "],[6,"section"],[10,"aria-label",[26,[[25,"t",["my_articles.my_articles_section_label"],null]]]],[9,"class","journal-toc"],[7],[0,"\\n    "],[6,"aside"],[10,"aria-label",[26,[[25,"t",["my_articles.my_articles_aside_label"],null]]]],[9,"class","my-articles"],[7],[0,"\\n"],[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[0,"        "],[6,"ul"],[9,"class","controls"],[7],[0,"\\n          "],[6,"li"],[9,"tabindex","0"],[10,"class",[26,["collections ",[25,"if",[[20,["showCollections"]],"active"],null]," tabindex"]]],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","toggleCollections"],null],null],[3,"action",[[19,0,[]],"toggleCollections"]],[7],[0,"\\n            "],[1,[25,"t",["my_articles.mobile_collections_control_text"],null],false],[0," "],[6,"span"],[9,"class","icon flaticon solid down-2"],[9,"aria-hidden","true"],[7],[8],[0,"\\n          "],[8],[0,"\\n\\n          "],[6,"li"],[9,"tabindex","0"],[10,"class",[26,["sort ",[25,"if",[[20,["showSort"]],"active"],null]," tabindex"]]],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","toggleSort"],null],null],[3,"action",[[19,0,[]],"toggleSort"]],[7],[0,"\\n            "],[1,[25,"t",["my_articles.mobile_sort_control_text"],null],false],[0," "],[6,"span"],[9,"class","icon flaticon solid down-2"],[9,"aria-hidden","true"],[7],[8],[0,"\\n          "],[8],[0,"\\n        "],[8],[0,"\\n\\n"],[4,"if",[[20,["showCollections"]]],null,{"statements":[[0,"          "],[1,[25,"collection-list",null,[["toggleCollections","createCollection"],[[25,"action",[[19,0,[]],"toggleCollections"],null],[25,"action",[[19,0,[]],"createCollection"],null]]]],false],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["showSort"]]],null,{"statements":[[0,"          "],[6,"ul"],[9,"class","sort-controls"],[7],[0,"\\n"],[4,"link-to",[[25,"query-params",null,[["sort"],["date"]]]],[["class","tagName","invokeAction"],["sort-control","li",[25,"action",[[19,0,[]],"toggleSort"],null]]],{"statements":[[4,"link-to",[[25,"query-params",null,[["sort"],["date"]]]],[["class","invokeAction","tabindex"],["sort-control sort-by-date",[25,"action",[[19,0,[]],"toggleSort"],null],"0"]],{"statements":[[0,"                "],[6,"div"],[9,"class","text"],[7],[1,[25,"t",["my_articles.date_added_sort_option_text"],null],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"              "],[6,"span"],[9,"class","icon flaticon solid"],[9,"aria-hidden","true"],[7],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"link-to",[[25,"query-params",null,[["sort"],["journal"]]]],[["class","tagName","invokeAction"],["sort-control","li",[25,"action",[[19,0,[]],"toggleSort"],null]]],{"statements":[[4,"link-to",[[25,"query-params",null,[["sort"],["journal"]]]],[["class","invokeAction","tabindex"],["sort-control sort-by-journal",[25,"action",[[19,0,[]],"toggleSort"],null],"0"]],{"statements":[[0,"                "],[6,"div"],[9,"class","text"],[7],[1,[25,"t",["my_articles.journal_sort_option_text"],null],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"              "],[6,"span"],[9,"class","icon flaticon solid"],[9,"aria-hidden","true"],[7],[8],[0,"\\n"]],"parameters":[]},null],[0,"          "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},{"statements":[[0,"        "],[6,"div"],[9,"class","journal"],[7],[0,"\\n          "],[6,"div"],[9,"class","rest"],[7],[0,"\\n            "],[6,"h1"],[9,"tabindex","0"],[7],[1,[25,"t",["my_articles.my_articles_aside_heading"],null],false],[8],[0,"\\n          "],[8],[0,"\\n        "],[8],[0,"\\n\\n        "],[6,"section"],[10,"aria-label",[26,[[25,"t",["my_articles.collections_section_label"],null]]]],[9,"class","my-articles header-container collections-section"],[7],[0,"\\n          "],[6,"header"],[9,"tabindex","0"],[7],[0,"\\n            "],[1,[25,"t",["my_articles.my_articles_aside_collections_header"],null],false],[0,"\\n          "],[8],[0,"\\n\\n          "],[1,[18,"collection-list"],false],[0,"\\n        "],[8],[0,"\\n\\n        "],[6,"section"],[10,"aria-label",[26,[[25,"t",["my_articles.create_new_collection_section_label"],null]]]],[9,"class","journal"],[7],[0,"\\n          "],[6,"div"],[9,"class","rest create-new-collection-container"],[7],[0,"\\n            "],[6,"button"],[9,"tabindex","0"],[9,"class","create-new-collection button outline tabindex"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","createCollection"],null],null],[3,"action",[[19,0,[]],"createCollection"]],[7],[0,"\\n              "],[6,"span"],[9,"class","icon-and-text"],[7],[0,"\\n                "],[6,"span"],[9,"class","icon flaticon solid plus-2"],[7],[8],[0,"\\n                "],[6,"span"],[9,"class","label"],[7],[1,[25,"t",["my_articles.create_new_collection_button_text"],null],false],[8],[0,"\\n              "],[8],[0,"\\n            "],[8],[0,"\\n          "],[8],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]}],[0,"    "],[8],[0,"\\n\\n    "],[6,"main"],[7],[0,"\\n    "],[1,[18,"outlet"],false],[0,"\\n    "],[8],[0,"\\n\\n    "],[1,[25,"collection-modal",null,[["modal"],[[20,["newCollectionModal"]]]]],false],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"  "],[6,"div"],[9,"class","coming-soon-container"],[7],[0,"\\n    "],[6,"h1"],[9,"class","coming-soon-header"],[7],[1,[25,"t",["my_articles.pre_login_header"],null],false],[8],[0,"\\n    "],[6,"img"],[9,"class","coming-soon-my-articles-image"],[10,"src",[26,[[25,"t",["my_articles.pre_login_image_url"],null]]]],[10,"alt",[26,[[25,"t",["my_articles.pre_login_image_alt_text"],null]]]],[7],[8],[0,"\\n\\n    "],[6,"div"],[9,"class","coming-soon-subscribe-container"],[7],[0,"\\n      "],[6,"p"],[7],[1,[25,"t",["my_articles.pre_login_message_p_1"],null],false],[8],[0,"\\n\\n      "],[6,"p"],[7],[1,[25,"t",["my_articles.pre_login_message_p_2"],null],false],[8],[0,"\\n\\n"],[4,"if",[[25,"eq",[[20,["primaryLocale"]],"ja"],null]],null,{"statements":[[0,"        "],[6,"p"],[7],[1,[25,"t",["my_articles.ja_pre_login_login_or_signup_message_begin"],null],false],[4,"link-to",["library.login",[20,["library"]],[25,"query-params",null,[["returnRoute","returnParameter"],["library.my-articles",[20,["library","id"]]]]]],[["class"],["login"]],{"statements":[[0,"ログイン"]],"parameters":[]},null],[0,"\\n          "],[1,[25,"t",["my_articles.ja_pre_login_login_or_signup_message_middle"],null],false],[4,"link-to",["auth.signup"],null,{"statements":[[0,"登録"]],"parameters":[]},null],[1,[25,"t",["my_articles.ja_pre_login_login_or_signup_message_end"],null],false],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[6,"p"],[7],[4,"link-to",["library.login",[20,["library"]],[25,"query-params",null,[["returnRoute","returnParameter"],["library.my-articles",[20,["library","id"]]]]]],[["class"],["login"]],{"statements":[[1,[18,"loginLinkText"],false]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"not",[[20,["library","ssoEnabled"]]],null]],null,{"statements":[[0,"          "],[1,[25,"t",["my_articles.pre_login_or"],null],false],[0," "],[4,"link-to",["auth.signup"],null,{"statements":[[1,[18,"signupLinkText"],false]],"parameters":[]},null],[0,"\\n"]],"parameters":[]},null],[0,"        "],[1,[25,"t",["my_articles.pre_login_login_or_signup_message_end"],null],false],[8],[0,"\\n"]],"parameters":[]}],[0,"    "],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]}],[0,"\\n"],[6,"ul"],[9,"class","responsive-menu"],[7],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/library/my-articles.hbs" } }) }), define("browzine-web/templates/library/my-articles/collection", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "QDul2NxB", block: '{"symbols":[],"statements":[[1,[25,"collection-items",null,[["collectionId","library"],[[20,["model","collectionId"]],[20,["library"]]]]],false],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/library/my-articles/collection.hbs" } }) }), define("browzine-web/templates/library/settings", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "F73LaiEA", block: '{"symbols":[],"statements":[[6,"div"],[9,"class","settings-container"],[7],[0,"\\n  "],[6,"div"],[9,"class","settings-canvas"],[7],[0,"\\n    "],[6,"ul"],[9,"class","library-header"],[7],[0,"\\n      "],[6,"li"],[7],[0,"\\n        "],[6,"span"],[9,"tabindex","0"],[10,"aria-label",[26,[[25,"t",["settings.current_library"],[["libraryName"],[[20,["model","library","name"]]]]]]]],[9,"class","settings-library-name"],[7],[0,"\\n          "],[1,[20,["model","library","name"]],false],[0,"\\n          "],[6,"a"],[9,"href","/libraries"],[9,"class","change-library-link"],[3,"action",[[19,0,[]],"changeLibrary"]],[7],[1,[25,"t",["settings.change_library"],null],false],[8],[0,"\\n        "],[8],[0,"\\n\\n        "],[6,"span"],[9,"class","library-logo-canvas"],[7],[0,"\\n          "],[1,[25,"library-logo",null,[["for"],[[20,["model","library"]]]]],false],[0,"\\n        "],[8],[0,"\\n      "],[8],[0,"\\n    "],[8],[0,"\\n\\n    "],[6,"div"],[9,"class","settings-menu"],[7],[0,"\\n      "],[6,"h1"],[9,"tabindex","0"],[9,"class","settings-header"],[7],[0,"\\n        "],[1,[25,"t",["settings.header"],null],false],[0,"\\n      "],[8],[0,"\\n\\n      "],[6,"div"],[9,"class","settings-menu-links"],[7],[0,"\\n        "],[4,"link-to",["library.settings.user-settings"],null,{"statements":[[1,[25,"t",["settings.sub_heading"],null],false]],"parameters":[]},null],[0,"\\n"],[4,"require-permissions",null,[["requestedPermissions","library"],["admin.library.edit",[20,["model","library","id"]]]],{"statements":[[0,"          "],[4,"link-to",["library.settings.library-customization"],[["class"],["library-customization-link"]],{"statements":[[1,[25,"t",["untranslated.customization"],null],false]],"parameters":[]},null],[0,"\\n"]],"parameters":[]},null],[0,"      "],[8],[0,"\\n    "],[8],[0,"\\n\\n    "],[1,[18,"outlet"],false],[0,"\\n  "],[8],[0,"\\n"],[8],[0,"\\n\\n"],[6,"ul"],[9,"class","responsive-menu"],[7],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/library/settings.hbs" } }) }), define("browzine-web/templates/library/settings/library-customization", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "7MDqZjKM", block: '{"symbols":[],"statements":[[1,[25,"library-customization-settings",null,[["library"],[[20,["model","library"]]]]],false],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/library/settings/library-customization.hbs" } }) }), define("browzine-web/templates/library/settings/user-settings", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "I83yyhFt", block: '{"symbols":["pair","pair","option"],"statements":[[6,"div"],[9,"class","user-settings-container"],[7],[0,"\\n"],[4,"if",[[25,"or",[[20,["applicationSession","userIsLoggedIn"]],[25,"not",[[20,["model","library","noPersonalization"]]],null]],null]],null,{"statements":[[0,"\\n    "],[6,"h2"],[9,"tabindex","0"],[7],[1,[25,"t",["settings.account_header"],null],false],[8],[0,"\\n\\n    "],[6,"ul"],[9,"class","settings account-settings"],[7],[0,"\\n"],[4,"if",[[25,"and",[[25,"not",[[20,["applicationSession","userIsLoggedIn"]]],null],[25,"not",[[20,["model","library","noPersonalization"]]],null]],null]],null,{"statements":[[0,"        "],[6,"li"],[9,"tabindex","0"],[7],[0,"\\n          "],[1,[25,"t",["settings.login_title"],null],false],[0,"\\n          "],[4,"link-to",["library.login",[20,["model","library"]]],null,{"statements":[[1,[18,"loginLinkText"],false]],"parameters":[]},null],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["applicationSession","userIsLoggedIn"]]],null,{"statements":[[0,"\\n"],[4,"if",[[20,["showEmailNotificationsFeatures"]]],null,{"statements":[[0,"          "],[6,"li"],[9,"class","email-notifications-row"],[9,"tabindex","0"],[7],[0,"\\n            "],[6,"div"],[9,"class","setting-control-and-label"],[7],[0,"\\n              "],[6,"div"],[9,"class","setting-label"],[7],[0,"\\n                "],[1,[25,"t",["settings.email_notifications"],null],false],[0,"\\n              "],[8],[0,"\\n              "],[6,"div"],[9,"class","setting-control"],[7],[0,"\\n                "],[6,"div"],[9,"class","status-icon"],[7],[0,"\\n"],[4,"if",[[20,["emailRemoved"]]],null,{"statements":[[0,"                    "],[6,"span"],[9,"class","flaticon solid warning setting-error"],[10,"title",[26,[[25,"t",["settings.email_removed_error_message"],null]]]],[7],[0," "],[8],[0,"\\n"]],"parameters":[]},null],[0,"                "],[8],[0,"\\n                "],[6,"div"],[9,"class","control-container"],[7],[0,"\\n"],[4,"power-select",null,[["onchange","options","selected","searchEnabled","disabled"],[[25,"action",[[19,0,[]],[20,["changeEmailNotificationSetting"]]],null],[20,["emailNotificationsOptions"]],[20,["selectedEmailNotificationOption"]],false,[20,["disableEmailNotificationSetting"]]]],{"statements":[[0,"                    "],[6,"span"],[10,"class",[26,[[19,3,["value"]],"-option"]]],[7],[1,[19,3,["name"]],false],[8],[0,"\\n"]],"parameters":[3]},null],[0,"                "],[8],[0,"\\n              "],[8],[0,"\\n            "],[8],[0,"\\n"],[4,"if",[[20,["showEmailNotificationsLaunchMessage"]]],null,{"statements":[[0,"              "],[6,"div"],[9,"class","setting-message"],[7],[0,"\\n                "],[1,[25,"t",["untranslated.email_notifications_launch_message"],[["htmlSafe"],[true]]],false],[0,"\\n              "],[8],[0,"\\n"]],"parameters":[]},null],[0,"          "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n        "],[6,"li"],[9,"tabindex","0"],[7],[0,"\\n          "],[1,[25,"t",["settings.reset_password"],null],false],[0,"\\n"],[4,"link-to",["auth.reset"],null,{"statements":[[0,"            "],[1,[25,"t",["settings.reset_button"],null],false],[0,"\\n"]],"parameters":[]},null],[0,"        "],[8],[0,"\\n\\n        "],[6,"li"],[9,"tabindex","0"],[7],[0,"\\n          "],[1,[25,"t",["settings.logout_title"],null],false],[0,"\\n          "],[6,"button"],[3,"action",[[19,0,[]],"logout"]],[7],[1,[25,"t",["settings.logout_button"],null],false],[8],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]},null],[0,"    "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n  "],[6,"h2"],[9,"tabindex","0"],[7],[1,[25,"t",["settings.citation_header"],null],false],[8],[0,"\\n  "],[6,"ul"],[9,"class","settings"],[7],[0,"\\n    "],[6,"li"],[9,"tabindex","0"],[7],[0,"\\n      "],[1,[25,"t",["settings.forget_zotero_login"],null],false],[0,"\\n      "],[6,"button"],[3,"action",[[19,0,[]],"forgetZotero"]],[7],[1,[25,"t",["settings.forget_button"],null],false],[8],[0,"\\n    "],[8],[0,"\\n\\n    "],[6,"li"],[9,"tabindex","0"],[7],[0,"\\n      "],[1,[25,"t",["settings.forget_mendeley_login"],null],false],[0,"\\n      "],[6,"button"],[3,"action",[[19,0,[]],"forgetMendeley"]],[7],[1,[25,"t",["settings.forget_button"],null],false],[8],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n\\n"],[4,"if",[[20,["displayMyBookshelfSection"]]],null,{"statements":[[0,"    "],[6,"h2"],[9,"tabindex","0"],[7],[1,[25,"t",["settings.journal_unread_header"],null],false],[8],[0,"\\n    "],[6,"ul"],[7],[0,"\\n"],[4,"if",[[20,["myBookshelf","hasUnreadArticles"]]],null,{"statements":[[0,"        "],[6,"li"],[9,"tabindex","0"],[7],[0,"\\n          "],[1,[25,"t",["settings.mark_all_journals_read"],null],false],[0,"\\n          "],[6,"button"],[9,"class","mark-all-journals-read"],[3,"action",[[19,0,[]],"markAllJournalsRead"]],[7],[1,[25,"t",["settings.mark_button"],null],false],[8],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["notifications","canBeRequested"]]],null,{"statements":[[0,"        "],[6,"li"],[9,"tabindex","0"],[7],[0,"\\n          "],[1,[25,"t",["settings.enable_notifications_header"],null],false],[0,"\\n          "],[6,"button"],[3,"action",[[19,0,[]],"requestNotificationPermission"]],[7],[1,[25,"t",["settings.enable_button"],null],false],[8],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]},null],[0,"    "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["displayTestButtons"]]],null,{"statements":[[0,"    "],[6,"h2"],[9,"tabindex","0"],[7],[1,[25,"t",["settings.developer_header"],null],false],[8],[0,"\\n    "],[6,"ul"],[7],[0,"\\n      "],[6,"li"],[9,"tabindex","0"],[7],[0,"\\n        "],[1,[25,"t",["settings.create_article_unreads"],null],false],[0,"\\n        "],[6,"button"],[9,"id","create-unreads"],[3,"action",[[19,0,[]],"createUnreads"]],[7],[1,[25,"t",["settings.create_button"],null],false],[8],[0,"\\n      "],[8],[0,"\\n\\n      "],[6,"li"],[9,"tabindex","0"],[7],[0,"\\n        "],[1,[25,"t",["settings.delete_all_article_unreads"],null],false],[0,"\\n        "],[6,"button"],[3,"action",[[19,0,[]],"deleteAllUnreads"]],[7],[1,[25,"t",["settings.delete_button"],null],false],[8],[0,"\\n      "],[8],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n  "],[6,"ul"],[9,"class","privacy-policy"],[7],[0,"\\n    "],[6,"li"],[7],[0,"\\n      "],[6,"a"],[9,"href","https://support.thirdiron.com/support/solutions/articles/72000570018-third-iron-privacy-policy"],[9,"target","_blank"],[7],[1,[25,"t",["settings.privacy_policy"],null],false],[8],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"ul"],[9,"class","jalc-terms"],[7],[0,"\\n    "],[6,"li"],[7],[0,"\\n      "],[6,"a"],[9,"href","https://support.thirdiron.com/support/solutions/articles/72000570017"],[9,"target","_blank"],[7],[1,[25,"t",["settings.jalc_terms"],null],false],[8],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n\\n"],[4,"if",[[20,["displayConfig"]]],null,{"statements":[[0,"    "],[6,"h2"],[9,"tabindex","0"],[7],[1,[25,"t",["settings.environment_header"],null],false],[8],[0,"\\n    "],[6,"ul"],[9,"class","configs"],[7],[0,"\\n"],[4,"each",[[20,["configKeyValuePairs"]]],null,{"statements":[[0,"        "],[6,"li"],[9,"tabindex","0"],[7],[0,"\\n          "],[1,[19,2,["key"]],false],[0,"\\n          "],[6,"button"],[7],[1,[19,2,["value"]],false],[8],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[2]},null],[0,"    "],[8],[0,"\\n\\n    "],[6,"h2"],[9,"tabindex","0"],[7],[1,[25,"t",["settings.localstorage_header"],null],false],[8],[0,"\\n    "],[6,"ul"],[9,"class","configs"],[7],[0,"\\n"],[4,"each",[[20,["localStorageKeyValuePairs"]]],null,{"statements":[[0,"        "],[6,"li"],[9,"tabindex","0"],[7],[0,"\\n          "],[1,[19,1,["key"]],false],[0,"\\n          "],[6,"button"],[7],[1,[19,1,["value"]],false],[8],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[1]},null],[0,"    "],[8],[0,"\\n"]],"parameters":[]},null],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/library/settings/user-settings.hbs" } }) }), define("browzine-web/templates/library/sso-login", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "f9u8Uv9o", block: '{"symbols":[],"statements":[[4,"splash-panel",null,[["hide-header"],[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]]],{"statements":[[0,"  "],[1,[25,"sso-login",null,[["onContinue","library","auto","disableRedirect"],["login",[20,["library"]],[20,["auto"]],[20,["disableRedirect"]]]]],false],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/library/sso-login.hbs" } }) }), define("browzine-web/templates/library/subject", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "BlBYg94T", block: '{"symbols":["scroller","journal","index","bookrack","shelf","shelf","bookcase"],"statements":[[6,"main"],[9,"class","holdings-container"],[7],[0,"\\n"],[4,"if",[[25,"not",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null]],null,{"statements":[[0,"    "],[6,"div"],[9,"class","subject"],[7],[0,"\\n"],[4,"link-to",["library.subjects"],[["class"],["subject-back-button"]],{"statements":[[0,"        "],[6,"img"],[9,"src","//browzine-app.thirdiron.com/images/change-subject-chevron-b0613c2c2576dc880a792874777e52b3.png"],[10,"alt",[25,"t",["subjects.change_subject"],null],null],[7],[8],[0," "],[1,[25,"t",["subjects.change_subject"],null],false]],"parameters":[]},null],[0,"\\n\\n      "],[6,"h1"],[9,"tabindex","0"],[9,"class","subject-name"],[7],[1,[20,["subject","name"]],false],[8],[0,"\\n\\n      "],[6,"h4"],[9,"tabindex","0"],[9,"class","subject-bookcase-list-header"],[7],[1,[25,"t",["subjects.categories"],null],false],[8],[0,"\\n      "],[6,"ul"],[9,"class","subject-bookcase-list"],[7],[0,"\\n        "],[6,"li"],[9,"class","subject-bookcase-list-item"],[7],[0,"\\n"],[4,"if",[[20,["bookcase"]]],null,{"statements":[[4,"link-to",["library.subject"],[["class"],["disable-active"]],{"statements":[[0,"              "],[1,[25,"t",["subjects.all_journals"],null],false],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},{"statements":[[4,"link-to",["library.subject"],null,{"statements":[[0,"              "],[1,[25,"t",["subjects.all_journals"],null],false],[0,"\\n"]],"parameters":[]},null]],"parameters":[]}],[0,"        "],[8],[0,"\\n"],[4,"each",[[20,["bookcases"]]],null,{"statements":[[0,"          "],[6,"li"],[9,"class","subject-bookcase-list-item"],[7],[0," "],[4,"link-to",["library.subject.bookcase",[19,7,["id"]]],null,{"statements":[[1,[19,7,["name"]],false]],"parameters":[]},null],[0," "],[8],[0,"\\n"]],"parameters":[7]},null],[0,"      "],[8],[0,"\\n    "],[8],[0,"\\n\\n"],[4,"if",[[20,["bookcase"]]],null,{"statements":[[0,"      "],[6,"div"],[9,"class","bookcase"],[7],[0,"\\n        "],[6,"h3"],[9,"tabindex","0"],[9,"class","bookcase-name"],[7],[1,[20,["bookcase","name"]],false],[8],[0,"\\n        "],[6,"ul"],[9,"class","bookcase-bookshelf-list"],[7],[0,"\\n          "],[6,"li"],[9,"class","bookcase-bookshelf-list-item"],[7],[0,"\\n"],[4,"if",[[20,["bookshelf"]]],null,{"statements":[[4,"link-to",[[25,"if",[[20,["bookcase"]],"library.subject.bookcase","library.subject"],null]],[["class"],["disable-active"]],{"statements":[[0,"                "],[6,"span"],[7],[1,[25,"t",["subjects.all_journals"],null],false],[8]],"parameters":[]},null],[0,"\\n"]],"parameters":[]},{"statements":[[4,"link-to",[[25,"if",[[20,["bookcase"]],"library.subject.bookcase","library.subject"],null]],null,{"statements":[[0,"                "],[6,"span"],[7],[1,[25,"t",["subjects.all_journals"],null],false],[8]],"parameters":[]},null],[0,"\\n"]],"parameters":[]}],[0,"          "],[8],[0,"\\n"],[4,"each",[[20,["bookshelves"]]],null,{"statements":[[0,"            "],[6,"li"],[9,"class","bookcase-bookshelf-list-item"],[7],[0,"\\n              "],[4,"link-to",["library.subject.bookcase.bookshelf",[19,6,["id"]]],null,{"statements":[[6,"span"],[7],[1,[19,6,["name"]],false],[8]],"parameters":[]},null],[0,"\\n              "],[1,[25,"scroll-to",null,[["scrollTo","containerSelector","offsetSelector","resultTopMargin"],[[25,"eq",[[20,["bookshelf","id"]],[19,6,["id"]]],null],".bookcase",".screen-header",0]]],false],[0,"\\n            "],[8],[0,"\\n"]],"parameters":[6]},null],[0,"        "],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"\\n"],[4,"infinite-scroller",null,[["class","on-load-more","trigger-at","use-document"],["journals-container",[25,"action",[[19,0,[]],"loadMoreJournals"],null],"70%",[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]]],{"statements":[[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[0,"      "],[6,"div"],[9,"class","controls-container"],[7],[0,"\\n        "],[6,"ul"],[9,"class","controls"],[7],[0,"\\n          "],[6,"li"],[9,"tabindex","0"],[9,"class","back subject-back-button tabindex"],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","back"],null],null],[3,"action",[[19,0,[]],"back"]],[7],[0,"\\n            "],[6,"span"],[9,"class","icon flaticon solid left-2"],[9,"aria-hidden","true"],[7],[8],[0," "],[1,[25,"t",["subjects.menu.back"],null],false],[0,"\\n          "],[8],[0,"\\n\\n          "],[6,"li"],[9,"tabindex","0"],[10,"class",[26,["categories ",[25,"if",[[20,["showCategories"]],"active"],null]," tabindex"]]],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","toggleCategories"],null],null],[3,"action",[[19,0,[]],"toggleCategories"]],[7],[0,"\\n            "],[1,[25,"t",["subjects.menu.refine"],null],false],[0," "],[6,"span"],[9,"class","icon flaticon solid down-2"],[9,"aria-hidden","true"],[7],[8],[0,"\\n          "],[8],[0,"\\n\\n          "],[6,"li"],[9,"tabindex","0"],[10,"class",[26,["sort ",[25,"if",[[20,["showSort"]],"active"],null]," tabindex"]]],[10,"onkeypress",[25,"action",[[19,0,[]],"triggerOnEnter","toggleSort"],null],null],[3,"action",[[19,0,[]],"toggleSort"]],[7],[0,"\\n            "],[1,[25,"t",["subjects.menu.sort.responsive.header"],null],false],[0," "],[6,"span"],[9,"class","icon flaticon solid down-2"],[9,"aria-hidden","true"],[7],[8],[0,"\\n          "],[8],[0,"\\n        "],[8],[0,"\\n\\n"],[4,"if",[[20,["showCategories"]]],null,{"statements":[[0,"          "],[6,"ul"],[9,"class","subject-bookcase-list bookcase-bookshelf-list"],[7],[0,"\\n"],[4,"if",[[25,"not",[[20,["bookcase"]]],null]],null,{"statements":[[4,"link-to",["library.subject"],[["class","tagName","invokeAction"],["subject-bookcase-list-item all-journals","li",[25,"action",[[19,0,[]],"toggleCategories"],null]]],{"statements":[[4,"link-to",["library.subject"],[["invokeAction","tabindex"],[[25,"action",[[19,0,[]],"toggleCategories"],null],"0"]],{"statements":[[0,"                  "],[6,"div"],[9,"class","text"],[7],[1,[25,"t",["subjects.all_journals"],null],false],[0," - "],[1,[20,["subject","name"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"                "],[6,"span"],[9,"class","icon flaticon solid down-2"],[9,"aria-hidden","true"],[7],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"\\n"],[4,"each",[[20,["bookcases"]]],null,{"statements":[[4,"if",[[25,"or",[[25,"not",[[20,["bookcase"]]],null],[25,"eq",[[20,["bookcase","id"]],[19,4,["id"]]],null]],null]],null,{"statements":[[4,"if",[[25,"not",[[20,["bookcase"]]],null]],null,{"statements":[[0,"                  "],[6,"li"],[9,"class","subject-bookcase-list-item"],[3,"action",[[19,0,[]],"scrollTop"]],[7],[0,"\\n"],[4,"link-to",["library.subject.bookcase",[19,4,["id"]]],[["invokeAction","tabindex"],[[25,"action",[[19,0,[]],"scrollTop"],null],"0"]],{"statements":[[0,"                      "],[6,"div"],[9,"class","text"],[7],[1,[19,4,["name"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"                    "],[6,"span"],[9,"class","icon flaticon solid down-2"],[9,"aria-hidden","true"],[7],[8],[0,"\\n                  "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"                  "],[6,"li"],[10,"class",[26,["subject-bookcase-list-item ",[25,"if",[[20,["bookcase"]],"active"],null]]]],[3,"action",[[19,0,[]],"back"]],[7],[0,"\\n"],[4,"link-to",["library.subject.bookcase",[19,4,["id"]]],[["invokeAction","tabindex"],[[25,"action",[[19,0,[]],"back"],null],"0"]],{"statements":[[0,"                      "],[6,"div"],[9,"class","text"],[7],[1,[19,4,["name"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"                    "],[6,"span"],[9,"class","icon flaticon solid down-2"],[9,"aria-hidden","true"],[7],[8],[0,"\\n                  "],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"eq",[[20,["bookcase","id"]],[19,4,["id"]]],null]],null,{"statements":[[4,"if",[[20,["bookshelf"]]],null,{"statements":[[4,"link-to",[[25,"if",[[20,["bookcase"]],"library.subject.bookcase","library.subject"],null]],[["class","tagName","invokeAction"],["bookcase-bookshelf-list-item all-journals disable-active","li",[25,"action",[[19,0,[]],"toggleCategories"],null]]],{"statements":[[4,"link-to",[[25,"if",[[20,["bookcase"]],"library.subject.bookcase","library.subject"],null]],[["class","invokeAction","tabindex"],["disable-active",[25,"action",[[19,0,[]],"toggleCategories"],null],"0"]],{"statements":[[0,"                      "],[6,"div"],[9,"class","text"],[7],[1,[25,"t",["subjects.all_journals"],null],false],[0," - "],[1,[19,4,["name"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"                    "],[6,"span"],[9,"class","icon flaticon solid"],[9,"aria-hidden","true"],[7],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},{"statements":[[4,"link-to",[[25,"if",[[20,["bookcase"]],"library.subject.bookcase","library.subject"],null]],[["class","tagName","invokeAction"],["bookcase-bookshelf-list-item all-journals","li",[25,"action",[[19,0,[]],"toggleCategories"],null]]],{"statements":[[4,"link-to",[[25,"if",[[20,["bookcase"]],"library.subject.bookcase","library.subject"],null]],[["invokeAction","tabindex"],[[25,"action",[[19,0,[]],"toggleCategories"],null],"0"]],{"statements":[[0,"                      "],[6,"div"],[9,"class","text"],[7],[1,[25,"t",["subjects.all_journals"],null],false],[0," - "],[1,[19,4,["name"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"                    "],[6,"span"],[9,"class","icon flaticon solid"],[9,"aria-hidden","true"],[7],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]}],[0,"\\n"],[4,"each",[[20,["bookshelves"]]],null,{"statements":[[4,"link-to",["library.subject.bookcase.bookshelf",[19,5,["id"]]],[["tagName","class","invokeAction"],["li","bookcase-bookshelf-list-item",[25,"action",[[19,0,[]],"toggleCategories"],null]]],{"statements":[[4,"link-to",["library.subject.bookcase.bookshelf",[19,5,["id"]]],[["invokeAction","tabindex"],[[25,"action",[[19,0,[]],"toggleCategories"],null],"0"]],{"statements":[[0,"                      "],[6,"div"],[9,"class","text"],[7],[1,[19,5,["name"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"                    "],[6,"span"],[9,"class","icon flaticon solid"],[9,"aria-hidden","true"],[7],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[5]},null]],"parameters":[]},null]],"parameters":[4]},null],[0,"          "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["showSort"]]],null,{"statements":[[0,"          "],[6,"ul"],[9,"class","sort-controls"],[7],[0,"\\n"],[4,"link-to",[[25,"query-params",null,[["sort"],["title"]]]],[["class","tagName","invokeAction"],["sort-control","li",[25,"action",[[19,0,[]],"toggleSort"],null]]],{"statements":[[4,"link-to",[[25,"query-params",null,[["sort"],["title"]]]],[["class","invokeAction","tabindex"],["sort-control sort-by-title",[25,"action",[[19,0,[]],"toggleSort"],null],"0"]],{"statements":[[0,"                "],[6,"div"],[9,"class","text"],[7],[1,[25,"t",["subjects.menu.sort.responsive.aToZ"],null],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"              "],[6,"span"],[9,"class","icon flaticon solid"],[9,"aria-hidden","true"],[7],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"link-to",[[25,"query-params",null,[["sort"],["rank"]]]],[["class","tagName","invokeAction"],["sort-control","li",[25,"action",[[19,0,[]],"toggleSort"],null]]],{"statements":[[4,"link-to",[[25,"query-params",null,[["sort"],["rank"]]]],[["class","invokeAction","tabindex"],["sort-control sort-by-scimago",[25,"action",[[19,0,[]],"toggleSort"],null],"0"]],{"statements":[[0,"                "],[6,"div"],[9,"class","text"],[7],[1,[25,"t",["subjects.menu.sort.responsive.journal_rank"],null],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"              "],[6,"span"],[9,"class","icon flaticon solid"],[9,"aria-hidden","true"],[7],[8],[0,"\\n"]],"parameters":[]},null],[0,"          "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n        "],[6,"h1"],[9,"tabindex","0"],[9,"class","subject-name bookcase-name"],[7],[0,"\\n"],[4,"if",[[20,["bookshelf"]]],null,{"statements":[[0,"            "],[1,[20,["bookshelf","name"]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"            "],[1,[25,"t",["subjects.all_journals"],null],false],[0," - "],[1,[20,["header","title","value"]],false],[0,"\\n"]],"parameters":[]}],[0,"        "],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n    "],[1,[25,"journal-sort-controls",null,[["sort","isActive"],[[20,["parentController","sort"]],[25,"not",[[20,["sortedJournals","isUpdating"]]],null]]]],false],[0,"\\n\\n    "],[6,"ul"],[9,"class","bookshelf"],[7],[0,"\\n"],[4,"each",[[20,["sortedJournals"]]],null,{"statements":[[0,"        "],[6,"li"],[9,"class","bookshelf-journal-list-item"],[7],[0,"\\n"],[4,"track-clicks",null,[["category","action","label","value"],["featured_cover_tapped",[19,2,["library","id"]],[19,2,["title"]],[19,2,["id"]]]],{"statements":[[4,"link-to",["library.journal",[19,2,["id"]]],[["class"],["bookshelf-journal"]],{"statements":[[4,"journal-cover",null,[["journal"],[[19,2,[]]]],{"statements":[[4,"if",[[25,"eq",[[20,["parentController","sort"]],"rank"],null]],null,{"statements":[[0,"                  "],[1,[25,"scimago-rank",null,[["journal"],[[19,2,[]]]]],false],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"              "],[6,"div"],[9,"class","bookshelf-journal-title"],[10,"title",[26,[[19,2,["title"]]]]],[7],[1,[19,2,["title"]],false],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"        "],[8],[0,"\\n"]],"parameters":[2,3]},null],[0,"\\n      "],[6,"li"],[9,"class","bookshelf-loading-indicator"],[7],[0,"\\n"],[4,"if",[[25,"or",[[20,["journalsChangedTask","isRunning"]],[19,1,["isLoading"]]],null]],null,{"statements":[[0,"        "],[1,[18,"loading-indicator"],false],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[25,"and",[[20,["journalsCursor"]],[25,"not",[[20,["hasScrollBars"]]],null]],null]],null,{"statements":[[0,"          "],[6,"button"],[9,"class","load-more-button"],[10,"onclick",[25,"action",[[19,0,[]],"loadMoreJournals"],null],null],[7],[1,[25,"t",["subjects.load_more"],null],false],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]}],[0,"      "],[8],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[1]},null],[8],[0,"\\n\\n"],[1,[18,"scroll-top"],false],[0,"\\n\\n"],[6,"ul"],[9,"class","responsive-menu"],[7],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/library/subject.hbs" } }) }), define("browzine-web/templates/library/subjects-search", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "fwEbiRG3", block: '{"symbols":["subject"],"statements":[[4,"unless",[[20,["searchVisible"]]],null,{"statements":[[0,"  "],[6,"div"],[10,"class",[26,["subjects-search-container ",[25,"if",[[20,["searchIsComplete"]],"complete"],null]]]],[7],[0,"\\n    "],[6,"h3"],[9,"class","subjects-search-sub-head"],[7],[1,[25,"t",["search.header"],null],false],[8],[0,"\\n    "],[1,[25,"search-pane",null,[["position","disableScrollingOnEnter","library","showResults","showSearchField","filter","query","results","inProgress","lowerLimit","isIssn","issnMsg","externalSearchLocation","complete","clearHistory","storePreviousSearch","exit","visitResult"],["subjects",true,[20,["model"]],false,true,[20,["filter"]],[20,["query"]],[20,["searchResults"]],[20,["searchInProgress"]],[20,["searchLowerLimit"]],[20,["searchIsIssn"]],[20,["searchIssnMsg"]],[20,["externalSearchLocation"]],[20,["searchIsComplete"]],"clearHistory","storePreviousSearch","closeSearch","visitSearchResult"]]],false],[0,"\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"class","subjects-search-placeholder"],[7],[8],[0,"\\n\\n  "],[1,[25,"search-pane",null,[["position","disableScrollingOnEnter","library","showResults","showSearchField","filter","query","results","inProgress","lowerLimit","isIssn","issnMsg","externalSearchLocation","complete","clearHistory","storePreviousSearch","exit","visitResult"],["subjects",true,[20,["model"]],true,false,[20,["filter"]],[20,["query"]],[20,["searchResults"]],[20,["searchInProgress"]],[20,["searchLowerLimit"]],[20,["searchIsIssn"]],[20,["searchIssnMsg"]],[20,["externalSearchLocation"]],[20,["searchIsComplete"]],"clearHistory","storePreviousSearch","closeSearch","visitSearchResult"]]],false],[0,"\\n"]],"parameters":[]},null],[0,"\\n\\n"],[6,"div"],[10,"class",[26,["subject-holder ",[25,"if",[[20,["hideSubjects"]],"visibility-hidden"],null]]]],[7],[0,"\\n  "],[6,"h3"],[9,"tabindex","0"],[9,"class","subjects-sub-head"],[7],[1,[25,"t",["subjects.header"],null],false],[8],[0,"\\n  "],[6,"ul"],[9,"id","subjects-list"],[7],[0,"\\n"],[4,"each",[[20,["model","subjects"]]],null,{"statements":[[0,"      "],[6,"li"],[7],[0,"\\n"],[4,"track-clicks",null,[["category","action","label","value"],["library","View Subject","subject",[19,1,["id"]]]],{"statements":[[4,"link-to",["library.subject",[19,1,["id"]],[25,"query-params",null,[["sort"],[[20,["sortSubjectsBy"]]]]]],[["class","tabindex"],["subjects-list-subject","0"]],{"statements":[[0,"            "],[6,"span"],[9,"class","subjects-list-subject-name"],[7],[1,[19,1,["name"]],false],[8],[0,"\\n            "],[6,"span"],[9,"class","subjects-list-subject-icon flaticon solid files"],[7],[8],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null],[0,"      "],[8],[0,"\\n"]],"parameters":[1]},null],[0,"  "],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/library/subjects-search.hbs" } }) }), define("browzine-web/templates/library/subjects", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "gNoFxcLj", block: '{"symbols":[],"statements":[[4,"splash-panel",null,[["hide-header"],[true]],{"statements":[[0,"  "],[6,"div"],[9,"class","subjects-container"],[7],[0,"\\n"],[0,"    "],[6,"ul"],[9,"class","responsive-menu"],[7],[8],[0,"\\n\\n    "],[1,[25,"library-subject-header",null,[["for"],[[20,["model","library"]]]]],false],[0,"\\n    "],[1,[25,"outlet",["search"],null],false],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/library/subjects.hbs" } }) })
define("browzine-web/templates/library/unavailable", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "kqelW+uy", block: '{"symbols":[],"statements":[[4,"splash-panel",null,[["hide-header"],[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]]],{"statements":[[0,"  "],[6,"div"],[9,"class","unavailable-library-panel splash-panel-message"],[7],[0,"\\n    "],[6,"header"],[9,"class","library-metadata"],[7],[0,"\\n      "],[6,"div"],[7],[0,"\\n        "],[1,[25,"library-logo",null,[["library"],[[20,["model","library"]]]]],false],[0,"\\n"],[4,"unless",[[20,["model","library","logoHasLibraryName"]]],null,{"statements":[[0,"          "],[6,"span"],[9,"class","name"],[10,"title",[26,[[20,["model","library","name"]]]]],[7],[1,[20,["model","library","name"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"      "],[8],[0,"\\n    "],[8],[0,"\\n"],[4,"if",[[25,"not",[[25,"not",[[20,["model","library","webLoginInfo"]]],null]],null]],null,{"statements":[[0,"      "],[2," figure out what to do about tailoring messaging for reason they\'re there - like because their session expired and can no longer auth "],[0,"\\n      "],[1,[25,"login-information",null,[["library"],[[20,["model","library"]]]]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"      "],[6,"div"],[9,"class","message-card"],[7],[0,"\\n        "],[6,"p"],[9,"class","message-title"],[7],[1,[25,"t",["unavailable.title"],null],false],[8],[0,"\\n"],[4,"if",[[25,"eq",[[20,["model","context"]],"Expired Session"],null]],null,{"statements":[[0,"          "],[6,"p"],[9,"class","message-description"],[7],[0,"\\n            "],[1,[25,"t",["unavailable.expired_session_message"],null],false],[0,"\\n          "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"          "],[6,"p"],[9,"class","message-description"],[7],[0,"\\n            "],[1,[25,"t",["unavailable.off_site_unavailable_message"],null],false],[0,"\\n          "],[8],[0,"\\n"]],"parameters":[]}],[0,"      "],[8],[0,"\\n"]],"parameters":[]}],[0,"\\n    "],[6,"div"],[9,"class","button-bar"],[7],[0,"\\n      "],[6,"button"],[9,"class","button primary selectLibrary"],[3,"action",[[19,0,[]],"selectLibrary"]],[7],[1,[25,"t",["unavailable.select_library_button"],null],false],[8],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/library/unavailable.hbs" } })
}), define("browzine-web/templates/library/user-idle-session-expired", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "KHS0ch8P", block: '{"symbols":[],"statements":[[4,"splash-panel",null,[["hide-header"],[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]]],{"statements":[[0,"  "],[6,"div"],[9,"class","session-expired-panel splash-panel-message"],[7],[0,"\\n    "],[6,"header"],[9,"class","library-metadata"],[7],[0,"\\n      "],[6,"div"],[7],[0,"\\n        "],[1,[25,"library-logo",null,[["library"],[[20,["model","library"]]]]],false],[0,"\\n"],[4,"unless",[[20,["model","library","logoHasLibraryName"]]],null,{"statements":[[0,"          "],[6,"span"],[9,"class","name"],[10,"title",[26,[[20,["model","library","name"]]]]],[7],[1,[20,["model","library","name"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"      "],[8],[0,"\\n    "],[8],[0,"\\n    "],[6,"div"],[9,"class","message-card"],[7],[0,"\\n      "],[6,"p"],[9,"class","message-title"],[7],[1,[25,"t",["idle_session_expired.title"],null],false],[8],[0,"\\n"],[4,"if",[[20,["model","library","ssoEnabled"]]],null,{"statements":[[0,"          "],[6,"p"],[9,"class","message-description"],[7],[0,"\\n            "],[1,[25,"t",["idle_session_expired.sso_session_expired_message"],null],false],[0,"\\n          "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"          "],[6,"p"],[9,"class","message-description"],[7],[0,"\\n            "],[1,[25,"t",["idle_session_expired.session_expired_message"],null],false],[0,"\\n          "],[8],[0,"\\n"]],"parameters":[]}],[0,"    "],[8],[0,"\\n\\n"],[4,"if",[[20,["model","library","ssoEnabled"]]],null,{"statements":[[0,"      "],[6,"div"],[9,"class","button-bar"],[7],[0,"\\n        "],[6,"button"],[9,"class","button primary"],[3,"action",[[19,0,[]],"reLogin"]],[7],[1,[25,"t",["idle_session_expired.log_in_button"],null],false],[8],[0,"\\n        "],[6,"button"],[9,"class","button primary selectLibrary"],[3,"action",[[19,0,[]],"selectLibrary"]],[7],[1,[25,"t",["idle_session_expired.select_library_button"],null],false],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"      "],[6,"div"],[9,"class","button-bar"],[7],[0,"\\n        "],[6,"button"],[9,"class","button primary"],[3,"action",[[19,0,[]],"reLogin"]],[7],[1,[25,"t",["idle_session_expired.log_in_button"],null],false],[8],[0,"\\n        "],[6,"button"],[9,"class","button primary"],[3,"action",[[19,0,[]],"continue"]],[7],[1,[25,"t",["idle_session_expired.continue_button"],null],false],[8],[0,"\\n      "],[8],[0,"\\n"]],"parameters":[]}],[0,"  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/library/user-idle-session-expired.hbs" } }) }), define("browzine-web/templates/library/vpn-required", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "0wBrVmBb", block: '{"symbols":[],"statements":[[4,"splash-panel",null,[["hide-header"],[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]]],{"statements":[[0,"  "],[6,"div"],[9,"class","vpn-required-library-panel splash-panel-message"],[7],[0,"\\n    "],[6,"header"],[9,"class","library-metadata"],[7],[0,"\\n      "],[6,"div"],[7],[0,"\\n        "],[1,[25,"library-logo",null,[["library"],[[20,["model","library"]]]]],false],[0,"\\n"],[4,"unless",[[20,["model","library","logoHasLibraryName"]]],null,{"statements":[[0,"          "],[6,"span"],[9,"class","name"],[10,"title",[26,[[20,["model","library","name"]]]]],[7],[1,[20,["model","library","name"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"      "],[8],[0,"\\n    "],[8],[0,"\\n"],[4,"if",[[25,"not",[[25,"not",[[20,["model","library","webLoginInfo"]]],null]],null]],null,{"statements":[[0,"      "],[1,[25,"login-information",null,[["library"],[[20,["model","library"]]]]],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"      "],[6,"div"],[9,"class","message-card"],[7],[0,"\\n        "],[6,"p"],[9,"class","message-title"],[7],[1,[25,"t",["vpn_required.title"],null],false],[8],[0,"\\n"],[4,"if",[[25,"eq",[[20,["model","context"]],"Expired Session"],null]],null,{"statements":[[0,"          "],[6,"p"],[9,"class","message-description"],[7],[0,"\\n            "],[1,[25,"t",["vpn_required.session_expired_message"],null],false],[0,"\\n          "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"           "],[6,"p"],[9,"class","message-description"],[7],[0,"\\n             "],[1,[25,"t",["vpn_required.connect_to_vpn_message"],null],false],[0,"\\n           "],[8],[0,"\\n"]],"parameters":[]}],[0,"      "],[8],[0,"\\n"]],"parameters":[]}],[0,"    "],[6,"div"],[9,"class","button-bar"],[7],[0,"\\n      "],[6,"button"],[9,"class","button primary continue"],[3,"action",[[19,0,[]],"continue"]],[7],[1,[25,"t",["vpn_required.continue_button"],null],false],[8],[0,"\\n      "],[6,"button"],[9,"class","button primary selectLibrary"],[3,"action",[[19,0,[]],"selectLibrary"]],[7],[1,[25,"t",["vpn_required.select_library_button"],null],false],[8],[0,"\\n    "],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/library/vpn-required.hbs" } }) }), define("browzine-web/templates/loading", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "DjYKlPQr", block: '{"symbols":[],"statements":[[1,[18,"loading-screen"],false],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/loading.hbs" } }) }), define("browzine-web/templates/my-bookshelf", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "/tnGOpcf", block: '{"symbols":["bookcase","bookshelf"],"statements":[[4,"if",[[20,["myBookshelf","isAvailable"]]],null,{"statements":[[4,"if",[[20,["myBookshelf","dataIsValid"]]],null,{"statements":[[0,"    "],[6,"aside"],[9,"class","my-bookshelf"],[7],[0,"\\n      "],[6,"h2"],[9,"tabindex","0"],[7],[1,[25,"t",["my_bookshelf.aside_panel_header"],null],false],[8],[0,"\\n"],[4,"each",[[20,["model","bookcases"]]],null,{"statements":[[0,"        "],[6,"div"],[10,"class",[26,["my-bookcase my-bookcase-",[19,1,["index"]]]]],[7],[0,"\\n"],[4,"link-to",["my-bookshelf.bookcase",[19,1,["id"]]],[["class","tabindex"],["title","0"]],{"statements":[[0,"            "],[6,"span"],[7],[1,[19,1,["title"]],false],[8],[0,"\\n            "],[1,[25,"unread-badge",null,[["count"],[[19,1,["unreadCount"]]]]],false],[0,"\\n"]],"parameters":[]},null],[0,"          "],[6,"div"],[9,"class","bookshelves"],[7],[0,"\\n"],[4,"each",[[19,1,["bookshelves"]]],null,{"statements":[[0,"              "],[6,"div"],[9,"class","my-bookshelf"],[7],[0,"\\n                "],[6,"span"],[9,"class","title"],[7],[1,[19,2,["title"]],false],[8],[0,"\\n              "],[8],[0,"\\n"]],"parameters":[2]},null],[0,"          "],[8],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[1]},null],[0,"    "],[8],[0,"\\n\\n    "],[6,"main"],[9,"class","my-bookshelf"],[7],[0,"\\n      "],[1,[18,"outlet"],false],[0,"\\n    "],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"    "],[6,"div"],[9,"tabindex","0"],[9,"class","error"],[7],[1,[25,"t",["my_bookshelf.my_bookshelf_not_available_error_message"],null],false],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[0,"  "],[6,"div"],[9,"class","coming-soon-container"],[7],[0,"\\n    "],[6,"h1"],[9,"class","coming-soon-header"],[7],[1,[25,"t",["my_bookshelf.pre_login_header"],null],false],[8],[0,"\\n    "],[6,"img"],[9,"class","coming-soon-my-bookshelf-image"],[10,"src",[26,[[25,"t",["my_bookshelf.pre_login_image_url"],null]]]],[10,"alt",[26,[[25,"t",["my_bookshelf.pre_login_image_alt_text"],null]]]],[7],[8],[0,"\\n    "],[6,"div"],[9,"class","coming-soon-subscribe-container"],[7],[0,"\\n      "],[6,"p"],[7],[1,[25,"t",["my_bookshelf.pre_login_message_p_1"],null],false],[8],[0,"\\n\\n      "],[6,"p"],[7],[1,[25,"t",["my_bookshelf.pre_login_message_p_2"],null],false],[8],[0,"\\n\\n"],[4,"if",[[25,"eq",[[20,["primaryLocale"]],"ja"],null]],null,{"statements":[[0,"        "],[6,"p"],[7],[1,[25,"t",["my_bookshelf.ja_pre_login_login_or_signup_message_begin"],null],false],[4,"link-to",["library.login",[20,["library"]],[25,"query-params",null,[["returnRoute","returnParameter"],["my-bookshelf",[20,["library","id"]]]]]],[["class"],["login"]],{"statements":[[1,[18,"preLoginLoginLinkText"],false]],"parameters":[]},null],[0,"\\n          "],[1,[25,"t",["my_bookshelf.ja_pre_login_login_or_signup_message_middle"],null],false],[4,"link-to",["auth.signup"],null,{"statements":[[1,[18,"preLoginSignupLinkText"],false]],"parameters":[]},null],[1,[25,"t",["my_bookshelf.ja_pre_login_login_or_signup_message_end"],null],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[6,"p"],[7],[4,"link-to",["library.login",[20,["library"]],[25,"query-params",null,[["returnRoute","returnParameter"],["my-bookshelf",[20,["library","id"]]]]]],[["class"],["login"]],{"statements":[[1,[18,"preLoginLoginLinkText"],false]],"parameters":[]},null],[0,"\\n"],[4,"if",[[25,"not",[[20,["library","ssoEnabled"]]],null]],null,{"statements":[[0,"          "],[1,[25,"t",["my_bookshelf.pre_login_or"],null],false],[0," "],[4,"link-to",["auth.signup"],null,{"statements":[[1,[18,"preLoginSignupLinkText"],false]],"parameters":[]},null],[0,"\\n"]],"parameters":[]},null],[0,"          "],[1,[25,"t",["my_bookshelf.pre_login_login_or_signup_message_end"],null],false],[0,"\\n        "],[8],[0,"\\n"]],"parameters":[]}],[0,"    "],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]}],[0,"\\n"],[6,"ul"],[9,"class","responsive-menu"],[7],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/my-bookshelf.hbs" } }) }), define("browzine-web/templates/my-bookshelf/bookcase", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "KnAoIS0M", block: '{"symbols":[],"statements":[[6,"header"],[10,"class",[26,["my-bookcase my-bookcase-",[20,["model","index"]]]]],[7],[0,"\\n  "],[6,"div"],[9,"class","title"],[7],[0,"\\n"],[4,"editable-element",null,[["value","label","editBookcase","editable","save"],[[20,["model","title"]],[20,["bookcaseTitleEditableElementLabel"]],[20,["editBookcase"]],[20,["myBookshelf","isNotSyncing"]],[25,"action",[[19,0,[]],"updateTitle"],null]]],{"statements":[[0,"      "],[6,"h1"],[9,"tabindex","0"],[7],[1,[20,["model","title"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"  "],[8],[0,"\\n\\n  "],[6,"nav"],[7],[0,"\\n    "],[4,"link-to",["my-bookshelf.bookcase",[20,["model","previous","id"]]],[["title"],[[20,["previousBookcaseLinkTitle"]]]],{"statements":[[6,"span"],[9,"class","icon flaticon solid left left-2"],[7],[8]],"parameters":[]},null],[0,"\\n    "],[4,"link-to",["my-bookshelf.bookcase",[20,["model","next","id"]]],[["title"],[[20,["nextBookcaseLinkTitle"]]]],{"statements":[[6,"span"],[9,"class","icon flaticon solid right right-2"],[7],[8]],"parameters":[]},null],[0,"\\n  "],[8],[0,"\\n"],[8],[0,"\\n\\n"],[4,"if",[[25,"or",[[20,["media","isMobile"]],[20,["media","isTablet"]]],null]],null,{"statements":[[0,"  "],[6,"section"],[10,"class",[26,["my-bookcase edit-bookcase my-bookcase-",[20,["model","index"]]]]],[7],[0,"\\n    "],[6,"button"],[3,"action",[[19,0,[]],"editBookcase"]],[7],[0,"\\n      "],[6,"span"],[9,"class","icon flaticon solid compose-2"],[9,"aria-hidden","true"],[7],[8],[0,"\\n"],[4,"if",[[20,["editBookcase"]]],null,{"statements":[[0,"        "],[1,[25,"t",["my_bookshelf.exit_edit_mode_button_text"],null],false],[0,"\\n"]],"parameters":[]},{"statements":[[0,"        "],[1,[25,"t",["my_bookshelf.edit_bookcase_button_text"],null],false],[0,"\\n"]],"parameters":[]}],[0,"    "],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[1,[25,"my-bookcase",null,[["my-bookcase","isEditable","editBookcase"],[[20,["model"]],[20,["myBookshelf","isNotSyncing"]],[20,["editBookcase"]]]]],false],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/my-bookshelf/bookcase.hbs" } }) }), define("browzine-web/templates/my-bookshelf/my-journal-cover", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "exVAn0kW", block: '{"symbols":["@move-end","@move-start","@delete","@expanded","@move-cancel"],"statements":[[4,"journal-cover",null,[["journal","eventCategory"],[[20,["journal"]],"MyBookshelf"]],{"statements":[[4,"if",[[25,"not",[[25,"and",[[20,["media","isMobile"]],[20,["editBookcase"]]],null]],null]],null,{"statements":[[0,"    "],[1,[25,"unread-badge",null,[["count","align"],[[20,["unread"]],"left"]]],false],[0,"\\n"]],"parameters":[]},null],[0,"\\n"],[4,"if",[[20,["moving"]]],null,{"statements":[[0,"    "],[1,[25,"my-journal-cancel-move",null,[["move-cancel"],[[19,5,[]]]]],false],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["myBookshelf","isNotSyncing"]]],null,{"statements":[[4,"if",[[25,"or",[[20,["editBookcase"]],[25,"or",[[20,["media","isDesktop"]],[20,["media","isJumbo"]]],null]],null]],null,{"statements":[[0,"      "],[1,[25,"my-journal-menu",null,[["journal","editBookcase","expandedItem","expanded","delete","move-start","move-end"],[[20,["journal"]],[20,["editBookcase"]],[20,["expandedItem"]],[19,4,[]],[19,3,[]],[19,2,[]],[19,1,[]]]]],false],[0,"\\n"]],"parameters":[]},null],[0,"  "]],"parameters":[]},null]],"parameters":[]}]],"parameters":[]},null],[0,"\\n"],[4,"track-clicks",null,[["trackedElement","category","action","label","value"],[".bookshelf-journal-title","MyBookshelf","Cover_Tapped",[20,["journal","title"]],[20,["journal","id"]]]],{"statements":[[0,"  "],[6,"div"],[9,"class","title bookshelf-journal-title"],[10,"title",[26,[[20,["journal","title"]]]]],[7],[1,[20,["journal","title"]],false],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/my-bookshelf/my-journal-cover.hbs" } }) }), define("browzine-web/templates/user-logged-in-info", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "csOJncda", block: '{"symbols":[],"statements":[[4,"link-to",["library.settings"],[["class","aria-label"],["logged-in-icon-link view-settings","Settings"]],{"statements":[[0,"    "],[6,"span"],[9,"class","icon flaticon solid settings"],[7],[8],[0,"\\n"]],"parameters":[]},null],[0,"  "],[6,"div"],[9,"class","lines"],[7],[0,"\\n"],[4,"link-to",["library.settings"],null,{"statements":[[0,"      "],[6,"div"],[9,"id","user-info-email"],[7],[1,[20,["applicationSession","loggedInUser","email"]],false],[8],[0,"\\n"]],"parameters":[]},null],[0,"    "],[6,"a"],[9,"href","#"],[9,"id","user-info-logout"],[10,"class",[26,[[25,"if",[[25,"eq",[[20,["currentRoute"]],"library.settings"],null],"active"],null]]]],[3,"action",[[19,0,[]],"logoutToLibraryList"]],[7],[6,"div"],[7],[1,[25,"t",["settings.logout_button"],null],false],[8],[8],[0,"\\n  "],[8],[0,"\\n"]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/user-logged-in-info.hbs" } }) }), define("browzine-web/templates/wayf", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.HTMLBars.template({ id: "nmdbgOpr", block: '{"symbols":[],"statements":[[4,"splash-panel",null,null,{"statements":[[0,"  "],[6,"div"],[9,"class","wayf-container generic-wayf"],[7],[0,"\\n    "],[6,"div"],[9,"class","wayf-info-box"],[7],[0,"\\n      "],[6,"h1"],[9,"tabindex","0"],[9,"class","wayf-title"],[7],[1,[25,"t",["untranslated.generic_wayf_message"],null],false],[8],[0,"\\n    "],[8],[0,"\\n    "],[6,"div"],[9,"class","border"],[7],[8],[0,"\\n    "],[1,[25,"wayf-library-selector",null,[["libraries"],[[20,["libraries"]]]]],false],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}', meta: { moduleName: "browzine-web/templates/wayf.hbs" } }) }), define("browzine-web/utils/intl/missing-message", ["exports", "ember-intl/-private/utils/missing-message"], function (e, t) { Object.defineProperty(e, "__esModule", { value: !0 }), Object.defineProperty(e, "default", { enumerable: !0, get: function () { return t.default } }) }), define("browzine-web/utils/lodash-replacements", ["exports"], function (e) { Object.defineProperty(e, "__esModule", { value: !0 }), e.flatten = function (e) { return e.reduce(function (e, t) { return e.concat(t) }, []) }, e.isUndefined = function (e) { return void 0 === e }, e.pick = function (e, t) { return t.reduce(function (t, n) { return e && e.hasOwnProperty(n) && (t[n] = e[n]), t }, {}) } }), define("browzine-web/views/subject", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.default = Ember.View.extend({
        didInsertElement: function () {
            var e = this
            this.set("resizeHandler", function () { Ember.run.debounce(e, e.resizeHoldingsContainer, 200) }), Ember.$(window).on("resize", this.get("resizeHandler")).trigger("resize")
        }, willDestroyElement: function () { Ember.$(window).off("resize", this.get("resizeHandler")) }, resizeHoldingsContainer: function () { this.$(".holdings-container").height(Ember.$(window).height() - Ember.$("nav").height()) }
    })
}), define("browzine-web/config/environment", [], function () {
    try {
        var e = "browzine-web/config/environment", t = document.querySelector('meta[name="' + e + '"]').getAttribute("content"), n = { default: JSON.parse(unescape(t)) }
        return Object.defineProperty(n, "__esModule", { value: !0 }), n
    } catch (r) { throw new Error('Could not read config from meta tag with name "' + e + '".') }
}), runningTests || require("browzine-web/app").default.create({ showEmailNotificationsFeatures: !0, name: "browzine-web", version: "0.0.0+59f8bb23" })
