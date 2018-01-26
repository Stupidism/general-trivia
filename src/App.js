import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { Progress } from 'antd';

import Question from './components/Question';

import search from './utils/search';
import recognize from './utils/recognize';

import exampleImg from './assets/example.jpg';
import './App.css';

class App extends Component {
  state = {
    question: null,
    pages: null,
    progress: null,
  };

  componentDidMount() {
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  handleProgressChange = (progress) => this.setState({ ...progress });

  start = async (url) => {
    this.startAt = Date.now();
    const image = url ? url : this.webcam.getScreenshot();
    this.setState({ image });

    if (!image) return;
    const question = await recognize(image, this.handleProgressChange);
    this.setState({ question });

    if (!question) return;
    const pages = await search(question);
    this.setState({ pages, timeCost: (Date.now() - this.startAt) / 1000 });
  };

  render() {
    const { image, question, pages, progress, status, timeCost } = this.state;

    return (
      <div className="App">
        <div>
          <button onClick={() => this.start()}>开始</button>
          <button onClick={() => this.start(exampleImg)}>测试</button>
        </div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
        />
        {image ? <img width={300} src={image} alt="Image"/> : null }
        {status ? (
          <div>
            {status}
            <Progress percent={progress * 100} />
          </div>
        ): null}
        {question ? <Question key={question.statement} {...question} pages={pages} /> : null}
        {timeCost ? `花了${timeCost}秒钟` : null}
      </div>
    );
  }
}

export default App;
