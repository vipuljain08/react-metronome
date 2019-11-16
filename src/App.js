import React, { Component } from 'react';
import click1 from './click1.wav'
import click2 from './click2.wav'
import './App.css';

class App extends Component {
  state = {
    playing: false,
    count: 0,
    bpm: 100,
    beatsPerMeasure: 4
  }

  click1 = new Audio(click1)
  click2 = new Audio(click2)

  startStop = () => {
    if(this.state.playing) {
      clearInterval(this.timer)
      this.setState({ playing: false })
    }
    else {
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000)
      this.setState({
        count: 0,
        playing: true
      },
      this.playClick
      )
    }
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    // The first beat will have a different sound than the others
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    // Keep track of which beat we're on
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };

  handleBpmChange = e => {
    const bpm = e.target.value
    if(this.state.playing) {
      clearInterval(this.timer)
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000)

      this.setState({
        count: 0,
        bpm
      })
    }
    else {
      this.setState({ bpm })
    }
  }

  render() {
    const { playing, bpm } = this.state
    return (
      <div className='App'>
        <div className='bpm-slider'>
          <div>{bpm} BPM</div>
          <input type='range' min='60' max='240' value={bpm} onChange={this.handleBpmChange}></input>
        </div>
    <button onClick={this.startStop}>{playing ? 'Stop' : 'Start'}</button>
      </div>
    )
  }
}

export default App;
