import './App.css';
import React from 'react';
import { marked } from "marked";

const initialText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here is some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo](https://i0.wp.com/www.primefaces.org/wp-content/uploads/2017/09/feature-react.png?ssl=1)



### This text was taken from freeCodeCamp's Markdown previewer.(But embedded image is different)`;

marked.setOptions({
  breaks: true
});

class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState: initialText
    };
    this.changePreview = this.changePreview.bind(this);
    this.changeEditSize = this.changeEditSize.bind(this);
    this.changePreviewSize = this.changePreviewSize.bind(this);
  }

  changePreview(e) {
    this.setState({
      initialState: e.target.value
    });
  }

  changeEditSize() {
    const ourButton = document.getElementById("resize");
    const editPage = document.getElementById("editor");
    const preview = document.getElementById("preview-area");
    if (ourButton.classList == "fa-solid fa-maximize") {
      ourButton.classList = "fa-solid fa-minimize";
      preview.style.marginTop = "-15000000px"; //Yeah, this is not the greatest way to hide an element from page
      editPage.style.width = "550px";
      editPage.style.height = "480px";
    } else {
      ourButton.classList = "fa-solid fa-maximize";
      preview.style.opacity = 1;
      editPage.style.width = "400px";
      editPage.style.height = "200px";
      preview.style.marginTop = "0px";
    }
  }

  changePreviewSize() {
    const ourButton = document.getElementById("resize-preview");
    const previewBox = document.getElementById("preview");
    const preview = document.getElementById("preview-area");
    const previewPart = document.getElementById("edit-area");

    if (ourButton.classList == "fa-solid fa-maximize") {
      ourButton.classList = "fa-solid fa-minimize";
      previewPart.style.opacity = 0;
      previewPart.style.marginTop = "-420px";
      preview.style.marginTop = "150px";
      previewBox.style.height = "fit-content";
    } else {
      ourButton.classList = "fa-solid fa-maximize";
      previewPart.style.opacity = 1;
      previewPart.style.marginTop = "10px";
      preview.style.marginTop = "0px";
      previewBox.style.height = "fit-content";
    }
  }

  render() {
    return (
      <div id="main-div">
        <div id="edit-area">
          <header>
            <header id="textarea-heading">
              <i id="pen" className="fa solid fa-pen">
                {" "}
                Edit
              </i>
              <i
                id="resize"
                onClick={this.changeEditSize}
                className="fa-solid fa-maximize"
              ></i>
            
            </header>

            <textarea
              id="editor"
              type="text"
              onChange={this.changePreview}
              defaultValue={this.state.initialState}
            ></textarea>
          </header>
        </div>

        <div id="preview-area">
          <header>
            <header id="heading-for-preview">
              <i className="fa-brands fa-markdown"> Preview</i>
              <i
                id="resize-preview"
                onClick={this.changePreviewSize}
                className="fa-solid fa-maximize"
              ></i>
            </header>

            <div
              id="preview"
              dangerouslySetInnerHTML={{
                __html: marked(this.state.initialState)
              }}
            ></div>
          </header>
        </div>
      </div>
    );
  }
}

export default Markdown;
