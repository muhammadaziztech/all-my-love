"use strict";
var Ajaxinate = function (e) {
  var i = e || {},
    n = {
      pagination: ".AjaxinatePagination",
      method: "scroll",
      container: ".AjaxinateLoop",
      offset: 0,
      loadingText:
        "<img class='rotate' style='margin-right:5px' src='https://cdn.shopify.com/s/files/1/0504/2706/8597/files/loading__1.webp?v=1717500995' width='24' height='24'>Load More",
      callback: null,
    };
  this.settings = Object.assign(n, i);
  this.addScrollListeners = this.addScrollListeners.bind(this);
  this.addClickListener = this.addClickListener.bind(this);
  this.checkIfPaginationInView = this.checkIfPaginationInView.bind(this);
  this.stopMultipleClicks = this.stopMultipleClicks.bind(this);
  this.destroy = this.destroy.bind(this);
  this.containerElement = document.querySelector(this.settings.container);
  this.paginationElement = document.querySelector(this.settings.pagination);
  this.initialize();
};

Ajaxinate.prototype.initialize = function () {
  if (this.containerElement) {
    var e = { click: this.addClickListener, scroll: this.addScrollListeners };
    e[this.settings.method]();
  }
};

Ajaxinate.prototype.addScrollListeners = function () {
  if (this.paginationElement) {
    document.addEventListener("scroll", this.checkIfPaginationInView);
    window.addEventListener("resize", this.checkIfPaginationInView);
    window.addEventListener("orientationchange", this.checkIfPaginationInView);
  }
};

Ajaxinate.prototype.addClickListener = function () {
  if (this.paginationElement) {
    this.nextPageLinkElement = this.paginationElement.querySelector("a");
    this.clickActive = true;
    if (this.nextPageLinkElement !== null) {
      this.nextPageLinkElement.addEventListener("click", this.stopMultipleClicks);
    }
  }
};

Ajaxinate.prototype.stopMultipleClicks = function (e) {
  e.preventDefault();
  if (this.clickActive) {
    this.nextPageLinkElement.innerHTML = this.settings.loadingText;
    this.nextPageUrl = this.nextPageLinkElement.href;
    this.clickActive = false;
    this.loadMore();
  }
};

Ajaxinate.prototype.checkIfPaginationInView = function () {
  var e = this.paginationElement.getBoundingClientRect().top - this.settings.offset,
    i = this.paginationElement.getBoundingClientRect().bottom + this.settings.offset;
  if (e <= window.innerHeight && i >= 0) {
    this.nextPageLinkElement = this.paginationElement.querySelector("a");
    this.removeScrollListener();
    if (this.nextPageLinkElement) {
      this.nextPageLinkElement.innerHTML = this.settings.loadingText;
      this.nextPageUrl = this.nextPageLinkElement.href;
      this.loadMore();
    }
  }
};

Ajaxinate.prototype.loadMore = function () {
  this.request = new XMLHttpRequest();
  this.request.onreadystatechange = function () {
    if (this.request.readyState === 4) {
      if (this.request.status === 200) {
        var i = this.request.responseXML.querySelectorAll(this.settings.container)[0],
          n = this.request.responseXML.querySelectorAll(this.settings.pagination)[0];
        this.containerElement.insertAdjacentHTML("beforeend", i.innerHTML);
        this.paginationElement.innerHTML = n.innerHTML;
        if (this.settings.callback && typeof this.settings.callback === "function") {
          this.settings.callback(this.request.responseXML);
        }
        this.initialize();
      } else {
        console.error("Failed to load more products.");
      }
    }
  }.bind(this);
  this.request.open("GET", this.nextPageUrl, true); // Ensure the request is asynchronous
  this.request.responseType = "document";
  this.request.send();
};

Ajaxinate.prototype.removeClickListener = function () {
  if (this.nextPageLinkElement) {
    this.nextPageLinkElement.removeEventListener("click", this.stopMultipleClicks);
  }
};

Ajaxinate.prototype.removeScrollListener = function () {
  document.removeEventListener("scroll", this.checkIfPaginationInView);
  window.removeEventListener("resize", this.checkIfPaginationInView);
  window.removeEventListener("orientationchange", this.checkIfPaginationInView);
};

Ajaxinate.prototype.destroy = function () {
  var e = { click: this.removeClickListener, scroll: this.removeScrollListener };
  e[this.settings.method]();
  return this;
};
