import React from 'react';

class Question extends React.Component {
  render() {
    const { statement, choices, pages } = this.props;

    return (
      <div>
        <p>
          {statement}
        </p>
        <ol type="A">
          {choices.map((choice, index) => (
            <li key={choice}>
              <span>{choice}</span>
              <span>{pages ? pages.statementAndChoice[index].resultNum : ''}</span>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default Question;
