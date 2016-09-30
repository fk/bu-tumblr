"use strict";

import React, { PropTypes } from "react";
import classNames from "classnames";
import PureRender from "../../decorators/PureRender";

@PureRender
class PostAnswer extends React.Component {
    render() {
        const {className, post, single, thumbnail, ...otherProps} = this.props;
        let answer = post.get("answer");
        let question = post.get("question");

        return (
            <div className={ classNames([className, {"single": single}]) }>
                <div className="text-body">
                    <div
                        className="post-question"
                        dangerouslySetInnerHTML={{ __html: question }} />
                    <div
                        className="post-answer"
                        dangerouslySetInnerHTML={{ __html: answer }} />
                </div>
            </div>
        );
    }
}

export default PostAnswer;
