import jax from 'jax.js'

class PJAXComponent extends HTMLElement {
  constructor () {
    super()

    // create a shadow root
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes () {
    return [
      'fetch'
    ]
  }

  attributeChangedCallback (name, prev, val) {
    // this fires when the element loads the first time,
    // so we check for both the fetch attribute and the true value
    if (name === 'fetch' && val === 'true') {
      // get the content attribute
      const content = this.getAttribute('content')

      // make GET request
      jax(content)
        .then(res => {
          console.log(res)
        })
        .catch(error => console.log(error))
    }
  }
}

const component = name => {
  // quick feature check
  if (!'customElements' in window) {
    throw new Error('pjax-component: Custom Elements are not supported in the current browser.')
  }

  // name sure the name has a dash,
  // this is a Custom Elements requirement
  if (name.indexOf('-') === -1) {
    throw new Error('pjax-component: Custom Element name must contain a dash.')
  }

  // attach the element using the name provided
  window.customElements.define(name, PJAXComponent)
}

export default component
