/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'knockout', 'ojs/ojknockout', 'ojs/ojformlayout', 'ojs/ojinputtext', 'kafkajs', 'ojs/ojbutton' ],
  function(ResponsiveUtils, ResponsiveKnockoutUtils, ko, Kafka) {
     function ControllerViewModel() {

      // Media queries for repsonsive layouts
      self = this;
      const smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);



      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("App Name");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("john.hancock@oracle.com");

      self.exit = ko.observable(false);
      let axes = ko.observableArray([]);
      self.axisValue0 = ko.observable(0.00);
      self.axisValue1 = ko.observable(0.00);
      self.axisValue2 = ko.observable(0.00);
      self.axisValue3 = ko.observable(0.00);
      self.button0 = ko.observable("");
      self.button1 = ko.observable("");
      self.button2 = ko.observable("");
      self.button3 = ko.observable("");
      self.button4 = ko.observable("");
      self.button5 = ko.observable("");
      self.button6 = ko.observable("");
      self.button7 = ko.observable("");
      self.button8 = ko.observable("");
      self.button9 = ko.observable("");
      self.button10 = ko.observable("");
      self.button11 = ko.observable("");
      self.button12 = ko.observable("");
      self.button13 = ko.observable("");
      self.button14 = ko.observable("");
      self.button15 = ko.observable("");

      self.startButtonClick = function (event) {
        this.exit(false);
        start();
      }.bind(self);

      self.stopButtonClick = function (event) {
        this.exit(true);
      }.bind(self);

      // kafka implementation
      // const kafka = new Kafka({ clientId: 'test-app', brokers: ['broker:9092']});
      // let producer = kafka.producer();
      // await producer.connect()
      /*
      function sendAction(topic, msg) {
        await producer.send({topic: topic, messages: [msg]});
      }
      */


      // get mappingdict from backend
      function getMappingDict() {
        // make ajax call to backed
        
        // for testing return mapping
        return {
          ">_Key": {
              "associated_input": "cs_fc_foil_rake_gain",
              "action": "change_value",
              "rate": "None",
              "range":[1,11]
          },
            "ArrowRight_Key": {
                "associated_input": "cs_fc_uwmode",
                "action": "trigger",
                "rate": "None",
                "range":"None"
          },
          "Wheel_Angle": {
              "associated_input": "cs_helm_angle",
              "action": "read_value",
              "rate": 1,
              "range":[-450,450]
          }
        };
      }
      

      document.addEventListener('keydown', keyDownListener);



      /********** GAMEPAD METHODS **********/
      
      function updateController(index, gamepad) {
        updateAxes(gamepad);
        updateButtons(gamepad);
      }

      function updateAxes(gamepad) {
        if (gamepad == null) {
          return;
        }
        else {
          for (let i = 0; i < gamepad.axes.length; ++i) {
            let axis = gamepad.axes[i].toFixed(4);
            //console.log({axis: i, value: axis});
            switch(i) {
              case 0:
                self.axisValue0(axis);
                break;
              case 1:
                self.axisValue1(axis);
                break;
              case 2:
                self.axisValue2(axis);
                break;
              case 3:
                self.axisValue3(axis);
                break;
              default:
                console.log({axis: i, value: axis});
            }
          }
        }
      }

      function updateButtons(gamepad) {
        if (gamepad == null) {
          return;
        }
        else {
          for (let i = 0;  i < gamepad.buttons.length; ++i) {
            let button = gamepad.buttons[i];
            val = JSON.stringify({pressed: button.pressed, value: button.value});
            //console.log({button: i, pressed: button.pressed, value: button.value});
            switch(i) {
              case 0:
                self.button0(val);
                break;
              case 1:
                self.button1(val);
                break;
              case 2:
                self.button2(val);
                break;
              case 3:
                self.button3(val);
                break;
              case 4:
                self.button4(val);
                break;
              case 5:
                self.button5(val);
                break;
              case 6:
                self.button6(val);
                break;
              case 7:
                self.button7(val);
                break;
              case 8:
                self.button8(val);
                break;
              case 9:
                self.button9(val);
                break;
              case 10:
                self.button10(val);
                break;
              case 11:
                self.button11(val);
                break;
              case 12:
                self.button12(val);
                break;
              case 13:
                self.button13(val);
                break;
              case 14:
                self.button14(val);
                break;
              case 15:
                self.button15(val);
                break;
              default:
                console.log({button: i, pressed: button.pressed, value: button.value});
            }
          }
        }
      }

      function gamePadConnected(event) {
        console.log(event);
      }

      function gamePadDisconnected(event) {
        console.log(event);
      }

      function isGamePadSupported() {
        return 'getGamepads' in navigator;
      }

      function start() {
        console.log('Test Started ...')
        if (!isGamePadSupported()) {
          return;
        }
        window.addEventListener('gamepadconnected', gamePadConnected);
        window.addEventListener('gamepaddisconnected', gamePadDisconnected);

        setInterval(loop, 100);
      }

      function loop() {
        if (!self.exit()) {
          var gp = navigator.getGamepads();
          for (let i = 0; i < gp.length; ++i) {
            updateController(i, gp[i]);
          }
        }
      }

      function keyDownListener(event) {
        key = event.key + '_Key';
        console.log(key);
        action = translateKeyDown(key, 'session1');
        console.log(action);
        // await producer.send({
        //  topic: 'action_buffer',
        //  messages: [{test: 'test', key: event.code}]
        // })
      }

      function translateKeyDown(keyDown, session) {
        mappingDict = getMappingDict();
        mapping = mappingDict[keyDown]
        if (mapping != undefined) {
          mapping.sessionId = session;
          return mapping;
        }
      }

      
      





      // Footer      
      this.footerLinks = [
        {name: 'About Oracle', linkId: 'aboutOracle', linkTarget:'http://www.oracle.com/us/corporate/index.html#menu-about'},
        { name: "Contact Us", id: "contactUs", linkTarget: "http://www.oracle.com/us/corporate/contact/index.html" },
        { name: "Legal Notices", id: "legalNotices", linkTarget: "http://www.oracle.com/us/legal/index.html" },
        { name: "Terms Of Use", id: "termsOfUse", linkTarget: "http://www.oracle.com/us/legal/terms/index.html" },
        { name: "Your Privacy Rights", id: "yourPrivacyRights", linkTarget: "http://www.oracle.com/us/legal/privacy/index.html" },
      ];
     }

     return new ControllerViewModel();
  }
);
