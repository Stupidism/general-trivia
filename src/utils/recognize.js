import { Tesseract } from "tesseract.ts";

export default (url, onProgress) => {
  return new Promise((resolve) => {
    Tesseract.recognize(url, {
      lang: 'chi_sim',
    })
      .progress(onProgress)
      .then(function (result) {
        const statementLines = result.lines.slice(0, -3);
        const choiceLines = result.lines.slice(-3);

        resolve({
          statement: statementLines.map(({ text }) => text).join(),
          choices: choiceLines.map(({ text }) => text),
        });
      })
  });
};

