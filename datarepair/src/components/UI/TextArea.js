import React from "react";

const TextArea = (props) => {
    return (
    <textarea 
    id="names"
    name="hard"
    value={props.value}
    cols={150}
    rows={10}
    onChange={props.onChange}
    wrap="hard"
    />
    );
}

export default TextArea;