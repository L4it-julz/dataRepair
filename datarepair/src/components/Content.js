import React, { Component } from 'react'

class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {
      names: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit = name => {
    alert(`Submitted name: ${name}`)
  }

  handleChange = e => {
    this.setState({
      names: e.target.value
    })
  }

  render() {
    console.log('data', this.state.names)
    return (
      <section className="flex">
        <div className="content flex">
          <div className="sandbox flex">
            <div className="directions">
              <h1>Please enter a list of names.</h1>
              <h3>Select a langauge at the top of the page.</h3>
            </div>

            <form id="nameForm" className="names flex">
              <div className="form-group">
                <textarea
                  id="names"
                  name="hard"
                  value={this.state.names}
                  cols={20}
                  rows={20}
                  onChange={this.handleChange}
                  wrap="hard"
                />
              </div>
            </form>

            <button id="formButton" form="nameForm" type="submit">
              Submit
            </button>

            <div className="nametags flex">
              <div className="nametags-group flex">
                {this.state.names
                  .split('\n')
                  .filter(n => n) // to filter out empty names
                  .map((name, index) => (
                    <button
                      key={index}
                      type="button"
                      className="nametag"
                      onClick={() => this.handleSubmit(name)}
                    >
                      {name}
                    </button>
                  ))}
                <p className="greeting">Hello there, happy to see you back!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Content