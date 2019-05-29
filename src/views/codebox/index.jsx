import React from "react";
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/jsx/jsx';
import './index.less';
export default function Codebox(props) {
  return <CodeMirror
  value={props.code}
  className="code-mirror"
  scroll={{
    x: 50,
    y: 50
  }}
  options={{
    mode: 'jsx',
    theme: 'material',
  }}
  onBeforeChange={(editor, data, value) => {
    
  }}
  onChange={(editor, data, value) => {
  }}
/>
}