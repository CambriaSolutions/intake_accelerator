import 'jquery-helpers'
import 'jquery-ujs'

import 'babel-polyfill'
import 'bootstrap'
import * as Hello from 'samples/hello'
import Autocompleter from 'Autocompleter'
import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

Hello.sayHello('Visitor')
Hello.sayGoodbye('Visitor')
$(document).ready(() => {
  const element = document.getElementById('add-person')
  if (element) {
    const props = $(element).data('props')
    ReactDOM.render(<Autocompleter involvedPeople={props.involvedPeople} />, element)
  }
})
