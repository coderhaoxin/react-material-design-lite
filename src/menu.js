'use strict';

const React = require('react');
const mdl = require('material-design-lite/material.min');
const classnames = require('classnames');

const buttonBaseClasses = {
  'mdl-button': true,
  'mdl-js-button': true,
  'mdl-button--icon': true
};

const inlineBaseClass = {
  'material-icons': true
};

const ulBaseClass = {
  'mdl-menu': true,
  'mdl-js-menu': true
};

class Menu extends React.Component {

  componentDidMount(){
    const node = React.findDOMNode(this);
    mdl.upgradeElement(node, 'MaterialMenu');
  }

  componentWillUnmount(){
    const node = React.findDOMNode(this);
    mdl.downgradeElements(node);
  }

  render(){
    const {
      items,
      ripple,
      topLeft,
      topRight,
      bottomRight
    } = this.props;

    let {
      id,
      icon
    } = this.props;

    const buttonClasses = classnames(buttonBaseClasses);

    const inlineClass = classnames(inlineBaseClass);

    const ulClass = classnames(ulBaseClass, {
      'mdl-menu--top-left': topLeft,
      'mdl-menu--top-right': topRight,
      'mdl-menu--bottom-right': bottomRight,
      'mdl-js-ripple-effect': ripple
    });

    if (!id) {
      id = '_' + Math.random().toString(36).slice(2);
    }

    if (!icon) {
      icon = 'more_vert'
    }

    return (
      <div {...this.props}>
        <button id={id} className={buttonClasses}>
          <i className={inlineClass}>{icon}</i>
        </button>
        <ul className={ulClass} htmlFor={id}>
          {
            items.map((item) => {
              if (typeof item === 'object') {
                item.disabled = !!item.disabled
                return (<li className={'mdl-menu__item'} disabled={item.disabled}>{item.name}</li>)
              }

              return (<li className={'mdl-menu__item'}>{item}</li>)
            })
          }
        </ul>
      </div>
    );
  }
}

Menu.propTypes = {
  id: React.PropTypes.string,
  icon: React.PropTypes.string,
  items: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
    React.PropTypes.shape({
      disabled: React.PropTypes.bool,
      name: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element
      ])
    })
  ])),
  ripple: React.PropTypes.bool,
  topLeft: React.PropTypes.bool,
  topRight: React.PropTypes.bool,
  bottomRight: React.PropTypes.bool
};

module.exports = Menu;
