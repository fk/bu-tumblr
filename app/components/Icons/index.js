import React from "react";

export default React.createClass({
    propTypes: {
        icon: React.PropTypes.string.isRequired,
        size: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        style: React.PropTypes.object
    },
    getDefaultProps() {
        return {
            size: 24
        };
    },
    _mergeStyles(...args) {
        // This is the m function from "CSS in JS" and can be extracted to a mixin
        return Object.assign({}, ...args);
    },
    renderGraphic() {
        switch (this.props.icon) {
            case "close":
                return (
                    <g><path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"></path></g>
                );
            case "chevron-left":
                return (
                    <g><path d="M15.41 7.41l-1.41-1.41-6 6 6 6 1.41-1.41-4.58-4.59z"></path></g>
                );
            case "chevron-right":
                return (
                    <g><path d="M10 6l-1.41 1.41 4.58 4.59-4.58 4.59 1.41 1.41 6-6z"></path></g>
                );
            case "more-horiz":
                return (
                    <g><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
                );
            case "email":
                return (
                    <g><path d="M20 4h-16c-1.1 0-1.99.9-1.99 2l-.01 12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm0 4l-8 5-8-5v-2l8 5 8-5v2z"></path></g>
                );
            case "twitter":
                return (
                    <g><path d="M20 2h-16c-1.1 0-1.99.9-1.99 2l-.01 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-16c0-1.1-.9-2-2-2zm-2.29 7.33c-.06 4.62-3.02 7.78-7.42 7.98-1.82.08-3.14-.5-4.28-1.23 1.34.21 3.01-.32 3.9-1.09-1.32-.13-2.1-.8-2.46-1.88.38.07.78.05 1.14-.03-1.19-.4-2.04-1.13-2.08-2.67.33.15.68.29 1.14.32-.9-.5-1.55-2.35-.8-3.57 1.32 1.45 2.91 2.63 5.52 2.79-.65-2.8 3.06-4.32 4.61-2.44.66-.13 1.19-.38 1.7-.65-.21.65-.62 1.1-1.12 1.47.54-.07 1.03-.21 1.44-.41-.25.53-.81 1.01-1.29 1.41z"></path></g>
                );
            case "facebook":
                return (
                    <g><path d="M20 2h-16c-1.1 0-1.99.9-1.99 2l-.01 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-16c0-1.1-.9-2-2-2zm-1 2v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v7h-3v-7h-2v-3h2v-2.5c0-1.93 1.57-3.5 3.5-3.5h2.5z"></path></g>
                );
            case "reblog":
                return (
                    <g><path d="M6.010 16.525v-5.979h2.949l-4.426-5.169-4.519 5.17h2.96v8.922h13.101l-2.942-2.943h-7.122zM21.027 14.251v-8.968h-13.148l2.99 2.989h7.122v5.98h-2.949l4.426 5.17 4.52-5.17h-2.96z"></path></g>
                );
            case "link":
                return (
                    <g><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4v-1.9h-4c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9h-4c-1.71 0-3.1-1.39-3.1-3.1zm4.1 1h8v-2h-8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4v1.9h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>
                );
            case "arrow-back":
                return (
                    <g><path d="M20 11h-12.17l5.59-5.59-1.42-1.41-8 8 8 8 1.41-1.41-5.58-5.59h12.17v-2z"></path></g>
                );
            case "menu":
                return (
                    <g><path d="M3 18h18v-2h-18v2zm0-5h18v-2h-18v2zm0-7v2h18v-2h-18z"></path></g>
                );
        }
    },
    render() {
        let styles = {
            fill: "currentcolor",
            verticalAlign: "middle",
            width: this.props.size, // CSS instead of the width attr to support non-pixel units
            height: this.props.size // Prevents scaling issue in IE
        };
        return (
            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"
                 style={this._mergeStyles(
                     styles,
                     this.props.style // This lets the parent pass custom styles
                 )}>
                {this.renderGraphic()}
            </svg>
        );
    }
});
