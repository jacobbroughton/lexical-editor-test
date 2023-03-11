import { $getRoot, $getSelection, EditorState, LexicalEditor } from "lexical";
import { useEffect, useRef } from "react";
import "./Editor.css";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "../../plugins/ToolbarPlugin";
import { ListItemNode, ListNode } from "@lexical/list";

// import prepopulatedText from "../../SampleText";
import EditorTheme from "../../themes/EditorTheme";

function Editor() {
  const editorStateRef = useRef()

  const editorConfig = {
    editorState: null, // pass json string here
    theme: EditorTheme,
    onError: (error) => {
      throw error;
    },
    nodes: [ListItemNode, ListNode],
  };

  function onChange(editorState: EditorState, editor: LexicalEditor): void {
    editorStateRef.current = editorState
  }

  function saveContent() {
    console.log(JSON.stringify(editorStateRef.current))
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-wrapper">
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={<ContentEditable className="content-editable" />}
          placeholder={<div className="placeholder">Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        {/* <MyOnChangePlugin onChange={(editorState) => console.log(editorState)} /> */}
        <ListPlugin/>
        <CheckListPlugin/>
        <OnChangePlugin onChange={onChange} />
        <button onClick={() => saveContent()}>Save content</button>
      </div>
    </LexicalComposer>
  );
}

export default Editor;
