import 'jquery-helpers'
import 'jquery-ujs'

import 'babel-polyfill'
import 'bootstrap'
import * as Hello from 'samples/hello'
import Autocompleter from 'autocompleter'
import React from 'react'
import ReactDOM from 'react-dom'

Hello.sayHello('Visitor')
Hello.sayGoodbye('Visitor')
ReactDOM.render(<Autocompleter />, document.getElementById('add-person'));
